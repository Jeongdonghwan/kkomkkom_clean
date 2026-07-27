# 꼼꼼클린 견적 API (Flask + MariaDB)
# 실행(운영): gunicorn -b 127.0.0.1:8787 app:app  (systemd 유닛 참고)
import json
import re
from pathlib import Path

import pymysql
from flask import Flask, jsonify, request

CONFIG = json.loads((Path(__file__).parent / "config.json").read_text(encoding="utf-8"))

app = Flask(__name__)

DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")


def db():
    return pymysql.connect(
        host=CONFIG["db_host"],
        db=CONFIG["db_name"],
        user=CONFIG["db_user"],
        password=CONFIG["db_pass"],
        charset="utf8mb4",
        cursorclass=pymysql.cursors.DictCursor,
    )


def clip(v, n):
    return str(v or "").strip()[:n]


@app.post("/api/inquiry")
def inquiry():
    d = request.get_json(silent=True)
    if not isinstance(d, dict):
        return jsonify(ok=False, error="bad_json"), 400

    # honeypot: 봇이 채운 요청은 조용히 성공 처리
    if d.get("company"):
        return jsonify(ok=True)

    name = clip(d.get("name"), 50)
    phone = clip(d.get("phone"), 30)
    if not name or not phone:
        return jsonify(ok=False, error="invalid_input"), 400

    hope_date = clip(d.get("date"), 10)
    if not DATE_RE.match(hope_date):
        hope_date = None

    try:
        conn = db()
        with conn:
            with conn.cursor() as cur:
                cur.execute(
                    "INSERT INTO inquiries (name, phone, addr, size, services, hope_date, memo)"
                    " VALUES (%s,%s,%s,%s,%s,%s,%s)",
                    (
                        name,
                        phone,
                        clip(d.get("addr"), 120),
                        clip(d.get("size"), 20),
                        clip(d.get("services"), 200),
                        hope_date,
                        clip(d.get("memo"), 2000),
                    ),
                )
            conn.commit()
        return jsonify(ok=True)
    except Exception:
        app.logger.exception("inquiry insert failed")
        return jsonify(ok=False, error="db_error"), 500


@app.get("/api/list")
def list_inquiries():
    aid = request.headers.get("X-Admin-Id", "")
    apw = request.headers.get("X-Admin-Pw", "")
    if aid != CONFIG["admin_id"] or apw != CONFIG["admin_pw"]:
        return jsonify(ok=False, error="unauthorized"), 401

    try:
        conn = db()
        with conn:
            with conn.cursor() as cur:
                cur.execute(
                    "SELECT id, DATE_FORMAT(created_at, '%%Y-%%m-%%d %%H:%%i') AS created_at,"
                    " name, phone, addr, size, services,"
                    " IFNULL(DATE_FORMAT(hope_date, '%%Y-%%m-%%d'), '') AS hope_date,"
                    " IFNULL(memo, '') AS memo"
                    " FROM inquiries ORDER BY id DESC LIMIT 500"
                )
                rows = cur.fetchall()
        return jsonify(ok=True, rows=rows)
    except Exception:
        app.logger.exception("inquiry list failed")
        return jsonify(ok=False, error="db_error"), 500


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8787, debug=True)
