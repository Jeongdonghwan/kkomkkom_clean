/* ============================================================
   ⚙️ CONFIG — 배포 전 이 값만 실제값으로 교체하세요
   ============================================================ */
export const CONFIG = {
  PHONE: "01000000000", // TODO: 실제 전화번호 (숫자만)
  KAKAO_URL: "https://pf.kakao.com/_YOUR_CHANNEL/chat", // TODO: 카카오 채널 chat URL
  SHEET_ENDPOINT: "https://script.google.com/macros/s/배포ID/exec", // TODO: Apps Script 웹앱 URL
};

// 전화번호 표시용 포맷 (010-0000-0000)
export function formatPhone(num) {
  const d = String(num).replace(/\D/g, "");
  if (d.length === 11) return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
  return num;
}

// 외부 채널 링크 (TODO: 실제 URL 교체)
export const CHANNELS = {
  BLOG: "#", // TODO: 네이버 블로그 URL
  YOUTUBE: "#", // TODO: 유튜브 채널 URL
};

// 푸터 사업자 정보 (TODO: 실제값 교체)
export const BUSINESS = {
  name: "꼼꼼클린",
  regNo: "000-00-00000", // TODO: 사업자등록번호
  address: "○○도 ○○시 ○○로 000", // TODO: 주소
  hours: "평일 09:00 - 18:00",
  hoursNote: "주말·공휴일 상담 가능",
};
