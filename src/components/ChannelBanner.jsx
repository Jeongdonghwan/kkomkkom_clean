import { CHANNELS } from "../config.js";

export default function ChannelBanner() {
  return (
    <section className="pb-24 max-w-6xl mx-auto px-6">
      <div
        className="reveal rounded-[24px] p-11 text-center text-white relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#2E5A43,#244736)" }}
      >
        <div className="absolute -right-10 -top-10 w-52 h-52 rounded-full bg-white/5 blur-2xl" />
        <h3 className="text-[clamp(20px,2.6vw,28px)] font-extrabold relative">
          직접 포스팅하는 작업 내용
        </h3>
        <p className="text-white/75 mt-2.5 relative">
          실제 시공 전·후 사진과 고객 후기를 블로그와 유튜브에서 확인하세요.
        </p>
        <div className="flex gap-3 justify-center mt-6 flex-wrap relative">
          <a
            href={CHANNELS.BLOG}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/15 border border-white/30 hover:bg-white/25 transition px-6 py-3 rounded-full font-bold"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16v16H4z" />
              <path d="M9 16V8l6 8V8" />
            </svg>
            네이버 블로그
          </a>
          <a
            href={CHANNELS.YOUTUBE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/15 border border-white/30 hover:bg-white/25 transition px-6 py-3 rounded-full font-bold"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2.5" y="6" width="19" height="12" rx="3" />
              <path d="M10 9.2v5.6l5-2.8z" fill="currentColor" stroke="none" />
            </svg>
            유튜브 채널
          </a>
        </div>
      </div>
    </section>
  );
}
