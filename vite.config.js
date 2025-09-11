import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: env.VITE_REACT_APP_BASE_URL || '/',
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    plugins: [react(), tailwindcss()],
    optimizeDeps: {
      esbuildOptions: {
        loader: {
          '.js': 'jsx'
        },
      }
    }
  }
})
