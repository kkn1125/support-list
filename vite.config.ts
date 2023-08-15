import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dotenv from "dotenv";

export default defineConfig(({ command, mode, ssrBuild }) => {
  // 현재 작업 디렉터리의 `mode`를 기반으로 env 파일을 불러옴
  // 세 번째 매개변수를 ''로 설정하면 `VITE_` 접두사에 관계없이 모든 환경 변수를 불러옴
  const env = loadEnv(mode, process.cwd(), "");
  const MODE = process.env.NODE_ENV || "production";

  dotenv.config({
    path: path.join(path.resolve(), ".env"),
  });
  // dotenv.config({
  //   path: path.join(path.resolve(), `.env.${MODE}`),
  // });

  return {
    // Vite 설정
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    server: {
      host: process.env.HOST,
      port: Number(process.env.PORT) || 3000,
    },
    plugins: [react()],
  };
});
