/**
 * 系统文件操作服务
 */
import { request, useRequest } from "@/services"
/**
 * 接口名称：获取文件列表
 * @param params
 * @returns 
 */
export function fetchGetSysFilelist() {
    return useRequest((params: any) => {
        const method = request.Get<Service.ResponseResult<any>>('/sysFile/list', { params })
        return method
    }, {
        immediate: false,
    })
}


/**
 * 接口名称：下载文件
 * @param params
 * @returns 
 */
export function fetchPostSysFiledownload() {
    return useRequest((data: any) => {
        const method = request.Post<Service.ResponseResult<any>>('/sysFile/download', data)
        method.meta = {
            responseType: 'blob'
        }
        return method
    }, {
        immediate: false,
    })
}


/**
 * 接口名称：删除文件
 * @param params
 * @returns 
 */
export function fetchPostSysFileDelete() {
    return useRequest((data: any) => {
        const method = request.Post<Service.ResponseResult<any>>('/sysFile/delete', data)
        method.meta = {

        }
        return method
    }, {
        immediate: false,
    })
}
