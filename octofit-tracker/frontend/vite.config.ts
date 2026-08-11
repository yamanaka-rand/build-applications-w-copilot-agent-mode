import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const codespaceName = env.CODESPACE_NAME || env.VITE_CODESPACE_NAME || '';

  return {
    plugins: [react()],
    server: {
      port: 5173,
    },
    define: {
      __APP_CODESPACE_NAME__: JSON.stringify(codespaceName),
    },
  };
});
