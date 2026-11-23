const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const readJson = (file) =>
  JSON.parse(fs.readFileSync(file, "utf8").replace(/^\uFEFF/, ""));
const source = readJson(path.join(root, "data", "pages.json")).value;
const media = readJson(path.join(root, "data", "media.json")).value;
const fallbackAssets = readJson(path.join(root, "data", "page-assets.json"));

function decode(value) {
  return value
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&amp;|&#038;/g, "&")
    .replace(/&quot;|&#34;/g, '"')
    .replace(/&#39;|&apos;|&#8217;/g, "'")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#8230;/g, "…")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .trim();
}

function text(value) {
  return decode(value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " "));
}

const assetByUrl = new Map();
for (const item of media) {
  const file = path.basename(item.source_url);
  const local = `/images/${item.id}-${file}`;
  const urls = [item.source_url];
  for (const size of Object.values(item.media_details?.sizes ?? {})) {
    if (size?.source_url) urls.push(size.source_url);
  }
  for (const url of urls) assetByUrl.set(url.replace(/^https:/, "https:"), local);
}

function resolveImage(src) {
  const normalized = src.startsWith("//") ? `https:${src}` : src;
  return assetByUrl.get(normalized) ?? fallbackAssets[normalized] ?? null;
}

function convert(page) {
  let html = page.content.rendered
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, "")
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, "");

  const sections = [];
  const allImages = [];
  let currentSection = { heading: "", paragraphs: [], items: [], images: [], subsections: [] };
  let currentSubsection = null;
  sections.push(currentSection);

  const blocks = /<(h[1-6]|p|li|img)\b([^>]*)>([\s\S]*?)<\/\1>|<img\b([^>]*)\/?>/gi;
  for (const match of html.matchAll(blocks)) {
    const tag = (match[1] ?? "img").toLowerCase();
    const attrs = match[2] ?? match[4] ?? "";
    if (tag === "img") {
      const src = attrs.match(/\bsrc=["']([^"']+)["']/i)?.[1];
      if (!src) continue;
      const image = {
        src: resolveImage(src),
        alt: decode(attrs.match(/\balt=["']([^"']*)["']/i)?.[1] ?? ""),
        source: src,
      };
      allImages.push(image);
      currentSection.images.push(image);
      continue;
    }

    const value = text(match[3] ?? "");
    if (!value || value.includes("${")) continue;
    if (/^h[12]$/.test(tag)) {
      currentSection = { heading: value, paragraphs: [], items: [], images: [], subsections: [] };
      currentSubsection = null;
      sections.push(currentSection);
    } else if (/^h[3-6]$/.test(tag)) {
      currentSubsection = { heading: value, paragraphs: [], items: [], images: [] };
      currentSection.subsections.push(currentSubsection);
    } else if (tag === "li") {
      (currentSubsection ?? currentSection).items.push(value);
    } else {
      (currentSubsection ?? currentSection).paragraphs.push(value);
    }
  }

  const links = [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)]
    .map((match) => ({
      label: text(match[2]),
      href: decode(match[1].match(/\bhref=["']([^"']+)["']/i)?.[1] ?? ""),
    }))
    .filter((link) => link.label && link.href && !link.href.startsWith("#"));

  const tabLabels = [...html.matchAll(/<[^>]*class=["'][^"']*elementor-tab-title[^"']*["'][^>]*>([\s\S]*?)<\/[^>]+>/gi)]
    .map((match) => text(match[1]))
    .filter((label, index, list) => Boolean(label) && list.indexOf(label) === index);
  const tabs = [];
  if (tabLabels.length) {
    let panelCopy = [];
    if (page.slug === "about-mot") {
      const coreValues = sections.flatMap((section) => section.subsections)
        .find((section) => section.heading === "Our Core Values");
      panelCopy = coreValues?.paragraphs.slice(1) ?? [];
      if (coreValues) coreValues.paragraphs = coreValues.paragraphs.slice(0, 1);
    } else {
      const why = sections.find((section) => section.heading.toLowerCase().startsWith("why choose"));
      panelCopy = why?.paragraphs ?? [];
      if (why) why.paragraphs = [];
    }
    tabs.push(...tabLabels.map((label, index) => ({ label, content: panelCopy[index] ?? "" })));
  }

  return {
    slug: page.slug,
    title: decode(page.title.rendered),
    publishedAt: page.date,
    description: text(page.excerpt.rendered.replace(/<[^>]*>/g, " ")),
    sections: sections.filter((section) =>
      section.heading || section.paragraphs.length || section.items.length || section.images.length || section.subsections.length,
    ),
    images: allImages,
    links,
    tabs,
  };
}

const output = source
  .filter((page) => page.slug !== "news-old")
  .map(convert);
fs.writeFileSync(
  path.join(root, "data", "structured-pages.json"),
  `${JSON.stringify(output, null, 2)}\n`,
  "utf8",
);
