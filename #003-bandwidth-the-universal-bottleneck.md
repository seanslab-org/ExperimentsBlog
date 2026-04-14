# Your DNA Is Slower Than Dial-Up, and That's What Keeps You Being You

*A few short stories about bandwidth.*

---

Here's a number that should bother you.

Your eyes, ears, and skin dump roughly **one billion bits per second** into your nervous system. Your retinas alone output about 10 million bits per second — roughly the speed of an old Ethernet cable. Add your ears, a few more megabits. Touch, proprioception, temperature — all streaming, all the time.

And your conscious mind? The part that feels like "you"?

**Ten bits per second.**

Not megabits. Not kilobits. Ten bits. Per second. Caltech researchers measured it — whether you're a concert pianist or a speed-reading champion, your conscious processing speed tops out right around that number. The ratio between what your body takes in and what you actually *think about* is a hundred million to one.

What is your brain doing with the rest? Throwing it away. That discarded 99.9999% is nature's most aggressive compression algorithm. Consciousness isn't a fire hose. It's an impossibly picky dropper.

This is bandwidth — how much stuff can move through a pipe per unit of time. You thought it was just a networking term. It's not. Your body, your memory, even whale songs — all bottlenecked by the same constraint.

---

## Every Human Language Runs at the Same Speed

In 2019, researchers measured speaking rates across 17 languages. The conclusion was startling: no matter the language, humans transmit information at nearly the same rate — **39 bits per second**.

Japanese packs less information per syllable, so Japanese speakers talk fast. Vietnamese packs each syllable full, so Vietnamese speakers talk slow. The pipe adjusts. The throughput stays the same.

Typing? A fast typist at 80 words per minute pushes about 53 bits per second. Your fingers are faster than your mouth.

Reading? About 250 English words per minute, roughly 167 bits per second. But that's how fast your eyes move across text, not how fast you actually *retain* it — the retention rate is far, far lower.

Keep reading. You'll see why.

---

## You Forget Half of Everything in an Hour

In 1885, a German psychologist named Hermann Ebbinghaus ran a cruel experiment on himself: memorize strings of nonsense syllables, then measure how fast he forgot them.

The result is called the **forgetting curve**: 50% gone in one hour, 70% gone in a day.

An SSD holds data for one to three years without power. A magnetic hard drive, decades. Your brain? It leaks half its new information within sixty minutes.

But this isn't a bug.

Your brain has an estimated storage capacity of about 2.5 petabytes — bigger than many data centers. If it kept everything at full fidelity — every conversation, every peripheral detail, every background noise — it would fill up. So the brain runs a continuous garbage collector: memories that aren't repeatedly accessed get deprioritized, overwritten, discarded.

Why does spaced repetition work? Because each review resets the forgetting curve — it's essentially a retry protocol for human memory. Your brain treats memories like cache lines: hot data stays, cold data gets evicted.

Write bandwidth is decent. Retention bandwidth is brutally low. That's why you read at 167 bits per second but the amount that actually *sticks* might be in the single digits.

---

## Your DNA Is Slower Than Dial-Up

Right now, millions of cells in your body are dividing. Your gut lining renews every 3–5 days. Your bone marrow produces over 2 million new red blood cells every second. Before each new cell is born, the entire genome must be copied in full.

The machine that does this is DNA polymerase — a molecular device that physically rides along the DNA strand, one step at a time, reading each base, matching it, and proofreading before moving on. In human cells, its speed is about **50 nucleotides per second** — roughly 17 nanometers per second. Each nucleotide encodes 2 bits (four bases: A, T, C, G), so this molecular typist copies at **100 bits per second**.

A 2400-baud modem from 1984 was 24 times faster.

Your entire genome is roughly 3.2 billion base pairs — optimally compressed, about 800 megabytes of data. Smaller than a movie. Downloading it on a 56K modem would take about a day and a half. On modern broadband, minutes. At a single polymerase's speed, copying the whole thing would take over two years — so the cell cheats: it fires up **30,000 to 100,000 starting points** simultaneously, each pushing outward in both directions. One channel is absurdly slow, but a hundred thousand channels in parallel get the entire genome copied in about 8 hours.

But each individual channel is slow for a reason. Its error rate is roughly **one mistake per billion nucleotides copied**. That's like typing out all of Wikipedia — over 5 billion words — and making a single typo. It achieves this by proofreading every single step, backed by a mismatch repair system that catches what slips through.

The tradeoff is pure bandwidth logic: **you can go fast, or you can go accurate. Pick one.** Fiber optics move terabits per second and correct errors after the fact. DNA moves 100 bits per second and error-checks every single step.

DNA's slowness is what keeps you being you.

---

## Why Whales Sing So Low

Blue whale calls register at 10 to 40 hertz — mostly so low that humans can't hear them.

Why not sing higher? Because low frequencies attenuate slowly. The ocean has a layer called the **SOFAR channel** — the Sound Fixing and Ranging channel — where temperature and pressure create a natural waveguide that traps low-frequency sound and carries it across enormous distances. A humpback whale singing in the Caribbean can be detected **off the coast of Ireland — over 4,000 miles away**.

This is a classic bandwidth trade: **speed for distance.** Low frequency means low data rate — whale song carries far less information per second than birdsong. But the signal travels four thousand miles without dissipating.

Same principle: AM radio travels farther than FM. Submarines communicate using Extremely Low Frequency radio at 3–30 Hz. Voyager's deep-space probes send data back to Earth at laughably low bit rates, but the signal crosses over 15 billion miles.

The longer the pipe, the slower you have to send.

The sad part: since the 1960s, ocean noise pollution from shipping has **cut whales' effective communication range by roughly half**. Shannon's formula spells it out clearly — when noise N goes up, capacity C goes down. We didn't narrow their pipe. We filled it with garbage.

---

## Your Nose Has a Trillion-Color Palette but the Worst Refresh Rate

A 2014 study published in *Science* estimated that humans can distinguish **over one trillion different smells**. That's far more distinct states than your eyes can resolve in color, or your ears can resolve in pitch.

But your nose's refresh rate lags behind your other senses. A 2024 study found that olfactory temporal resolution is about **60 milliseconds** — roughly 16 frames per second. Sounds decent, until you compare it to your eyes (60+ FPS) and your ears (which resolve time differences of 10 microseconds).

A trillion-smell palette, but the slowest refresh rate of your major senses.

This is also why food is mostly nose, not tongue. Your tongue detects five basic tastes: sweet, salty, sour, bitter, umami. Five channels. Your nose can identify tens of thousands of different aromatic compounds. A single strawberry contains **over 400 volatile aroma compounds**, and your olfactory system processes them simultaneously. The bandwidth ratio between nose and tongue is roughly **2,000 to 1**.

When people say a dish has "complex layers of flavor," what they really mean is: this dish has high olfactory bandwidth.

---

## A 32-Year-Old Mathematician Already Figured It Out

In 1948, a young man at Bell Labs named **Claude Shannon** published a paper that essentially invented information theory.

His core discovery can be condensed into one formula:

**C = B × log₂(1 + S/N)**

C is channel capacity, B is bandwidth, S/N is the signal-to-noise ratio. It means: **every pipe has a theoretical maximum, and you cannot exceed it.** No matter how clever your encoding, how extreme your compression — you can't get past C. The universe says no.

The cruel part is the logarithm — double your signal power, and capacity increases by just one bit. Want 10x the throughput? You'll need roughly 1,000x the power. It's a wall that gets exponentially more expensive to push.

For the past 78 years, every communication system ever built — from dial-up modems to 5G to submarine fiber optic cables — has been a team of engineers trying to get as close to Shannon's limit as possible. The best modern systems operate within a fraction of a decibel of the theoretical ceiling. The math won before the engineers even started.

---

## The Same Wall

Pull back and look at these numbers together:

Your consciousness, 10 bits per second. Your speech, 39 bits per second. DNA replication, 100 bits per second. An hour later, you've forgotten half of it. Whales push their frequency below human hearing and buy 4,000 miles of range. Your nose can distinguish a trillion scents but has the slowest refresh rate of your senses.

All the same problem: **a certain amount of stuff needs to get from A to B, and the pipe in between has a maximum flow rate.**

When the pipe is your consciousness, you read 250 words a minute and that's it. When the pipe is DNA polymerase, you copy at modem speed, because the alternative is mutation. When the pipe is an ocean, you sing low and slow and hope someone 4,000 miles away is listening.

Shannon worked out the ceiling in 1948. But whales, your nose, and your DNA had been hitting that same wall for hundreds of millions of years before him. They just didn't publish a paper.

---

*Published at [seanslab.org](https://seanslab.org)*
