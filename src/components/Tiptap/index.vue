<template>
    <el-dialog v-model="dialogVisible" :show-close="false" class="tiptap-dialog" fullscreen
        :close-on-press-escape="false">
        <template #header>
            <div class="header">
                <div class="header-title">
                    <div class="header-title-wrapp">
                        <div class="header-title-logo"></div>
                        <EditDiv v-model="templateData.templateSetting.templateName" class="header-title-text">
                        </EditDiv>
                        <!-- <div class="fits-space-item"></div> -->
                    </div>
                </div>
                <div class="header-menu">
                    <MenuBtn :editor></MenuBtn>
                </div>
                <div class="header-btns">
                    <el-button @click="dialogVisible = false" type="primary">保存</el-button>
                    <el-button @click="dialogVisible = false"
                        style="--el-button-text-color: var(--fits-base-main-color)">关闭</el-button>
                </div>
            </div>
        </template>
        <DndProvider :backend="HTML5Backend">
            <el-container>
                <el-aside width="320px">
                    <LeftControlPanel :editor></LeftControlPanel>
                </el-aside>
                <el-main class="editor-main" id="editor-main-container">
                    <div class="editor-main-wrapp" :style="editorMainWrapper">
                        <ContextMenu v-bind="contextMenuState" :editor v-model:visible="contextMenuState.visible" />

                        <DropControl :style="editorMainContentStyle" :editor="editor"
                            @contextmenu.prevent="openContextMenu($event)" id="editor-content">
                            <editor-content :editor="editor" />
                        </DropControl>
                        <div class="editor-wrapper-split-line" :style="{ top: editorMainWrapper.minHeight }"></div>
                    </div>
                </el-main>
                <el-aside width="288px">
                    <el-tabs v-model="activeName" class="tabs-template">
                        <el-tab-pane label="模板设置" name="0">
                            <TemplateSetting v-model="templateData.templateSetting"></TemplateSetting>
                        </el-tab-pane>
                        <el-tab-pane label="控件设置" name="1">
                            <WidgetSetting :editor v-model="templateData"></WidgetSetting>
                        </el-tab-pane>
                    </el-tabs>
                </el-aside>
            </el-container>
        </DndProvider>


    </el-dialog>
</template>

<script lang='ts' setup>
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import EditDiv from './components/EditDiv.vue'
import MenuBtn from './components/MenuBtn.vue'
import TextAlign from '@tiptap/extension-text-align'
import { Subscript } from "@tiptap/extension-subscript"
import { Superscript } from "@tiptap/extension-superscript"
import { IndentExtension } from './extensions/IndentExtension'
import { HorizontalRule } from '@tiptap/extension-horizontal-rule'
import { ClearFormat } from './extensions/ClearFormat'
// import { Dropcursor } from '@tiptap/extension-dropcursor';
import { TextStyle } from '@tiptap/extension-text-style'
import { FontFamily } from '@tiptap/extension-font-family'
import { FontSize } from './extensions/FontSize'
import { LineHeight } from './extensions/LineHeight'
import { Highlight } from "@tiptap/extension-highlight"
import { Color } from '@tiptap/extension-color'
import { TableKit } from '@tiptap/extension-table'
import ContextMenu from './components/ContextMenu.vue'
import { CellSelection } from 'prosemirror-tables'
import LeftControlPanel from './components/LeftControlPanel.vue'
import { WidgetNodes } from './extensions/WidgetNodes'
import TemplateSetting from './components/TemplateSetting.vue'
import WidgetSetting from './components/WidgetSetting.vue'
import dataJson from './utils/data.json'
import { TiptapTemplate } from './type'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider, useDrop } from 'vue3-dnd';
import DropControl from './components/DropControl.vue'
import { clearNodeView } from './utils/widgetNodeViewRegistry'
const dialogVisible = defineModel('dialogVisible', { default: true })

const activeName = ref('1')
const templateData = ref<TiptapTemplate>(new TiptapTemplate())
const contextMenuState = reactive({
    visible: false,
    top: 0,
    left: 0,
    isTableView: false,
    isSelection: false,
    savedSelection: null as any
})
// 编辑器主要容器的样式
const editorMainWrapper = computed(() => {
    const width = templateData.value.templateSetting.pageSize === 'A4' ? '210mm' : '148mm';
    const height = templateData.value.templateSetting.pageSize === 'A4' ? '297mm' : '210mm';

    return {
        //templateData.value.templateSetting.pageOrientation === 1  竖向和横向的判断
        width: templateData.value.templateSetting.pageOrientation === 1 ? width : height,
        minHeight: templateData.value.templateSetting.pageOrientation === 1 ? height : width,
        paddingLeft: templateData.value.templateSetting.pageSizeReduce.left + 'mm',
        paddingRight: templateData.value.templateSetting.pageSizeReduce.right + 'mm',
        paddingTop: templateData.value.templateSetting.pageSizeReduce.top + 'mm',
        paddingBottom: templateData.value.templateSetting.pageSizeReduce.bottom + 'mm',

    }
})
// 编辑器最小高度的样式
const editorMainContentStyle = computed(() => {
    const minHeight = parseInt(editorMainWrapper.value.minHeight);
    const paddingTop = parseInt(editorMainWrapper.value.paddingTop);
    const paddingBottom = parseInt(editorMainWrapper.value.paddingBottom);
    const mmValue = minHeight - paddingTop - paddingBottom;
    // console.log('mmValue', mmValue);
    const pxValueDynamic = mmToPxDynamic(mmValue);
    return {
        minHeight: pxValueDynamic + 'px',
    }
})

const editor = useEditor({
    content: `<p>I'm running Tiptap with Vue.js. 🎉</p>`,
    extensions: [
        StarterKit,
        // 缩进
        IndentExtension,
        // 上标
        Superscript,
        // 下标
        Subscript,
        // 清除格式
        ClearFormat,
        // 段落分割线
        HorizontalRule,
        // 字体样式
        TextStyle,
        // 字体大小
        FontSize,
        // 行高
        LineHeight,
        // 字体颜色
        Color,
        // 设置背景颜色
        Highlight.configure({ multicolor: true }),
        FontFamily.configure({
            types: ['textStyle'], // 默认值，可以不配置
        }),
        TextAlign.configure({
            // 允许用户对指定的节点类型（如标题和段落）设置文本对齐方式。
            types: ['heading', 'paragraph'],
        }),

        TableKit.configure({
            table: {
                //是否允许缩放
                resizable: true,
                //拖动时边框大小
                handleWidth: 5,
            },
            // tableCell: false,
        }),
        WidgetNodes,
        // 添加拖拽光标插件
        // Dropcursor.configure({
        //     color: '#ff0000',
        // })
    ],
    onSelectionUpdate: () => {
        updateSelectionStatus()
        // console.log(editor.value?.state.selection instanceof CellSelection, editor.value?.state.selection)
    }
})


// 初始化数据
function initData(_data: TiptapTemplate) {
    if (!editor.value) return;
    templateData.value = new TiptapTemplate(_data)
    editor.value.commands.setContent(templateData.value.templateContent)
}
onMounted(() => {
    // initData(dataJson.data.content as any)
})

// 更新选区状态显示
function updateSelectionStatus() {
    if (!editor.value) return;
    const { selection } = editor.value.state;
    // 选中内容是否为空
    contextMenuState.isSelection = !selection?.empty;
}
// 保存选区状态（核心方法）
function saveSelection() {
    if (!editor.value) return;
    const { selection } = editor.value.state;
    if (selection instanceof CellSelection) {
        // 如果是表格单元格选区，则保存选区状态
        contextMenuState.savedSelection = {
            type: 'cell',
            anchorPos: selection.$anchorCell.pos,
            headPos: selection.$headCell.pos
        };
    } else {
        // 如果不是表格单元格选区，则保存普通选区状态
        contextMenuState.savedSelection = {
            type: 'text',
            from: selection.from,
            to: selection.to
        };

    }
}
// 立即恢复选区（核心方法）
function restoreSelectionImmediately() {
    if (!editor.value || !contextMenuState.savedSelection) return;
    try {
        editor.value.commands.focus();
        if (contextMenuState.savedSelection.type === 'cell') {
            // 如果是表格单元格选区，则恢复选区状态
            editor.value.commands.setCellSelection({
                anchorCell: contextMenuState.savedSelection.anchorPos,
                headCell: contextMenuState.savedSelection.headPos
            });
        } else {
            // 如果不是表格单元格选区，则恢复普通选区状态
            editor.value.commands.setTextSelection({
                from: contextMenuState.savedSelection.from,
                to: contextMenuState.savedSelection.to
            })

        }
    } catch (error) {
        console.error('恢复选区失败:', error);
    }
}
function openContextMenu(e: MouseEvent) {
    // 保存当前选区
    saveSelection();
    e.preventDefault();
    // e.stopPropagation();
    const { clientX, clientY } = e;
    contextMenuState.left = clientX;
    contextMenuState.top = clientY + 5;
    // 获取鼠标位置下的所有元素
    const elements = document.elementsFromPoint(e.clientX, e.clientY);
    // 查找表格元素
    let tableElement = null;
    for (const element of elements) {
        if (element.tagName === 'TABLE') {
            tableElement = element;
            break;
        }
    }
    // 如果找到了表格元素，则显示上下文菜单
    contextMenuState.isTableView = !!tableElement;

    contextMenuState.visible = true;
    // 立即恢复选区（用户无感知）
    setTimeout(() => {
        restoreSelectionImmediately();
    }, 0);
}
function closeContextMenu() {
    contextMenuState.visible = false;
}
const stopWatch = watch(() => contextMenuState.visible, (value) => {
    if (value) {
        document.body.addEventListener('click', closeContextMenu);
    } else {
        // 恢复保存的光标位置
        // contextMenuState.savedSelection = null;
        document.body.removeEventListener('click', closeContextMenu);
    }
})
onBeforeUnmount(() => {
    stopWatch();
    clearNodeView();
})
/**
 * 获取屏幕的dpi
 */
function getDPI() {
    const ratio = window.devicePixelRatio || 1;
    // window.screen.availWidth 是指屏幕的可用宽度，不包括任务栏等系统界面
    const screenDPI = Math.round((window.screen.width / window.screen.availWidth) * ratio * 96);
    return screenDPI;
}
/**
 * 将毫米转像素
 * @param mm 
 */
function mmToPxDynamic(mm: number) {
    const dpi = getDPI();// 动态获取屏幕的dpi
    const mmPerInch = 25.4;// 每英寸的毫米数
    const px = (mm * dpi) / mmPerInch;   // 计算像素值的公式
    return px.toFixed(2); // 返回像素值，保留两位小数
}

</script>
<style lang='scss' scoped>
.header {
    display: flex;
    // justify-content: space-between;
    align-items: center;
    height: 56px;
    padding: 0 16px;
    box-sizing: border-box;
    border-bottom: 1px solid #e6eaee;
    font-size: 14px;

    .header-title {
        min-width: 308px;
        font-weight: 600;

        .header-title-wrapp {
            gap: 4;
            display: inline-flex;
            align-items: center;

            .header-title-logo {
                background: url(data:image/png;base64,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) no-repeat 100% / 100%;
                display: block;
                height: 24px;
                width: 24px;
            }

            .header-title-text {
                -webkit-box-align: center;
                -ms-flex-align: center;
                -webkit-align-items: center;
                align-items: center;
                border-radius: 4px;
                cursor: pointer;
                display: -webkit-box;
                display: -webkit-flex;
                display: -ms-flexbox;
                display: flex;
                font-weight: 600;
                overflow: hidden;
                padding: 4px 8px;
                box-shadow: none
            }
        }
    }

    .header-menu {
        flex: 1;
        padding: 0 30px;
        display: flex;
        align-items: center;
        height: 44px;
        justify-content: center;
        background-color: #fff;
    }

    .header-btns {
        width: 272px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        // gap: 10px;
    }
}
</style>
<style lang="scss">
// 重置富文本的样式
@import url('./utils/ProseMirror.reset.css');



.tiptap-dialog {
    min-width: 1400px;

    .el-dialog__header {
        padding: 0;
    }

    .el-dialog__body {
        display: flex;
        height: calc(100% - 56px);

    }

    .editor-main {
        background: #f3f5f7;
        border-left: 1px solid #e6eaee;
        border-right: 1px solid #e6eaee;
        overflow-x: hidden;

        .editor-main-wrapp {

            position: relative;
            box-sizing: border-box;
            margin: 24px auto;
            background: #fff;
            border: 1px solid #e6eaee;
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .102);

            .editor-wrapper-split-line {
                position: absolute;
                left: 0;
                display: block;
                width: 100%;
                height: 1px;
                content: "";
                border-top: 1px dashed #adf;
            }

        }
    }
}

.tabs-template {
    height: 100%;

    .el-tabs__nav-wrap:after {
        --el-border-color-light: #e0e5ee;
        height: 1px;
    }

    .el-tabs__header {
        margin: 0;
    }

    .el-tabs__content {
        height: calc(100% - 40px);

        &>* {
            height: 100%;
        }
    }

    .el-tabs__item {
        --el-text-color-primary: #7a8794;
        padding: 0 12px;

        &.is-active {
            font-weight: 700;
        }
    }

    &.el-tabs--top>.el-tabs__header .el-tabs__item:nth-child(2) {
        padding-left: 8px;
    }
}
</style>