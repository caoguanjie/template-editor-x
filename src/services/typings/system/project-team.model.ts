
/**
 * 保存项目的入参
 */
export class ISaveSysTreatItem {
    // 项目ID
    TreatItemID: string;
    // 项目名称
    TreatItemName: string;
    // 项目类别ID
    TreatItemCategoryID: string;
    // 点值
    ItemPoint: number | undefined;
    // 治疗时长
    Duration: string;
    // 完成度ID
    TreatRecordFinish: string;
    // 配合度ID
    TreatRecordCooperate: string;
    // 独立度ID
    TreatRecordIndepend: string;
    // 注意事项
    Attentions: string;
    /**
    * 是否启用
    * */
    IsEnabled?: boolean;
    // 是否是评估项
    IsEvaluationItem?: boolean;
    // 单价
    Price?: number;
    // his编码
    OriginID?: string;
    constructor(data?: any) {
        this.TreatItemID = data?.TreatItemID ?? ''; //项目ID
        this.TreatItemName = data?.TreatItemName ?? ''; //项目名称
        this.TreatItemCategoryID = data?.TreatItemCategoryID ?? ''; //项目类别ID
        this.ItemPoint = data?.ItemPoint ? Number(data?.ItemPoint) : undefined;
        this.Duration = data.Duration || 0; //治疗时长
        this.TreatRecordFinish = data?.TreatRecordFinish ?? ''; //完成度ID
        this.TreatRecordCooperate = data?.TreatRecordCooperate ?? ''; //配合度ID
        this.TreatRecordIndepend = data?.TreatRecordIndepend ?? ''; //独立度ID
        this.Attentions = data?.Attentions ?? ''; //注意事项
        this.IsEnabled = data?.IsEnabled ? true : false; //是否启用
        this.IsEvaluationItem = data?.IsEvaluationItem ? true : false; //是否是评估项
        this.Price = Number(data?.Price || 0); //单价
        this.OriginID = data?.OriginID ?? ''; //his编码
    }

}

/**
 * 项目管理列表
 */
export class ProjectManageList {
    /**
     * 项目ID
     */
    TreatItemID?: string;
    /**
     * 项目名称
     */
    TreatItemName?: string;
    /**
     * 项目类别ID
     * */
    TreatItemCategoryID?: string
    /**
     * 项目类别名称
     **/
    TreatItemCategoryName?: string;
    /**
     * 点值
     */
    ItemPoint?: string;
    /**
     * 治疗时长
     * */
    Duration?: number;
    /**
     * 状态ID
     */
    Status?: string;
    /**
     * 状态名称
     * */
    StatusName?: string;
    /**
     * 项目来源
    */
    SourceSys?: string;
    /**
     * 完成度ID
     * */
    TreatRecordFinish?: string;
    /**
     * 完成度名称
     * */
    TreatRecordFinishName?: string;
    /**
     * 配合度ID
     * */
    TreatRecordCooperate?: string;
    /**
     * 配合度名称
     * */
    TreatRecordCooperateName?: string;
    /**
     * 独立度ID
     * */
    TreatRecordIndepend?: string;
    /**
     * 独立度名称
     * */
    TreatRecordIndependName?: string;
    Attentions: string; // 注意事项
    /**
     * 是否启用
     * */
    IsEnabled?: boolean;
    /**
     * HIS编码
     * */
    OriginID?: string;
    // 是否是评估项
    IsEvaluationItem?: boolean;
    // 单价
    Price?: number;
    constructor(data?: any) {
        this.TreatItemID = data?.treatItemID ?? ''; //项目ID
        this.TreatItemName = data?.treatItemName ?? ''; //项目名称
        this.TreatItemCategoryID = data?.treatItemCategoryID ?? ''; //项目类别ID
        this.TreatItemCategoryName = data?.treatItemCategoryName ?? ''; //项目类别名称
        this.ItemPoint = data?.itemPoint ?? '';// 点值
        this.Duration = data?.duration ?? 0; //治疗时长
        this.Status = data?.status ?? ''; //状态ID
        this.StatusName = data?.statusName ?? ''; //状态名称
        this.SourceSys = data?.sourceSys ?? ''; //项目来源
        this.TreatRecordFinish = data?.treatRecordFinish ?? ''; //完成度ID
        this.TreatRecordFinishName = data?.treatRecordFinishName ?? ''; //完成度名称
        this.TreatRecordCooperate = data?.treatRecordCooperate ?? ''; //配合度ID
        this.TreatRecordCooperateName = data?.treatRecordCooperateName ?? ''; //配合度名称
        this.TreatRecordIndepend = data?.treatRecordIndepend ?? ''; //独立度ID
        this.TreatRecordIndependName = data?.treatRecordIndependName ?? ''; //独立度名称
        this.Attentions = data?.attentions ?? ''; //注意事项
        this.IsEnabled = data?.isEnabled ? true : false; //是否启用
        this.OriginID = data?.originID ?? ''
        this.IsEvaluationItem = data?.isEvaluationItem ? true : false; //是否是评估项
        this.Price = Number(data?.price || 0); //单价
    }
}

/**
 * 团队成员列表
 */
export class ProjectTeamList {
    // 序号
    Index?: number;
    // 成员ID
    SysTeamUserID?: string;
    // 成员名称
    SysTeamUserName?: string;
    // 团队ID
    SysTeamID?: string;
    // 团队名称
    SysTeamName?: string;
    // 团队地址
    Address?: string;
    // 是否为负责人
    isMaster?: boolean;
    // 是否停用启用
    isEnabled: boolean
    constructor(data?: any) {
        this.Index = data?.index ?? ''; //序号
        this.SysTeamUserID = data?.sysTeamUserID ?? ''; //成员ID
        this.SysTeamUserName = data?.sysTeamUserName ?? ''; //成员名称
        this.SysTeamID = data?.sysTeamID ?? ''; //团队ID
        this.SysTeamName = data?.sysTeamName ?? ''; //团队名称
        this.Address = data?.address ?? ''; //团队地址
        this.isMaster = data?.isMaster ? true : false; //是否为负责人
        this.isEnabled = data?.isEnabled ? true : false; //是否停用启用，false是停用
    }
}


/**
 * 团队详情
 */
export class TeamDetail {
    /**
     * 团队ID
     */
    SysTeamID: string;

    /**
     * 团队名称
     */
    SysTeamName: string;

    /**
     * 指派模式ID
     */
    AssignType: string;

    /**
     * 团队类型ID
     */
    TeamType: string;

    /**
     * 所属上级ID
     */
    ParentID: string;

    /**
     * 负责人ID
     */
    TeamMaster: string;

    /**
     * 排序
     */
    SortID: number | null;
    /**
     * 
     * DeptName
     * 所属科室
     */
    deptName?: string;
    // 所属科室ID
    deptID?: string;
    Address?: string;
    constructor(data?: any) {
        this.SysTeamID = data?.sysTeamID ?? '';
        this.SysTeamName = data?.sysTeamName ?? '';
        this.AssignType = data?.assignType ?? '';
        this.TeamType = data?.teamType ?? '';
        this.ParentID = data?.parentID ?? '';
        this.TeamMaster = data?.teamMaster ?? '';
        this.SortID = data?.sortID ?? null;
        this.deptName = data?.deptName ?? '';
        this.deptID = data?.deptID ?? '';
        this.Address = data?.address ?? '';
    }
}


export class UnBindTeamUserItem {
    /**
     * 用户ID
     */
    userID?: string;
    /**
     * 用户名
     */
    userName?: string;
    /**
     * 账号
     */
    userCode?: string;
    /**
     * 手机号
     */
    mobile?: string;
    constructor(data?: any) {
        this.userID = data?.userID ?? ''; //用户ID
        this.userName = data?.userName ?? ''; //用户名
        this.userCode = data?.userCode ?? ''; //账号
        this.mobile = data?.mobile ?? ''; //手机号
    }
};
export class BindTeamUserList {
    /**
     * 已绑定用户列表
     */
    selectedUserList?: UnBindTeamUserItem[];
    /**
     * 未绑定用户列表
     */
    noSelectUserList?: UnBindTeamUserItem[];
    constructor(data?: any) {
        this.selectedUserList = data?.selectedUserList.map((item: any) => new UnBindTeamUserItem(item)) ?? [];
        this.noSelectUserList = data?.noSelectUserList.map((item: any) => new UnBindTeamUserItem(item)) ?? [];
    }

};

// 项目点值列表
export class TreatItemPointList {
    /**
     * 点值ID
     */
    id?: string;
    /**
     * 项目ID
     */
    treatItemID?: string;
    /**
     * 项目名称
     */
    treatItemName?: string;
    /**
     * 项目类别ID
     */
    treatItemCategoryID?: string;
    /**
     * 项目类别名称
     */
    treatItemCategoryName?: string;
    /**
     * 执行点值
     */
    itemPoint?: number | string;
    /**
     * 项目单价
     */
    price?: string;
    /**
     * 年月
     */
    yearMonth?: string;
    /**
     * 执行比例
     */
    itemPercentage?: number | string;
    /**
     * 修改人
     */
    lastModifierName?: string;
    // 更新时间
    lastModificationTime?: string;
    // 前端拓展的字段
    // 项目点值原始数据
    itemPointOrigin?: number | string;
    constructor(data?: any) {
        this.id = data?.id ?? ''; //点值ID
        this.treatItemID = data?.treatItemID ?? ''; //项目ID
        this.treatItemName = data?.treatItemName ?? ''; //项目名称
        this.treatItemCategoryID = data?.treatItemCategoryID ?? ''; //项目类别ID
        this.treatItemCategoryName = data?.treatItemCategoryName ?? ''; //项目类别名称
        this.price = data?.price ?? ''; //项目单价
        this.yearMonth = data?.yearMonth ?? ''; //年月
        this.lastModifierName = data?.lastModifierName ?? ''; //修改人
        this.itemPointOrigin = data?.itemPoint ? Number(data?.itemPoint) : ''; //项目点值原始数据
        this.itemPoint = data?.itemPoint ? Number(data?.itemPoint) : ''; //执行点值
        this.itemPercentage = data?.itemPercentage ?? '-'; //执行比例
        this.lastModificationTime = data?.lastModificationTime ? moment(data?.lastModificationTime).format('YYYY-MM-DD HH:mm:ss') : ''; //更新时间
    }
};