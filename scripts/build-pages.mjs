import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const pages = [
  {
    source: "content/adc-linker-report.md",
    output: "adc-linker-report.html",
    title: "ADC linker 领域顶尖团队/公司研究方向与科研关系报告",
    eyebrow: "ADC linker｜连接子与释放｜科研关系报告",
    subtitle: "围绕 linker-payload、释放机制、site-specific conjugation、DAR/均一性和 PK/毒性关系，梳理顶尖团队、公司平台与证据质量。",
    briefTitle: "报告核心",
    brief: "区分已确认事实、合理推测、个人判断和暂时无法验证的信息，避免把公司名气、临床管线或综述材料直接等同于 linker 权威。",
    metrics: [
      ["18", "团队/公司详解条目"],
      ["A+", "获批 ADC linker-payload 源头团队最高等级"],
      ["4 类", "论文、监管、临床、公司资料证据"],
      ["2026-07-26", "核查生成日期"]
    ],
    formulas: [
      ["来源质量", "同行评议论文、监管标签、临床数据库、公司官方资料分层使用"],
      ["影响力", "看引用、后续验证、临床转化、平台扩散和产业应用"],
      ["相关性", "只把与 linker 设计、释放或偶联直接相关的证据放高权重"]
    ],
    footer: "Generated from content/adc-linker-report.md for GitHub Pages."
  },
  {
    source: "content/dual-payload-linker-report.md",
    output: "dual-payload-linker-report.html",
    title: "双 payload ADC linker 顶尖团队/公司研究方向与科研关系报告",
    eyebrow: "Dual-payload ADC｜branched linker｜payload ratio control",
    subtitle: "聚焦一个 ADC 如何通过连接子、偶联位点和释放结构同时携带两个 payload，并控制位置、比例、释放、稳定性和可分析性。",
    briefTitle: "专题核心",
    brief: "本页不把普通 ADC 临床团队直接纳入核心权威，而是优先筛选 dual-payload linker、dual-site conjugation、branched linker 和 payload-ratio control 的直接证据。",
    metrics: [
      ["12", "核心/候选团队公司"],
      ["A/B+", "按论文质量和直接相关性分级"],
      ["dual", "两个 payload 的连接、比例与释放控制"],
      ["linker", "报告主题边界"]
    ],
    formulas: [
      ["接到哪里", "偶联位点、糖基位点、Cys/Sec、MTGase 或 lysine site-selective"],
      ["怎么释放", "cleavable linker、self-immolation、错峰释放或正交释放"],
      ["如何验证", "DAR/DDR、payload ratio、稳定性、体内药效和外部引用"]
    ],
    footer: "Generated from content/dual-payload-linker-report.md for GitHub Pages."
  }
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function slugify(text, used) {
  const base = text
    .trim()
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[`*_~\[\]()]/g, "")
    .replace(/&[a-z]+;/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "") || "section";
  let slug = base;
  let index = 2;
  while (used.has(slug)) {
    slug = `${base}-${index}`;
    index += 1;
  }
  used.add(slug);
  return slug;
}

function inlineMarkdown(text) {
  let html = escapeHtml(text);
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\[((?:[^\[\]]|\[[^\]]*\])*)\]\(([^)\s]+)(?:\s+&quot;[^&]+&quot;)?\)/g, (_match, label, href) => {
    const safeHref = href.replace(/&amp;/g, "&");
    const external = /^https?:\/\//i.test(safeHref) ? ' target="_blank" rel="noopener"' : "";
    return `<a href="${escapeHtml(safeHref)}"${external}>${label}</a>`;
  });
  return html;
}

function isTableSeparator(line) {
  return /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);
}

function isTableStart(lines, index) {
  return lines[index]?.includes("|") && isTableSeparator(lines[index + 1] || "");
}

function parseTable(lines, start) {
  const rows = [];
  let i = start;
  while (i < lines.length && lines[i].includes("|") && lines[i].trim()) {
    if (!isTableSeparator(lines[i])) {
      const cells = lines[i]
        .trim()
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((cell) => inlineMarkdown(cell.trim()));
      rows.push(cells);
    }
    i += 1;
  }
  const [head, ...body] = rows;
  const thead = `<thead><tr>${head.map((cell) => `<th>${cell}</th>`).join("")}</tr></thead>`;
  const tbody = `<tbody>${body.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("\n")}</tbody>`;
  return { html: `<div class="table-wrap"><table>${thead}${tbody}</table></div>`, next: i };
}

function parseList(lines, start, ordered) {
  const tag = ordered ? "ol" : "ul";
  const itemRe = ordered ? /^\s*\d+\.\s+(.+)$/ : /^\s*[-*]\s+(.+)$/;
  const items = [];
  let i = start;
  while (i < lines.length) {
    const match = lines[i].match(itemRe);
    if (!match) break;
    items.push(`<li>${inlineMarkdown(match[1])}</li>`);
    i += 1;
  }
  return { html: `<${tag}>${items.join("\n")}</${tag}>`, next: i };
}

function markdownToHtml(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const used = new Set();
  const toc = [];
  const out = [];
  let paragraph = [];
  let i = 0;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    out.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
    paragraph = [];
  };

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      i += 1;
      continue;
    }

    if (/^```/.test(trimmed)) {
      flushParagraph();
      i += 1;
      const code = [];
      while (i < lines.length && !/^```/.test(lines[i].trim())) {
        code.push(lines[i]);
        i += 1;
      }
      if (i < lines.length) i += 1;
      out.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`);
      continue;
    }

    const heading = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      const level = heading[1].length;
      const text = heading[2].replace(/\s+#+$/, "");
      const id = slugify(text, used);
      if (level <= 3) toc.push({ level, text, id });
      out.push(`<h${level} id="${id}">${inlineMarkdown(text)}</h${level}>`);
      i += 1;
      continue;
    }

    if (/^---+$/.test(trimmed)) {
      flushParagraph();
      out.push("<hr />");
      i += 1;
      continue;
    }

    if (isTableStart(lines, i)) {
      flushParagraph();
      const table = parseTable(lines, i);
      out.push(table.html);
      i = table.next;
      continue;
    }

    if (/^\s*>\s+/.test(line)) {
      flushParagraph();
      const quote = [];
      while (i < lines.length && /^\s*>\s?/.test(lines[i])) {
        quote.push(lines[i].replace(/^\s*>\s?/, ""));
        i += 1;
      }
      out.push(`<blockquote>${inlineMarkdown(quote.join(" "))}</blockquote>`);
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      flushParagraph();
      const list = parseList(lines, i, false);
      out.push(list.html);
      i = list.next;
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      flushParagraph();
      const list = parseList(lines, i, true);
      out.push(list.html);
      i = list.next;
      continue;
    }

    paragraph.push(trimmed);
    i += 1;
  }

  flushParagraph();
  return { html: out.join("\n"), toc };
}

function renderToc(toc) {
  const links = toc
    .filter((item) => item.level >= 2)
    .map((item) => `<a class="toc-level-${item.level}" href="#${item.id}">${escapeHtml(item.text)}</a>`)
    .join("\n");
  return `<aside><strong>目录</strong>${links}</aside>`;
}

function renderPage(config) {
  const source = fs.readFileSync(path.join(root, config.source), "utf8");
  const { html, toc } = markdownToHtml(source);
  const metrics = config.metrics
    .map(([value, label]) => `<div class="metric"><strong>${escapeHtml(value)}</strong><span>${escapeHtml(label)}</span></div>`)
    .join("\n");
  const formulas = config.formulas
    .map(([title, body]) => `<div class="formula-card"><h3>${escapeHtml(title)}</h3><p>${escapeHtml(body)}</p></div>`)
    .join("\n");
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(config.title)}</title>
  <meta name="description" content="${escapeHtml(config.subtitle)}" />
  <link rel="stylesheet" href="./assets/site.css" />
</head>
<body id="top">
  <nav><div class="wrap"><a class="brand" href="./index.html"><span class="logo"></span><span>ADC linker 报告库</span></a><div class="navlinks"><a href="./index.html">首页</a><a href="./adc-linker-report.html">ADC linker</a><a href="./dual-payload-linker-report.html">双 payload linker</a><a href="#${toc.find((item) => item.level === 2)?.id || "top"}">正文</a></div></div></nav>
  <header class="wrap">
    <span class="eyebrow">${escapeHtml(config.eyebrow)}</span>
    <h1>${escapeHtml(config.title)}</h1>
    <p class="subtitle">${escapeHtml(config.subtitle)}</p>
    <div class="hero-grid">
      <div class="brief"><h2>${escapeHtml(config.briefTitle)}</h2><p>${escapeHtml(config.brief)}</p></div>
      <div class="metrics">${metrics}</div>
    </div>
    <div class="formula-strip">${formulas}</div>
  </header>
  <main class="wrap layout">
    ${renderToc(toc)}
    <article>
      ${html}
      <a class="top-link" href="#top">返回顶部</a>
    </article>
  </main>
  <footer class="wrap">${escapeHtml(config.footer)}</footer>
</body>
</html>
`;
}

function renderIndex() {
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>ADC linker 报告库</title>
  <meta name="description" content="ADC linker 与双 payload ADC linker 顶尖团队/公司研究方向报告入口。" />
  <link rel="stylesheet" href="./assets/site.css" />
</head>
<body class="home">
  <main>
    <h1>ADC linker 报告库</h1>
    <p>请选择要查看的报告。页面按 GitHub Pages 静态网页生成，保留原始 Markdown 内容，并提供更适合分享和阅读的目录、表格和正文排版。</p>
    <div class="home-grid">
      <a class="home-card" href="./adc-linker-report.html"><strong>ADC linker 领域顶尖团队/公司报告</strong><span>连接子、释放机制、linker-payload、site-specific conjugation、DAR/均一性与证据质量。</span><small>查看报告</small></a>
      <a class="home-card" href="./dual-payload-linker-report.html"><strong>双 payload ADC linker 专题报告</strong><span>branched linker、dual-site conjugation、payload ratio control、错峰释放与团队权威分级。</span><small>查看专题</small></a>
    </div>
  </main>
</body>
</html>
`;
}

for (const page of pages) {
  fs.writeFileSync(path.join(root, page.output), renderPage(page), "utf8");
}

fs.writeFileSync(path.join(root, "index.html"), renderIndex(), "utf8");
fs.writeFileSync(path.join(root, ".nojekyll"), "", "utf8");

console.log(`Generated ${pages.length + 1} HTML files.`);
