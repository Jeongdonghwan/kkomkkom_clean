import { useState } from "react";
import { CONFIG } from "../config.js";
import { useUI, openKakao } from "../ui.jsx";

const SERVICE_OPTIONS = [
  "입주청소",
  "줄눈시공",
  "탄성코트",
  "나노코팅",
  "베이크아웃",
  "에어컨분해청소",
];

const EMPTY = {
  name: "",
  phone: "",
  addr: "",
  size: "",
  date: "",
  memo: "",
  company: "", // honeypot
  agree: false,
};

const inputCls =
  "w-full border border-black/10 rounded-xl px-3.5 py-3 bg-paper focus:outline-none focus:ring-2 focus:ring-brand-soft";

const TRUST = [
  "정찰 견적제 — 추가비용 없는 투명 견적",
  "외주 없는 직영 정직원 시공",
  "작업 과정 실시간 사진 공유",
  "검수 후 미흡분 책임 A/S",
];

// id 로 받은 서비스(상세페이지에서 진입)를 기본 선택값으로
export default function QuoteSection({ defaultService }) {
  const { toast } = useUI();
  const [form, setForm] = useState(EMPTY);
  const [services, setServices] = useState(defaultService ? [defaultService] : []);
  const [submitting, setSubmitting] = useState(false);

  const set = (k) => (e) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [k]: v }));
  };

  const toggleService = (s) =>
    setServices((arr) => (arr.includes(s) ? arr.filter((x) => x !== s) : [...arr, s]));

  const submit = async () => {
    if (form.company) return; // honeypot
    if (!form.name.trim()) return toast("이름을 입력해주세요");
    if (!form.phone.trim()) return toast("연락처를 입력해주세요");
    if (!form.agree) return toast("개인정보 수집에 동의해주세요");

    const payload = {
      timestamp: new Date().toLocaleString("ko-KR"),
      name: form.name.trim(),
      phone: form.phone.trim(),
      addr: form.addr.trim(),
      size: form.size.trim(),
      services: services.join(", "),
      date: form.date,
      memo: form.memo.trim(),
    };

    setSubmitting(true);
    try {
      await fetch(CONFIG.SHEET_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      setForm(EMPTY);
      setServices(defaultService ? [defaultService] : []);
      toast("견적 신청이 접수되었습니다. 곧 연락드릴게요!");
    } catch (err) {
      toast("전송에 실패했습니다. 카카오 상담으로 문의해주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="quote" className="py-24 bg-card scroll-mt-[74px]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* 좌: 카피 + 신뢰 요소 */}
          <div className="reveal">
            <span className="inline-block text-brand-soft font-bold tracking-[.22em] text-xs">
              GET A QUOTE
            </span>
            <h2 className="text-[clamp(26px,3.4vw,38px)] font-extrabold tracking-[-.02em] leading-tight mt-2.5">
              무료 견적,
              <br />
              1분이면 신청 끝
            </h2>
            <p className="text-muted mt-4 text-[16px] leading-relaxed">
              연락처와 원하는 서비스만 남겨주시면, 정찰제 기준으로 빠르게 견적을 안내해 드립니다.
              필요한 케어를 한 번에 묶어 상담받으세요.
            </p>
            <ul className="mt-7 space-y-3">
              {TRUST.map((t) => (
                <li key={t} className="flex gap-3 font-semibold text-[#3a423c]">
                  <svg className="mt-0.5 shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3F7A5A" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
            <button
              onClick={openKakao}
              className="mt-8 inline-flex items-center gap-2 bg-kakao text-[#3A1D1D] px-6 py-3.5 rounded-full font-extrabold hover:brightness-95 transition"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 9.5 9.5 0 0 1-3.8-.8L3 21l1.9-5.2A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5Z" />
              </svg>
              카카오로 바로 상담하기
            </button>
          </div>

          {/* 우: 견적 폼 */}
          <div className="reveal bg-white rounded-[20px] shadow-xl border border-black/5 p-7" data-d="1">
            <div className="mb-4">
              <label className="block font-bold text-sm mb-2" htmlFor="q_name">
                이름 <span className="text-red-500">*</span>
              </label>
              <input id="q_name" className={inputCls} placeholder="성함" value={form.name} onChange={set("name")} />
            </div>
            <div className="mb-4">
              <label className="block font-bold text-sm mb-2" htmlFor="q_phone">
                연락처 <span className="text-red-500">*</span>
              </label>
              <input
                id="q_phone"
                type="tel"
                inputMode="numeric"
                className={inputCls}
                placeholder="010-0000-0000"
                value={form.phone}
                onChange={set("phone")}
              />
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block font-bold text-sm mb-2" htmlFor="q_addr">
                  지역 / 단지명
                </label>
                <input id="q_addr" className={inputCls} placeholder="예: 동탄 자연앤자이" value={form.addr} onChange={set("addr")} />
              </div>
              <div>
                <label className="block font-bold text-sm mb-2" htmlFor="q_size">
                  평수
                </label>
                <input id="q_size" inputMode="numeric" className={inputCls} placeholder="예: 33" value={form.size} onChange={set("size")} />
              </div>
            </div>

            <div className="mb-4">
              <label className="block font-bold text-sm mb-2">
                원하는 서비스 <span className="text-muted font-medium text-xs">(중복 선택)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {SERVICE_OPTIONS.map((s) => {
                  const active = services.includes(s);
                  return (
                    <button
                      type="button"
                      key={s}
                      onClick={() => toggleService(s)}
                      aria-pressed={active}
                      className={`border rounded-full px-3.5 py-2 text-[13.5px] font-semibold transition ${
                        active ? "bg-brand text-white border-brand" : "bg-paper border-black/10 text-ink"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mb-4">
              <label className="block font-bold text-sm mb-2" htmlFor="q_date">
                희망 시공일
              </label>
              <input id="q_date" type="date" className={inputCls} value={form.date} onChange={set("date")} />
            </div>
            <div className="mb-4">
              <label className="block font-bold text-sm mb-2" htmlFor="q_memo">
                추가 요청사항
              </label>
              <textarea
                id="q_memo"
                rows="3"
                className={`${inputCls} resize-y`}
                placeholder="평형, 오염 정도, 원하는 일정 등 자유롭게 적어주세요."
                value={form.memo}
                onChange={set("memo")}
              />
            </div>

            {/* honeypot */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px]"
              value={form.company}
              onChange={set("company")}
            />

            <label className="flex items-start gap-2.5 text-[13px] text-muted mb-4">
              <input type="checkbox" className="mt-1" checked={form.agree} onChange={set("agree")} />
              <span>
                개인정보 수집·이용에 동의합니다. (견적 상담 목적, 상담 완료 후 파기){" "}
                <span className="text-red-500">*</span>
              </span>
            </label>

            <button
              onClick={submit}
              disabled={submitting}
              className="w-full bg-brand-light hover:bg-[#356a4d] text-white rounded-xl py-4 font-extrabold transition disabled:opacity-60"
            >
              {submitting ? "전송 중..." : "견적 신청 보내기"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
