// 로컬 개발용 목(mock) API — 프로덕션 Flask(server/app.py)와 동일한 인터페이스.
// 실행: node scripts/dev-api.mjs  (vite dev 서버가 /api 요청을 이쪽으로 프록시)
// 관리자 계정: admin / 1234
import http from "node:http";

const ADMIN_ID = "admin";
const ADMIN_PW = "1234";
let nextId = 3;
const rows = [
  {
    id: 2,
    created_at: "2026-07-27 14:20",
    name: "김테스트",
    phone: "010-1111-2222",
    addr: "안양 한가람한양",
    size: "33",
    services: "입주청소, 에어컨분해청소",
    hope_date: "2026-08-10",
    memo: "이사 전 주말 희망합니다",
  },
  {
    id: 1,
    created_at: "2026-07-26 09:05",
    name: "박샘플",
    phone: "010-3333-4444",
    addr: "평촌",
    size: "24",
    services: "줄눈시공",
    hope_date: "",
    memo: "",
  },
];

const json = (res, code, body) => {
  res.writeHead(code, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(body));
};

http
  .createServer((req, res) => {
    const url = new URL(req.url, "http://localhost");

    if (req.method === "POST" && url.pathname === "/api/inquiry") {
      let raw = "";
      req.on("data", (c) => (raw += c));
      req.on("end", () => {
        let d;
        try {
          d = JSON.parse(raw);
        } catch {
          return json(res, 400, { ok: false, error: "bad_json" });
        }
        if (d.company) return json(res, 200, { ok: true }); // honeypot
        if (!d.name?.trim() || !d.phone?.trim())
          return json(res, 400, { ok: false, error: "invalid_input" });
        rows.unshift({
          id: nextId++,
          created_at: new Date().toISOString().slice(0, 16).replace("T", " "),
          name: d.name.trim(),
          phone: d.phone.trim(),
          addr: d.addr || "",
          size: d.size || "",
          services: d.services || "",
          hope_date: d.date || "",
          memo: d.memo || "",
        });
        console.log("접수:", d.name, d.phone);
        json(res, 200, { ok: true });
      });
      return;
    }

    if (req.method === "GET" && url.pathname === "/api/list") {
      const id = req.headers["x-admin-id"] || "";
      const pw = req.headers["x-admin-pw"] || "";
      if (id !== ADMIN_ID || pw !== ADMIN_PW)
        return json(res, 401, { ok: false, error: "unauthorized" });
      return json(res, 200, { ok: true, rows });
    }

    json(res, 404, { ok: false, error: "not_found" });
  })
  .listen(8787, () => console.log("목 API: http://localhost:8787 (관리자 계정: admin / 1234)"));
