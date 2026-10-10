import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // Large reference videos in the repo root can lock on Windows and crash the watcher.
      ignored: ["**/*.mov", "**/*.mp4"],
    },
  },
});
