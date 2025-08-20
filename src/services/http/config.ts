/*
 * @Author: caoguanjie 
 * @Date: 2024-04-11 14:28:18 
 * @Last Modified by: caoguanjie
 * @Last Modified time: 2025-01-13 18:02:31
 * 文件描述：这里主要配置一些默认参数。
 * 1. 配置由于不同团队开发，可能定义的接口参数不一样，标准不同，可以在这里进行调整。
 * 2. 定义一些http的常规默认值，例如状态码，以及相应的提示语
 */


/** 默认实例的Aixos配置 */
export const DEFAULT_ALOVA_OPTIONS = {
    // 请求超时时间,默认15秒
    timeout: window.ENV.project?.http_timeout || 15 * 1000,
}


/** 默认实例的后端字段配置 */
export const DEFAULT_BACKEND_OPTIONS = {
    codeKey: 'code',
    dataKey: 'result',
    msgKey: 'message',
    successCode: 1001,
}


/** 请求不成功各种状态的错误, */
export const ERROR_STATUS = {
    default: '发生未知错误,请联系管理员!',
    400: '请求格式错误或者参数错误！',
    401: '用户没有权限（令牌、用户名、密码错误）!',
    403: '用户得到授权，但是访问是被禁止的!',
    404: '网络请求错误,URL地址错误！',
    405: '网络请求错误,请求方法未允许!',
    408: '网络请求超时',
    500: '服务器错误,请联系管理员!',
    501: '网络未实现!',
    502: '网络错误!',
    503: '服务不可用，服务器暂时过载或维护!',
    504: '网络超时,请联系管理员!',
    505: 'http版本不支持该请求!',
}

/** 后端配置的状态码 */
export const RESPONSE_STATUS = {
    SUCCESS: 1001, // 查询成功、操作成功
    ERROR: 1002, // 操作失败、查询失败
    STYSTEM_ERROR: 2001, // 系统异常
    LOGIN_FAIL: 2002, // 登录身份验证失效
    DOUBLE_REQUEST: 2003, // 重复请求
    PARAMAR_ERROR: 2004, // 参数不符合要求
    STYSTEM_EXPIRE: 2010, // 系统过期（直接返回登陆页）
    // APPID_LOW: 2005, // APP版本过低
    // APPID_LOWER: 2005, // APP版本过低
    // APPID_ERROR: 2006, // APPID无效、微信获取用户信息失败
    // HOT_UNPDATE: 2007, // 热更新检查
    // USER_UNPDATE: 2008, // 用户信息已变更
    // FORCE_OFFLINE: 2009, // 强制下线
}



/** 
 * 没有错误提示的code，设置是否弹出提示的白名单状态码，根据业务系统来设置 
 * @example 比如：[10000] 表示没有错误提示的code
 * 
 */
export const ERROR_NO_TIP_STATUS: any[] | number[] | string[] = [100000]



