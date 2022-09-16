import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
    server: { https: true },
    base: "/arabic-ocr/",
    plugins: [react(), svgr(), mkcert()]
});
