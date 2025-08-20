
import "@/utils/base/initENV.ts"
import AppVue from './App.vue';
// 引入svg注册脚本
import 'virtual:svg-icons-register';
import { App } from 'vue';


// default-passive-events会影响工作流范例的使用
import 'default-passive-events'
import ElementPlus from 'element-plus'
// 自定义样式 
// 32490 新增：时间段输入非数字字符时，点击确认无反应，建议要有提醒
import 'element-plus/es/components/message/style/css'
import 'element-plus/dist/index.css'
import '@/styles/index.scss';
import { dayjs } from 'element-plus';
(dayjs as any).en.weekStart = 1; // 设置每周从周一开始

// 注册vue的实例
init(createApp(AppVue))



/**
 * 
 * @param app vue创建的实例
 * @param reload 是否要更新路由实例
 */
function init(app: App) {
  app.use(ElementPlus)
  // 注册全局组件
  app.mount('#app');

  app.config.errorHandler = (err: any, vm, info) => {
    console.error('Global error handler:', err, info);
    // 当请求js存在缓存自动刷新页面，重新加载
    if (err.message.includes('Failed to fetch dynamically imported module') || err.message.includes('Importing a module script failed')) {
      window.location.reload(); // 或者跳转到首页
    }
  };
}