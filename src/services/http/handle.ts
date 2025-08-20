/*
 * @Author: caoguanjie 
 * @Date: 2024-04-10 14:15:58 
 * @Last Modified by: caoguanjie
 * @Last Modified time: 2025-01-13 18:11:57
 * 文件描述：
 * 1、这里处理所有接口相关的业务逻辑，包括可能会利用到其他状态管理，或者其他工具，都需要在这里定义
 * 2、方便以后迁移项目时，能够快速迁移
 */


import { ERROR_NO_TIP_STATUS, ERROR_STATUS, RESPONSE_STATUS } from "./config";
import useStore from "@/store";
import { ElMessage } from "element-plus";
import { Method } from "alova";
import router from "@/router";

type ErrorStatus = keyof typeof ERROR_STATUS


export function handleRequestInterceptors(request: Method) {

    return request
}


/**
 * @description: 请求体，过滤params参数是undefined、null的值
 * @param {Response} response
 * @return {*}
 */
export function handleRequestParams(params: object) {
    if (params instanceof FormData) {
        return params;
    }
    const transformData: any = unref(params);
    if (typeof transformData === 'object' && transformData !== null) {
        for (const [k, v] of Object.entries(transformData)) {
            if (v === null || v === undefined) {
                delete transformData[k];
            } else {
                //  353【245】治疗历史：输入特殊字符，提示数据校验异常
                transformData[k] = encodeURIComponent(v as any);
            }
        }
    }
    return transformData;
}
/**
 * @description: 处理请求成功，但返回后端服务器报错
 * @param {Response} response
 * @return {*}
 */
export function handleResponseError(response: Response, methodInstance: Service.MethodWithMeta) {
    const error: Service.ResponseBaseResult = {
        errorType: 'Response Error',
        code: 0,
        message: ERROR_STATUS.default,
        data: null,
    }
    const errorCode: ErrorStatus = response.status as ErrorStatus
    const message = ERROR_STATUS[errorCode] || ERROR_STATUS.default
    Object.assign(error, { code: errorCode, message })
    methodInstance.meta?.openErrorTips !== false && showError(error)
    if (Number(errorCode) >= 400 && Number(errorCode) < 500) {
        // 接口没有权限访问。
        router.push('/403')
    }
    return error
}



/**
 * @description: 处理接口token无感刷新
 * @return {*}
 */
export async function handleRefreshToken(method: Method) {
    const { user } = useStore()

    // bug 系统：因token过期导致界面一直在加载中，token会一直刷新
    await user.handleRefreshToken()
}


/**
 * 返回最新的token
 * @returns {string} 
 */
export function handleNewToken(): string {
    const { user } = useStore();
    return 'Bearer ' + user.accessToken
}

/**
 * @description: 统一成功和失败返回类型
 * @param {object}:code, message, data 
 * @param {boolean} isSuccess
 * @return {Service.ResponseResult<any>} result
 */
export function handleServiceResult(data: any, isSuccess: boolean = true,): Service.ResponseBaseResult {
    const result = {
        isSuccess,
        errorType: null,
        ...data,
    }
    return result
}


/**
 * @description:
 * @param {Record} data 接口返回的后台数据
 * @param {Service} config 后台字段配置
 * @return {*}
 */
export function handleBusinessError(data: Record<string, any>, config: Required<Service.BackendConfig>, methodInstance: Service.MethodWithMeta) {
    const { codeKey, msgKey, dataKey } = config

    const error: Service.ResponseBaseResult = {
        errorType: 'Business Error',
        code: data[codeKey],
        message: data[msgKey],
        data: data[dataKey],
    }
    if (data[codeKey] === RESPONSE_STATUS.STYSTEM_EXPIRE) {
        // 系统失效了，可以直接去到登录页面
        const { user } = useStore()
        user.logout(true)
        throw new Error(error.message)
    }
    methodInstance.meta?.openErrorTips !== false && showError(error)

    return error
}

/**
 * @description: 显示错误信息，轻提示
 */
export function showError(error: Service.ResponseBaseResult) {
    // 如果error不需要提示,则跳过
    const code = error.code
    if (ERROR_NO_TIP_STATUS.includes(code))
        return
    ElMessage({
        message: error.message,
        type: 'error',
        // plain: true,
    })
}

/**
 * @description: 显示错误信息，轻提示
 */
export function showSuccess(message: string) {
    message && ElMessage({
        message: message,
        type: 'success',
        // plain: true, BUG:561 提示：成功的提示有多种样式
    })
}