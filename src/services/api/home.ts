import { GetTodayWorkInfoOutput, SaveLayoutDataInput, SaveQuickMenuInput } from "@/apps/kangfu/services"
import { HomeModuleData, QuickMenuData, request, ToDoNumData } from "@/services"

/**
 * 
 * @param params 接口名称：查询快捷入口数据源
 * @returns 
 */
export function fetchGetQuickMenuData() {
  const method = request.Get<QuickMenuData[]>('/homePage/getQuickMenuData',
    {
      transform: (res: any) => {
        const { isSuccess, message, data } = res
        if (isSuccess) {
          return data?.map((item: any) => new QuickMenuData(item)) as unknown as QuickMenuData[]
        } else {
          // 遇到错误，返回空数组
          return [] as never[]
        }

      }
    })

  return method
}
/**
 *  接口名称：保存快捷入口数据
 */

export function fetchSaveQuickMenu(data: SaveQuickMenuInput) {
  const method = request.Post<Service.ResponseResult<any>>('/homePage/saveQuickMenu', data)
  method.meta = {
    openSuccessTips: false,
    openErrorTips: false
  }
  return method
}

/**
 *  接口名称： 获取首页模块数据
 */

export function fetchGetModuleData() {
  const method = request.Get<HomeModuleData[]>('/homePage/getModuleData',
    {
      transform: (res: any) => {
        const { isSuccess, message, data } = res
        if (isSuccess) {
          return data?.map((item: any) => new HomeModuleData(item)) as unknown as HomeModuleData[]
        } else {
          // 遇到错误，返回空数组
          return [] as never[]
        }
      }
    })

  return method
}

/**
 *  接口名称： 保存首页布局数据
 */

export function fetchSaveLayoutData(data: SaveLayoutDataInput) {
  const method = request.Post<Service.ResponseResult<any>>('/homePage/saveLayoutData', data)
  return method
}

/**
 *  接口名称： 查询待办数量
 * 0=待治疗，1=待指派，2=待评定，3=待审批；为空时，代表查询所有
 */
export function fetchGetToDoNum() {
  const method = request.Get<ToDoNumData[]>('/homePage/getToDoNum',
    {
      transform: (res: any) => {
        const { isSuccess, message, data } = res
        if (isSuccess) {
          return data?.map((item: any) => new ToDoNumData(item)) as unknown as ToDoNumData[]
        } else {
          // 遇到错误，返回空数组
          return [] as never[]
        }
      }
    })

  return method
}


/**
 *  接口名称： 查看今日看板信息
 */
export function fetchGetTodayWorkInfo() {
  const method = request.Get<Service.ResponseResult<GetTodayWorkInfoOutput>>('/homePage/getTodayWorkInfo')
  return method
}


/**
 *  接口名称： 月度趋势图
 */
export function fetchGetMonthlyTrend(params: {
  /**
   * 开始日期
   */
  StartTime?: string;
  /**
   * 结束日期
   */
  EndTime?: string;
}) {
  const method = request.Get<ToDoNumData[]>('/homePage/getMonthlyTrend',
    {
      params,
      // transform: (res: any) => {
      //   const { isSuccess, message, data } = res
      //   if (isSuccess) {
      //     return data?.map((item: any) => new ToDoNumData(item)) as unknown as ToDoNumData[]
      //   } else {
      //     // 遇到错误，返回空数组
      //     return [] as never[]
      //   }
      // }
    })

  return method
}

