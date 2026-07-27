import { useCallback, useEffect, useState } from "react";
import { CONFIG } from "../config.js";

// 견적 문의 관리 — 숨은 페이지(/admin). 아이디/비밀번호로 서버 목록 조회.
const AUTH_STORAGE = "kk_admin_auth";

const loadAuth = () => {
  try {
    const v = JSON.parse(localStorage.getItem(AUTH_STORAGE));
    return v?.id && v?.pw ? v : null;
  } catch {
    return null;
  }
};

const th = "px-3.5 py-3 text-left text-[13px] font-extrabold text-muted whitespace-nowrap";
const td = "px-3.5 py-3 text-[14px] align-top";
const inputCls =
  "w-full border border-black/10 rounded-xl px-3.5 py-3 bg-paper focus:outline-none focus:ring-2 focus:ring-brand-soft";

export default function Admin() {
  const [auth, setAuth] = useState(loadAuth);
  const [idInput, setIdInput] = useState("");
  const [pwInput, setPwInput] = useState("");
  const [rows, setRows] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "견적 문의 관리 | 꼼꼼클린";
    return () => {
      document.title = "꼼꼼클린 | 프리미엄 토탈 홈케어";
    };
  }, []);

  const load = useCallback(async (a) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${CONFIG.API_BASE}/list.php`, {
        headers: { "X-Admin-Id": a.id, "X-Admin-Pw": a.pw },
      });
      const out = await res.json().catch(() => null);
      if (res.status === 401) {
        localStorage.removeItem(AUTH_STORAGE);
        setAuth(null);
        setRows(null);
        setError("아이디 또는 비밀번호가 올바르지 않습니다.");
        return;
      }
      if (!res.ok || !out?.ok) throw new Error(out?.error || res.status);
      setRows(out.rows);
    } catch (err) {
      setError("목록을 불러오지 못했습니다. 서버 상태를 확인해주세요.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (auth) load(auth);
  }, [auth, load]);

  const login = () => {
    const id = idInput.trim();
    const pw = pwInput;
    if (!id || !pw) return;
    const a = { id, pw };
    localStorage.setItem(AUTH_STORAGE, JSON.stringify(a));
    setAuth(a);
    setPwInput("");
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE);
    setAuth(null);
    setRows(null);
  };

  // 로그인 화면
  if (!auth) {
    return (
      <section className="min-h-[70svh] grid place-items-center px-6 pt-24 pb-16">
        <div className="w-full max-w-sm bg-white rounded-[20px] border border-black/5 shadow-xl p-8">
          <span className="inline-block text-brand-soft font-bold tracking-[.22em] text-xs">ADMIN</span>
          <h1 className="text-[24px] font-extrabold tracking-[-.02em] mt-2">견적 문의 관리</h1>
          <p className="text-muted text-sm mt-2">관리자 계정으로 로그인해주세요.</p>
          <input
            type="text"
            autoComplete="username"
            className={`${inputCls} mt-5`}
            placeholder="아이디"
            value={idInput}
            onChange={(e) => setIdInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
          />
          <input
            type="password"
            autoComplete="current-password"
            className={`${inputCls} mt-3`}
            placeholder="비밀번호"
            value={pwInput}
            onChange={(e) => setPwInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
          />
          {error && <p className="text-red-500 text-[13px] mt-2.5">{error}</p>}
          <button
            onClick={login}
            className="w-full bg-brand-light hover:bg-[#356a4d] text-white rounded-xl py-3.5 font-extrabold transition mt-4"
          >
            로그인
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-28 pb-24 max-w-6xl mx-auto px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="inline-block text-brand-soft font-bold tracking-[.22em] text-xs">ADMIN</span>
          <h1 className="text-[clamp(24px,3.2vw,34px)] font-extrabold tracking-[-.02em] mt-2">
            견적 문의 관리
          </h1>
          {rows && (
            <p className="text-muted text-sm mt-1.5">
              총 <b className="text-ink">{rows.length}</b>건 (최근 500건까지 표시)
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => load(auth)}
            disabled={loading}
            className="inline-flex items-center gap-2 bg-brand text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-brand-light transition disabled:opacity-60"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" />
            </svg>
            {loading ? "불러오는 중..." : "새로고침"}
          </button>
          <button
            onClick={logout}
            className="border border-black/10 bg-white text-ink px-5 py-2.5 rounded-full font-bold text-sm hover:border-brand-soft transition"
          >
            로그아웃
          </button>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mt-6">{error}</p>}

      {rows && rows.length === 0 && (
        <div className="mt-10 bg-white border border-black/5 rounded-[20px] p-12 text-center text-muted">
          아직 접수된 견적 문의가 없습니다.
        </div>
      )}

      {rows && rows.length > 0 && (
        <div className="mt-8 bg-white border border-black/5 rounded-[20px] shadow-sm overflow-x-auto">
          <table className="w-full min-w-[860px] border-collapse">
            <thead>
              <tr className="border-b border-black/10">
                <th className={th}>접수일시</th>
                <th className={th}>이름</th>
                <th className={th}>연락처</th>
                <th className={th}>지역/단지</th>
                <th className={th}>평수</th>
                <th className={th}>서비스</th>
                <th className={th}>희망일</th>
                <th className={th}>요청사항</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-black/5 last:border-0 hover:bg-paper transition">
                  <td className={`${td} whitespace-nowrap text-muted`}>{r.created_at}</td>
                  <td className={`${td} font-bold whitespace-nowrap`}>{r.name}</td>
                  <td className={`${td} whitespace-nowrap`}>
                    <a href={`tel:${r.phone}`} className="text-brand-light font-semibold hover:underline">
                      {r.phone}
                    </a>
                  </td>
                  <td className={td}>{r.addr}</td>
                  <td className={`${td} whitespace-nowrap`}>{r.size && `${r.size}평`}</td>
                  <td className={td}>{r.services}</td>
                  <td className={`${td} whitespace-nowrap`}>{r.hope_date}</td>
                  <td className={`${td} text-muted max-w-[260px]`}>{r.memo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
