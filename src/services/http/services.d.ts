/** 请求的相关类型 */
declare namespace Service {
    import type { Method } from 'alova'

    interface AlovaConfig {
        baseURL: string
        timeout?: number
        beforeRequest?: (method: Method<globalThis.Ref<unknown>>) => void
    }
    // 自定义method的meta元属性大概有哪些参数，可拓展任意值
    interface MethodMeta {
        // 官方自带的授权角色
        authRole: string
        // 是否要加密解密
        encrypt: boolean
        // 是否打开业务错误提示，默认是true
        openErrorTips: boolean
        // 是否开启业务成功提示，默认是false，要自动开启
        openSuccessTips: boolean
        /**
         * 患者队列场景：是指不断切换患者队列的状态（已治疗、未治疗），同一个组件，不同参数，需要取消前序请求，重新发起请求
         * 报表场景：是指同一个组件，不同参数， 获得饼图数据源还是柱状图数据源，需要并行请求，不取消前序请求
         * 请求策略类型：
         * - 'latest'：总是取消前序请求（患者队列场景）， 默认策略
         * - 'parallel'：允许并行请求（报表场景）
         */
        requestStrategy?: 'latest' | 'parallel';
        /**
         * 指纹匹配模式（也称唯一标识）：
         * - 'full'：全匹配（URL+方法+全参数）
         * - 'partial'：部分匹配（URL+方法+指定参数）
         * - 'path'：仅匹配路径+方法（推荐，默认方案，弱控制）
         */
        fingerprintMatch?: 'full' | 'partial' | 'path';
        /**
         * 当fingerprintMatch=partial时指定的关键参数
         */
        keyParams?: string[];
        /**
         * 唯一标识，用于取消请求
         */
        fingerprint: string;
    }

    interface MethodWithMeta extends Method {
        meta: MethodMeta
    }

    /** 后端接口返回的数据结构配置 */
    interface BackendConfig {
        /** 表示后端请求状态码的属性字段 */
        codeKey?: string
        /** 表示后端请求数据的属性字段 */
        dataKey?: string
        /** 表示后端消息的属性字段 */
        msgKey?: string
        /** 后端业务上定义的成功请求的状态 */
        successCode?: number | string
    }


    type RequestErrorType = 'Response Error' | 'Business Error' | null
    type RequestCode = string | number
    interface ResponseBaseResult {
        /** 请求服务的错误类型 */
        errorType: RequestErrorType
        /** 错误码 */
        code: RequestCode
        /** 错误信息 */
        message: string
        /** 返回的数据 */
        data?: any
    }

    interface ResponseResult<T> extends ResponseBaseResult {
        /** 请求服务是否成功 */
        isSuccess: boolean
        /** 请求服务的错误类型 */
        errorType: RequestErrorType
        /** 错误码 */
        code: RequestCode
        /** 错误信息 */
        message: string
        /** 返回的数据 */
        data: T
    }

    /**
 * @description:  常用的contentTyp类型
 */
    enum RequestContentType {
        // json
        JSON = 'application/json;charset=UTF-8',
        // json
        TEXT = 'text/plain;charset=UTF-8',
        // form-data 一般配合qs
        FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
        // form-data  上传
        FORM_DATA = 'multipart/form-data;charset=UTF-8'
    }
}

