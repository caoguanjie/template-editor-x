
const ENV: FitsSetting = {
    project: {
        title: '精准康复智能管理系统',
        subTitle: 'FITS ADMIN',
        company: '广东丰德科技有限公司',
        version: "2.0.0",
        // api_address: 'http://192.168.32.60:3005/mock/78',
        // api_address: 'http://192.168.32.51:6031/',
        api_address: 'http://192.168.32.51:6050/',
        // api_address: 'http://192.168.32.51:11021/',
        // api_address: 'http://192.168.32.50:6050/',
        // api_address: 'http://192.168.14.111:6031/',
        // api_address: 'http://192.168.14.239:9100/',
        http_timeout: 15000,
        isEmbed: true,
        doctor_address: 'http://192.168.32.231:8052',
        treat_document_header: true,
    },
    system: {
        px2rem: false,
        routerControl: 'backend',
        defaultHome: true
    }


}


export default ENV