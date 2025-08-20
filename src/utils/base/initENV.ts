
/**
 * 文件说明：
 * 通过这种方式导入main.ts文件，会优先执行initEnv函数。
 * 如果下面的代码直接放在main.ts文件，会先执行http相关服务，才轮到下面的方法，在执行时机来说，已经比较晚了
 * 这种跟import的特性有关系
 */

const initEnv = () => {

    const project = Object.assign({}, ENV.project, window.systemSetting?.project);
    const system = Object.assign({}, ENV.system, window.systemSetting?.system);

    // 设置环境变量，合并外部配置，可以随时对环境变量进行控制, vite中的define只针对开发环境
    Reflect.set(window, "ENV", { project, system, modules: ENV.modules })
}

export default initEnv();