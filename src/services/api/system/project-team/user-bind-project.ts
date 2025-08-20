import { request, PaginationResult, SysTeamTree, TeamUnBindTreatItemList, PaginationParams, TeamTreatItemList, useRequest, GetTeamListOutput, UserDepartmentSource, SysUserTreatItemGetUserListOutput } from "@/services"
import XEUtils from "xe-utils"




/**
 * 接口名称：获取科室人员树
 * @param params
 * @returns 
 */
export function fetchGetSysDeptUserTree() {
    const method = request.Get<UserDepartmentSource[]>('/SysUserTreatItem/GetSysDeptUserTree', {
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
 * 接口名称：获取人员项目绑定信息
 * @param params
 * @returns 
 */
export function fetchGetUserBindTreatItemList(params: Partial<{ UserID: string, TreatItemCategory: string }>) {
    return request.Get<TeamTreatItemList>('/SysUserTreatItem/GetUserBindTreatItemList',
        {
            params,
            transform: response => {
                const { isSuccess, message, data } = response as Service.ResponseResult<TeamTreatItemList>
                if (isSuccess) {
                    return new TeamTreatItemList(data)

                } else {
                    // 抛出异常
                    throw new Error(message)
                }
            }

        })

}




/**
 * 接口名称：保存人员项目列表
 * @param params
 * @returns 
 */
export function fetchSaveUserBindTreatItem(data: Partial<{ UserID: string, TreatItemIDList: string }>) {
    return request.Post<Service.ResponseResult<any>>('/SysUserTreatItem/SaveUserBindTreatItem', data)
}



/**
 * 接口名称：获取所有治疗师列表
 * @param params
 * @returns 
 */
export function fetchGetUserList() {
    return useRequest(
        sysApis.SysUserTreatItem.get_sysusertreatitem_getuserlist({
            transform: res => {
                const { isSuccess, data } = res as unknown as Service.ResponseResult<SysUserTreatItemGetUserListOutput[]>
                if (isSuccess) {
                    return data.map((item) => {
                        return {
                            label: item.userName,
                            value: item.userID || ''
                        }
                    })
                } else {
                    return []
                }
            }
        }),
        {
            immediate: true
        })
}



/**
 * 接口名称：复制人员项目
 * @param params
 * @returns 
 */
export function fetchCopyUserBindTreatItem() {
    return useRequest((data: { sourceUserID: string, targetUserIDList: any[] }) =>
        sysApis.SysUserTreatItem.post_sysusertreatitem_copyuserbindtreatitem({ data }),
        {
            immediate: false
        })
}