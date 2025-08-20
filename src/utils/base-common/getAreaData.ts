import { blankInstance, request } from "@/services";

/**
 * 获取省市区和街道的数据
 */
export interface AreaData {
    // 区域编码
    value: string,
    // 区域名称
    label: string,
    children?: AreaData[]
}
export const getAreaData: () => Promise<AreaData[]> = () => {
    // 创建一个新的 Headers 对象
    const headers = new Headers();
    headers.append('Content-Type', 'application/json'); // 设置请求头
    // 使用fetch请求省市区和街道的数据
    return new Promise((resolve, reject) => {
        fetch('/static/libs/addressCascade.json', {
            method: 'GET',
            headers
        }).then(async (res) => {
            const data = await res.json()
            resolve(data)
        }).catch(err => {
            reject([])
        })
    })
} 