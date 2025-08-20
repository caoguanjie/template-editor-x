
// 做一个打印html的vue3 hook，主要是治疗申请单的打印

// import html2canvas from "html2canvas";
import printJS from 'print-js';
import PrintTemplateComponent from '@kangfu/components/PrintTemplate/TreatmentCardTemp.vue'
import TreatmentCardTempCss from '@kangfu/components/PrintTemplate/TreatmentCardTemp.css?raw';
import { render } from "vue";
import { fetchGetPrintPatientConsultInfo, fetchGetPrintSource } from "@/apps/kangfu/services";
import useStore from '@/store';
import { jsPDF } from "jspdf";
import eventBus from '../base/EventBus';
import html2canvas from 'html2canvas';
/**
 * 
 * @param element 需要打印的元素，可以是dom的id或者ref实例，由于是异步的，所以需要等待dom渲染完成
 * @param options 是否需要loading
 * @returns 
 */


export const usePrintTreatmentHook = () => {

    const loading = ref(false);
    const container = ref<HTMLDivElement>();
    // 创建隐藏容器
    const createHiddenContainer = () => {
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.left = '-99999px';
        container.style.zIndex = '9999';
        container.style.top = '0';
        container.id = 'print-treatment-container';
        document.body.appendChild(container);
        return container;
    };
    const printBefore = (printOption: PrintOptions) => {

        // 判断print-treatment-container是否存在，存在先删除
        return new Promise(async (resolve, reject) => {
            const mainDom = document.getElementById('print-treatment-container');
            mainDom && mainDom.remove();

            if (!printOption.requestID) {
                ElMessage.warning('暂无打印数据')
                loading.value = false;
                reject(null)
                return
            }
            // 并发请求患者诊疗信息和申请单打印数据源
            const [patientInfo, printTemplateData] = await Promise.all([
                fetchGetPrintPatientConsultInfo({
                    // 只传多个的其中一个申请单id即可
                    // RequestID: '83f1cc28-5269-4e6b-9326-ae6dc1b368bf',
                    RequestID: printOption.requestID.split(',')[0],
                }),
                fetchGetPrintSource({
                    // RequestID: '83f1cc28-5269-4e6b-9326-ae6dc1b368bf,edeae325-5f57-41a7-87f8-7f6f95171afc,edb4999a-899c-4fb7-8441-2ebcd6520b9e,c5c2bfaa-4444-4fa4-8bda-eaa9640bb484,2642106c-e42f-4336-aba9-470d2d02a479,22a72825-8b61-4a4e-9683-6cd0b2f79ada,0eabfaa6-40d8-4f82-b779-5464bdcbdb3a,9af47258-7b1f-4b56-b5f7-15da4c33bae8,f283ddc5-782c-4e3b-8ae1-09d4ceb36ace,a1ffdd51-3e41-4437-b164-7c9f6d4bcbf2', // 申请单号
                    RequestID: printOption.requestID, // 申请单号
                    PrintWay: printOption.printWay, // 打印方式
                })
            ]);

            if (!patientInfo || !printTemplateData.length) {
                // ElMessage.error('获取患者诊疗信息失败') 接口会提示
                loading.value = false;

                !printTemplateData.length && ElMessage.error('获取打印数据失败')
                reject(null)
                return
            }

            // 1. 创建隐藏容器并渲染
            container.value = createHiddenContainer();
            // 2. 遍历 printTemplateData 遍历数据源
            const vnodeList = printTemplateData.map((item, index) => {
                // 3. 创建虚拟节点
                return h(PrintTemplateComponent, {
                    printTemplateData: new PrintTreatmentModel({
                        organID: patientInfo?.organID,
                        title: patientInfo?.organName,
                        qrCode: patientInfo?.patientInNum, //住院号/门诊号
                        type: patientInfo?.consultSrcName, //就诊来源
                        patientName: patientInfo?.patientName, //患者姓名
                        patientSex: patientInfo?.patientSex, //患者性别
                        patientAge: patientInfo?.patientAge, //患者年龄
                        benNum: patientInfo?.benNum, //床位号
                        patientDepartment: patientInfo?.deptName, //患者科室
                        printDate: patientInfo?.requestDate, //打印时间
                        diagnosis: patientInfo?.diagnosis, //诊断
                        chiefComplaint: patientInfo?.complain, //主诉
                        specialSituation: item?.remark, //特殊情况
                        taskList: item?.orderList, //任务列表
                    }),
                    key: Date.now()
                });
            })
            // 创建一个容器元素来包裹所有的 VNode,记得给id，后面的打印需要这个id
            const containerVNode = h('div', { id: 'print-container-box' }, vnodeList);
            // 4. 渲染虚拟节点到隐藏容器
            render(containerVNode, container.value);
            // 5. 等待渲染完成
            await new Promise(resolve => setTimeout(resolve, 50));
            // border 样式不加会多一个空白页，中转服务的electron版本太低，导致的样式问题，很难排查
            const htmlContent = `
              <!DOCTYPE html>
              <html>
                  <head>
                  <title>治疗卡打印</title>
                  <style>
                  body { 
                          margin: 0;
                          width: 100%;
                          ovrflow: hidden;
                      }
                  ${TreatmentCardTempCss}
                  </style>
                  </head>
                  <body>
                  ${container.value.innerHTML}
                  </body>
              </html>
          `;
            resolve(htmlContent)

        })
    }
    // 处理打印,callback是打印完成后的回调函数
    const print = async (printOption: PrintOptions) => {

        return new Promise(async (resolve, reject) => {
            loading.value = true;
            const { print } = useStore()
            // generatePDF()
            // 重新主动链接
            !print.isConnectPrintService && print.socket.connect()
            const htmlContent = await printBefore(printOption)
            // 第一优先electron客户端打印
            if (window.ipcRenderer) {
                const blob = await generatePDF()
                await window.ipcRenderer.invoke('print-pdf', blob);
                clear()
                // electron客户端打印成功，返回提示语：打印成功，打印失败
                resolve(true)
                return
            } else {
                eventBus.off('downloadPrintSoftware')
                // 监听下载打印软件事件，清除容器
                eventBus.on('downloadPrintSoftware', (isClear: boolean) => {
                    isClear && clear();
                    resolve(false)
                })
                // 第二情况：中转打印组件打印
                await print.openPrintService({
                    html: htmlContent,
                    templateId: 'test',
                    printer: '',
                    pageSize: 'A5',
                    // pageSize: {
                    //     width: 148000,
                    //     height: 200000,
                    // },
                    silent: true,
                    // margins: {
                    //     marginType: 'custom',
                    //     left: 0,
                    //     right: 0,
                    //     top: 0,
                    //     bottom: 0
                    // },
                }).then(() => {
                    clear()
                    resolve(true)
                }).catch(() => {
                    // 点击浏览器打印
                    printBrowser().then(() => {
                        resolve(true)
                    })
                });
            }

        })
    }

    function clear() {
        // 8. 清理DOM
        const mainDom = document.getElementById('print-treatment-container') as HTMLDivElement
        if (mainDom) {
            render(null, mainDom);
            document.body.removeChild(mainDom);
        }

        loading.value = false
    }


    // 使用浏览器打印
    async function printBrowser() {
        // 每隔一段时间触发一次 focus 事件，保持页面的焦点，从而确保onPrintDialogClose事件能够正常触发。
        return new Promise((resolve, reject) => {
            const focuser = setInterval(() => window.dispatchEvent(new Event('focus')), 500);
            printJS({
                printable: 'print-container-box',
                type: 'html',
                scanStyles: false,
                style: TreatmentCardTempCss,
                onPrintDialogClose: () => {
                    clearInterval(focuser);
                    console.log('打印对话框关闭');
                    clear()
                    resolve(true)
                },
                onError: (err) => {
                    console.error('打印失败', err)
                    ElMessage.error('打印失败')
                    clear()
                    reject(err)
                },
            });
        })
    }


    /**
     * 处理客户端electron的打印逻辑，暂时不用，搁置了，这是打印HTML的逻辑，但是electron客户端，打印HTML有点问题，没办法指定A5格式，所以暂时不用
     * @param htmlContent 
     * @returns 
     */
    async function printElectron(htmlContent: string) {
        const response = await window.ipcRenderer.invoke('print-html', {
            htmlContent: htmlContent,
            printConfig: {
                // 开启静默打印
                silent: true,
                // pageSize: 'A5',
                pageSize: {
                    height: 14.8 * 1000,
                    width: 21 * 1000,
                },
                margins: {
                    marginType: 'custom',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                },
            },
            pdfTargetElement: document.querySelectorAll('.page_A5')
        });

        if (!response.success) {
            console.error('打印失败', response.error);
        } else {
            console.log('打印成功')
        }
        return response.success
    }

    /**
     * 生成pdf，应用于electron客户端
     * @returns 
     */
    async function generatePDF() {
        console.time('HTML转化PDF时间')
        var a5WidthInMm = 148;
        var a5HeightInMm = 210;
        var a4WidthInMm = 210;
        var a4HeightInMm = 297;

        const pdf = new jsPDF('p', 'mm', 'a5'); // 初始化A4纵向PDF
        const pageWidth = pdf.internal.pageSize.getWidth(); // 148mm
        const pageHeight = pdf.internal.pageSize.getHeight(); // 210mm
        const elementArray = document.querySelectorAll('.page_A5');
        console.error(elementArray)
        for (let i = 0; i < elementArray.length; i++) {
            const element = elementArray[i];
            // 将HTML转换为Canvas
            const canvas = await html2canvas(element as HTMLElement, {
                scale: 4, // 提高分辨率
                useCORS: true, // 允许跨域图片
                logging: false, // 调试日志（可选）
            });
            // 将Canvas转换为Image
            const imgData = canvas.toDataURL('image/jpeg', 1.0);
            // 添加页面（第一页不需要addPage）
            if (i > 0) pdf.addPage();
            // 兼容a4，a5的打印设置的时候，图片的边距显示效果
            var a5Margin = (a4WidthInMm - a5WidthInMm) / 2
            // 将图像填充到A5页面（自适应尺寸）
            pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, pageHeight);

        }
        // 保存或直接打印
        // pdf.save('a5-document.pdf');
        // 转成blob格式，这个格式方便electron进行另存为pdf
        const pdfData = pdf.output('arraybuffer');
        console.timeEnd('HTML转化PDF时间')
        return pdfData;


    }

    return { loading, print, printBefore }

}


export interface PrintOptions {
    /**
     * 申请单号id:  
     * 1. his开治疗卡页面的打印：requestID支持传入多个，用英文逗号分隔; 
     * 2. 治疗工作站的打印：requestID为单个。非治疗卡时
     */
    requestID: string;
    // 打印方式： 0=his开治疗卡页面的合并打印， 1=治疗工作站的补打治疗卡，2= 治疗工作站的打印空白治疗卡
    printWay: 0 | 1 | 2;
}

// 打印康复治疗卡的数据模型
export class PrintTreatmentModel {
    // 组织id，区分什么院区
    organID: string;
    // 一级标题
    title: string;
    // 二级标题
    subtitle: string;
    // 二维码文本
    qrCode: string;
    // 门诊类型，住院或者门诊
    type: string;
    // 患者姓名
    patientName: string;
    // 患者性别
    patientSex: string;
    // 患者年龄
    patientAge: string;
    // 患者科室
    patientDepartment: string;
    // 打单日期
    printDate: string;
    // 诊断
    diagnosis: string;
    // 主诉
    chiefComplaint: string;
    // 床位
    benNum: string;
    // 治疗方案
    taskList: Array<PrintTaskModel>;
    // 特殊情况
    specialSituation: string;
    // 注意事项：
    attention: string;
    // 根据任务数数据计算生成的页面数据
    paginatedTasks: Array<Array<PrintTaskModel>>;
    // 页脚信息
    footer: string[];
    constructor(data?: any) {
        this.organID = data?.organID || '';
        this.title = data?.title || '暨南大学第一附属医院';
        this.subtitle = data?.subtitle || '康复治疗卡';
        this.qrCode = data?.qrCode || '';
        this.type = data?.type || ''; // 门诊或者住院
        this.patientName = data?.patientName || '';
        this.patientSex = data?.patientSex || '';
        this.patientAge = data?.patientAge || '';
        this.benNum = data?.benNum || '';
        this.patientDepartment = data?.patientDepartment || '';
        this.printDate = data?.printDate ? moment(data.printDate).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');
        this.diagnosis = data?.diagnosis || '';
        this.chiefComplaint = data?.chiefComplaint || '';
        this.taskList = data?.taskList ? data.taskList.map((item: any, index: number) => new PrintTaskModel(item, index)) : [];
        // this.taskList = data?.taskList ? this.createTaskList() : this.createTaskList(); // 测试数据
        this.specialSituation = data?.specialSituation || '';
        this.attention = this.initAttentionHtml() || '';
        this.initFooterInfo();
        this.initPaginatedTasks();
    }
    // 注意事项根据院区id进行区分，页面上v-html渲染
    initAttentionHtml() {
        if (this.organID === '0000') {
            // 华侨总院
            return `周一至周五全天，周六、日及节假日上午接受治疗，<strong>两次治疗间隔超过20天</strong>，因病情变化不允许直接持此卡治疗，需挂号复诊。`
        } else {
            // 其他院区
            return `周一至周五全天，周六上午接受治疗，周日休息不接受治疗，节假日另行通知，<strong>两次治疗间隔超过20天</strong>，因病情变化不允许直接持此卡治疗，需挂号复诊。`
        }
    }
    // 初始化页脚信息
    initFooterInfo() {
        if (this.organID === '0000') {
            // 华侨总院
            this.footer = ['理疗：38688133', '运动：38688311', '病房：38688639', '手法：38688661', '语言：38688491'];
        } else {
            // 东圃院区
            this.footer = ['理疗针灸室301房', '手法室203房', '运动室0楼'];
        }
    }

    // 创建tasklist测试数据
    createTaskList() {
        return [
            new PrintTaskModel({
                orderID: '1',
                orderName: '[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1][有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1]',
                executeNum: 1,
                executeList: Array(10).fill('')
                // executeList: ['2022-01-01', '2022-01-02', '2022-01-03']
            }, 0),
            // new PrintTaskModel({

            //     orderID: '2',
            //     orderName: '[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1]',
            //     executeNum: 1,
            //     // 创建30个空白格子
            //     executeList: Array(30).fill('')
            // }, 2),
            // new PrintTaskModel({
            //     orderID: '2',
            //     orderName: '[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1];[有氧训练*1]',
            //     executeNum: 1,
            //     executeList: ['11/12', '11/12', '11/12']
            // }, 1),

        ]
    }

    // 初始化分页数据
    initPaginatedTasks() {
        // 页面尺寸常量,单位是pt，以a5格式为例
        const PAGE = {
            // a5的尺寸高度
            HEIGHT: 595,
            // 固定的头部高度
            HEADER: 140,
            // 固定的页脚高度
            FOOTER: 210,
            // 可填充的内容高度
            CONTENT: 595 - 140 - 210 // 245pt
        };
        const pages: PrintTaskModel[][] = [];
        let currentPage: PrintTaskModel[] = [];
        let currentHeight = 0; // 当前页面的高度
        // 计算参数配置
        const CALC_CONFIG = {
            title: {
                fontSize: 10.5,        // 标题字体大小(pt)
                lineHeight: 16,     // 标题行高
                maxWidth: 390,       // 标题最大可用宽度(根据实际布局调整)
                charWidth: 6.5,        // 单个字符估算宽度(pt),一般是fontsize的0.7-0.8倍，根据实际调整
                marginBottom: 6     // 标题下边距(pt)
            },
            grid: {
                rowHeight: 18,       // 网格行高(pt)
                rowGap: 6,           // 网格行间距(pt)
                maxItems: 30,         // 最大格子数量
                marginBottom: 12     // 网格下边距
            }
        };
        // 精确计算单个治疗任务的高度
        const calculateTaskHeight = (task: PrintTaskModel) => {
            // 标题高度计算
            const titleCharsPerLine = Math.floor(CALC_CONFIG.title.maxWidth / CALC_CONFIG.title.charWidth);
            const titleLines = Math.ceil(task.orderName.length / titleCharsPerLine);
            const titleHeight = titleLines * CALC_CONFIG.title.lineHeight;

            // 网格高度计算
            const validItems = task.executeList.slice(0, CALC_CONFIG.grid.maxItems);
            const gridRows = Math.ceil(validItems.length / 10);
            const gridHeight = gridRows * CALC_CONFIG.grid.rowHeight +
                Math.max(0, gridRows - 1) * CALC_CONFIG.grid.rowGap;
            return titleHeight + CALC_CONFIG.title.marginBottom + gridHeight + CALC_CONFIG.grid.marginBottom;
        };
        // 分页的逻辑
        this.taskList.forEach((task, index) => {
            const taskHeight = calculateTaskHeight(task); // 计算单个任务的高度

            // 标题加上序号
            task.orderName = `${index + 1}、 ${task.orderName}`;

            // 处理单任务高度超页情况,可能出现标题无敌长的情况，默认只允许最少显示9行数据，最多显示11行，多余就省略号
            if (taskHeight > PAGE.CONTENT) {
                if (currentPage.length) pages.push(currentPage);
                // 网格高度计算
                const validItems = task.executeList.slice(0, CALC_CONFIG.grid.maxItems);
                const gridRows = Math.ceil(validItems.length / 10);
                task.titleLines = 12 - gridRows;
                pages.push([task]);
                currentPage = [];
                currentHeight = 0;
                return;
            }

            // 正常分页逻辑
            if (currentHeight + taskHeight > PAGE.CONTENT) {
                pages.push(currentPage);
                currentPage = [task];
                currentHeight = taskHeight;
            } else {
                currentPage.push(task);
                currentHeight += taskHeight;
            }
        });
        // 处理最后一页
        if (currentPage.length) pages.push(currentPage);
        this.paginatedTasks = pages;
    }

}

export class PrintTaskModel {
    // 任务ID
    orderID: string;
    // 任务名称
    orderName: string;
    // 执行次数
    executeNum: number;
    //任务执行记录:字符串集合,有多少条记录就显示多少个格子， 空白格子时，值为空白字符串，补打时，为MM/dd格式
    executeList: Array<string>;
    // 任务序号
    seq: number;
    // 标题限制最多显示多少行
    titleLines: number;
    constructor(data?: any, index?: number) {
        // 初始化任务ID
        this.orderID = data?.orderID || '';
        // 初始化任务名称
        this.orderName = data?.orderName || '';
        // 初始化执行次数
        this.executeNum = data?.executeNum || 0;
        this.executeList = data?.executeList || [];
    }
}