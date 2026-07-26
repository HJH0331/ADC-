# ADC 调研资料库平台

本仓库用于发布 ADC 调研资料库 GitHub Pages。

标准调研日期：2026-07-26

## 页面结构

- `index.html`：ADC 调研资料库平台入口
- `detail-01-dual-payload-adc-teams.html`：双 payload ADC 顶尖团队/公司研究方向与科研关系报告
- `detail-02-adc-linker-teams.html`：ADC linker 顶尖团队/公司研究方向与科研关系报告
- `detail-03-dual-payload-adc-linker-teams.html`：双 payload ADC linker 顶尖团队/公司研究方向与科研关系报告
- `detail-04-dual-payload-adc-team-details.html`：双 payload ADC 部分团队/公司详细情况报告
- `detail-cns-paper-list.html`：双 payload ADC CNS 系列及子刊全口径论文清单
- `detail-adc-cns-paper-list.html`：ADC CNS 系列及子刊论文清单

## 资料来源

原始 Markdown 文件保存在 `content/` 目录。网页由 `scripts/build-pages.mjs` 自动生成。

## GitHub Pages

启用 Pages 后入口通常是：

https://hjh0331.github.io/ADC-/

仓库设置路径：

1. 进入 GitHub 仓库 `Settings`
2. 打开 `Pages`
3. `Build and deployment` 选择 `Deploy from a branch`
4. Branch 选择 `main`
5. Folder 选择 `/root`

## 本地重新生成

```bash
node scripts/build-pages.mjs
```
