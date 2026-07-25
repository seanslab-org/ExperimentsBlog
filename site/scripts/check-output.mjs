import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("dist");
const required = [
  "index.html",
  "posts/index.html",
  "about/index.html",
  "404.html",
  "feed.xml",
  "sitemap.xml",
  "robots.txt",
  "_headers",
];
const failures = [];

for (const file of required) {
  try {
    await access(path.join(root, file));
  } catch {
    failures.push(`missing ${file}`);
  }
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(fullPath)));
    else files.push(fullPath);
  }
  return files;
}

for (const file of await walk(root)) {
  if (!file.endsWith(".html")) continue;
  if (path.basename(file).startsWith("google")) continue;
  const html = await readFile(file, "utf8");
  if (!html.includes("<title>")) failures.push(`no title: ${file}`);
  if (!html.includes('name="description"')) failures.push(`no description: ${file}`);
  if (!html.includes('rel="canonical"')) failures.push(`no canonical: ${file}`);
  if (/href="\/undefined|src="\/undefined/.test(html)) failures.push(`undefined URL: ${file}`);

  for (const match of html.matchAll(/(?:href|src)="(\/[^"?#]*)/g)) {
    const urlPath = decodeURIComponent(match[1]);
    if (urlPath === "/") continue;
    const relative = urlPath.replace(/^\//, "");
    const candidates = path.extname(relative)
      ? [path.join(root, relative)]
      : [path.join(root, relative), path.join(root, relative, "index.html")];
    let found = false;
    for (const candidate of candidates) {
      try {
        await access(candidate);
        found = true;
        break;
      } catch {}
    }
    if (!found) failures.push(`broken local URL ${match[1]} in ${file}`);
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Output check passed.");
