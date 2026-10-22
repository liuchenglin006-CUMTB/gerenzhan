# 刘成林 · 个人作品集

暗色系个人作品集网站基础版，React + Vite 实现，PC 端优先，版心 1700px。

## 运行

```bash
npm install
npm run dev
```

生产构建：`npm run build`，预览：`npm run preview`。

## 替换素材

- 首页视频背景：把视频放到 `public/hero.mp4`（无视频时会自动显示动态光晕背景）
- 头像：编辑 `src/App.jsx` 中 `.avatar` 区域，替换为 `<img src="/avatar.jpg">`
- 项目封面：编辑 `src/App.jsx` 中 `ProjectCover`，替换为真实作品截图
- 所有文字内容：`src/data.js`
- 全部样式与主题色：`src/styles.css`（变量在文件顶部）

## 实习经历视频

东软经历中的 Agent 提效视频位于光轮项目图集下方，桌面端采用左侧说明、右侧视频封面的布局。

- 视频文件：`public/videos/agent-efficiency.mp4`（H.264 视频 + AAC 原声音轨）
- 预览封面：`public/videos/agent-efficiency-poster.jpg`
- 视频使用适合网页播放的 1920px 宽度版本，保留完整时长与原声音轨，并将文件大小控制在 Cloudflare Pages 的单文件 25 MiB 限制内。
- 标题、说明及素材路径：`src/data.js` 中东软经历的 `video` 字段
- 点击封面后在居中的弹窗内有声播放，可使用原生播放器控件；按 Esc、点击弹窗外或关闭按钮退出并停止播放。
- 页面首次打开只加载封面，点击后才加载视频。若浏览器限制自动播放，可点击播放器的播放按钮。
