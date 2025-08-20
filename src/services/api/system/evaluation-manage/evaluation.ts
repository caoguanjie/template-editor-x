import { delayDirectiveLoadingMiddleware, EvaluationInput, EvaluationListOutput, PaginationParams, PaginationResult, request, useRequest } from "@/services"


/**
 * 接口名称：获取评定表列表(分页)
 * @param params
 * @returns 
 */
export function fetchGetEvaluationList(params: Partial<{ evaluationName: string, evaluationType: string } & PaginationParams>) {
    return request.Get<PaginationResult<EvaluationListOutput>>('/evaluation/GetEvaluationList',
        {
            params,
            transform: response => {
                const { isSuccess, message, data } = response as Service.ResponseResult<PaginationResult<EvaluationListOutput>>
                if (isSuccess) {
                    data.items = data.items.map(item => new EvaluationListOutput(item))
                    return data as unknown as PaginationResult<EvaluationListOutput>
                } else {
                    // 抛出异常
                    throw new Error(message)
                }
            }

        })

}
/**
 * 接口名称：启动和停用评定表
 * @param params
 * @returns 
 */
export function fetchSetEvaluationStatus(data: Partial<{ evaluationID: string, isEnabled: boolean }>) {
    return request.Post<Service.ResponseResult<any>>('/Evaluation/SetEvaluationStatus', data, {
        meta: {
            openSuccessTips: false,
            openErrorTips: false
        }
    })

}

/**
 * 接口名称：删除评定表
 * @param data
 * @returns 
 */
export function fetchDeleteEvaluation(data: Partial<{ evaluationID: string }>) {
    return request.Post<Service.ResponseResult<any>>('/Evaluation/DeleteEvaluation', data)

}


/**
 * 接口名称：获取评定表详情
 * @param params
 * @returns 
 */
export function fetchGetEvaluationDetail() {
    return useRequest((params: { evaluationID: string }) => {
        const method = request.Get<EvaluationListOutput>('/evaluation/GetEvaluationDetail', {
            params,
            transform: response => {
                const { isSuccess, message, data } = response as Service.ResponseResult<EvaluationListOutput>
                if (isSuccess) {
                    return new EvaluationListOutput(data)
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
 * 接口名称：保存评定表
 * @param params
 * @returns 
 */
export function fetchSaveEvaluation() {
    return useRequest((data: EvaluationInput) => {
        const method = request.Post<Service.ResponseResult<any>>('/Evaluation/SaveEvaluation', data)
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}


