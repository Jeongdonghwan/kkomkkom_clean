import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { openKakao, scrollToQuote } from "../ui.jsx";
import Logo from "./Logo.jsx";

const NAV = [
  { href: "#services", label: "서비스" },
  { href: "#work", label: "작업보기" },
  { href: "#process", label: "시공과정" },
  { href: "#reviews", label: "후기" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 최상단 + 다크 히어로 위 → 흰색. 스크롤하면 밝은 배경 + 어두운 글자.
  const onDark = !scrolled;
  const navText = onDark ? "text-white/90" : "text-ink";
  const navHover = onDark ? "hover:text-white" : "hover:text-brand";

  // 홈/상세 모두 상단에 다크 히어로가 있으므로 같은 로직 사용.
  // 단, 해시 앵커(#services 등)는 홈에서만 의미 → 상세에선 "/#..."로.
  const navHref = (href) => (isHome ? href : `/${href}`);

  return (
    <header
      id="hdr"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300${scrolled ? " scrolled" : ""}`}
    >
      <div className="max-w-6xl mx-auto px-6 h-[74px] flex items-center justify-between">
        <Link to="/" aria-label="꼼꼼클린 홈">
          <Logo variant={onDark ? "light" : "dark"} />
        </Link>

        <nav className={`hidden md:flex items-center gap-8 font-semibold text-[15px] ${navText}`}>
          {NAV.map((n) => (
            <a key={n.href} href={navHref(n.href)} className={`${navHover} transition`}>
              {n.label}
            </a>
          ))}
          <button
            onClick={openKakao}
            className="bg-kakao text-[#3A1D1D] px-5 py-2.5 rounded-full font-extrabold hover:brightness-95 transition"
          >
            카카오상담
          </button>
        </nav>

        <button
          className={`md:hidden ${onDark ? "text-white" : "text-ink"}`}
          aria-label="메뉴 열기"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-paper/95 backdrop-blur border-t border-black/5 px-6 pb-4">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={navHref(n.href)}
              className="block py-3.5 border-b border-black/5 font-semibold text-ink"
              onClick={() => setMenuOpen(false)}
            >
              {n.label}
            </a>
          ))}
          <button
            className="block w-full text-left py-3.5 font-semibold text-brand"
            onClick={() => {
              setMenuOpen(false);
              openKakao();
            }}
          >
            카카오상담
          </button>
        </div>
      )}
    </header>
  );
}
