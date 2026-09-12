# JSON Tool

纯前端的 JSON 格式化工具，整个应用就是仓库根目录的单个 `index.html`，没有构建步骤、没有第三方依赖。

## 功能

- 格式化（beautify）、压缩（minify）、语法校验
- 缩进 1–20 可调，改动后自动重跑上次操作
- 递归排序 key（含嵌套对象与数组内部）
- 输出区行号、字符计数、悬浮复制按钮
- 下载为 `formatted.json`、一键清空、示例数据
- 深浅色主题（记住在 `localStorage`）
- 快捷键 `Ctrl/Cmd + Enter` 触发格式化

## 本地运行

直接用浏览器打开 `index.html` 即可；页面不请求任何后端，离线可用。需要 HTTP 服务时：

```bash
python3 -m http.server 8000
```

## 隐私

JSON 解析全部在浏览器内完成，输入内容不会离开本机。页面带有 Google Analytics 埋点，如需完全无埋点的版本，删除 `index.html` 头部的 gtag 脚本即可。

## 部署

产物就是一个静态文件，任意静态托管都能跑。线上域名为 `json-tool.com`。
