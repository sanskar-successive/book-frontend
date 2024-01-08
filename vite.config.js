/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["src/setupTest.js"],
    coverage: {
        provider:'v8',
        include: ['src/**/*.{js,jsx}'], // specify files to include
        exclude: ['src/generated/**/*.js'],    
        reporter: ['text', 'html', 'json'],
        enabled:true  ,
        reportOnFailure : true
      },
  
  },
});
