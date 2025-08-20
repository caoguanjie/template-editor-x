import { request } from "@/services"
import { useRequest } from "@/services"

/**
 * 接口名称：获取配置分组分页列表
 * @param params
 * @returns 
 */
export function fetchGetSysSettingGroupGroupList() {
  return useRequest((params: any) => {
    const method = request.Get<Service.ResponseResult<any>>('/SysSettingGroup/GetGroupList', { params })
    method.meta = {
      // openSuccessTips: true
    }
    return method
  }, {
    immediate: false,
  })
}

/**
 * 接口名称：获取治疗设备列表
 * @param params
 * @returns 
 */
export function fetchGetTreatEquipMentList() {
  return useRequest((params: any) => {
    const method = request.Get<Service.ResponseResult<any>>('/treatEquipMent/getTreatEquipMentList', { params })
    method.meta = {
      // openSuccessTips: true
    }
    return method
  }, {
    immediate: false,
  })
}

/**
 * 接口名称：新增、编辑配置分组
 * @param data
 * @returns 
 */
export function fetchPostSysSettingGroupSaveGroupInfo() {
  return useRequest((data: any) => {
    const method = request.Post<Service.ResponseResult<any>>('/SysSettingGroup/SaveGroupInfo', data)
    method.meta = {
      // openSuccessTips: true
    }
    return method
  }, {
    immediate: false,
  })
}

/**
 * 接口名称：保存治疗设备
 * @param data
 * @returns 
 */
export function fetchPostSaveTreatEquipMent() {
  return useRequest((data: any) => {
    const method = request.Post<Service.ResponseResult<any>>('/treatEquipMent/saveTreatEquipMent', data)
    method.meta = {
      // openSuccessTips: true
    }
    return method
  }, {
    immediate: false,
  })
}

/**
 * 接口名称：删除、启用、停用配置分组
 * @param data
 * @returns 
 */
export function fetchPostSysSettingGroupOperation() {
  return useRequest((data: any) => {
    const method = request.Post<Service.ResponseResult<any>>('/SysSettingGroup/Operation', data)
    method.meta = {
      // openSuccessTips: true
    }
    return method
  }, {
    immediate: false,
  })
}

/**
 * 接口名称：操作治疗设备
 * @param data
 * @returns 
 */
export function fetchPostOperateTreatEquipMent() {
  return useRequest((data: any) => {
    const method = request.Post<Service.ResponseResult<any>>('/treatEquipMent/operateTreatEquipMent', data)
    method.meta = {
      // openSuccessTips: true
    }
    return method
  }, {
    immediate: false,
  })
}


/**
 * 接口名称：获取配置分组详情
 * @param params
 * @returns 
 */
export function fetchGetSysSettingGroupGetGroupInfo() {
  return useRequest((params: any) => {
    const method = request.Get<Service.ResponseResult<any>>('/SysSettingGroup/GetGroupInfo', { params })
    method.meta = {
      // openSuccessTips: true
    }
    return method
  }, {
    immediate: false,
  })
}

/**
 * 接口名称：获取治疗设备信息
 * @param params
 * @returns 
 */
export function fetchGetTreatEquipMentInfo() {
  return useRequest((params: any) => {
    const method = request.Get<Service.ResponseResult<any>>('/treatEquipMent/getTreatEquipMentInfo', { params })
    method.meta = {
      // openSuccessTips: true
    }
    return method
  }, {
    immediate: false,
  })
}

/**
 * 查询院区分页列表
 * @param params
 * @returns 
 */
export function fetchGetOrganizationPageList() {
  return useRequest((params: any) => {
    const method = request.Get<Service.ResponseResult<any>>('/sysOrganization/getOrganizationPageList', { params })
    method.meta = {
      // openSuccessTips: true
    }
    return method
  }, {
    immediate: false,
  })
}

/**
 * 院区新增、编辑
 * @param data
 * @returns 
 */
export function fetchPostSaveOrganization() {
  return useRequest((data: any) => {
    const method = request.Post<Service.ResponseResult<any>>('/sysOrganization/saveOrganization', data)
    method.meta = {
      // openSuccessTips: true
    }
    return method
  }, {
    immediate: false,
  })
}

/**
 * 查询院区详情
 * @param params
 * @returns 
 */
export function fetchGetOrganizationInfo() {
  return useRequest((params: any) => {
    const method = request.Get<Service.ResponseResult<any>>('/sysOrganization/getOrganizationInfo', { params })
    method.meta = {
      // openSuccessTips: true
    }
    return method
  }, {
    immediate: false,
  })
}

/**
 * 院区删除
 * @param data
 * @returns 
 */
export function fetchPostDeleteOrganization() {
  return useRequest((data: any) => {
    const method = request.Post<Service.ResponseResult<any>>('/sysOrganization/deleteOrganization', data)
    method.meta = {
      // openSuccessTips: true
    }
    return method
  }, {
    immediate: false,
  })
}

/**
 * 查询院区辅助人分页列表
 * @param params
 * @returns 
 */
export function fetchGetNursePageList() {
  return useRequest((params: any) => {
    const method = request.Get<Service.ResponseResult<any>>('/sysOrganization/getNurseList', { params })
    method.meta = {
      // openSuccessTips: true
    }
    return method
  }, {
    immediate: false,
  })
}

/**
 * 启用/停用/删除辅助人
 * @param data
 * @returns 
 */
export function fetchPostOperationNurse() {
  return useRequest((data: any) => {
    const method = request.Post<Service.ResponseResult<any>>('/sysOrganization/operationNurse', data)
    method.meta = {
      // openSuccessTips: true
    }
    return method
  }, {
    immediate: false,
  })
}

/**
 * 辅助人新增、编辑
 * @param data
 * @returns 
 */
export function fetchPostSaveNurse() {
  return useRequest((data: any) => {
    const method = request.Post<Service.ResponseResult<any>>('/sysOrganization/saveNurse', data)
    method.meta = {
      // openSuccessTips: true
    }
    return method
  }, {
    immediate: false,
  })
}

/**
 * 接口名称：查询辅助人信息详情
 * @param params
 * @returns 
 */
export function fetchGetNurseInfo() {
  return useRequest((params: any) => {
    const method = request.Get<Service.ResponseResult<any>>('/sysOrganization/getNurseInfo', { params })
    method.meta = {
      // openSuccessTips: true
    }
    return method
  }, {
    immediate: false,
  })
}