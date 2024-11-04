import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    build: {
      sourcemap: false,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
        },
      },
    },
    define: {
      // This is required for env variables to work
      'process.env': Object.assign({}, process.env, env),
    },
  };
});
