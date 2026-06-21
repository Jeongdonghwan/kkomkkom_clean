import { useCountUp } from "../hooks/useCountUp.js";

function StatCount({ target, suffix, label, delay }) {
  const [ref, value] = useCountUp(target);
  return (
    <div className="reveal bg-white border border-black/5 rounded-xl2 p-6" data-d={delay}>
      <b className="block text-[30px] font-extrabold text-brand">
        <span ref={ref}>{value}</span>
        {suffix}
      </b>
      <span className="text-muted text-sm font-semibold">{label}</span>
    </div>
  );
}

function StatText({ value, label, delay }) {
  return (
    <div className="reveal bg-white border border-black/5 rounded-xl2 p-6" data-d={delay}>
      <b className="block text-[30px] font-extrabold text-brand">{value}</b>
      <span className="text-muted text-sm font-semibold">{label}</span>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-24 max-w-6xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div className="reveal">
          <span className="text-brand-soft font-bold tracking-[.22em] text-xs">ABOUT</span>
          <h2 className="text-[clamp(26px,3.4vw,38px)] font-extrabold tracking-[-.02em] leading-tight mt-2.5">
            청결부터 시공까지,
            <br />한 팀이 책임지는 토탈 홈케어
          </h2>
          <p className="text-muted mt-4 text-[16px] leading-relaxed">
            보이지 않는 곳의 청결부터 내구성을 높이는 전문 시공까지. 여러 업체를 따로 부를 필요 없이, 한 번의
            상담으로 입주청소·줄눈·코팅·베이크아웃·에어컨까지 한 팀이 끝까지 책임집니다.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3.5">
          <StatCount target={99} suffix="%" label="고객 만족도" />
          <StatCount target={6} suffix="대" label="토탈 케어 서비스" delay="1" />
          <StatText value="직영" label="외주 없는 정직원 시공" delay="2" />
          <StatText value="친환경" label="인체 무해 세제·자재" delay="3" />
        </div>
      </div>
    </section>
  );
}
