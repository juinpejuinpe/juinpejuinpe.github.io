type PhaseSide = "left" | "right";

type MoonPhaseProps = {
  /** 可見百分比 0–100 */
  pct: number;
  side: PhaseSide;
  className?: string;
};

const R = 50;

/** 橢圓弧的 x 半徑；a=0 為直徑（半圓），a=R 與外緣重合（零面積）。 */
function terminatorRadius(fraction: number) {
  return Math.max(0, R * (1 - 2 * Math.min(fraction, 0.5)));
}

/**
 * 以「亮面在右」為基準畫月相，再把整組左右鏡射給左側亮面的月相。
 * 弦月：外緣弧 + 內側橢圓弧（terminator）。凸月：亮圓 + 對側暗蝕。
 */
export default function MoonPhase({
  pct,
  side,
  className,
}: MoonPhaseProps) {
  const f = Math.min(100, Math.max(0, pct)) / 100;
  const litFull = f > 0.5;
  const a = terminatorRadius(litFull ? 1 - f : f);
  const mirror = side === "left";

  // 亮面在右的弦月（新月→弦月）
  const crescentRight = `M50 0 A50 50 0 0 1 50 100 A${a} 50 0 0 0 50 0 Z`;
  // 亮面在右的凸月暗蝕（在左邊）
  const biteLeft = `M50 0 A50 50 0 0 0 50 100 A${a} 50 0 0 1 50 0 Z`;

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g
        transform={
          mirror ? "translate(-100 0) scale(-1 1)" : undefined
        }
      >
        <circle cx="50" cy="50" r="50" className="mmp-shadow" />
        {litFull ? (
          <>
            <circle cx="50" cy="50" r="50" className="mmp-lit" />
            <path d={biteLeft} className="mmp-shadow" />
          </>
        ) : (
          <path d={crescentRight} className="mmp-lit" />
        )}
        {f >= 0.48 && (
          <g className="mmp-craters" opacity="0.5">
            <circle cx="71" cy="31" r="5.5" />
            <circle cx="62" cy="52" r="3.4" />
            <circle cx="77" cy="62" r="2.6" />
            <circle cx="66" cy="76" r="4" />
          </g>
        )}
      </g>
    </svg>
  );
}
