# CLAUDE.md — 꼼꼼클린 토탈 홈케어 랜딩페이지

> Claude Code 작업 지시서. 디자인 초안(`kkomkkom-clean.html`)을 **실제 배포 가능한 프로젝트로 전환**하는 것이 목표.
> 초안 HTML은 **디자인·인터랙션의 single source of truth**다. 색/간격/모션은 초안을 기준으로 재현할 것.

---

## 1. 프로젝트 개요

- **브랜드**: 꼼꼼클린 (프리미엄 토탈 홈케어)
- **유형**: 단일 페이지(원페이지) 마케팅 랜딩 + 서비스별 상세 서브페이지(추후)
- **서비스 6종**: 입주청소 · 줄눈시공 · 탄성코트 · 나노코팅 · 베이크아웃 · 에어컨분해청소
- **핵심 목표**: 견적 문의 전환. 모든 동선이 ①견적 폼 ②카카오 상담으로 수렴.
- **데이터 관리**: 별도 DB 없음. **견적 문의는 구글시트로 적재**(Apps Script 웹앱). 백엔드 불필요.

---

## 2. 기술 스택 / 빌드 전환 (필수)

초안은 **Tailwind Play CDN**을 쓰고 있어 콘솔 경고가 뜨고 프로덕션 부적합. **반드시 빌드 체계로 전환**한다.

- **Vite + React + Tailwind CSS(PostCSS)** 정적 빌드 → 결과물(`dist/`)을 정적 호스팅(Cafe24 가상서버)에 업로드
  - 단일 페이지지만 섹션 단위 컴포넌트 분리를 위해 React 채택(유지보수성).
  - 백엔드/DB 없음. 폼은 Apps Script로 직접 POST.
- Play CDN(`<script src="cdn.tailwindcss.com">`) 제거 → `tailwind.config.js` + `postcss.config.js` + `index.css(@tailwind base/components/utilities)`로 이전.
- 초안 `<script>tailwind.config={...}</script>`의 `theme.extend`(색·폰트·키프레임·애니메이션)를 **그대로** `tailwind.config.js`로 옮길 것.
- Pretendard: CDN 링크 유지하거나 npm(`pretendard`) 설치 후 `@font-face` 자가호스팅(배포 안정성↑).

권장 구조:
```
src/
  main.jsx
  App.jsx
  index.css                # @tailwind 지시문 + 커스텀 keyframes/유틸
  config.js                # ⚙️ CONFIG (전화/카카오/시트 URL)
  components/
    Header.jsx  Hero.jsx  About.jsx  Services.jsx
    BeforeAfter.jsx  Portfolio.jsx  ChannelBanner.jsx
    Process.jsx  Reviews.jsx  Footer.jsx
    FloatingButtons.jsx  QuoteModal.jsx  Toast.jsx
  hooks/
    useReveal.js           # IntersectionObserver 등장 애니메이션
    useCountUp.js
  data/
    reviews.js  services.js
public/
  images/                  # 실제 사진 자산
apps-script/
  Code.gs                  # 시트 연동 스크립트(아래 8번)
```

---

## 3. 디자인 토큰 (초안 기준, 변경 금지)

```
colors:
  brand        #2E5A43   (딥그린, 기본)
  brand.light  #3F7A5A   (CTA/버튼)
  brand.soft   #6FA386   (eyebrow/액센트/포커스링)
  brand.deep   #1d2c24   (푸터 배경)
  ink          #1C211E   (본문 텍스트)
  muted        #6E756F   (보조 텍스트)
  kakao        #FEE500   / 카카오 텍스트 #3A1D1D
  paper        #FBFBF9   (페이지 배경)
  card         #ECEEE9   (섹션 배경)
typography:
  전부 Pretendard. display=extrabold(800), body=medium/semibold
  섹션 제목 clamp(26px,3.4vw,38px) / 히어로 clamp(34px,5.6vw,62px)
  eyebrow: 12px, bold, letter-spacing .22em, brand.soft, 영문 대문자
radius: 카드 20px(rounded-xl2), 칩/버튼 999px(pill)
spacing: 섹션 상하 패딩 py-24(모바일 자동 축소), 컨테이너 max-w 1160px / px-6
```

---

## 4. 절대 규칙 (브랜드 일관성)

1. **이모지·픽토그램 문자(📝 💬 ☰ ▶ N ★→대체검토 등) 사용 금지.** 모든 아이콘은 **라인 SVG**(stroke 방식, `stroke-width` 2~2.6, `currentColor`)로 통일. 초안의 SVG 스타일을 그대로 사용.
   - 별점은 현재 `★★★★★` 텍스트 사용 중 — 라인 스타 SVG로 교체 권장(통일성).
2. **폰트는 Pretendard만.** 시스템 폰트 폴백만 허용.
3. **카피 톤**: 토스/당근 같은 담백한 문장. "세심함을 담아 진심으로" 같은 추상적 미사여구 지양, **구체적 약속**(당일 예약 가능 / 분해 사진 공유 / 정찰 견적제 / A/S 보장)으로 대체.
4. 색·radius는 토큰 외 임의 추가 금지.
5. 접근성: 키보드 포커스 가시화, `prefers-reduced-motion` 존중(초안에 구현됨 — 유지).

---

## 5. 섹션 구조 (순서 고정)

1. **Header(sticky)** — 로고 + 메뉴(서비스/작업보기/시공과정/후기) + 카카오상담 버튼. 스크롤 20px 초과 시 `.scrolled`(반투명+blur+그림자). 모바일 햄버거.
2. **Hero** — 풀높이(100svh), 다크 그라데이션 배경 + 떠다니는 블러 orb 2개. 헤드라인 순차 등장. CTA 2개(무료 견적 / 전화). 하단 스크롤 인디케이터.
3. **About + Stats** — 좌측 카피, 우측 통계 4박스(99% 카운트업, 6대 서비스 카운트업, 직영, 친환경).
4. **Services** — 6장 카드 그리드. 호버 시 이미지 줌 + 카드 리프트. 다크 그라데이션 오버레이 위 흰 텍스트.
5. **Before/After** — **드래그형 비교 슬라이더(시그니처)**. 우측에 설명 + 라인 체크리스트.
6. **Portfolio** — 4장 갤러리, 호버 줌.
7. **Channel banner** — 네이버 블로그/유튜브 외부 연결.
8. **Process** — 실제 진행 순서 5단계(상담·견적→방문점검→직영시공→실시간공유→검수·AS). 번호는 실제 시퀀스 의미.
9. **Reviews** — 양방향 무한 마퀴 2줄, 마우스 호버 시 정지.
10. **Footer** — 사업자정보/바로가기/문의.
11. **Floating buttons** — 우하단 견적(펄스)·카카오. PC=라벨+아이콘, ≤560px=아이콘만 원형.
12. **Quote modal** — 견적 폼(아래 7번).

---

## 6. 인터랙션 / 애니메이션 명세

| 요소 | 동작 | 구현 |
|---|---|---|
| 등장 애니메이션 | 뷰포트 진입 시 아래→위 페이드업, 카드 stagger(`data-d` 0~5) | IntersectionObserver, threshold .15, 1회성(unobserve) |
| 카운트업 | 통계 숫자 0→목표값 | IntersectionObserver threshold .6, `data-target` |
| Before/After 슬라이더 | 핸들 드래그로 after 영역 `clip-path: inset()` 조절 | pointer 이벤트(down/move/up), 터치 대응 `touch-action:none` |
| 후기 마퀴 | 두 줄 반대 방향 무한 스크롤 | CSS `@keyframes scrollx`(translateX -50%), 데이터 2배 복제, hover pause |
| 헤더 | 스크롤 시 `.scrolled` 토글 | scroll passive 리스너 |
| 모달 | scale/opacity 트랜지션, ESC·배경 클릭 닫기, body 스크롤 잠금 | — |
| reduced-motion | 모든 애니메이션 비활성, 콘텐츠는 즉시 표시 | media query(초안 포함) |

---

## 7. 견적 폼 명세

**필드**: 이름(필수) · 연락처(필수) · 지역/단지명 · 평수 · 서비스(6종 체크박스, 중복) · 희망 시공일(date) · 추가 요청사항(textarea) · **개인정보 수집·이용 동의(필수 체크박스)**.

**검증**: 이름·연락처 빈값 / 동의 미체크 시 토스트로 안내 후 중단.

**스팸 차단**: honeypot 숨김 input(`f_company`)에 값 있으면 조용히 무시. (필요 시 제출 간격 제한 추가)

**전송**: `CONFIG.SHEET_ENDPOINT`로 `fetch` POST.
- `mode:"no-cors"`, `Content-Type: text/plain;charset=utf-8` → Apps Script CORS 프리플라이트 회피.
- no-cors라 응답 못 읽음 → **낙관적 성공 처리**(토스트 + 폼 리셋). 실패 시 카카오 안내.
- 전송 페이로드 키: `timestamp, name, phone, addr, size, services, date, memo`.

---

## 8. 구글시트 연동 (Apps Script)

1. 구글시트 1행 헤더: `timestamp | name | phone | addr | size | services | date | memo`
2. 확장 프로그램 → Apps Script → 아래 코드 → 배포(웹 앱 / 실행:나 / 액세스:모든 사용자)
3. 생성된 웹앱 URL을 `CONFIG.SHEET_ENDPOINT`에 입력.

```javascript
function doPost(e){
  try{
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var d = JSON.parse(e.postData.contents);
    sheet.appendRow([d.timestamp,d.name,d.phone,d.addr,d.size,d.services,d.date,d.memo]);
    // 선택: 새 접수 알림 메일
    // MailApp.sendEmail("받을주소@gmail.com","[견적] "+d.name, d.phone+"\n"+d.services+"\n"+d.memo);
    return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
  }catch(err){
    return ContentService.createTextOutput(JSON.stringify({ok:false,error:String(err)})).setMimeType(ContentService.MimeType.JSON);
  }
}
```

> 코드 변경 후에는 반드시 **새 버전으로 재배포**해야 반영됨.

---

## 9. CONFIG (교체 필수)

`src/config.js`로 분리:
```javascript
export const CONFIG = {
  PHONE: "01000000000",                                    // 숫자만
  KAKAO_URL: "https://pf.kakao.com/_YOUR_CHANNEL/chat",    // 카카오 채널 chat URL
  SHEET_ENDPOINT: "https://script.google.com/macros/s/배포ID/exec",
};
```
그 외 교체: 푸터 사업자등록번호·주소, 채널 banner의 블로그/유튜브 링크, 브랜드명("꼼꼼클린").

---

## 10. 이미지 자산 매핑

초안에서 `data-img` 표시된 요소는 전부 **그라데이션 플레이스홀더**. 실제 사진으로 교체.
**스톡 이미지 금지** — 실제 시공 현장 사진만 사용(이 업종은 사진 진정성=신뢰=전환).

| 위치 | 필요한 사진 |
|---|---|
| Hero 배경(선택) | 깨끗한 거실/주방 와이드 컷(어두운 톤이면 그라데이션 유지도 가능) |
| Services 6장 | 각 서비스 대표 컷(입주청소/줄눈/탄성코트/나노코팅/베이크아웃/에어컨) |
| **Before/After 슬라이더** | **동일 구도로 찍은 전·후 1쌍**(필수, 슬라이더 효과 핵심). 우선 에어컨 분해청소 추천 |
| Portfolio 4장 | 줄눈 / 나노코팅 / 에어컨 / 탄성코트 현장 |

- 포맷 WebP, lazy-load(`loading="lazy"`), 적절한 `width/height`로 CLS 방지.

---

## 11. 반응형 / 품질 기준

- 브레이크포인트: `md`(≤900 한 줄로) / `560px`(서비스·갤러리·후기 1열, 플로팅 버튼 아이콘만).
- iOS 홈바 겹침: 플로팅 버튼 `env(safe-area-inset-bottom)` 적용(초안 반영).
- Lighthouse 목표: 성능/접근성/SEO 90+.
- SEO: 메타 description, OG 태그, `<title>`, 시맨틱 태그, 서비스 상세는 별도 URL로(추후).

---

## 12. 남은 작업 체크리스트

- [ ] Play CDN → Vite + Tailwind(PostCSS) 빌드 전환
- [ ] 섹션 컴포넌트 분리(2번 구조)
- [ ] CONFIG 3종 실제값 입력(전화·카카오·시트 URL)
- [ ] Apps Script 배포 후 폼 end-to-end 테스트(시트 적재 확인)
- [ ] 실제 사진 교체(특히 Before/After 전·후 1쌍)
- [ ] 푸터 사업자정보·채널 링크 입력
- [ ] 별점 ★ → 라인 SVG 교체(이모지/픽토그램 금지 규칙 준수)
- [ ] 반응형·접근성·Lighthouse 점검
- [ ] (후속) 서비스 상세 6페이지 — 메인과 동일 토큰/톤, 템플릿: 서비스 정의→Before/After→공정→장비/자재→가격/견적유도→후기→CTA
- [ ] 배포: `dist/` 빌드 → Cafe24 정적 업로드

---

## 13. 참고

- 디자인·모션의 기준은 첨부된 `kkomkkom-clean.html`. 토큰/간격/애니메이션은 이 파일을 재현하고, 위 규칙과 충돌하면 **이 문서가 우선**.
