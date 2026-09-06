# 香淚月 Scentmoon — scentmoon.com

香淚月（Scentmoon）的個人網站。概念是「月光黑金調香室」：把淚釀成香的人。
以 Next.js（React）靜態輸出並部署於 GitHub Pages，網址
https://scentmoon.com。

## 編輯網站文字

全站內容集中在 [`content/site.yaml`](content/site.yaml)。直接修改這個檔案並
推送到 `main`，網站便會自動重建更新。

主要段落：

- `hero` — 店門（主標題、副題、營業時間）
- `follow` — Instagram 追蹤連結
- `book` — 鎮店之香：《我踩着童年考上了名校》（香調、介紹、購買連結）
- `works` — 香氣陳列架上的其他作品（每瓶一個條目）
- `nightSeries` — 午夜試香（Instagram 詩文入口）
- `about` — 調香師（自介、資料卡）
- `archive` — 墨跡（刊物與比賽紀錄）
- `footprints` — 文字走過的地方
- `contact` — 來找我（IG、電郵、其他平台）

圖片放在 `public/images/`，在 YAML 中以 `/images/…` 引用。

## 本地開發

```bash
pnpm install
pnpm dev
```

## 網站結構

- `/` — 單頁調香室：鎮店之香 → 香氣陳列 → 調香師 → 墨跡 → 來找我

## 部署

每次 push 到 `main`，GitHub Actions 便會自動建置並發布到
https://scentmoon.com。
