
// 评定表列表类型
export class EvaluationListOutput {
    // ID
    id?: string;
    // 编码
    evaluationID?: string;
    // 编码
    evaluationCode?: string;
    // 名称
    evaluationName?: string;
    // 路径
    evaluationUrl?: string;
    // 评定表类型
    evaluationType?: string;
    /**
     * 类型名称
     */
    evaluationTypeName?: string;
    // 是否启用
    isEnabled?: boolean;
    // 创建人名称
    creator?: string;
    // 创建时间
    createTime?: string;
    constructor(data?: any) {
        this.id = data?.id || ''; // ID
        this.evaluationID = data?.evaluationID || ''; // 编码
        this.evaluationCode = data?.evaluationCode || ''; // 编码
        this.evaluationName = data?.evaluationName || ''; // 名称
        this.evaluationUrl = data?.evaluationUrl || ''; // 路径
        this.evaluationType = data?.evaluationType || ''; // 评定表类型
        this.evaluationTypeName = data?.evaluationTypeName || ''; // 类型名称
        this.isEnabled = data?.isEnabled ? true : false;; // 是否启用用
        this.creator = data?.creator || ''; // 创建人名称
        this.createTime = data?.createTime ? moment(data?.createTime).format('YYYY-MM-DD HH:mm') : '';// 创建时间
    }
};