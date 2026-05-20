import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  base: "/DCIT26_Lab5/",
  plugins: [react(), tailwindcss()],
});