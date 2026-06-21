// 꼼꼼클린 로고 — 라인 SVG 마크(둥근 집 + 내부 잎) + 워드마크.
// variant: "dark"(밝은 배경용, 기본) / "light"(어두운 배경·헤더 투명 상태용)
export default function Logo({ variant = "dark", showTagline = true, className = "" }) {
  const light = variant === "light";
  const markColor = light ? "#FFFFFF" : "#2E5A43";
  const leafColor = light ? "#FFFFFF" : "#6FA386";
  const wordColor = light ? "text-white" : "text-brand";
  const tagColor = light ? "text-white/60" : "text-muted";

  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width="34"
        height="34"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* 둥근 집 외곽선 */}
        <path
          d="M7 18.5 20 7l13 11.5M9.5 16.7V31a2 2 0 0 0 2 2h17a2 2 0 0 0 2-2V16.7"
          stroke={markColor}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* 내부 잎(친환경) */}
        <path
          d="M20 28.5c0-3.4 2-6 5-6.4-.2 3.5-2.2 6-5 6.4Zm0 0c0-3.4-2-6-5-6.4.2 3.5 2.2 6 5 6.4Zm0 0V24"
          stroke={leafColor}
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={`font-extrabold text-[20px] tracking-[-.03em] ${wordColor}`}>꼼꼼클린</span>
        {showTagline && (
          <span className={`text-[9px] font-bold tracking-[.2em] mt-1 ${tagColor}`}>
            TOTAL HOME CARE
          </span>
        )}
      </span>
    </span>
  );
}
