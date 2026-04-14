# FFmpeg: The Code That Runs Every Video on Earth

*And the wild story of the people who built it.*

---

If you've ever watched a YouTube video, streamed a show on Netflix, converted a file with HandBrake, or played anything in VLC — congratulations, you've used FFmpeg. You probably just didn't know it.

FFmpeg is the invisible plumbing of the entire multimedia world. It's in your phone, your browser, your smart TV, your game console, and — no joke — on NASA's Perseverance rover crawling around on Mars. Nearly 3,000 companies use it in production. And yet, the person who maintained it for over a decade chose to live in poverty so he could work on it full-time.

This is the story of FFmpeg. It's a story about genius, ego, a pseudonym, a fork war, a Hall of Shame, and billions of dollars of industry value built on code that almost nobody pays for.

---

## Chapter 1: A Frenchman With a Fake Name (2000)

It's December 20, 2000. A programmer pushes the first commit of a new multimedia framework to a public repository. The author name reads: **Gérard Lantau**.

That name is fake.

The real author is **Fabrice Bellard**, a French computer scientist born in 1972 in Grenoble. Bellard used a pseudonym because, back in 2000, writing your own video codec implementations was a fantastic way to get sued by patent holders. The multimedia patent landscape was a minefield — MPEG-LA was actively licensing and enforcing, and an open-source codec library was essentially painting a target on your back.

So Bellard did what any reasonable genius would do: he shipped the code anyway, just under a fake name.

The project was called **FFmpeg** — "FF" for **Fast Forward**, "mpeg" for the Moving Picture Experts Group standard. The motivation was simple and deeply pragmatic: on Linux in 1999, if you downloaded a video and double-clicked it, *nothing happened*. You needed RealPlayer, QuickTime, or Windows Media Player, and none of those ran natively on Linux. The multimedia stack was fragmented, proprietary, and hostile to open platforms.

Bellard's solution was characteristically elegant. He designed FFmpeg with a clean separation between the **codec layer** (`libavcodec`) and the **format/container layer** (`libavformat`). This architecture — which seems obvious in hindsight — was revolutionary. It meant you could mix and match: decode H.263 from an AVI container, encode MPEG-2 into a transport stream, or transcode between any combination of codecs and formats. By 2001, FFmpeg already handled MPEG-1, MPEG-2, MPEG-4, H.263, and multiple audio codecs.

### Who is Fabrice Bellard, really?

If you're an audio/video developer, you know FFmpeg. But you may not realize that the same person also created:

- **QEMU** — the processor emulator that underpins virtually all modern cloud virtualization. KVM, which powers AWS, Google Cloud, and Azure, is built on top of QEMU.
- **Tiny C Compiler (TCC)** — a C compiler so small and fast it can compile the Linux kernel.
- **Bellard's formula** — a mathematical formula for computing individual digits of pi. In 2009, he used it to compute **2.7 trillion digits of pi on a single desktop PC**, a world record at the time.
- He also won the International Obfuscated C Code Contest (IOCCC) multiple times, because apparently being a genius in useful ways wasn't enough.

Bellard has a pattern: build something world-changing, get it to the point where it's self-sustaining, then walk away and build the next impossible thing. FFmpeg was no different.

---

## Chapter 2: Enter Michael Niedermayer (2004)

By 2003-2004, Bellard was already losing interest in the day-to-day maintenance of FFmpeg. He had bigger fish to fry (QEMU was calling). So in 2004, he handed the reins to **Michael Niedermayer**, an Austrian developer who had come from the MPlayer community.

Niedermayer didn't just maintain FFmpeg — he *became* FFmpeg. He wrote or significantly improved critical components: the video postprocessing library, `libswscale` (the image format conversion library), and countless codec implementations. He was prolific, technically brilliant, and utterly devoted to the project.

How devoted? **Niedermayer chose to live at minimum income so he wouldn't have to waste time on other work.** He rarely attended conferences. He didn't pursue a conventional career. He dedicated everything to FFmpeg.

For audio and video developers, this is the kind of person you've been silently depending on for twenty years. Every time you run `ffmpeg -i input.mp4 output.avi`, you're running through years of his work.

But Niedermayer's leadership style was… polarizing. He had an attitude of "I commit whatever I want," didn't prioritize code cosmetics, preferred mailing lists over face-to-face discussion, and could be rough on newcomers. As the project grew, these traits went from minor friction to serious governance problems.

---

## Chapter 3: The Great Fork War (2011)

On **March 13, 2011**, a group of core FFmpeg developers did something dramatic: they forked the entire project and created **Libav**.

The reasons were less about technology and more about people. The Libav faction's complaints centered on Niedermayer's centralized leadership model — his approach to commit access, code review, and project management felt arbitrary and stifling to many contributors. The tensions had been building since roughly 2010, but the fork made them explosive.

What happened next was messy, even by open-source drama standards:

- The Libav developers briefly **took control of the ffmpeg.org domain** (Bellard, the original owner, eventually helped recover it).
- Libav convinced several major Linux distributions — **Debian, Ubuntu, and Gentoo** — to switch from FFmpeg to Libav as the default package.
- Both projects continued developing in parallel, with patches sometimes flowing in both directions (and sometimes not, leading to divergent implementations of the same features).

For years, if you ran `ffmpeg` on a Debian system, you were actually running Libav's binary, not FFmpeg's. Most users had no idea.

In **June 2015**, Niedermayer himself stepped down as FFmpeg project leader, and the project transitioned to a more distributed governance model. But by then, the tide had turned: FFmpeg's community had regrouped, the distributions started switching back, and Libav slowly lost momentum.

**Libav was declared abandoned in 2020.** FFmpeg won.

But the fork war left scars. It split the contributor pool, created years of duplicated effort, and — for a while — genuinely threatened the continuity of the most important multimedia software in the world.

---

## Chapter 4: The Hall of Shame

FFmpeg is licensed under the **LGPL** (or GPL, depending on build options). This means if you use it, you need to comply with the license — publish your source code or at minimum make it available on request, and give proper attribution.

Guess how many companies do this properly?

FFmpeg's response was delightfully confrontational: they created the **[Hall of Shame](https://ffmpeg.org/shame.html)** — a public list of companies violating their license. Video conversion tools, media players, and streaming apps that quietly shipped FFmpeg inside commercial products without credit or source code got called out by name.

Some violators complied and got removed from the list. Some ignored it. One violator, the founder of a commercial media player, actually **threatened** FFmpeg developers for calling out the violation.

For any developer who's worked on open-source software, this resonates. You write the code. A company wraps it in a GUI, charges $29.99, and pretends they wrote it. The Hall of Shame was the FFmpeg community's way of saying: *we see you*.

---

## Chapter 5: The World Runs on FFmpeg

Let's talk about the sheer scale of FFmpeg's impact, because it's hard to overstate.

**YouTube** — FFmpeg's libraries are part of the core video processing pipeline. Every video you upload gets processed through code descended from what Bellard started in 2000.

**Netflix** — Uses FFmpeg to encode videos across their entire library, optimizing for different devices and connection speeds. They're also a major contributor to SVT-AV1, a next-generation encoder integrated into FFmpeg.

**VLC** — The most popular open-source media player in the world, powered by `libavcodec` and `libavformat` under the hood.

**Chrome/Chromium** — Google's browser uses FFmpeg for media playback. If you've ever watched an HTML5 video, FFmpeg decoded it.

**Blender, HandBrake, Plex, Kodi, Shotcut, Bilibili** — all built on FFmpeg.

**NASA's Perseverance rover** — uses FFmpeg for image and video compression before transmitting footage from Mars back to Earth.

And here's the bitter irony: **Google, which uses FFmpeg in both Chrome and YouTube and generated over $400 billion in revenue in 2025, recently sent FFmpeg an AI-generated list of security bugs — without providing patches or financial support.** Meanwhile, the person who maintained the codebase for over a decade chose poverty.

This is the open-source sustainability problem in its purest form.

---

## Chapter 6: The Architecture (For the Nerds)

If you're an audio/video developer, you already appreciate FFmpeg's command-line power. But the architecture underneath is worth understanding.

FFmpeg's core libraries:

- **`libavcodec`** — The codec library. Encoders and decoders for hundreds of audio and video formats. This is the beating heart. You'll find everything from ancient RealVideo to cutting-edge AV1 in here.
- **`libavformat`** — Container/demuxer/muxer library. Handles reading and writing MP4, MKV, FLV, MPEG-TS, WAV, FLAC, and dozens more.
- **`libavfilter`** — The filter graph engine. Scaling, cropping, overlays, color correction, audio resampling — if you can describe it as a processing graph, it goes here.
- **`libswscale`** — Pixel format conversion and image scaling. The thing that makes YUV420p-to-RGB conversion fast.
- **`libswresample`** — Audio resampling, format conversion, and channel layout remixing.
- **`libavutil`** — Shared utility functions. Math, memory allocation, pixel format descriptors.

The genius of this architecture is that companies like YouTube, Netflix, and Vimeo can **link directly against `libavcodec` and `libavformat`**, bypassing the `ffmpeg` command-line binary entirely. This gives them fine-grained control over threading, memory allocation, and I/O — exactly what you need at scale.

For those of us who grew up doing manual SIMD optimization on DSP cores, there's something deeply satisfying about FFmpeg's approach to performance: hand-written assembly for x86 (SSE, AVX), ARM (NEON), and other architectures, with C fallbacks for portability. It's the kind of code where someone profiled every hot loop and made every cycle count.

---

## Chapter 7: Key People Who Shaped FFmpeg

Beyond Bellard and Niedermayer, the project was shaped by many dedicated developers:

- **Måns Rullgård** — Architected FFmpeg's build system to near perfection. Anyone who's run `./configure && make` on FFmpeg and had it *just work* across platforms has Rullgård to thank.
- **Baptiste Coudurier** — The broadcast expert. Brought professional-grade support for ProRes, DNxHD, MXF, and other formats critical to the film and TV industry. If FFmpeg works in a professional post-production pipeline, Coudurier is a big reason why.
- **Loren Merritt** — Maintainer of H.264 codecs in FFmpeg and a key figure in x264 development. His work on the fastest open-source H.264 encoder set the standard for software encoding performance.
- And hundreds more — the MAINTAINERS file on GitHub is long, and each name represents someone who cared enough about multimedia to contribute to the commons.

---

## Epilogue: Still Running, Still Underfunded

FFmpeg turned 25 in 2025. It has survived a pseudonymous founding, a hostile fork, governance crises, rampant license violations, and chronic underfunding. It remains the single most important piece of multimedia infrastructure in the world.

If you're an audio or video developer, every tool in your pipeline either *is* FFmpeg or *depends on* FFmpeg. It's the kind of software that makes you re-evaluate what "impact" means in engineering. Not a startup. No funding round. No exit. Just one library, started by a guy with a fake name, that ended up running every video on Earth.

The next time you run an FFmpeg command, maybe send a few dollars to [ffmpeg.org/donations](https://www.ffmpeg.org/donations.html). The code is free. The people who write it still need to eat.

---

*Published on seanslab.org*
