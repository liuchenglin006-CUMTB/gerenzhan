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
