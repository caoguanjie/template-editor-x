import { request, ProjectManageList, PaginationResult, PaginationParams, ISaveSysTreatItem, useRequest, EvaluationUnSelectItemList, TreatItemPointList, SaveItemPointInput, downloadInstance } from "@/services"


/**
 * 接口名称：获取项目列表（分页）
 * @param params
 * @returns 
 */
export function fetchGetSysTreatItemList(params: Partial<{ TreatItemName: string, TreatItemCategory: string } & PaginationParams>) {
    return request.Get<PaginationResult<ProjectManageList>>('/SysTreatItems/GetSysTreatItemList',
        {
            params,
            transform: response => {
                const { isSuccess, message, data } = response as Service.ResponseResult<PaginationResult<ProjectManageList>>
                if (isSuccess) {
                    data.items = data.items.map(item => new ProjectManageList(item))
                    return data as unknown as PaginationResult<ProjectManageList>
                } else {
                    // 抛出异常
                    throw new Error(message)
                }
            }

        })
}

/**
 * 接口名称：获取项目详情
 * @param params
 * @returns 
 */
export function fetchGetSysTreatItemDetail(params: Partial<{ TreatItemID: string }>) {
    return request.Get<ProjectManageList>('/SysTreatItems/GetSysTreatItemDetail',
        {
            params,
            transform: response => {
                const { isSuccess, message, data } = response as Service.ResponseResult<ProjectManageList>
                if (isSuccess) {
                    return new ProjectManageList(data)
                } else {
                    // 抛出异常
                    throw new Error(message)
                }
            }

        })

}

/**
 * 接口名称：保存项目/新增项目
 * @param params
 * @returns 
 */
export function fetchSaveSysTreatItem(data: Partial<ISaveSysTreatItem>) {
    return request.Post<Service.ResponseResult<any>>('/SysTreatItems/SaveSysTreatItem', { ...new ISaveSysTreatItem(data) }, {
        // meta: {
        //     openSuccessTips: true
        // }
    })
}

/**
 * 接口名称：批量保存项目类别
 * @param params
 * @returns 
 */
export function fetchSetSysTreatItemCategory(data: Partial<{ TreatItemIDList: string, TreatItemCategoryID: string }>) {
    return request.Post<Service.ResponseResult<any>>('/SysTreatItems/SaveSysTreatItemCategory', data, {
        meta: {
            // openSuccessTips: true
        }
    })

}

/**
 * 接口名称：启动和停用项目
 * @param params
 * @returns 
 */
export function fetchSetSysTreatItemStatus(data: Partial<{ TreatItemID: string, isEnabled: boolean }>) {
    return request.Post<Service.ResponseResult<any>>('/SysTreatItems/SetSysTreatItemStatus', data, {
        meta: {
            // openSuccessTips: false,
            // openErrorTips: false
        }
    })

}

/**
 * 接口名称:获取项目已绑定评定表列表
 * @param params
 * @returns 
 */
export function fetchGetEvaluationSelectItemList() {
    return useRequest((TreatItemID: string) =>
        sysApis.SysTreatItem.get_systreatitems_getevaluationselectitemlist({
            params: {
                TreatItemID
            },
            transform: (res) => {
                const { data, isSuccess, message } = res as Service.ResponseResult<EvaluationUnSelectItemList>
                if (isSuccess) {
                    return new EvaluationUnSelectItemList(data)
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
export function fetchSaveEvaluationSelectItem() {
    return useRequest((data: { treatItemID: string, evaluationCodeList: string }) =>
        sysApis.SysTreatItem.post_systreatitems_saveevaluationselectitem({
            data,
            meta: {
                // openSuccessTips: true
            }
        }),
        {
            immediate: false
        }
    )

}

/**
 * 接口名称：获取点值列表详情
 * @param params
 * @returns 
 */
export function fetctTreatItemPoint(params: Partial<{
    /**
            * 项目名称
            */
    TreatItemName?: string;
    /**
     * 项目类别
     */
    TreatItemCategory?: string;
    /**
     * 年月
     * [required]
     */
    YearMonth: string;
} & PaginationParams>) {
    return request.Get<PaginationResult<TreatItemPointList>>('/treatItemPoint/getItemList',
        {
            params,
            transform: response => {
                const { isSuccess, message, data } = response as Service.ResponseResult<PaginationResult<TreatItemPointList>>
                if (isSuccess) {
                    data.items = data.items.map(item => new TreatItemPointList(item))
                    return data as unknown as PaginationResult<TreatItemPointList>
                } else {
                    // 抛出异常
                    throw new Error(message)
                }
            }

        })

}

/**
 * 接口名称：保存单个项目点值
 * @param params
 * @returns 
 */
export function fetchSavePointValue(data: Partial<SaveItemPointInput>) {
    return request.Post<Service.ResponseResult<any>>('/treatItemPoint/savePointValue', data, {
        // meta: {
        //     openSuccessTips: true
        // }
    })
}


/**
 * 接口名称：查询单个项目的全部月份点值 分页
 * @param params
 * @returns 
 */
export function fetctGetPointValueList(params: Partial<{
    /**
    * 项目ID
    */
    TreatItemID?: string;
} & PaginationParams>) {
    return request.Get<PaginationResult<TreatItemPointList>>('/treatItemPoint/getPointValueList',
        {
            params,
            transform: response => {
                const { isSuccess, message, data } = response as Service.ResponseResult<PaginationResult<TreatItemPointList>>
                if (isSuccess) {
                    data.items = data.items.map(item => new TreatItemPointList(item))
                    return data as unknown as PaginationResult<TreatItemPointList>
                } else {
                    // 抛出异常
                    throw new Error(message)
                }
            }

        })

}



/**
 * 接口名称：导出项目点值列表
 * @param params
 * @returns 
 */
export function fetchTreatItemPointExport(params: {
    /**
     * 项目名称
     */
    TreatItemName?: string;
    /**
     * 项目类别
     */
    TreatItemCategory?: string;
    /**
     * 年月
     * [required]
     */
    YearMonth: string;
}) {
    return downloadInstance.Get<Service.ResponseResult<any>>('/treatItemPoint/export', {
        params, meta: {
            authRole: null
        }, headers: {
            'responseType': 'blob', "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        }
    })

}
