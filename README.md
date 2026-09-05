# 香淚月 scentmoon.com

個人網站，以 Next.js（React）靜態輸出並部署於 GitHub Pages。

## 編輯網站文字

首頁的所有文字（自我介紹、按鈕、連結、網絡連載小說與已出版作品記錄）都集中在
[`content/site.yaml`](content/site.yaml)。直接在 GitHub 上修改這個檔案並提交，
網站便會自動重建更新。

例如想更換自我介紹：

1. 開啟 `content/site.yaml`
2. 修改 `bio` 下的文字行
3. 按下 Commit changes

## 本地開發

```bash
pnpm install
pnpm dev
```

## 網站結構

- `/` — 主頁（個人簡介、平台連結、網絡連載小說）
- `/works/` — 已出版作品及經歷
- `/contact/` — 合作諮詢

## 部署

每次 push 到 `main`，GitHub Actions 便會自動建置並發布到
https://scentmoon.com。
