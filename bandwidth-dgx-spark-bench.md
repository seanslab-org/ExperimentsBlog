# DGX Spark 带宽实测脚本（Bench Protocol）

*为 Ch4 / Ch5 的"理论上限 vs 实测"数据服务。Sean 跑，我把结果回填到正文。*

---

## 目标

用 **一台 DGX Spark（128 GB LPDDR5X / 273 GB/s 官方）** 测四组数字：

1. **内存带宽实际峰值**（验证 273 GB/s 官标是否跑得到）
2. **Llama-3 70B dense decode 实测**（Int4 + FP8），对照 Ch2 理论上限
3. **Qwen3-MoE decode 实测**（Int4），对照 Ch4 MoE 章的理论分析
4. **vLLM continuous batching**（batch=1 vs batch=32）对照——证 Ch4 "云侧 batching 把 MoE 救回来" 的论点

---

## 0. 准备

### 0.1 检查驱动 / 工具链

```bash
# 确认 CUDA 和 GPU 信息
nvidia-smi
# 应该看到：GB10 (Blackwell) 单卡，128 GB 统一内存

# 工具链
sudo apt install -y hwloc build-essential git
pip install vllm==0.6.5 transformers accelerate
```

### 0.2 装 llama.cpp（推荐 ARM + CUDA 编译）

```bash
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp
cmake -B build -DGGML_CUDA=ON -DGGML_NATIVE=ON
cmake --build build --config Release -j
```

### 0.3 拉模型（走 HuggingFace）

```bash
# Llama-3 70B（FP8 / Int4 两档）
huggingface-cli download meta-llama/Meta-Llama-3-70B-Instruct \
  --local-dir ~/models/llama3-70b
# GGUF Q4_K_M / Q8_0（llama.cpp 格式）
huggingface-cli download bartowski/Meta-Llama-3-70B-Instruct-GGUF \
  Meta-Llama-3-70B-Instruct-Q4_K_M.gguf Meta-Llama-3-70B-Instruct-Q8_0.gguf \
  --local-dir ~/models/llama3-70b-gguf

# Qwen3-MoE（按你手头实际的 Qwen3 MoE 版本替换；常见选项如下）
# Qwen3-30B-A3B、Qwen3-235B-A22B 或你说的 122B-A10B
huggingface-cli download Qwen/Qwen3-30B-A3B-Instruct-2507 \
  --local-dir ~/models/qwen3-30b-moe
```

> **注**：你提到手头有"Qwen3.5 122B-A10B"——请先确认确切 HF repo 名，若是 fine-tune 版，把上面的 repo 替换成对应的即可。122B-A10B 量化到 Int4 约 61 GB，128 GB Spark 刚好装得下（剩余给 KV cache + 系统）。

---

## 1. 测内存带宽实际峰值

### 1.1 STREAM（CPU 侧，但因为 LPDDR5X 是 CPU+GPU 共享，数字足够参考）

```bash
# 下载 STREAM
wget https://www.cs.virginia.edu/stream/FTP/Code/stream.c
# 编译（注意要开 OpenMP + 大数组）
gcc -O3 -fopenmp -DSTREAM_ARRAY_SIZE=500000000 -mcmodel=large stream.c -o stream

# 跑（多线程跑满 memory controller）
OMP_NUM_THREADS=14 ./stream
```

预期：应该能报到 **220–260 GB/s**（比 273 GB/s 官标略低是正常的，因为 STREAM 读 + 写不会跑满峰值）。

### 1.2 NVIDIA bandwidthTest（CUDA 样本，测 H2D/D2H/D2D）

```bash
# CUDA Samples 里自带
cd /usr/local/cuda/samples/1_Utilities/bandwidthTest
make -j
./bandwidthTest --mode=shmoo --memory=pinned

# 关键数字：Device to Device 就是 HBM/统一内存的实测峰值
```

**Spark 的特点**：因为是 unified memory，D2D 其实就是 LPDDR5X 读写，和 STREAM 应该接近。

### 1.3 结果记录格式

```
STREAM Triad: ___ GB/s
bandwidthTest D2D: ___ GB/s
利用率（相对 273 GB/s）: ___ %
```

---

## 2. Llama-3 70B Dense Decode（Ch2 对照）

### 2.1 llama.cpp Int4（Q4_K_M ≈ 40 GB，装得下）

```bash
cd ~/llama.cpp
./build/bin/llama-bench \
  -m ~/models/llama3-70b-gguf/Meta-Llama-3-70B-Instruct-Q4_K_M.gguf \
  -p 128 -n 128 -b 1 -ngl 99 \
  -t 14 \
  --output json > ~/bench-results/llama3-70b-q4-spark.json
```

**参数说明**：
- `-p 128`：prefill 128 tokens（prompt 长度）
- `-n 128`：decode 128 tokens
- `-b 1`：batch=1
- `-ngl 99`：所有层放 GPU
- `-t 14`：14 个 CPU 线程（Spark 的 Arm 核数）

**预期理论上限**：273 GB/s ÷ 40 GB ≈ **6.8 tok/s**。
**预期实测**：带宽利用率 70–85% → **4.8–5.8 tok/s**。

### 2.2 llama.cpp Int8（Q8_0 ≈ 70 GB）

```bash
./build/bin/llama-bench \
  -m ~/models/llama3-70b-gguf/Meta-Llama-3-70B-Instruct-Q8_0.gguf \
  -p 128 -n 128 -b 1 -ngl 99 -t 14 \
  --output json > ~/bench-results/llama3-70b-q8-spark.json
```

**预期**：273 / 70 ≈ 3.9 tok/s 理论，实测 **2.8–3.5 tok/s**。

### 2.3 vLLM 对照（INT8 / W8A8）

```bash
# vLLM 起服务（单请求）
vllm serve ~/models/llama3-70b \
  --dtype float8 \
  --max-model-len 8192 \
  --gpu-memory-utilization 0.90 &

# 客户端单请求
python -c "
import time, requests
start = time.time()
r = requests.post('http://localhost:8000/v1/completions', json={
  'model': 'llama3-70b',
  'prompt': 'Write a 500-word essay about memory bandwidth.',
  'max_tokens': 500, 'temperature': 0
})
elapsed = time.time() - start
tokens = r.json()['usage']['completion_tokens']
print(f'{tokens} tokens in {elapsed:.1f}s = {tokens/elapsed:.2f} tok/s')
"
```

### 2.4 结果记录

```
Llama-3 70B Q4 (40 GB) llama.cpp: ___ tok/s  (理论上限 6.8, 利用率 __%)
Llama-3 70B Q8 (70 GB) llama.cpp: ___ tok/s  (理论上限 3.9, 利用率 __%)
Llama-3 70B FP8 vLLM batch=1:    ___ tok/s
```

---

## 3. Qwen3-MoE Decode（Ch4 MoE 悖论对照）

**核心验证点**：MoE 的实际 tok/s 是不是**没有达到"按激活参数比"预期**的加速比。

假设跑 Qwen3-30B-A3B（Int4，权重约 16 GB，激活 3B ≈ 1.6 GB）：
- 若按激活参数比预期：273 / 1.6 ≈ 170 tok/s（不现实）
- 若按全部权重搬移：273 / 16 ≈ 17 tok/s
- 实测预计：落在 **8–14 tok/s**（被 router 随机访问 + DRAM burst 效率损耗吃掉）

### 3.1 llama.cpp Qwen3-MoE

```bash
# 先转 GGUF（如果 HF 版没提供 GGUF）
python ~/llama.cpp/convert_hf_to_gguf.py \
  ~/models/qwen3-30b-moe --outfile qwen3-30b-moe-f16.gguf

# 量化到 Q4_K_M
~/llama.cpp/build/bin/llama-quantize \
  qwen3-30b-moe-f16.gguf qwen3-30b-moe-q4.gguf Q4_K_M

# 跑 bench
~/llama.cpp/build/bin/llama-bench \
  -m qwen3-30b-moe-q4.gguf \
  -p 128 -n 128 -b 1 -ngl 99 -t 14 \
  --output json > ~/bench-results/qwen3-moe-q4-spark.json
```

### 3.2 跑"有效带宽利用率"

每一组跑完，算一下**实测等效带宽**：

```python
# 给定 tok/s 和权重大小，反推实际搬运量
tok_per_s = 10.5     # 替换成实测
weights_gb = 16      # 替换成实际模型大小（GB, Int4 后）
effective_bw = tok_per_s * weights_gb
utilization = effective_bw / 273 * 100
print(f'Effective BW: {effective_bw:.1f} GB/s, Utilization: {utilization:.1f}%')
```

**对比点**：dense 模型（Ch2.1）的利用率是 70–85%；MoE 模型的利用率如果明显低于这个（比如 40–55%），就是 Ch4 第一节三条机制的实锤。

### 3.3 结果记录

```
Qwen3-30B-A3B Q4 (16 GB):         ___ tok/s, 利用率 __%
Qwen3-122B-A10B Q4 (~61 GB):      ___ tok/s, 利用率 __%（若手头有）
对照 Llama3-70B Q4 (40 GB):       ___ tok/s, 利用率 __%
```

**期望得到的论文级结论**：
> "MoE 的实测带宽利用率（__%）显著低于同量级 dense 模型（__%），验证第四章 §1 所述三条机制：router 随机访问破坏 burst、多 token batch 有效激活比上升、cache miss 导致 pipeline 停摆。"

---

## 4. Continuous Batching 对照（Ch4 "云侧稳赚" 论点）

同一个 MoE 模型，batch=1 vs batch=32，测总吞吐（total tok/s across all requests）。

```bash
# vLLM 开 continuous batching
vllm serve ~/models/qwen3-30b-moe \
  --max-model-len 4096 \
  --gpu-memory-utilization 0.90 \
  --max-num-seqs 32 &

# 客户端并发压测
pip install vllm-benchmark
python -m vllm.benchmarks.serving \
  --model qwen3-30b-moe \
  --dataset-name sharegpt \
  --num-prompts 100 \
  --request-rate 20
```

**期望数字**：
- batch=1 单请求：~10 tok/s（同 §3.1）
- batch=32 聚合：total throughput 可能到 **150–250 tok/s**（每请求平摊后每请求 5–8 tok/s）

**核心观察点**：聚合吞吐 / 单请求吞吐 = **15–25 倍**。这个放大比就是 Ch4 里 "云侧 batch 大 → 专家激活被摊平 → burst 效率回来" 的实证。

---

## 5. 一键跑 + 报告模板

```bash
#!/bin/bash
# bench-all.sh
mkdir -p ~/bench-results
cd ~/bench-results

echo "=== 1. Memory Bandwidth ===" | tee bench-log.txt
OMP_NUM_THREADS=14 ~/stream | grep Triad | tee -a bench-log.txt

echo "=== 2. Llama-3 70B Q4 ===" | tee -a bench-log.txt
~/llama.cpp/build/bin/llama-bench \
  -m ~/models/llama3-70b-gguf/Meta-Llama-3-70B-Instruct-Q4_K_M.gguf \
  -p 128 -n 128 -b 1 -ngl 99 -t 14 | tee -a bench-log.txt

echo "=== 3. Llama-3 70B Q8 ===" | tee -a bench-log.txt
~/llama.cpp/build/bin/llama-bench \
  -m ~/models/llama3-70b-gguf/Meta-Llama-3-70B-Instruct-Q8_0.gguf \
  -p 128 -n 128 -b 1 -ngl 99 -t 14 | tee -a bench-log.txt

echo "=== 4. Qwen3-30B-MoE Q4 ===" | tee -a bench-log.txt
~/llama.cpp/build/bin/llama-bench \
  -m ~/models/qwen3-30b-moe-q4.gguf \
  -p 128 -n 128 -b 1 -ngl 99 -t 14 | tee -a bench-log.txt

echo "Done. Results in ~/bench-results/bench-log.txt"
```

---

## 6. 要回填到正文的数据点

跑完把下面填上，我把 Ch2 / Ch4 / Ch5 的"实测"部分替换进去。

| 项目 | 预期 | 实测 | 备注 |
|---|---|---|---|
| STREAM Triad 带宽 | 220–260 GB/s | | |
| Llama-3 70B Q4 decode | 4.8–5.8 tok/s | | → Ch2 表 |
| Llama-3 70B Q8 decode | 2.8–3.5 tok/s | | → Ch2 表 |
| Qwen3-30B-A3B Q4 decode | 8–14 tok/s | | → Ch4 §2 |
| Qwen3-122B-A10B Q4 decode | 4–8 tok/s | | → Ch4 §2（如跑） |
| MoE vs dense 带宽利用率差 | 15–30% | | → Ch4 §1 实证 |
| batch=32 吞吐放大倍数 | 15–25× | | → Ch4 §4 实证 |

---

*跑完贴回来，我一次性更新 Ch2/Ch4/Ch5 的"实测"列，并在 #007/#009/#010 三篇里加一段"DGX Spark 实测附录"。*
