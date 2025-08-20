import { AllotPermissionList, ICopyRoleList, IRoleList, ISaveRole, ISelectUserList, ISelectUserListResult, PaginationResult, RoleInfo, RoleList, RolePermissionSource, delayDirectiveLoadingMiddleware, downloadInstance, request } from "@/services"
import { useRequest } from "@/services"
/** 获取列表 */
export const { send: GetSysFilelist } = useRequest((params: Partial<any>) =>
  request.Get<Service.ResponseResult<any>>('/sysFile/list', { params }), {
  immediate: false,
  initialData: [],
  middleware: delayDirectiveLoadingMiddleware()
})

//下载文件
export const { send: PostSysFiledownload } = useRequest((data: Partial<ISaveRole>) => {
  const method = downloadInstance.Post<Service.ResponseResult<any>>('/sysFile/download',
    data
  )
  method.meta = {
    // openSuccessTips: true
  }
  method.config.headers = {
    'responseType': 'blob',
  }
  return method
}, {
  immediate: false,
  initialData: [],
  middleware: delayDirectiveLoadingMiddleware()
})

//下载文件
export const { send: PostSysFileDelete } = useRequest((data: Partial<ISaveRole>) => {
  const method = request.Post<Service.ResponseResult<boolean>>('/SysFile/delete', data)
  method.meta = {
    // openSuccessTips: true
  }
  return method
}, {
  immediate: false,
  initialData: [],
  middleware: delayDirectiveLoadingMiddleware()
})