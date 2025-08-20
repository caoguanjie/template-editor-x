import { AllotPermissionList, ICopyRoleList, IRoleList, ISaveRole, ISelectUserList, ISelectUserListResult, PaginationResult, RoleInfo, RoleList, RolePermissionSource, delayDirectiveLoadingMiddleware, request } from "@/services"
import { useRequest } from "@/services"
/** 获取角色分页列表 */
export function fetchRoleList() {
    return useRequest((params: Partial<IRoleList>) => request.Get<Service.ResponseResult<any>>('/SysRole/getRoleList', { params }), {
        immediate: false,
        initialData: [],
        middleware: delayDirectiveLoadingMiddleware()
    })

}
//添加角色
export function fetchSaveRole() {
    return useRequest((data: Partial<ISaveRole>) => {
        const method = request.Post<Service.ResponseResult<boolean>>('/SysRole/saveRole', data)
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
        initialData: [],
        middleware: delayDirectiveLoadingMiddleware()
    })
}

//获取角色详情
export function fetchRoleInfo() {
    return useRequest((params: Partial<{ id: string }>) => {
        const method = request.Get<Service.ResponseResult<RoleInfo>>('/SysRole/getRoleInfo', { params })
        return method
    }, {
        immediate: false,
    })
}
// 获取组织机构数据源
export function fetchRoleDepartmentSource() {
    return useRequest((params: Partial<{ roleId: string, scene: number }>) => {
        const method = request.Get<Service.ResponseResult<RolePermissionSource>>('/SysRole/getDepartmentSource', { params })
        return method
    }, {
        immediate: false,
    })
}

// 查询组织机构树数据源
export function fetchOrganizationDepartmentSource() {
    return useRequest((params: Partial<{ roleId: string, scene: string }>) => {
        const method = request.Get<Service.ResponseResult<RolePermissionSource>>('/sysOrganization/getDepartmentSource', { params })
        return method
    }, {
        immediate: false,
    })
}
// 删除角色
export function fetchDeleteRole(data: Partial<{ id: string }>) {
    return request.Post<Service.ResponseResult<boolean>>('/SysRole/deleteRole', data)
}


//查询角色是否分配过权限
export function fetchRoleHasPermission(params: Partial<{ id: string }>) {
    return request.Get<Service.ResponseResult<{ isPermission: true }>>('/SysRole/getHasPermission', { params })
}

//根据权限ID查询数据权限规则集合
export function fetchPermissionRuleList() {
    return useRequest((params: Partial<{ permissionId: string }>) => request.Get<Service.ResponseResult<{ permissionID: string, ruleID: string, ruleName: string }>>('/SysRole/getPermissionRuleList', { params }), {
        immediate: false,
        initialData: [],
        middleware: delayDirectiveLoadingMiddleware()
    })
}


// 查询已分配权限集合
export function fetchRoleAllotPermissionList(params: Partial<{ roleId: string }>) {
    return request.Get<Service.ResponseResult<AllotPermissionList>>('/SysRole/getAllotPermissionList', { params })
}
// 根据角色id查询角色权限数据源
export function fetchRolePermissionSource(params: Partial<{ roleId: string }>) {
    const method = request.Get<Service.ResponseResult<RolePermissionSource>>('/SysRole/getPermissionSource', { params })
    return method
}


// 给角色配置权限
export function fetchRoleAllotPermission(data: Partial<AllotPermissionList>) {
    const method = request.Post<Service.ResponseResult<boolean>>('/SysRole/allotPermission', data)
    method.meta = {
        // openSuccessTips: true
    }
    return method
}


export function fetchCopyRoleList() {
    return useRequest((params: Partial<ICopyRoleList>) => {
        const method = request.Get<Service.ResponseResult<RoleList>>('/SysRole/getCopyRoleList', { params })
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
        initialData: [],
        middleware: delayDirectiveLoadingMiddleware()
    })

}


//保存复制的角色权限
export function fetchRoleCopyPermission(data: Partial<{ id: string, permissionIDList: string[], roleID: string }>) {
    const method = request.Post<Service.ResponseResult<boolean | null>>('/SysRole/saveCopyPermission', data)
    method.meta = {
        // openErrorTips: false
    }
    return method
}


//给角色配置用户
export function fetchSetRoleUser() {
    return useRequest((data: any) => {
        const method = request.Post<Service.ResponseResult<any>>('/SysRole/setRoleUser', data)
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })

}

// 保存用户关联
export function fetchSaveOrganizationUser(data: Partial<{ OrganizationID: string, userIDs: string }>) {
    const method = request.Post<Service.ResponseResult<boolean | null>>('/sysOrganization/saveOrganizationUser', data)
    method.meta = {
        // openSuccessTips: true
    }
    return method
}


// 获取可关联用户列表
export function fetchSelectUserList() {
    return useRequest((params: Partial<ISelectUserList>) => {
        const method = request.Get<Service.ResponseResult<PaginationResult<ISelectUserListResult>>>('/SysRole/getSelectUserList', { params })
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
        middleware: delayDirectiveLoadingMiddleware()
    })

}

// 查询用户分页列表
export function fetchgGetOrganizationUserPageList() {
    return useRequest((params: Partial<ISelectUserList>) => {
        const method = request.Get<Service.ResponseResult<PaginationResult<ISelectUserListResult>>>('/sysOrganization/getUserPageList', { params })
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
        middleware: delayDirectiveLoadingMiddleware()
    })

}


//根据角色ID获取用户集合
export function fetchGetRoleUserList(params: Partial<{ id: string }>) {
    const method = request.Get<Service.ResponseResult<Array<{ userID: string, userName: string }>>>('/SysRole/getRoleUserList', { params })
    // method.meta = {
    //     openSuccessTips: true
    // }
    return method
}

//查询已关联用户
export function fetchGetOrganizationUserList(params: Partial<{ id: string }>) {
    const method = request.Get<Service.ResponseResult<Array<{ userID: string, userName: string }>>>('/sysOrganization/getOrganizationUserList', { params })
    // method.meta = {
    //     openSuccessTips: true
    // }
    return method
}

/**
 * 接口名称：获取用户默认首页(角色)
 * @param params
 * @returns 
 */
export function fetchGetSysRoleDefaultHomepageInfo() {
    return useRequest((params: any) => {
        const method = request.Get<Service.ResponseResult<any>>('/sysRole/getDefaultHomepageInfo', { params })
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}

/**
 * 接口名称：获取用户可选默认首页数据源(角色)
 * @param params
 * @returns 
 */
export function fetchGetSysRoleDefaultHomepageSource() {
    return useRequest((params: any) => {
        const method = request.Get<Service.ResponseResult<any>>('/sysRole/getDefaultHomepageSource', { params })
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}


/**
 * 接口名称：配置用户默认首页(角色)
 * @param params
 * @returns 
 */
export function fetchPostSysRoleSetDefaultHomepage() {
    return useRequest((data: any) => {
        const method = request.Post<Service.ResponseResult<any>>('/sysRole/setDefaultHomepage', data)
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}