export const returnSortQuery = (sort: any) => {
    const sortParams = {
        Field: sort.field,//排序字段
        Order: "",//排序方向 	asc（升序）,desc（降序）, null
    }
    // 排序参数
    if (sort.order === "desc") {
        sortParams.Order = 'Desc'
    } else if (sort.order === 'asc') {
        sortParams.Order = 'Asc'
    }

    // 一些表格的字段显示为文字，但是排序时需要通过对应的字符串
    if (sort.field === 'typeName') {//typeName字段为中文，要改为type的code
        sortParams.Field = "type"
    }
    if (sort.field === 'statusText') {
        sortParams.Field = "status"
    }
    if (sort.field === 'statusName') {//
        sortParams.Field = "status"
    }
    if (sort.field === 'scrapTypeName') {//
        sortParams.Field = "scrapType"
    }
    if (sort.field === 'signName') {
        sortParams.Field = "sign"
    }
    return sortParams
}