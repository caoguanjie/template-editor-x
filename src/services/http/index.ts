import { createAlova } from "alova"
import { CreateAlovaInstance } from "./alova"
import GlobalFetch from "alova/fetch"
export * from './middleware'
import VueHook from 'alova/vue'
import useStore from "@/store"
import { createApis as createUserApis, withConfigType as withUserConfigType } from "../api/UserAccount/createApis";
import { createApis as createSysApis, withConfigType as withSysConfigType } from "../api/sysDepartment/createApis";
export const request = CreateAlovaInstance({
    baseURL: window.ENV.project?.api_address || '',
})
/**
 * 空白实例，考虑可能调用其他系统的接口
 */
export const blankInstance = CreateAlovaInstance({
    baseURL: '',
})

export const mockInstance = CreateAlovaInstance({
    baseURL: 'https://apifoxmock.com/m1/5109403-0-default',
})

/**
 * 空白实例，下载文件
 */
export const downloadInstance = createAlova({
    baseURL: window.ENV.project?.api_address || '',
    requestAdapter: GlobalFetch(),
    statesHook: VueHook,
    beforeRequest(method) {
        // 假设我们需要添加token到请求头
        const { user } = useStore();
        method.config.headers.authorization = 'Bearer ' + user.accessToken
    },
    responded: async (respond: any) => {
        return await respond.blob();
    }
})

export const $$userConfigMap = withUserConfigType({});
// 系统管理接口
export const sysApi = createSysApis(request, $$userConfigMap)
// 用户管理接口
export const userApi = createUserApis(request, $$userConfigMap)
export default request