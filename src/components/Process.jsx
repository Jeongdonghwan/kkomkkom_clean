// 실제 시공 진행 순서 5단계 (번호 = 실제 시퀀스)
const STEPS = [
  { no: "01", title: "상담·정찰 견적", desc: "카톡·전화로 정찰제 기준의 명확한 견적을 안내합니다." },
  { no: "02", title: "방문 점검", desc: "현장 상태와 오염 구역을 확인하고 작업 범위를 확정합니다." },
  { no: "03", title: "직영 시공", desc: "외주 없는 정직원 팀이 구역별 시스템으로 진행합니다." },
  { no: "04", title: "실시간 공유", desc: "작업 과정을 사진으로 공유해 직접 확인하실 수 있습니다." },
  { no: "05", title: "검수·A/S", desc: "함께 검수 후 마무리하고, 미흡한 부분은 책임 보완합니다." },
];

export default function Process() {
  return (
    <section id="process" className="py-24 bg-white border-t border-black/5">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <span className="reveal inline-block text-brand-soft font-bold tracking-[.22em] text-xs">
          SERVICE STANDARD
        </span>
        <h2 className="reveal text-[clamp(26px,3.4vw,38px)] font-extrabold tracking-[-.02em] mt-2.5" data-d="1">
          시공 진행 과정
        </h2>
        <p className="reveal text-muted mt-3" data-d="2">
          상담부터 검수·A/S까지, 순서대로 투명하게.
        </p>
        <div className="grid md:grid-cols-5 gap-3.5 mt-11 text-left">
          {STEPS.map((s, i) => (
            <div
              key={s.no}
              className="reveal p-6 border border-black/5 rounded-xl2 bg-paper"
              data-d={i.toString()}
            >
              <div className="text-brand-soft text-[13px] font-extrabold tracking-wider">
                STEP {s.no}
              </div>
              <h4 className="font-extrabold text-[17px] mt-2.5">{s.title}</h4>
              <p className="text-muted text-[13.5px] mt-2 leading-snug">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
