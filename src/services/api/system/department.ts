import { request } from "@/services"
import { useRequest } from "@/services"

/**
 * 接口名称：获取部门详情
 * @param params
 * @returns 
 */
export function fetchGetDepartmentInfo() {
  return useRequest((params: any) => {
    const method = request.Get<Service.ResponseResult<any>>('/SysDepartment/GetDepartmentInfo', { params })
    method.meta = {
      // openSuccessTips: true
    }
    return method
  }, {
    immediate: false,
  })
}

// /**
//  * 接口名称：获取组织机构数据源
//  * @param params
//  * @returns 
//  */
// export function fetchGetDepartmentSource() {
//   return useRequest((params: any) => {
//     const method = request.Get<Service.ResponseResult<any>>('/SysDepartment/GetDepartmentSource', { params })
//     method.meta = {
//       // openSuccessTips: true
//     }
//     return method
//   }, {
//     immediate: false,
//   })
// }

/**
 * 接口名称：增加组织机构
 * @param params
 * @returns 
 */
export function fetchSaveDepartment() {
  return useRequest((params: any) => {
    const method = request.Post<Service.ResponseResult<any>>('/SysDepartment/SaveDepartment', params)
    method.meta = {
      // openSuccessTips: true
    }
    return method
  }, {
    immediate: false,
  })
}


/**
 * 接口名称：获取机构列表，入参允许为空对象获取所有的机构
 * @param params
 * @returns 
 */
export function fetchGetDepartmentList() {
  return useRequest((params: any) => {
    const method = request.Get<Service.ResponseResult<any>>('/SysDepartment/GetDepartmentList', { params })
    method.meta = {
      // openSuccessTips: true
    }
    return method
  }, {
    immediate: false,
  })
}

/**
 * 接口名称：删除、启用、停用组织
 * @param params
 * @returns 
 */
export function fetchPostSysDepartmentOperation() {
  return useRequest((params: any) => {
    const method = request.Post<Service.ResponseResult<any>>('/SysDepartment/Operation', params)
    method.meta = {
      // openSuccessTips: true
    }
    return method
  }, {
    immediate: false,
  })
}


/**
 * 接口名称：保存机构信息
 * @param params
 * @returns 
 */
export function fetchSaveOrganizationInfo() {
  return useRequest((data: any) => {
    const method = request.Post<Service.ResponseResult<any>>('/sysOrganization/saveOrganizationInfo', data)
    return method
  }, {
    immediate: false,
  })
}


/**
 * 接口名称：查询机构分页列表（数组）
 * @param params
 * @returns 
 */
export function fetchGetOrganizationInfoPageList() {
  return useRequest((params: any) => {
    const method = request.Get<Service.ResponseResult<any>>('/sysOrganization/getOrganizationInfoPageList', { params })
    method.meta = {
      // openErrorTips: false
    }
    return method
  }, {
    immediate: false,
  })
}

/**
 * 接口名称： 获取可配置负责人列表
 * @param params
 * @returns 
 */
export function fetchGetSelectUserList() {
  return useRequest((params: any) => {
    const method = request.Get<Service.ResponseResult<any>>('/SysDepartment/GetSelectUserList', { params })
    method.meta = {
      // openErrorTips: false
    }
    return method
  }, {
    immediate: false,
  })
}


/**
 * 接口名称： 获取已配置负责人
 * @param params
 * @returns 
 */
export function fetchGetGroupLeaderList() {
  return useRequest((params: any) => {
    const method = request.Get<Service.ResponseResult<any>>('/SysDepartment/GetGroupLeaderList', { params })
    method.meta = {
      // openErrorTips: false
    }
    return method
  }, {
    immediate: false,
  })
}




/**
 * 接口名称： 保存负责人
 * @param params
 * @returns 
 */
export function fetchSaveGroupLeader() {
  return useRequest((data: any) => {
    const method = request.Post<Service.ResponseResult<any>>('/SysDepartment/SaveGroupLeader', data)
    method.meta = {
      // openErrorTips: false
    }
    return method
  }, {
    immediate: false,
  })
}


