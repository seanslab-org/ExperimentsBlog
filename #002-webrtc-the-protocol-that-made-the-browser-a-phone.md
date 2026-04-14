# WebRTC: The Protocol That Made the Browser a Phone

*How Google spent $68 million, open-sourced a Swedish telecom engine, started a codec war, and accidentally built the infrastructure for the pandemic.*

---

In March 2020, the world locked down. Overnight, every school, every company, every hospital needed video calling. Zoom went from 10 million daily meeting participants to 300 million in three months (Zoom's own metric, which counts the same user multiple times across meetings — but even with that caveat, the trajectory was staggering). Google Meet hit 100 million. Microsoft Teams exploded by 894%.

Most people assumed this was a triumph of Silicon Valley product engineering. It wasn't. It was a triumph of a protocol — a protocol that had been quietly standardized over a decade of brutal fights at the IETF, a protocol born from a $68.2 million acquisition of a small Swedish company most people have never heard of, a protocol that lets your browser do something browsers were never designed to do: send real-time audio and video, peer-to-peer, with sub-second latency, encrypted end-to-end.

That protocol is **WebRTC**. And this is the story of how it came to be — the people, the politics, the engineering decisions that shaped it, and why it matters more than most developers realize.

---

## Chapter 1: The Swedish Engine Room (1999–2010)

The real story of WebRTC doesn't start at Google. It starts in Stockholm, in 1999, with a company called **Global IP Sound** — later renamed **Global IP Solutions**, or simply **GIPS**.

GIPS was founded by a group of signal processing researchers — **Roar Hagen**, **Bastiaan Kleijn**, **Espen Fjogstad**, and **Ivar T. Hognestad** — who had a clear-eyed understanding of a problem that would define the next two decades of telecommunications: voice quality over packet networks is a signal processing problem, not a networking problem.

In 1999, VoIP was terrible. Not because the internet was slow — it was, but that wasn't the real issue. The real issue was that packet networks are fundamentally hostile to real-time audio. Packets arrive out of order, they arrive late, they don't arrive at all. Clock drift between sender and receiver causes buffer underruns. Echo from speakers leaking back into microphones creates feedback loops. Background noise masks speech. And the human ear is extraordinarily sensitive to all of it — even 150 milliseconds of one-way delay makes conversation feel unnatural. Above 400 milliseconds, it becomes nearly unusable.

GIPS attacked each of these problems with custom signal processing. They built two codecs that became legendary in the VoIP world:

**iLBC** (Internet Low Bitrate Codec) — a narrowband speech codec designed for extreme packet loss resilience. Where most codecs fell apart at 5–10% packet loss, iLBC remained intelligible at 20–30%. The trick was that each frame was independently decodable — no inter-frame dependencies, so a lost packet couldn't corrupt subsequent audio. Published as RFC 3951 in 2004.

**iSAC** (Internet Speech Audio Codec) — a wideband adaptive codec that dynamically adjusted its bitrate and frame size based on network conditions. In an era when most codecs used fixed bitrates, iSAC continuously measured packet loss and delay and adapted in real time. If your network deteriorated, iSAC would gracefully degrade rather than shatter into digital noise.

But the codecs were only part of what made GIPS special. They also built what audio engineers call the **"media engine"** — the full stack of acoustic echo cancellation, noise suppression, automatic gain control, and jitter buffering that sits between the raw microphone input and the encoded bitstream. This is the work that separates a "hello, can you hear me?" experience from a "we need to restart the call" experience. It's deeply unglamorous signal processing — the kind of work where you're debugging filter coefficients at 3 AM because the echo canceller is ringing on a specific model of Dell laptop — and GIPS was the best in the world at it.

Their client list proved it: Yahoo!, AOL, WebEx (later Cisco), and — critically — **Google Talk**. Skype had its own engine (via SILK and later Opus), but GIPS powered much of the rest of the VoIP industry. Their audio processing stack was so good that companies paid substantial licensing fees rather than attempt to build their own — and the companies that tried to build their own usually ended up licensing GIPS anyway.

In **May 2010**, Google made the move. They offered **$68.2 million in cash** to acquire GIPS. The deal closed in January 2011.

For $68.2 million, Google got the codecs, the echo canceller, the noise suppressor, the jitter buffer, and the entire team of Swedish signal processing engineers who built them. In the context of what came next, it was the best $68.2 million Google ever spent.

---

## Chapter 2: The Open-Sourcing (2011)

Google didn't buy GIPS to make Google Talk better. They bought it to do something far more ambitious: **put real-time communications into every browser on Earth**.

The Chrome team had identified a critical gap in the web platform. By 2009, browsers could do nearly everything a native application could: complex graphics (Canvas, WebGL), offline storage (IndexedDB), background processing (Web Workers), bidirectional communication (WebSockets). But real-time audio and video? That still required plugins — Flash, Java, or proprietary browser extensions. And plugins were dying.

The vision was simple: what if the browser itself could capture audio and video from the microphone and camera, encode them using high-quality codecs, negotiate a peer-to-peer connection that punched through NATs and firewalls, encrypt the media stream, and deliver it with sub-200-millisecond latency — all from a JavaScript API?

That vision was WebRTC.

On **May 31, 2011**, **Harald Alvestrand** — a veteran Norwegian internet standards architect at Google and former chair of the IETF — posted a message to the W3C public-webrtc mailing list announcing the open-source release of the WebRTC source code. The code was published at webrtc.org. The GIPS codecs — iSAC, iLBC, and their echo cancellation and noise suppression stack — were open-sourced along with a new VP8 video codec integration and a complete ICE (Interactive Connectivity Establishment) implementation for NAT traversal.

Two working groups were simultaneously established: the **W3C WebRTC Working Group** (for the browser JavaScript API) and the **IETF RTCWeb Working Group** (for the underlying protocols). The dual-track approach was deliberate — Google knew that a browser API without protocol standardization would be useless, and protocol standardization without a browser API would be academic.

**Justin Uberti**, a Google engineer who had previously led video technology for AIM, Gmail video chat, and Google Hangouts, became the engineering lead. Uberti was the rare engineer who understood both the signal processing layer and the browser API design layer — he could argue about acoustic echo cancellation filter topologies and then turn around and design a JavaScript API that web developers could actually use.

The ambition was breathtaking. But so was the naivety. Google thought standardization would take two or three years. It took ten.

---

![The Codec War: VP8 vs H.264](webrtc-codec-war.svg)

## Chapter 3: The Codec War (2012–2014)

The first major battle was over the **Mandatory To Implement (MTI)** video codec — the codec that every WebRTC-compliant browser would be required to support. This sounds like a dry technical decision. It was, in fact, a proxy war between some of the largest companies on Earth.

**Google** wanted **VP8**, the video codec it had announced acquiring from On2 Technologies in 2009 and closed in 2010 (for $124.6 million — Google was on an acquisition spree) and open-sourced as part of the WebM project. VP8 was royalty-free, which aligned with Google's open-web philosophy and, not coincidentally, meant Google wouldn't have to pay licensing fees to its competitors.

**Apple**, **Microsoft**, **Cisco**, and much of the traditional telecom industry wanted **H.264**, the dominant video codec in the world. H.264 was everywhere — in every smartphone, every Blu-ray player, every video conferencing system, every hardware encoder chip. It had massive hardware acceleration support. But H.264 was licensed through **MPEG-LA**, a patent pool, and using it required paying royalties.

The IETF RTCWeb mailing list erupted into what can only be described as a multi-year flame war. The arguments were a mixture of legitimate technical concerns and naked corporate strategy:

**The VP8 camp argued:** VP8 is royalty-free. An open standard for the web should not require paying patent royalties. H.264's licensing costs, while manageable for large companies, would be a barrier for smaller developers and open-source projects. A royalty-encumbered mandatory codec would be antithetical to the open web.

**The H.264 camp argued:** VP8 is technically inferior to H.264 (debatable, but defensible at the time). H.264 has universal hardware support — every mobile phone, every set-top box has H.264 decode in silicon. VP8 hardware support is essentially nonexistent outside of Google's own devices. Mandating VP8 would force the entire hardware ecosystem to add support for a codec that only one company was pushing. And there were lingering questions about VP8's own patent exposure — MPEG-LA had publicly explored creating a VP8 patent pool.

The debate ran for over two years. It was not pretty. As one participant noted, most people in the room were too biased to make an objective decision, and those who weren't felt they didn't have enough information.

In **November 2014**, the IETF Working Group reached a Solomonic compromise: **both VP8 and H.264 would be Mandatory To Implement**. Every WebRTC implementation had to support both codecs. This was widely viewed as Google getting what it wanted (VP8 standardized) while the telecom industry also got what it wanted (H.264 mandated). Whether it was an elegant compromise or a cowardly dodge depends on whom you ask.

The practical result: browsers ended up supporting both, and the world moved on. Google later pushed VP9 and then AV1 (developed through the Alliance for Open Media, co-founded by Google, Mozilla, Cisco, Microsoft, Netflix, Amazon, and Intel in 2015), and the codec wars continued — but the WebRTC MTI fight was the most politically charged battle of them all.

---

## Chapter 4: The SDP Problem and the ORTC Rebellion

If the codec war was the most public fight, the **SDP debate** was the most technically consequential.

WebRTC inherited **SDP** (Session Description Protocol) from the telephony world. SDP is a text-based format, originally defined in 1998, that describes multimedia sessions — which codecs are available, which IP addresses and ports to use, which encryption parameters to negotiate. In WebRTC, two peers exchange SDP "offers" and "answers" to set up a call. This is the **offer/answer model**, and it comes directly from SIP (Session Initiation Protocol), the standard protocol for VoIP telephony.

The problem is that SDP was designed for a world of static, predetermined media sessions. WebRTC needed something far more dynamic. Want to add a screen share to an existing call? Renegotiate the entire SDP. Want to change video resolution? Renegotiate. Want to switch from sending to receiving? Renegotiate. Every change required a full offer/answer exchange, which meant round-trip delays and potential glare (both sides trying to renegotiate simultaneously).

SDP itself is also, to put it charitably, a format that only a telecom engineer could love. A typical WebRTC SDP blob is hundreds of lines of semicolon-delimited attributes spread across multiple "m-lines," each with its own set of parameters, extensions, and ICE candidates. Parsing and generating SDP is fragile, error-prone, and the source of a disproportionate number of WebRTC interoperability bugs.

In **2013**, a group of developers led by **Iñaki Baz Castillo** and backed by Microsoft proposed **ORTC** (Object Real-Time Communication) — a fundamentally different API that decomposed the WebRTC stack into discrete, independently controllable objects: `RTCIceGatherer`, `RTCIceTransport`, `RTCDtlsTransport`, `RTCRtpSender`, `RTCRtpReceiver`. No SDP. No offer/answer. Just objects you wire together programmatically.

The ORTC design was cleaner, more flexible, and more aligned with how web developers think about APIs. Its killer advantage: **no renegotiation**. Want to add a video track? Create a new `RTCRtpSender` and attach it to the existing transport. The ICE and DTLS layers don't care — they're already established. Just send the new RTP parameters out-of-band, and you're done.

Microsoft actually shipped ORTC in **Edge** (the pre-Chromium version). It worked. But it was a parallel standard with limited adoption, and when Microsoft moved Edge to Chromium in 2018, ORTC support was effectively abandoned.

The compromise that emerged in **WebRTC 1.0** was a hybrid: the SDP offer/answer model remained the primary API surface, but lower-level objects like `RTCRtpSender` and `RTCRtpReceiver` were added, giving developers some of the programmatic control that ORTC had promised. It wasn't elegant, but it shipped. The pragmatists won.

---

![Peer-to-Peer: How a browser became a phone](webrtc-browser-to-phone.svg)

## Chapter 5: The Architecture (For the Truly Curious)

WebRTC is not a single protocol. It's a **stack of protocols**, each solving a different problem, wired together in a specific way. Understanding the stack is understanding why WebRTC works as well as it does — and why it's as complex as it is.

### Layer 1: Connectivity — ICE, STUN, TURN

The fundamental problem WebRTC solves at the network layer is **NAT traversal**. Most devices on the internet sit behind NATs (Network Address Translators), which means they have private IP addresses that aren't directly routable from the public internet. Two peers behind different NATs can't simply open a socket to each other.

**ICE** (Interactive Connectivity Establishment, RFC 8445) is the framework that coordinates the process. It gathers "candidates" — potential address/port combinations — from three sources:

- **Host candidates**: the device's local IP addresses.
- **Server-reflexive candidates**: the device's public-facing IP address as seen by a STUN server.
- **Relay candidates**: an address on a TURN server that will relay traffic.

ICE then performs **connectivity checks** — it tries every possible pair of local and remote candidates, sending STUN binding requests to test reachability. The pairs are prioritized (host-to-host is preferred over relay), and the best working pair is selected.

**STUN** (Session Traversal Utilities for NAT, RFC 8489 — superseding the original RFC 5389) is a lightweight protocol for discovering your public address. A STUN server is like a mirror — you send it a packet, and it tells you what source IP and port the packet arrived from. This is how a device behind a NAT learns its server-reflexive candidate.

**TURN** (Traversal Using Relays around NAT, RFC 8656 — superseding RFC 5766) is the fallback. When direct connectivity is impossible — typically because one or both peers are behind symmetric NATs — traffic is relayed through a TURN server. This adds latency and costs money (someone has to run those servers), but it guarantees connectivity. In practice, about 15–20% of WebRTC sessions require TURN relay.

For anyone who's ever debugged connectivity issues on embedded systems or dealt with carrier-grade NATs on mobile networks, the elegance of ICE is worth appreciating. It systematically tries every possible path, starting with the cheapest and most direct, and falls back gracefully. It's the kind of protocol that looks overengineered until you realize every branch exists because some specific NAT topology broke the simpler approach.

### Layer 2: Security — DTLS and SRTP

All WebRTC media is encrypted. This is not optional — it's mandatory in the specification. The encryption architecture uses two protocols:

**DTLS** (Datagram Transport Layer Security, RFC 6347) — essentially TLS for UDP. It performs a handshake between peers to establish shared encryption keys and authenticate the connection using self-signed certificates. The certificate fingerprints are exchanged through the signaling channel (typically via SDP), so each peer can verify it's talking to the right party.

**SRTP** (Secure Real-time Transport Protocol, RFC 3711) — the protocol that actually encrypts the media packets. SRTP uses the keys negotiated by DTLS (this specific combination is called **DTLS-SRTP**, defined in RFC 5764).

The IETF mandated DTLS-SRTP and explicitly prohibited **SDES** (Session Description Protocol Security Descriptions), an older key exchange mechanism that embeds session keys directly in the SDP offer/answer. SDES was simpler and faster — no handshake required — but it exposed the media encryption keys to the signaling path, which in a browser context meant any JavaScript with access to the SDP could extract them. Worse, any intermediary that touched the signaling (your SRTP server, your OORT gateway, your corporate proxy) could silently decrypt all media. It was a security model that made cryptographers wince. The decision to ban SDES was controversial among telecom vendors who had infrastructure built around it, but it was the right call.

### Layer 3: Media — RTP, RTCP, and the Media Engine

The actual audio and video data flows over **RTP** (Real-time Transport Protocol, RFC 3550), with **RTCP** (RTP Control Protocol) running alongside it to provide feedback — packet loss statistics, round-trip time estimates, receiver reports. WebRTC uses RTCP for congestion control, letting the sender adjust its bitrate based on network conditions.

Underneath the protocol layer sits the **media engine** — the software that actually captures, processes, encodes, and decodes audio and video. This is where the GIPS acquisition pays off. The WebRTC media engine includes:

- **Acoustic Echo Cancellation (AEC)**: Removes the echo caused by speakers playing back into the microphone. This is a non-trivial adaptive filter problem — the echo path changes when someone moves their laptop, shifts in their chair, or places a coffee cup on the desk.
- **Noise Suppression (NS)**: Estimates the noise floor and subtracts it from the signal. The challenge is distinguishing noise from low-level speech — too aggressive and you clip words; too gentle and the noise bleeds through.
- **Automatic Gain Control (AGC)**: Normalizes audio levels so a person whispering and a person shouting come through at similar volumes.
- **Jitter Buffer**: Buffers incoming packets to smooth out arrival time variations. Too small and you get dropouts; too large and you add latency. The optimal size depends on network conditions that change continuously.

For those of us who've spent time tuning adaptive filters or debugging AGC compressor curves on DSP hardware, the WebRTC audio pipeline is remarkably well-engineered. The GIPS team solved these problems in software with quality that rivals dedicated DSP implementations. The echo canceller alone contains years of accumulated expertise — handling double-talk, non-linear echo paths, and the particular horrors of laptop speakers placed inches from built-in microphones.

### Layer 4: Data — SCTP over DTLS

WebRTC also supports **Data Channels** — arbitrary bidirectional data streams between peers. These run over **SCTP** (Stream Control Transmission Protocol) tunneled through DTLS. Data channels can be configured as reliable (retransmit lost packets) or unreliable (fire-and-forget, like UDP), ordered or unordered, and you can open multiple independent channels on a single peer connection.

This is what makes WebRTC more than a phone call. Data channels power file transfer, chat, game state synchronization, and any other real-time data exchange. They use the same ICE/DTLS connectivity that the media stack establishes, so there's no additional NAT traversal overhead.

---

## Chapter 6: The Ten-Year Standardization Marathon

WebRTC's standardization timeline is a case study in how internet standards actually get made — which is to say, slowly, painfully, and through exhaustion more than consensus.

**2011**: Google open-sources the code. W3C and IETF working groups formed. Optimism is high. "We'll have this done in two years."

**2012**: Chrome ships initial WebRTC support behind flags. Firefox follows. The codec war begins.

**2013**: OORT/ORTC proposed as an alternative API. The SDP debate intensifies. Interoperability between Chrome and Firefox is fragile at best.

**2014**: The codec MTI compromise (both VP8 and H.264). Chrome and Firefox can mostly talk to each other, but edge cases abound. Safari is conspicuously absent.

**2015–2016**: Slow, grinding progress on the specification. Hundreds of issues filed. SDP semantics argued line by line.

**2017**: **Apple ships WebRTC support in Safari 11.** This was the watershed moment. With Safari on board, WebRTC was available in every major browser. The three-browser problem (Chrome, Firefox, Safari) was solved. Apple's implementation was initially limited and buggy, but it existed — and that was enough.

**2018**: Microsoft moves Edge to Chromium, effectively killing ORTC and consolidating the browser landscape around a single WebRTC implementation (Google's).

**2021**: **WebRTC 1.0 becomes an official W3C Recommendation** — a full decade after the initial release. The IETF publishes RFC 8825–8835, formally defining the protocol stack. In internet standards time, ten years is not unusual. But for a technology that was already deployed in production by billions of users, the gap between reality and specification was remarkable.

---

## Chapter 7: The Pandemic Stress Test

WebRTC was designed for one-on-one calls between browsers. COVID-19 turned it into critical infrastructure for human civilization.

The protocol's design — peer-to-peer, low-latency, browser-native — made it the obvious foundation for the video conferencing explosion. But scaling from two-person calls to the demands of 2020 required creative engineering that went well beyond the original specification.

**Google Meet** used WebRTC on the client side but routed all media through Google's own Selective Forwarding Units (SFUs) — servers that receive media from each participant and selectively forward it to others. This avoids the N×N mesh topology problem (where each participant sends their stream to every other participant) and gives Google control over bandwidth allocation, quality adaptation, and recording.

**Discord** had been built on WebRTC from day one for its voice chat, originally designed for gamers who needed ultra-low-latency voice while playing. When the pandemic hit, Discord suddenly became a social platform for 140 million monthly active users, hosting everything from virtual classrooms to watch parties.

**Zoom** is the interesting exception. Zoom's core architecture is **not** WebRTC — it uses a proprietary media pipeline with its own codecs and network transport. But Zoom's web client (join from browser without downloading the app) does use WebRTC, and Zoom's engineers have acknowledged borrowing ideas from WebRTC's congestion control and connectivity establishment patterns.

**Jitsi**, the open-source video conferencing platform built by **Emil Ivov**, became the go-to self-hosted alternative for organizations that couldn't or wouldn't use commercial platforms. Jitsi is pure WebRTC, open source, and during the pandemic, it processed hundreds of millions of minutes of video conferencing per month.

The pandemic revealed both WebRTC's strengths and its limitations. The protocol was remarkably resilient — it handled the explosion in traffic without fundamental breakdowns. But the gap between "browser-to-browser peer-to-peer" and "50-person video call with screen sharing, recording, breakout rooms, and live transcription" required layers of infrastructure that WebRTC itself doesn't provide. The SFU pattern, simulcast (sending multiple quality levels), and scalable video coding — these are all engineering patterns built on top of WebRTC, not part of the core specification.

---

## Chapter 8: The People

WebRTC was shaped by an unusually diverse cast — telecom veterans, browser engineers, IETF old-timers, and startup founders:

**Harald Alvestrand** — The Norwegian standards veteran who co-chaired the W3C WebRTC Working Group. Alvestrand had previously served as **chair of the IETF itself** (2001–2005), which gave him the institutional credibility to shepherd a standard through two of the internet's most important standards bodies simultaneously. His patience was legendary — and necessary.

**Justin Uberti** — The engineering lead who bridged the gap between signal processing and web APIs. Uberti had done the early investigations into what a browser-based RTC API could look like, drawing on his experience building AIM video chat and Google Hangouts. He was the person who held the technical vision together when the standardization process threatened to fragment it.

**Serge Lachapelle** — Uberti's product management counterpart at Google, and co-founder of **Marratech**, a Swedish video conferencing company that Google acquired in 2007. Lachapelle came into Google through that acquisition, which meant he understood real-time communication from the product side — not just how to build a media engine, but why Google should spend $68 million to give one away.

**Philipp Hancke** — A German engineer who became one of the WebRTC community's most prolific contributors and debuggers. Hancke's blog posts and analyses of WebRTC internals — particularly his work dissecting SDP and OORT interoperability issues — became essential reading for anyone implementing WebRTC in production.

**Emil Ivov** — The founder of Jitsi, the most important open-source WebRTC project outside of Google's own implementation. Ivov proved that WebRTC could be the foundation for a full-featured video conferencing system without any proprietary components.

**Iñaki Baz Castillo** — The Spanish developer who co-authored the ORTC specification and argued passionately that SDP was the wrong foundation for WebRTC. History has partially vindicated him — the lower-level objects he advocated for (RTCRtpSender, RTCRtpReceiver) made it into WebRTC 1.0, even though the full ORTC vision didn't.

And behind all of them, the **GIPS engineers from Stockholm** — the signal processing experts whose acoustic echo canceller, noise suppressor, and adaptive jitter buffer sit at the bottom of every WebRTC call, making the raw physics of real-time audio actually work. Their names are mostly absent from the standards documents and blog posts. Their code is in every browser on Earth.

---

## Chapter 9: What WebRTC Actually Changed

Before WebRTC, building a real-time communication application required:

1. A native application (or a Flash/Java plugin).
2. Licensing a proprietary media engine.
3. Building or buying a NAT traversal solution.
4. Implementing encryption (or, more commonly, not implementing encryption).
5. Distributing your application through app stores or installers.

After WebRTC, you needed:

1. A web page.
2. About 50 lines of JavaScript.
3. A STUN server (Google provides free ones).

That gap — from "multimillion-dollar engineering project" to "weekend hackathon" — is the real measure of WebRTC's impact. It democratized real-time communication in the same way that HTML democratized publishing and WebSockets democratized bidirectional data.

Today, WebRTC is running in over **4 billion browsers** across Chrome, Firefox, Safari, and Edge. It powers Google Meet, Facebook Messenger, WhatsApp Web, Discord, Slack huddles, Amazon Chime, Twitch interactive broadcasts, telehealth platforms, remote-controlled robots, real-time game streaming, browser-based phone systems, and thousands of applications that would have been impossible — or at least prohibitively expensive — without it.

And unlike most protocols born at Google, WebRTC is genuinely an open standard, implemented independently by Mozilla, Apple, and Microsoft (via Chromium). The GIPS code that Google open-sourced in 2011 has been rewritten, extended, and optimized by thousands of contributors across organizations. It belongs to the web now.

---

## Epilogue: Still Ringing, Still Evolving

WebRTC became an official W3C Recommendation in January 2021 — ten years after that first announcement on the public-webrtc mailing list. It survived a codec war, a philosophical schism over SDP, the slow-motion death of ORTC, Apple's initial refusal to participate, and the sudden, brutal stress test of a global pandemic.

The next chapter is already being written. **WebTransport** is emerging as a complement to WebRTC for server-to-client real-time delivery. **Insertable Streams** now allow end-to-end encryption even through SFU servers. **WebCodecs** gives developers raw access to hardware encoders and decoders, bypassing WebRTC's managed media pipeline entirely. **AV1** is becoming the dominant video codec, and WebRTC implementations are adding hardware-accelerated AV1 support.

But the core achievement stands: a bunch of Swedish signal processing engineers built a media engine, Google bought it and gave it away, and a decade of contentious standardization turned it into infrastructure that a billion people used to survive a pandemic.

The next time you join a Google Meet call and the audio just works — no echo, no noise, no "can you hear me now?" — remember that there's a jitter buffer adapting in real time, an echo canceller tracking the impulse response of your room, and a noise suppressor estimating your environment's spectral floor. That's not magic. That's twenty-five years of Swedish DSP engineering, open-sourced to the world.

---

*Published on seanslab.org*
