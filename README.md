# ADC linker 报告库

本仓库用于发布 ADC linker 与双 payload ADC linker 调研报告的 GitHub Pages 静态网页。

## 页面

- `index.html`：报告入口页
- `adc-linker-report.html`：ADC linker 领域顶尖团队/公司研究方向与科研关系报告
- `dual-payload-linker-report.html`：双 payload ADC linker 顶尖团队/公司研究方向与科研关系报告

## GitHub Pages 设置

如果页面还不能访问，需要在 GitHub 仓库中开启 Pages：

1. 进入仓库 `Settings`
2. 打开 `Pages`
3. `Build and deployment` 选择 `Deploy from a branch`
4. Branch 选择 `main`，目录选择 `/root`
5. 保存后等待 GitHub 部署完成

启用后入口通常是：

https://hjh0331.github.io/ADC-/

## 本地重新生成

```bash
node scripts/build-pages.mjs
```

