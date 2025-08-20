
interface FitsSetting {
    /**
     * @description 项目配置, 必填
     */
    project: FitsProjectSetting
    /**
     * @description 系统配置, 非必填，可以取默认值
     */
    system?: FitsSystemSetting | ExpandMethod,
    /**
     * @description 子系统名称
     */
    modules?: string

}

/**
 * 项目配置
 */
interface FitsProjectSetting {
    /**
     * @description 网站标题，项目名称
     */
    title: string,
    /**
     * @description 网站副标题, 英文标题
     */
    subTitle: string
    /**
     * @description 公司名字
     */
    company: string;
    /**
     * @description 版本号
     * @default {1.0.0}
     */
    version: string;
    /**
     * @description 项目的接口地址
     * @example  http://192.168.32.60:3005/mock/78/api,
     */
    api_address: string;
    /**
     * @description 项目的接口超时时间，也就是接口请求超过多少秒之后，会返回超时状态
     * @default {15000} 单位：毫秒
     */
    http_timeout: number;
    /**
     * @description 是否开启内嵌旧康复
     * @default {false}
     */
    isEmbed?: boolean;
    /**
     * @description 医生工作站的项目地址
     * @default {false}
     */
    doctor_address?: string;
    /**
     * @description 电子病历的地址
     * @default {false}
     */
    emr_linkUrl?: string;
    /**
     * @description 治疗文书页眉
     * @default {false}
     */
    treat_document_header?: boolean;
}

/**
 * 系统配置
 */
interface FitsSystemSetting {
    /**
      * @desrciption 路由控制，前端控制路由，还是后端控制路由
      * @default {backend}
      */
    routerControl: 'backend' | 'frontend'
    /**
       * @desrciption 输出的文件夹名字
       * @default {FitsAdmin}
       */
    dir: string
    /**
       * @desrciption 是否开启调试模式
       * @default {false}
       */
    isDebug: boolean
    /**
       * @desrciption 是否开启自适应，这个只能在开发阶段调试使用，正式环境下使用慎重
       * @default {false}
       */
    px2rem: boolean
    /**
     * @desrciption 是否显示错误日志
     * @default {true}
     */
    errorLog: boolean
    /**
     * @desrciption 倒计时的时间
     * @default {30} 单位是秒
     */
    coutDownTime: number
    /**
     * @desrciption 是否开启所有页面缓存
     * @default {true} 
     */
    keepalive: boolean
    /**
     * @desrciption 最大缓存页面的数量
     * @default {20} 
     */
    keepaliveMax: number
    /**
     * @desrciption 是否需要默认首页
     * @default {false} 
     */
    defaultHome: boolean
}


// 拓展属性，为了解决dev.ts中部分属性没有写，就出现类型报错的问题
interface ExpandMethod {
    [k: string]: any
}
