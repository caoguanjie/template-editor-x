import { useRequest } from "@/services"
import request from "@/services/http"
import { IUserDepartmentSource, UserDepartmentSource } from "@/services"


/** 用户管理获取组织机构数据源 */
export function fetchUserDepartmentSource(params: Partial<IUserDepartmentSource>) {
    const method = request.Get<Service.ResponseResult<UserDepartmentSource[]>>('/SysUser/getDepartmentSource', { params })
    return useRequest(method, { immediate: false })
}


/** 
 * 用户管理
 * 获取已分配角色列表
 */
export function fetchUserAllotRoleList() {
    return useRequest((params: Partial<{ userId: number }>) => request.Get<Service.ResponseResult<Array<{ roleID: string, roleName: string }>>>('/SysUser/getAllotRoleList', { params }), { immediate: false, initialData: [] })
}

/** 
 * 用户管理
 * 用户分配角色
 */
export function fetchUserAllotRole() {
    return useRequest((data: Partial<{ id: string, roleIDs: string }>) => request.Post<Service.ResponseResult<any>>('/SysUser/allotRole', data), { immediate: false })
}

/** 
 * 用户管理
 * 获取可分配角色列表
 */
export function fetchUserSelectRoleList() {
    return useRequest((params: Partial<{ id: string, roleIDs: string }>) => request.Get<Service.ResponseResult<any>>('/SysUser/getSelectRoleList', { params }), { immediate: false })
}

/**
 * 接口名称：获取用户默认首页
 * @param params
 * @returns 
 */
export function fetchGetDefaultHomepageInfo() {
    return useRequest((params: any) => {
        const method = request.Get<Service.ResponseResult<any>>('/SysUser/GetDefaultHomepageInfo', { params })
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}


/**
 * 接口名称：获取用户可选默认首页数据源
 * @param params
 * @returns 
 */
export function fetchGetDefaultHomepageSource() {
    return useRequest((params: any) => {
        const method = request.Get<Service.ResponseResult<any>>('/SysUser/GetDefaultHomepageSource', { params })
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}


/**
 * 获取已分配角色列表
 * @param params
 * @returns 
 */
export function fetchGetAllotRoleList() {
    return useRequest((params: any) => {
        const method = request.Get<Service.ResponseResult<any>>('/SysUser/GetAllotRoleList', { params })
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}


/**
 * 接口名称：用户分配角色
 * @param params
 * @returns 
 */
export function fetchPostSysUserAllotRole() {
    return useRequest((params: any) => {
        const method = request.Post<Service.ResponseResult<any>>('/SysUser/AllotRole', params)
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}

/**
 * 获取可分配角色列表
 * @param params
 * @returns 
 */
export function fetchGetSelectRoleList() {
    return useRequest((params: any) => {
        const method = request.Get<Service.ResponseResult<any>>('/SysUser/GetSelectRoleList', { params })
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}


/**
 * 用户管理--角用户列表
 * @param params
 * @returns 
 */
export function fetchGetSysUserGetUserList() {
    return useRequest((params: any) => {
        const method = request.Get<Service.ResponseResult<any>>('/SysUser/GetUserList', { params })
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}

/**
 * 接口名称：保存、编辑用户
 * @param params
 * @returns 
 */
export function fetchPostSysUserSaveUser() {
    return useRequest((params: any) => {
        const method = request.Post<Service.ResponseResult<any>>('/SysUser/SaveUser', params)
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}
/**
 * 接口名称：重置用户密码
 * @param params
 * @returns 
 */
export function fetchPostResetPwd() {
    return useRequest((params: any) => {
        const method = request.Post<Service.ResponseResult<any>>('/SysUser/ResetPwd', params)
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}

/**
 * 接口名称：启用、禁用、删除用户
 * @param params
 * @returns 
 */
export function fetchPostSysUserOperation() {
    return useRequest((params: any) => {
        const method = request.Post<Service.ResponseResult<any>>('/SysUser/Operation', params)
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}

/**
 * 获取用户详情
 * @param params
 * @returns 
 */
export function fetchGetSysUserGetUserInfo() {
    return useRequest((params: any) => {
        const method = request.Get<Service.ResponseResult<any>>('/SysUser/GetUserInfo', { params })
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}
/**
 * 获取组织机构数据源
 * @param params
 * @returns 
 */
export function fetchGetDepartmentSource() {
    return useRequest((params: any) => {
        const method = request.Get<Service.ResponseResult<any>>('/SysUser/GetDepartmentSource', { params })
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}

/**
 * 接口名称：用户解锁操作
 * @param params
 * @returns 
 */
export function fetchPostReleaceLock() {
    return useRequest((params: any) => {
        const method = request.Post<Service.ResponseResult<any>>('/SysUser/ReleaceLock', params)
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}

/**
 * 接口名称：配置用户默认首页
 * @param params
 * @returns 
 */
export function fetchPostSetDefaultHomepage() {
    return useRequest((params: any) => {
        const method = request.Post<Service.ResponseResult<any>>('/SysUser/setDefaultHomepage', params)
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}


/**
 * 接口名称：修改密码
 * @param params
 * @returns 
 */
export function fetchPostSysUserChangeUserPwd() {
    return useRequest((params: any) => {
        const method = request.Post<Service.ResponseResult<any>>('/sysUser/changeUserPwd', params)
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}