import { PaginationParams, PaginationResult, request, useRequest, SysWFMainConfigList, SysWFConditionDefineList } from "@/services";
import XEUtils from "xe-utils";





// ======================= 流程配置start ========================
// /sysWorkFlow/getMainConfigList
// GetMainConfigInfo

/**
 * 接口名称：查询流程配置列表
 * @param params
 * @returns 
 */
export function fetchGetSysWorkFlowGetMainConfigList(params: Partial<{
    /**
     * 流程名称 模糊查询
     */
    flowName?: string;
    /**
     * 流程编号 模糊查询
     */
    flowCode?: string;
} & PaginationParams>) {
    return request.Get<PaginationResult<SysWFMainConfigList>>('/sysWorkFlow/getMainConfigList',
        {
            params,
            transform: response => {
                const { isSuccess, message, data } = response as Service.ResponseResult<PaginationResult<SysWFMainConfigList>>
                if (isSuccess) {
                    data.items = data.items.map(item => new SysWFMainConfigList(item))
                    return data as unknown as PaginationResult<SysWFMainConfigList>
                } else {
                    // 抛出异常
                    throw new Error(message)
                }
            }

        })
}



/**
 * 接口：接口名称：保存流程配置主表信息
 * @param params 
 * @returns 
 */
export function fetchSysWorkFlowSaveMainConfigInfo() {
    return useRequest((data: any) => {
        const method = request.Post<Service.ResponseResult<any>>('/sysWorkFlow/saveMainConfigInfo', data)
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}

/**
 * 接口：接口名称：流程配置操作（启用、停用、删除）
 * @param params 
 * @returns 
 */
export function fetchSysWorkFlowSaveMainConfigOperation() {
    return useRequest((data: any) => {
        const method = request.Post<Service.ResponseResult<any>>('/sysWorkFlow/saveMainConfigOperation', data)
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}



/**
 * 接口名称：查询流程步骤列表
 * @param params
 * @returns 
 */
export function fetchGetSysWorkFlowGetConditionDefineList(params: Partial<{
    /**
   * 流程名称 模糊查询
   */
    flowID?: string;
    /**
     * 流程名称 模糊查询
     */
    conditionName?: string;
    /**
     * 流程编号 模糊查询
     */
    conditionCode?: string;
} & PaginationParams>) {
    return request.Get<PaginationResult<SysWFConditionDefineList>>('/sysWorkFlow/getConditionDefineList',
        {
            params,
            transform: response => {
                const { isSuccess, message, data } = response as Service.ResponseResult<PaginationResult<SysWFConditionDefineList>>
                if (isSuccess) {
                    data.items = data.items.map(item => new SysWFConditionDefineList(item))
                    return data as unknown as PaginationResult<SysWFConditionDefineList>
                } else {
                    // 抛出异常
                    throw new Error(message)
                }
            }

        })
}

/**
 * 接口：接口名称：流程配置条件添加、编辑
 * @param params 
 * @returns 
 */
export function fetchSysWorkFlowSaveConditionDefineInfo() {
    return useRequest((data: any) => {
        const method = request.Post<Service.ResponseResult<any>>('/sysWorkFlow/saveConditionDefineInfo', data)
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}

/**
 * 接口：接口名称：流程配置条件操作（启用、停用、删除)
 * @param params 
 * @returns 
 */
export function fetchSysWorkFlowConditionDefineOperation() {
    return useRequest((data: any) => {
        const method = request.Post<Service.ResponseResult<any>>('/sysWorkFlow/conditionDefineOperation', data)
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}

/**
 * 接口：接口名称：查询流程配置条件详情
 * @param params 
 * @returns 
 */
export function fetchSysWorkFlowGetConditionDefineInfo() {
    return useRequest((params: any) => {
        const method = request.Get<Service.ResponseResult<any>>('/sysWorkFlow/getConditionDefineInfo', { params })
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}

/**
 * 接口：接口名称：保存流程配置明细信息
 * @param params 
 * @returns 
 */
export function fetchSysWorkFlowSaveMainConfig() {
    return useRequest((data: any) => {
        const method = request.Post<Service.ResponseResult<any>>('/sysWorkFlow/saveMainConfig', data)
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}


/**
 * 接口：接口名称：查询流程配置明细信息
 * @param params 
 * @returns 
 */
export function fetchSysWorkFlowGetMainConfig() {
    return useRequest((params: any) => {
        const method = request.Get<Service.ResponseResult<any>>('/sysWorkFlow/getMainConfig', { params })
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}

// ======================= 流程配置end ==========================