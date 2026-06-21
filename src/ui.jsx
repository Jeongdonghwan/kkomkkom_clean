import { createContext, useContext } from "react";
import { CONFIG } from "./config.js";

// 전역 UI 핸들러(토스트 / 견적 섹션 스크롤 / 카카오) 공유용 컨텍스트
export const UIContext = createContext(null);

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIContext.Provider");
  return ctx;
}

// 카카오 채널 새 탭 열기 (data-kakao 버튼 공통 동작)
export function openKakao() {
  window.open(CONFIG.KAKAO_URL, "_blank", "noopener");
}

// 현재 페이지 하단 견적 섹션(#quote)으로 부드럽게 스크롤.
// 모든 페이지(Home·ServiceDetail)가 QuoteSection 을 포함하므로 항상 존재.
export function scrollToQuote() {
  const el = document.getElementById("quote");
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    // 첫 입력에 포커스(접근성)
    setTimeout(() => el.querySelector("input")?.focus({ preventScroll: true }), 600);
  }
}
