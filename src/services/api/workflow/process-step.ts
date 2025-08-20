import { PaginationParams, PaginationResult, request, StepDefineOperationInput, StepDefinePermission, SysWFStepDefineList, SysWorkFlowRoleList, SysWorkFlowUserList, useRequest } from "@/services";
import XEUtils from "xe-utils";

/**
 * 接口名称：查询流程步骤列表
 * @param params
 * @returns 
 */
export function fetchStepDefineList(params: Partial<{
    /**
     * 步骤名称 模糊查询
     */
    StepName?: string;
    /**
     * 步骤编码 模糊查询
     */
    StepCode?: string;
} & PaginationParams>) {
    return request.Get<PaginationResult<SysWFStepDefineList>>('/sysWorkFlow/getStepDefineList',
        {
            params,
            transform: response => {
                const { isSuccess, message, data } = response as Service.ResponseResult<PaginationResult<SysWFStepDefineList>>
                if (isSuccess) {
                    data.items = data.items.map(item => new SysWFStepDefineList(item))
                    return data as unknown as PaginationResult<SysWFStepDefineList>
                } else {
                    // 抛出异常
                    throw new Error(message)
                }
            }

        })
}


/**
 * 接口：接口名称：流程步骤操作（启用、停用、删除）
 * @param params 
 * @returns 
 */
export function fetchStepDefineOperation(params: Partial<StepDefineOperationInput>) {
    const method = request.Post<Service.ResponseResult<any>>('/sysWorkFlow/stepDefineOperation', params)

    return method
}


/**
 * 接口名称：查询可配置权限数据源
 * @param params
 * @returns 
 */
export function fetchGetWorkFlowPermissionSource() {
    // 使用request.Get方法获取数据，传入请求路径和转换函数
    const method = request.Get<StepDefinePermission[]>('/sysWorkFlow/getPermissionSource', {
        // 转换函数，将响应数据转换为树形结构
        transform: response => {
            // 解构响应数据，获取isSuccess、message、data
            const { isSuccess, message, data } = response as Service.ResponseResult<StepDefinePermission[]>
            // 如果请求成功
            if (isSuccess) {
                // 将data转换为树形结构，并返回
                return XEUtils.toArrayTree(data, {
                    parentKey: "parentID",
                })
                // return data as unknown as UserDepartmentSource[]
            } else {
                // 如果请求失败，抛出错误
                throw new Error(message)
            }
        }
    })
    // 使用useRequest方法，传入请求方法和immediate参数，返回请求结果
    return useRequest(method, { immediate: false, initialData: [] })
}

/**
 * 接口名称：查询可配置用户列表
 * @param params
 * @returns 
 */
export function fetchGetSysWorkFlowGetUserList(params: Partial<{
    /**
     * 姓名 模糊查询
     */
    Name?: string;
    /**
     * 手机号 模糊查询
     */
    MobilePhone?: string;
    /**
     * 账号 模糊查询
     */
    LoginID?: string;
    /**
     * 机构 模糊查询  暂时用不上
     */
    OrganID?: string;
} & PaginationParams>) {
    return request.Get<PaginationResult<any>>('/sysWorkFlow/getUserList',
        {
            params,
            transform: response => {
                const { isSuccess, message, data } = response as Service.ResponseResult<PaginationResult<SysWorkFlowUserList>>
                if (isSuccess) {
                    return data as unknown as PaginationResult<SysWorkFlowUserList>
                } else {
                    // 抛出异常
                    throw new Error(message)
                }
            }

        })
}


/**
 * 接口名称：查询可配置角色列表
 * @param params
 * @returns 
 */
export function fetchGetSysWorkFlowGetRoleList(params: Partial<{
    /**
     * 姓名 模糊查询
     */
    Name?: string;
    /**
     * 角色编号 模糊查询
     */
    Code?: string;
    /**
     * 机构名称 模糊查询
     */
    DeptName?: string;
    /**
     * 机构ID 模糊查询
     */
    OrganID?: string;
} & PaginationParams>) {
    return request.Get<PaginationResult<any>>('/sysWorkFlow/getRoleList',
        {
            params,
            transform: response => {
                const { isSuccess, message, data } = response as Service.ResponseResult<PaginationResult<SysWorkFlowRoleList>>
                if (isSuccess) {
                    return data as unknown as PaginationResult<SysWorkFlowRoleList>
                } else {
                    // 抛出异常
                    throw new Error(message)
                }
            }

        })
}


/**
 * 接口名称：查询科室数据源
 * @param params
 * @returns 
 */
export function fetchGetSysWorkFlowGetDeptSource() {
    // 使用request.Get方法获取数据，传入请求路径和转换函数
    const method = request.Get<StepDefinePermission[]>('/sysWorkFlow/getDeptSource', {
        // 转换函数，将响应数据转换为树形结构
        transform: response => {
            // 解构响应数据，获取isSuccess、message、data
            const { isSuccess, message, data } = response as Service.ResponseResult<StepDefinePermission[]>
            // 如果请求成功
            if (isSuccess) {
                // 将data转换为树形结构，并返回
                return XEUtils.toArrayTree(data, {
                    parentKey: "parentID",
                })
                // return data as unknown as UserDepartmentSource[]
            } else {
                // 如果请求失败，抛出错误
                throw new Error(message)
            }
        }
    })
    // 使用useRequest方法，传入请求方法和immediate参数，返回请求结果
    return useRequest(method, { immediate: false, initialData: [] })
}



/**
 * 接口：接口名称：流程步骤新增、编辑
 * @param params 
 * @returns 
 */
export function fetchSysWorkFlowSaveStepDefineInfo() {
    return useRequest((data: any) => {
        const method = request.Post<Service.ResponseResult<any>>('/SysWorkFlow/SaveStepDefineInfo', data)
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}


/**
 * 接口：接口名称：查询流程步骤详情
 * @param params 
 * @returns 
 */
export function fetchSysWorkFlowGetStepDefineInfo() {
    return useRequest((params: any) => {
        const method = request.Get<Service.ResponseResult<any>>('/sysWorkFlow/getStepDefineInfo', { params })
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}

