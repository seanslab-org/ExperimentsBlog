import markdownIt from "markdown-it";

const dateFormatter = new Intl.DateTimeFormat("en", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ public: "/" });
  eleventyConfig.addWatchTarget("./src/styles/");

  eleventyConfig.setLibrary(
    "md",
    markdownIt({ html: true, linkify: true, typographer: true })
  );

  eleventyConfig.addFilter("dateDisplay", (value) =>
    dateFormatter.format(new Date(value))
  );
  eleventyConfig.addFilter("isoDate", (value) =>
    new Date(value).toISOString().slice(0, 10)
  );
  eleventyConfig.addFilter("readingTime", (content = "") => {
    const words = content
      .replace(/<[^>]*>/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 220));
  });
  eleventyConfig.addFilter("xmlEscape", (value = "") =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&apos;")
  );
  eleventyConfig.addFilter("absoluteUrl", (path = "", base = "") =>
    new URL(path, base).href
  );

  eleventyConfig.addCollection("posts", (collectionApi) =>
    collectionApi
      .getFilteredByGlob("./src/posts/*.md")
      .filter((post) => !post.data.draft)
      .sort((a, b) => b.date - a.date)
  );
  eleventyConfig.addCollection("featuredPosts", (collectionApi) =>
    collectionApi
      .getFilteredByGlob("./src/posts/*.md")
      .filter((post) => !post.data.draft && post.data.featured)
      .sort((a, b) => b.date - a.date)
  );

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "dist",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk"],
  };
}
