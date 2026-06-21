import { useEffect, useRef, useState } from "react";

/* 뷰포트 진입(threshold .6) 시 0 → target 카운트업. 초안 setInterval 방식 재현. */
export function useCountUp(target) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting) return;
        io.unobserve(el);

        let n = 0;
        const step = Math.max(1, Math.round(target / 40));
        const t = setInterval(() => {
          n += step;
          if (n >= target) {
            n = target;
            clearInterval(t);
          }
          setValue(n);
        }, 22);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return [ref, value];
}
