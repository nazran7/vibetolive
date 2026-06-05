# VibeToLive.dev

VibeToLive.dev 帮助创始人、独立开发者和精益团队，把 AI 生成的原型升级为安全、可扩展、可上线的生产级应用。

该网站基于 Next.js App Router 构建，包含多语言营销页面、SEO 专题页、canonical 元数据、hreflang 替代链接、结构化数据、robots、sitemap，以及 `llms.txt` 索引。

## SEO 架构

- Canonical 域名：`https://www.vibetolive.dev`
- 默认语言：英文，不使用 URL 前缀
- 多语言前缀：`/zh`、`/ja`、`/ar`、`/es`、`/ru`、`/fr`
- 旧语言别名会永久重定向到规范 URL
- App Router metadata 生成 canonical、Open Graph、Twitter 和 hreflang 标签
- `app/sitemap.js` 生成包含多语言替代链接的 XML sitemap
- `app/robots.ts` 指向规范 sitemap
- Service、FAQ、Breadcrumb、Organization 和 WebSite JSON-LD 在服务端渲染

## 开发

```bash
npm install
npm run dev
```

## 验证

```bash
npm run lint
npm run build
```

生产构建应生成多语言 SEO 页面、`/sitemap.xml` 和 `/robots.txt`。
