import { CrescentGlyph } from "./icons";

export default function MoonPour() {
  return (
    <section className="pour" aria-hidden="true">
      <div className="pour-moon">
        <CrescentGlyph className="pour-moon-glyph" />
      </div>
      <svg
        className="pour-line-svg"
        viewBox="0 0 2 140"
        preserveAspectRatio="none"
      >
        <path className="pour-line" d="M1 0 V140" />
      </svg>
      <div className="pour-bottle">
        <svg viewBox="0 0 80 120" className="pour-bottle-svg">
          <defs>
            <clipPath id="scent-bottle-clip">
              <path d="M33 4 L47 4 L47 14 L55 14 C62 14 63 17 63 24 L72 48 L72 94 A14 14 0 0 1 58 108 L22 108 A14 14 0 0 1 8 94 L8 48 L17 24 C17 17 18 14 25 14 L33 14 Z" />
            </clipPath>
            <linearGradient id="scent-liquid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ecd19c" />
              <stop offset="1" stopColor="#b98d45" />
            </linearGradient>
          </defs>
          <rect
            x="8"
            y="36"
            width="64"
            height="74"
            fill="url(#scent-liquid)"
            clipPath="url(#scent-bottle-clip)"
            className="bottle-liquid"
          />
          <path
            d="M33 4 L47 4 L47 14 L55 14 C62 14 63 17 63 24 L72 48 L72 94 A14 14 0 0 1 58 108 L22 108 A14 14 0 0 1 8 94 L8 48 L17 24 C17 17 18 14 25 14 L33 14 Z"
            className="bottle-shape"
          />
          <rect
            x="45"
            y="0"
            width="4"
            height="10"
            rx="1.5"
            className="bottle-stopper"
          />
        </svg>
      </div>
    </section>
  );
}
