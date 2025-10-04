import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
// Note: We don't need the Tailwind plugin here because modern Tailwind CSS
// is configured via PostCSS and is picked up by Vite automatically.

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths()
    ],
})
