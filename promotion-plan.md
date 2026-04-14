# seanslab.org Promotion Plan

## Critical Issue: Not Indexed by Google

`site:seanslab.org` returns zero results. Before any promotion, fix this:

- [ ] Submit sitemap to [Google Search Console](https://search.google.com/search-console)
- [ ] Submit sitemap to [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [ ] Ensure each post has proper meta tags (title, description, og:image, og:title, og:description, twitter:card)
- [ ] Verify robots.txt isn't blocking crawlers
- [ ] Add canonical URLs to each post

---

## SEO Checklist (Per Post)

### FFmpeg post
- **Title tag**: `FFmpeg: The Code That Runs Every Video on Earth | seanslab`
- **Meta description**: `The story of how Fabrice Bellard built FFmpeg under a fake name, how one maintainer chose poverty to keep it alive, and why it powers every video on Earth — from YouTube to NASA's Mars rover.`
- **Target keywords**: ffmpeg history, ffmpeg story, fabrice bellard, michael niedermayer, ffmpeg architecture, open source multimedia

### WebRTC post
- **Title tag**: `WebRTC: The Protocol That Made the Browser a Phone | seanslab`
- **Meta description**: `How Google spent $68M on a Swedish telecom engine, open-sourced it, survived a codec war, and accidentally built the infrastructure that carried humanity through a pandemic.`
- **Target keywords**: webrtc history, webrtc architecture, GIPS acquisition, webrtc codec war, webrtc protocol stack, justin uberti webrtc

---

## Hacker News Submissions

HN is the single highest-leverage channel for these posts. The audience (senior engineers, OSS maintainers, DSP/systems people) is a perfect match.

### FFmpeg submission
- **Title**: `FFmpeg: The Code That Runs Every Video on Earth`
- **URL**: `https://seanslab.org/ffmpeg-the-code-that-runs-every-video-on-earth`
- **Best time to post**: Tuesday–Thursday, 8–10 AM ET (peak HN traffic)
- **Why it'll work on HN**: FFmpeg is universally used by HN readers. The Bellard angle, the poverty angle, the Google AI-bug-report outrage — these are HN catnip.

### WebRTC submission
- **Title**: `WebRTC: The Protocol That Made the Browser a Phone`
- **URL**: `https://seanslab.org/webrtc-the-protocol-that-made-the-browser-a-phone`
- **Best time**: Submit 2–3 days after FFmpeg (don't cannibalize your own traffic)
- **Why it'll work**: The GIPS acquisition story is not widely known. The codec war and SDP/ORTC drama will resonate with browser and telecom engineers.

**HN tips**: Don't self-promote in comments unless asked. If it hits front page, be ready to engage in comments with your DSP/embedded expertise — that's your differentiator.

---

## Reddit Submissions

### Subreddits (in priority order)

| Subreddit | Post | Notes |
|-----------|------|-------|
| r/programming | Both | 4.7M members. Title as-is. |
| r/linux | FFmpeg | FFmpeg's Linux roots. Libav fork story resonates here. |
| r/webdev | WebRTC | Web developers who use WebRTC but don't know the history. |
| r/opensource | Both | Open-source sustainability angle. |
| r/DSP | Both | Your people. Small but engaged. |
| r/AV1 | Both | Codec enthusiasts. |
| r/technology | Either | For broader reach if the niche subs gain traction. |

**Reddit tips**: Space out submissions (1 per sub per day max). Use the exact blog title, don't editorialize. Engage authentically in comments.

---

## Twitter/X Posts

### FFmpeg thread

**Tweet 1 (hook):**
> I wrote about FFmpeg — the code that runs every video on Earth.
>
> YouTube, Netflix, Chrome, VLC, NASA's Mars rover. Nearly 3,000 companies in production. And the guy who maintained it for a decade chose poverty to do it.
>
> 🧵 Thread + full post below

**Tweet 2:**
> FFmpeg was created in 2000 by Fabrice Bellard — under a fake name ("Gérard Lantau"), because writing open-source video codecs was a great way to get sued by patent holders.
>
> The same person also created QEMU, computed 2.7 trillion digits of pi on a desktop PC, and wrote a C compiler small enough to fit in a tweet.

**Tweet 3:**
> In 2011, a group of core devs forked FFmpeg into Libav. They took over the domain. Debian and Ubuntu switched. For years, running `ffmpeg` on Debian actually ran Libav's binary.
>
> Libav was declared abandoned in 2020. FFmpeg won. But the fork war left scars.

**Tweet 4:**
> Google uses FFmpeg in both Chrome and YouTube. Revenue: $400B+ in 2025.
>
> They recently sent FFmpeg an AI-generated list of security bugs — no patches, no funding.
>
> The person who maintained it for 10+ years chose to live at minimum income.
>
> Full post → [link]

### WebRTC thread

**Tweet 1 (hook):**
> I wrote about WebRTC — the protocol that made the browser a phone.
>
> In 2010, Google bought a small Swedish company called GIPS for $68.2M. Most people have never heard of it.
>
> That acquisition became the foundation for Google Meet, Discord, and a billion pandemic video calls.

**Tweet 2:**
> GIPS built two legendary VoIP codecs (iLBC, iSAC) and the best echo cancellation engine in the world.
>
> Google open-sourced everything in 2011. Then the codec war started: VP8 (Google) vs H.264 (Apple/Microsoft/Cisco). It took 2 years to reach a Solomonic compromise: implement both.

**Tweet 3:**
> WebRTC's standardization was supposed to take 2–3 years. It took 10.
>
> Codec wars, SDP vs ORTC philosophical schisms, Apple refusing to ship it until 2017, Microsoft killing ORTC when Edge moved to Chromium.
>
> It became a W3C standard in 2021 — already used by billions.

**Tweet 4:**
> The next time your Google Meet audio just works — no echo, no noise — remember there's a jitter buffer adapting in real time, an echo canceller tracking your room's impulse response, and a noise suppressor estimating your spectral floor.
>
> That's 25 years of Swedish DSP engineering, open-sourced.
>
> Full post → [link]

### Spotifone thread

**Tweet 1 (hook):**
> I modded a dead Spotify Car Thing into a vibe coding microphone.
>
> Mic for voice-to-text. Button for push-to-talk. Wheel for window switching. 4 extra keys.
>
> It took Opus 4.6, Codex 5.3, and a persistence lesson I didn't expect.
>
> 🧵

**Tweet 2:**
> Spotify killed the Car Thing. The hardware community kept it alive with custom firmware.
>
> My idea: turn it into a Bluetooth PTT microphone for vibe coding — talk to Cursor, Claude Code, or any voice agent, hands-free.
>
> First attempt with Sonnet 4.5 in Cursor failed. I shelved it for months.

**Tweet 3:**
> Round 2: Opus 4.6 in Claude Code. It researched the SoC, toolchain, and community firmware. Wrote an SDD better than anything I've written in my career.
>
> In one hour, the Car Thing was a working Bluetooth microphone.
>
> Then the hard part started — Bluetooth pairing, HID buttons, power-cycle stability.

**Tweet 4:**
> Key takeaway: coding agents get dumber over long sessions. They loop on the same mistakes.
>
> The fix: hard stop, restart clean, even switch agents. Claude → Codex → back to Claude.
>
> For embedded dev, human debugging instinct still saves the AI from dead loops. That gap will close — but not yet.
>
> Full post → [link]

**Posting strategy**: Post FFmpeg thread first. Wait 3–5 days. Post WebRTC thread. Wait 3–5 days. Post Spotifone thread. Tag relevant people only if natural. Spotifone targets vibe coding / AI dev tooling audience — different from the infra audience of FFmpeg/WebRTC.

---

## LinkedIn Posts

### FFmpeg

> New blog post: "FFmpeg: The Code That Runs Every Video on Earth"
>
> If you've watched a YouTube video, streamed Netflix, or used VLC — you've used FFmpeg. It's in your phone, browser, smart TV, and on NASA's Mars rover.
>
> I wrote about its origins (a French genius using a fake name), the person who maintained it for a decade while living in poverty, a hostile fork war, and why the most critical multimedia software in the world is still chronically underfunded.
>
> Whether you're in audio/video, open source, or just curious about the invisible infrastructure we all depend on — this one's worth a read.
>
> [link]

### WebRTC

> New post: "WebRTC: The Protocol That Made the Browser a Phone"
>
> How Google spent $68.2M to acquire a Swedish signal processing company, open-sourced their media engine, survived a 2-year codec war at the IETF, and accidentally built the protocol that carried humanity through the pandemic.
>
> I go deep on the architecture — ICE/STUN/TURN, DTLS-SRTP, the media engine (acoustic echo cancellation, noise suppression, jitter buffering) — and the people who made it happen.
>
> If you've ever joined a video call and the audio just worked, this is why.
>
> [link]

### Spotifone

> New post: "I Vibe Coded a Vibe Code Microphone for Vibe Coding, on Spotify Car Thing"
>
> Spotify killed the Car Thing. I turned mine into a Bluetooth push-to-talk microphone for vibe coding — using Claude Code (Opus 4.6) and Codex 5.3 to write the embedded firmware.
>
> Mic for voice input. Button for PTT. Wheel for window switching. Four shortcut keys. All running on repurposed hardware that was headed for a landfill.
>
> Biggest lesson: AI coding agents degrade over long sessions. Hard stop, clean restart, switch agents — that pattern was the breakthrough. Also: for embedded work, human debugging instinct still pulls the AI out of dead loops.
>
> If you have a dead Car Thing in a drawer, it can still be useful.
>
> [link]

---

## Cross-posting / Syndication

- [ ] **dev.to** — Repost both articles with canonical URL pointing to seanslab.org (dev.to supports this). Tags: #opensource #webrtc #ffmpeg #history
- [ ] **Medium** — Consider republishing with canonical URL, but dev.to is higher ROI for tech audience
- [ ] **Lobsters** — Invite-only, but if you have access, both posts fit perfectly
- [ ] **Chinese platforms** (secondary priority): 掘金, V2EX, 知乎 — use the Chinese versions

---

## Promotion Calendar

| Day | Action |
|-----|--------|
| Day 0 | Fix SEO: meta tags, sitemap, Google Search Console |
| Day 1 | Submit FFmpeg to HN (Tue–Thu, 8–10 AM ET) |
| Day 1 | Post FFmpeg Twitter thread |
| Day 1 | Post FFmpeg on LinkedIn |
| Day 2 | Submit FFmpeg to r/programming, r/linux, r/opensource |
| Day 2 | Cross-post FFmpeg to dev.to |
| Day 4 | Submit WebRTC to HN |
| Day 4 | Post WebRTC Twitter thread |
| Day 4 | Post WebRTC on LinkedIn |
| Day 5 | Submit WebRTC to r/programming, r/webdev, r/DSP |
| Day 5 | Cross-post WebRTC to dev.to |
| Day 7 | Review analytics, engage with comments |
| Day 8 | Post Spotifone Twitter thread |
| Day 8 | Post Spotifone on LinkedIn |
| Day 9 | Submit Spotifone to r/programming, r/vibecoding, r/embedded |
| Day 9 | Cross-post Spotifone to dev.to |
| Day 11 | Review all analytics, second round engagement |

---

## One More Thing

Your posts are genuinely excellent — deep, opinionated, technically accurate, well-researched. The content quality is not the problem. The problem is distribution. The single highest-ROI action is **getting on the Hacker News front page**. One HN front page hit will generate more traffic than everything else combined, and it seeds all downstream discovery (Google indexing, Twitter amplification, Reddit crossposts by others).

Write a good HN title. Submit at the right time. Be ready to answer comments. That's it.
