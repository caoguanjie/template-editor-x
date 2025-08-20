import { delayDirectiveLoadingMiddleware, request, useRequest } from "@/services"
/**
 * 参数设置的接口文档
 */

/**
 * 接口名称：获取参数设置分页列表
 * @param params
 * @returns 
 */
export function fetchGetParamsList() {
    return useRequest((params: any) => {
        const method = request.Get<Service.ResponseResult<any>>('/SysParams/GetParamsList', { params })
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
        middleware: delayDirectiveLoadingMiddleware()
    })
}


/**
 * 接口名称：查询配置分组数据源
 * @param params
 * @returns 
 */
export function fetchGetGroupSource() {
    return useRequest((params: any) => {
        const method = request.Get<Service.ResponseResult<any>>('/SysParams/GetGroupSource', { params })
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
        middleware: delayDirectiveLoadingMiddleware()
    })
}


/**
 * 接口名称：获取参数详情信息
 * @param params
 * @returns 
 */
export function fetchGetParamsInfo() {
    return useRequest((params: any) => {
        const method = request.Get<Service.ResponseResult<any>>('/SysParams/GetParamsInfo', { params })
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
        middleware: delayDirectiveLoadingMiddleware()
    })
}
/**
 * 接口名称：获取预览数据
 * @param params
 * @returns 
 */
export function fetchGetSysParamConfigPreviewInfo() {
    return useRequest((params: any) => {
        const method = request.Get<Service.ResponseResult<any>>('/SysParams/GetSysParamConfigPreviewInfo', { params })
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
        middleware: delayDirectiveLoadingMiddleware()
    })
}


/**
 * 接口名称：新增、编辑参数设置
 * @param params
 * @returns 
 */
export function fetchSaveParamsInfo() {
    return useRequest((data: any) => {
        const method = request.Post<Service.ResponseResult<any>>('/SysParams/SaveParamsInfo', data)
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
        middleware: delayDirectiveLoadingMiddleware()
    })
}


/**
 * 接口名称：启用、停用、删除参数设置
 * @param params
 * @returns 
 */
export function fetchParamsOperation() {
    return useRequest((data: any) => {
        const method = request.Post<Service.ResponseResult<any>>('/SysParams/Operation', data)
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
        middleware: delayDirectiveLoadingMiddleware()
    })
}
