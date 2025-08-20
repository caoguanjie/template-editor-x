/*
 * @Author: caoguanjie 
 * @Date: 2024-04-11 11:07:52 
 * @Last Modified by: caoguanjie
 * @Last Modified time: 2024-05-11 15:07:07
 * 文件描述：这个文件主要存放alova的一些中间件的封装方法
 */

import { ElLoading } from "element-plus";

// 当前正在请求的数量
let currentRequestLoadingCount = 0;


interface IMiddlewareParams {
    /** loading的延迟时间  */
    delayTimer?: number,
    /** loading的提示词 */
    loadingTips?: string,
    /** 是否需要重试 */
    needRetry?: boolean
    /** 重试的次数 */
    retryCount?: number
}

/**
 * 延迟指令v-loading显示隐藏的中间件
 * @param delayTimer 接口延迟多少时间开启loading界面，默认500ms
 */
export function delayDirectiveLoadingMiddleware(delayTimer = 500) {
    return async (ctx: any, next: any) => {
        ctx.controlLoading();
        const { proxyStates } = ctx;
        // 延迟更新特定时间
        const timer = setTimeout(() => {
            proxyStates.loading.v = true;
        }, delayTimer);
        try {
            await next();
            proxyStates.loading.v = false;
            clearTimeout(timer);
        } catch (e) {
            // 接口报错的时候，也要中断loading
            proxyStates.loading.v = false;
            clearTimeout(timer);
        }

    }
}

/**
 * loading显示隐藏的中间件
 * @param delayTimer 接口延迟多少时间开启loading界面，默认500ms
 * @param loadingTips loading提示词
 * @returns 
 */
export function delayLoadingMiddleware(delayTimer = 500, loadingTips = '正在加载...') {
    return async (ctx: any, next: any) => {
        // 自行控制loading
        ctx.controlLoading();
        const { proxyStates } = ctx;
        let timer: any = null;
        let loadingInstance: any;
        const showLoading = async () => {
            // 延迟特定时间更新
            timer = setTimeout(async () => {
                loadingInstance = ElLoading.service({
                    fullscreen: true,
                    lock: true,
                    text: '正在加载中...',
                    background: 'hsla(0,0%,100%,.8)'
                })
                proxyStates.loading.v = true;
            }, delayTimer);
            currentRequestLoadingCount++;
        };
        const hideLoading = () => {
            currentRequestLoadingCount--;
            // 防止出现负数，最低是0；
            currentRequestLoadingCount = Math.max(currentRequestLoadingCount, 0);
            if (currentRequestLoadingCount === 0) {
                // 不管300ms是否达到，取消抖动的定时器。
                timer && clearTimeout(timer);
                timer = null;
                loadingInstance?.close();
            }
        }
        showLoading();
        await next();
        proxyStates.loading.v = false;
        hideLoading();
    };
}

/**
 * 单独的请求重试的中间件逻辑
 * @param needRetry 这里需要在业务场景做好了判断表达式传进来，例如：retryMiddleware(code>500),这里有个默认判断，就是状态码是5xx就触发重试
 * @param retryCount 重试的次数
 * @returns 
 */
export function retryMiddleware(needRetry = false, retryCount = 1) {
    return (ctx: any, next: any) => {
        console.log(ctx)
        return next()
            .then((value: Service.ResponseBaseResult) => {
                const statusCodeRegex = /^(5\d{2})$/
                if (needRetry || statusCodeRegex.test(String(value.code))) {
                    ctx.config.retryCount ? ctx.config.retryCount-- : ctx.config.retryCount = retryCount
                    if (ctx.config.retryCount) {
                        ctx.send(...ctx.sendArgs)
                    }
                }
                return value
            })
    }
}


