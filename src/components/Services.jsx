import { Link } from "react-router-dom";
import { SERVICES } from "../data/services.js";

export default function Services() {
  return (
    <section id="services" className="py-24 bg-card">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <span className="reveal inline-block text-brand-soft font-bold tracking-[.22em] text-xs">
          OUR SERVICES
        </span>
        <h2 className="reveal text-[clamp(26px,3.4vw,38px)] font-extrabold tracking-[-.02em] mt-2.5" data-d="1">
          전문 서비스
        </h2>
        <p className="reveal text-muted mt-3" data-d="2">
          입주부터 거주까지, 필요한 케어를 한 곳에서. <span className="text-brand font-semibold">카드를 누르면 상세 안내</span>
        </p>

        <div className="grid md:grid-cols-3 gap-[18px] mt-11 text-left">
          {SERVICES.map((s, i) => (
            <Link
              key={s.slug}
              to={`/services/${s.slug}`}
              className="reveal group relative h-[230px] rounded-xl2 overflow-hidden flex items-end focus:outline-none focus:ring-2 focus:ring-brand-soft focus:ring-offset-2"
              data-d={(i % 3).toString()}
            >
              {/* TODO: 실제 시공 사진으로 교체 (data/services.js의 img) */}
              <img
                src={s.img}
                alt={`${s.title} 시공 사진`}
                loading="lazy"
                width="380"
                height="230"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/5" />
              <div className="relative z-10 p-5 text-white w-full">
                <h3 className="text-xl font-extrabold tracking-[-.02em]">{s.title}</h3>
                <p className="text-[13.5px] text-white/80 mt-1.5 leading-snug">{s.desc}</p>
                <span className="inline-flex items-center gap-1 text-[13px] font-bold text-white mt-3 opacity-0 group-hover:opacity-100 transition">
                  자세히 보기
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
