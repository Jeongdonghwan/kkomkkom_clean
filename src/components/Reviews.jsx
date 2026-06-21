import { useState } from "react";
import { REVIEWS } from "../data/reviews.js";
import StarRating from "./StarRating.jsx";

const PER_PAGE = 4; // 한 페이지 4장 (lg 2열 × 2행)

export default function Reviews() {
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(REVIEWS.length / PER_PAGE);
  const start = page * PER_PAGE;
  const items = REVIEWS.slice(start, start + PER_PAGE);

  return (
    <section id="reviews" className="py-24 bg-card overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-11">
          <span className="reveal inline-block text-brand-soft font-bold tracking-[.22em] text-xs">
            CUSTOMER REVIEWS
          </span>
          <h2 className="reveal text-[clamp(26px,3.4vw,38px)] font-extrabold tracking-[-.02em] mt-2.5" data-d="1">
            고객 후기
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {items.map((r) => (
            <article
              key={`${r.n}-${r.d}`}
              className="bg-white border border-black/5 rounded-xl2 p-6 flex flex-col"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-extrabold text-[15px]">{r.n}</div>
                  <div className="text-muted text-[12.5px] mt-0.5">{r.m}</div>
                </div>
                <StarRating value={r.rating} />
              </div>
              <p className="mt-3.5 text-sm text-[#3a423c] leading-relaxed grow">{r.b}</p>
              <div className="mt-4 flex items-center gap-1.5 text-[12.5px] text-brand-light font-bold">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                시공 완료 · {r.d}
              </div>
            </article>
          ))}
        </div>

        {pageCount > 1 && (
          <div className="flex justify-center gap-2.5 mt-9">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-label={`후기 ${i + 1}페이지`}
                aria-current={i === page}
                className={`h-2.5 rounded-full transition-all ${
                  i === page ? "w-7 bg-brand" : "w-2.5 bg-brand/25 hover:bg-brand/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
