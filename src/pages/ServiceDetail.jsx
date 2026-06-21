import { Navigate, Link, useParams } from "react-router-dom";
import { SERVICES, getServiceBySlug } from "../data/services.js";
import { useReveal } from "../hooks/useReveal.js";
import { scrollToQuote } from "../ui.jsx";
import { CONFIG } from "../config.js";
import BeforeAfter from "../components/BeforeAfter.jsx";
import QuoteSection from "../components/QuoteSection.jsx";

export default function ServiceDetail() {
  const { slug } = useParams();
  const svc = getServiceBySlug(slug);
  useReveal();

  if (!svc) return <Navigate to="/" replace />;

  const others = SERVICES.filter((s) => s.slug !== svc.slug);

  return (
    <>
      {/* 1) 다크 히어로 */}
      <section className="relative min-h-[62svh] flex items-end text-white overflow-hidden">
        <img src={svc.heroImg} alt={`${svc.title} 시공`} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/45" />
        {/* 헤더 가독성용 상단 스크림 */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/55 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full pb-14 pt-28">
          <Link to="/#services" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-semibold transition">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M11 18l-6-6 6-6" />
            </svg>
            전체 서비스
          </Link>
          <span className="block text-brand-soft font-bold tracking-[.22em] text-xs mt-5">SERVICE</span>
          <h1 className="text-[clamp(30px,5vw,52px)] font-extrabold tracking-[-.03em] mt-2.5">{svc.title}</h1>
          <p className="text-white/80 font-semibold text-[clamp(15px,1.8vw,18px)] mt-3 max-w-xl">{svc.tagline}</p>
          <div className="flex flex-wrap gap-3 mt-7">
            <button onClick={scrollToQuote} className="bg-brand-light hover:bg-[#356a4d] hover:-translate-y-0.5 transition px-6 py-3.5 rounded-full font-extrabold text-white shadow-lg shadow-black/20">
              무료 견적 문의하기
            </button>
            <a href={`tel:${CONFIG.PHONE}`} className="bg-white/95 hover:bg-white transition px-6 py-3.5 rounded-full font-extrabold text-ink">
              전화 상담
            </a>
          </div>
        </div>
      </section>

      {/* 2) 정의 / 핵심 포인트 */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="reveal">
            <span className="text-brand-soft font-bold tracking-[.22em] text-xs">ABOUT THIS SERVICE</span>
            <h2 className="text-[clamp(24px,3.2vw,34px)] font-extrabold tracking-[-.02em] leading-tight mt-2.5">
              어떤 서비스인가요?
            </h2>
            <p className="text-muted mt-4 text-[16px] leading-relaxed">{svc.intro}</p>
          </div>
          <ul className="reveal grid sm:grid-cols-2 gap-3.5" data-d="1">
            {svc.points.map((p) => (
              <li key={p} className="flex gap-3 items-start bg-white border border-black/5 rounded-xl2 p-5 font-semibold text-[#3a423c]">
                <svg className="mt-0.5 shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3F7A5A" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span className="text-[14.5px] leading-snug">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3) Before / After */}
      <BeforeAfter
        eyebrow="BEFORE / AFTER"
        title={svc.beforeAfter.title}
        desc={svc.beforeAfter.desc}
        beforeImg={svc.beforeAfter.beforeImg}
        afterImg={svc.beforeAfter.afterImg}
        checks={svc.beforeAfter.checks}
      />

      {/* 4) 시공 공정 */}
      <section className="py-24 bg-card">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <span className="reveal inline-block text-brand-soft font-bold tracking-[.22em] text-xs">PROCESS</span>
          <h2 className="reveal text-[clamp(26px,3.4vw,38px)] font-extrabold tracking-[-.02em] mt-2.5" data-d="1">
            시공 공정
          </h2>
          <div className="grid md:grid-cols-5 gap-3.5 mt-11 text-left">
            {svc.process.map((p, i) => (
              <div key={p.t} className="reveal p-6 border border-black/5 rounded-xl2 bg-white" data-d={i.toString()}>
                <div className="text-brand-soft text-[13px] font-extrabold tracking-wider">
                  STEP {String(i + 1).padStart(2, "0")}
                </div>
                <h4 className="font-extrabold text-[17px] mt-2.5">{p.t}</h4>
                <p className="text-muted text-[13.5px] mt-2 leading-snug">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5) 장비 / 자재 */}
      <section className="py-24 max-w-6xl mx-auto px-6 text-center">
        <span className="reveal inline-block text-brand-soft font-bold tracking-[.22em] text-xs">EQUIPMENT & MATERIALS</span>
        <h2 className="reveal text-[clamp(26px,3.4vw,38px)] font-extrabold tracking-[-.02em] mt-2.5" data-d="1">
          사용 장비·자재
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mt-11">
          {svc.materials.map((m, i) => (
            <div key={m} className="reveal bg-white border border-black/5 rounded-xl2 p-6 flex items-center gap-3 text-left" data-d={(i % 4).toString()}>
              <span className="w-9 h-9 rounded-[10px] grid place-items-center text-white bg-gradient-to-br from-brand to-brand-soft shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <span className="font-semibold text-[14.5px] text-[#3a423c]">{m}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 6) 견적 유도 */}
      <QuoteSection defaultService={svc.title} />

      {/* 7) 다른 서비스 */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <div className="text-center mb-11">
          <span className="reveal inline-block text-brand-soft font-bold tracking-[.22em] text-xs">OTHER SERVICES</span>
          <h2 className="reveal text-[clamp(24px,3.2vw,32px)] font-extrabold tracking-[-.02em] mt-2.5" data-d="1">
            다른 서비스도 함께 보세요
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
          {others.map((s) => (
            <Link key={s.slug} to={`/services/${s.slug}`} className="group relative h-[150px] rounded-xl2 overflow-hidden flex items-end">
              <img src={s.img} alt={s.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10" />
              <h3 className="relative z-10 p-4 text-white font-extrabold text-[15px]">{s.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
