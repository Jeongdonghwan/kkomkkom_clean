/* ============================================================
   ⚙️ CONFIG — 배포 전 이 값만 실제값으로 교체하세요
   ============================================================ */
export const CONFIG = {
  PHONE: "01024402443",
  KAKAO_URL: "https://pf.kakao.com/_CtWsn/chat", // 꼼꼼클린 카카오 채널 1:1 채팅
  API_BASE: "/api", // 견적 접수·조회 API (서버 Flask, 로컬 dev는 scripts/dev-api.mjs 프록시)
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

// 푸터 사업자 정보
export const BUSINESS = {
  name: "꼼꼼클린",
  owner: "이준호",
  regNo: "521-04-03123",
  address: "경기도 안양시 동안구 학의로 126, 지하층 제9호(관양동, 한가람한양아파트 상가동)",
  hours: "평일 09:00 - 18:00",
  hoursNote: "주말·공휴일 상담 가능",
};
