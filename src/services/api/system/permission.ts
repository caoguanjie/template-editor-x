import { ISavePermission, request, delayDirectiveLoadingMiddleware, PermissionInfo } from "@/services"
import { useRequest } from "@/services"
/**  
  * 增加菜单
  */
export function fetchSavePermission() {
  return useRequest((data: Partial<ISavePermission>) => request.Post<Service.ResponseResult<any>>('/SysPermission/savePermission', data), {
    immediate: false,
    middleware: delayDirectiveLoadingMiddleware()
  })
}

export function fetchPermissionInfo(params: Partial<{ id: string }>) {
  const method = request.Get<Service.ResponseResult<PermissionInfo>>('/SysPermission/getPermissionInfo', { params })
  return method
}

/**
 * 接口名称：查询路由数据源
 * @param params
 * @returns 
 */
export function fetchGetsysRoutingData() {
  return useRequest((params: any) => {
    const method = request.Get<Service.ResponseResult<any>>('/sysRouting/getRoutingData', { params })
    method.meta = {
      // openSuccessTips: true
    }
    return method
  }, {
    immediate: false,
  })
}

/**
 * 接口名称：获取权限菜单列表
 * @param params
 * @returns 
 */
export function fetchGetsysRoutingRoutingList() {
  return useRequest((params: any) => {
    const method = request.Get<Service.ResponseResult<any>>('/sysRouting/getRoutingList', { params })
    method.meta = {
      // openSuccessTips: true
    }
    return method
  }, {
    immediate: false,
  })
}

/**
 * 接口名称：获取路由详情
 * @param params
 * @returns 
 */
export function fetchGetsysRoutingRoutingInfo() {
  return useRequest((params: any) => {
    const method = request.Get<Service.ResponseResult<any>>('/sysRouting/getRoutingInfo', { params })
    method.meta = {
      // openSuccessTips: true
    }
    return method
  }, {
    immediate: false,
  })
}


/**
 * 接口名称：保存路由信息
 * @param params
 * @returns 
 */
export function fetchPostSysRoutingSaveRouting() {
  return useRequest((data: any) => {
    const method = request.Post<Service.ResponseResult<any>>('/sysRouting/saveRouting', data)
    method.meta = {
      // openSuccessTips: true
    }
    return method
  }, {
    immediate: false,
  })
}

/**
 * 获取系统菜单查询列表
 * @param params
 * @returns 
 */
export function fetchGetPermissionList() {
  return useRequest((params: any) => {
    const method = request.Get<Service.ResponseResult<any>>('/SysPermission/GetPermissionList', { params })
    method.meta = {
      // openSuccessTips: true
    }
    return method
  }, {
    immediate: false,
  })
}

/**
 * 接口名称：删除菜单
 * @param params
 * @returns 
 */
export function fetchPostDeletePermission() {
  return useRequest((params: any) => {
    const method = request.Post<Service.ResponseResult<any>>('/SysPermission/DeletePermission', params)
    method.meta = {
      // openSuccessTips: true
    }
    return method
  }, {
    immediate: false,
  })
}


/**
 * 获取系统菜单数据源
 * @param params
 * @returns 
 */
export function fetchGetPermissionSource() {
  return useRequest((params: any) => {
    const method = request.Get<Service.ResponseResult<any>>('/SysPermission/GetPermissionSource', { params })
    method.meta = {
      // openSuccessTips: true
    }
    return method
  }, {
    immediate: false,
  })
}

/**
 * 获取菜单规则列表
 * @param params
 * @returns 
 */
export function fetchGetRuleList() {
  return useRequest((params: any) => {
    const method = request.Get<Service.ResponseResult<any>>('/sysPermission/GetRuleList', { params })
    method.meta = {
      // openSuccessTips: true
    }
    return method
  }, {
    immediate: false,
  })
}


/**
 * 接口名称：保存权限规则
 * @param params
 * @returns 
 */
export function fetchPostSaveRule() {
  return useRequest((params: any) => {
    const method = request.Post<Service.ResponseResult<any>>('/sysPermission/SaveRule', params)
    method.meta = {
      //   openSuccessTips: true
    }
    return method
  }, {
    immediate: false,
  })
}

/**
 * 查询权限规则详情
 * @param params
 * @returns 
 */
export function fetchGetRuleInfo() {
  return useRequest((params: any) => {
    const method = request.Get<Service.ResponseResult<any>>('/sysPermission/GetRuleInfo', { params })
    method.meta = {
      // openSuccessTips: true
    }
    return method
  }, {
    immediate: false,
  })
}

/**
 * 接口名称：删除权限规则
 * @param params
 * @returns 
 */
export function fetchPostDeleteRule() {
  return useRequest((params: any) => {
    const method = request.Post<Service.ResponseResult<any>>('/SysPermission/DeleteRule', params)
    method.meta = {
      //   openSuccessTips: true
    }
    return method
  }, {
    immediate: false,
  })
}