import { PaginationParams } from "@/services"

// 角色列表的入参
export interface IRoleList {
    page: number
    pageSize: number
    name: string
    code: string
    organID: string
    field: string
    order: string
}

// 角色列表的出参
export class RoleListItems {
    id: string
    name: string
    code: string
    remark: string
    sort: number
    organName: string
    defCreateTime: string
    /**
     * @typedef  {Object} Items
     * @property {string} id 角色ID
     * @property {string} name 角色名称
     * @property {string} code 角色编码
     * @property {string} remark 角色描述
     * @property {number} sort 排序
     * @property {string} organName 所属机构名称
     * @property {string} defCreateTime
     */
    constructor({ id, name, code, remark, sort, organName, defCreateTime } = {} as any) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.remark = remark;
        this.sort = sort;
        this.organName = organName;
        this.defCreateTime = defCreateTime;
    }
}

export class RoleList {
    page: number
    pageSize: number
    total: number
    totalPages: number
    items: RoleListItems[] | []
    hasPrevPage: boolean
    hasNextPage: boolean
    /**
     * @typedef  {Object} RoleList
     * @property {number} page 页码
     * @property {number} pageSize 页容量
     * @property {number} total 总条数
     * @property {number} totalPages 总页数
     * @property {RoleListItems[]} items 具体数据
     * @property {boolean} hasPrevPage 是否有上一页
     * @property {boolean} hasNextPage 是否有下一页
     */
    constructor({ page, pageSize, total, totalPages, items, hasPrevPage, hasNextPage } = {} as any) {
        this.page = page;
        this.pageSize = pageSize;
        this.total = total;
        this.totalPages = totalPages;
        this.items = items ?? [];
        this.hasPrevPage = hasPrevPage;
        this.hasNextPage = hasNextPage;
    }
}


// 保存角色信息的入参
export interface ISaveRole {
    /* 角色ID */
    id: string
    // 角色名称
    name: string
    // 角色编码
    code: string
    // 角色描述
    remark: string
    // 排序
    sort: number
    // 所属机构ID
    organID: string
}
// 查询可以复制的角色列表
export interface ICopyRoleList extends ISaveRole {
    page: number
    // 页码容量
    pageSize: number
    // 排序字段
    field: string
    // 排序方向
    order: string
}

// 获取用户信息详情，这个保存用户角色的入参是一样的
export class RoleInfo implements ISaveRole {
    id: string
    name: string
    code: string
    remark: string
    sort: number
    organID: string
    organName: string
    /**
     * @typedef  {Object} SaveRole
     * @property {string} id 角色ID
     * @property {string} name 角色名称
     * @property {string} code 角色编码
     * @property {string} remark 角色描述
     * @property {number} sort 排序
     * @property {string} organID 所属机构ID
     * @property {string} organName 所属机构ID
     */
    constructor({ id, name, code, remark, sort, organID, organName } = {} as any) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.remark = remark;
        this.sort = sort;
        this.organID = organID;
        this.organName = organName;
    }

}
// 查询已分配权限集合的接口出参
export class AllotPermissionList {
    roleID: string
    permissionList: PermissionList[]
    /**
     * @param {string} roleID 角色ID
     * @param {PermissionList[]} permissionList 权限列表
     */
    constructor({ roleID, permissionList }: any) {
        this.roleID = roleID
        this.permissionList = permissionList
    }

}

export class PermissionList {
    roleID: string
    permissionID: string
    /**
     * @param {string} roleID 角色ID
     * @param {string} permissionID 权限ID
     */
    constructor({ roleID, permissionID }: any) {
        this.roleID = roleID
        this.permissionID = permissionID
    }
}

// 角色权限数据源或者是角色列表-查询组织机构数据源
export class RolePermissionSource {
    id: string
    parentID: string
    departmentName: string
    permissionName: string
    type: number
    /**
     * @typedef  {Object} 获取用户管理的组织机构
     * @property {string} id nodeid
     * @property {string} parentID 父级id
     * @property {string} departmentName 部门名字
     * @property {string} permissionName 权限名字
     * @property {number} type 权限类型 0=集团，1=机构，2=部门
     */
    constructor({ id, parentID, departmentName, type, permissionName } = {} as any) {
        this.id = id;
        this.parentID = parentID;
        this.departmentName = departmentName;
        this.permissionName = permissionName;
        this.type = type;
    }
}

// 获取可关联用户列表的入参
export interface ISelectUserList extends PaginationParams {
    roleID: string; // 角色id
    userName: string; // 用户名
    deptID: string; // 部门
}

export interface ISelectUserListResult {
    id: string
    userName: string
    userID: string
    deptName: string
    mobilePhone: string
    sex: number
    loginID: string
}

