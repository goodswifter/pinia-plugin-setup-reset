import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.ts', '.json', '.vue', 'scss'],
  },
  server: {
    port: 10000,
    host: true,
  },
  plugins: [
    vue(),
    UnoCSS({ inspector: false }),
    // 三方库自动导入
    AutoImport({
      imports: ['vue', 'pinia'],
      resolvers: [ElementPlusResolver()],
      dts: 'typings/auto-imports.d.ts', // 生成的类型声明文件路径
    }),
    // 组件自动导入
    Components({
      resolvers: [ElementPlusResolver(), IconsResolver({ enabledCollections: ['ep'] })],
      dts: 'typings/components.d.ts',
      dirs: [],
    }),
    // 图标自动导入
    Icons({ autoInstall: true }),
  ],
})
