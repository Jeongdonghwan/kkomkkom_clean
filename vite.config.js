import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// 정적 빌드 → dist/ 결과물을 Cafe24 가상서버에 업로드
// 서브경로 배포 시 base 옵션 조정 (예: base: "/")
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
