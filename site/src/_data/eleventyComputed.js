export default {
  canonicalUrl: (data) =>
    data.canonicalUrl || new URL(data.page.url, data.site.url).href,
  socialImage: (data) =>
    new URL(data.cover || "/assets/share-card.svg", data.site.url).href,
};
