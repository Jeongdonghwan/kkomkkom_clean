import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// 라우트 전환 시: 해시(#services 등)가 있으면 해당 요소로, 없으면 페이지 상단으로 스크롤.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // 새 페이지 렌더 후 대상 요소로 스크롤
      const id = hash.replace("#", "");
      const t = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}
