---
layout: layouts/post.njk
title: "I Vibe-Coded a Microphone for Vibe Coding on Spotify Car Thing"
description: "A discontinued dashboard gadget, an open-source jailbreak, and an experiment in giving old hardware a new job."
date: 2026-04-07
permalink: /posts/i-vibe-coded-a-vibe-code-microphone-for-vibe-coding-on-spotify-car-thing/index.html
series: "Build notes"
signal: "07"
featured: false
languageLabel: English
---
Yeah, sounds flappy it is. But it was really fun. I wanted to do this months ago, I couldn’t start until I finally have several days vacation.

I was doing several vibe coding projects, they are hobby toys, they also stands my purpose to explore vibe coding best practices for embedded software. I opened terminal for Cursor, Codex, Claude Code and OpenClaw (via Slack). For sure I was OK about to use my Mac + Option key + Typeless + Macbook microphone worked really well. But the original idea was always hanging around my mind. Can I mod the Spotify Car Thing to a Vibe Microphone?

— Mic for mic

— Button for push to talk (PTT)

— Wheel for window switching

Would that be nice? Later on I added the 4 buttons: left, right, del, enter.

<img src="/assets/imported/i-vibe-coded-a-vibe-code-microphone-for-vibe-coding-on-spotify-car-thing-figure-01.jpg" style="color:transparent;height:auto" loading="lazy" decoding="async" data-nimg="1" width="209" height="209" alt="image" />

I tried once with OpenClaw + Claude Code on Sonnet 4.5, it failed. Or it was not successful because I didn’t spend enough time. This holiday, I have time. So I started to try.

While I’m writing this, it is successful: I’m now using the device to vibe, really neat. So I’m going to share with you how it looks like, and how to make it (if you have a Spotify Car Thing).

It was started several months ago when I heard that Spotify officially EOL Car Thing. I did quick research myself: there are online community supported device mod with firmware and tool chain. Great, I can build sth. on top of it. So I used Cursor with Sonnet (should be 4.5 I was not wrong) with the same spec I listed above. About weekend afternoons, I never made real progress. So I just stop there.

Last week, I was working on new vibe coding projects, I found that **Codex 5.3** and **Opus 4.6** are so good, they solve complex coding problems, including embedded software, like flash, no-brainer. While I wow to the screen, the Car Thing idea came back. Maybe I should try again.

This time I’m more serious about it, so I prepared git, spec (simple though) and “hired” Claude Code to do the job. Claude first did research and plan, it collected information about SoC spec, toolchain, community firmware and lots of other stuff. The SDD was so well written that it leaps all the doc I ever created myself for my whole career. Then, with my permission, it started. Claude went really well, Opus 4.6 was my hero for the past 2 weeks. In just about one hour, my Car Thing was programmed to a Bluetooth microphone.

After the happy start, the “hero engineer Claude” seemed “tired” and failed and repeated-on-same-failure about Bluetooth pairing. I try to make it auto re-pair, but that never worked out. There were also failure patterns like Bluetooth Mac address, working setup got lost after power reset, etc. It is easy to imagine, and I already expected this before I start. I knew <a href="/posts/vibe-coding-for-embedded-systems" class="notion-link link" data-server-link="true" data-link-uri="/posts/vibe-coding-for-embedded-systems">vibe coding for embedded system can be hard</a>. Just I have to went through the whole process.

Luckily I’ve got my e<a href="https://github.com/seanslab-org/guides" class="notion-link link" data-server-link="true" data-link-uri="https://github.com/seanslab-org/guides">ngineering guide</a> setup at session init phase, so documentation and git was good, so Claude could always retrieve or recall the work. So we kept moving forward. The next true challenge came with HID. After I finish the microphone part, I want to add buttons. It never worked out. I’m not sure it was because Claude (Opus 4.6) were truly “tired” after hours of programming (inferencing), or it accumulated over-loaded context (including logics and instructions, and even mis-guides). It seemed just cannot finish the job, perform like repeating on similar fail patterns. I’m tired too. I packed the whole project VibeThing and just quit.

The next day, I thought why not try with Codex 5.3. I shared the context with it, it pointed several design and implementation issues (nothing huge) and it started to try HID. The start was good too, it quickly give me a prototype that support key events (on my Mac). But when I push it to a reliable Bluetooth pairing and reboot capable, Codex performed similar as Claude: repeat on similar mistakes. I have to stop again.

After these 2 sessions, together with vibe sessions from other projects, I start to feel that *<u>coding agent seems more smart at beginning, and gets dumb after long sessions</u>*. And there was once my Claude ran out of quota (though I’m on the Max subscription), I have to stop it and switch to Codex. These sense definitely helped me to decide once I encounter hard issues, I may stop and restart clean sessions, even switch the agent. So far this tip gives me **very positive results**.

So with **vibe session hard stop and restart** in mind, I finally made it: **spotifone**, the name I give it on the 2nd round. The Car Thing hardware now works as a Bluetooth microphone and shortcut keyboard.

If you press the button, it will trigger Typeless (or other voice-to-text app you use) for input

If you press the wheel, it will trigger app switch and you can navigate with the wheel

4 buttons: left, right, enter, del

That’s it, sounds simple, but decent effort involved. And I’m happy to **share with anyone** who’d like to try yourself.

The last yet most important **take aways** for this project: for embedded development, human experience is the key, at least for now. For many times that my debugging experience or instinct dragged LLM out of the loop, to save dead-loops. For example, use another mac address to trigger Mac Bluetooth pairing when my Mac failed to identify Car Thing. These knowledge are mostly in our brain, I mean engineers’ brain, they were not documented on the internet. But as we vibe more and more, LLM will acquire all of them for sure, not to mention they reason themselves.

Another one is about the **persistence attitude,** which I always value more than competence, there are cases that I just want to quit, I hate those stupid test loops. But I stayed, either switch agent, or clear context, or ask agent to stop and re-think from scratch, but I stayed. Even there were 3-4 times I felt it might not be achievable, I still belied it should. And finally it did.

As always, **All human wisdom is contained in these two words - wait & hope**.
