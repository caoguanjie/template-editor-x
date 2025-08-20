/// <reference types="vite/client" />

declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions
  export default componentOptions
}

// 环境变量 TypeScript的智能提示
interface ImportMetaEnv {
  VITE_APP_TITLE: string;
  VITE_APP_PORT: string;
  VITE_APP_BASE_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  interface Window {
    // 是否存在无界
    __POWERED_BY_WUJIE__?: boolean;
    // 子应用mount函数
    __WUJIE_MOUNT: () => void;
    // 子应用unmount函数
    __WUJIE_UNMOUNT: () => void;
    // 子应用无界实例
    __WUJIE: { mount: () => void };
    $wujie: {
      bus: any;
      shadowRoot?: ShadowRoot;
      props?: { [key: string]: any };
      location?: any;
    }
    ipcRenderer: any,
    systemSetting: FitsSetting,
    nextLoading: boolean;
    ENV: FitsSetting;
    // 治疗卡是否加载完毕
    isCreateReceiveOrderRef: boolean;
    // 触发刷新治疗卡数据方法
    setHisReceiveOrderData: () => void;
    // 治疗卡入参数据
    OrderJson: any;
    // 关闭治疗卡的回调参数
    orderCallBackObj: any;
  }
}

export { }