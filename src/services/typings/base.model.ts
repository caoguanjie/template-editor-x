

// 分页列表的参数
export interface PaginationParams {
    page: number; // 当前页码
    pageSize: number; // 每页显示数量
    field?: string; // 排序字段
    order?: string; // 排序方式
}

// 分页列表返回的固定参数
export interface PaginationResult<T> {
    total: number; // 总记录数
    page: number; // 当前页码
    pageSize: number; // 每页显示数量
    totalPage: number; // 总页数
    hasPrevPage: boolean; // 是否有下一页
    hasNextPage: boolean; // 是否有上一页
    items: T[]; // 当前页的数据
}

/**
 *  @description 分页参数
 * 兼容旧接口的声明
 */
export interface PagingParams {
    // 页码
    pageSize: number,
    // 当前页
    pageIndex: number,
    // 排序类型
    sort?: string,
    // 排序字段
    sortProp?: string,
}


// 下拉框选项
export interface SelectOption {
    label: string; // 显示的文本
    value: string | number; // 选项的值
    disabled?: boolean; // 是否禁用
}