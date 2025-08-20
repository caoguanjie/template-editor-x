
/**
 * 接口名称：查询流程步骤列表
 */
export class SysWFMainConfigList {
    /**
     * ID
     */
    id?: string;
    /**
     * 姓名
     */
    name?: string;
    /**
     * 账号
     */
    loginID?: string;
    /**
     * 部门名称
     */
    deptName?: string;
    /**
     * 手机
     */
    mobilePhone?: string;
    /**
     * 状态
     */
    isEnabled?: number;
    constructor(params: SysWFMainConfigList) {
        Object.assign(this, params);
    }
};

export class SysWFConditionDefineList {
    /**
     * ID
     */
    id?: string;
    /**
     * 字段名称
     */
    conditionName?: string;
    /**
     * 字段编码
     */
    conditionCode?: string;
    /**
     * 字段符号名称
     */
    conditionSymbolName?: string;
    /**
     * 状态
     */
    isEnabled?: number;
    constructor(params: SysWFConditionDefineList) {
        Object.assign(this, params);
    }
}