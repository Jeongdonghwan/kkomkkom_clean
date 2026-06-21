// 포트폴리오 4장 (TODO: 실제 시공 현장 사진 교체)
const ITEMS = [
  { img: "/images/pf-grout.jpg", caption: "욕실 줄눈 시공" },
  { img: "/images/pf-nano.jpg", caption: "주방 상판 나노코팅" },
  { img: "/images/pf-aircon.jpg", caption: "에어컨 분해청소" },
  { img: "/images/pf-elastic.jpg", caption: "다용도실 탄성코트" },
];

export default function Portfolio() {
  return (
    <section id="work" className="py-24 max-w-6xl mx-auto px-6 text-center">
      <span className="reveal inline-block text-brand-soft font-bold tracking-[.22em] text-xs">
        PORTFOLIO
      </span>
      <h2 className="reveal text-[clamp(26px,3.4vw,38px)] font-extrabold tracking-[-.02em] mt-2.5" data-d="1">
        홈케어 갤러리
      </h2>
      <p className="reveal text-muted mt-3" data-d="2">
        직영팀이 진행한 현장 중심 포트폴리오
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-11">
        {ITEMS.map((it, i) => (
          <figure
            key={it.caption}
            className="reveal rounded-xl2 overflow-hidden border border-black/5 bg-white group"
            data-d={i.toString()}
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={it.img}
                alt={it.caption}
                loading="lazy"
                width="280"
                height="280"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <figcaption className="p-3.5 font-bold text-sm text-left">{it.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
