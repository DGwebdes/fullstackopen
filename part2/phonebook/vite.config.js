import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/api": {
                target: "https://okies-c5ee.onrender.com:10000",
                changeOrigin: true,
            },
        },
    },
});
