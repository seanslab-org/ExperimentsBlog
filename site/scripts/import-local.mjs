import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = process.env.BLOG_SOURCE_DIR
  ? path.resolve(process.env.BLOG_SOURCE_DIR)
  : path.resolve(projectRoot, "..");
const outputRoot = path.join(projectRoot, "src", "posts");

const posts = [
  {
    source: path.join(sourceRoot, "#001-ffmpeg-the-code-that-runs-every-video-on-earth.md"),
    output: "ffmpeg-the-code-that-runs-every-video-on-earth.md",
    title: "FFmpeg: The Code That Runs Every Video on Earth",
    description: "The wild story of the people who built the invisible plumbing of the multimedia world.",
    date: "2026-04-12",
    permalink: "/posts/ffmpeg-the-code-that-runs-every-video-on-earth/index.html",
    series: "Invisible Infrastructure · 01",
    signal: "01",
    featured: true,
  },
  {
    source: path.join(sourceRoot, "#002-webrtc-the-protocol-that-made-the-browser-a-phone.md"),
    output: "webrtc-the-protocol-that-made-the-browser-a-phone.md",
    title: "WebRTC: The Protocol That Made the Browser a Phone",
    description: "How a $68 million acquisition, a codec war, and a decade of standards work made real-time video native to the web.",
    date: "2026-04-13",
    permalink: "/posts/webrtc-the-protocol-that-made-the-browser-a-phone/index.html",
    series: "Invisible Infrastructure · 02",
    signal: "02",
    featured: true,
  },
  {
    source: path.join(sourceRoot, "#003-bandwidth-the-universal-bottleneck.md"),
    output: "your-dna-is-slower-than-dial-up-and-thats-what-keeps-you-being-you.md",
    title: "Your DNA Is Slower Than Dial-Up, and That's What Keeps You Being You",
    description: "Bandwidth is not just an internet problem. It shapes language, memory, biology, and the distance a whale can sing.",
    date: "2026-04-19",
    permalink: "/posts/your-dna-is-slower-than-dial-up-and-thats-what-keeps-you-being-you/index.html",
    series: "Invisible Infrastructure · 03",
    signal: "03",
    featured: true,
  },
];

function quote(value) {
  return JSON.stringify(value);
}

function stripFirstHeading(markdown) {
  return markdown
    .replace(/^#\s+[^\n]+\n+/, "")
    .replace(/^\*\*Slug:\*\*[\s\S]*?^---\s*$/m, "")
    .replace(/^!\[[^\]]*\]\((webrtc-codec-war|webrtc-browser-to-phone)\.svg\)\s*$/gm, "")
    .trimStart();
}

await mkdir(outputRoot, { recursive: true });

for (const post of posts) {
  const source = await readFile(post.source, "utf8");
  const frontmatter = [
    "---",
    "layout: layouts/post.njk",
    `title: ${quote(post.title)}`,
    `description: ${quote(post.description)}`,
    `date: ${post.date}`,
    `permalink: ${post.permalink}`,
    `series: ${quote(post.series)}`,
    `signal: ${quote(post.signal)}`,
    `featured: ${post.featured}`,
    `languageLabel: English`,
    "---",
    "",
  ].join("\n");
  await writeFile(
    path.join(outputRoot, post.output),
    frontmatter + stripFirstHeading(source),
    "utf8"
  );
  console.log(`Imported ${path.basename(post.source)} -> ${post.output}`);
}
