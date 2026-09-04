# DGX Spark Projects & Experiments — Full Catalog

_Compiled 2026-06-02. Sources: `~/seanslab/Research/*`, `~/seanslab/fun/*`, `~/seanslab/autoresearch/*`, `~/seanslab/Docknote/*`, and all of `~/hdresearch/`._

**Two physical machines**, both NVIDIA GB10 Grace Blackwell, 128 GB unified memory:

- **Spark1** — `100.95.68.114`
- **Spark2** — `100.115.15.25` (primary GPU host; cleaned/prepped 2026-05-11)

Scope rule: **Orin / Jetson / Mac / cloud / RK3588 results excluded** (different hardware) — only kept where they sit in the same comparison table. LLM work is listed first. Everything below is a **measured** result unless tagged `PLAN ONLY`.

---

## 🟢 LLM experiments on DGX Spark (measured)

### 1. SummaryBench — local LLM meeting summarization

`~/seanslab/Research/SummaryBench/RESULTS.md` · Judge: Claude Opus 4.6, blind A/B/C/D, 5 criteria ×10 = 50 max.

Models actually run on Spark (others in the bench ran on Orin/Mac/cloud):

| Model | Machine | Quality | Throughput | Size | Source |
|---|---|---|---|---|---|
| Qwen3.5 122B A10B (MoE, 10B active) | Spark2 | **42.2/50** (R20d) | ~15 tok/s | 81 GB | RESULTS.md:411, 686 |
| Qwen3.5 35B A3B (3B active) | Spark2 | 40.0 (R17 2-way) / 37.4 (R18 4-way) | — | 23 GB | RESULTS.md:533, 548 |
| Qwen3.6 35B A3B | Spark2 | 40.18/50 | **23.9 tok/s** avg (12.1–51.4) | — | RESULTS.md:686 |
| Qwen3.5 27B dense | Spark2 | 41.8 (R22) | ~10 tok/s | 17 GB | RESULTS.md:579, 752 |
| Nemotron-3-Super 120B (12B active) | Spark2 | 37.0–37.1 | 16–18 tok/s | — | RESULTS.md:467, 639 |
| GLM-4.7-Flash 30B | Spark2 | 34.2/50 (worst) | — | 19 GB | RESULTS.md:505, 520 |
| Qwen3.5 4B dense | **Spark1** | 36.18/50 | **~36 tok/s** | 3 GB Q4 | RESULTS.md:784, 788 |

> Headline: both Spark-hosted big MoEs (122B @ 42.2, Qwen3.6-35B-A3B @ 40.18) are competitive with / beat cloud GPT-5.3 (39.0). The 35B-A3B "3B-active" result is the strategic finding — near-27B quality at ~1.6× the throughput.

### 2. Qwen3.5 size sweep — askmeeting two-phase Q&A

`~/seanslab/autoresearch/qwen-tune/docs/model-comparison-2026-04-17.md` · **Spark2** via Ollama Q4_K_M · Judge GPT-5.4 · 59 questions.

| Model | Quality (0–1) | Total latency/query | Wall clock (59 Q) |
|---|---|---|---|
| Qwen3.5 9B | 0.636 | 31.3 s | 36 min |
| Qwen3.5 27B | **0.656** | 82.9 s | 86 min |
| Qwen3.5 35B-A3B (MoE) | 0.634 | **27.2 s** | 32 min |

Smaller variants (same doc:276): 4B = 0.540, 2B = 0.365 (collapses). Score spread across 9B/27B/35B is only 0.022 (judge noise ±0.02); latency spread is 3×.

### 3. DeepSeek-V4 Flash q4 — distributed across Spark1 **+** Spark2

`~/seanslab/fun/deepseekv4/devlog-20260510.md` · antirez llama.cpp RPC fork, model split over **both** Sparks via 200 Gb/s CX7 direct Ethernet.

| Metric | Value |
|---|---|
| Model (antirez q4 GGUF) | 164.6 GB on disk, SHA256-verified both nodes |
| Memory split | Spark2 CUDA0 79.5 GB + Spark1 RPC0 76.5 GB + 1 GB CPU |
| CLI smoke | ~2.5 tok/s prompt / ~1.3 tok/s gen |
| API (llama-server) | 5.31 tok/s prompt / 2.01 tok/s gen |
| Context validated | 512 tokens only; `-fa off` (FlashAttention crashes on RPC path) |

> Only experiment that runs a single model across **both** Sparks. It works (serves an OpenAI-compatible API) but is slow — proof-of-concept, not production.

---

## 🔵 ASR / Diarization experiments on DGX Spark (measured)

### seanslab/Research

| Project | Machine | Task | Key measured result | Source |
|---|---|---|---|---|
| **diaribench** | Spark1+2 | Diarization bench | pyannote-3.1 best: **7.39% DER** (bosco_eval), 11.16% (AMI-SDM) | reports/FINAL_round_01_02.md:45, 179 |
| diaribench R06 | Spark1 | MOSS-Audio ASR (4B/8B) | LibriSpeech WER **0.0% / 0.025%**, RTF 0.358/0.408; hallucinates on 3-spk | reports/round_06_moss_audio.md:39 |
| **vvfish** | Spark2 | DiariZen v2 / AMI-SDM | **13.92% DER**, RTF 0.0916; DiarizationLM post-proc → catastrophic (zero-shot unusable) | benchmarks/AMI_SDM_BENCHMARK_REPORT.md:12; DiarizationLM_REPORT.md |
| **asrbench** | Spark2 | ASR bench | Parakeet-TDT **5.28% WER @ RTF 0.026** (38× RT); VibeVoice INT8 RTF 0.553 (Spark1) | RESULTS.md:481, 362 |
| **Sugr-ASR-Bench** | Spark1 | ASR | whisper-large-v3 **14.18% WER** (micro), 2449 s, ~3 GB | RESULTS.md:12 |
| **SpeakerDia-Corpus** | Spark1+2 | Diarization data | 150.9 hr / 577 clips corpus, 97.4% listen-test accuracy | devlog-20260415.md:3 |
| **hndata** | Spark2 | Pyannote tuning | 40-clip baseline, thr=0.75/min_cluster=12/min_off=2.0; smoke passed | devlog-20260502.md:92 |

### hdresearch (HVR = HiDock Voice Recognition pipeline; all ASR/diarization)

| Project | Machine | Task | Key measured result | Source |
|---|---|---|---|---|
| **autoresearch-hvr-diar-tune** | Spark1 | Diarization tune | R06 **11.98% DER** (−8.73 pp), now **beats Plaud 12.1%**; RTF ~0.036 | FINAL.md:51 |
| **autoresearch-hvr-align-tune** | Spark1 | Alignment tune | Word-level align: **0.096 DER** vs 0.196 baseline (−10 pp) | results/eval_runs.tsv:2 |
| **autoresearch-hvr-jp-tune** | Spark1 | Japanese ASR tune | 47 rounds → **84.45** micro-JA (from 80.33); gap to Plaud −2.86 → −1.70 | FINAL.md:42 |
| **autoresearch-hvr-meetingsynth-tune** | Spark2 (+Spark1) | EN diar/ASR tune | WER **0.329** vs Plaud 0.482 (−15.3 pp); DER comparison retracted (Plaud data not persisted) | FINAL.md:127 |
| **sugr-asr-app-spark-benchmark** | Spark1 | HVR e2e | 37-file mean DER: HVR 20.9% vs Plaud 12.1% (pre-tuning baseline) | EXP-20260512-010 |
| **spark-panel** | Mac→Spark | Monitoring | Live SSH/GPU dashboard — tooling, no experiment data | — |

> hdresearch is **entirely ASR/diarization** — no LLM was benchmarked there. (`QWEN3_ASR_BENCHMARK.md` is a misnomer: it's Japanese ASR, not a Qwen LLM eval.)

---

## ⚪ Plan-only (no measured Spark data)

- **SnapGPU v2** (`Docknote/`, `fun/Dockmail/app/snapgpu/`) — Qwen3.5-27B-FP8 vLLM service designed for Spark1; throughput "40–60 tok/s" is an **estimate**, never run. Spark-first deployment (REQ-078) was later **reversed** to RunPod due to Spark2's network limits (DERP relay, ~33% UDP loss).
- **autoresearch-bosco** (`Research/`) — autonomous 50–100 exp/night infra on both Sparks; PLAN only.
- **vvfish Phase-2 training** — 2× Spark training run (415 tok/s target, 27–35 days); not started.
- **Qwen3.5-122B on Spark2** for the *Q&A pipeline specifically* — model pulled, not benchmarked on that pipeline.

---

## Takeaways

1. **Spark2 is the LLM workhorse** — every large-model LLM benchmark (122B, Nemotron-120B, Qwen3.6-35B-A3B, GLM-Flash) ran there. Spark1 handled small/fast (Qwen 4B @ 36 tok/s) and ASR.
2. **Best solid LLM result:** Qwen3.5-122B-A10B = **42.2/50** on SummaryBench, beating cloud GPT-5.3 — but the **A3B MoE family** (35B-3B-active @ 40/50, 23.9 tok/s) is the deployment-relevant win.
3. **DeepSeek-V4 q4 across both Sparks works but is slow** (~2 tok/s gen) — infra proof, not usable yet.
4. **ASR/diarization is mature on Spark:** HVR diar-tune (11.98% DER) and align-tune (0.096 DER) both now beat Plaud; Parakeet hits 5.28% WER at 38× real-time.
