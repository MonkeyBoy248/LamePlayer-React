import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
  return {
    server:
      mode === 'development'
        ? {
            port: 3300,
            open: true,
          }
        : undefined,
    plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
  };
});
