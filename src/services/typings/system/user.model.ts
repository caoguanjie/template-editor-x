/**
 * 用户管理
 * 查询组织结构数据源
 * 0=首页组织机构树，1=添加用户组织机构树
 */
export interface IUserDepartmentSource {
    scene: 0 | 1
}

export class UserDepartmentSource {
    id?: string
    parentID?: string
    departmentName?: string
    deptName?: string
    type?: number
    /**
     * @typedef  {Object} 获取用户管理的组织机构
     * @property {string} id nodeid
     * @property {string} parentID 父级id
     * @property {string} deptName 所属科室
     * @property {string} departmentName 部门名字
     * @property {number} type 权限类型 0=集团，1=机构，2=部门
     */
    constructor({ id, parentID, departmentName, type, deptName } = {} as any) {
        this.id = id;
        this.parentID = parentID;
        this.departmentName = departmentName;
        this.deptName = deptName;
        this.type = type;
    }
}
