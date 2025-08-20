/**
 * 数据字典接口
 */

import { delayDirectiveLoadingMiddleware, request, useRequest } from "@/services"

/**
 * 接口名称：获取字典值集合列表
 * @param params
 * @returns 
 */
export function fetchGetSysSettingDictDataDropdown() {
    return useRequest((params: any) => {
        const method = request.Get<Service.ResponseResult<any>>('/sysDictData/queryDictDataDropdown', { params })
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}


/**
 * 接口名称：获取字典值详情
 * @param params
 * @returns 
 */
export function fetchGetSysSettingDictionaryItemDetail() {
    return useRequest((params: any) => {
        const method = request.Get<Service.ResponseResult<any>>('/SysDictionary/GetDictionaryItemDetail', { params })
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}


/**
 * 接口名称：获取字典值分页列表
 * @param params
 * @returns 
 */
export function fetchGetSysSettingDictionaryItemPageList() {
    return useRequest((params: any) => {
        const method = request.Get<Service.ResponseResult<any>>('/SysDictionary/GetItemPageList', { params })
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}

/**
 * 接口名称：修改字典值状态
 * @param params
 * @returns 
 */
export function fetchGetSysSettingDictionaryItemOpration() {
    return useRequest((data: any) => {
        const method = request.Post<Service.ResponseResult<any>>('/SysDictionary/DictionaryItemOpration', data)
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}

/**
 * 接口名称：增加字典值
 * @param params
 * @returns 
 */
export function fetchGetSysSettingDictionaryAddDictionaryItem() {
    return useRequest((data: any) => {
        const method = request.Post<Service.ResponseResult<any>>('/SysDictionary/AddDictionaryItem', data)
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}


/**
 * 接口名称：获取字典值列表
 * @param params
 * @returns 
 */
export function fetchGetSysSettingDictionarySysDictDataList() {
    return useRequest((DictTypeId: string) => {
        const method = request.Get<Service.ResponseResult<any>>('/sysDictData/list', {
            params: { DictTypeId }
        })
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}

/**
 * 接口名称：更新字典类型
 * @param params
 * @returns 
 */
export function fetchGetSysSettingUpdateDictionary() {
    return useRequest((data: any) => {
        const method = request.Post<Service.ResponseResult<any>>('/SysDictionary/UpdateDictionary', data)
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}

/**
 * 接口名称：更新字典值
 * @param params
 * @returns 
 */
export function fetchGetSysSettingUpdateDictionaryItem() {
    return useRequest((data: any) => {
        const method = request.Post<Service.ResponseResult<any>>('/SysDictionary/UpdateDictionaryItem', data)
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}

/**
 * 接口名称：启用、停用、删除字典类型
 * @param params
 * @returns 
 */
export function fetchGetSysSettingDictionaryOpration() {
    return useRequest((data: any) => {
        const method = request.Post<Service.ResponseResult<any>>('/SysDictionary/DictionaryOpration', data)
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}

/**
 * 接口名称：添加字典类型
 * @param params
 * @returns 
 */
export function fetchGetSysSettingAddDictionary() {
    return useRequest((data: any) => {
        const method = request.Post<Service.ResponseResult<any>>('/SysDictionary/AddDictionary', data)
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}


/**
 * 接口名称：获取字典类型详情
 * @param params
 * @returns 
 */
export function fetchGetSysSettingDictionaryDetail() {
    return useRequest((params: any) => {
        const method = request.Get<Service.ResponseResult<any>>('/SysDictionary/GetDictionaryDetail', { params })
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}


/**
 * 接口名称： 获取字典类型数据源
 * @param params
 * @returns 
 */
export function fetchGetSysSettingDictionaryAllList() {
    return useRequest((params: any) => {
        const method = request.Get<Service.ResponseResult<any>>('/SysDictionary/GetAllList', { params })
        method.meta = {
            // openSuccessTips: true
        }
        return method
    }, {
        immediate: false,
    })
}


/** 获取角色分页列表 */
export function fetchGetSysDictionaryItemAllList(params: any) {
    return request.Get<Service.ResponseResult<any>>('/SysDictionary/GetItemAllList', { params })
    // return useRequest((params: any) => request.Get<Service.ResponseResult<any>>('/SysDictionary/GetItemAllList', { params }), {
    //     immediate: false,
    //     initialData: [],
    //     middleware: delayDirectiveLoadingMiddleware()
    // })
}