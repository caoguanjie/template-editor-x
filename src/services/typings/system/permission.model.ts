
export interface ISavePermission {
    // 权限ID
    id: string
    // 菜单名字、权限名字
    name: string
    // 权限编码
    code: string
    // 权限类型
    type: number
    // 父级id
    parentID: string
    // 排序
    sort: number
    // 图标
    image: string
    // 路径
    url: string
    // 是否显示
    isDisplay: boolean
    // 备注
    remark: string
    // 是否缓存
    isCache: boolean
    // 是否固定
    isAffix: boolean
    // 组件地址
    component: string
    // 重定向地址
    redirect: string
}
// 权限详情的详细信息
export class PermissionInfo implements ISavePermission {
    // 权限ID
    id: string
    // 菜单名字、权限名字
    name: string
    // 权限编码
    code: string
    // 权限类型
    type: number
    // 父级id
    parentID: string
    // 排序
    sort: number
    // 图标
    image: string
    // 路径
    url: string
    // 是否显示
    isDisplay: boolean
    // 备注
    remark: string
    // 是否缓存
    isCache: boolean
    // 是否固定
    isAffix: boolean
    // 组件地址
    component: string
    // 重定向地址
    redirect: string
    constructor(info?: ISavePermission) {
        Object.assign(this, info)
        this.isAffix = info?.isAffix || true
        this.isCache = info?.isCache || true
        this.component = info?.component || './views/ready/index.vue'
        this.redirect = info?.redirect || ''
    }
}