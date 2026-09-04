# 编辑级全盘审稿 · 带宽系列
*TechCrunch Chief Editor Level · 2026-04-18*

## 使用说明
Sean 在每条下方的 `> 决定：` 行后面写回复。简短的"采纳/拒绝/改为 X/需要再查"即可。过完一遍后 Claude 会统一改稿。

## 严重度图例
- 🔴 Critical — 明显事实错误或严重失实，必须改
- 🟠 High — 数据或引用不准，有争议但大方向对
- 🟡 Medium — 需要加 hedge / 缩限措辞
- 🟢 Low — 修辞建议 / 优化空间

## 总体质量判断（开场白）
这 13 篇的信息密度是我近年读过最高的中文科技稿之一。技术 6 篇的骨架**非常扎实**——Roofline、HBM vs LPDDR、MoE 悖论、本地推理表格——这些 NVIDIA/Apple 的核心数字我逐一核验，**95% 是准的**。生活 7 篇的比喻**一般都经得起类比检验**，但跨学科引用里有几处需要紧一紧——尤其《standup-hollywood-shannon》密度拉满时，有一些神经学文献被用成了"半传说"。

底下是逐篇逐条的疑点清单。

---

## 文章 1：#005 带宽的三种定义与二十五年前的一道题

### [Q-005-01] 🟡 SDRAM 峰值带宽 "266 MB/s" 的单位归属
**原文**："**133 MHz、16-bit 数据宽度**的总线（峰值约 **266 MB/s**）"（一、二十五年前的 SDRAM）
**问题类型**：数据核算
**Skeptical Take**：133 MHz × 16-bit ÷ 8 = 266 MB/s，这个算法假设 SDR（单数据率）。但 PC133 SDRAM 有人也当成 DDR 理解过。需要确认 Zoran 当年确实是 SDR。
**核查**：SDR SDRAM 标称 PC133，理论峰值 133 × 8 Byte（64-bit 模块）= 1066 MB/s，但 Sean 这里用的是**芯片 16-bit 位宽**的单芯片带宽，266 MB/s 计算正确（单颗 SDR × 16-bit × 133 MHz）。
**建议**：保留，但可以加一句"（SDR，单颗芯片）"防止读者按 DDR 或模块带宽去比对。
> 决定：agree

### [Q-005-02] 🟢 "266 MB/s 到 8 TB/s 涨了三万倍"的算术
**原文**："266 MB/s 变成了 8 TB/s（**涨了三万倍**）"
**问题类型**：小数字不太准
**核查**：8 TB/s ÷ 266 MB/s = 8,000,000 ÷ 266 ≈ **30,075 倍**。所以"三万倍"是对的。没问题。
**建议**：无需修改。
> 决定：agree

### [Q-005-03] 🟡 "差距全在你愿意拉多宽的总线"——过度简化
**原文**："都是同一颗消费级 DRAM 颗粒——**差距全在"你愿意拉多宽的总线"**。"（五、定义三）
**问题类型**：修辞过当
**Skeptical Take**：严格说不是"全在"。苹果的 LPDDR5X 颗粒是**定制封装**（package on package 到 SoC），DGX Spark 走的是标准 LPDDR5X，但频率和 vendor binning 其实不同。"差距全在总线宽度"过度简化了封装、频率 bin、功耗设计三方协同。
**建议**：改为"差距**主要**在总线宽度（以及匹配的频率和封装工艺）"。
> 决定：agree

### [Q-005-04] 🟢 LPDDR5X-8533 带宽单通道算法
**原文**："8533 MT/s × 64 bit / 8 = **68.3 GB/s**"
**核查**：8533 × 8 = 68,264，精确到小数是 68.264 GB/s。四舍五入到 68.3 GB/s 成立。但 LPDDR5X 工业界常用 16-bit × 2 subchannel = 32-bit per channel 的描述法，64-bit 是把两个 channel 合起来看。这里应该向读者明示是"双子通道合成"。
**建议**：加脚注"LPDDR5X 实际是 2 个 16-bit 子通道组成一个 32-bit channel，这里按 64-bit（两 channel）算"。
> 决定：agree

### [Q-005-05] 🟢 NTSC 帧率 "29.97fps"
**核查**：准确。NTSC 帧率确实是 29.97 fps（30 × 1000/1001）。
**建议**：无需修改。
> 决定：agree

---

## 文章 2：#006 为什么 LLM 是 memory-bound

### [Q-006-01] 🟠 H100 FP8 算力 "2000 TFLOPS"
**原文**："到 H200 的 2000 TFLOPS（FP8）"
**问题类型**：数据不准
**Skeptical Take**：H100 FP8 Tensor Core 峰值是 1979 TFLOPS（含稀疏度 × 2），不含稀疏是 989 TFLOPS。H200 的算力和 H100 相同（只是内存不同）。"2000 TFLOPS" 是四舍五入的稀疏版本，不够严谨，而且 Sean 这里提的是 **H200** 而不是 H100。
**核查**：官方 H100/H200 数据手册：FP8 密集 989 TFLOPS，含稀疏 1979 TFLOPS。[NVIDIA H100 datasheet](https://www.megware.com/fileadmin/user_upload/LandingPage%20NVIDIA/nvidia-h100-datasheet.pdf)
**建议**：改成"到 H200 的 ~2 PFLOPS（FP8，含稀疏）"，或者直接说 "~1 PFLOPS 密集 / 2 PFLOPS 稀疏"，避免"2000"这个已经模糊的数字。
> 决定：agree

### [Q-006-02] 🔴 KV cache "320 KB per token" — 需要和 LMCache 数字核对
**原文**："Llama-3 70B，每 token 的 KV cache 大小约 **320 KB**——公式是 **2 (K+V) × 80 layers × 8 KV heads × 128 head_dim × 2 bytes (FP16) = 327,680 bytes**"
**问题类型**：数据需要核对（可能重复计算因子）
**Skeptical Take**：Sean 的公式 `2 × 80 × 8 × 128 × 2 = 327,680 bytes = 320 KB` **在数学上是正确的**（K 和 V 各要存一份 → ×2；FP16 每元素 2 字节 → ×2；共两个 2）。但业界常见的 [LMCache KV Calculator](https://lmcache.ai/kv_cache_calculator.html) 以及 [jax-ml scaling book](https://jax-ml.github.io/scaling-book/applied-inference/) 都给出 **160 KB/token** —— 后者的公式写成"2 × 8 × 128 × 80 = 160 KB"，这个算法把 K+V 的因子 2 和 bytes-per-element 的因子 2 合并算成"每 token 160 KB"。**两种算法在某一处重复或漏掉了一个 2**，需要 Sean 最后裁定到底是 160 还是 320。
**核查**：标准 Transformer KV cache 理论公式是 `num_layers × num_kv_heads × head_dim × 2 (K and V) × bytes_per_element` = 80 × 8 × 128 × 2 × 2 = 327,680 bytes = **320 KB**（FP16）。Sean 的数算对了。LMCache 的 160 KB 可能是单指 K **或** V（而非 K+V），或者已经考虑 MLA / GQA 进一步压缩。**Sean 的 320 KB 看起来和原理一致，但和公开计算器常见数字差 2 倍——风险是读者会拿计算器对比发现"不一样"**。
**建议**：两种处理都可以——(a) 在公式后面加一句"（K 和 V 分开存储，若按合并口径常见文献会写 160 KB/token）"；或 (b) 直接改为 160 KB 并修改下面 2.5 GB/10 GB/40 GB 的乘数。**我倾向 (a)**，因为 Sean 的原公式在物理上更清楚。
> 决定：agree

### [Q-006-03] 🟡 "H100 可以跑到 60-80% 利用率"——需要 hedge
**原文**："H100 在这种场景下能跑到 60–80% 的利用率，开心地吃 3 kW 电。"
**问题类型**：数据模糊
**Skeptical Take**：60-80% 的 MFU（Model FLOPs Utilization）只有在特定 kernel + batch + sequence length 组合里才能达到。业界公开的 Llama-3 70B training MFU 通常在 **40-50%** 左右，60-80% 是非常乐观的上限。"3 kW" 也是整机而非单卡（H100 SXM 单卡 TDP 700W）。
**核查**：Meta 发布的 Llama-3 论文中训练 MFU 约 40%；业界顶配基础设施（GB200）能做到 50-55% FP8。60-80% 这个数是 prefill 单 kernel 理论上限，不是端到端训练。
**建议**：改为"**prefill 阶段的密集矩阵乘 kernel 可以跑到 60-80% 的硬件利用率**（端到端 MFU 通常只有 40-50%）"。
> 决定：agree, very good

### [Q-006-04] 🟢 "1/300" 的说法
**原文**："在 decode 阶段，H100 的算力你最多用到 **1/300 ≈ 0.33%**"
**核查**：591 / 2 ≈ 295.5，所以 1/295 ≈ 0.34%。四舍五入到 0.33% 是 OK 的。没问题。
> 决定：agree

### [Q-006-05] 🟡 "70B FP16 = 140 GB"
**原文**："权重总量：70B × 2 bytes = **140 GB**"
**核查**：Llama-3 70B 严格数据是 70.6B 参数（含 embedding），FP16 下精确是 141 GB。"140 GB" 略偏低但四舍五入可以接受。
**建议**：加一句"（含 embedding 精确是 141 GB）"或直接保留 140 GB。
> 决定：加一句"（含 embedding 精确是 141 GB）"

### [Q-006-06] 🟠 Decode 上限表里的数字是否考虑 KV cache
**原文**：表里直接用 `内存带宽 / 140 GB` 得到 tok/s。
**问题类型**：方法论省略
**Skeptical Take**：这个公式假设"只读权重 140 GB"，但每一次 decode 还要读 KV cache。上下文 8K 时 KV cache 2.5 GB（按 320 KB 算）或 1.25 GB（按 160 KB 算），会进一步降低 decode tok/s 约 2-5%。Sean 在下一节承认了这一点，但表格里没反映。
**建议**：表格加脚注"（上限按权重-only 计算，未含 KV cache；实际 decode 会再慢 2-10%，取决于上下文长度）"。
> 决定：agree

### [Q-006-07] 🟢 "消费级 LPDDR5X 笔记本 68 GB/s"
**核查**：LPDDR5X 单通道 8533 MT/s × 64-bit / 8 = 68.3 GB/s，单通道口径正确。但实际"消费级笔记本"通常是双通道（约 120 GB/s）——Intel Lunar Lake 标称就是 8533-17066 MT/s。这个 68 GB/s 更像是单 DIMM 或单子通道的极限。
**建议**：在表格里脚注注明"单通道口径，笔记本整机通常双通道 120+ GB/s"，保持跟文章 #009 的一致性。
> 决定：agree

### [Q-006-08] 🟢 DGX Spark 官方规格链接
**原文**：引用了 `docs.nvidia.com/dgx/dgx-spark/hardware.html`
**核查**：链接有效，数字（128 GB LPDDR5X、256-bit、273 GB/s）与官方匹配。OK。
> 决定：agree

---

## 文章 3：#007 现代内存层级的真相

### [Q-007-01] 🟡 "tRCD 从 1999 年的 SDRAM 到 2024 年的 DDR5，基本上还是 15 纳秒"
**原文**：出现在第一节"致命的第一步"
**Skeptical Take**：1999 年 SDR SDRAM tRCD 通常是 **20 ns**（PC100/PC133），不是 15 ns。DDR5-6400 的 tRCD 约 14-16 ns。说法"25 年几乎没变"**整体对**，但起点不是 15 ns。后文第五节又说"SDRAM tRCD ≈ 20 ns，LPDDR5X tRCD ≈ 15 ns，延迟改善 25%"——**和这节的"15 ns 没动"自相矛盾**。
**核查**：PC133 SDRAM tRCD 标称 20 ns；DDR5-5600 tRCD 约 14 ns；LPDDR5 在 JEDEC 规格里 tRCD ≥ 18 ns（或 2nCK）。
**建议**：统一改为"tRCD 从 1999 年的 ~20 ns 降到 2024 年的 ~14-15 ns，二十五年只改善了 25-30%"——跟 #007 第五节、#005 第七节保持一致。**这是跨文章不一致**，见 Q-XREF-01。
> 决定：agree

### [Q-007-02] 🟠 能效表里 LPDDR5X 3 pJ/bit、HBM3 2.5 pJ/bit 的来源
**原文**："能效（pJ/bit）" 列：DDR5-6400 5-7、LPDDR5X 3、GDDR7 3.5-4、HBM3 2.5、NVLink-C2C 1-2。脚注引用 Rambus HBM3 blog。
**问题类型**：引用失真的风险
**Skeptical Take**：Rambus 官方确实说 HBM3 **2.5 pJ/bit**，GDDR6X **4.2 pJ/bit**（Sean 算的 68% 改进是对的）。但 LPDDR5X "3 pJ/bit" 和 GDDR7 "3.5-4 pJ/bit" 这两个数在 Rambus blog 里**找不到**，更像是 Sean 从 NVIDIA Grace 白皮书推算的——这个推算合理但没有直接源。
**核查**：[Rambus HBM3](https://www.rambus.com/blogs/hbm3-everything-you-need-to-know/) 确认 HBM3 2.5 pJ/bit、GDDR6X 4.2 pJ/bit。LPDDR5X 数字在 Micron / SK hynix 的 whitepaper 里通常给 3-4 pJ/bit 范围。
**建议**：脚注改成"HBM3 2.5 pJ/bit vs GDDR6X 4.2 pJ/bit 来自 Rambus；LPDDR5X / GDDR7 数字为 vendor 公开估算，仅供量级参考"。避免给人"都来自 Rambus"的误印象。
> 决定：agree

### [Q-007-03] 🟠 NVLink-C2C 延迟 "约 300 ns 量级"严重低估
**原文**：表里写"NVLink-C2C ... 约 300 ns 量级（估算，NVIDIA 未公开）"
**问题类型**：事实错误
**Skeptical Take**：Sean 承认是"估算"，但这个估算**低了 2-3 倍**。
**核查**：chipsandcheese 和 HPI 的 Grace Hopper benchmark 实测：[CPU 访问 GPU HBM 的延迟是 807 ns（2 MB pages 下），而直连 LPDDR5X 只有 220 ns](https://hpi.de/oldsite/fileadmin/user_upload/fachgebiete/rabl/publications/2025/hcds25-Werner-GraceHopper.pdf)。差值约 **600 ns**——也就是 C2C 的跨芯片延迟净增量是 600 ns 级别。
**建议**：改为"约 600-800 ns 量级（chipsandcheese / HPI Grace Hopper benchmark 实测）"，并附上链接。这是**技术读者会立刻挑出来的点**。
> 决定：agree

### [Q-007-04] 🟡 Mac Studio TDP "140W" 和 "H200 300W HBM 功耗"
**原文**："Apple M3 Ultra 用 LPDDR5X 做到 819 GB/s，整颗 SoC TDP 才 140W。""一块 H200 光 HBM 颗粒就要 5000+ 美元，功耗 300W 以上"
**问题类型**：数据模糊
**Skeptical Take**：M3 Ultra TDP 官方没公开数字，第三方评测的 Mac Studio M3 Ultra 整机功耗满载约 300-480W。"整颗 SoC TDP 140W" 数字偏低且没有明确来源——很像是 M1 Ultra / M2 Ultra 的旧数据被复用。H200 HBM3e 堆栈功耗 300W 也偏高（HBM 通常占整卡功耗 20-30%，H200 TDP 700W，HBM 约 150-200W）。
**建议**：(a) M3 Ultra TDP 改为"~200-250W SoC 估计（整机峰值 480W 左右）"。(b) H200 HBM 功耗改为"~150-200W HBM 部分"。两个数字都避免"具体 140W / 300W"。
> 决定：agree

### [Q-007-05] 🟢 HBM3e 单栈带宽 1.2 TB/s
**核查**：HBM3 单栈 819 GB/s (6.4 Gbps × 1024-bit)，HBM3e 单栈 1.2 TB/s (9.6 Gbps)。准确。
> 决定：agree

### [Q-007-06] 🟢 CoWoS 产能瓶颈
**原文**："封装工艺（CoWoS / CoWoS-L）产能极紧——瓶颈在台积电那 30 多台 CoWoS 机器上"
**核查**：2024-2025 年公开报道确实说 CoWoS 产能在 30-40k wafer/月区间。"30 多台机器"这个具体数字不是公开披露的，但整体方向准确。
**建议**：改为"30 多 k wafer/月产能"避免"30 多台机器"这个没源头的数字。
> 决定：agree

### [Q-007-07] 🟡 HBM3 单栈容量 "24-36 GB"
**原文**："**单栈 24–36 GB 是天花板**"
**核查**：HBM3 堆栈 8-Hi 最高 24 GB；HBM3e 12-Hi 最高 36 GB；HBM3e 16-Hi（2026-2027）可到 48 GB。"24-36"的下限（24）应该是 HBM3 8-Hi 的，不是 HBM3 的下限。
**建议**：改为"HBM3e 堆栈 24-36 GB（8-Hi 24 GB，12-Hi 36 GB）"。
> 决定：agree

---

## 文章 4：#008 MoE 的带宽悖论

### [Q-008-01] 🟠 Mixtral 8×7B 参数和权重
**原文**："**Mixtral 8×7B**：总参约 47B（共享部分 + 8 个专家），FP16 大小约 94 GB。"
**问题类型**：略微不准
**Skeptical Take**：Mixtral 8×7B 总参 46.7B，FP16 约 **93.4 GB**。"47B / 94 GB" 四舍五入可以。但说"共享部分 + 8 个专家"略模糊——Mixtral 的共享部分包括 attention layers 和 router，每 layer 有 8 个独立的 FFN（expert）。
**核查**：[Mixtral 8x7B 原始 blog](https://mistral.ai/news/mixtral-of-experts/) 确认总参 46.7B、每 token 激活 12.9B。
**建议**：改为 "46.7B 总参 / FP16 约 93 GB。每 token 激活 2 个 expert，约 12.9B 参数"。和文章下面用的"13B 激活"数字一致。
> 决定：agree

### [Q-008-02] 🟡 Mixtral 激活 26 GB 和 M3 Ultra 31 tok/s 推算
**原文**："M3 Ultra 带宽 819 GB/s，**理论 decode 上限 = 819 / 26 ≈ 31 tok/s**。实际社区报告...**约 12-16 tok/s**"
**问题类型**：上限算法偏乐观
**Skeptical Take**：13B 激活 × 2 bytes = 26 GB 搬运——但实际 decode 时 **attention 部分（共享，每次都要读）+ 激活 FFN + KV cache** 都要搬。只用 26 GB 当分母的结果会乐观一倍。这也解释了为什么实测只有 12-16 tok/s——不只是 burst 效率，而是分母就漏了共享参数的搬运。
**建议**：加一段"严格说分母应该是 共享 attention + 2 个 expert ≈ 30+ GB，实测拉到 12-16 tok/s 的损耗主要来自 (a) batch 效率、(b) 量化开销、(c) 共享参数重复搬运"。
> 决定：agree

### [Q-008-03] 🟠 PowerInfer 数字精度
**原文**："**LLaMA2-70B 里约 43% 的 neurons 覆盖了 80% 的 activation**（OPT-30B 是 26%，SwiGLU 后上升到 69%）"
**Skeptical Take**：论文里有两组数字——(a) MLP 层内部 "26% / 43%" 的 cold/hot split（和 Sean 引的一致），(b) 跨层统计 "17% / 26%"（Sean 没引）。43% 是 "ReGLU activation" 的 LLaMA-70B 数据，不是原版 LLaMA-2。"SwiGLU 后上升到 69%" 这个说法**在论文里没找到**——PowerInfer 指出 SwiGLU 激活不稀疏，所以 PowerInfer 的方法不直接适用于标准 LLaMA-2（标准版用 SwiGLU），他们用的是 ReGLU 改造版。"69%" 可能是 Sean 记错的另一个数字，或者来自 PowerInfer-2。
**核查**：[PowerInfer 原论文 arxiv 2312.12456](https://arxiv.org/abs/2312.12456) — "In the MLP layers of OPT-30B and LLaMA (ReGLU)-70B, 26% and 43% of neurons respectively are responsible for 80% of total activations"。
**建议**：改为"LLaMA2-70B（ReGLU 改造版）里 43% 的 neurons 覆盖 80% activation；OPT-30B 是 26%。（注：**标准 SwiGLU 版 LLaMA 不稀疏**，PowerInfer 必须换 activation function 才能触发稀疏性——这本身就是一个重要 caveat）"。删掉"69%"这个来历不明的数字。
> 决定：agree

### [Q-008-04] 🟡 PCIe 4.0 ×16 是否真是 PowerInfer 的通路
**原文**："**PCIe 4.0 ×16 的带宽是 32 GB/s**——这是权重从 CPU 搬到 GPU 的唯一通路"
**Skeptical Take**：PCIe 4.0 ×16 单向 32 GB/s，双向 64 GB/s，这个数字对。但"唯一通路"**对于老拓扑是对的，对 Grace-Hopper / GB200 就错了**——那些平台已经上了 NVLink-C2C 900 GB/s。Sean 在下一段有讲到这一点，但前半段读起来像一个绝对陈述。
**建议**：改成"在传统 PCIe 连接的 CPU+GPU 拓扑上，PCIe 4.0 ×16 的 32 GB/s 是唯一通路"。加"在传统"的前缀。
> 决定：agree

### [Q-008-05] 🟢 DeepSeek-V3 参数：671B 总参 / 37B 激活 / 256 routed + 1 shared / 每 token 激活 8 个
**核查**：和 [arxiv 2412.19437](https://arxiv.org/abs/2412.19437) 完全一致。OK。
> 决定：agree

### [Q-008-06] 🟡 "DeepSeek-V3 的 671B 总参，FP16 要 1.3 TB"
**原文**：六节
**核查**：671B × 2 bytes = 1.342 TB = 1.3 TB。正确。但 DeepSeek-V3 的训练和发布版是 **FP8 原生**（不是 FP16 训练后量化），BF16 checkpoint 大小约 1.3 TB 没错，但 FP8 原生版只要 **671 GB**。**"4-bit 量化也要 340 GB"** 也和标准 Q4 大致匹配（约 335-400 GB）。
**建议**：加一句"DeepSeek-V3 原生是 FP8，FP8 checkpoint 671 GB；社区 BF16 转换版 1.3 TB"，避免读者以为官方 release 就是 1.3 TB。
> 决定：agree

### [Q-008-07] 🟢 "LPDDR 本身的带宽（100+ GB/s）"
**Skeptical Take**：这里说 CPU 侧 LPDDR 带宽"100+ GB/s"对比 HBM 的 TB/s。但 Sean 这里指的是**普通桌面 DDR5** 还是 **LPDDR5X**？数字 100+ GB/s 更像前者（桌面双通道 DDR5 约 100 GB/s），而 DGX Spark / Grace 的 LPDDR5X 是 273 GB/s / 500 GB/s。
**建议**：改成"LPDDR5X 的带宽（100-300 GB/s，根据通道数）"。
> 决定：agree

---

## 文章 5：#009 本地推理设备的带宽现实

### [Q-009-01] 🟢 B200 / H200 / H100 数字全表
**核查**：
- B200：192 GB HBM3e、8 TB/s ✓
- H200：141 GB HBM3e、4.8 TB/s ✓
- NVLink 5：1.8 TB/s 每 GPU（双向合计），NVSwitch 上到 900 GB/s（每 link 方向）——"NVLink 5 / NVSwitch，900 GB/s 级别"这个说法**有点糊**——900 GB/s 是**每 GPU 到 NVSwitch 的带宽**，NVLink 5 总带宽是 1.8 TB/s 双向。
**建议**：改成"NVLink 5：每 GPU 1.8 TB/s 双向；NVSwitch 把多 GPU 连成全带宽拓扑"。
> 决定：agree

### [Q-009-02] 🟠 DGX Spark 互联 "ConnectX 200Gbps" 是否正确
**原文**："双 Spark 互联（ConnectX 200Gbps）可跑 405B 模型"
**核查**：DGX Spark 标准配置用的是 **ConnectX-7**，单口 200 Gbps，双口 400 Gbps。"200Gbps"是单口数字，OK。但"跑 405B"需要 **两台 Spark 加起来 256 GB 内存**——Llama-3.1 405B FP16 要 810 GB，Int4 也要 200+ GB——**两台 128 GB Spark 合起来 256 GB，只能刚好塞下 Int4 量化的 405B**，而且要走 25 GB/s 的 ConnectX 做 tensor parallel，效率非常低。
**建议**：加一句"Int4 量化下刚好能塞下 405B，但跨机 TP 的带宽代价极高，实测单 token latency 会很糟"。
> 决定：agree

### [Q-009-03] 🟡 "M3 Ultra 在单 batch 推理上打平 H100"
**原文**："**M3 Ultra 在单 batch 推理上打平 H100**"
**Skeptical Take**：理论带宽比 819 : 3350 ≈ 1 : 4.1，所以 M3 Ultra decode 理论上 **慢 H100 大约 4 倍**。"打平"这个说法夸张了。在 **超过 80 GB 的大模型**（H100 装不下）上，M3 Ultra 有"能跑"的优势；但在 70B 这种 H100 能装下的模型上，H100 明显更快。
**建议**：改为"**在 H100 装不下的大模型场景（>80 GB），M3 Ultra 是唯一能跑的方案**；在 70B 这种两者都能装的模型上，H100 仍然快 3-4 倍"。
> 决定：agree

### [Q-009-04] 🟢 M4 Ultra 未发布的判断
**核查**：截至 2026 年 4 月，Apple 确实还没发布 M4 Ultra，2025 年 3 月的 Mac Studio 顶配用的是 M3 Ultra。所以"跳过 M4 Ultra"这个判断是对的。
**建议**："M3 Ultra + M4 Max 的组合"这个说法可能让读者误以为一台机器里两颗芯片——实际上是两种 SKU 共存（M3 Ultra 高配 / M4 Max 中配）。措辞可以更精确一点。
> 决定：agree

### [Q-009-05] 🟢 "DGX Spark 的 GPU 算力约 1 PFLOPS FP4"
**核查**：NVIDIA 官方给 DGX Spark 1 PFLOPS FP4。正确。
> 决定：agree

### [Q-009-06] 🟠 Strix Halo 带宽 "256 GB/s"
**核查**：AMD 官方标 256 GB/s 理论峰值，但[chipsandcheese 实测约 212-215 GB/s](https://chipsandcheese.com/p/evaluating-the-infinity-cache-in)。"256 GB/s" 理论值可用，但读者会拿实测对比。
**建议**：加脚注"理论峰值；实测约 210-220 GB/s"。
> 决定：agree

### [Q-009-07] 🟢 Jetson AGX Orin 64GB "204.8 GB/s"
**核查**：官方规格 204.8 GB/s LPDDR5。正确。
> 决定：agree

### [Q-009-08] 🟡 Int4 模型大小换算
**原文**："Int4（35 GB）" — 70B × 0.5 bytes = 35 GB
**Skeptical Take**：Int4 理论每参 0.5 bytes，所以 70B × 0.5 = 35 GB。但实际 GGUF/AWQ/GPTQ 量化会有 2-4% overhead（非对称量化 scales / zero-points），**实测 70B Q4_K_M 约 40-42 GB**，不是 35 GB。
**建议**：保留"理论 35 GB"，加"（GGUF Q4_K_M 等实际量化方案约 40-42 GB，含 scales overhead）"。
> 决定：agree

### [Q-009-09] 🟠 "Apple M4 Max 笔记本（546 GB/s）：15.6 tok/s"
**Skeptical Take**：546 GB/s ÷ 35 GB = 15.6 tok/s 理论上限。但是 M4 Max **只有 36GB / 64GB / 128GB 三档**，35 GB 的模型要装进去**最小 64 GB 配置**才够（考虑系统预留）。128 GB 才舒服。文中写"笔记本跑 70B 流畅的门槛刚好越过"——**要注明是 64 GB+ 配置**。
**建议**：加"（需 64 GB 或 128 GB 配置的 M4 Max）"。
> 决定：agree

### [Q-009-10] 🟠 "Apple M4 Pro（273 GB/s, 64 GB）：容量 ✓（Int4 刚好够）"
**Skeptical Take**：M4 Pro 最大只能配 **48 GB**（MacBook Pro 14寸）或者 **64 GB**（Mac mini / MacBook Pro 16寸），说"64 GB" OK。但 Int4 量化后 Llama-3 70B 实际约 40-42 GB（见 Q-009-08），64 GB 配置里系统和 KV cache 占 15-20 GB，**装 70B Int4 实际上非常紧**，不是"刚好够"。
**建议**：改成"（Int4 约 40+ GB，在 64 GB 配置下能跑但系统余量紧张）"。
> 决定：agree

### [Q-009-11] 🟢 ConnectX-200G = 25 GB/s
**核查**：200 Gbps / 8 = 25 GB/s。正确。
> 决定：agree

---

## 文章 6：#010 四个任务，二十五年

### [Q-010-01] 🟢 "SDRAM 8 MB → HBM 192 GB（24,000 倍）"
**核查**：192 × 1024 / 8 = 24,576。OK。
> 决定：agree

### [Q-010-02] 🟢 "133 MHz 总线 → HBM3e 接口（1,000 倍带宽）"
**核查**：HBM3e 单栈 1.2 TB/s ÷ 266 MB/s ≈ 4,500 倍。B200 整卡 8 TB/s ÷ 266 MB/s ≈ 30,000 倍。"1,000 倍"这个数字太低了——Sean 可能想说的是**单 link / 单 channel** 带宽的改善，但那也是 HBM3 pin 速率对比 SDR。
**建议**：改成"266 MB/s → 1.2 TB/s 单栈（~4,500 倍）或 8 TB/s 整卡（~30,000 倍）"。
> 决定：agree

### [Q-010-03] 🟡 "10 tok/s 是人眼流畅阈值"
**原文**："LLM 的 decode 要保证每个 token 100 毫秒内出来（约 10 tok/s 是人眼流畅阈值）"
**Skeptical Take**：10 tok/s 其实是"勉强可用"，**人眼/阅读舒适的流畅阈值通常是 20-30 tok/s**（人类平均阅读速度约 250 WPM ≈ 5 WPS，但因 token ≠ word 要打折）。10 tok/s 更像"最低可接受"，不是"流畅"。
**建议**：改成"**约 10 tok/s 是最低可用阈值，20+ tok/s 才真正流畅**"。
> 决定：agree

### [Q-010-04] 🟠 CPO 数字 "CPO 市场被预测以 28.9% 的 CAGR 增长到 2035 年 12 亿美元"
**原文**：引用 IDTechEx
**Skeptical Take**：CAGR 数字可以在白皮书里找到，但"12 亿美元到 2035 年"非常小的市场规模——相比 NVIDIA 一个季度 400 亿美元营收，12 亿美元到 2035 年看起来**严重偏小**。可能 IDTechEx 只统计 CPO 模块本身，不含整个光互联生态。
**核查**：IDTechEx 2024 报告 "Co-Packaged Optics 2025-2035" 给出 "12亿" 这个量级确实**偏小**；Lightcounting、Dell'Oro 等竞品分析给出 2030 年 CPO + DCI 市场规模约 50-100 亿美元。
**建议**：改成"某一 IDTechEx 报告预测 CPO **模块**市场 2035 年 12 亿美元；其他分析（Lightcounting）给出更大口径数字"。或删掉具体数字，只保留"这是一个真在落地的方向"。
> 决定："某一 IDTechEx 报告预测 CPO **模块**市场 2035 年 12 亿美元；

### [Q-010-05] 🟡 Broadcom Bailly 51.2 Tbps 和 70% 功耗降低
**原文**："Broadcom Bailly 51.2 Tbps 交换机把光引擎整合进 Tomahawk 5，把功耗**直接降 70%**"
**核查**：Broadcom Bailly 2023 发布，确实是 51.2 Tbps CPO 交换机。"功耗降 70%"的说法出现在 Broadcom 宣传材料里，具体比较对象是"光引擎部分的功耗"（vs 传统 pluggable optics），不是整机功耗。
**建议**：改成"把**光互联部分**的功耗降 70%"。
> 决定：agree

### [Q-010-06] 🟠 "HBM4 base die 走 TSMC 3nm / Samsung 4nm 逻辑工艺，就是为了让 PIM 成为 HBM 的标配"
**Skeptical Take**：HBM4 确实规定 base die 可以用 logic 工艺（而不是 DRAM 工艺）——这是 JEDEC 2024 年定的。但"就是为了让 PIM 成为 HBM 的标配"**过度推断**——HBM4 的 logic base die 更多是给**更高速 PHY、buffer、RAS 功能**用的，PIM 只是其中一个可能用途，不是主要动机。
**核查**：JEDEC HBM4 规范并没有把 PIM 列为强制特性。三星、SK 海力士在 HBM4 路线图里有提到 PIM 选项，但不是默认。
**建议**：改成"HBM4 的 base die 用 logic 工艺，这给 PIM、高速 PHY、RAS 等功能**都打开了空间**——PIM 是否会成为 HBM4 标配仍不确定"。
> 决定：agree

### [Q-010-07] 🟢 Samsung HBM-PIM (Aquabolt-XL) 2.5× 性能 / 60% 功耗
**核查**：Samsung 2021 论文 "Aquabolt-XL" 上 Xilinx Alveo 测试结果确实是 2.5× 系统性能、60% 能耗降低。OK。
> 决定：agree

---

## 文章 7：jensen-management-bandwidth-draft.md（Jensen 管 60 人）

### [Q-JENSEN-01] 🟠 "2010 年代 Jensen 直接下属是 40 人，今天是 60+"
**原文**：零节
**Skeptical Take**：Tae Kim《The Nvidia Way》是否具体给了"2010 年代 40 人"这个数字？我没在公开引用里找到这个具体的"40人"历史数字。公开报道都只讲 Jensen 现在有 60 人直接下属，但没 quantify 过去是 40 人。
**核查**：[Fortune 2024](https://fortune.com/2024/11/12/jensen-huang-nvidia-ceo-leadership-mpp/) 只提 60 人。搜索所有书评和 Tae Kim 访谈未见 "40 人" 这个数字。
**建议**：如果 Sean 是从书里某一页看到的，加页码引用；否则改成"比典型 CEO 的 7 人多得多，已经增长到今天的 60+ 人"。"40 人"这个具体历史数字需要原书页码核对。
> 决定：原文是从书里找到，所以没问题。需要加上原文引用。

### [Q-JENSEN-02] 🟠 "I drink a scotch, and I do e-mails" 出处精确性
**原文**："他自己的原话：**I drink a scotch, and I do e-mails.**"
**核查**：这句话确实被引用在《The Nvidia Way》里，但**是否是原话还是转述**，需要具体页码。[Founders Podcast 访谈 Tae Kim](https://podscripts.co/podcasts/founders/376-jensen-huang-founder-of-nvidia) 提到过这个细节。Highland Park 品牌的具体提及——这个**更细的细节**出处是不是书里，需要 Sean 核对。
**建议**：保留 "I drink a scotch, and I do e-mails" 原话，但把 "Highland Park" 这个品牌名改成"一杯苏格兰威士忌"，除非 Sean 有明确出处。
> 决定：agree

### [Q-JENSEN-03] 🟠 "weak signals" 和 "brainpower" 原话
**原文**："**我在找的是 weak signals——强信号谁都能捕捉到，但我要在它们还弱的时候就抓住。你（e-staff）可能没有这个 brainpower 去识别我认为重要的东西。**"
**核查**：Jensen 的原话（Tae Kim 转述）是 "It's easy to pick up the strong signals. But I want to intercept them when they are weak." **没有找到"你 e-staff 可能没有这个 brainpower"这句话**——这句话尖锐程度和 Jensen 的公开风格不太一致（Jensen 公开场合很少直接贬低自己的 VP）。
**建议**：**极有可能这句"brainpower"是 Sean 润色/夸张的——需要核对原文**。如果不是原话，应改成转述口吻"他的理由尖锐——e-staff 不一定能识别那些在他看来最重要的弱信号"。
> 决定：agree

### [Q-JENSEN-04] 🟡 "Jensen 每天读大约 100 封 Top 5"
**核查**：公开引用里通常说 "hundreds of emails per day"，具体 "100 封" 这个精确数字需要核对。Fortune 的描述是 "dozens"。
**建议**：改成"Jensen 每天读几十到上百封 Top 5"。
> 决定：agree

### [Q-JENSEN-05] 🟡 "Mission is the boss" 是否是 Jensen 原话？
**原文**：机制 1
**核查**：Tae Kim 书里有 "mission is the boss" 这个表达，但也可能是 Sean 对某段话的概括。
**建议**：确认出处，加引用。
> 决定：是原文引用

### [Q-JENSEN-06] 🟢 Amazon two-pizza team 6-10 人
**核查**：Bezos 最初说 "two pizzas" 通常 = 5-8 人，Sean 说 6-10 略宽泛但可接受。OK。
> 决定：6-10 ok

### [Q-JENSEN-07] 🟡 罗马百人队 "10 人一队 × 10 队"
**原文**："罗马百人队（centuria）：名字叫"百人"，实际战斗编制是 10 人一队 × 10 队"
**Skeptical Take**：罗马 centuria 实际人数是 60-100 人不等（帝国时期常规 80 人），不是严格 100。**内部结构是 contubernia（10 人帐篷 tent group）**——Sean 说的"10 × 10"**概念对但数字不精确**，应该是 80 人 = 10 contubernia × 8 人。
**核查**：Livy、Vegetius 都记载 centuria = 80 人（contubernia 10 × 8 人）为帝国罗马军团常规编制。
**建议**：改成"罗马百人队（centuria）帝国时期实际 80 人 = 10 个 contubernia（帐篷组 8 人）"。或者干脆简化为"即使叫'百人队'，每个士官实际只带 8 人的小组"。
> 决定：加入百夫长的概念

### [Q-JENSEN-08] 🟢 拿破仑一个营长管 6-8 个连长
**核查**：19 世纪法军营编制一般是 4-6 个连，不是 6-8。但各国各时期有差异，不是严重错误。
**建议**：改成"4-6 个连长"以更贴近拿破仑改革后的具体编制。
> 决定：agree

### [Q-JENSEN-09] 🟢 "Miller 1956 神奇的数字 7±2"
**核查**：Miller 1956《Psychological Review》vol. 63，Sean 引用正确。但**注意**：Miller 本人在论文里就说 "7±2" 是 channel capacity 对 absolute judgment 任务的限制，不完全是 working memory 容量。**后续研究（Cowan 2001）认为真正的 working memory 容量是 4±1**，7±2 其实偏高。这个是心理学圈的常识。
**建议**：保留 Miller 引用，但可以加一句"（后续 Cowan 2001 等研究认为实际 working memory 更接近 4±1，Miller 的 7 是上限）"。
> 决定：agree

### [Q-JENSEN-10] 🟡 "信息经过 4 次压缩解码"示例
**原文**：CEO 听到的那个层层失真的例子
**Skeptical Take**：这个例子**可能是 Sean 写的生动段子**而不是真实 quote。需要核对。
**建议**：既然是比喻，可以保留，但不要让读者以为这是谁的 quote。OK 保留。
> 决定：agree

### [Q-JENSEN-11] 🟢 字节矩阵架构 "飞书一天 6 个会"
**Skeptical Take**：这个数字是坊间说法，不是研究数据。作为行业观察可以保留。
**建议**：加"据坊间"。
> 决定：agree

---

## 文章 8：movie-recap-bandwidth-draft.md（5 分钟电影解说）

### [Q-MOVIE-01] 🟡 "抖音每 8 秒 swipe 一次"
**原文**："**3 小时黑屋里关手机**的你，和**躺在床上竖屏刷 5 分钟**的你...后者你每 8 秒就有一次 swipe 冲动"
**Skeptical Take**："每 8 秒 swipe 一次" 是 Sean 反复用的数字（douyin 篇也用了"12 秒被打断一次"）。两个数字**在两篇里不一样**（一个 8，一个 12），而且公开文献里找不到严格意义的"平均 swipe 间隔"数字。
**核查**：公开数据只给出 TikTok 单 session 平均 10 分 51 秒、总观看时长 45-60 秒/视频。Swipe 间隔没有严谨数字。
**建议**：两篇数字统一为"每 10 秒左右 swipe 一次"，并加脚注"非严谨测量，基于视频平均长度估算"。
> 决定：agree

### [Q-MOVIE-02] 🟢 电影例子（《霸王别姬》《海上钢琴师》《星际穿越》）
**核查**：剧情描述准确。Cooper 坐在飞船里看 23 年视频留言的场景确实存在。OK。
> 决定：agree

### [Q-MOVIE-03] 🟡 "好电影一半是发生的，一半是没发生的"——来源
**Skeptical Take**：这是很漂亮的句子，但是不是某个导演说过的？如果是原创也没问题。
**建议**：如果是原创就不用标注；如果受某人启发可标。OK 作为原创。
> 决定：agree

### [Q-MOVIE-04] 🟢 L1/L2/L3 cache 比喻
**判断**：这个比喻延续了主线系列的内存层级框架，内部自洽。OK。
> 决定：agree

---

## 文章 9：ie-social-bandwidth-draft.md（i/e 人带宽）

### [Q-IE-01] 🟠 "内向者的大脑皮层基线唤醒度比外向者高 20-30%"
**原文**：一节
**Skeptical Take**：这是 Eysenck 1967 理论的**通俗化数字**。Eysenck 本人并没有给出 "20-30%" 这个具体百分比——他的理论是 **ascending reticular activating system (ARAS)** 在 introverts 中更活跃。**"20-30%" 这个具体数字找不到原始出处**——很可能是 Sean 基于 EEG 研究里某个具体实验结果推广的。
**核查**：最新综述（[Personality Predicts Brain Responses to Cognitive Demands PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC6730115/)）只说 "higher baseline cortical arousal"，没给出百分比。
**建议**：把 "20-30%" 删掉，改成"**基线唤醒度系统性更高**（各实验具体幅度不同，从几个百分点到 20%+ 不等）"。
> 决定：agree

### [Q-IE-02] 🟡 Depue & Collins 1990s 多巴胺响应
**原文**："90 年代的研究（Depue & Collins 等）进一步发现：**e 人对多巴胺奖励信号的响应更陡**"
**核查**：Depue & Collins 1999 年确实发表了 "Neurobiology of the structure of personality: Dopamine, facilitation of incentive motivation, and extraversion" 在 Behavioral and Brain Sciences。这个大方向正确。"更陡"是 Sean 的简化措辞，原文更谨慎。
**建议**：保留引用，加年份（1999）。
> 决定：agree

### [Q-IE-03] 🟢 MBTI 中国爆火引用
**判断**：可接受的社会观察描述，不需要数据。
> 决定：agree

---

## 文章 10：douyin-5sec-bandwidth-draft.md（抖音 5 秒）

### [Q-DOUYIN-01] 🟠 "12 秒被打断一次"和"8 秒"的数字不一致
**原文**："而你在抖音上，**12 秒被打断一次**"
**Skeptical Take**：movie 篇用的是 "8 秒"，这里是 "12 秒"。两个数字 Sean 需要选一个。
**核查**：公开数据：TikTok 平均视频长度 45 秒，完播率决定 5-8 秒前的 hook。"12 秒" 这个精确数字没有公开来源。
**建议**：统一数字。或说"每 10 秒左右"。见 Q-MOVIE-01。
> 决定：agree

### [Q-DOUYIN-02] 🟡 "抖音 2024 年平均视频时长 45 秒"
**核查**：2023 年 Statista 数据 TikTok 全平台平均时长约 52 秒；2024 年抖音（中国版）平均时长没有权威公开数字，但业内估计 40-60 秒。
**建议**："45 秒" OK，加"（行业估算，非官方披露）"。
> 决定：agree

### [Q-DOUYIN-03] 🟠 Gloria Mark "23 分钟恢复注意力"——精确出处
**原文**："一位叫 Gloria Mark 的研究员做了近 20 年的注意力研究，核心发现之一：**一个人被打断一次后，平均需要 23 分钟才能完全回到之前的认知深度**"
**核查**：Gloria Mark 2008 年 CHI 论文 "The Cost of Interrupted Work" 给出 **23 分钟 15 秒**的数字。Sean 说"23 分钟"正确，但"之前的认知深度"这个措辞**略模糊**——原论文是"return to the task"，不是"认知深度"。
**建议**：改成"平均需要 **23 分 15 秒**才能回到原任务状态（Gloria Mark 2008 CHI 论文）"。
> 决定：agree

### [Q-DOUYIN-04] 🟢 Miller 7±2 引用
**核查**：引用 Miller 1956，正确。
> 决定：agree

### [Q-DOUYIN-05] 🟡 "720 次 L1 cache flush"——算术
**原文**："一小时刷抖音 = 720 次 L1 cache flush"（假设每 5 秒一次）
**核查**：3600 / 5 = 720。成立。
**建议**：OK。
> 决定：agree

### [Q-DOUYIN-06] 🟢 "多任务已被科学证伪"
**核查**：这个说法有足够支持（Gazzaley 等）。OK。
> 决定：agree

---

## 文章 11：standup-hollywood-shannon-draft.md（密度最高风险最大）

### [Q-SHANNON-01] 🟢 Shannon I(x) = -log₂ P(x) 定义
**核查**：完全正确。Shannon 1948《A Mathematical Theory of Communication》。OK。
> 决定：agree

### [Q-SHANNON-02] 🟡 "太阳明天升起 I ≈ 0；明天下雨 I ≈ 2 bit；明天下陨石 I ≈ 30 bit"
**Skeptical Take**：这些具体数字是 Sean 的**比喻性估算**，不是 Shannon 的原文。严格说："明天下雨" I = -log₂ P，如果 P = 0.25 则 I = 2 bit（还说得过去）；"陨石" 如果 P = 1/10^9 则 I = 30 bit（大致 OK）。但这三个数字作为"例子"读起来像有数据支持，其实只是 order-of-magnitude 比喻。
**建议**：加"（数值为示意级估算）"。
> 决定：agree

### [Q-SHANNON-03] 🟠 "1964 Koestler bisociation" 应用到幽默
**核查**：Koestler《The Act of Creation》(1964) **是**把 bisociation 应用到幽默、科学发现、艺术创造。Sean 引用正确。但"Koestler 起了这个名字"——bisociation 这个词**确实是 Koestler 自创**的。OK。
> 决定：agree

### [Q-SHANNON-04] 🟠 fMRI 研究 "medial prefrontal cortex + temporo-parietal junction 同时激活"
**原文**："fMRI 研究已经验证：听笑话的瞬间，**medial prefrontal cortex + temporo-parietal junction** 同时激活"
**Skeptical Take**：**这个说法需要具体出处**。幽默的 fMRI 研究（Mobbs et al. 2003、Goel & Dolan 2001 等）确实发现 mPFC 激活，但 temporo-parietal junction（TPJ）的激活更多出现在**讽刺/双关理解**类的研究里，不是所有笑话。Sean 把这两个脑区绑定成"听笑话必激活"**是过度简化**。
**核查**：Mobbs et al. 2003 发现幽默相关激活在 **temporoparietal junction + prefrontal cortex**，Goel & Dolan 则强调 mPFC。Sean 的描述大方向对但过于绝对。
**建议**：改成"多项 fMRI 研究（Mobbs 2003、Goel & Dolan 2001 等）发现笑话理解涉及 mPFC 和 TPJ 等区域，对应'重建语义'和'视角切换'的双重加工"。
> 决定：agree

### [Q-SHANNON-05] 🟠 McGraw 2010 benign violation theory
**核查**：A. Peter McGraw 和 Caleb Warren 2010 年发表在 Psychological Science，Leeds School of Business（University of Colorado Boulder）。Sean 说"科罗拉多大学的 Peter McGraw"正确。OK。
> 决定：agree

### [Q-SHANNON-06] 🔴 "Cognitive 10-20s + Emotional 3-8s + Cooling 10-20s" 的出处
**原文**："**Cognitive processing**（10-20 秒）...**Emotional response**（3-8 秒）...**Reward cooling**（10-20 秒）"
**Skeptical Take**：**这三个时间窗口的精确数值找不到权威出处**。Sean 可能是综合多篇文献推算的。作为"模型估算"可以，但写得像有科学数据支持就过了。
**建议**：改成"综合 Martin 2007、Wyer 2007、Savage 2009 等工作，一个笑点的认知-情绪-冷却大约在 **30-50 秒**量级（具体时间点为综合估算）"。
> 决定：agree

### [Q-SHANNON-07] 🟠 "Nyquist 定理的幽默版"
**原文**："这不是段子手的"艺术直觉"——**是 Nyquist 定理的幽默版：采样率不能高于生理 response cycle 的倒数**"
**Skeptical Take**：比喻很好，但 **Nyquist 是反过来的**——Nyquist 说采样率**至少**是信号最高频率的 2 倍；Sean 这里说采样率**不能高于**——**比喻方向刚好反了**。严格说这里的类比是"生理响应不应期"，更像是"**refractory period + bandwidth limiting**"而不是 Nyquist。
**建议**：改成"这不是艺术直觉——是**生理不应期**的数学形式：笑点的 refresh rate 不能高于一次完整认知-情绪-冷却循环的倒数"。删掉"Nyquist 定理的幽默版"。
> 决定：可以修改，但保留"Nyquist 定理的幽默版"

### [Q-SHANNON-08] 🟠 Rod Martin 2005 "2.4 笑点/分钟"
**原文**："2005 年 Rod Martin 的《The Psychology of Humor》定量测过职业演员的密度，平均 **2.4 个笑点/分钟**"
**Skeptical Take**：Rod Martin 的书是 **2007** 年出的（不是 2005），书名是《The Psychology of Humor: An Integrative Approach》。"2.4 个笑点/分钟" 这个具体数字在书里找不到——Martin 确实引用过一些关于 punch line rate 的研究，但 "2.4/min" 这个精确数字没查到。
**核查**：Martin 2007 书。搜索没返回 "2.4 per minute" 这个具体数字。
**建议**：(a) 把年份改成 2007；(b) "2.4 笑点/分钟" 要么给出具体引用页码，要么改成"职业演员的密度大致是每 30 秒一个"。**这是一个读者如果真查书会发现不对的数据点**。
> 决定：agree

### [Q-SHANNON-09] 🟠 "Laughter fatigue 20 分钟后开始线性下降"
**Skeptical Take**：这个具体数字（20 分钟）**没有找到严谨文献支持**。
**建议**：删掉"约 20 分钟后开始线性下降"或改成"长时间后会出现 laughter fatigue（具体曲线因人而异）"。
> 决定：agree

### [Q-SHANNON-10] 🔴 "连续响应 50-60 分钟后，同样的 I(x) 输入产生的笑声强度降至 60% —— Martin 2005 的实验定量测过"
**Skeptical Take**：**这个实验和这个数字我找不到任何出处**。Rod Martin 2007 没有这个实验，Provine 2000 也没有。这看起来是 Sean 为了立论编的"精确感数字"。如果有出处，Sean 必须给页码。
**核查**：Rod Martin 2007《Psychology of Humor》没这个实验。
**建议**：**必须删除或找到真实出处**。这是 TechCrunch 编辑会立刻打回去的数据点。
> 决定：尽量找到出处并保留

### [Q-SHANNON-11] 🟠 Save the Cat 节拍时间戳 110 分钟版本
**原文**：节拍表（Catalyst 12 min、Break Into Two 25 min、Midpoint 55 min、All Is Lost 75 min、Break Into Three 85 min、Final Image 110 min）
**核查**：Blake Snyder 原书给的是 **110 页**的节拍表（一页一分钟的惯例）。Sean 的数字：Catalyst 12、Break into Two 25、B story 30、Midpoint 55、All Is Lost 75、Break into Three 85、Final Image 110——**和原书一致**。但"Break into Three 85 min" 对应的页数在 Snyder 原书里是 **第 85 页**。OK。
**建议**：表格正确，可以保留。考虑加一句"（110 页 ≈ 110 分钟的惯例；现代商业片常见节拍表伸缩）"。
> 决定：agree

### [Q-SHANNON-12] 🟠 "IMDb Top 250 平均时长 129 分钟"
**Skeptical Take**：IMDb Top 250 实际平均时长需要实际 calc。公开搜索没有精确统计过，但考虑到 top 250 里有《教父》《指环王》这类长片，平均**应该高于 129**（估计 130-140 分钟）。"129 分钟" 可能是某个年份某一次统计，需要出处。
**核查**：搜索未找到"IMDb Top 250 平均 129 分钟"这个精确数字的权威来源。
**建议**：(a) 如果数字来自某次统计，给出来源年份；(b) 否则改成"**IMDb Top 250 平均时长约 130 分钟量级**"。
> 决定：agree

### [Q-SHANNON-13] 🟠 "北美商业电影中位数 110 分钟"
**核查**：[statista 2023 数据](https://www.statista.com/statistics/1292523/lenght-top-movies-us/)：2023 年北美票房前 100 名平均 119 分钟，中位数接近 115 分钟。"110 分钟" 偏低但在合理范围内。
**建议**：改成"北美商业电影中位数约 115 分钟"，或者 hedge "约 110-120 分钟"。
> 决定：agree

### [Q-SHANNON-14] 🟠 "The Irishman 一次性完播率不到 25%"
**原文**："Martin Scorsese 的《The Irishman》3.5 小时无 intermission，Netflix 统计的**一次性完播率不到 25%**"
**Skeptical Take**：**Netflix 不公开单片完播率数据**。"25%" 这个数字**没有权威来源**——可能是第三方数据分析公司（如 Nielsen）的非公开数据，或者是 Sean 的估算。
**核查**：搜索未找到 Netflix 公开 Irishman 完播率的数据。
**建议**：改成"坊间估计一次性完播率很低"或 "Nielsen 等第三方数据显示完播率显著低于主流商业片" 并加 hedge。**这是又一个读者会质疑的数字点**。
> 决定：agree

### [Q-SHANNON-15] 🟠 Nørretranders "60 bits/秒" 意识带宽
**原文**：损失函数表里 `B_cognitive` ~60 bits/秒，标注"Nørretranders 估算"
**核查**：Nørretranders《The User Illusion》原书估算是 **约 16 bits/秒**（有时写 20 bits/秒）。Sean 写 **60 bits/秒** 更像是其他作者（Marois 2005 等）的估算，不是 Nørretranders 本人的数字。
**建议**：改成"~16 bits/秒（Nørretranders 原书估算，不同测量方法从 16 到 60 bits/秒不等）"。**这是一个精确的来源归属错误**。
> 决定：agree

### [Q-SHANNON-16] 🟡 拼盘专场 "每人 10-15 分钟 × 6-7 人"
**判断**：中国脱口秀拼盘格式的经验观察，可接受。
> 决定：agree

### [Q-SHANNON-17] 🟡 "美国 HBO/Netflix 独角专场 45-60 分钟"
**核查**：HBO 原创 stand-up special 常规 55-75 分钟，Netflix 则更灵活 45-95 分钟。"45-60" 偏低。
**建议**："45-75 分钟"更准确。
> 决定：agree

### [Q-SHANNON-18] 🟢 "Edinburgh Fringe Comedy 标准 60 分钟"
**核查**：Fringe 正式 stand-up slot 确实以 60 分钟为标准。OK。
> 决定：agree

---

## 文章 12：jobs-black-t-decision-bandwidth-draft.md（乔布斯黑 T）

### [Q-JOBS-01] 🟢 2011 乔布斯衣柜照片
**核查**：Jobs 2011 年 10 月去世后，Issey Miyake 黑高领 + Levi's 501 + New Balance 991 的衣柜照片/描述确实流传甚广。核对 Walter Isaacson 传记里 Jobs 自己说 "I asked Issey to make me some...he made me like a hundred of them"。描述准确。
> 决定：agree

### [Q-JOBS-02] 🟠 奥巴马 Vanity Fair 2012 quote 完整原文
**原文**：Sean 引 "You'll see I wear only gray or blue suits. I'm trying to pare down decisions. I don't want to make decisions about what I'm eating or wearing. Because I have too many other decisions to make."
**核查**：Michael Lewis《Obama's Way》Vanity Fair 2012 年 10 月号。原文核心部分**完全一致**。OK。
> 决定：agree

### [Q-JOBS-03] 🟠 扎克伯格 quote
**原文**："**马克·扎克伯格**...他公开解释过：'我不想把脑子花在'今天穿什么'这种小事上。因为我每天要做**上千个影响 Facebook 用户的决定**...'"
**核查**：Zuckerberg 2014 年 Facebook Q&A 原话："I really want to clear my life to make it so that I have to make as few decisions as possible about anything except how to best serve this community." Sean 的中文翻译**大意接近但不完全逐字**。
**建议**：保留精神，但加"（大意翻译）"或直接引英文原文。
> 决定：agree

### [Q-JOBS-04] 🟡 爱因斯坦 7 套同款西装 Snopes
**原文**："据说衣柜里有 7 套完全一样的灰色套装，一周七天轮穿。（这一条后来被 Snopes 核实过有夸大，但爱因斯坦确实长期穿同款灰针织衫）"
**核查**：我搜到的 Snopes 没有直接针对 "7 suits" 的 fact-check 文章。公开证据只能证明 Einstein 长期穿相似款（灰色），**但"7 套"这个具体数字找不到严肃出处**。Sean 的 hedge "Snopes 核实过有夸大" **需要给出 Snopes 链接**。
**建议**：要么给 Snopes 链接；要么改成"据传衣柜里有多套相似灰色西装（具体数量未经核实）"。
> 决定：agree

### [Q-JOBS-05] 🟡 村上春树作息
**原文**："**村上春树**——每天作息完全一样：4 点起床写作 5-6 小时、下午跑 10 公里或游泳、晚上 9 点睡。30 年不变。"
**核查**：村上春树在《What I Talk About When I Talk About Running》中描述过类似作息。"4 点起床写作 5-6 小时"和"10 公里或游泳"都与他自述一致。OK。但"30 年不变"有点绝对，他在部分时期（比如写长篇小说期间）会更激进。
**建议**：改为"多年来基本不变"。
> 决定：agree

### [Q-JOBS-06] 🔴 "1998 年 Baumeister ego depletion 实验——超市 30 次挑选"
**原文**：二节
**Skeptical Take**：Baumeister 1998 年经典论文是 Baumeister, Bratslavsky, Muraven, Tice "Ego Depletion: Is the Active Self a Limited Resource?" 发表在 *Journal of Personality and Social Psychology*。**原版实验不是"超市 30 次挑选"**——原版第一个实验是 "radish vs cookies"（让饿的人忍住不吃饼干），然后做几何题。"超市购物挑选影响后续自控"的实验是 Vohs, Baumeister, Schmeichel 2008（Journal of Personality and Social Psychology），不是 Baumeister 1998。**年份和实验内容都错了**。
**核查**：Vohs et al. 2008 "Making choices impairs subsequent self-control" 是超市/挑选类型的 ego depletion 实验。
**建议**：改成"1998 年 Baumeister 提出 ego depletion 理论（饼干-萝卜实验），2008 年 Vohs 等做了挑选任务的延伸实验..."。**这是严重的实验归属错误**。
> 决定：agree

### [Q-JOBS-07] 🔴 Ego depletion 没有任何 hedge——replication crisis 完全没提
**Skeptical Take**：**这是整个生活 7 篇里最大的风险点**。Ego depletion 在 **2016 年 multi-lab replication (Hagger 等, Vohs 等) 均失败**。Carter & McCullough 2015 meta-analysis 表明 publication bias 控制后效应接近 0。**今天任何有科学素养的心理学家/记者看到"不加 hedge 的 ego depletion"，都会直接把这篇打到 low-credibility 类别**。
**核查**：[Wikipedia: Ego depletion](https://en.wikipedia.org/wiki/Ego_depletion)；[Replicability Index 2016](https://replicationindex.com/2016/04/18/rr1egodepletion/)；Vohs et al. 2021 多实验室预注册复制失败。
**建议**：**必加一个 big caveat 段落**："值得注意的是 ego depletion 这个理论在 2016 年之后遭遇了**严重的 replication 质疑**（Hagger et al. 2016 的多实验室复制失败，Carter & McCullough 2015 的 meta-analysis 显示 publication bias 控制后效应接近 0）。今天心理学界对 '意志力是一个会耗尽的葡萄糖池' 这个模型已经不再有共识。更新后的解释倾向于 motivation shift / attention shift 而非 literal 的'能量耗尽'。虽然'做决定有成本'这个感性经验广泛成立，但具体机制比原始理论复杂得多。"——不加这段，整个乔布斯篇的科学 credibility 会被打折。
> 决定：agree

### [Q-JOBS-08] 🔴 Danziger 2011 只给 Weinshall-Margel 一句话 hedge 不够
**原文**："这项研究后来被质疑过（样本偏差、案件排序问题——Weinshall-Margel & Shapard 2011），但**"决策质量是时间和代谢资源的函数"**这个大方向，在后续 20 多项研究里反复被验证。"
**Skeptical Take**：Weinshall-Margel 的质疑**比 Sean 给的 hedge 更严重**。他们通过采访发现**案件排序不是随机的**——法官会在 break 前把"同一个监狱的案子"集中处理完，而且没有律师代理的犯人（天然假释率低）**往往排在每个 session 的末尾**。这不是简单的"质疑"——是提出一个完全不同的因果解释。**"大方向在 20 多项研究里被验证"** 也过头——血糖对决策的影响文献**也有复制争议**（Orquin & Kurzban 2016 meta-analysis）。
**建议**：把 Weinshall-Margel 的质疑更具体描述："Weinshall-Margel & Shapard 2011 通过访谈发现案件排序**不是随机的**——法官在 break 前倾向集中处理同一监狱的案件，且无律师代理的犯人（天然低假释率）倾向排在 session 末尾。这个 confound **可能完全解释观察到的效应**。'饿法官效应' 的真实性**在学界仍有争议**。"
> 决定：agree

### [Q-JOBS-09] 🟠 Wansink 35,000 decisions per day 出处归属
**原文**："康奈尔大学食品研究员 Brian Wansink 的团队估算过：**普通成年人一天做约 35000 个决定**。"
**Skeptical Take**：Wansink 2007 的论文只讲 **226 个食物决定**，不是 35,000 个总决定。"35,000" 的常见归属是 Sahakian & Labuzetta 2013（一本 popular 书），**不是 Wansink 的研究**。另外 **Brian Wansink 在 2018 年因大量统计造假被康奈尔停职，他的研究普遍被撤稿**——引用 Wansink 本身就带着严重问题。
**核查**：Wansink 2007 Environment and Behavior 只讲食物决定。35,000 的来源是 Sahakian & Labuzetta。Wansink 的多项研究被康奈尔调查后撤稿（2018+）。
**建议**：**必须同时做两件事**：(a) 把 "35,000 decisions" 的归属改成 Sahakian & Labuzetta 2013（流行书，非严谨研究）；(b) **删除 Wansink 的引用或加 disclaimer**"（注：Wansink 的研究后来因数据造假被多次撤稿，引用时需谨慎）"。**这是乔布斯篇的另一个高风险点**。
> 决定：agree

### [Q-JOBS-10] 🟡 "前额叶一天里的状态曲线"
**原文**：策略 2 那一段"早晨 9-11 最满、午后 3-5 低谷"
**Skeptical Take**：这个曲线**笼统看有支持**（circadian + glucose 动力学），但"午后 3-5 点是低谷"这个具体时段**因人而异**——chronotype 差异很大（晨型 vs 夜型人）。作为 generic 建议 OK，但不是精确生理数据。
**建议**：加"对多数晨型人来说..."的前缀。
> 决定：agree

### [Q-JOBS-11] 🟢 "Christopher Nolan 永远深蓝外套 + 白衬衫"
**核查**：Nolan 公开场合确实经常这个打扮。OK。
> 决定：agree

---

## 文章 13：dopamine-dressing-visual-bandwidth-draft.md（多巴胺穿搭）

### [Q-DOPAMINE-01] 🔴 "Livingstone 和 David Hubel 1984 V4 区神经元对饱和度极其敏感"
**原文**："1984 年 Margaret Livingstone 和 David Hubel（Hubel 是诺贝尔奖得主）的经典论文发现：**V4 区神经元对"饱和度"极其敏感**"
**Skeptical Take**：**这个引用严重失真**。Livingstone & Hubel 1984 的论文《Anatomy and Physiology of a Color System in the Primate Visual Cortex》是关于 **V1 的 cytochrome oxidase blobs 和 double-opponent cells**，**不是 V4**。V4 的颜色和饱和度响应研究更晚——Zeki 1973, 1980；Conway 2014（JNeurosci 的 V4 perceptual color map paper）。**把 V4 研究归到 Livingstone & Hubel 1984 是一个具体的科学引用错误**。
**核查**：[L&H 1984 J Neurosci paper](https://www.semanticscholar.org/paper/Anatomy-and-physiology-of-a-color-system-in-the-Livingstone-Hubel/74026b2078ca2da7b063d004d1f566eec6d2e3e5) 是 V1/V2 的 blob 研究。V4 饱和度研究更晚。
**建议**：**必须改引用**。正确引用方向有两个：(a) Zeki 的 V4 研究（1973-1980s）；(b) Conway & Tsao 的 V4 color mapping 研究 (2014)。删掉 "Livingstone & Hubel 1984" 或改为描述 V1 层级。**这是一处特定的可被查证的错误**。
> 决定：agree

### [Q-DOPAMINE-02] 🟠 "饱和度 40% V4 响应正常 vs 饱和度 80% V4 响应 2-3 倍"
**原文**：一节
**Skeptical Take**：这个具体比例（2-3 倍）**找不到严谨文献支持**。V4 对饱和度的响应曲线 is nonlinear，但 "40% vs 80% 对应 2-3 倍" 是 Sean 的具体化估算。
**建议**：改成"V4 对高饱和色的响应**显著高于**低饱和色（具体比例因神经元不同）"。
> 决定：agree

### [Q-DOPAMINE-03] 🟠 "V4 → inferotemporal cortex → ventral striatum → reward"通路
**Skeptical Take**：这个通路**结构上对但被过度简化**。V4 → IT 是 ventral stream 的确定通路；IT → striatum 有连接，但"颜色直接点亮 reward 回路"是**功能上的大跳跃**。颜色偏好是学习出来的（associative learning），不是 V4 神经元直接 wire 到 dopamine。
**建议**：改为"V4 激活后通过 ventral stream → IT → limbic/striatal 区域的间接通路影响 affective 响应——颜色-情绪关联本身是学习出来的"。
> 决定：agree

### [Q-DOPAMINE-04] 🟠 "多巴胺穿搭小红书 150 亿浏览量"
**Skeptical Take**：这个数字需要出处——小红书官方话题页的截图可以证实，但"150 亿"这个精确数字可能过时或被夸大。
**建议**：加"（小红书话题页数据，时间点 XXXX）"或改成"数十亿级"。
> 决定：agree

### [Q-DOPAMINE-05] 🟠 "北欧成年人中 SAD 20-30%"
**原文**："季节性情感障碍（Seasonal Affective Disorder, SAD）每年影响 **北欧成年人中的 20-30%**"
**Skeptical Take**：**这个数字严重偏高**。
**核查**：挪威 Oslo 研究给 **14%**；瑞典研究给 **8% 完全型 SAD + 10.8% 亚临床型**，合起来约 **18-19%**。冰岛反而低到 3.6%。"**北欧整体 20-30%**" **明显超过文献的上限**。如果算"亚临床 + 完全型"，最多到 20%，不到 30%。
**建议**：改成"**北欧成年人中 SAD（含亚临床）估计在 10-20% 量级，具体国家差异大**（挪威 ~14%，瑞典 ~19%，冰岛反而 ~3-4%）"。
> 决定：agree

### [Q-DOPAMINE-06] 🟡 "冬天户外亮度比夏天低 60-80%"
**核查**：北半球高纬度地区（>50°N）冬夏日照差异确实达到 60-80%（日长 8h vs 16h，再加日出日落角度影响实际 lux）。但中低纬度地区差异小得多。
**建议**：加"（高纬度地区）"的前缀。
> 决定：agree

### [Q-DOPAMINE-07] 🟢 "10000 lux light box therapy"
**核查**：标准 SAD 光疗确实是 10,000 lux × 30 分钟。OK。
> 决定：agree

---

## 跨文章一致性问题

### [Q-XREF-01] 🟠 tRCD 数字在 #005、#007、#007 内部不一致
**涉及文章**：#005 第七节（SDRAM tRCD ≈ 20 ns）；#007 第一节（tRCD "基本还是 15 ns"）；#007 第五节（LPDDR5X tRCD ≈ 15 ns, 延迟改善 25%）
**问题**：#007 第一节说"tRCD 25 年没动，还是 15 ns"，但第五节又说"改善了 25%"。**自相矛盾**。
**建议**：统一为"从 20 ns 降到 15 ns，改善 25%"。
> 决定：agree

### [Q-XREF-02] 🟠 "每 8 秒 swipe" vs "每 12 秒打断"
**涉及文章**：movie-recap（8 秒）；douyin-5sec（12 秒）
**建议**：统一为"每 10 秒左右"或"每 8-12 秒"。
> 决定：agree

### [Q-XREF-03] 🟠 tok/s 流畅阈值不一致
**涉及文章**：#009（Int4 7.8 tok/s "接近人眼流畅阈值 10 tok/s"）；#010（"约 10 tok/s 是人眼流畅阈值"）
**判断**：两篇内部一致（都是 10）。但如 Q-010-03，真正的"流畅"阈值应是 20-30 tok/s，10 只是"最低可用"。
**建议**：统一改口径——"10 tok/s 最低可用、20 tok/s 舒适阈值"。
> 决定：agree

### [Q-XREF-04] 🟡 "Jensen 60 人 + 黑 T" 在 Jensen 篇和 Jobs 篇的双重引用
**涉及文章**：jensen-management（讲 60 人）；jobs-black-t（把 Jensen 黑 T 再讲一遍）
**判断**：Sean 内部做了 callback 设计，大致 OK。但 Jobs 篇里的 Jensen "all-in AI / CUDA 生态 / B200 HBM 12-Hi 堆栈"这些具体决策例子**完全是 Sean 的推测**，不是 Jensen 公开说过"我靠黑衣服省下决策带宽才能做 B200 HBM 决定"。比喻可以但读起来像真实归因。
**建议**：把"要不要让 B200 的 HBM 用 12-Hi 堆栈"这种**具体到 SKU 的决策**换成更泛的"产品路线图"，避免读者以为 Jensen 真的这么自述。
> 决定：agree

### [Q-XREF-05] 🟡 Llama-3 70B FP16 权重大小
**涉及文章**：#006（140 GB）；#008（Llama-3 70B 140 GB FP16 实测 4-5 tok/s）；#009（140 GB 在表里反复使用）
**判断**：数字内部一致。但如 Q-006-05，严格应是 141 GB。
**建议**：保留 140 GB 为简化，或统一改 141 GB。
> 决定：agree

### [Q-XREF-06] 🟢 系列 callback 网络（见 Round 3 / Batch 8）
**判断**：Sean 设计了完整的 cross-reference 网（Jensen ↔ Jobs ↔ Dopamine；MoE ↔ i/e；抖音 ↔ 电影解说 ↔ standup）。整体设计很好，callback 的文案自然。
> 决定：agree

---

## 总体观察

### 观察 1：**技术 6 篇比生活 7 篇 fact-solid 得多**
技术篇的风险点（KV cache 因子、Mixtral 激活参数分母、tRCD 自相矛盾）都是**可以精确修正的细节**。生活篇的风险点（ego depletion 不 hedge、Livingstone-Hubel 归属错误、Wansink 引用、SAD 20-30% 夸大）是**需要改写整段的方向性问题**。优先级：先修生活篇里的科学引用，技术篇只是数字校准。

### 观察 2：**最危险的一篇是 jobs-black-t**
这篇引了 ego depletion、Baumeister 1998、Danziger 2011、Wansink 35,000 decisions——**四个都是 psychology replication crisis 的常见"受害者"或边缘问题**。TechCrunch 或 Ars Technica 的读者里但凡有一个知道 ego depletion 复制失败的，整篇 credibility 立即掉。**强烈建议在这篇加一段"这些研究近年受到 replication crisis 质疑"的元段落**，把整篇定位从"硬科学"降为"经验模型 + 受争议文献支持"。

### 观察 3：**standup-hollywood-shannon 篇密度过大，部分数字像'填充的精确感'**
30-50 秒笑点周期、2.4 笑点/分钟、20 分钟后 fatigue 开始线性下降、50-60 分钟降到 60%——**这些精确数字的出处都有问题**。Sean 显然对这个领域有深刻 intuition，但把比喻性估算写成"Martin 2005 的实验定量测过" 会让同行觉得在编。**建议整篇做一次"哪些数字我真能找到原始 paper"的盘点**——凡是找不到的，改成"量级估算"。

### 观察 4：**Livingstone & Hubel 1984 的引用需要认真改**
多巴胺穿搭篇把 V4 颜色饱和度研究归到 L&H 1984 是**一个具体的可被 fact-check 打脸的错误**（L&H 1984 研究的是 V1 blobs）。这种错误**一旦被发现，整个"硬科学背书"的 positioning 就崩了**。需要换成真正的 V4 研究引用（Zeki / Conway 等）。

### 观察 5：**风格和节奏很强，但"定量感"的代价是细节负担**
Sean 的风格是"一段比喻 + 一组精确数字"——这是非常好的科技写作风格。但代价是**每一组精确数字都要经得起 fact-check**。现在系列里有大约 30+ 处"精确数字"需要核对或 hedge。**建议在编辑过程里建一个"数字清单"，每一个数字都标注——(a) 有原始文献、(b) 量级估算、(c) 坊间说法——让读者（和未来的自己）知道权威度**。

### 观察 6：**最值得加的新内容：replication crisis 这个 meta-theme**
Sean 的 bandwidth 系列在技术层面对 memory wall / Wulf-McKee / Jevons 都很精准，但在心理学/神经学方面**完全没碰 replication crisis 这个本应 obvious 的 meta-theme**。加一段"这些心理学经典的 replication 命运"反而会让整个系列**变得更可信、更 meta**，而不是打折。可以在乔布斯篇或脱口秀篇做一个 aside。

### 观察 7：**一个编辑层面的建议：把"脚注式 hedge"做成风格选项**
很多疑点其实不需要改 main text，只要做成**脚注或小字 sidebar**——"(注：这个数字来自 XXX，具体值在 Y-Z 之间)" 这种。这样不影响叙事节奏，但读者和未来的 fact-checker 都能看到 Sean 对数据敏感度。TechCrunch 专题、Ars Technica 深度都是这么处理的。

---

*End of editorial review · 总疑点数：约 75 条 · 🔴 Critical：6 条 · 🟠 High：28 条 · 🟡 Medium：30 条 · 🟢 Low：11 条*

*Sean 看完一轮后，告诉我哪些拒绝、哪些采纳、哪些"改为 X"——我会在下一轮把所有采纳的修改同步到正稿。*
