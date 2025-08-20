
/**
 * 接口名称：查询流程步骤列表
 */
export class SysWFStepDefineList {
    /**
     * ID
     */
    id?: string;
    /**
     * 步骤名称
     */
    stepName?: string;
    /**
     * 步骤编码
     */
    stepCode?: string;
    /**
     * 步骤类型
     */
    stepType?: string;
    /**
     * 所属院区
     */
    organName?: string;
    /**
     * 是否启用
     */
    isEnabled?: number;
    constructor(params: SysWFStepDefineList) {
        Object.assign(this, params);
    }
};


// 查询可配置权限数据源
export class StepDefinePermission {
    /**
     * 权限ID
     */
    id?: string;
    /**
     * 父ID
     */
    parentID?: string;
    /**
     * 权限名称
     */
    permissionName?: string;
    /**
     * 节点类型
     */
    type?: string;
    constructor(data: Partial<StepDefinePermission>) {
        Object.assign(this, data);
    }
};



// 步骤类型的枚举
export enum SysWFStepTypeEnum {
    /**
     * 首环节
     */
    Start = 0,
    /**
     * 审批环节
     */
    Approval = 1,
    /**
     * 结束环节
     */
    End = 9
}
// 步骤类型的名称对象
export const StepTypeName: { [key in SysWFStepTypeEnum]: string } = {
    [SysWFStepTypeEnum.Start]: "首环节",
    [SysWFStepTypeEnum.Approval]: "审批环节",
    [SysWFStepTypeEnum.End]: "结束环节"
}
// 步骤类型的下拉数据源
export const stepTypeOption = Object.entries(StepTypeName).map(([key, value]) => ({ label: value, value: key }))

// 抄送对象类型，做一些值的声明
export enum SysWFApprovalObjectEnum {
    /**
     * 指定用户
     */
    User = 0,
    /**
     * 指定角色
     */
    Role = 1,
    /**
     * 指定权限
     */
    Permission = 2,
    /**
     * 主任
     */
    DeptMnager = 3,
    /**
     * 技师长
     */
    TeamLeader = 4
}
// 抄送对象类型的名称对象：作用是为了生成下拉数据源
export const approvalObjectName: { [key in SysWFApprovalObjectEnum]: string } = {
    [SysWFApprovalObjectEnum.User]: "指定用户",
    [SysWFApprovalObjectEnum.Role]: "指定角色",
    [SysWFApprovalObjectEnum.Permission]: "指定权限",
    [SysWFApprovalObjectEnum.DeptMnager]: "主任",
    [SysWFApprovalObjectEnum.TeamLeader]: "技师长"
}
// 抄送对象类型的下拉数据源：作用为了某些控件用。
export const approvalObjectOption = Object.entries(approvalObjectName).map(([key, value]) => ({ label: value, value: key }))

// 对象级别
export enum SysWFApprovalLevelEnum {
    /*
    全院
    */
    Global = 0,
    /*
    本院区
    */
    Organ = 2,
    /*
    部门
    */
    Dept = 3,
    /*
    部门及父部门
    */
    ParentDept = 4
}
// 对象级别的名称对象：作用是为了生成下拉数据源
export const approvalLevelName: { [key in SysWFApprovalLevelEnum]: string } = {
    [SysWFApprovalLevelEnum.Global]: "全院",
    [SysWFApprovalLevelEnum.Organ]: "本院区",
    [SysWFApprovalLevelEnum.Dept]: "部门",
    [SysWFApprovalLevelEnum.ParentDept]: "部门及父部门"
}
// 对象级别的下拉数据源：作用为了某些控件用。
export const approvalLevelOption = Object.entries(approvalLevelName).map(([key, value]) => ({ label: value, value: key }))

/**
 * 接口名称：查询流程步骤选择用户列表
 */
export class SysWorkFlowUserList {
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
    constructor(params: SysWorkFlowUserList) {
        Object.assign(this, params);
    }
};

/**
 * 接口名称：查询流程步骤选择角色列表
 */
export class SysWorkFlowRoleList {
    /**
     * ID
     */
    id?: string;
    /**
     * 角色
     */
    name?: string;
    /**
     * 角色code
     */
    code?: string;
    /**
     * 部门名称
     */
    deptName?: string;
    /**
     * 备注
     */
    remark?: string;
    constructor(params: SysWorkFlowRoleList) {
        Object.assign(this, params);
    }
};