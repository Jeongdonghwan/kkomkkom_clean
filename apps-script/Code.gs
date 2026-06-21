/**
 * 꼼꼼클린 견적 폼 → 구글시트 적재 (Apps Script 웹앱)
 *
 * 배포 절차:
 *  1) 구글시트 1행 헤더: timestamp | name | phone | addr | size | services | date | memo
 *  2) 확장 프로그램 → Apps Script → 이 코드 붙여넣기
 *  3) 배포 → 새 배포 → 유형: 웹 앱
 *       - 실행: 나(Me)
 *       - 액세스 권한: 모든 사용자(Anyone)
 *  4) 생성된 웹앱 URL → 프론트 src/config.js 의 CONFIG.SHEET_ENDPOINT 에 입력
 *
 *  ※ 코드 변경 후에는 반드시 "새 버전으로 재배포"해야 반영됩니다.
 */
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var d = JSON.parse(e.postData.contents);
    sheet.appendRow([d.timestamp, d.name, d.phone, d.addr, d.size, d.services, d.date, d.memo]);

    // 선택: 새 접수 알림 메일 (받을 주소로 교체 후 주석 해제)
    // MailApp.sendEmail("받을주소@gmail.com", "[견적] " + d.name, d.phone + "\n" + d.services + "\n" + d.memo);

    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
      ContentService.MimeType.JSON
    );
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
