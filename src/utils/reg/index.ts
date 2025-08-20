export const regExpObj = {
  floatFifteenTwo: {
    pattern: /^[1-9]\d{0,14}(\.\d{1,2})?$|^0(\.\d{1,2})?$/,
    // message: '无效的价格，格式为15位正整数+2位小数'
    message: '输入15位正整数+2位小数'
  },
  floatNineTwo: {
    pattern: /^[1-9]\d{0,8}(\.\d{1,2})?$|^0(\.\d{1,2})?$/,
    // message: '无效的价格，格式为15位正整数+2位小数'
    message: '最大支持9位正整数+2位小数'
  },
  onlyNumber: {
    // pattern: /^(?!0)\d+$/, message: "无效的数值，只能输入正整数"
    pattern: /^(?!0)\d+$/, message: "无效的数值"
  },
  // 邮箱格式
  emailType: {
    // pattern: /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/, message: "请输入正确的邮箱"
    pattern: /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/, message: "无效的邮箱"
  },
  // 电话格式
  phoneType: {
    // pattern: /^1[3,4,5,6,7,8,9][0-9]{9}$/, message: "请输入正确的电话"
    pattern: /^1[3,4,5,6,7,8,9]\d{9}$/, message: "无效的电话"
  },
  // 联系方式
  phoneOrFixPhone: {
    validator: (rule: any, val: any) => {
      if (val) {
        //phone86
        const phone86 = /^(\+86|86)?1\d{10}$/
        // 手机号
        const isPhone = /^1[3,4,5,6,7,8,9]\d{9}$/
        // 座机
        const isFix = /^(((\d{3,4}-)?\d{7,8})|(1(3|4|5|6|7|8|9)\d{9}))$/
        // isPhone.test(val)
        if (isPhone.test(val)) {
          return true
        }
        return phone86.test(val) ? true : isFix.test(val)
      } else return true
    },
    message: "无效的联系方式"
    // message: "请输入正确的电话或座机"
  },
  // 更普遍的邮箱 支持中文邮箱
  chinaMail: {
    pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
    message: '无效的邮箱'
  },
  // 正整数,不带0
  positiveInt: {
    pattern: /^\+?[1-9]\d*$/,
    message: '请输入正整数'
  },
  // 正整数,带0
  positiveIntZero: {
    pattern: /^\+?([1-9]\d*|0)$/,
    message: '请输入正整数'
  },
  // 负整数，不带0
  negativeInt: {
    pattern: /^-[1-9]\d*$/,
    message: '请输入正整数'
  },
  // 整数，带0
  integer: {
    pattern: /^(?:0|(?:-?[1-9]\d*))$/,
    message: '请输入整数'
  },
  // 版本号验证 1.0.2
  version: {
    pattern: /^\d+(?:\.\d+){2}$/,
    message: '无效的版本号，格式为1.1.2'
  },
  // uuid
  uuid: {
    pattern: /^[a-f\d]{4}(?:[a-f\d]{4}-){4}[a-f\d]{12}$/i,
    message: '无效的uuid'
  },
  // 字母和数字
  letterOrNumber: {
    pattern: /^[\da-z]+$/i,
    message: '只能输入字母和数字'
  },
  // 身份证
  validIdCard: {
    validator: (rule: any, val: any) => {
      if (val) {
        // 15位身份证号码正则表达式
        const reg15 = /^[1-9]\d{7}((0[1-9])|(10|11|12))((0[1-9])|([12]\d)|30|31)\d{3}$/;
        // 18位身份证号码正则表达式
        const reg18 = /^[1-9]\d{5}(19|20)\d{2}((0[1-9])|(10|11|12))((0[1-9])|([12]\d)|30|31)\d{3}(\d|x|X)$/;
        // 检查是否为15位身份证号码
        if (val.length === 15) {
          return reg15.test(val);
        }
        // 检查是否为18位身份证号码
        else if (val.length === 18) {
          return reg18.test(val);
        }
        // 不是15位或18位身份证号码
        return false;
      } else return true
    },
    message: "无效的身份证号码",
  },
  // 最大100,或两位整数加两位小数
  handredTwo: {
    validator: (rule: any, val: any) => {
      if (val) {
        //两位整数和两位小数
        const minHandred = /^[1-9]\d?(\.\d{1,2})?$|^0(\.\d{1,2})?$/
        return (minHandred.test(val) ? true : val === '100')
      } else return true
    },
    // message: "可输入两位整数+两位小数，最大100",
    message: "无效的数值",
  },
  // 手机短号，3—6位数字
  shortNumber: {
    pattern: /^\+?\d\d{2,6}\d*$/,
    message: '短号应为3~6位数字'
  },
  // 最大100，最小1
  handred: {
    validator: (rule: any, val: any) => {
      if (val) {
        //两位整数或100
        const minHandred = /^[1-9]\d?$/
        return (minHandred.test(val) ? true : val === '100')
      } else return true
    },
    message: "无效的数值",
  },
  // 整数，带0
  OneFour: {
    pattern: /^(0|1|0\.[0-9]{1,4}|1\.0{1,4})$/,
    message: '无效的数值'
  },
}