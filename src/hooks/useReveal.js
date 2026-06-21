import { useEffect } from "react";

/* 뷰포트 진입 시 .reveal 요소에 .in 클래스 부여 (1회성, 초안 IntersectionObserver 재현)
   threshold .15, unobserve 후 재관측 안 함. */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!els.length) return;

    // reduced-motion: 즉시 표시 (CSS에서도 처리되지만 안전망)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
