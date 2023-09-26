/* eslint-disable no-undef */
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({  mode }) => {

  
  const env = loadEnv(mode, process.cwd(), '');

  return {

    plugins: [react()],
    define: {
      'process.env.REACT_APP_SERVER_URL': JSON.stringify(env.REACT_APP_SERVER_URL)
    }
  }
})
