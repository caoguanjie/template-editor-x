import { useRequest } from "@/services"
import request, { delayLoadingMiddleware } from "@/services/http"
import { ILogin, LoginInfo, UserInfo, UserInfoList } from "@/services"




/**
 * 接口名称：查询资源信息接口
 * @param params
 * @returns 
 */
export function fetchGetUserAccountInit() {
    return useRequest((params: any) => {
        const method = request.Get<Service.ResponseResult<any>>('/userAccount/init', { params })
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}

/**
 * 接口名称：查询院区
 * @param params
 * @returns 
 */
export function fetchGetHospitalList() {
    return useRequest((params: any) => {
        const method = request.Get<Service.ResponseResult<any>>('/userAccount/getHospitalList', { params })
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}

/**登录接口 */
export function fetchLogin(params: Partial<ILogin>) {
    const method = request.Post<Service.ResponseResult<LoginInfo>>('/userAccount/login', params)
    // 不做token校验，访客模式
    method.meta = {
        authRole: null,
        openSuccessTips: false
    }
    return useRequest(method, { immediate: true })
}


/**单点登录接口 */
export function fetchSSOLogin(data: Partial<{ loginId: string }>) {
    const method = request.Post<Service.ResponseResult<LoginInfo>>('/userAccount/ssoLogin', data)
    // 不做token校验，访客模式
    method.meta = {
        authRole: null,
        openSuccessTips: false
    }
    return method
}

/**退出登录接口 */
export function fetchLogout() {
    const method = request.Get<Service.ResponseResult<LoginInfo>>('/userAccount/logout')
    method.meta = {
        logout: true,
    };
}

/**刷新token接口，无感登录 */
export function fetchRefresh(params: Partial<{ refreshToken: string }>) {
    const method = request.Post<Service.ResponseResult<LoginInfo>>('/userAccount/refreshToken', params)
    // 为了让refreshToken请求顺利通过，需要通过元数据标识authRole为refreshToken。
    method.meta = {
        authRole: 'refreshToken',
        openSuccessTips: false
    }
    return method
}



/** 获取用户信息 */
export function fetchUserInfo() {
    const method = request.Get<Service.ResponseResult<UserInfo>>('/userAccount/getUserInfo')
    method.meta = {
        openErrorTips: false,
    }
    return method
}

/** 分页查询授权用户列表 */
export function fetchUserList() {
    const method = request.Post<Service.ResponseResult<UserInfoList>>('api/SysOrganization/GetAuthUserByPage')
    return useRequest(method, { immediate: false, middleware: delayLoadingMiddleware() })
}