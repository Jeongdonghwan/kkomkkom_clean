import { CONFIG, BUSINESS, formatPhone } from "../config.js";
import { openKakao } from "../ui.jsx";
import Logo from "./Logo.jsx";

const LINKS = [
  { href: "#top", label: "홈" },
  { href: "#services", label: "서비스" },
  { href: "#work", label: "작업보기" },
  { href: "#reviews", label: "후기" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-deep text-[#cdd6cf] pt-14 pb-10">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        <div>
          <div className="mb-3.5">
            <Logo variant="light" showTagline={false} />
          </div>
          <p className="text-[#aab8b0] text-sm leading-relaxed">
            세심함을 담아 진심으로 청소하는
            <br />
            프리미엄 토탈 홈케어 서비스
          </p>
          {/* TODO: 실제 사업자등록번호·주소로 교체 (src/config.js BUSINESS) */}
          <p className="text-[#8a988f] text-[12.5px] mt-4 leading-relaxed">
            사업자등록번호: {BUSINESS.regNo}
            <br />
            주소: {BUSINESS.address}
          </p>
        </div>
        <div>
          <h5 className="text-white font-extrabold text-[16px] mb-3.5">바로가기</h5>
          <div className="flex flex-col gap-2.5 text-sm">
            {LINKS.map((l) => (
              <a key={l.href} href={`/${l.href}`} className="hover:text-white transition w-fit">
                {l.label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h5 className="text-white font-extrabold text-[16px] mb-3.5">문의하기</h5>
          <div className="flex flex-col gap-2.5 text-sm">
            <button onClick={openKakao} className="hover:text-white transition w-fit text-left">
              카카오상담
            </button>
            <a href={`tel:${CONFIG.PHONE}`} className="hover:text-white transition w-fit">
              {formatPhone(CONFIG.PHONE)}
            </a>
            <span className="text-[#8a988f]">
              {BUSINESS.hours}
              <br />
              {BUSINESS.hoursNote}
            </span>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 border-t border-white/10 mt-9 pt-6 text-[12.5px] text-[#8a988f]">
        © 2025 {BUSINESS.name}. All Rights Reserved.
      </div>
    </footer>
  );
}
