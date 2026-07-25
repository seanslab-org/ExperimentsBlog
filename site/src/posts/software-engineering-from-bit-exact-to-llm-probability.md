---
layout: layouts/post.njk
title: "Software Engineering: From Bit-Exact to LLM Probability"
description: "What an engineer trained to make every output deterministic learns when software starts answering in distributions."
date: 2026-06-07
permalink: /software-engineering-from-bit-exact-to-llm-probability/index.html
series: "Engineering practice"
signal: "05"
cover: "/assets/covers/bit-exact-header.png"
featured: true
languageLabel: English
---
*Two eras in one chip-algorithm engineer's career — and why losing absolute determinism is a homecoming, not a loss.*

## 2002 · Chasing bit-exact, one line of assembly at a time

I was still a master's student that year, working on a project at a small company called **Coast Communications**.

The task was blunt: reimplement the **GSM-EFR speech codec** in **ADI 218x fixed-point DSP assembly** — the codec ETSI had standardized in the late 1990s and that was being rolled out, at scale, into 3G phone basebands.

The ITU gave you two things: a reference codec written in C, and a set of test vectors (input speech + reference output bitstream). My job was simple and brutal: rewrite that C into ADI 218x assembly, get it running, and compare the output **bit-by-bit** against the reference.

Not 95%. Not 99.99%. **Every single bit identical** — thousands of test vectors, hundreds of frames each, hundreds of bits a frame. One wrong bit anywhere, and the whole project failed.

That was the highest aspiration of an engineer in that era: **absolute determinism.**

But GSM-EFR isn't ordinary software. It's built on **ACELP** (Algebraic Code-Excited Linear Prediction), with dozens of inner loops, each doing hundreds of multiply-accumulates. **Any single accumulator saturating slightly differently, or one basic operator rounding differently from the ITU reference, and the error starts to compound.**

The next three to four months split into two phases.

**Phase one** was translating the ITU C reference into ADI 218x assembly, compiling it, and getting basic functional tests to pass — confirming the output was roughly speech and not noise, that the quantizers and filters worked, that the bitstream structure was right. That part was relatively clean; the codec ran end-to-end within a few weeks.

**Phase two** is the one that grinds you down — taking "roughly correct" to **bit-exact**. The loop went like this:

1.  Run the whole ITU test-vector set, find the first one that fails.
2.  Dump every frame's intermediate state in my implementation — LPC coefficients, excitation signal, quantizer indices, the internal accumulators.
3.  Compare against the reference's intermediate state, find the **first frame that deviates**.
4.  Inside that frame, dump every iteration of every inner loop.
5.  Find the **first loop iteration that deviates**.
6.  Inspect that specific multiply-accumulate — was the saturation wrong? Round-to-even instead of round-to-nearest? Did one basic operator (L_mac, mult_r…) in my assembly differ from the ITU C by 1 LSB at a boundary?
7.  Fix it. Re-run the whole set.

Behind every bit of deviation was a corner case of some ITU basic operator — a particular saturation behavior, a 40-bit accumulator that happened to overflow on one iteration of one frame where the reference didn't.

Three to four months later, **every test vector passed bit-exact.**

In that moment I believed software could achieve absolute determinism — that if you were willing to spend the time, every bit could be predicted, verified, guaranteed.

<img src="/assets/imported/software-engineering-from-bit-exact-to-llm-probability-figure-01.jpg" style="color:transparent;height:auto" loading="lazy" decoding="async" data-nimg="1" width="1000" height="1000" alt="2002 · drilling down to bit-exact: every bit deviation meant drilling through four layers — from thousands of test vectors, to hundreds of frames, to dozens of inner loops, to a single basic-operator corner case worth 1 LSB." />

2002 · drilling down to bit-exact: every bit deviation meant drilling through four layers — from thousands of test vectors, to hundreds of frames, to dozens of inner loops, to a single basic-operator corner case worth 1 LSB.

## The highest engineering aesthetic of the 20th century: bit-exact

That GSM-EFR experience wasn't unusual. **The whole second half of the 20th century built its highest engineering aesthetic around absolute determinism:**

- **Communication codecs**: H.264, AAC, Vorbis all ship a reference implementation + test vectors; bit-exact is a precondition for certification.
- **Cryptography**: AES, SHA-256 — one bit off and the protocol breaks.
- **Databases**: the "D" in ACID is another word for deterministic.
- **Formal verification**: proving software correct, automatically — Coq, Lean, Z3.
- **Smart contracts**: the Ethereum EVM is a deterministic VM; every transaction must produce identical state on every node.
- **Type systems**: compile-time guarantees about runtime behavior.
- **Six Sigma**: 99.99966% as the quality ceiling.

Seventy years of engineering aesthetics, all the same sentence: **input X always yields output Y.** Test pass or test fail. Binary. No middle ground.

My GSM project was a tiny sample of that tradition — but the spirit it embodied was the whole era's: **software should be perfectly predictable.**

## But every other profession has always reasoned in probabilities

Step outside the software bubble for a second.

- **Doctors**: symptoms point to "80% flu, 15% COVID, 5% other." No doctor ever says "it's definitely flu, bit-exact."
- **Judges**: "beyond reasonable doubt" is a ~95% threshold, not 100%.
- **Investors**: every decision is a distribution — expected return, Sharpe ratio, max drawdown. Never "this stock will definitely go up."
- **Weather**: 70% chance of rain tomorrow.
- **Evolutionary biology**: random mutation + selection pressure — stochastic at its core.
- **Quantum physics**: the Heisenberg uncertainty principle is probability, all the way down.

**Only software engineers got to enjoy absolute determinism for 70 years.** Every other profession — millennia of human intellectual work — has always thought in probabilities.

The bit-exact my generation chased, seen against the longer history of engineering, is **a 70-year anomaly, not the norm.**

Until LLMs took the privilege away.

## 2026 · The same prompt, two different outputs

A staff engineer recently described to me the moment he first slammed into LLM probability.

He was building an LLM integration, and out of pure software-engineer instinct he wrote a unit test: "given prompt X, expect the output to contain string Y."

First run, pass. Second run, **fail.**

He assumed something was wrong with the environment — restarted, cleared the cache, ran it five or six times — **a different result every time.** He opened the trace in LangSmith and stared at it for three hours.

The conclusion he reached: **every unit test he'd ever written had, in essence, stopped working.**

In 2002, when I was doing GSM-EFR, the same input producing two different outputs was an **absolute bug** — a thing that must not happen. I'd immediately go hunt for the uninitialized register, the race condition.

In 2026, the same prompt producing two different outputs is an **LLM feature** — not just allowed, but **the temperature parameter literally tells you it will happen.**

That staff engineer wasn't being tortured by a bug. He was watching the "absolute determinism of software" he'd believed in his whole career simply disappear.

## The engineer's everyday paradigm shift

LLMs translate the entire daily toolchain of software engineering from "deterministic" into "probabilistic":

<table class="notion-table col-header">
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr style="color:var(--color-text-default)">
<td style="min-width: 120px; max-width: 240px; background: var(--color-undefined)">
Old paradigm (deterministic)
</td>
<td style="min-width: 120px; max-width: 240px; background: var(--color-undefined)">
New paradigm (probabilistic)
</td>
</tr>
<tr style="color:var(--color-text-default)">
<td style="min-width: 120px; max-width: 240px">
Unit test: input X → must output Y
</td>
<td style="min-width: 120px; max-width: 240px">
Eval suite: n=1000 samples, accuracy &amp;gt; 95%
</td>
</tr>
<tr style="color:var(--color-text-default)">
<td style="min-width: 120px; max-width: 240px">
Bug fix: fixed, never recurs
</td>
<td style="min-width: 120px; max-width: 240px">
Failure mode: drive the 5% failure rate down to 2%
</td>
</tr>
<tr style="color:var(--color-text-default)">
<td style="min-width: 120px; max-width: 240px">
Stack trace: pinpoint the exact failing line
</td>
<td style="min-width: 120px; max-width: 240px">
Distribution analysis: cluster the failures, find the pattern
</td>
</tr>
<tr style="color:var(--color-text-default)">
<td style="min-width: 120px; max-width: 240px">
Refactor: behavior unchanged
</td>
<td style="min-width: 120px; max-width: 240px">
Refactor: behavior <strong>statistically</strong> unchanged
</td>
</tr>
<tr style="color:var(--color-text-default)">
<td style="min-width: 120px; max-width: 240px">
Code review: is the behavior correct?
</td>
<td style="min-width: 120px; max-width: 240px">
Prompt + eval review: is the distribution acceptable?
</td>
</tr>
<tr style="color:var(--color-text-default)">
<td style="min-width: 120px; max-width: 240px">
Type system: compile-time guarantee
</td>
<td style="min-width: 120px; max-width: 240px">
Structured output: runtime validation
</td>
</tr>
<tr style="color:var(--color-text-default)">
<td style="min-width: 120px; max-width: 240px">
Reproducibility: fully reproducible
</td>
<td style="min-width: 120px; max-width: 240px">
Statistical reproducibility: the distribution reproduces
</td>
</tr>
<tr style="color:var(--color-text-default)">
<td style="min-width: 120px; max-width: 240px">
"It works" / "it doesn't"
</td>
<td style="min-width: 120px; max-width: 240px">
"It works 95% of the time; the failure mode is…"
</td>
</tr>
</tbody>
</table>

Every left-hand cell is my engineer's instinct from doing GSM in 2002. Every right-hand cell is the reality a 2026 LLM engineer has to accept.

**Determinism at the application layer is dead** — but rigor isn't. It **moved.**

## Rigor didn't vanish — it moved into the harness

LLMs turned product output from deterministic into probabilistic. But engineers didn't give up the pursuit of bit-exact — **the rigor didn't disappear; it relocated one level up the abstraction.**

Concretely:

- **The 2002 era**: the codec implementation itself had to be bit-exact, so the eval was simple enough that it needed no framework — run the ITU test vectors, compare bit-by-bit.
- **The 2026 era**: the LLM output itself is probabilistic, **but the eval pipeline must be bit-exact.**

The *location* of the rigor changed; the *intensity* didn't. A few side-by-side comparisons:

<table class="notion-table col-header">
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr style="color:var(--color-text-default)">
<td style="min-width: 120px; max-width: 240px; background: var(--color-undefined)">
Old bit-exact (application layer)
</td>
<td style="min-width: 120px; max-width: 240px; background: var(--color-undefined)">
New bit-exact (harness / eval layer)
</td>
</tr>
<tr style="color:var(--color-text-default)">
<td style="min-width: 120px; max-width: 240px">
Every sample of the codec implementation
</td>
<td style="min-width: 120px; max-width: 240px">
Every record in the eval dataset
</td>
</tr>
<tr style="color:var(--color-text-default)">
<td style="min-width: 120px; max-width: 240px">
The reference output ITU provides
</td>
<td style="min-width: 120px; max-width: 240px">
Human-labeled ground truth
</td>
</tr>
<tr style="color:var(--color-text-default)">
<td style="min-width: 120px; max-width: 240px">
Output bit-exact match to reference = pass
</td>
<td style="min-width: 120px; max-width: 240px">
Statistical delta vs baseline &amp;lt; threshold = pass
</td>
</tr>
<tr style="color:var(--color-text-default)">
<td style="min-width: 120px; max-width: 240px">
Run the regression test every commit
</td>
<td style="min-width: 120px; max-width: 240px">
Run the regression eval every prompt / model change
</td>
</tr>
<tr style="color:var(--color-text-default)">
<td style="min-width: 120px; max-width: 240px">
Stack trace down to the line
</td>
<td style="min-width: 120px; max-width: 240px">
Trace + intermediate state down to the token
</td>
</tr>
<tr style="color:var(--color-text-default)">
<td style="min-width: 120px; max-width: 240px">
Test set: thousands of ITU .pcm vectors
</td>
<td style="min-width: 120px; max-width: 240px">
Test set: tens of thousands of labeled records
</td>
</tr>
<tr style="color:var(--color-text-default)">
<td style="min-width: 120px; max-width: 240px">
Reference output never changes
</td>
<td style="min-width: 120px; max-width: 240px">
Rubric + grader model + temperature all version-locked
</td>
</tr>
</tbody>
</table>

**Your LLM output is probabilistic, but your LLM eval pipeline must be bit-exact** — otherwise you simply cannot tell whether today's experiment is better or worse than yesterday's.

<img src="/assets/imported/software-engineering-from-bit-exact-to-llm-probability-figure-02.jpg" style="color:transparent;height:auto" loading="lazy" decoding="async" data-nimg="1" width="1000" height="1000" alt="Bit-exact didn&#39;t die — it leveled up: the same engineering rigor moved from the 2002 codec implementation (sample bit-exact) to the 2026 eval pipeline (trace bit-exact). The place changed; the intensity didn&#39;t." />

Bit-exact didn't die — it leveled up: the same engineering rigor moved from the 2002 codec implementation (sample bit-exact) to the 2026 eval pipeline (trace bit-exact). The place changed; the intensity didn't.

This already existed in every other "probabilistic" profession:

- A **doctor** can't guarantee curing every patient, but the **diagnostic protocol** must be strict — the same symptoms must follow the same workflow.
- **Medical research** can't guarantee a positive trial, but the **RCT design** must be bit-exact — randomization, blinding, controls, all reproducible.
- A **judge** can't guarantee every verdict is right, but the **legal procedure** must be strict — same evidence, same procedure, or it's a mistrial.
- An **investor** can't guarantee every trade profits, but the **backtest code, risk models, attribution** must be bit-exact — same input, same backtest result.

> **Every "probabilistic" profession keeps one thing bit-exact: its methodology itself.**

<img src="/assets/imported/software-engineering-from-bit-exact-to-llm-probability-figure-03.jpg" style="color:transparent;height:auto" loading="lazy" decoding="async" data-nimg="1" width="1000" height="1000" alt="Doctors, medical research, judges, investors — the outcome is probabilistic in every column, but the methodology is bit-exact. LLM engineers have finally arrived at the same table." />

Doctors, medical research, judges, investors — the outcome is probabilistic in every column, but the methodology is bit-exact. LLM engineers have finally arrived at the same table.

LLM engineers have finally reached the same place. The bit-exact I chased on an ADI 218x in 2002 corresponds today to: **on LangSmith / Braintrust / OpenAI Evals, every trace must be reproducible, every prompt version traceable, every eval comparable bit-exact to the baseline.**

**Bit-exact didn't die. It leveled up.**

## Information theory: determinism = zero entropy = zero information

Translate this into Shannon's language:

> **Information = the receiver's degree of surprise.**

A fully deterministic system can't transmit any information. Talk to an oracle that answers "the east" every time you ask "which way will the sun rise tomorrow" — that oracle's output has **zero entropy**, and zero information.

**An LLM's high entropy isn't a bug — it's the physical basis for its ability to tell you something you didn't know.** It's useful to you *precisely because* the output is probabilistic — it can explore a high-dimensional space and surprise you.

Look back at that bit-exact GSM-EFR codec — to its receiver it has **zero entropy**: given the input, you can fully predict the output. That's its function (encode/decode must be deterministic) and its limit (**it can't tell you anything outside its input**).

An LLM is high-entropy, so it can "create." GSM-EFR is zero-entropy, so it can "transmit."

**Two different things — and for 70 years we only ever saw the latter.**

## Where bit-exact is still alive

Physically, bit-exact didn't die — it just went from "the default of software engineering" to "a special case that occupies one small corner":

- **Smart contracts**: the Ethereum EVM must be deterministic; every transaction produces identical state on every node. One failure = consensus collapse.
- **Payments / finance**: transfer amounts must be bit-exact; you can't tolerate even accumulated floating-point error.
- **Cryptographic hashes**: change one input bit to SHA-256 and the output changes completely — that's the function.
- **Protocol codecs**: a voice codec like GSM-EFR still runs bit-exact in the baseband chip of every 4G/5G phone.

**Hybrid systems** are becoming the new paradigm: LLM generates → deterministic validator checks. LLM writes code → unit tests run (deterministic). LLM gives a medical suggestion → a rule engine filters out anything non-compliant.

**An LLM's high entropy makes it useful; determinism's low entropy makes the result trustworthy.** The two now have to coexist.

That assembly I wrote in 2002 — it still runs bit-exact in some chip company's modem baseband somewhere. Every bit still matches the ITU reference.

**But the world around it is no longer the same.**

## Engineers finally sit at the same table as doctors

The absolute determinism software engineers enjoyed for 70 years was never the norm. It was a unique **anomaly** in the history of engineering — every other profession (doctors, judges, investors, biologists, physicists) has always made probabilistic judgments. **Only software engineers thought they'd been handed the key to "absolutely correct."**

LLMs took that key away from the application layer.

But **rigor didn't disappear; it leveled up** — from every sample of a codec being bit-exact to every trace of an eval pipeline being bit-exact. Medicine, law, and finance did this long ago: you can't guarantee the outcome, but you guarantee that your **methodology is bit-exact.**

LLM engineers are simply, finally, walking the same road.

This isn't a loss. **It's a return to the way life actually is.**

## After leveling up, rewrite four things

Stop trusting a single unit test — build a **bit-exact eval suite.**

Stop chasing bit-exact application output — chase **a bit-exact eval pipeline.**

Stop fixing single bugs — build a **bit-exact regression eval** that tracks the failure-mode distribution.

Stop debugging by stack trace — build a **bit-exact trace + intermediate-state** system.

And most important — **learn to think like a doctor, a judge, an investor**: decisions rest on distributions, but the **methodology must be as strict as an ITU test vector.**

Accept that 95% is the reality of the work, not a 95% compromise.

🎯

That assembly from 2002 was burned into the baseband chips of hundreds of millions of phones. In that moment I believed software could achieve absolute determinism. Twenty-some years later I sit in front of LangSmith, looking at an LLM trace. The same prompt, two different outputs. I looked at it for three hours. By the end I realized — **what I'm chasing now isn't bit-exact LLM output; it's bit-exact for every trace, every prompt version, every eval on LangSmith.** **Bit-exact didn't die. It leveled up.** **It's not that LLMs made things worse. The universe was always like this — we engineers just faked determinism for 70 years** — and now we're finally working the way the universe actually works.

*Sean ·* *<a href="/" class="notion-link link" data-server-link="true" data-link-uri="/">seanslab.org</a>* *· Seeing the world through information theory · 2026*
