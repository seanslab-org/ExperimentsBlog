---
layout: layouts/post.njk
title: "Vibe Coding for Embedded Systems"
description: "What changes when AI-assisted coding leaves the browser and meets registers, timing, memory limits, and real hardware."
date: 2026-02-24
permalink: /posts/vibe-coding-for-embedded-systems/index.html
series: "Engineering practice"
signal: "08"
featured: false
languageLabel: English
---
Vibe Coding seems “simple”, it is NOT when you deal with devices. From day one of Vibe Coding, I never stop imagine how it is possible to auto-polit an embedded software project with Vibe Coding. Even today, it is still a challenge. Just imagine:

💡

How can you prepare your board into boot loader when your agent asks you to do so?

I never figured out yet. If you did, let me know.

What are the challenges of Vibe Coding for embedded systems today:

1.  Human Operations: (as above) device needs human in the loop, e.g. boot, button push, it is a hardware so it needs your touch.
2.  Dynamics of Devices: in the embedded world, we are talking about thousands, if not millions, of chips. Just for the types of chips, there are SoCs, DSPs, ASICs. They have drivers, specs, compilers, memory maps. And most importantly, they may not have been well documented. Many of them are proprietary. I don’t think today’s LLMs have enough knowledge in this domain.
3.  Timing: most embedded systems are timing sensitive, or to say, they are real-time systems. And that’s why most of them were programmed by C/C++, even some assembly languages. Yes, nowadays chips getting stronger, memories getting larger, so Python and other script language go popular, but C is still the bedrock in the embedded world. The timing issue for agentic coding is that are the agents capable of understanding and design the system for real time purpose? Even if yes, can human developer review and interact with the deign.
4.  Debug: this is definitely not my last concern, actually this is the first thing came to me when I imaging Vibe Coding for embedded systems. Imaging how an engineer was bringing up his system for the first time: power on, screen on, UART on, IIC on, audio on… There were oscillators, volt meters, bus cables staying in the loop, a complex loop. How can coding agent handle these gadgets?
5.  … If I have to, there are more to mention, but that’s not my point.

Do all these challenges make Vibe Coding for embedded systems impossible? Or extremely hard? Are their hopes?

💡

When many front-end and back-end engineers smile at the keyboard and Vibing, are embedded engineerings doomed to stay in the chaos?

I don’t think so, I’m optimistic about agentic coding for all applications. And from last year to now (Feb, 2026) I do feel a leap progress. Because I did EXPERIMENTS.

To address the above challenges, to see LLMs are getting stronger, I believe embedded debugging skills and be a good vertical areas for RL (reinforcement learning). In my experience with Codex, Cursor, Claude Code, they all for my experiments with the model grow. And the code tools are getting better too. I’m confident today Vibe (Agentic) Coding can be deployed to development teams, for production level software (firmware). And I’m going to do that in my team.

It is not just about

``` javascript
claude --dangerously-skip-permissions
```

It is a whole agentic oriented development workflow. It is about the mindset: how to integrate code agents and human engineerings into an iteration loop, so the software (firmware) production gets more efficient (in term of quantity and quality). Just like all the software engineering best practices and methodologies we had, now its time to shift to agentic paradigm.

Big topic, and I believe it is big value. I’ll keep experimenting. But first of all, my <a href="https://github.com/seanslab-org/guides/blob/main/Engineering%20Guide.md" class="notion-link link" data-server-link="true" data-link-uri="https://github.com/seanslab-org/guides/blob/main/Engineering%20Guide.md">engineering guide for coding agents</a> did helped me for my experiments. It iterated several versions and it start to help my agent to better perform.

Other tips I found helpful (with the support of the above engineering guide, since it leads agents to document and log along with development):

1.  Dare to reset

    There are cases that I run out of quota, or terminal just stopped response. I was “scared”. But after several resets, no worries. Model/Agent may gets smarter after hours of coding.

2.  Break the loop

    Repeating on a “hard” problem? Like agent asks you to test this and that but never route out of this logical loop? It is time you help it breaks. What I did is to just ctrl+c quit and restart again. Or tenderly stop his work and ask: hey, stop, let’s review from scratch. This REALLY helps.

3.  Change agents and models

    Just like the above, sometimes you need to break its loop. Sometimes you need to “fire” him. For corner case embedded development, you are really not sure if Claude is better, or Codex, maybe Gemini. Just try.

    

    <img src="/assets/imported/vibe-coding-for-embedded-systems-figure-01.png" style="color:transparent;object-fit:contain;object-position:center;height:auto" loading="lazy" decoding="async" data-nimg="1" width="681" height="909" alt="image" />

    

4.  Check your setup, hardware is hardware, do not assume they work, and do not assume they work consistently. Example: I was using a USB C-to-C cable for the Car Thing, that cabled worked no problem for daily data transfer and charging, but on Car Thing firmware flash, its data rate seemed slow and easy to fail, I spent at least 40 min on this before I identified the cable was the cause. So, NO ASSUMPTION.

These were my summaries from several toy projects, the hardwares are M5Stack FIRE, Lily Go T5 and Spotify Car Thing. They are fun to play with. And the car thing is not easy, I’ll share more about it once I made it work.
