import { scrollToQuote } from "../ui.jsx";
import { CONFIG } from "../config.js";

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] flex items-center text-white overflow-hidden">
      {/* 배경 사진 + 다크 그라데이션 (TODO: 실제 시공 현장 와이드 컷으로 교체) */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      />
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(120% 90% at 78% 110%,rgba(214,158,84,.35),transparent 55%),radial-gradient(90% 70% at 20% 10%,rgba(60,90,72,.5),transparent 60%),linear-gradient(160deg,rgba(22,34,28,.92),rgba(34,51,42,.78) 45%,rgba(44,34,24,.85))",
        }}
      />
      {/* floating orbs */}
      <div className="absolute -top-10 right-10 w-72 h-72 rounded-full bg-brand-soft/20 blur-3xl animate-orb z-0" />
      <div
        className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-amber-700/10 blur-3xl animate-orb z-0"
        style={{ animationDelay: "-6s" }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <span className="reveal inline-block text-brand-soft font-bold tracking-[.22em] text-xs mb-5">
          PREMIUM TOTAL HOME CARE
        </span>
        <h1
          className="reveal text-[clamp(34px,5.6vw,62px)] font-extrabold leading-[1.15] tracking-[-.03em]"
          data-d="1"
        >
          한 집의 시작을
          <br />
          가장 깨끗하게 완성합니다
        </h1>
        <p
          className="reveal mt-6 text-[clamp(15px,1.8vw,18px)] font-semibold text-white/85 max-w-xl"
          data-d="2"
        >
          입주청소부터 줄눈·코팅·베이크아웃·에어컨까지, 한 번에 끝내는 토탈 홈케어.
          <span className="block text-white/60 font-medium mt-1">
            견적 한 번으로 필요한 모든 케어를 묶어드립니다.
          </span>
        </p>
        <div className="reveal flex flex-wrap gap-3 mt-9" data-d="3">
          <button
            onClick={scrollToQuote}
            className="bg-brand-light hover:bg-[#356a4d] hover:-translate-y-0.5 transition px-7 py-4 rounded-full font-extrabold text-white shadow-lg shadow-black/20"
          >
            무료 견적 문의하기
          </button>
          <a
            href={`tel:${CONFIG.PHONE}`}
            className="bg-white/95 hover:bg-white transition px-7 py-4 rounded-full font-extrabold text-ink"
          >
            전화 상담
          </a>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 text-white/60 animate-floaty"
        aria-label="아래로"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </a>
    </section>
  );
}
