import { ScaleBindDiagnoseOutput } from "@/services";

/**
 * 量表列表类型
 */
export class ScaleList {
    // id
    id?: string;
    // id
    scaleID?: string;
    // 编码
    scaleCode?: string;
    // 名称
    scaleName?: string;
    // 路径
    scaleUrl?: string;
    /**
     * 类型
     */
    scaleSortType?: string;
    // 是否启用
    isEnabled?: boolean;
    // 创建人名称
    creator?: string;
    // 创建时间
    createTime?: string;
    // 类型名称
    scaleSortTypeName?: string
    constructor(data?: any) {
        this.id = data?.id || ''; // id
        this.scaleID = data?.scaleID || ''; // id
        this.scaleCode = data?.scaleCode || ''; // 编码
        this.scaleName = data?.scaleName || ''; // 名称
        this.scaleUrl = data?.scaleUrl || ''; // 路径
        this.scaleSortType = data?.scaleSortType || ''; // 类型
        this.scaleSortTypeName = data?.scaleSortTypeName || ''; // 类型名称
        this.isEnabled = data?.isEnabled ? true : false;; // 是否启用
        this.creator = data?.creator || ''; // 创建人名称
        this.createTime = data?.createTime ? moment(data?.createTime).format('YYYY-MM-DD HH:mm') : '';// 创建时间

    }
};



/**
 * 关联诊断的绑定列表项
 */
export class ScaleBindDiagnoseList implements ScaleBindDiagnoseOutput {
    /**
     * 已绑定列表
     */
    selectedDiagList?: DiagnoseListItem[];
    /**
     * 未绑定列表
     */
    noSelectDiagList?: DiagnoseListItem[];
    constructor(data?: any) {
        this.selectedDiagList = data?.selectedDiagList.map((item: any) => new DiagnoseListItem(item)) ?? [];
        this.noSelectDiagList = data?.noSelectDiagList.map((item: any) => new DiagnoseListItem(item)) ?? [];
    }
}

export class DiagnoseListItem {
    diagID?: string;
    diagCode?: string;
    diagName?: string;
    inputStr?: string;
    constructor(data?: any) {
        this.diagCode = data?.diagCode || ''; // 诊断编码
        this.diagName = data?.diagName || ''; // 诊断名称
        this.diagID = data?.diagID || ''; // 诊断ID
        this.inputStr = data?.inputStr || ''; // 助记符
    }
};