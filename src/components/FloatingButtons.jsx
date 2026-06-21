import { openKakao, scrollToQuote } from "../ui.jsx";

export default function FloatingButtons() {
  return (
    <div
      className="fixed right-5 z-[60] flex flex-col gap-3"
      style={{ bottom: "calc(1.25rem + env(safe-area-inset-bottom))" }}
    >
      <button
        onClick={scrollToQuote}
        aria-label="지금 문의"
        className="animate-pulse2 bg-brand-light text-white rounded-full font-extrabold shadow-xl flex items-center gap-2 px-5 py-3.5 hover:-translate-y-0.5 transition"
      >
        <svg className="shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
        {/* 모바일: 지금문의 / PC: 견적 문의 */}
        <span className="max-[560px]:hidden">견적 문의</span>
        <span className="hidden max-[560px]:inline">지금문의</span>
      </button>
      <button
        onClick={openKakao}
        aria-label="카톡 문의"
        className="bg-kakao text-[#3A1D1D] rounded-full font-extrabold shadow-xl flex items-center gap-2 px-5 py-3.5 hover:-translate-y-0.5 transition"
      >
        <svg className="shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 9.5 9.5 0 0 1-3.8-.8L3 21l1.9-5.2A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5Z" />
        </svg>
        {/* 모바일: 카톡문의 / PC: 카카오 상담 */}
        <span className="max-[560px]:hidden">카카오 상담</span>
        <span className="hidden max-[560px]:inline">카톡문의</span>
      </button>
    </div>
  );
}
