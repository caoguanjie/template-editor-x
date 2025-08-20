
import { Ref } from "vue";
import XEUtils from "xe-utils";
import { saveLoacalStorage } from "@/utils/base-common/index"
import useTagsViewStore from '@/store/base/tagsView';
export const useCaseTableParams = (xGrid: Ref<any>, route: any): any => {
    const setParams = () => {
        return new Promise((resolve: any) => {
            let queryParams: any//保存loacalstorage的搜索参数
            let data: any//保存表格数据
            const tagsView = useTagsViewStore()
            if (localStorage.getItem(route.fullPath) && !(typeof route.name === 'string' && tagsView.cachedViews.includes(route.name))) {
                queryParams = JSON.parse(localStorage.getItem(route.fullPath)!)//获取已保存的搜索参数
                nextTick(() => {
                    data = xGrid.value?.fitsTablePro.getProxyInfo()//获取表格数据
                    XEUtils.merge(data?.form, queryParams.form)//设置筛选条件
                    XEUtils.merge(data?.pager, queryParams.pager)//设置分页
                    queryParams.sort && xGrid.value?.fitsTablePro.sort({ field: queryParams.sort.field, order: queryParams.sort.order })//设置排序
                })
                resolve(queryParams.treeCheckedId)
            }//重新搜索
            else {
                resolve("")
            }
            // xGrid.value?.fitsTablePro.commitProxy('query')
        })
    }
    const saveParams = (params: any) => {
        saveLoacalStorage(route.fullPath, {
            form: params.form, pager: params.pager, sort: params.sort, treeCheckedId: params.treeCheckedId
        })
    }
    return { setParams, saveParams }
}

export const paramsBeforeReload = (xGrid: Ref<any>, queryParams: any): any => {
    if (queryParams) {
        nextTick(() => {
            const data = xGrid.value?.fitsTablePro.getProxyInfo()//获取表格数据
            XEUtils.merge(data?.form, queryParams.form)//设置筛选条件
            XEUtils.merge(data?.pager, queryParams.pager)//设置分页
            queryParams.sort && xGrid.value?.fitsTablePro.sort({ field: queryParams.sort.field, order: queryParams.sort.order })//设置排序
        })
    }//重新搜索

}