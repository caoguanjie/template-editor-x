export class LoginInfo {
    result: number
    resultMsg: string
    needVerifyCode: boolean
    failCount: number
    remainCount: number
    token: string
    refreshToken: string
    accessToken: string
    name: string
    userId: string
    userName: string
    avator: string
    sex: string
    loginOrganizationId: string
    organizationId: string
    /**
     * @typedef  {Object} LoginInfo
     * @property {number} result 
     * @property {string} resultMsg 登录结果描述
     * @property {boolean} needVerifyCode 是否需要验证码
     * @property {number} failCount 登录失败次数
     * @property {number} remainCount 剩余登录次数
     * @property {string} token 
     * @property {string} refreshToken
     * @property {string} accessToken
     * @property {string} name 用户名称
     * @property {string} userId 用户id
     * @property {string} userName 用户名
     * @property {string} avator 头像
     * @property {string} sex 性别
     * @property {string} loginOrganizationId 登录机构ID
     * @property {string} organizationId 所属机构ID
     */
    constructor({ result, resultMsg, needVerifyCode, failCount, remainCount, token, refreshToken, accessToken, name, userId, userName, avator, sex, loginOrganizationId, organizationId } = {} as any) {
        this.result = result;
        this.resultMsg = resultMsg;
        this.needVerifyCode = needVerifyCode;
        this.failCount = failCount;
        this.remainCount = remainCount;
        this.token = token;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.name = name;
        this.userId = userId;
        this.userName = userName;
        this.avator = avator;
        this.sex = sex;
        this.loginOrganizationId = loginOrganizationId;
        this.organizationId = organizationId;
    }
}

export class UserInfoItem {
    UserId: string
    UserName: string
    Account: string
    MobilePhone: string
    IsAuthorize: boolean
    /**
     * @typedef  {Object} ResultData
     * @property {string} UserId
     * @property {string} UserName
     * @property {string} Account
     * @property {string} MobilePhone
     * @property {boolean} IsAuthorize
     */
    constructor({ UserId, UserName, Account, MobilePhone, IsAuthorize } = {} as any) {
        this.UserId = UserId;
        this.UserName = UserName;
        this.Account = Account;
        this.MobilePhone = MobilePhone;
        this.IsAuthorize = IsAuthorize;
    }
}

export class UserInfoList {
    TotalCount: number
    TotalPage: number
    ResultData: UserInfoItem[]
    /**
     * @typedef  {Object} 1
     * @property {number} TotalCount
     * @property {number} TotalPage
     * @property {UserInfoItem[]} ResultData
     */
    constructor({ TotalCount, TotalPage, ResultData } = {} as any) {
        this.TotalCount = TotalCount;
        this.TotalPage = TotalPage;
        this.ResultData = ResultData;
    }
}


export class ILogin {
    userName: string
    password: string
    organizationId: string
    verifyCode: string
    uuid: string
    /**
     * @typedef  {Object} ILogin 登录接口入参
     * @property {string} userName 手机号/用户名
     * @property {string} password 密码
     * @property {string} organizationId 登录机构
     * @property {string} verifyCode 验证码
     * @property {string} uuid
     */
    constructor({ userName, password, organizationId, verifyCode, uuid } = {} as any) {
        this.userName = userName;
        this.password = password;
        this.organizationId = organizationId;
        this.verifyCode = verifyCode;
        this.uuid = uuid;
    }
}



export class UserRoles {
    roleName: string
    value: string
    /**
     * @typedef  {Object} Roles
     * @property {string} roleName 角色名字，角色编码
     * @property {string} value 角色
     */
    constructor({ roleName, value } = {} as any) {
        this.roleName = roleName;
        this.value = value;
    }
}

export class UserPermission {
    id: string
    parentID: string
    code: string
    name: string
    type: number
    url: string
    icon: string
    sort: number
    /**
     * @typedef  {Object} Permission
     * @property {string} id 
     * @property {string} parentID
     * @property {string} code 
     * @property {string} name
     * @property {number} type
     * @property {string} url
     * @property {string} icon
     * @property {number} sort
     */
    constructor({ id, parentID, code, name, type, url, icon, sort } = {} as any) {
        this.id = id;
        this.parentID = parentID;
        this.code = code;
        this.name = name;
        this.type = type;
        this.url = url;
        this.icon = icon;
        this.sort = sort;
    }
}

export class UserInfo {
    userId: string
    username: string
    deptID: string
    deptName: string
    organID: string
    organName: string
    editPasswordStatus: number
    editPasswordVerifyWay: number
    roles: UserRoles[]
    permission: UserPermission[]
    homepageCode: string
    loginID: string
    mobilePhone: string
    password: string
    // 根据院区，是否显示辅助人和治疗时间
    isShowNurse: boolean
    isShowTreatTime: boolean
    /**
     * @typedef  {Object} 用户表，用户登录信息
     * @property {string} userId 用户Id
     * @property {string} username 账号名称，登录账号
     * @property {string} deptID 部门id
     * @property {string} deptName 部门名称
     * @property {string} organID 组织机构id
     * @property {string} organName 组织机构
     * @property {number} editPasswordStatus  密码有效性
     * @property {number} editPasswordVerifyWay 修改密码验证方式
     * @property {Roles[]} roles 角色表
     * @property {UserPermission[]} permission 权限表
     * @property {string} homepageCode 默认首页编码
     * @property {string} loginID 登录id
     * @property {string} mobilePhone 手机
     * @property {string} password 密码
     */
    constructor({ userId, username, deptID, deptName, organID, organName, editPasswordStatus, editPasswordVerifyWay, roles, permission, homepageCode, loginID, mobilePhone, password, isShowNurse, isShowTreatTime } = {} as any) {
        this.userId = userId;
        this.username = username;
        this.deptID = deptID;
        this.deptName = deptName;
        this.organID = organID;
        this.organName = organName;
        this.editPasswordStatus = editPasswordStatus;
        this.editPasswordVerifyWay = editPasswordVerifyWay;
        this.roles = roles ?? new UserRoles(roles);
        this.permission = permission ?? new UserPermission(permission);
        this.homepageCode = homepageCode;
        this.loginID = loginID;
        this.mobilePhone = mobilePhone;
        this.password = password;
        this.isShowNurse = isShowNurse;
        this.isShowTreatTime = isShowTreatTime;

    }
}


export enum LoginResultType {
    "登录失败" = 0,
    "登录成功" = 1,
    "账号被锁" = 2,
    "必须修改" = 3,
    "提示修改" = 4,
    "和初始密码相同" = 5,
}