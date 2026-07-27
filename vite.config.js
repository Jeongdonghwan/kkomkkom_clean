import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// 정적 빌드 → dist/ 결과물을 Cafe24 가상서버에 업로드
// 서브경로 배포 시 base 옵션 조정 (예: base: "/")
export default defineConfig({
  plugins: [react()],
  server: {
    // 로컬 개발 시 /api → 목 API (node scripts/dev-api.mjs)
    // 배포 환경에서는 같은 서버의 PHP(public/api/*.php)가 처리하므로 프록시 불필요
    proxy: {
      "/api": "http://localhost:8787",
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
