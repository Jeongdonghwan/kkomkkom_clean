import { useRef, useState } from "react";

// 견적 섹션용 시공 장비 소개 — 탭 전환형 세로 영상 패널
const EQUIPMENTS = [
  {
    key: "kirby",
    label: "컬비 — 벽·천장 케어란?",
    name: "컬비 벽·천장 케어",
    video: "/videos/kirby.mp4",
    poster: "/videos/kirby-poster.jpg",
    desc: "벽지·천장에 쌓인 미세먼지까지 흡입하는 벽·천장 전용 청소 장비예요. 걸레가 닿지 않는 벽지 요철 사이 먼지까지 케어합니다.",
    icon: (
      // 벽·천장: 브러시 라인 아이콘
      <path d="M3 21v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4M7 15V9a5 5 0 0 1 10 0v6" />
    ),
  },
  {
    key: "jetplus",
    label: "제트플러스 — 바닥 케어란?",
    name: "제트플러스 바닥 케어",
    video: "/videos/jetplus.mp4",
    poster: "/videos/jetplus-poster.jpg",
    desc: "습식 브러시로 바닥을 세척하는 보행식 바닥 청소 장비예요. 걸레질로 지워지지 않는 바닥 눌은 때·잔여 오염까지 제거합니다.",
    icon: (
      // 바닥: 물결 라인 아이콘
      <path d="M2 17c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2M2 12c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2" />
    ),
  },
];

export default function EquipmentShowcase() {
  const [activeKey, setActiveKey] = useState(EQUIPMENTS[0].key);
  const videoRefs = useRef({});
  const active = EQUIPMENTS.find((eq) => eq.key === activeKey);

  const switchTo = (key) => {
    // 탭 전환 시 재생 중이던 영상 정지
    Object.values(videoRefs.current).forEach((v) => v && v.pause());
    setActiveKey(key);
  };

  return (
    <div className="flex flex-col lg:absolute lg:inset-0">
      <h3 className="flex items-center gap-2.5 font-extrabold text-[17px]">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3F7A5A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.01a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
        </svg>
        이런 전문 장비로 시공해요
      </h3>

      <div className="flex flex-wrap gap-2 mt-4">
        {EQUIPMENTS.map((eq) => {
          const isActive = eq.key === activeKey;
          return (
            <button
              type="button"
              key={eq.key}
              onClick={() => switchTo(eq.key)}
              aria-pressed={isActive}
              className={`border rounded-full px-3.5 py-2 text-[13.5px] font-semibold transition ${
                isActive ? "bg-brand text-white border-brand" : "bg-paper border-black/10 text-ink hover:border-brand-soft"
              }`}
            >
              {eq.label}
            </button>
          );
        })}
      </div>

      <div className="mt-4 bg-white border border-black/5 rounded-[20px] p-5 shadow-sm flex-1 min-h-0">
        <div className="flex flex-col gap-5 h-full">
          {EQUIPMENTS.map((eq) => (
            <video
              key={eq.key}
              ref={(el) => (videoRefs.current[eq.key] = el)}
              controls
              playsInline
              preload="none"
              poster={eq.poster}
              width="720"
              height="1280"
              className={`w-full aspect-[9/16] lg:aspect-auto lg:flex-1 lg:min-h-0 object-cover rounded-2xl bg-ink ${
                eq.key === activeKey ? "" : "hidden"
              }`}
            >
              <source src={eq.video} type="video/mp4" />
            </video>
          ))}
          <div className="shrink-0">
            <div className="flex items-center gap-2 font-extrabold text-[15.5px]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3F7A5A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                {active.icon}
              </svg>
              {active.name}
            </div>
            <p className="text-muted text-[14.5px] leading-relaxed mt-2.5">{active.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
