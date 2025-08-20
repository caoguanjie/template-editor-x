
// 经营看板
import board from '@/assets/Home/quick_menu11.svg?url'
//不良事件
import bad from '@/assets/Home/quick_menu10.svg?url'
// 任务指派
import assign from '@/assets/Home/quick_menu9.svg?url'
// 患者管理
import patient from '@/assets/Home/quick_menu8.svg?url'
// 批量确认
import batch from '@/assets/Home/quick_menu7.svg?url'
// 不计费
import noCharge from '@/assets/Home/quick_menu6.svg?url'
// 医保异常记录
import exception from '@/assets/Home/quick_menu5.svg?url'
// 科室执行率统计
import rate from '@/assets/Home/quick_menu4.svg?url'
// 医生开单统计
import doctor from '@/assets/Home/quick_menu3.svg?url'
// 业务看板
import business from '@/assets/Home/quick_menu2.svg?url'
// 工作站
import worker from '@/assets/Home/quick_menu1.svg?url'
import XEUtils from 'xe-utils'
import { RouteLocationRaw } from 'vue-router'
export class QuickMenuData {
    /**
     * 编码
     */
    code: string;
    /**
     * 入口名称
     */
    name?: string;
    /**
     * 是否启用
     */
    isEnable?: boolean;
    /**
     * 图标
     */
    icon?: string;
    constructor(data: Partial<QuickMenuData>) {
        Object.assign(this, data);
        switch (data.code) {
            // 工作站
            case "TreatWorkStation":
                this.icon = worker;
                break;
            // 业务看板
            case "PerformanceDashboard":
                this.icon = business;
                break;
            // 医生开单统计
            case "DoctorReport":
                this.icon = doctor;
                break;
            // 科室执行率统计
            case "DepartmentExecution":
                this.icon = rate;
                break;
            // 医保异常记录
            case "AbnormalRecord":
                this.icon = exception;
                break;
            // 不计费
            case "PatientSupplementCost":
                this.icon = noCharge;
                break;
            // 批量确认
            case "TreatmentConfirmation":
                this.icon = batch;
                break;
            // 患者管理
            case "MyPatient":
                this.icon = patient;
                break;
            // 任务指派
            case "TreatAssignment":
                this.icon = assign;
                break;
            // 不良事件
            case "adverseEvent":
                this.icon = bad;
                break;
            // 运营看板
            case "DashBoard":
                this.icon = board;
                break;
            default: this.icon = worker;
        }
    }
}

/**
 * 获取首页模块数据输出
 */
export class HomeModuleData {
    /**
     * 模块名
     */
    name: string;
    /**
     * 模块code
     */
    code: string;
    i: string;
    /**
     * 是否启用
     */
    isEnable: boolean;
    /**
     * 是否固定
     */
    static: boolean;
    /**
     * 排序
     */
    sort: number;
    /**
     * 宽度
     */
    width: number;
    w: number;
    /**
     * 高度
     */
    height: number;
    h: number;
    /**
     * X坐标
     */
    xaxis: number;
    x: number;
    /**
     * Y坐标
     */
    yaxis: number;
    y: number;
    /**
     * 对应的组件
     */
    component?: any;
    path?: string;
    constructor(data: Partial<HomeModuleData>, isComponent: boolean = true) {
        Object.assign(this, data);
        this.i = data.code || '';
        switch (data.code) {
            // 快捷菜单
            case 'HPQuickMenu':
                this.w = XEUtils.toNumber(data?.width || 2);
                this.h = XEUtils.toNumber(data?.height || 1);
                this.x = XEUtils.toNumber(data?.xaxis ?? 0);
                this.y = XEUtils.toNumber(data?.yaxis ?? 0);
                this.component = isComponent ? shallowRef(defineAsyncComponent(() => import("@/views/Home/components/QuickMenu.vue"))) : null;
                break;
            // 待办事项
            case 'HPToDo':

                this.w = XEUtils.toNumber(data?.width || 1);
                this.h = XEUtils.toNumber(data?.height || 2);
                this.x = XEUtils.toNumber(data?.xaxis ?? 0);
                this.y = XEUtils.toNumber(data?.yaxis ?? 1);
                this.component = isComponent ? shallowRef(defineAsyncComponent(() => import("@/views/Home/components/ToDoList.vue"))) : null;
                break;
            // 个人工作量
            case 'HPWorkload':

                this.w = XEUtils.toNumber(data?.width || 1);
                this.h = XEUtils.toNumber(data?.height || 2);
                this.x = XEUtils.toNumber(data?.xaxis ?? 1);
                this.y = XEUtils.toNumber(data?.yaxis ?? 1);
                this.component = isComponent ? shallowRef(defineAsyncComponent(() => import("@/views/Home/components/PersonWorker.vue"))) : null;
                // 更多要跳转的路由
                this.path = 'ReportUserWorkload';
                break;
            // 排名统计
            case 'HPRankInfo':
                this.w = XEUtils.toNumber(data?.width || 1);
                this.h = XEUtils.toNumber(data?.height || 4.5);
                this.x = XEUtils.toNumber(data?.xaxis ?? 0);
                this.y = XEUtils.toNumber(data?.yaxis ?? 3);
                this.component = isComponent ? shallowRef(defineAsyncComponent(() => import("@/views/Home/components/RankingStatic.vue"))) : null;
                // 更多要跳转的路由
                this.path = 'DashBoard';
                break;
            case 'HPMonthly':
                this.w = XEUtils.toNumber(data?.width || 1);
                this.h = XEUtils.toNumber(data?.height || 4.5);
                this.x = XEUtils.toNumber(data?.xaxis ?? 1);
                this.y = XEUtils.toNumber(data?.yaxis ?? 3);
                this.component = isComponent ? shallowRef(defineAsyncComponent(() => import("@/views/Home/components/MonthTrend.vue"))) : null;
                break;
        }
    }
};


/**
 * 获取待办事项数量
 * 0=待治疗，1=待指派，2=待评定，3=待审批
 */
export class ToDoNumData {
    /**
     * 类型
     */
    type: number;
    /**
     * 数量
     */
    num: number;
    /**
     * 图标
     */
    icon: string;
    /**
     * 标题
     */
    title: string;
    /**
     * 文字颜色
     */
    textColor: string;
    /**
     * 需要跳转的路由对象
     * @param path 
     */
    pathParams: RouteLocationRaw;

    constructor(data: Partial<ToDoNumData>) {
        Object.assign(this, data);
        switch (data.type) {
            case 0:
                this.icon = new URL('@/assets/Home/todo_icon_zhiliao.svg', import.meta.url).href;
                this.title = '待治疗';
                // this.textColor = '#3974FC';
                this.textColor = '#303133';
                this.pathParams = {
                    name: 'TreatWorkStation',
                    query: {
                        type: 0
                    }
                }
                break;
            case 1:
                this.icon = new URL('@/assets/Home/todo_icon_zhipai.svg', import.meta.url).href;
                this.title = '待指派';
                this.textColor = '#303133';
                this.pathParams = {
                    name: 'TreatAssignment',
                    query: {
                        type: 1
                    }
                }
                break;
            case 2:
                this.icon = new URL('@/assets/Home/todo_icon_pingding.svg', import.meta.url).href;
                this.title = '待评定';
                this.textColor = '#303133';
                this.pathParams = {
                    name: 'TreatWorkStation',
                    query: {
                        type: 2
                    }
                }
                break;
            case 3:
                this.icon = new URL('@/assets/Home/todo_icon_shenpi.svg', import.meta.url).href;
                this.title = '待审批';
                // this.textColor = '#FC5944';
                this.textColor = '#303133';
                break;
            case 4:
                this.icon = new URL('@/assets/Home/todo_icon_jilu.svg', import.meta.url).href;
                this.title = '待记录';
                this.textColor = '#303133';
                this.pathParams = {
                    name: 'BehavioralCorrectionList',
                }
                break;
        }
    }
};