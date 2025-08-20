/*
 * @Author: caoguanjie 
 * @Date: 2024-04-11 14:30:02 
 * @Last Modified by: caoguanjie
 * @Last Modified time: 2024-11-13 18:28:39
 * 文件描述：这里定义的alova的创建实例方法，以及token的认证策略
 */


import { Method, createAlova } from 'alova'
import { DEFAULT_ALOVA_OPTIONS, DEFAULT_BACKEND_OPTIONS, RESPONSE_STATUS } from './config'
import { createServerTokenAuthentication } from 'alova/client'
import { handleBusinessError, handleNewToken, handleRefreshToken, handleRequestParams, handleResponseError, handleServiceResult, showSuccess } from './handle'
import VueHook from 'alova/vue'
import GlobalFetch from 'alova/fetch';
import { stringify } from 'qs';


// 全局请求映射表（存储正在进行的请求控制器）
const pendingRequests = new Map<string, Method[]>();
// alova重写key唯一值的方法
// Method.prototype.generateKey = function () {
//     // return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
//     // console.log('generateKey', this);
//     const { type, url, meta, config } = this;

//     // 根据策略生成不同指纹（唯一标识）
//     switch (meta?.fingerprintMatch) {
//         case 'path':
//             // 仅匹配路径+方法（推荐，默认方案，弱控制）
//             return [type, url].join('_');
//         case 'partial':
//             // 部分匹配（URL+方法+指定参数）
//             const partialParams = meta?.keyParams?.reduce((acc: { [x: string]: any }, key: string | number) => {
//                 acc[key] = config?.params?.[key] ?? config?.data?.[key];
//                 return acc;
//             }, {} as Record<string, any>);
//             // qs.stringify方法将对象序列化成URL查询字符串，最重要是可以处理数组
//             return [type, url, stringify(partialParams)].join('_');
//         case 'full':
//             // 完全匹配（URL+方法+所有参数）
//             const allParams = { ...(config?.params || {}), ...(config?.data || {}) };
//             return [type, url, stringify(allParams)].join('_');
//         default:
//             // 仅匹配路径+方法（推荐，默认方案，弱控制）
//             return [type, url].join('_');
//     }
// };
function generateFingerprint(method: Method) {
    const { type, url, meta, config, data } = method;

    // 根据策略生成不同指纹（唯一标识）
    switch (meta?.fingerprintMatch) {
        case 'path':
            // 仅匹配路径+方法（推荐，默认方案，弱控制）
            return [type, url].join('_');
        case 'partial':
            // 部分匹配（URL+方法+指定参数）
            const partialParams = meta?.keyParams?.reduce((acc: { [x: string]: any }, key: string | number) => {
                acc[key] = config?.params?.[key] ?? config?.data?.[key];
                return acc;
            }, {} as Record<string, any>);
            // qs.stringify方法将对象序列化成URL查询字符串，最重要是可以处理数组
            return [type, url, stringify(partialParams)].join('_');
        case 'full':
            // 完全匹配（URL+方法+所有参数）
            const allParams = { ...(config?.params || {}), ...(config?.data || {}) };
            return [type, url, stringify(allParams)].join('_');
        default:
            // 仅匹配路径+方法（推荐，默认方案，弱控制）
            return [type, url].join('_');
    }
}
/**
 * Token认证拦截器:对基于 token 的登录、登出、token 附带、token 刷新进行统一管理，并支持无感刷新 token。
 * 
 */

const { onAuthRequired, onResponseRefreshToken } = createServerTokenAuthentication({
    // 由服务端判定token过期
    refreshTokenOnSuccess: {
        isExpired: async (response) => {
            if (response.status === 200) {
                const apiData = await response.clone().json()
                return apiData[DEFAULT_BACKEND_OPTIONS.codeKey] == RESPONSE_STATUS.LOGIN_FAIL
            } else {
                // 当服务端返回405等异常状态码，代表这个接口出现异常了，让它通过token校验，然后在responded: onResponseRefreshToken方法里面统一处理
                return true
            }

        },

        // 当token过期时触发，在此函数中触发刷新token
        handler: async (response, method) => {
            // 这步操作，是让业务接口重新请求时，不要再次进入获取不断授权的逻辑，把角色改为refreshToken之后，不再进来：refreshTokenOnSuccess对象
            // method.meta.authRole = 'refreshToken'
            if (!method.meta) {
                method.meta = { authRole: 'refreshToken' };
            } else {
                method.meta.authRole = 'refreshToken';
            }
            await handleRefreshToken(method)

        }
    },

    /**
     * 添加token到请求头
     * 将重新刷新后的token放回到请求头，保证重新请求业务接口时，token是正确的
     * @param method 添加token到请求头,
     */
    assignToken: (method) => {
        // 官方例子： method.config.headers.Authorization = localStorage.getItem('token')};
        method.config.headers.Authorization = handleNewToken()
    },

})

export function CreateAlovaInstance(
    alovaConfig: Service.AlovaConfig,
    backendConfig?: Service.BackendConfig,
) {
    // 合并默认配置
    const _alovaConfig = { ...DEFAULT_ALOVA_OPTIONS, ...alovaConfig }
    // 合并后端配置，这步的意义就是如果这个app请求多个系统的接口，可能后端定义的字段不一样，这样某个接口可以单独传递
    const _backendConfig = { ...DEFAULT_BACKEND_OPTIONS, ...backendConfig }
    return createAlova({
        statesHook: VueHook,
        /** 全局关闭缓存模式，在特定的某几个请求中再进行设置 */
        cacheFor: null,
        /** 默认使用 fetch API 的适配器，也可以使用axios的适配器*/
        requestAdapter: GlobalFetch(),
        baseURL: _alovaConfig.baseURL,
        timeout: _alovaConfig.timeout,

        /** 请求前的拦截器 */
        beforeRequest: onAuthRequired((method) => {
            // console.log('beforeRequest', method)
            // 获取请求策略， 默认是latest，自动取消前序请求
            const strategy = method.meta?.requestStrategy ?? 'latest';
            // alova的请求key：通过 method 实例的请求方法、请求 url、请求头、url 参数、请求体组合作为唯一标识，标识相同即表示为相同请求
            const reqKey = method.key
            // 同一个接口，相同的参数，指纹相同， 不同的参数，指纹不同
            const fingerprint = generateFingerprint(method);
            // 保存指纹，用于取消相同请求
            method.meta = { ...(method.meta || {}), fingerprint };

            // 查找有效上下文,查找同一个接口，不同的参数的接口
            let validContext = pendingRequests.get(fingerprint)?.filter((ctx) => ctx.key !== reqKey) || [];

            // 策略处理:如果存在相同请求，先取消
            if (strategy === 'latest' && pendingRequests.has(fingerprint) && validContext.length) {
                // 判断是不是同一个请求，不同的参数
                validContext.forEach(ctx => ctx?.abort());
                console.log('取消了相同请求', method)
                validContext = [];
            }

            validContext.push(method)
            // 创建新控制器并保存
            pendingRequests.set(fingerprint, validContext);

            // 处理get和post的参数，暂定
            // 过滤入参是undefined、null的值、处理数组
            method.config.params = handleRequestParams(method.config.params)
            // 检查设置中有没有传入beforeRequest属性，如果有，执行beforeRequest方法，并且传入method参数
            _alovaConfig.beforeRequest?.(method)
        }),

        responded: onResponseRefreshToken({
            // 请求成功的拦截器
            onSuccess: async (response: any, methodInstance: Method | Service.MethodWithMeta) => {
                const { status } = response

                if (status === 200) {

                    // 返回json数据
                    const apiData = await response.json()
                    // 请求成功, 统一成功和失败返回类型
                    if (apiData[_backendConfig.codeKey] === _backendConfig.successCode) {
                        // 默认post请求，openSuccessTips是默认开始成功提示语的
                        if ((methodInstance as Method).type === 'POST' && methodInstance.meta?.openSuccessTips !== false) {
                            showSuccess(apiData[_backendConfig.msgKey])
                        }
                        // 默认是关闭的，如果开启了就是自动返回后端接口的提示语
                        methodInstance.meta?.openSuccessTips && showSuccess(apiData[_backendConfig.msgKey])
                        return handleServiceResult({
                            code: apiData[_backendConfig.codeKey],
                            message: apiData[_backendConfig.msgKey],
                            data: apiData[_backendConfig.dataKey]
                        }, true)
                    }


                    // 业务请求失败
                    const errorResult = handleBusinessError(apiData, _backendConfig, methodInstance as Service.MethodWithMeta)
                    return handleServiceResult(errorResult, false)
                }

                // 接口请求失败
                const errorResult = handleResponseError(response, methodInstance as Service.MethodWithMeta)
                return handleServiceResult(errorResult, false)
            },
            // 由于window.fetch的特点，只有在连接超时或连接中断时才会触发onError拦截器，其他情况均会触发onSuccess拦截器
            onError: (error: any, method: any) => {
                // console.error(error)
                const tip = `[${method.type}] - [${method.url}] - ${error.message}`
                if (error.message.includes('timeout')) {// 超时增加提示信息
                    ElMessage.error({ message: '请求超时', grouping: true })
                    console.warn(tip)
                    // 抛出异常
                    throw new Error(tip)
                }
                // 一定要抛出异常，不然会导致请求进入transform的函数内，导致出现报错
                // 这里一定是中断才会进来
                throw new Error(tip);
            },
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onComplete: async (_method: any) => {
                const fingerprint = (_method as Method)?.meta?.fingerprint
                // 请求成功后，删除请求映射表中的请求控制器
                // console.log('删除了请求控制器', _method.url, fingerprint)
                pendingRequests.delete(fingerprint);

            },
        })




    })
}