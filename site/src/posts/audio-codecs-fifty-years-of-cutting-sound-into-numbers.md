---
layout: layouts/post.njk
title: "Audio Codecs: Fifty Years of Cutting Sound Into Numbers"
description: "How a Bell Labs idea, one obsessive listening test, and a royalty-free upstart quietly ended a fifty-year codec war."
date: 2026-06-06
permalink: /posts/audio-codecs-fifty-years-of-cutting-sound-into-numbers/index.html
series: "Invisible Infrastructure · 04"
signal: "04"
cover: "/assets/covers/audio-codec-header.png"
featured: true
languageLabel: English
---
*How a 1971 idea from Bell Labs, a German researcher obsessed with one a cappella song, and a royalty-free upstart turned sound into bits — and quietly ended a fifty-year war.*

You have almost certainly used five different audio codecs today. You just don't know their names.

- The song Spotify played through your alarm this morning — **AAC**.
- The Zoom call with a colleague on your commute — **Opus**.
- The TikTok you scrolled at lunch — **AAC**, maybe **Opus**.
- The work call from your boss this afternoon — **AMR-WB** or **EVS**, if you were on a cellular network.
- The Netflix episode you watched tonight — **AAC** for the main track, **Dolby Atmos** for everything that moved around the room.

Behind every second of digital sound, a codec is working. It turns sound waves into bits, and bits back into sound waves. It lives in the baseband chip of your phone, in your Bluetooth earbuds, on the servers of every streaming service, in the amplifier behind a cinema screen. You never see it. But without it, *"sound" and "the internet" would be separated by a wall that is almost impossible to cross*.

This is the fifty-year story of audio codecs — and of the people who cut sound into numbers. It runs from the telephone your grandfather had to crank by hand to the TikTok livestream you scroll through tonight while typing in the comments. More than a century of arc, strung together by one family of algorithms.

## Chapter 1: Bell Labs Cuts Sound Into 8,000 Numbers (1972)

The story starts with a phone call in 1972.

That year, the telephone industry agreed on its first digital format that let every phone on Earth talk to every other phone: **G.711**. Its logic was almost brutally simple:

> **Sample the sound 8,000 times a second. Write down each sample as one byte.**

Think of a sound wave as the surface of water. **Sampling** means throwing 8,000 rulers at that surface every second and recording the height each time. Eight thousand heights, and you have one second of sound.

Why 8,000, and not 1,000, or 100,000? Because **almost all of human speech lives between 300 and 3,400 hertz.** A telephone engineer only has to capture detail inside that band, and the person on the other end still sounds like *you*. Higher frequencies — the shimmer of a cymbal — a human ear can hear, but a phone call doesn't need them. Lower ones, the chest-thump of a subwoofer, it doesn't need either.

8,000 samples × 8 bits = **64 kbps**. That is the definition of "toll-quality voice," and it hasn't changed in fifty years.

But G.711 has an awkward secret: **it isn't compressing anything. It's just writing the sound down as-is.** It's like moving house without packing — nothing is lost, but you need far too many boxes. A single call eats 64 kbps. On a 1970s landline, that was barely fine. By the time mobile phones arrived in the 1980s, it was hopeless — a cell tower could never hand every caller their own private 64 kbps.

For the next twenty years, the entire telephone industry worked on one problem: **how do you squeeze those 64 kbps down to 8, and still sound roughly the same?**

### Two men at Bell Labs planted the root

In 1971 — a year *before* G.711 was even standardized — two researchers at Bell Labs published a paper that pointed at a completely different idea.

They were **Bishnu Atal** (from Kanpur, India) and **Manfred Schroeder** (who had come from postwar Germany). Their collaboration can be summed up in one question:

> **What if you didn't transmit the sound itself — only the instructions for how to make it?**

Here's the intuition. When you speak, **your throat is a musical instrument.** Your vocal cords are the strings; your mouth and throat are the resonating body. Every human carries the same basic instrument — the physical structure is nearly identical from person to person. What differs is how you pluck it.

So if you send a description of the *instrument*, plus "how hard you're plucking which string, moment to moment," the other end can **rebuild your speech inside their own machine** — sounding the same, but with dozens of times less data crossing the wire.

They called the method **LPC** — linear predictive coding. Atal's 1971 paper proved you could carry intelligible speech with LPC at just **2,400 bits per second** — **27× less** than G.711's 64,000.

LPC is the **ancestor of every modern speech codec**. Every word you say on Discord today is, underneath, running on this idea from 1971.

🎭

**The irony, №1** — Atal held more than 80 patents over his career; Schroeder wrote more than 350 papers. Neither made the kind of money Brandenburg would later make (you'll meet him in Chapter 4). But they planted the root that every later codec grew from.

## Chapter 2: Squeezing a Call Into 8 kbps (1980s–1990s)

LPC gave everyone a new target: **can we squeeze it a little more?**

Why did this matter so much? A 1990s GSM cell tower could carry at most a few hundred simultaneous calls. At 64 kbps each, it choked at a few hundred people. At 13 kbps each, it could carry five times as many. **Spend five times less, collect five times more in call fees** — for a carrier, every kilobit saved was worth hundreds of millions of dollars.

So from the 1980s into the 2000s, engineers refined the "instrument + plucking" idea over and over:

- **GSM Full Rate (1987)** — what your first Nokia ran on. 13 kbps. A little metallic, but intelligible.
- **G.729 (1996)** — 8 kbps. Nearly every early VoIP phone used it, including the internet-café "call long distance from a PC" software of the late '90s.
- **AMR-WB** — the voice codec of the 3G/4G era. It widened the captured range from 3.4 kHz to 7 kHz — **which is exactly why phone calls suddenly sounded so much clearer once you were on 4G.** The other person hadn't changed; the codec could finally carry more of them.

All of these belong to one algorithmic family: **CELP** (code-excited linear prediction). CELP, too, was Atal's — he proposed it in 1985. He didn't just plant the root of LPC; he drove its most important industrial branch.

The CELP family is rarely discussed by outsiders, because it hides beneath the protocol layer, runs inside baseband chips, lives where you can't see it. But **billions of CELP streams are running every second of every day** — every cellular call, every WeChat or WhatsApp voice note, every VoLTE connection.

## Chapter 3: Thunder in the Cinema — Dolby vs DTS (1991–1997)

While the telephone industry was scraping bits out of a narrow band, the cinema industry was doing the exact opposite: **spending more bits to give you more channels.**

Two protagonists.

**Ray Dolby** — born in Oregon in 1933, founded **Dolby Laboratories** in London in 1965. Dolby's early business was analog noise reduction; those cassette tapes stamped "Dolby B" were his. In 1991 Dolby released a digital audio standard, **AC-3** (a.k.a. Dolby Digital), which for the first time carried 5.1 channels at once: left / center / right / left-surround / right-surround, plus a low-frequency channel.

> AC-3's cinema debut was June 1992 — *Batman Returns*. **For the first time, the audience in the back row heard "a bullet flying overhead" actually come from overhead.**

**Terry Beard** — a Berkeley graduate, founded **DTS** (Digital Theater Systems) in 1993. DTS bet the opposite of Dolby: **a much higher bitrate (1.5 Mbps, 3× AC-3) with gentler compression**, selling "you can't hear the loss."

> DTS's cinema debut was June 1993 — *Jurassic Park*. **Spielberg personally insisted every theater showing it install DTS.** That summer, hundreds of American cinemas re-fitted their sound systems for a single movie.

Then came a decade-plus tug-of-war:

- **DVD (1996)**: AC-3 mandatory, DTS optional. Dolby won.
- **Digital TV broadcast**: AC-3 a required standard. Dolby won again.
- **Blu-ray (2006)**: a truce — both sides' lossless versions (**Dolby TrueHD** vs **DTS-HD Master Audio**) were allowed.

Later, Dolby Atmos and DTS:X moved the battle up a level — no longer transmitting *channels*, but the *position of each sound in 3D space*. The reason that speaker in your ceiling fires at a particular moment is that the movie told it: "the helicopter is now passing over the front-left of your head."

🎭

**The irony, №2** — Dolby and DTS have charged a toll on nearly every movie you've ever seen. But neither has ever touched the song on your Spotify — that belongs to a different family of codecs entirely.

## Chapter 4: A Small Room in Erlangen, and "Tom's Diner" (1988–1995)

In 1988, **Karlheinz Brandenburg** was a researcher in his early thirties at an unremarkable institute in Erlangen, Germany. He was handed a problem:

**Carry a piece of music that sounds as good as a CD, using as few bits as possible.**

This was an order of magnitude harder than speech. Telephone speech could use LPC — just describe the "throat instrument" and send it across. But **music has no such structure** — singer + drums + guitar + synth + reverb. You can't build an instrument model for every one of those.

Brandenburg's team (called **ASPEC**) reached for a new idea — **psychoacoustics**:

> **The parts the human ear can't hear, don't send.**

The human ear has some strange limits:

- A loud signal masks a quieter one nearby in frequency (next to a running drill, you can't hear someone's whisper).
- A loud signal masks quieter ones for tens of milliseconds *before and after* it (you don't hear the small noises just around an explosion).
- The ear is most sensitive around 2–5 kHz, and only so-so at 50 Hz and 18 kHz.

Map those limits precisely, and **you know exactly which bits you can throw away without anyone noticing.** It's the way a makeup artist knows to paint eyelashes for a close-up and not bother for a long shot.

The ASPEC team merged algorithms with another group (Philips's **MUSICAM**), and in 1993 published a standard. It didn't care whether you came from ASPEC or MUSICAM; the standard number was **MPEG-1 Audio Layer III** — that is, **MP3**.

### Suzanne Vega and "Tom's Diner"

To test whether a lossy codec is perfect, you need the hardest possible material. Brandenburg chose the **original 1987 a cappella version of "Tom's Diner,"** the track that opens Suzanne Vega's album *Solitude Standing* — **just her voice, no instruments at all.**

> A note: there's also a 1990 D.N.A. remix with a beat, bass, and shaker — **the version you're far more likely to stream today. Brandenburg didn't use that one.** The 1987 original is clean, bare voice; all you hear is her breath, the friction of her lips and teeth, a swallow.

Why is this version so hard? The key isn't anything special about the human voice — it's the *absence of accompaniment*:

- **There's no background to hide compression artifacts behind.** With accompaniment, the encoder can tuck its flaws behind drums and synths; with none, **the artifacts have nowhere to hide** and slam straight into your ear.
- The voice's spectrum isn't simple — vibrato, breathiness, the sibilance of an "s" are all broadband high-frequency noise, exactly what psychoacoustic coding is worst at. (For the same reason, **cymbals, shakers, and hi-hats are the first things a codec breaks at low bitrates** — it's one and the same problem.)
- The ear has an **evolutionary** sensitivity to the human voice — any flaw is instantly flagged as a "fake voice," a mistake the algorithm can never make.

In that small office in Erlangen, Brandenburg sat with headphones on, playing "Tom's Diner" over and over. He'd change a line of code and listen again. Colleagues later recalled that he barely left that chair for years. Until one day in the mid-1990s, he listened, and took the headphones off —

> **"This version is flawless."**

That was the moment MP3 was truly born.

Suzanne Vega herself didn't learn until years later that her voice had been the gold standard for the entire MP3 codec. The press gave her a nickname: **the Mother of MP3.**

Brandenburg later said: "Tom's Diner wasn't chosen because it's beautiful — it was chosen because it's the hardest thing to compress."

### Postscript: what MP3 threw away

In 2014, a doctoral student at the University of Virginia named **Ryan Maguire** did something unusual.

He encoded "Tom's Diner" as MP3, and then **kept what was left over when you subtract the decoded MP3 from the original file.** That leftover is everything MP3 threw away — the signals the ear supposedly can't hear.

He assembled that pile of "inaudible scraps" into a piece of music called **moDernisT** (an anagram of "Tom's Diner").

Listen to *moDernisT* and you notice something: **some of those sounds are, in fact, audible.** Brandenburg's algorithm is optimal *on average* at being inaudible — but not in every instant. The things MP3 discarded, stacked together, are a ghostly, eerie voice, like someone heard from underwater.

Brandenburg listened to "Tom's Diner" thousands of times to learn what could be thrown away; Maguire listened to hear **what actually had been.** It's the photographic negative of MP3.

<img src="/assets/imported/audio-codecs-fifty-years-of-cutting-sound-into-numbers-figure-01.png" style="color:transparent;height:auto" loading="lazy" decoding="async" data-nimg="1" width="1000" height="1000" alt="Three approaches to compression, one root — record the waveform (PCM), send the instrument and the pluck (LPC), or throw away the inaudible (psychoacoustics). All are branches after Atal &amp; Schroeder&#39;s 1971 LPC paper." />

Three approaches to compression, one root — record the waveform (PCM), send the instrument and the pluck (LPC), or throw away the inaudible (psychoacoustics). All are branches after Atal & Schroeder's 1971 LPC paper.

## Chapter 5: MP3 Goes Feral — Winamp, Napster, LAME (1997–2003)

After MP3's 1995 release, **it didn't catch fire for a few years.** The reasons were embarrassing:

- 1995 PCs were too slow — encoding a song to MP3 took longer than the song.
- The internet was too slow — a 5 MB song took ten minutes over a 56k modem.
- Nobody sold MP3s — stores carried only CDs.
- **There was no good player.**

What changed this was several independent things landing at once. None was enough alone; together, they let MP3 slip its leash.

### 1997 · Justin Frankel and Winamp

**Justin Frankel, a 17-year-old college dropout,** wrote **Winamp** in his parents' house — the first genuinely good Windows MP3 player. Its slogan, *"It really whips the llama's ass,"* became a passphrase for a generation of geeks.

Winamp passed 30 million downloads in two years. **It turned MP3 from a technical spec into "a song you could listen to this afternoon."** In June 1999, AOL bought Frankel's company, Nullsoft, for about \$80 million.

But what Frankel did next was more dramatic than Winamp.

In March 2000, on AOL's own corporate servers, he released **Gnutella** — a **decentralized, nearly un-shutdownable peer-to-peer file-sharing protocol.** The release notes read: *"See? AOL can bring you good things!"*

The timing could not have been worse — **AOL was in the middle of merging with Time Warner, whose record labels were busy suing Napster.** Frankel had essentially set off a bomb in his parent company's courtroom. AOL forced it down within hours and disavowed it — **but the code was already loose.** The roots of BitTorrent, IPFS, and every decentralized file-sharing protocol today are in the few hundred lines Frankel wrote that afternoon. *Wired* later nicknamed him **"the most dangerous geek in the world."** Frankel left AOL in 2004 and went on to build REAPER, living the same quiet life as FFmpeg's Niedermayer.

### 1999 · The Napster Big Bang

A few months before Frankel loosed Gnutella — June 1999 — a college student named **Shawn Fanning** released **Napster** from his dorm at Northeastern University in Boston: a peer-to-peer file-sharing system. The fact Napster exploited: **a compressed MP3 was small enough to share a whole song over dial-up.**

What followed is one of the most famous explosions in tech history:

- 80 million Napster users worldwide within 18 months.
- Billions of MP3 files moving freely online — nearly all pirated.
- Metallica sued Napster in 2000.
- Napster was forced to shut down under legal pressure in July 2001.
- **U.S. recorded-music revenue fell 60% between 1999 and 2009** — an entire industry rewritten by a codec.

### 2000 · LAME and the legal loophole

The MP3 explosion had a dark corner: **at the time, every MP3 file was, to some degree, a legal violation.**

Fraunhofer's official 1994 encoder, **l3enc**, was shareware — the free version capped at 112 kbps, and unlocking 320 kbps cost 350 Deutsche Marks (about \$250). It was cracked within months; the binary spread through BBSes, IRC, and the warez scene worldwide.

Then a group of independent programmers did something: they reverse-engineered l3enc and wrote an open-source MP3 encoder from scratch, called **LAME.**

LAME's name is a recursive joke: **LAME Ain't an MP3 Encoder.** That wasn't just humor — it was a **legal shield**:

> The LAME team **only ever published source code, never compiled binaries.** The legal argument: "This is merely an educational description of *how one might write* an MP3 encoder, not the encoder itself. Once you take the source and compile it yourself, the patent-infringement liability transfers to you."

This is the same **engineering version of a legal loophole** that FFmpeg's Bellard used early on, publishing codecs under a pseudonym (Gérard Lantau) — technically doing the whole job, legally appearing to do nothing.

The irony: after 2003, LAME's actual encoding quality **surpassed Fraunhofer's own official encoder** — the open-source community iterated far faster than the institute.

> **Nearly every MP3 file you can download was made by LAME.** The patent holder's official encoder was beaten by a volunteer project called "not an MP3 encoder."

### 2003 · iTunes strikes back

The labels knew the MP3 ship couldn't be stopped — once people learned to download music, they were never going back to CDs. The only move left was to get into the river themselves.

In April 2003, the **Apple iTunes Store** launched. For the first time, **digital music could be bought legally.** 99 cents a song.

But iTunes didn't use MP3 — it used **AAC.** The reasons were practical:

- AAC is MP3's successor: newer, more efficient (at the same 128 kbps, AAC sounds clearly better).
- **More importantly:** MP3 was open — anyone could encode it — but AAC could carry DRM (Apple's FairPlay), meaning a song you bought would only play on your iPhone/iTunes. That was the labels' condition for putting music on the store at all.

Microsoft pushed its own **WMA** (Windows Media Audio) in the same period, also DRM-bound, tied to Windows + Zune.

**Microsoft lost.** The iPod + iTunes hardware-software lock-in shut WMA out.

By the 2010s the picture had set:

- **MP3** = the songs you downloaded in 2008 and still have in a folder somewhere.
- **AAC** = the songs in iTunes / Apple Music / YouTube / nearly every streaming service today.
- **WMA** = died alongside Windows Media Player.

🎭

**The irony, №3** — Fraunhofer's peak — collecting €100 million a year in MP3 royalties — coincided exactly with the era when Napster made MP3 ubiquitous. Every pirated MP3 was made by a Fraunhofer-descended encoder; they earned billions while all of humanity shared their format illegally. The patents finally expired in 2017.

## Chapter 6: Xiph's Rebellion, and the Other Side of Lossless (2000s)

Every standard locked behind patents breeds an open-source challenger.

At the center of this one is the **<a href="http://Xiph.Org" class="notion-link link" data-server-link="true" data-link-uri="http://Xiph.Org">Xiph.Org</a>** **Foundation** — a nonprofit founded in Boston in 1994 by **Christopher "Monty" Montgomery** (MIT EECS, with a master's from the Tokyo Institute of Technology), with a single goal: **make royalty-free multimedia codecs for the internet.**

Xiph had no business model — **every member was a volunteer.** For three decades, Monty's salary was paid by Red Hat (and later Mozilla) in the form of "a donation to Xiph," so he could write codecs full-time while Xiph itself earned nothing. It's a stable anti-business model of the open-source world: **what you build is used by all of humanity, but you're kept alive by some other company's conscience.**

Xiph shipped three key codecs in the 2000s:

- **Vorbis (2002)** — the challenger to MP3. Royalty-free, and technically a notch better. Wikipedia, early Spotify, and nearly every open-source game (those .ogg files) used it.
- **Speex (2002)** — a royalty-free speech codec, the challenger to G.729. Its designer was **Jean-Marc Valin** — remember that name for the next chapter.
- **FLAC (2001)** — a free lossless codec written by **Josh Coalson.** The three letters are a political manifesto: **Free Lossless Audio Codec.**

### Wait — what does "lossless" mean?

Here's the thing every ordinary listener should understand.

> **Lossy vs lossless = JPEG vs PNG, but for sound.** MP3 / AAC / Opus are *lossy*: throw away part of the sound for a smaller file — you can't hear the difference, but data is genuinely gone. FLAC / ALAC are *lossless*: not a single bit missing — big file, but identical to the CD.

So why would anyone spend more disk on lossless?

- If you do audio work (mixing, editing), you can't use MP3 — each re-save loses a little more (like a JPEG getting blurrier every time you save it).
- If you're an audiophile, you can hear the "compressed" flavor (part myth, part real — but on a good enough system, people genuinely can tell 128 kbps MP3 from lossless).
- If you want to re-encode it years from now — keeping lossless means you can transcode to any future format you like.

### The lossless war

FLAC wasn't the only lossless codec. Through the 2000s the audiophile scene produced a long list:

<table class="notion-table col-header">
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<tbody>
<tr style="color:var(--color-text-default)">
<td style="min-width: 120px; max-width: 240px; background: var(--color-undefined)">
Codec
</td>
<td style="min-width: 120px; max-width: 240px; background: var(--color-undefined)">
Who made it
</td>
<td style="min-width: 120px; max-width: 240px; background: var(--color-undefined)">
Outcome
</td>
</tr>
<tr style="color:var(--color-text-default)">
<td style="min-width: 120px; max-width: 240px">
<strong>FLAC</strong> (2001)
</td>
<td style="min-width: 120px; max-width: 240px">
Josh Coalson / Xiph
</td>
<td style="min-width: 120px; max-width: 240px">
Won — royalty-free, cross-platform, good
</td>
</tr>
<tr style="color:var(--color-text-default)">
<td style="min-width: 120px; max-width: 240px">
<strong>Apple Lossless / ALAC</strong> (2004)
</td>
<td style="min-width: 120px; max-width: 240px">
Apple
</td>
<td style="min-width: 120px; max-width: 240px">
Default lossless on iPhone/Mac; truce after Apple open-sourced it in 2011
</td>
</tr>
<tr style="color:var(--color-text-default)">
<td style="min-width: 120px; max-width: 240px">
<strong>Monkey's Audio / APE</strong> (2000)
</td>
<td style="min-width: 120px; max-width: 240px">
An independent programmer
</td>
<td style="min-width: 120px; max-width: 240px">
Slightly better ratio than FLAC, but slow to decode and a less clean license
</td>
</tr>
<tr style="color:var(--color-text-default)">
<td style="min-width: 120px; max-width: 240px">
<strong>WavPack</strong> (1998)
</td>
<td style="min-width: 120px; max-width: 240px">
David Bryant
</td>
<td style="min-width: 120px; max-width: 240px">
Dual-mode (lossy or lossless), niche
</td>
</tr>
<tr style="color:var(--color-text-default)">
<td style="min-width: 120px; max-width: 240px">
<strong>TAK</strong> (2007)
</td>
<td style="min-width: 120px; max-width: 240px">
A German programmer
</td>
<td style="min-width: 120px; max-width: 240px">
Highest ratio, but closed-source
</td>
</tr>
</tbody>
</table>

**FLAC won.** Good enough technically + royalty-free + cross-platform. **ALAC stands as its equal inside Apple's world** — Apple Music's hi-res tier and iTunes's Lossless mode both use it.

🎭

**The irony, №4** — Monkey's Audio had the best compression ratio, and lost to FLAC — because FLAC was royalty-free. Technology is never the only filter; patents and licensing are another. This rule is about to repeat one more time.

## Chapter 7: SILK + CELT = Opus, and the War Ends (2009–2012)

By 2010, the world of audio codecs was a mess:

- **Calls**: G.711 / G.729 / AMR / SILK / Speex
- **Music**: MP3 / AAC / Vorbis / FLAC / ALAC
- **Movies**: AC-3 / DTS / TrueHD / DTS-HD MA

Every one patented, none interoperable, each needing its own license.

More and more internet services wanted one thing: **real-time communication + music sharing + cross-platform + free.** And no single codec could do all four.

Two things were happening in parallel.

### Skype and SILK (2009)

Skype launched in Luxembourg in 2003, doing peer-to-peer internet calling. A Danish engineer inside Skype, **Koen Vos**, wrote a new codec — **SILK.**

SILK solved an old problem: **when your network gets jittery, can the audio not fall apart?** It could glide between 6 and 40 kbps — clear when the network was good, lower bitrate when it was bad, but **without the abrupt shattering that G.729 produced the moment a packet dropped.**

In 2009 Skype open-sourced SILK under reasonable terms. Around the same time Skype was being bought and sold — Microsoft acquired it for \$8.5 billion in 2011.

### Xiph's CELT (2010)

In the same period, **Jean-Marc Valin** (the man who wrote Speex) was building something new at Xiph — **CELT.**

CELT's goal was the opposite of SILK's: **music + ultra-low latency.** It could push latency down to 5 milliseconds — impossible in traditional codecs. But CELT was poor at low-bitrate speech.

**Each codec solved one half of the problem perfectly.**

### The IETF merges them

In 2010 the IETF (the internet's protocol standards body) formed a **CODEC Working Group**, aiming for a royalty-free, internet-native codec that could do speech + music + real-time communication all at once.

Two candidates: SILK and CELT.

The working group did something rare in the history of standards — **instead of making the two candidates fight, it had the two teams merge their codecs into one.**

- Low bitrate (\< 12 kbps, mostly speech): the SILK "throat instrument" path.
- High bitrate (\> 32 kbps, mostly music): the CELT "frequency rainbow" path.
- In between: dynamically blend the two.

The merged codec became **IETF RFC 6716** in September 2012 — named **Opus.**

Opus's capabilities read like the sum of all its ancestors: **6 kbps to 510 kbps, 8 kHz to 48 kHz, 5 ms to 60 ms latency, mono to 255 channels, fully royalty-free, fully open-source, mandatory in WebRTC.**

What followed was a one-sided story: **Opus won everywhere it could enter.**

- **WebRTC mandates Opus** → Zoom, Google Meet, Microsoft Teams, Discord, WhatsApp, Slack, Twitch, YouTube Live all default to Opus.
- **YouTube** switched its default audio-track codec to Opus.
- **Spotify, SoundCloud, Wikipedia** moved to Opus.
- **Telegram, Signal** carry voice messages with Opus.

🎭

**The irony, №5** — Opus is royalty-free — every second it spends doing AAC/MP3's job is a second Fraunhofer collects nothing. But the reason Opus could unify the battlefield is *exactly* that it's free — a paid codec was never going to hold the mandatory slot in an open protocol like WebRTC.

<img src="/assets/imported/audio-codecs-fifty-years-of-cutting-sound-into-numbers-figure-02.jpg" style="color:transparent;height:auto" loading="lazy" decoding="async" data-nimg="1" width="1000" height="1000" alt="Fifty years of audio codecs — voice, music, cinema, and lossless as four parallel tracks, from LPC (1971) to Opus (2012). Every red node marks a winner-takes-all turning point." />

Fifty years of audio codecs — voice, music, cinema, and lossless as four parallel tracks, from LPC (1971) to Opus (2012). Every red node marks a winner-takes-all turning point.

## Epilogue: Behind every second of your digital audio

The state of things in 2026 looks roughly like this:

- Every cellular call you make → AMR-WB / EVS (the VoLTE standard)
- Every Zoom / Teams / Discord → Opus
- Every Netflix episode → AAC (main track) + Dolby Atmos / DTS:X (surround)
- Every Spotify song → AAC
- Every Apple Music hi-res track → ALAC
- Every Tidal hi-res track → FLAC
- Every theatrical movie → Dolby Digital Plus / Atmos, or DTS-HD MA
- Every YouTube video → Opus (audio)
- Every Telegram / WhatsApp voice message → Opus

<img src="/assets/imported/audio-codecs-fifty-years-of-cutting-sound-into-numbers-figure-03.png" style="color:transparent;height:auto" loading="lazy" decoding="async" data-nimg="1" width="1000" height="1000" alt="The 2026 map — which codec runs behind every second of your digital audio: Opus for real-time, AAC for streaming, Dolby/DTS for cinema, ALAC + FLAC for lossless." />

The 2026 map — which codec runs behind every second of your digital audio: Opus for real-time, AAC for streaming, Dolby/DTS for cinema, ALAC + FLAC for lossless.

**Opus has, in fact, already won "real-time communication" and "streaming audio tracks."** MP3 and AAC still dominate the catalog that already exists. FLAC and ALAC coexist in the audiophile market. Dolby and DTS keep collecting their toll in cinemas and home theaters.

If there's one summary of these fifty years —

> **The codec that wins is never the one with the best technology.** It's the one with the cleanest license, the largest install base, and the hardest position to replace.

And just like Niedermayer in the FFmpeg story, the fifty years of audio codecs are full of people who **wrote the code knowing they'd never get rich from it** —

- **Brandenburg himself** got a relatively "poor" return on inventing MP3. Fraunhofer collected hundreds of millions in royalties — but he personally never held a share of an internet company, never had any commercial stake in the MP3 industry. He once said: "A patent doesn't belong to an individual — it's a contract an engineer signs with society." His personal net worth is publicly estimated in the single-digit millions — next to the industry he holds up, all but a rounding error.
- **Christopher Montgomery** (Monty) was paid for thirty years by Red Hat and Mozilla as "a donation to Xiph." Every member a volunteer. **Vorbis, Speex, FLAC, CELT, Opus — a handful of people wrote five codecs that rewrote the war, and not one of them was built to make money.**
- **Josh Coalson** started writing FLAC in 2000 and maintained it himself for thirteen years, handing it to Xiph only in 2012. Thirteen years, almost entirely in his spare time — no title, no equity, no exit.
- **Jean-Marc Valin** wrote Speex and CELT, and is a core author of Opus; he later went to Mozilla and Amazon. Opus is to Valin roughly what Linux is to Linus — something that touches the entire internet, while he lives on a salary.

When Atal and Schroeder planted the root of LPC at Bell Labs, they never earned Brandenburg's MP3 royalties. What Brandenburg earned from MP3 was less than what Dolby earned from AC-3. And while Dolby still collects in cinemas today, Opus has already replaced its territory in every second of internet calling — and **Opus charges nothing.**

This is the cleanest rule of the whole fifty-year story:

> **The outcome of a codec war was never decided by technology — but by how many devices agree to obey one protocol.** Any licensing fee is only ever the ceiling on that number.

*Published on* *<a href="/" class="notion-link link" data-server-link="true" data-link-uri="/">seanslab.org</a>* *· Invisible Infrastructure series · Part Three*
