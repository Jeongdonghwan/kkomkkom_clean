/** @type {import('tailwindcss').Config} */
// 초안 kkomkkom-clean.html 의 tailwind.config.theme.extend 를 그대로 이전 (디자인 토큰 = single source of truth)
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#2E5A43", light: "#3F7A5A", soft: "#6FA386", deep: "#1d2c24" },
        ink: "#1C211E",
        muted: "#6E756F",
        kakao: "#FEE500",
        paper: "#FBFBF9",
        card: "#ECEEE9",
      },
      fontFamily: {
        sans: ['"Pretendard Variable"', "Pretendard", "system-ui", "sans-serif"],
      },
      borderRadius: { xl2: "20px" },
      keyframes: {
        floaty: {
          "0%,100%": { transform: "translate(0,0)" },
          "50%": { transform: "translate(0,-14px)" },
        },
        orb: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(30px,-20px) scale(1.1)" },
        },
        pulse2: {
          "0%,100%": { boxShadow: "0 0 0 0 rgba(63,122,90,.45)" },
          "70%": { boxShadow: "0 0 0 14px rgba(63,122,90,0)" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        orb: "orb 14s ease-in-out infinite",
        pulse2: "pulse2 2.4s ease-out infinite",
      },
    },
  },
  plugins: [],
};
