import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export default function NotFound() {
  return (
    <main className="notfound">
      <div className="container notfound-inner">
        <p className="eyebrow mono">
          <span className="eyebrow-no">404</span>
          空瓶
        </p>
        <h1 className="display-title">這一瓶已經售罄</h1>
        <p className="notfound-desc">
          你找的頁面不在架上——也許它從未釀成，也許它已經被帶走了。
        </p>
        <Link href="/" className="btn btn-gold">
          回到{`${SITE_NAME}`}的店門
        </Link>
      </div>
    </main>
  );
}
