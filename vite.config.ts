/* eslint-disable @typescript-eslint/no-var-requires */
// @see: https://gitee.com/holysheng/vite2-config-description/blob/master/vite.config.ts
import { fileURLToPath, URL } from 'node:url'
import { UserConfig, ConfigEnv, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';
import fs from 'fs';
import svgLoader from 'vite-svg-loader'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import type { Plugin, ResolvedConfig } from 'vite'
import removeConsole from 'vite-plugin-remove-console';
import dev from './src/environment/dev'
import prod from './src/environment/prod'
import emebed from './src/environment/emebed'
import px2rem from 'postcss-plugin-px2rem';


const moduleName = process.env['npm_config_project'] // 使用`--project=[module_name]`获取模块名
const basePath = process.env['npm_config_path'] // 使用`--project=[module_name]`获取模块名
// const rootPath = !moduleName ? `./` : `./src/apps/${moduleName}`
export default ({ mode }: ConfigEnv): UserConfig => {
  console.log('当前构建模块：', process.env['npm_config_project'], basePath)
  // 获取 .env 环境配置文件
  const env = loadEnv(mode, process.cwd());
  // 把所有的环境变量都放到全局变量ENV中,每次新建环境变量都需要静态导入到vite这里来，进行配置
  const loadENV = { dev, prod, emebed }
  const isDev = mode === 'dev'
  // console.log(loadENV[mode], mode)
  return {
    base: mode === 'github' ? '/template-editor-x/' : `/`,
    // 定义全局常量替换方式。其中每项在开发环境下会被定义在全局，而在构建时被静态替换。
    define: {
      ENV: JSON.stringify(loadENV['dev']),
    },
    plugins: [
      // 自动导入elment-plus
      AutoImport({

        imports: ['vue', 'vue-router', '@vueuse/core', { 'moment': [['default', 'moment']] }],
        dts: fileURLToPath(new URL('./src/auto-imports.d.ts', import.meta.url)),
        resolvers: [ElementPlusResolver()],
        eslintrc: {
          enabled: true, // Default `false`
          filepath: fileURLToPath(new URL('./.eslintrc-auto-import.json', import.meta.url)), // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },

      }),
      Components({
        dts: fileURLToPath(new URL('./src/components.d.ts', import.meta.url)),
        dirs: '',
        directoryAsNamespace: true,
        resolvers: isDev ? undefined : [ElementPlusResolver()]
      }),


      vue(),
      // 不是开发环境，清空console
      !isDev && removeConsole(),
      svgLoader(),
      // 命名组件名字的插件
      vueSetupExtend(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: ((): string[] => {
          const iconFilesName = ['icons', 'layout'].map(item => path.resolve(process.cwd(), `src/assets/${item}`));
          const customFilesName = ['src/components/Tiptap/icons'].map(item => path.resolve(process.cwd(), item));
          return [...iconFilesName, ...customFilesName];
        })(),

        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]'
      }),
    ],
    css: {

      // css预处理器
      preprocessorOptions: {
        scss: {
          charset: false,
          // 引入全局scss变量，不过这样有个坑，就是一定要下划线的scss文件路径才引入正常。
          additionalData: '@import "./src/styles/_global.scss";',
        },
      },
    },
    // 本地反向代理解决浏览器跨域限制
    server: {
      // 此处添加以下设置host:0.0.0.0 或true
      // 将监听所有地址，包括局域网和公网地址
      host: '0.0.0.0',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      port: Number(env[`VITE_APP_PORT_${mode}`]),
      open: true, // 运行自动打开浏览器
      // proxy: {
      //   [env.VITE_APP_BASE_API]: {
      //     target: 'http://vue3.youlai.tech',
      //     changeOrigin: true,
      //     rewrite: path =>
      //       path.replace(new RegExp('^' + env.VITE_APP_BASE_API), '')
      //   }
      // }
    },
    resolve: {
      // Vite路径别名配置,fileURLToPath能够解决跨平台和中文路径问题
      alias: (() => {
        // 子模块的目录数组，例如：['yuyue', 'kangfu']
        const config = {
          '@': fileURLToPath(new URL('./src', import.meta.url)),
        }
        return config
      })(),
    },
    build: {
      minify: 'terser',
      rollupOptions: {
        treeshake: false,//关闭摇树优化，devExpress组件需要，否则工具栏异常
        // input: path.resolve(__dirname, `${rootPath}/index.html`), // 指定子模块入口文件
        output: {
          manualChunks: {
            // 设置 manualChunks方案，将echarts单独打包并通过按需引入减少主包体积，
            // 这种方式可以跟unplugin-auto-import形成互补，当用unplugin-auto-import无法实现按需自动加载的功能是，可以用manualChunks方案减少包体积大小
            echarts: ['echarts'],
            vxetable: ['vxe-table', 'vxe-pc-ui']
          }
        },
      }
    }
  };
};



/**
 * 获取apps子模块的目录名称
 * @param srcPath 
 * @returns 
 */
function getDirectories(srcPath: string) {
  return fs.readdirSync(srcPath).filter(file => {
    return fs.lstatSync(path.join(srcPath, file)).isDirectory();
  });
}
