import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULTS = {
  eyebrow: "BEFORE / AFTER",
  title: "에어컨 분해청소",
  desc: "눈에 보이지 않던 내부 송풍팬·열교환기까지 완전 분해 후 세척합니다.",
  beforeImg: "/images/ba-aircon-before.jpg",
  afterImg: "/images/ba-aircon-after.jpg",
  afterVideo: "/videos/ba-aircon-after.mp4", // 있으면 AFTER 면을 영상으로 표시
  checks: [
    "송풍팬·드레인팬 분해 세척",
    "열교환기 곰팡이·먼지 고압 세척",
    "항균 처리 후 냉방 효율·악취 개선",
  ],
};

export default function BeforeAfter(props) {
  const { eyebrow, title, desc, beforeImg, afterImg, afterVideo, checks } = { ...DEFAULTS, ...props };
  const sliderRef = useRef(null);
  const dragging = useRef(false);
  const [pos, setPos] = useState(50); // after 영역 비율 (%)

  const setFromClientX = useCallback((clientX) => {
    const el = sliderRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    let p = ((clientX - r.left) / r.width) * 100;
    p = Math.max(0, Math.min(100, p));
    setPos(p);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      if (dragging.current) setFromClientX(e.clientX);
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [setFromClientX]);

  return (
    <section className="py-24 bg-white border-y border-black/5">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="reveal">
          <div
            ref={sliderRef}
            className="ba-slider aspect-[4/3] shadow-xl"
            onPointerDown={(e) => {
              dragging.current = true;
              setFromClientX(e.clientX);
            }}
          >
            {/* BEFORE (TODO: 실제 시공 전 사진 교체) */}
            <img
              src={beforeImg}
              alt="시공 전"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 z-10 bg-black/45 text-white text-xs font-extrabold tracking-widest px-3 py-1.5 rounded-full">
              BEFORE
            </div>

            {/* AFTER — 영상이 있으면 영상, 없으면 사진 */}
            <div className="ba-after" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
              {afterVideo ? (
                <video
                  src={afterVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <img
                  src={afterImg}
                  alt="시공 후"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              <div className="absolute top-4 right-4 bg-brand/85 text-white text-xs font-extrabold tracking-widest px-3 py-1.5 rounded-full">
                AFTER
              </div>
            </div>

            <div className="ba-handle" style={{ left: `${pos}%` }}>
              <div className="ba-knob">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E5A43" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 9 4 12l4 3M16 9l4 3-4 3" />
                </svg>
              </div>
            </div>
          </div>
          <p className="text-center text-muted text-sm mt-3">
            ← 가운데 핸들을 드래그해 비교해 보세요 →
          </p>
        </div>

        <div className="reveal" data-d="1">
          <span className="text-brand-soft font-bold tracking-[.22em] text-xs">{eyebrow}</span>
          <h2 className="text-[clamp(26px,3.4vw,38px)] font-extrabold tracking-[-.02em] mt-2.5">
            {title}
          </h2>
          <p className="text-muted mt-3 text-[16px]">{desc}</p>
          <ul className="mt-6 space-y-2.5">
            {checks.map((c) => (
              <li key={c} className="flex gap-3 font-semibold text-[#3a423c]">
                <svg className="mt-1 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3F7A5A" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
