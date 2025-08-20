// 设备类别关联项目

import { GetEquipMentTypeItemListOutput, SelectItems } from "@/services";



/**
 * 查看设备类别项目数据
 */
export class EquipMentTypeItemList implements GetEquipMentTypeItemListOutput {
    // 待选项目列表
    noSelectItemsList: SelectItems[];
    // 已选项目列表
    selectedItemsList: SelectItems[];
    constructor(data: any = {}) {
        this.noSelectItemsList = data?.noSelectItemsList.map((item: any) => new SelectItemsClass(item)) || [];
        this.selectedItemsList = data?.selectedItemsList.map((item: any) => new SelectItemsClass(item)) || [];
    }
}

export class SelectItemsClass {
    /**
  * 项目ID
  */
    TreatItemId?: string;
    /**
     * 项目名
     */
    TreatItemName?: string;
    /**
     * 项目类型
     */
    TreatType?: string;
    /**
     * 项目类型
     */
    TreatTypeName?: string;
    constructor(data: any = {}) {
        this.TreatItemId = data?.treatItemId || '';
        this.TreatItemName = data?.treatItemName || '';
        this.TreatType = data?.treatType || '';
        this.TreatTypeName = data?.treatTypeName || '';
    }
}