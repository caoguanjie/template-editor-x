import { request, PaginationResult, SysTeamTree, TeamUnBindTreatItemList, PaginationParams, TeamTreatItemList, useRequest, GetTeamListOutput } from "@/services"
import XEUtils from "xe-utils"





/**
 * 接口名称：获取团队已绑定项目列表
 * @param params
 * @returns 
 */
export function fetchGetTeamBindTreatItemList(params: Partial<{ SysTeamID: string, TreatItemCategory: string }>) {
    return request.Get<TeamTreatItemList>('/SysTeamTreatItem/GetTeamBindTreatItemList',
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
 * 接口名称：保存团队项目列表
 * @param params
 * @returns 
 */
export function fetchSaveTeamBindTreatItem(data: Partial<{ SysTeamID: string, TreatItemIDList: string }>) {
    return request.Post<Service.ResponseResult<any>>('/SysTeamTreatItem/SaveTeamBindTreatItem', data)
}



/**
 * 接口名称：获取所有团队
 * @param params
 * @returns 
 */
export function fetchGetTeamList() {
    return useRequest(
        sysApis.SysTeam.get_systeam_getteamlist({
            transform: res => {
                const { isSuccess, data } = res as unknown as Service.ResponseResult<GetTeamListOutput[]>
                if (isSuccess) {
                    return data.map((item) => {
                        return {
                            label: item.sysTeamName,
                            value: item.sysTeamID || ''
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
 * 接口名称：复制团队项目
 * @param params
 * @returns 
 */
export function fetchCopyTeamTreatItem() {
    return useRequest((data: { sourceSysTeamID: string, targetSysTeamIDList: any[] }) =>
        sysApis.SysTeamTreatItem.post_systeamtreatitem_copyteamtreatitem({ data }),
        {
            immediate: false
        })
}