import { useRequest, request, ProjectTeamList, PaginationResult, PaginationParams, ISaveSysTreatItem, IUserDepartmentSource, UserDepartmentSource, delayDirectiveLoadingMiddleware, TeamDetail, BindTeamUserList } from "@/services"
import XEUtils from "xe-utils"


/**
 * 接口名称：获取团队成员列表(分页)
 * @param params
 * @returns 
 */
export function fetchGetSysTeamUserList(params: Partial<{ SysTeamName: string, SysTeamUserName: string, DeptID: string, SysTeamID: string } & PaginationParams>) {
    return request.Get<PaginationResult<ProjectTeamList>>('/SysTeam/GetSysTeamUserList',
        {
            params,
            transform: response => {
                const { isSuccess, message, data } = response as Service.ResponseResult<PaginationResult<ProjectTeamList>>
                if (isSuccess) {
                    data.items = data.items.map(item => new ProjectTeamList(item))
                    return data as unknown as PaginationResult<ProjectTeamList>
                } else {
                    // 抛出异常
                    throw new Error(message)
                }
            }

        })

}


/**
 * 接口名称：获取科室团队树
 * @param params
 * @returns 
 */
export function fetchSysTeamTreeSource() {
    const method = request.Get<UserDepartmentSource[]>('/SysTeam/GetSysTeamTree', {
        transform: response => {
            const { isSuccess, message, data } = response as Service.ResponseResult<UserDepartmentSource[]>
            if (isSuccess) {
                return XEUtils.toArrayTree(data, {
                    parentKey: "parentID",
                })
                // return data as unknown as UserDepartmentSource[]
            } else {
                throw new Error(message)
            }
        }
    })
    return useRequest(method, { immediate: false })
}

/**
 * 接口名称：设为负责人
 * @param params
 * @returns 
 */
export function fetchSetSysTeamLeader() {
    return useRequest((data: any) => {
        const method = request.Post<Service.ResponseResult<any>>('/SysTeam/SetSysTeamLeader', data)
        return method
    }, {
        immediate: false,
    })
}

/**
 * 接口名称：取消设为负责人
 * @param params
 * @returns 
 */
export function fetchCancelSysTeamLeader() {
    return useRequest((data: any) => {
        const method = request.Post<Service.ResponseResult<any>>('/SysTeam/CancelSysTeamLeader', data)
        return method
    }, {
        immediate: false,
    })
}

/** 
 * 接口名称：获取科室下的所有团队
 * @param params
 * @returns 
 */
export function fetchGetDeptTeamList() {
    return useRequest((params: any) => {
        const method = request.Get<Service.ResponseResult<any>>('/SysTeam/GetDeptTeamList', { params })
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}




/**
 * 接口名称：获取团队详情
 * @param params
 * @returns 
 */
export function fetchGetTeamDetail() {
    return useRequest((params: any) => {
        const method = request.Get<TeamDetail>('/SysTeam/GetTeamDetail', {
            params,
            transform: response => {
                const { isSuccess, message, data } = response as Service.ResponseResult<TeamDetail>
                if (isSuccess) {
                    return new TeamDetail(data)
                } else {
                    throw new Error(message)
                }
            }
        })
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
 * 接口名称：保存团队
 * @param params
 * @returns 
 */
export function fetchSaveTeam() {
    return useRequest((data: any) => {
        const method = request.Post<Service.ResponseResult<any>>('/SysTeam/SaveTeam', data)
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}

/**
 * 接口名称：删除团队
 * @param params
 * @returns 
 */
export function fetchDeleteTeam() {
    return useRequest((data: any) => {
        const method = request.Post<Service.ResponseResult<any>>('/SysTeam/DeleteTeam', data)
        return method
    }, {
        immediate: false,
    })
}

/**
 * 接口名称：删除团队成员
 * @param params
 * @returns 
 */
export function fetchDeleteTeamUser() {
    return useRequest((data: any) => {
        const method = request.Post<Service.ResponseResult<any>>('/SysTeam/DeleteTeamUser', data)
        return method
    }, {
        immediate: false,
    })
}



/**
 * 接口名称:获取绑定团队用户信息
 * @param params
 * @returns 
 */
export function fetchGetBindTeamUserList() {
    return useRequest((SysTeamID: string) =>
        sysApis.SysTeam.get_systeam_getbindteamuserlist({
            params: {
                SysTeamID
            },
            transform: (res) => {
                const { data, isSuccess, message } = res as Service.ResponseResult<BindTeamUserList>
                if (isSuccess) {
                    return new BindTeamUserList(data)
                } else {
                    // 抛出异常
                    throw new Error(message)
                }
            }
        }), {
        immediate: false
    })

}


/**
 * 接口名称:保存项目绑定评定表
 * @param params
 * @returns 
 */
export function fetchSaveTeamUser() {
    return useRequest((data: { teamID: string, sysTeamUserIDList: string }) =>
        sysApis.SysTeam.post_systeam_saveteamuser({
            data,
        }),
        {
            immediate: false
        }
    )

}

