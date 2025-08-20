<template>
    <date-picker v-model:value="dateModel" v-model:open="isFocus" :format="dateFormat" :type="dateType"
        popup-class="tiptap-date-picker-popup" valueType="format" :clearable="false">
        <template #input>
            <NodeViewContent as="span" v-bind="$attrs"></NodeViewContent>
        </template>
        <template #footer>
            <button class="mx-btn mx-btn-text" @click="handlecClear">
                清除
            </button>
            <button class="mx-btn mx-btn-text" @click="handleToday">
                今天
            </button>
            <button class="mx-btn mx-btn-text" @click="handleConfirm">
                确定
            </button>
        </template>
    </date-picker>
</template>

<script lang='ts' setup>
/*
 * @Author: caoguanjie 
 * @Date: 2025-07-30 16:06:10 
 * @Last Modified by: caoguanjie
 * @Last Modified time: 2025-08-01 10:45:19
 */
import DatePicker from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css';
import 'vue-datepicker-next/locale/zh-cn';
import { NodeViewRendererProps, NodeViewContent } from '@tiptap/vue-3'
const props = defineProps({
    focus: {
        type: Boolean,
        default: false
    },
    nodeViewProps: {
        type: Object as () => NodeViewRendererProps,
        default: () => ({})
    }
})
const isFocus = ref(props.focus);
// 使用计算属性确保数据源唯一
const dateText = computed(() => props.nodeViewProps.node.textContent)
const dateFormat = computed(() => props.nodeViewProps.node.attrs.dateFormat)
// 转换为日期对象（用于选择器）
const dateModel = computed({
    get() {
        if (!dateText.value) return null
        // console.log('fsdfdsfsfsdfe', dateText.value, dateFormat.value)
        return moment(dateText.value).format(dateFormat.value)
    },
    set(value: string) {
        // console.log('dateValue', value)
        const { editor, node } = props.nodeViewProps
        editor.commands.insertFieldText(node.attrs.id, value)
    }
})
// 根据格式返回类型
const dateType = computed(() => {
    const formatValue = dateFormat.value;
    // 检查是否是时间格式（包含 HH:mm 或类似时间部分）
    if (formatValue.includes('HH:mm') || formatValue.includes('hh:mm')) {
        return 'datetime';
    } else if (formatValue === 'YYYY-MM' || formatValue === 'YYYY/MM' ||
        formatValue === 'MM-YYYY' || formatValue === 'MM/YYYY') {
        return 'month';
    } else {
        return 'date';
    }
})

// 清除
function handlecClear() {
    dateModel.value = ''
    isFocus.value = false;
}
// 今天
function handleToday() {
    dateModel.value = moment().format(dateFormat.value)
    isFocus.value = false;
}
// 确定
function handleConfirm() {
    if (!dateModel.value) {
        dateModel.value = moment().format(dateFormat.value)
    }
    isFocus.value = false;
}
const scope = effectScope();
scope.run(() => {
    // 响应格式变化：直接更新节点内容
    watch(dateFormat, (newVal, oldVal) => {
        if (!dateText.value) return

        const date = moment(dateText.value, oldVal)
        if (!date.isValid()) {
            console.error(`日期解析失败: ${dateText.value} with format ${oldVal}`)
            return
        }

        const newText = date.format(newVal)
        const { editor, node } = props.nodeViewProps
        nextTick(() => {
            // 需要等待节点更新完成，才插入，不然会被覆盖
            editor.commands.insertFieldText(node.attrs.id, newText)
        })
    })
})
onUnmounted(() => {
    scope.stop()
})
</script>
<style lang='scss'>
// 输入框样式
.mx-datepicker.custom-field-content {
    width: inherit;

    &.field-empty::after {
        content: none !important;
    }

    .mx-icon-calendar {
        display: none;
    }
}

.tiptap-date-picker-popup {
    z-index: 3000;
}
</style>
