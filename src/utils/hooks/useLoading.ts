
import { ElLoading, LoadingOptions } from 'element-plus'


interface Fn {
    (): void;
}
export function useLoading(opts?: Partial<LoadingOptions>): [Fn, Fn, (title: string) => void] {
    let instance: any = null
    const defaultProps = {
        fullscreen: true,
        lock: true,
        text: '正在加载中...',
        spinner: 'el-icon-loading',
        customClass: "global-loading"
    }

    // 服务的方式调用的全屏 Loading 是单例的
    const open = (): void => {
        instance = ElLoading.service({ ...defaultProps, ...opts })
    };

    // 前一个全屏 Loading 关闭前再次调用全屏 Loading，并不会创建一个新的 Loading 实例，而是返回现有全屏 Loading 的实例：
    const close = (): void => {
        // 调用它们中任意一个的 close 方法都能关闭这个全屏 Loading。
        instance.close();
    };

    // 上传下载用得比较多
    const setTip = (tip: string) => {
        instance.setTip(tip);
    };

    return [open, close, setTip];


}