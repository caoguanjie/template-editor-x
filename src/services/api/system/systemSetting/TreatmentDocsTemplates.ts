
// 治疗文书模版管理

import { PaginationParams, PaginationResult, request, TreatFileSaveTemplateInput, useRequest } from "@/services";

/**
 * 接口名称：查询治疗文书模板列表
 * @param params
 * @returns 
 */
export function fetctFileTemplateList(params: Partial<{
    /**
     * 治疗文书模板名称
     */
    TreatFileName?: string;
    /**
     * 模板名称类型
     */
    TreatFileType?: string;
} & PaginationParams>) {
    return request.Get<PaginationResult<TreatFileTemplateList>>('/fileTemplate/getList',
        {
            params,
            transform: response => {
                const { isSuccess, message, data } = response as Service.ResponseResult<PaginationResult<TreatFileTemplateList>>
                if (isSuccess) {
                    data.items = data.items.map(item => new TreatFileTemplateList(item))
                    return data as unknown as PaginationResult<TreatFileTemplateList>
                } else {
                    // 抛出异常
                    throw new Error(message)
                }
            }

        })
}




/**
 * 接口名称：保存治疗文书模板
 * @param params
 * @returns 
 */
export function fetchSaveThreatmentTemplate() {
    return useRequest((data: TreatFileSaveTemplateInput) => {
        const method = request.Post<Service.ResponseResult<any>>('/fileTemplate/saveTemplate', data)
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}


/**
 * 接口名称：删除模板
 * @param params
 * @returns 
 */
export function fetchDeleteTemplate() {
    return useRequest((data: any) => {
        const method = request.Post<Service.ResponseResult<any>>('/fileTemplate/deleteTemplate', data)
        return method
    }, {
        immediate: false,
    })
}

/**
 * 接口名称：查询治疗文书模板详情
 * @param params
 * @returns 
 */
export function fetchFileTemplateDetail() {
    return useRequest((params: { fileTemplateID: string }) => {
        const method = request.Get<TreatFileTemplateDetail>('/fileTemplate/getDetail', {
            params,
            transform: response => {
                const { isSuccess, message, data } = response as Service.ResponseResult<TreatFileTemplateDetail>
                if (isSuccess) {
                    return new TreatFileTemplateDetail(data)
                } else {
                    throw new Error(message)
                }
            }
        })
        return method
    }, {
        immediate: false
    })
}

/**
 * 接口名称:查询模板绑定的项目列表
 * @param params
 * @returns 
 */
export function fetchGetItemLink() {
    return useRequest((fileTemplateID: string) => {
        const method = request.Get<TreatFileTemplateGetItemLink>('/fileTemplate/getItemLink', {
            params: {
                fileTemplateID
            },
            transform: response => {
                const { isSuccess, message, data } = response as Service.ResponseResult<TreatFileTemplateGetItemLink>
                if (isSuccess) {
                    return new TreatFileTemplateGetItemLink(data)
                } else {
                    throw new Error(message)
                }
            }
        })
        return method
    }, {
        immediate: false
    })
}

/**
 * 接口名称：修改模板和项目关联关系
 * @param params
 * @returns 
 */
export function fetchSaveItemLink() {
    return useRequest((data: any) => {
        const method = request.Post<Service.ResponseResult<any>>('/fileTemplate/saveItemLink', data)
        return method
    }, {
        immediate: false,
    })
}


/**
 * 接口名称：查询待签名治疗记录登录提醒
 * @param params
 * @returns 
 */
export function fetchGetSignRemind() {
    const method = request.Get<Service.ResponseResult<any>>('/executeFile/getSignRemind')
    method.meta = {
        openErrorTips: false,
    }
    return method
}

/**
 * 关联诊断的绑定列表项
 */
export class TreatFileTemplateGetItemLink {
    /**
       * 已绑定项目列表
       */
    selectedItemList?: TreatFileTemplateItem[];
    /**
     * 未绑定项目列表
     */
    noSelectItemList?: TreatFileTemplateItem[];
    constructor(data?: any) {
        this.selectedItemList = data?.selectedItemList.map((item: any) => new TreatFileTemplateItem(item)) ?? [];
        this.noSelectItemList = data?.noSelectItemList.map((item: any) => new TreatFileTemplateItem(item)) ?? [];
    }
}

export class TreatFileTemplateItem {
    /**
  * 项目ID
  */
    itemID?: string;
    /**
     * 项目名称
     */
    itemName?: string;
    /**
     * 项目类型
     */
    itemCategoryID?: string;
    /**
     * 项目类型名称
     */
    itemCategoryName?: string;
    constructor(data?: any) {
        this.itemID = data?.itemID || ''; // 诊断编码
        this.itemName = data?.itemName || ''; // 诊断名称
        this.itemCategoryID = data?.itemCategoryID || ''; // 诊断ID
        this.itemCategoryName = data?.itemCategoryName || ''; // 助记符
    }
};

export class TreatFileTemplateList {
    /**
      * 模板ID，用以排序
      */
    id?: string;
    /**
     * 模板ID
     */
    fileTemplateID?: string;
    /**
     * 文书模板名称
     */
    treatFileName?: string;
    /**
     * 文书模板类别，数据字典：TreatFileType
     */
    treatFileType?: string;
    /**
     * 文书模板类别名称
     */
    treatFileTypeName?: string;
    /**
     * 是否首次记录治疗文书
     */
    isBegin?: number;
    /**
     * 模板路径
     */
    treatFileUrl?: string;
    /**
     * 打印路径
     */
    printUrl?: string;
    /**
     * 是否团队治疗
     */
    isTeam?: boolean;
    /**
     * 签名模式 1、2、3级签名
     */
    signMode?: number;
    /**
     * 完成要求：高、普通
     */
    finishLevel?: number;
    /**
     * 页眉
     */
    header?: string;
    /**
     * 是否启用
     */
    isEnabled?: boolean;
    /**
     * 是否合并打印
     */
    isCombinePrint?: number;
    /**
     * 是否自动弹出
     */
    isAuto?: number;
    /**
     * 关联的项目名称
     */
    linkItemName?: string;
    constructor(data: Partial<TreatFileTemplateList>) {
        Object.assign(this, data)
    }
};

// 治疗文书模板详情
export class TreatFileTemplateDetail {
    /**
     * 模板ID
     */
    fileTemplateID?: string;
    /**
     * 文书模板名称
     */
    treatFileName?: string;
    /**
     * 文书模板类别，数据字典：TreatFileType
     */
    treatFileType?: string;
    /**
     * 文书模板类别名称
     */
    treatFileTypeName?: string;
    /**
     * 是否首次记录治疗文书
     */
    isBegin?: number;
    /**
     * 模板路径
     */
    treatFileUrl?: string;
    /**
     * 打印路径
     */
    printUrl?: string;
    /**
     * 是否团队治疗
     */
    isTeam?: boolean;
    /**
     * 签名模式 1、2、3级签名
     */
    signMode?: number;
    /**
     * 完成要求：高、普通
     */
    finishLevel?: number;
    /**
     * 页眉
     */
    header?: string;
    /**
     * 是否启用
     */
    isEnabled?: boolean;
    /**
     * 是否合并打印
     */
    isCombinePrint?: number;
    /**
     * 是否自动弹出
     */
    isAuto?: number;
    constructor(data: Partial<TreatFileTemplateDetail>) {
        Object.assign(this, data)
    }
};