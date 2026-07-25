import { mkdir, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = path.join(projectRoot, "src", "posts");
const imageRoot = path.join(projectRoot, "public", "assets", "imported");

const posts = [
  {
    path: "/posts/audio-codecs-fifty-years-of-cutting-sound-into-numbers",
    output: "audio-codecs-fifty-years-of-cutting-sound-into-numbers.md",
    title: "Audio Codecs: Fifty Years of Cutting Sound Into Numbers",
    description: "How a Bell Labs idea, one obsessive listening test, and a royalty-free upstart quietly ended a fifty-year codec war.",
    date: "2026-06-06",
    series: "Invisible Infrastructure · 04",
    signal: "04",
    cover: "/assets/covers/audio-codec-header.png",
    featured: true,
  },
  {
    path: "/software-engineering-from-bit-exact-to-llm-probability",
    output: "software-engineering-from-bit-exact-to-llm-probability.md",
    title: "Software Engineering: From Bit-Exact to LLM Probability",
    description: "What an engineer trained to make every output deterministic learns when software starts answering in distributions.",
    date: "2026-06-07",
    series: "Engineering practice",
    signal: "05",
    cover: "/assets/covers/bit-exact-header.png",
    featured: true,
  },
  {
    path: "/posts/docknote-your-private-meeting-intelligence",
    output: "docknote-your-private-meeting-intelligence.md",
    title: "Docknote: Your Private Meeting Intelligence",
    description: "A field note on building meeting intelligence that keeps raw audio and private context under the user's control.",
    date: "2026-06-09",
    series: "Build notes",
    signal: "06",
    cover: "/assets/covers/docknote-cover.png",
    featured: false,
  },
  {
    path: "/posts/i-vibe-coded-a-vibe-code-microphone-for-vibe-coding-on-spotify-car-thing",
    output: "i-vibe-coded-a-vibe-code-microphone-for-vibe-coding-on-spotify-car-thing.md",
    title: "I Vibe-Coded a Microphone for Vibe Coding on Spotify Car Thing",
    description: "A discontinued dashboard gadget, an open-source jailbreak, and an experiment in giving old hardware a new job.",
    date: "2026-04-07",
    series: "Build notes",
    signal: "07",
    featured: false,
  },
  {
    path: "/posts/vibe-coding-for-embedded-systems",
    output: "vibe-coding-for-embedded-systems.md",
    title: "Vibe Coding for Embedded Systems",
    description: "What changes when AI-assisted coding leaves the browser and meets registers, timing, memory limits, and real hardware.",
    date: "2026-02-24",
    series: "Engineering practice",
    signal: "08",
    featured: false,
  },
  {
    path: "/reading-notes-with-hidock-p1",
    output: "reading-notes-with-hidock-p1.md",
    series: "Notebook archive",
    signal: "A1",
    featured: false,
  },
  {
    path: "/coc-a-cup-of-culture",
    output: "coc-a-cup-of-culture.md",
    series: "Notebook archive",
    signal: "A2",
    featured: false,
  },
  {
    path: "/started-vibe-coding",
    output: "started-vibe-coding.md",
    series: "Notebook archive",
    signal: "A3",
    featured: false,
  },
  {
    path: "/shoe-dog-raw-whispers",
    output: "shoe-dog-raw-whispers.md",
    series: "Notebook archive",
    signal: "A4",
    featured: false,
  },
  {
    path: "/ppnotes",
    output: "ppnotes.md",
    series: "Notebook archive",
    signal: "A5",
    featured: false,
  },
  {
    path: "/tips-for-vibe-coding",
    output: "tips-for-vibe-coding.md",
    series: "Notebook archive",
    signal: "A6",
    featured: false,
  },
  {
    path: "/remarkable-paper-pro-move",
    output: "remarkable-paper-pro-move.md",
    series: "Notebook archive",
    signal: "A7",
    featured: false,
  },
];

function quote(value) {
  return JSON.stringify(value);
}

function decodeHtml(value = "") {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, number) => String.fromCodePoint(Number(number)))
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function pageMetadata(html, post) {
  const title =
    post.title || decodeHtml(html.match(/<title>([^<]+)<\/title>/i)?.[1] || post.output);
  const description =
    post.description ||
    decodeHtml(
      html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1] ||
        "A note from the seanslab archive."
    );
  const rawDate = html.match(/<span class="date">([^<]+)<\/span>/i)?.[1];
  const parsedDate = rawDate ? new Date(rawDate) : new Date("2026-01-01T00:00:00Z");
  const date = post.date || parsedDate.toISOString().slice(0, 10);
  return { title, description, date };
}

function getArticle(html, url) {
  const match = html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i);
  if (!match) throw new Error(`No article found at ${url}`);

  return match[1]
    .replace(
      /<div class="notion-page__properties">[\s\S]*?<div id="block-root-divider"[^>]*><\/div><\/div>/i,
      ""
    )
    .replace(/<ul[^>]*class="notion-table-of-contents"[^>]*>[\s\S]*?<\/ul>/gi, "")
    .replace(/\s+srcset="[^"]*"/gi, "")
    .replace(/\s+sizes="[^"]*"/gi, "");
}

function extensionFor(contentType, url) {
  if (contentType.includes("svg")) return ".svg";
  if (contentType.includes("png")) return ".png";
  if (contentType.includes("webp")) return ".webp";
  if (contentType.includes("gif")) return ".gif";
  if (contentType.includes("jpeg")) return ".jpg";
  const pathname = new URL(url).pathname;
  const ext = path.extname(pathname);
  return ext && ext.length <= 5 ? ext : ".jpg";
}

async function localizeImages(article, slug) {
  const matches = [...article.matchAll(/<img\b[^>]*\bsrc="([^"]+)"[^>]*>/gi)];
  const replacements = new Map();
  let index = 0;

  for (const match of matches) {
    const url = match[1].replaceAll("&amp;", "&");
    if (url.startsWith("data:") || replacements.has(url)) continue;
    index += 1;
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(20_000) });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const ext = extensionFor(response.headers.get("content-type") || "", url);
      const filename = `${slug}-figure-${String(index).padStart(2, "0")}${ext}`;
      await writeFile(path.join(imageRoot, filename), Buffer.from(await response.arrayBuffer()));
      replacements.set(url, `/assets/imported/${filename}`);
    } catch (error) {
      console.warn(`Skipping unavailable image for ${slug}: ${error.message}`);
      article = article.replace(match[0], "");
    }
  }

  for (const [remote, local] of replacements) {
    article = article.replaceAll(remote.replaceAll("&", "&amp;"), local).replaceAll(remote, local);
  }
  return article;
}

function htmlToMarkdown(article, url) {
  const result = spawnSync(
    "pandoc",
    ["--from=html", "--to=gfm", "--wrap=none", "--strip-comments"],
    { input: article, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 }
  );
  if (result.status !== 0) {
    throw new Error(`Pandoc failed for ${url}: ${result.stderr}`);
  }
  return result.stdout
    .replace(/^#\s+[^\n]+\n+/, "")
    .replace(/<span\b[^>]*>/gi, "")
    .replace(/<\/span>/gi, "")
    .replace(/<a\b[^>]*><\/a>/gi, "")
    .replace(/<\/?div\b[^>]*>/gi, "")
    .replace(/^!\[\]\(data:image[^\n]+$/gm, "")
    .replace(/<img\b[^>]*src="data:image[^>]*>/gi, "")
    .replace(/^Copy\s*$/gim, "")
    .replace(/\n### More posts like this[\s\S]*$/i, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

await mkdir(outputRoot, { recursive: true });
await mkdir(imageRoot, { recursive: true });

for (const post of posts) {
  const url = new URL(post.path, "https://seanslab.org").href;
  const response = await fetch(url, {
    headers: { "user-agent": "seanslab migration/1.0" },
    signal: AbortSignal.timeout(30_000),
  });
  if (!response.ok) throw new Error(`Page download failed (${response.status}): ${url}`);
  const html = await response.text();
  const metadata = pageMetadata(html, post);
  let article = getArticle(html, url);
  article = await localizeImages(article, path.basename(post.output, ".md"));
  const markdown = htmlToMarkdown(article, url);
  const frontmatter = [
    "---",
    "layout: layouts/post.njk",
    `title: ${quote(metadata.title)}`,
    `description: ${quote(metadata.description)}`,
    `date: ${metadata.date}`,
    `permalink: ${post.path}/index.html`,
    `series: ${quote(post.series)}`,
    `signal: ${quote(post.signal)}`,
    ...(post.cover ? [`cover: ${quote(post.cover)}`] : []),
    `featured: ${post.featured}`,
    "languageLabel: English",
    "---",
    "",
  ].join("\n");
  await writeFile(path.join(outputRoot, post.output), frontmatter + markdown + "\n", "utf8");
  console.log(`Imported ${url} -> ${post.output}`);
}
