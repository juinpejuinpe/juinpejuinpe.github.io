import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export default function NotFound() {
  return (
    <main className="notfound">
      <div className="container notfound-inner">
        <p className="eyebrow mono">
          <span className="eyebrow-no">404</span>
          未命名月亮
        </p>
        <h1 className="display-title">這顆月亮還沒有名字</h1>
        <p className="notfound-desc">
          你尋找的月亮不在這片夜空——也許它尚未被觀測，也許它已經被人帶走了。
        </p>
        <Link href="/" className="btn btn-gold">
          回到{`${SITE_NAME}`}的觀月台
        </Link>
      </div>
    </main>
  );
}
