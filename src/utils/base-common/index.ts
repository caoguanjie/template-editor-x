
import useUserStore from "@/store/base/user";
import useTagsViewStore from "@/store/base/tagsView";
import router from "@/router";
import XEUtils from "xe-utils";
import { toast } from '@/utils/base-common/message';

import { fetchGetSysSettingDictDataDropdown, fetchGetSysDictionaryItemAllList } from "@/services";
import { DEFAULT_BACKEND_OPTIONS } from "@/services/http/config";
const userStore = useUserStore();
const { send: getDictDataDropdown } = fetchGetSysSettingDictDataDropdown()
export function getDictData(code: string) {
  return new Promise((resolve, reject) => {
    getDictDataDropdown({ code }).then((res: any) => {
      if (res.code === 1001) {
        resolve(res.data)
      } else {
        resolve([])
      }
    });
  })
}

/**
 * 枚举转化为可以适合单选使用的数组
 * @param EnumData 枚举 统一左边文字，lable,右边value
 * @returns name code 数组
 */
export const getDataOptionsArray = (EnumData: any) => {
  const flag = Object.entries(EnumData).find(item => typeof item[1] === 'number');// 调整判断逻辑，存在数字类型即可筛选数字，其他都是文字
  // 枚举转化 数字类型+文字需要特殊处理
  const handleArr = flag
    ? Object.entries(EnumData).filter(item => typeof item[1] === 'number')
    // .splice(Object.entries(EnumData).length / 2, Object.entries(EnumData).length - 1)
    : Object.entries(EnumData)
  const result: any = [];
  handleArr.forEach((element: any) => {
    result.push({ label: element[0], value: element[1] })
  })
  return result;
}

/**
 * 获取排序字段及对应参数传递给后端
 */
export const getSortParams = (sort: any) => {
  let order = '';
  // 排序参数
  if (sort.order === "desc") {
    order = 'Desc'
  } else if (sort.order === 'asc') {
    order = 'Asc'
  }
  return {
    Field: sort.field,//排序字段
    Order: order,//排序方向 	asc（升序）,desc（降序）, null
  }
}

/**
 * 获取随机数
 */
export const getRandomId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * 判断是否有权限
 * @param code 
 * @returns boolean
 */
export const hasPermiss = (code: string) => {
  return userStore.perms.includes(code);
}

/**
 * 将接口返回的数据字典，转换成{label:"",value:""}形式
 */
export const getDictOpt = async (code: string) => {
  return new Promise<any>((resolve, reject) => {
    // const { send: GetItemAllList } = fetchGetSysDictionaryItemAllList()
    fetchGetSysDictionaryItemAllList({ TypeCode: code }).then((res: any) => {
      if (res.isSuccess) {
        const data: any = [];
        res.data.forEach((element: any) => {
          data.push({ label: element.name, value: element.code })
        })
        resolve(data)
      } else {
        resolve([])
      }
    })
  })
}

/**
 * 将接口返回的数据，转换成{label:"",value:""}形式
 */
export const getDataOpt = async (res: any) => {
  return new Promise((resolve, reject) => {
    if (res.code === 1001) {
      const data: any = [];
      res.result.forEach((element: any) => {
        data.push({ label: element.name, value: element.code })
      })
      resolve(data)
    } else {
      resolve([])
    }
  })
}

/**
 * 传入数据源，判断传入的code是否在数据源中
 * @param data 数据源数组
 * @param code 
 * @returns 
 */
export const isInData = (data: any, code: string) => {
  const returnData = XEUtils.clone(data)
  if (XEUtils.filter(returnData.value, item => item.value === code).length) {
    return true
  } else return false
}

/**
 * 如果传入的数据不在数据源中，则清除行数据字段值
 * @param data 数据源数组
 * @param dataField 数据源字段
 * @param row 行数据
 * @param field 行数据字段
 * @returns 
 */
export const getRemoveDisabledOption = (data: any, dataField: string, row: any, field: string) => {
  if (!data) {
    row[field] = '';
    return [];
  }
  const returnData = XEUtils.clone(data)
  if (row && field && (!XEUtils.filter(returnData, item => item[dataField] === row[field]).length)) {
    row[field] = '';
  }
  return data;
}

/**
 * 传入选中数据的键值对，如果传入的数据不在数据源中，则返回包含传入数据的数据源
 * @param data 数据源数组
 * @param code 
 * @param name 
 * @returns 
 */
export const getDisabledOption = (data: any, code: string, name: string) => {
  if (!data) {
    return;
  }
  const returnData = XEUtils.clone(data)
  if (code && name && (!XEUtils.filter(returnData, item => item.value === code).length)) {
    returnData.push({ label: name, value: code });
  }
  return returnData
}

//数据格式化，（小数点后两位如果存在0结尾省略）
export function formatFloatNumber(number: any) {
  let value;
  if (number < 0) {
    value = number * -1;
  } else {
    value = number;
  }
  if (value < 10000) {
    value = parseFloat(value.toFixed(2)) + "元"
  } else if (value >= 10000) {
    value = parseFloat((value / 10000).toFixed(2)) + "万元";
  }
  if (number < 0) {
    return "-" + value;
  } else {
    return value;
  }
}

//数据格式化，万为单位，不带元，保留两位小数 第二个参数true则强制保留两位 .00
export function formatNotYuan(number: number, force = false) {
  let value;
  let arr
  if (number < 0) {
    value = number * -1;
  } else {
    value = number;
  }
  if (value < 10000) {
    if (force) {
      value = Number(value).toFixed(2);
    } else {
      value = parseFloat(value.toFixed(2));
    }
    arr = value.toString().split('.');
    value = Number(arr[0]).toLocaleString();
    if (arr.length > 1) {
      value += '.' + arr[1]
    }
  } else if (value >= 10000) {
    if (force) {
      value = Number((value / 10000)).toFixed(2)
    } else {
      value = parseFloat((value / 10000).toFixed(2))
    }
    arr = value.toString().split('.');
    value = Number(arr[0]).toLocaleString();
    if (arr.length > 1) {
      value += '.' + arr[1]
    }
    value += "万";
  }
  if (number < 0) {
    return "-" + value;
  } else {
    return value;
  }
}

// 添加￥人民币符号
export function addRMBTip(value: any) {
  return '￥' + value;
}

//数据格式化，不变更单位
export function formatNotChangeUnit(number: number) {
  let value;
  if (number < 0) {
    value = number * -1;
  } else {
    value = number;
  }
  value = Number(value).toLocaleString();
  if (number < 0) {
    return "-" + value;
  } else {
    return value;
  }
}

//25804 明细列表：列表排序应有规则；金额显示格式应保持统一；
/**
 * 格式化将金额显示两位小数
 * @param value 入参
 * @returns string | any
 */
export function formatNumberTwoEnd(value: any) {
  if (typeof value === 'number') {
    return XEUtils.commafy(value, { digits: 2 })
  } else if (typeof value === 'string' && !isNaN(parseFloat(value))) {
    return XEUtils.commafy(parseFloat(value), { digits: 2 })
  }
  return ''
}

export const goBackPage = (router: any, route: any) => {
  router.replace({ name: route.query.returnPage as string, query: route.params })
  useTagsViewStore().delView(route);
}

// 返回上一步的页面
export const goPrePage = (route: any) => {
  router.go(-1);
  useTagsViewStore().delView(route);
}

const applitypename = "application/octet-stream"
const texttypename = "text/plain"
const audiotypename = "audio/mp4a-latm"
const videotypename = "video/mpeg"
const powerpointtypename = "application/vnd.ms-powerpoint"

//获得文件MIME类型
export const getFileType = (typeName: string): string | undefined => {
  return {
    "3gp": "video/3gpp",
    "apk": "application/vnd.android.package-archive",
    "asf": "video/x-ms-asf",
    "avi": "video/x-msvideo",
    "bin": applitypename,
    "bmp": "image/bmp",
    "c": texttypename,
    "class": applitypename,
    "conf": texttypename,
    "cpp": texttypename,
    "exe": applitypename,
    "gif": "image/gif",
    "gtar": "application/x-gtar",
    "gz": "application/x-gzip",
    "h": texttypename,
    "htm": "text/html",
    "html": "text/html",
    "jar": "application/java-archive",
    "java": texttypename,
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "application/x-javascript",
    "log": texttypename,
    "m3u": "audio/x-mpegurl",
    "m4a": audiotypename,
    "m4b": audiotypename,
    "m4p": audiotypename,
    "m4u": "video/vnd.mpegurl",
    "m4v": "video/x-m4v",
    "mov": "video/quicktime",
    "mp2": "audio/x-mpeg",
    "mp3": "audio/x-mpeg",
    "mp4": "video/mp4",
    "mpc": "application/vnd.mpohun.certificate",
    "mpe": videotypename,
    "mpeg": videotypename,
    "mpg": videotypename,
    "mpg4": "video/mp4",
    "mpga": "audio/mpeg",
    "msg": "application/vnd.ms-outlook",
    "ogg": "audio/ogg",
    "pdf": "application/pdf",
    "png": "image/png",
    "pps": powerpointtypename,
    "prop": texttypename,
    "rar": "application/x-rar-compressed",
    "rc": texttypename,
    "rmvb": "audio/x-pn-realaudio",
    "rtf": "application/rtf",
    "sh": texttypename,
    "tar": "application/x-tar",
    "tgz": "application/x-compressed",
    "txt": texttypename,
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "audio/x-ms-wmv",
    "wps": "application/vnd.ms-works",
    "xml": texttypename,
    "xls": "application/vnd.ms-excel",
    "xlsx": "application/vnd.ms-excel",
    "doc": "application/msword",
    "docx": "application/msword",
    "ppt": powerpointtypename,
    "pptx": powerpointtypename,
    "z": "application/x-compress",
    "zip": "application/zip"
  }[typeName]
}

/**
 * blob 转json
 * @param blob blob
 * @returns json | null
 */
export const fileReaderPromise = (blob: any) => {
  return new Promise((resolve, reject) => {
    const reader: any = new FileReader();
    reader.onload = () => {
      try {// 捕捉错误，直接下载文件
        const tempRes = JSON.parse(reader?.result)
        if (tempRes) {
          console.log(tempRes, "tempRes");
          resolve(tempRes)
        } else {
          resolve(null)
        }
      } catch (err) {
        resolve(null);
        return;
      }
    };
    reader.readAsText(blob);
  })
}

/**
 * 保存localstorage
 * @param name localStorage键名
 * @param data localStorage值
 */
export const saveLoacalStorage = (name: any, data: any) => {
  let queryParams: any = JSON.parse(localStorage.getItem(name)!)//获取已保存的搜索参数
  queryParams = queryParams ? queryParams : {}
  queryParams = { ...queryParams, ...data }
  localStorage.setItem(name, JSON.stringify(queryParams))
}


/**
 * 
 * @param name 文件名称带后缀 比如：导入.xlsx
 * @param type 对应的文件类型，比如：application/excel
 * @param res blob类型或者是json类型的文件
 * 最后返回 promise，如果是下载成功返回false,不然返回接口的参数，再次导入需要用到
 */
export const downloadFile = (name: any, type: string, res: any, isTips: boolean = false) => {
  return new Promise((resolve) => {
    fileReaderPromise(res).then((result: any) => {
      if (result?.code) {// 没有code 执行下载
        if (isTips) {
          toast.err(result.message);
        }
        resolve(result);
      } else {
        const url = window.URL.createObjectURL(new Blob([res], { type }));
        const link = document.createElement("a");
        link.style.display = "none";
        link.href = url;
        link.setAttribute("download", name); //指定下载后的文件名+后缀，防跳转
        document.body.appendChild(link);
        link.click();
        // 释放内存
        window.URL.revokeObjectURL(link.href)
        resolve(false);
      }
    });
  })

}

/**
 * 递归处理嵌套对象中的string类型左右有空格的问题
 * @param formData 提交的表单值
 */
export const formTrim = (formData: any) => {
  for (const key in formData) {
    if (typeof formData[key] === 'object') {
      formTrim(formData[key]); // 递归调用 traverse 函数
    } else if (typeof formData[key] === 'string' && formData[key]) {
      formData[key] = formData[key].trim();
    }
  }
}

/**
 * 格式化form表单后再处理
 * @param formData 提交的表单值
 * @param formApi 提交的fapi方法
 */
export const formatFormTrim = (formData: any, formApi: any) => {
  return new Promise((resolve, reject) => {
    formTrim(formData);
    formApi.setValue(formData);
    formApi.nextTick(() => {
      resolve(true)
    });
  })

}

/**
 * 设置自动宽度, 需要提前给定宽度
 * @param fitsTablePro options
 * @param keyArr 字符串数组，根据当前列表内容设置宽度
 * @param noStrictArr 不严格的数组，限制最大宽度
 */
let timer = {} as any
export const setColumnAutoWidth = (fitsTablePro: any, keyArr: string[], noStrictArr?: any[]) => {
  if (!fitsTablePro) return;
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    const columnsData = fitsTablePro.getColumns()
    if (!columnsData) return;
    columnsData.forEach((item: any) => {
      keyArr.length > 0 && keyArr.forEach((el: string) => {//设置最大宽度为列的宽度
        if (item.field === el) {
          let minWidth = 0;
          const autoWidthArr: any = document.getElementsByClassName(el);
          for (const value of autoWidthArr) {
            minWidth = value.offsetWidth > minWidth ? value.offsetWidth : minWidth;
          }
          if (minWidth !== 0) {
            item.minWidth = minWidth + 26;
            item.width = minWidth + 26;
          }
        }
      })
      noStrictArr && noStrictArr?.forEach((el: any) => {//判断内容宽度是否大于最大宽度，限制最大宽度否则根据内容显示
        if (item.field === el.field) {
          let minWidth = 0;
          const autoWidthArr: any = document.getElementsByClassName(el.field);
          for (const value of autoWidthArr) {
            minWidth = value.offsetWidth > minWidth ? value.offsetWidth : minWidth;
          }
          if (minWidth !== 0) {
            if (minWidth + 26 > el.maxWidth) {
              item.minWidth = el.maxWidth;
            } else {// 120是为了当前环节需要有排序时防止出现换行
              item.minWidth = minWidth + 26 > 120 ? minWidth + 26 : 120;
            }
            item.width = item.minWidth;
          }
          console.log("步骤宽度的结果", item.width);
        }
      })
    })
    fitsTablePro.recalculate(true)
  }, 150)
}

/**
 * 
 * @param data 接口返回的数据内容
 * @param type 请求类型
 * @param successText 请求成功需要提示的内容
 * @param errorText 请求失败需要提示的内容
 */
export const requestStatusTips = (data: any, successText?: string, errorText?: string, type?: 'get' | 'post') => {
  if (data.code === DEFAULT_BACKEND_OPTIONS.successCode) {
    toast.success(successText ?? "操作成功")
  } else if (data.code === 1002) {
    toast.warn(data.message ?? errorText)
  } else if (data.code === 2001) {// 接口会记录日志
    toast.err(errorText ?? data.message)
  } else if (data.code === 2004) {
    toast.warn(errorText ?? data.message)
    // } else if (data.code === ResultEnum.NOT_PERMISSION) {
    // 使用了弹窗，不需要再做提示
    // toast.warn()
  } else {
    toast.info(data.message)
  }
}

/**
 * 设置表单各字段是否只读、是否必填、是否显示
 * @param formRule 表单规则
 * @param fieldConfig 字段配置数组
 * @param formRef 表单实例
 */
export const setFieldConfig = (formRule: any, fieldConfig: any, formRef: any, isDetail?: boolean) => {
  formRule.forEach((item: any) => {
    const fieldItem = XEUtils.filter(fieldConfig, element => element.fieldCode === item.fieldCode)
    if (item.hidden || fieldItem.length === 0) { return }//如果是隐藏的字段，不做操作
    //设置是否显示
    const obj = {} as any
    // 组装是否显示的属性，同时判断是否只读，只读状态去掉占位提示文本
    const objProps = {} as any//obj的属性对象
    objProps.hidden = !fieldItem[0].isDisplay
    if (fieldItem[0].isReadonly) {//判断是否只读，只读状态去掉占位提示文本
      objProps.props = { placeholder: "" }
    }
    obj[item.field] = objProps
    formRef.fApi.mergeRules(obj)

    //调整校验，只读时不需要校验
    if (fieldItem[0].isReadonly || isDetail || item.props?.readonly) {
      // 只读状态，去掉必填
      const obj2 = {} as any
      obj2[item.field] = [{ required: false }]//设为非必填
      formRef.fApi.updateValidates(obj2)
    } else {
      // 可编辑状态，判断是否设置必填
      const obj2 = {} as any
      let message = ""
      if (item.type === 'input') {
        message = `请输入${item.title}`
      } else {
        message = `请选择${item.title}`
      }

      const obj2Props = [] as any
      obj2Props.push({ required: fieldItem[0].isRequired, message })
      if (item.validate) {
        item.validate.forEach((valItem: any) => {
          obj2Props.push(valItem)
        })
      }
      obj2[item.field] = obj2Props
      formRef.fApi.updateValidates(obj2)
    }

    //是否只读
    let isDesabled = false
    if (isDetail) {//详情设置为不可编辑
      isDesabled = true
    } else {
      isDesabled = fieldItem[0].isReadonly
    }
    formRef.fApi.disabled(isDesabled, item.field)
  })
}


/**
 *  表尾合计 函数
 * @params list 列表数据
 * @params field 字段名
 * @params isTwoEnd 是否保留两位小数
 */
export const footerMethodSumNum = (list: any, field: string, isTwoEnd: boolean, digits: number = 2) => {
  let count = 0;
  list.forEach((item: any) => {
    count += Number(item[field])
  })
  if (isNaN(count) || count === 0) {
    return '-';
  } else if (isTwoEnd) {
    return XEUtils.commafy(count, { digits });
  } else {
    return count;
  }
}

/**
 * 过滤该节点和子节点的数组
 * @param tree 树
 * @param nodeIdToFilter id
 * @returns 数组
 */
export const filterTree = (tree: any, nodeIdToFilter: string) => {
  return tree.filter((node: any) => {
    // 如果当前节点的id等于要过滤的id，则返回false
    if (node.id === nodeIdToFilter) {
      return false;
    }

    // 如果当前节点有子节点，则递归调用filterTree
    if (node.children && node.children.length > 0) {
      node.children = filterTree(node.children, nodeIdToFilter);
      // 如果子节点被完全过滤掉，则返回false
      return node.children.length > 0;
    }

    // 如果当前节点及其子节点都不在过滤范围内，则保留该节点
    return true;
  });
}

export const isIframe = () => {
  try {
    // 如果window和window.parent不是同一个对象，说明当前页面在iframe内部
    return window.self !== window.top;
  } catch (e) {
    // 如果出现安全错误，也说明当前页面在iframe内部，因为访问父页面会触发安全限制
    return true;
  }
}

/**
 * 处理多表单的问题
 * @param fApi 表单的实例api
 * @param data 数据源对象
 * @returns 返回的对应表单项的数据源
 */
export const getFieldObj = (fApi: any, data: any) => {
  const reusltObj: any = {};
  fApi.fields().forEach((k: any) => {
    reusltObj[k] = data[k];
  })
  return reusltObj;
}

/**16进制转rgb */
export const hexToRgb = (hex: any) => {
  // 确保传入的是字符串，并且长度符合标准的六位十六进制颜色
  if (typeof hex !== 'string' || hex.length !== 7 || hex[0] !== '#') {
    throw new Error('Invalid hex color format. Should be "#rrggbb".');
  }

  // 截取并转换 r, g, b 分量
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return [r, g, b];
}

/**
 * 获取指定数量的颜色，及其循环遍历的颜色
 * @param baseColors 基础遍历的颜色
 * @param totalColor 想要获取的颜色数量
 * @returns 返回对应的颜色数量
 */
export const getMoreColor = (baseColors: string[], totalColor: number) => {
  if (baseColors.length === 0) {
    baseColors = ['#5470C6', '#95CE7B', '#7ED3F4', '#40B27D', '#A969C6', '#FF915A', '#FF7070', '#C6AB69', '#FF5AC9', '#C0C4CC'];
  }
  const colors: any[] = [];
  // 为每种基础颜色创建不同透明度的变体（例如：100%，80%，60%，40%，20%）
  [1, 0.8, 0.6, 0.4, 0.2].forEach((alpha) => {

    baseColors.forEach((baseColor) => {
      const rgb = hexToRgb(baseColor);
      if (totalColor > colors.length) {
        colors.push(`rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`);
      }
    });
  });
  return colors;
}


/**
 * 对象中的string类型左右有空格的问题
 * @param formData 提交的表单值
 */
export const formItemTrim = (formData: any) => {
  const tempForm = XEUtils.clone(formData, true);
  for (const key in tempForm) {
    if (typeof tempForm[key] === 'string' && tempForm[key]) {
      tempForm[key] = tempForm[key].trim();
    }
    if (XEUtils.isArray(tempForm[key])) {
      tempForm[key] = tempForm[key].join(',');
    }
  }
  return tempForm
}