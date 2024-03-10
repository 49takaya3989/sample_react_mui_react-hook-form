/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // default
    // include: ['**/*.{test,spec}.ts']

    globals: true, // describe や it を import なしで使う
    environment: 'jsdom', // テストファイルでレンダーした要素の定義
    setupFiles: ['./src/MUI+RHF_with_controller_and_zod/__test__/setup.ts'], // setup に必要なファイルを定義するためのファイル
    include: ['src/**/*.test.ts?(x)'],
  },
})
