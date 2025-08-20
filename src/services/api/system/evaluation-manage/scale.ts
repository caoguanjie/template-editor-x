import { delayDirectiveLoadingMiddleware, PaginationParams, PaginationResult, request, ScaleBindDiagnoseInput, ScaleBindDiagnoseList, ScaleInput, ScaleList, useRequest } from "@/services"




/**
 * 接口名称：获取量表列表(分页)
 * @param params
 * @returns 
 */
export function fetchGetRecoveryScaleList(params: Partial<{ scaleName: string, scaleSortType: string } & PaginationParams>) {
    return request.Get<PaginationResult<ScaleList>>('/recoveryScale/GetRecoveryScaleList',
        {
            params,
            transform: response => {
                const { isSuccess, message, data } = response as Service.ResponseResult<PaginationResult<ScaleList>>
                if (isSuccess) {
                    data.items = data.items.map(item => new ScaleList(item))
                    return data as unknown as PaginationResult<ScaleList>
                } else {
                    // 抛出异常
                    throw new Error(message)
                }
            }

        })

}



/**
 * 接口名称：启动和停用量表
 * @param params
 * @returns 
 */
export function fetchSetRecoveryScaleStatus(data: Partial<{ ScaleID: string, isEnabled: boolean }>) {
    return request.Post<Service.ResponseResult<any>>('/RecoveryScale/SetRecoveryScaleStatus', data, {
        meta: {
            openSuccessTips: false,
            openErrorTips: false
        }
    })

}


/**
 * 接口名称：删除量表
 * @param data
 * @returns 
 */
export function fetchDeleteRecoveryScale(data: Partial<{ ScaleID: string }>) {
    return request.Post<Service.ResponseResult<any>>('/RecoveryScale/DeleteRecoveryScale', data)

}


/**
 * 接口名称：保存量表
 * @param params
 * @returns 
 */
export function fetchSaveRecoveryScale() {
    return useRequest((data: ScaleInput) => {
        const method = request.Post<Service.ResponseResult<any>>('/RecoveryScale/SaveRecoveryScale', data)
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}



/**
 * 接口名称：获取量表详情
 * @param params
 * @returns 
 */
export function fetchGetRecoveryScaleDetail() {
    return useRequest((params: { scaleID: string }) => {
        const method = request.Get<ScaleList>('/recoveryScale/GetRecoveryScaleDetail', {
            params,
            transform: response => {
                const { isSuccess, message, data } = response as Service.ResponseResult<ScaleList>
                if (isSuccess) {
                    return new ScaleList(data)
                } else {
                    throw new Error(message)
                }
            }
        })
        return method
    }, {
        immediate: false,
        middleware: delayDirectiveLoadingMiddleware()
    })
}




/**
 * 接口名称:获取关联诊断列表
 * @param params
 * @returns 
 */
export function fetchGetRecoveryScaleBindDiagList() {
    return useRequest((ScaleID: string) =>
        sysApis.RecoveryScale.get_recoveryscale_getrecoveryscalebinddiaglist({
            params: {
                ScaleID
            },
            transform: (res) => {
                const { data, isSuccess, message } = res as Service.ResponseResult<ScaleBindDiagnoseList>
                if (isSuccess) {
                    return new ScaleBindDiagnoseList(data)
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
 * 接口名称:保存量表关联诊断信息
 * @param params
 * @returns 
 */
export function fetchSaveRecoveryScaleBindDiag() {
    return useRequest((data: ScaleBindDiagnoseInput) =>
        sysApis.RecoveryScale.post_recoveryscale_saverecoveryscalebinddiag({
            data,
        }),
        {
            immediate: false
        }
    )

}


