import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const researchDate = "2026-07-26";

const documents = [
  {
    key: "A",
    source: "content/01-dual-payload-adc-teams.md",
    output: "detail-01-dual-payload-adc-teams.html",
    title: "双 payload ADC 顶尖团队/公司研究方向与科研关系报告",
    shortTitle: "双 payload ADC 团队图谱",
    category: "初始领域团队调研",
    tag: "资料 A",
    lead: "梳理双 payload ADC 领域核心团队、公司平台、研究方向、代表论文和证据限制。",
    purpose: "用于建立双 payload ADC 领域的团队和公司主索引，回答谁在做、做什么、证据强度如何。",
    outcomes: ["团队/公司总览", "团队详解", "代表论文质量判断", "同方向权威性对比"],
    useCases: ["立项前快速定位权威团队", "筛选可跟踪论文和公司", "对比 dual-payload ADC 方向强弱证据"]
  },
  {
    key: "B",
    source: "content/02-adc-linker-teams.md",
    output: "detail-02-adc-linker-teams.html",
    title: "ADC linker 顶尖团队/公司研究方向与科研关系报告",
    shortTitle: "ADC linker 团队图谱",
    category: "初始领域团队调研",
    tag: "资料 B",
    lead: "围绕 linker-payload、释放机制、site-specific conjugation、DAR/均一性和 PK/毒性关系整理权威团队。",
    purpose: "用于区分 ADC 公司强、payload 强和 linker 研究强之间的差异，避免把临床管线直接等同于 linker 权威。",
    outcomes: ["linker 公司/团队总览", "获批 ADC linker-payload 源头", "方法学平台团队", "论文质量与可验证路径"],
    useCases: ["比较 linker 平台技术路线", "查找可验证论文和监管资料", "建立 ADC linker 背景证据包"]
  },
  {
    key: "C",
    source: "content/03-dual-payload-adc-linker-teams.md",
    output: "detail-03-dual-payload-adc-linker-teams.html",
    title: "双 payload ADC linker 顶尖团队/公司研究方向与科研关系报告",
    shortTitle: "双 payload linker 图谱",
    category: "初始领域团队调研",
    tag: "资料 C",
    lead: "聚焦同一 ADC 如何通过 linker、偶联位点和释放结构携带两个 payload，并控制比例、释放、稳定性和分析复杂度。",
    purpose: "用于从 linker 角度重新筛选 dual-payload ADC 权威团队，剔除只有靶点、payload 或临床背景而缺少 linker 直接证据的对象。",
    outcomes: ["dual-payload linker 权威等级", "团队/公司总览", "linker 细分路线", "评级矩阵"],
    useCases: ["设计双 payload linker 调研框架", "判断团队是否真有 linker 原创证据", "筛选 branched linker / dual-site conjugation 路线"]
  },
  {
    key: "D",
    source: "content/04-dual-payload-adc-team-details.md",
    output: "detail-04-dual-payload-adc-team-details.html",
    title: "双 payload ADC 部分团队/公司详细情况报告",
    shortTitle: "重点团队详细档案",
    category: "01 补充详情",
    tag: "资料 D",
    lead: "对 01 中部分重点团队/公司展开更详细的组织、成果、成员、合作网络和代表论文说明。",
    purpose: "作为 01 的补充档案，适合在确定重点团队后继续查看团队背景、合作网络和 CNS/非 CNS 证据。",
    outcomes: ["团队基本情况", "研究成果", "存在问题", "核心成员与合作网络"],
    useCases: ["深挖重点团队", "补充公司/机构背景", "准备导师汇报或团队对比材料"]
  },
  {
    key: "E",
    source: "content/dual-payload-adc-cns-papers.md",
    output: "detail-cns-paper-list.html",
    title: "双 payload ADC CNS 系列及子刊全口径论文清单",
    shortTitle: "CNS 全口径论文清单",
    category: "论文证据库",
    tag: "资料 E",
    lead: "按 CNS 系列及子刊/期刊族口径整理 dual-payload ADC 相关论文，用于校准来源质量和高影响证据。",
    purpose: "用于补充 01-03 的论文质量判断，区分原始研究、综述、新闻/行业动态和间接背景材料。",
    outcomes: ["CNS/子刊论文清单", "JIF 与机构信息", "研究方向标注", "排除项说明"],
    useCases: ["论文质量核查", "查找高影响综述和原始研究", "判断团队权威等级是否需要上调或降级"]
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
  let index = start;
  while (index < lines.length && lines[index].includes("|") && lines[index].trim()) {
    if (!isTableSeparator(lines[index])) {
      rows.push(
        lines[index]
          .trim()
          .replace(/^\|/, "")
          .replace(/\|$/, "")
          .split("|")
          .map((cell) => inlineMarkdown(cell.trim()))
      );
    }
    index += 1;
  }
  const [head, ...body] = rows;
  const thead = `<thead><tr>${head.map((cell) => `<th>${cell}</th>`).join("")}</tr></thead>`;
  const tbody = `<tbody>${body.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("\n")}</tbody>`;
  return { html: `<div class="table-wrap"><table>${thead}${tbody}</table></div>`, next: index };
}

function parseList(lines, start, ordered) {
  const tag = ordered ? "ol" : "ul";
  const itemRe = ordered ? /^\s*\d+\.\s+(.+)$/ : /^\s*[-*]\s+(.+)$/;
  const items = [];
  let index = start;
  while (index < lines.length) {
    const match = lines[index].match(itemRe);
    if (!match) break;
    items.push(`<li>${inlineMarkdown(match[1])}</li>`);
    index += 1;
  }
  return { html: `<${tag}>${items.join("\n")}</${tag}>`, next: index };
}

function markdownToHtml(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const used = new Set();
  const toc = [];
  const out = [];
  let paragraph = [];
  let sectionOpen = false;
  let index = 0;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    out.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
    paragraph = [];
  };

  const closeSection = () => {
    flushParagraph();
    if (sectionOpen) out.push("</section>");
    sectionOpen = false;
  };

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      index += 1;
      continue;
    }

    if (/^```/.test(trimmed)) {
      flushParagraph();
      index += 1;
      const code = [];
      while (index < lines.length && !/^```/.test(lines[index].trim())) {
        code.push(lines[index]);
        index += 1;
      }
      if (index < lines.length) index += 1;
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
      if (level === 1) {
        out.push(`<h${level} id="${id}">${inlineMarkdown(text)}</h${level}>`);
      } else if (level === 2) {
        closeSection();
        out.push(`<section class="markdown-section" id="${id}"><h2>${inlineMarkdown(text)}</h2>`);
        sectionOpen = true;
      } else {
        out.push(`<h${level} id="${id}">${inlineMarkdown(text)}</h${level}>`);
      }
      index += 1;
      continue;
    }

    if (/^---+$/.test(trimmed)) {
      flushParagraph();
      out.push("<hr />");
      index += 1;
      continue;
    }

    if (isTableStart(lines, index)) {
      flushParagraph();
      const table = parseTable(lines, index);
      out.push(table.html);
      index = table.next;
      continue;
    }

    if (/^\s*>\s+/.test(line)) {
      flushParagraph();
      const quote = [];
      while (index < lines.length && /^\s*>\s?/.test(lines[index])) {
        quote.push(lines[index].replace(/^\s*>\s?/, ""));
        index += 1;
      }
      out.push(`<blockquote>${inlineMarkdown(quote.join(" "))}</blockquote>`);
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      flushParagraph();
      const list = parseList(lines, index, false);
      out.push(list.html);
      index = list.next;
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      flushParagraph();
      const list = parseList(lines, index, true);
      out.push(list.html);
      index = list.next;
      continue;
    }

    paragraph.push(trimmed);
    index += 1;
  }

  closeSection();
  return { html: out.join("\n"), toc };
}

function renderCardList(items) {
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function renderRelated(current) {
  return documents
    .map((doc) => `<a class="mini-link${doc.output === current.output ? " active" : ""}" href="./${doc.output}">${doc.tag}. ${escapeHtml(doc.shortTitle)}</a>`)
    .join("");
}

function renderToc(toc) {
  const links = toc
    .filter((item) => item.level >= 2)
    .slice(0, 40)
    .map((item) => `<a class="toc-level-${item.level}" href="#${item.id}">${escapeHtml(item.text)}</a>`)
    .join("\n");
  return `<aside class="mini-toc"><strong>正文目录</strong>${links}</aside>`;
}

function renderDetail(doc, index) {
  const source = fs.readFileSync(path.join(root, doc.source), "utf8");
  const { html, toc } = markdownToHtml(source);
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(doc.title)}｜ADC 调研资料库平台</title>
  <meta name="description" content="${escapeHtml(doc.lead)}" />
  <link rel="stylesheet" href="./assets/site.css" />
</head>
<body>
  <main class="page">
    <div class="topbar">
      <div style="display:flex; gap:14px; flex-wrap:wrap;"><a href="./index.html">← 返回资料库平台</a><a href="https://github.com/HJH0331/ADC-" target="_blank" rel="noopener">GitHub 仓库 →</a></div>
      <span>详细资料 ${index + 1} / ${documents.length}</span>
    </div>
    <div class="quick">
      <a href="#position">资料定位</a>
      <a href="#outputs">核心产出</a>
      <a href="#content">报告正文</a>
      <a href="#boundary">使用边界</a>
      <a href="#related">相关资料</a>
    </div>
    <section class="hero">
      <span class="eyebrow">${escapeHtml(doc.category)}｜${escapeHtml(doc.tag)}</span>
      <h1>${escapeHtml(doc.title)}</h1>
      <p class="lead">${escapeHtml(doc.lead)}</p>
      <div class="tag-row">
        <span class="meta-pill">标准调研日期：${researchDate}</span>
        <span class="meta-pill">${escapeHtml(doc.category)}</span>
        <span class="meta-pill">Markdown 原文：${escapeHtml(doc.source)}</span>
      </div>
      <div class="note" style="margin-top:18px;">本页用于资料库分享和阅读。原始 Markdown 已保留在仓库 content 目录，网页内容由脚本生成。</div>
    </section>
    <section class="section" id="position">
      <h2>一、这份资料用于解决什么问题</h2>
      <div class="grid-2">
        <div class="card"><h3>资料定位</h3><p>${escapeHtml(doc.purpose)}</p></div>
        <div class="card"><h3>适合使用场景</h3>${renderCardList(doc.useCases)}</div>
      </div>
    </section>
    <section class="section" id="outputs">
      <h2>二、核心产出</h2>
      <div class="grid-2">
        ${doc.outcomes.map((item) => `<div class="card"><h3>${escapeHtml(item)}</h3><p>对应内容已在正文中展开，可用于团队筛选、证据审查、方向对比或文献质量核查。</p></div>`).join("\n")}
      </div>
    </section>
    <section class="section" id="content">
      <h2>三、报告正文</h2>
      <div class="detail-grid">
        <div>${html}</div>
        ${renderToc(toc)}
      </div>
    </section>
    <section class="section" id="boundary">
      <h2>四、使用边界</h2>
      <div class="quote">资料库用于调研、汇报和决策支持，不替代专利自由实施分析、临床医学判断、监管判断或企业内部未公开数据。</div>
      <ul>
        <li>团队权威等级是基于公开证据的工作性分级，不是正式排名。</li>
        <li>公司官网、新闻稿和会议摘要只能证明公开主张或管线存在，不能单独证明疗效或平台优越性。</li>
        <li>涉及最新管线、并购、临床试验状态时，需要按日期复核官方来源。</li>
      </ul>
    </section>
    <section class="section" id="related">
      <h2>五、相关资料导航</h2>
      <div class="related">${renderRelated(doc)}</div>
    </section>
  </main>
</body>
</html>
`;
}

function renderIndex() {
  const tasks = documents.map((doc) => `<article class="task">
  <span class="tag">${doc.tag}</span>
  <h3>${escapeHtml(doc.shortTitle)}</h3>
  <p>${escapeHtml(doc.lead)}</p>
  <div class="pillrow"><span class="meta-pill">${escapeHtml(doc.category)}</span><span class="meta-pill">调研日期 ${researchDate}</span></div>
  <p style="margin-top:14px;"><a class="btn" href="./${doc.output}">查看详情</a></p>
</article>`).join("\n");

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>ADC 调研资料库平台</title>
  <meta name="description" content="ADC、ADC linker、双 payload ADC linker 和 CNS 论文证据资料库。" />
  <link rel="stylesheet" href="./assets/site.css" />
</head>
<body>
  <nav>
    <div class="wrap">
      <a class="brand" href="./index.html"><span class="logo"></span><span>ADC 调研资料库平台</span></a>
      <div class="navlinks"><a href="#position">定位</a><a href="#library">资料分类</a><a href="#workflow">使用流程</a><a href="https://github.com/HJH0331/ADC-" target="_blank" rel="noopener">GitHub 仓库</a></div>
    </div>
  </nav>
  <header class="wrap">
    <span class="eyebrow">ADC research library｜标准调研日期：${researchDate}</span>
    <h1>ADC 调研资料库平台</h1>
    <p class="lead">把双 payload ADC、ADC linker、双 payload linker、重点团队详情和 CNS 论文证据整理成可分享、可核验、可持续更新的 GitHub Pages 资料库。</p>
    <div class="hero-grid">
      <div class="card">
        <h3>平台目标</h3>
        <ul>
          <li>按领域分类沉淀团队、公司、论文和证据质量。</li>
          <li>区分初始调研、团队详情和高质量论文证据库。</li>
          <li>让每个详情页都能单独发给导师、同事或合作方阅读。</li>
        </ul>
      </div>
      <div class="card">
        <h3>当前资料范围</h3>
        <ul>
          <li>3 份初始领域团队调研</li>
          <li>1 份重点团队详细档案</li>
          <li>1 份 CNS 全口径论文清单</li>
          <li>每页统一标注标准调研日期</li>
        </ul>
      </div>
    </div>
  </header>
  <main>
    <section id="position" class="wrap">
      <h2>平台定位</h2>
      <div class="quote">这个平台不是简单展示 Markdown，而是把调研资料按“领域图谱、团队详情、论文证据”组织成可阅读、可追溯、可继续扩展的资料库。</div>
    </section>
    <section id="library" class="wrap">
      <h2>资料分类详情页</h2>
      <p class="sub">点击每张卡片进入对应详情页。01-03 是初始领域团队调研，04 是 01 中部分团队的详细档案，CNS 清单用于校准高质量论文证据。</p>
      <div class="grid-2">${tasks}</div>
    </section>
    <section id="workflow" class="wrap">
      <h2>推荐使用流程</h2>
      <div class="card">
        <ul>
          <li>先看资料 A，建立双 payload ADC 团队/公司主图谱。</li>
          <li>再看资料 B 和 C，分别拆分 ADC linker 与双 payload linker 的技术证据。</li>
          <li>对重点团队进入资料 D，查看更详细的组织、成果、成员和合作网络。</li>
          <li>最后用资料 E 核查 CNS/子刊论文来源质量，校正权威等级和代表论文优先级。</li>
        </ul>
      </div>
    </section>
  </main>
  <footer class="wrap">Generated from Markdown reports for GitHub Pages. 标准调研日期：${researchDate}</footer>
  <script>
    document.querySelectorAll('.task').forEach(card => {
      const link = card.querySelector('a.btn');
      if (!link) return;
      card.addEventListener('click', event => {
        if (event.target.closest('a')) return;
        window.location.href = link.href;
      });
    });
  </script>
</body>
</html>
`;
}

for (const [index, doc] of documents.entries()) {
  fs.writeFileSync(path.join(root, doc.output), renderDetail(doc, index), "utf8");
}

fs.writeFileSync(path.join(root, "index.html"), renderIndex(), "utf8");
fs.writeFileSync(path.join(root, ".nojekyll"), "", "utf8");
console.log(`Generated ${documents.length + 1} pages.`);
