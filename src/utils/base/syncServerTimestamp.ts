import { request } from '@/services';
import moment from 'moment';

// 核心时间控制器
export class TimeKeeper {
    // 服务器时间
    serverTimestamp: number;
    // 客户端时间
    clientTimestamp: number;
    // 最大允许漂移时间（毫秒） 默认5分钟
    maxDrift: number;
    // 时间同步周期（毫秒） 默认5分钟
    syncInterval: number;
    // 提示语
    warningMessage: string;
    // 同步定时器
    syncTimer: any;
    // 启动1秒定时器
    updateTimer: any
    // 时间更新的间隔
    interval: number;
    /**
     * 
     * @param interval 时间显示间隔周期，单位毫秒，默认1分钟
     */
    constructor(interval: number = 300000) {
        this.serverTimestamp = Date.now();  // 初始值设为本地时间
        this.clientTimestamp = Date.now();
        this.maxDrift = 5 * 60 * 1000;     // 5分钟漂移阈值
        this.syncInterval = 1 * 60 * 1000; // 5分钟同步周期
        this.interval = interval;

        // 覆写 moment.now 方法
        moment.now = () => {
            // console.log('当前时间', this.calculateCurrentTime);
            return this.calculateCurrentTime;
        };
    }

    /**
     * @description 计算当前时间，代替客户端的new Date()
     * 核心原理：客户端时间 + （当前时间 - 同步时客户端时间戳）
     * 最新时间 = S + ΔC
     **/
    // 计算当前时间
    get calculateCurrentTime() {
        // 返回服务器时间戳加上客户端时间戳与当前时间戳的差值
        // console.log('客户端时间戳', , this.clientTimestamp, this.serverTimestamp);

        return this.serverTimestamp + (Date.now() - this.clientTimestamp);
    }
    set calculateCurrentTime(value) {
        // 设置服务器时间戳
        this.serverTimestamp = value;
    }

    // 获取服务器时间（含网络延迟补偿）
    async fetchServerTime() {

        try {
            const { data: timestamp } = await request.Get('/system/getTime') as any;
            return Number(timestamp);
        } catch (e) {
            console.error('时间同步失败', e);
            throw e;
        }
    }

    // 执行时间同步
    async sync() {
        try {
            const serverTime = await this.fetchServerTime();
            // 记录同步的那一刻，客户端时间
            // const clientTime = moment('2023-01-01 00:00:00').valueOf();
            const clientTime = Date.now();

            // 记录基准时间
            this.serverTimestamp = serverTime;
            this.clientTimestamp = clientTime;

            // 检测时间漂移
            this.checkTimeDrift(serverTime, clientTime);

            return true;
        } catch (e) {
            // 同步失败时使用本地时间
            this.serverTimestamp = Date.now();
            this.clientTimestamp = Date.now();
            return false;
        }
    }

    // 时间漂移检测
    checkTimeDrift(serverTime: number, clientTime: number) {
        const drift = serverTime - clientTime;
        if (Math.abs(drift) > this.maxDrift) {
            this.showDriftWarning(drift);

        }
    }


    // 显示漂移警告
    showDriftWarning(drift: number) {
        const minutes = Math.round(Math.abs(drift) / 60000);
        this.warningMessage = `系统时间异常：与服务器时间相差 ${minutes} 分钟，请检查设备时间设置`;
    }

    // 启动定时同步
    startAutoSync() {

        // 立即执行首次同步
        this.sync().then(success => {
            if (!success) {
                console.log('首次时间同步失败，使用本地时间');
            }
        });
        // 启动1秒定时器
        // this.updateTimer = setInterval(() => {
        //     const _calculateCurrentTime = this.calculateCurrentTime
        //     console.log('当前时间：', _calculateCurrentTime);
        // }, this.interval);
        // 启动5分钟同步定时器
        this.syncTimer = setInterval(() => {
            this.sync().then(success => {
                if (!success) {
                    console.log('周期性时间同步失败');
                }
            });
        }, this.syncInterval);
    }
}

