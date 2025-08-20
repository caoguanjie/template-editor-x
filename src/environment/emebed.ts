
const ENV: FitsSetting = {
    project: {
        title: '深圳蓝生脑科医院康复系统',
        subTitle: 'FITS ADMIN',
        company: '广东丰德科技有限公司',
        version: "1.0.0",
        // api_address: 'http://192.168.32.60:3005/mock/78',
        api_address: 'http://192.168.32.50:6031/',
        http_timeout: 15000,
        isEmbed: true
    },
    system: {
        px2rem: false,
        dir: './BlueOrder',
        routerControl: 'backend',
        isDebug: false
    }

}


export default ENV
