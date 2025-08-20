import { GetEvaluationUnSelectItemListInputOutput } from "@/services"

/**
 * 获取科室团队树
 */
export class SysTeamTree {
    id: string
    parentID: string
    type: number
    departmentName: string
    children: SysTeamTree[]
    /**
     * @typedef  {Object} 获取用户管理的组织机构
     * @property {string} id nodeid
     * @property {string} parentID 父级id
     * @property {string} departmentName 部门名字
     * @property {number} type 权限类型 0：机构 1：科室 2：团队
     */
    constructor(data?: any) {
        this.id = data?.id ?? '';
        this.parentID = data?.parentID ?? '';
        this.type = data?.type ?? 0;
        this.departmentName = data?.departmentName ?? '';
        this.children = data?.children ?? [];
    }
}

/**
 * 获取团队待绑定项目列表（分页）
 * 属性名字不可以变，因为前端需要相同的属性名做同一种交互，但是后端的属性名不同，所以需要做转换
 */
export class TeamUnBindTreatItemList {
    // 项目ID
    TreatItemId: string;
    // 项目名称
    TreatItemName: string;
    /**
    * 项目类别ID
    * */
    TreatType?: string
    /**
     * 项目类别名称
     **/
    TreatTypeName?: string;
    constructor(data?: any) {
        this.TreatItemId = data?.treatItemID ?? '';
        this.TreatItemName = data?.treatItemName ?? '';
        this.TreatType = data?.treatItemCategoryID ?? '';
        this.TreatTypeName = data?.treatItemCategoryName ?? '';
    }
}

/**
 * 获取团队已绑定项目列表不分页
 */
export class TeamTreatItemList {
    // 待选项目列表
    noSelectItemsList: TeamUnBindTreatItemList[];
    // 已选项目列表
    selectedItemsList: TeamUnBindTreatItemList[];
    constructor(data: any = {}) {
        this.noSelectItemsList = data?.noSelectItemList.map((item: any) => new TeamUnBindTreatItemList(item)) ?? [];
        this.selectedItemsList = data?.selectedItemList.map((item: any) => new TeamUnBindTreatItemList(item)) ?? [];
    }
}
/**
 * 绑定评定表
 */
export class EvaluationUnSelectItemList implements GetEvaluationUnSelectItemListInputOutput {
    /**
     * 已绑定列表
     */
    selectedEvaluationList?: EvaluationList[];
    /**
     * 未绑定列表
     */
    noSelectEvaluationList?: EvaluationList[];
    constructor(data?: any) {
        this.selectedEvaluationList = data?.selectedEvaluationList.map((item: any) => new EvaluationList(item)) ?? [];
        this.noSelectEvaluationList = data?.noSelectEvaluationList.map((item: any) => new EvaluationList(item)) ?? [];
    }
}

export class EvaluationList {
    /**
     * 评定表编码
     */
    evaluationCode?: string;
    /**
     * 评定表名称
     */
    evaluationName?: string;
    constructor(data?: any) {
        this.evaluationCode = data?.evaluationCode ?? '';
        this.evaluationName = data?.evaluationName ?? '';
    }
};