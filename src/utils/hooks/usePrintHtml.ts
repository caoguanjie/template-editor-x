
// 做一个打印html的vue3 hook，主要是量表和评定表的打印

import { ElLoading } from "element-plus";
import html2canvas from "html2canvas";
import printJS from 'print-js';
/**
 * 
 * @param element 需要打印的元素，可以是dom的id或者ref实例，由于是异步的，所以需要等待dom渲染完成
 * @param options 是否需要loading
 * @returns 
 */
export const usePrintHtml = (options: {
    // 是否需要loading
    isShowLoading?: boolean,
    // html的id属性或者ref实例
    domID?: string | Ref<string>
}) => {
    const loading = ref(false)
    const isShowLoading = options.isShowLoading ?? true
    const defaultProps = {
        fullscreen: true,
        lock: true,
        text: '正在打印中...',
        spinner: 'el-icon-loading',
        customClass: "global-loading"
    }
    let loadingInstance: any = null
    // 服务的方式调用的全屏 Loading 是单例的
    const openLoading = (): void => {
        loadingInstance = isShowLoading && ElLoading.service(defaultProps)
    };
    const print = () => {
        return new Promise((resolve) => {
            // 防止多次点击
            if (loading.value) {
                resolve(false)
                return
            }
            loading.value = true
            openLoading()
            const printTarget = (options?.domID && isRef(options.domID) ? options.domID : document.getElementById(options.domID as string)) || document.body
            try {
                html2canvas(printTarget as HTMLElement, {
                    backgroundColor: 'white',
                    useCORS: true,
                    // 纵向偏移量 写死0 可以避免滚动造成偶尔偏移的现象
                    scrollY: 0,
                    foreignObjectRendering: false,
                    windowWidth: document.body.scrollWidth,
                    windowHeight: document.body.scrollHeight,
                    onclone: (documentClone) => {
                        const inputs = documentClone.querySelectorAll('input, textarea');
                        inputs.forEach((input: any) => {
                            input.setAttribute('placeholder', ''); // 清空placeholder
                            // 或者 input.type = 'hidden'; // 隐藏输入框
                        })
                        const radios = documentClone.querySelectorAll('input[type="radio"]');
                        const checkboxes = documentClone.querySelectorAll('input[type="checkbox"]');
                        const elselects = documentClone.querySelectorAll('.el-select__wrapper, .el-input__wrapper, .el-textarea__inner');
                        elselects.forEach((elselect: any) => {
                            // 下拉框阴影做的边框样式，打印会糊边
                            elselect.style.boxShadow = 'none';
                            elselect.style.border = '1px solid #dcdfe6';

                            // elselect.style.lineHeight = '30px';
                            const selectPlaceholder = elselect.querySelector('.el-select__placeholder')
                            if (selectPlaceholder) {
                                selectPlaceholder.style.overflow = 'unset';
                            }
                        })

                        // 量表结果的评估日期，详情时去除边框
                        const noBoxShodow = documentClone.querySelectorAll('.el-input.el-date-editor .el-input__wrapper,.other-msg-content .el-input.el-date-editor .el-input__wrapper');
                        noBoxShodow.forEach((item: any) => {
                            item.style.boxShadow = 'none';
                            item.style.border = '0px'
                        })

                        // 输入框的问题，设置行高失效
                        const inputInners = documentClone.querySelectorAll('.el-input__inner');
                        inputInners.forEach((inputInner: any) => {
                            // 解决input框渲染时，文本往左上角靠问题
                            inputInner.style.paddingTop = '7px';
                        })
                        radios.forEach((radio: any) => {
                            // 去除打印显示出一个小点点
                            radio.style.visibility = 'hidden';
                            // 添加其他样式
                        });

                        checkboxes.forEach((checkbox: any) => {
                            checkbox.style.visibility = 'hidden';
                            // 添加其他样式
                        });



                        const vxeSelects = documentClone.querySelectorAll('.vxe-select');
                        vxeSelects.forEach((el: any) => {
                            const selectSuffixIcon = el.querySelector('.vxe-input--suffix-icon')
                            if (selectSuffixIcon) {
                                selectSuffixIcon.style.visibility = 'hidden';
                            }
                        })
                        const yesPrints = documentClone.querySelectorAll('.yes-print');
                        yesPrints.forEach((el: any) => {
                            el.style.display = 'unset';
                        })
                    },
                    ignoreElements: (element: any) => {
                        // 忽略打印按钮
                        if (element.classList.contains('FitsScaleButton') || element.classList.contains('no-print')) {
                            return true;
                        } else {
                            return false
                        }
                    },
                }).then(function (canvas) {
                    const url = canvas.toDataURL();
                    loadingInstance?.close()
                    loading.value = false
                    printJS({
                        printable: url,
                        type: 'image',
                        // targetStyles: ['*'],
                        base64: true,
                        style: '@media print{ @page{size:auto;margin:1.5cm 1cm 1.5cm 1cm} body{ margin:0px  } img {display: block; margin: 0px;}}',// 解决打印多页第一页空白问题
                        onPrintDialogClose: () => {
                            console.log('打印对话框关闭');
                            resolve(true)
                        },
                    })
                }).catch(err => {
                    loadingInstance?.close()
                    loading.value = false
                    ElMessage.error('打印失败')
                    console.log('打印失败', err)
                });
            } catch (error) {
                loadingInstance?.close()
                loading.value = false
                ElMessage.error('启动打印失败')
                console.log('启动打印失败', error)
            }
        })

    }

    return {
        loading,
        print
    }

}