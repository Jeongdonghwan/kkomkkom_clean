// 라인/채움 스타 SVG 5개 — 초안의 ★★★★★ 텍스트 대체 (CLAUDE.md 규칙: 이모지/픽토그램 금지)
const STAR_PATH =
  "M12 2.5l2.9 6 6.6.9-4.8 4.6 1.1 6.5L12 17.9 6.2 20.5l1.1-6.5L2.5 9.4l6.6-.9z";

export default function StarRating({ value = 5, size = 15 }) {
  return (
    <div className="flex items-center gap-0.5 text-[#f0a72e]" aria-label={`별점 ${value}점 / 5점`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < value;
        return (
          <svg
            key={i}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={filled ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d={STAR_PATH} />
          </svg>
        );
      })}
    </div>
  );
}
