
import XEUtils from 'xe-utils';

export function returnListProps(props: any) {
    const fixedProps1 = {
        keepSource: true,
        rowConfig: {
            isHover: true,
            useKey: true,
            isCurrent: true,
        },
        pagerConfig: {
            enabled: true
        },
        showOverflow: "tooltip",
        sortConfig: {
            remote: true,//是否使用服务端排序，ture不会对数据进行处理，false会对数据排序
        },
        toolbarConfig: {
            showBottomBorder: false
        },
        treeConfig: {
            transform: false,
            // rowField: 'id',
            // parentField: 'pid',
        },
    }
    return XEUtils.merge(fixedProps1, props)
}