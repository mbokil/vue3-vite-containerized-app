import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const mode = (process.env.mode === undefined) ? 'dev' : process.env.mode;
require('dotenv').config({ path: `${__dirname}/config/.env.${mode}` })

const isDevServer = !process.env.hasOwnProperty('NODE_ENV') || process.env.NODE_ENV === 'development';
const propsName = (isDevServer) ? 'APP_PROPS' : 'NULL';
const appProps = {};

for (const [key, value] of Object.entries(process.env)) {
  if (key.includes('VITE')) {
  	appProps[key] = parsePropType(value);
  }
}

function parsePropType(propStr) {
  if (propStr === 'true') {
    return true;
  } else if (propStr === 'false') {
    return false;
  } else if (!isNaN(propStr) && propStr.trim() !== '') {
    return +propStr;
  } else if (propStr.trim() === '') {
    return '';
  } else {
    return propStr;
  }
}

console.log('mode:',mode);
console.log('APP_PROPS:',appProps);

export default defineConfig({
	envDir:'config',
	define: {
    [propsName]: JSON.stringify(appProps)
  },
  plugins: [
  	vue({})
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
