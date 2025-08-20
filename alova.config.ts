export default {
    // api生成设置数组，每项代表一个自动生成的规则，包含生成的输入输出目录、规范文件地址等等
    generator: [
        // 服务器1
        {
            // input参数1：openapi的json文件url地址
            input: 'http://192.168.32.51:6051/swagger/ABP/swagger.json',

            // input参数2：以当前项目为相对目录的本地地址
            // input: 'openapi/api.json'

            // input参数3：没有直接指向openapi文件时，是一个文档地址，必须配合platform参数指定文档类型
            // input: 'http://192.168.5.123:8080'

            // （可选）platform为支持openapi的平台，目前只支持swagger，默认为空
            // 当指定了此参数后，input字段只需要指定文档的地址而不需要指定到openapi文件
            // platform: 'swagger',

            // 接口文件和类型文件的输出路径，多个generator不能重复的地址，否则生成的代码会相互覆盖
            output: 'src/services/api/UserAccount',

            // （可选）指定生成的响应数据的mediaType，以此数据类型来生成200状态码的响应ts格式，默认application/json
            responseMediaType: 'application/json',

            // （可选）指定生成的请求体数据的bodyMediaType，以此数据类型来生成请求体的ts格式，默认application/json
            bodyMediaType: 'application/json',

            // （可选）指定生成的api版本，默认为auto，会通过当前项目安装的alova版本判断当前项目的版本，如果生成不正确你也可以自定义指定版本
            version: 'auto',

            /**
             * （可选）生成代码的类型，可选值为auto/ts/typescript/module/commonjs，默认为auto，会通过一定规则判断当前项目的类型，如果生成不正确你也可以自定义指定类型：
             * ts/typescript：意思相同，表示生成ts类型文件
             * module：生成esModule规范文件
             * commonjs：表示生成commonjs规范文件
             */
            type: 'auto',

            /**
             * 全局导出的api名称，可通过此名称全局范围访问自动生成的api，默认为`Apis`，配置了多个generator时为必填，且不可以重复
             */
            global: 'userApis',

            /**
             * （可选）过滤或转换生成的api接口函数，返回一个新的apiDescriptor来生成api调用函数，未指定此函数时则不转换apiDescripor对象
             */
            // handleApi: apiDescriptor => {
            //     // 返回falsy值表示过滤此api
            //     if (!apiDescriptor.path.startWith('/user')) {
            //         return;
            //     }

            //     apiDescriptor.parameter = apiDescriptor.parameter.filter(
            //         param => param.in === 'header' && param.name === 'token'
            //     );
            //     delete apiDescriptor.requestBody.id;
            //     apiDescriptor.url = apiDescriptor.url.replace('/user', '');
            //     return apiDescriptor;
            // }
        },
        {
            global: 'sysApis',
            input: 'http://192.168.32.51:6052/swagger/Sys/swagger.json',
            // 接口文件和类型文件的输出路径，多个generator不能重复的地址，否则生成的代码会相互覆盖
            output: 'src/services/api/sysDepartment',

        },
        {
            global: 'treatManApis',
            input: 'http://192.168.32.51:6053/swagger/Bussines/swagger.json',
            // 接口文件和类型文件的输出路径，多个generator不能重复的地址，否则生成的代码会相互覆盖
            output: 'src/apps/kangfu/services/api/treat-manage',
        },
        {
            global: 'sacleEvaluateApis',
            input: 'http://192.168.32.51:6053/swagger/Bussines/swagger.json',
            // 接口文件和类型文件的输出路径，多个generator不能重复的地址，否则生成的代码会相互覆盖
            output: 'src/apps/scale/services/api/evaluate',
        },
        {
            global: 'hisApis',
            input: 'http://192.168.32.161:6040/swagger/HIS/swagger.json',
            // 接口文件和类型文件的输出路径，多个generator不能重复的地址，否则生成的代码会相互覆盖
            output: 'src/apps/his/services/api/HIS',
        },
        {
            global: 'medicalRecordApis',
            input: 'http://192.168.32.231:6039/swagger/Bussines/swagger.json',
            // 接口文件和类型文件的输出路径，多个generator不能重复的地址，否则生成的代码会相互覆盖
            output: 'src/apps/his/services/api/MedicalRecord',
        },
        // {
        //     global: 'kangApis',
        //     input: ' http://192.168.32.161:9021/swagger/Bussines/swagger.json',
        //     output: 'src/apps/kangfu/services/api/Bussines',
        // }
    ],

    // （可选）是否自动更新接口，默认开启，每5分钟检查一次，false时关闭
    autoUpdate: false

    /* 也可以配置更详细的参数 */
    // autoUpdate: {
    //     // 编辑器开启时更新，默认false
    //     launchEditor: true,
    //     // 自动更新间隔，单位毫秒,500分钟一次
    //     interval: 500 * 60 * 1000
    // }

};