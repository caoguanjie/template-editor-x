<template>

    <NodeViewWrapper class="custom-field" data-extension-type='field'
        :class="{ 'field-focus': isFocus, 'shink': shink, 'vertical': computedDirection }"
        :contenteditable="computeContenteditable" :data-id="node.attrs.id"
        :data-underline="node.attrs.isUnderline ? '1' : null" :data-readonly="node.attrs.isReadonly ? '1' : null"
        :data-validate="computedValidate" as="span">
        <component :is="widgetComponent" class="custom-field-content" :class="{ 'field-empty': !node.textContent }"
            :data-placeholder="props.node.attrs.placeholder" :data-widget-name="node.attrs.name"
            :data-widget-type="ControlType[node.attrs.type]"
            :data-widget-type-name="node.attrs.typeName || ControlTypeName[node.attrs.type as ControlType]"
            :data-font-num="node.attrs.width" :data-required="node.attrs.isRequired"
            :style="{ 'min-width': minWidth, display: computedDisplay, 'font-size': currentFontSize, 'text-align': computedAlign }"
            ref="container" :nodeViewProps="props" :focus="isFocus" />
    </NodeViewWrapper>
</template>

<script lang='ts' setup>
/*
 * @Author: caoguanjie 
 * @Date: 2025-08-19 10:43:39 
 * @Last Modified by: caoguanjie
 * @Last Modified time: 2025-08-19 15:34:59
 * @Description:
 * 这个组件还有一个缺陷无法尚未解决，单选和多选，其实可以不要放在component组件，这样会多一层节点，导致键盘左右无法正常切出编辑区域
 * 可以按下面例子
 * <NodeViewWrapper>
 *   <span class="widget-container" ref="container" :data-checked="node.attrs.checked ? '1' : null">
 *        <span contenteditable="false" class="prefix-start" @click.stop="handleChecked">​</span>
 *        <NodeViewContent class="custom-field-content" as="span" :style="$attrs.style" data-placeholder></NodeViewContent>
 *        <span contenteditable="false" class="prefix-end">​</span>
 *    </span>
 * </NodeViewWrapper>
 */
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import TextInput from './TextInput.vue'
import DateInput from './DateInput.vue';
import SelectInput from './SelectInput.vue'
import RadioInput from './RadioInput.vue'
import CheckboxInput from './CheckboxInput.vue'

import { AlignType, ControlType, ControlTypeName } from '../type';
const container = ref<any>(null);

const widgetComponent = computed(() => {
    if (props.node.attrs.type === ControlType.text || props.node.attrs.type === ControlType.inputNumber) {
        return TextInput;
    } else if (props.node.attrs.type === ControlType.date) {
        return DateInput;
    } else if (props.node.attrs.type === ControlType.select) {
        return SelectInput;
    } else if (props.node.attrs.type === ControlType.radio) {
        return RadioInput;
    } else if (props.node.attrs.type === ControlType.checkbox) {
        return CheckboxInput;
    }
    return TextInput
});
// 原始宽度
const originWidth = ref(0);
const props = defineProps(nodeViewProps);
// 缩放动画
const shink = ref(false);
// 是否处于焦点状态
const isFocus = computed(() => {
    return isFieldActive(props.node.attrs.id)
});
// 动态计算控件能否编辑
const computeContenteditable = computed(() => {
    // 如果是只读状态不可编辑
    // 如果是日期控件，则不可编辑
    if (props.node.attrs.isReadonly || props.node.attrs.type === ControlType.date) {
        return false
    } else {
        return true
    }
});
// 元素分布的方向
const computedDirection = computed(() => {
    // 1 上下 2 左右
    if (!(props.node.attrs.type === ControlType.radio || props.node.attrs.type === ControlType.checkbox)) {
        return false
    }
    return props.node.attrs.layout === 2
})
// 获取当前节点的对齐方式
const computedAlign = computed(() => {
    switch (props.node.attrs.align) {
        case AlignType.left:
            return 'left';
        case AlignType.center:
            return 'center';
        case AlignType.right:
            return 'right';
        default:
            return 'left';
    }
});
// 获取当前节点应用的字体大小
const currentFontSize = computed(() => {
    if (isFocus.value) {
        for (let i = 9; i <= 36; i++) {
            if (props.editor?.isActive('textStyle', { fontSize: `${i}pt` })) {
                // console.error(i);
                // 更新节点属性中的字体大小
                props.updateAttributes({ fontSize: i });
                return i + 'pt';
            }
        }
        return props.node.attrs.fontSize + 'pt' || '11pt';
    } else {
        return props.node.attrs.fontSize + 'pt' || '11pt';
    }
});
const minWidth = computed(() => {
    return props.node.attrs.width * parseInt(currentFontSize.value) + 'pt';
});
// 动态样式
const computedDisplay = computed(() => {
    // 提前返回，减少嵌套
    if (!container.value || !container.value?.$el || !props.node?.textContent) {
        return 'inline-block';
    }
    // 检查 $el 是否存在并且是一个 DOM 元素
    const $el = container.value.$el;
    if (!$el || typeof $el.getBoundingClientRect !== 'function') {
        return 'inline-block';
    }

    // 获取元素宽度
    try {
        const rect = $el.getBoundingClientRect();
        const currentWidth = rect.width;

        // 初始化原始宽度
        if (!originWidth.value) {
            originWidth.value = currentWidth;
            return 'inline-block';
        }
        // 根据宽度比较结果返回display值
        return currentWidth > originWidth.value ? 'inline' : 'inline-block';
    } catch (error) {
        console.error('Error getting element dimensions:', error);
        return 'inline-block';
    }
});

// 动态计算校验状态
const computedValidate = computed(() => {
    if (props.node.textContent.trim() !== '') {
        return null
    } else {
        return props.node.attrs.validate ? null : '0'
    }
})
// 动态计算字段是否激活
const isFieldActive = (fieldId: string) => {
    const { state } = props.editor;
    const { selection } = state;
    const { $from, $to } = selection;

    const fromNode = $from.node();
    const toNode = $to.node();
    // console.error(fromNode, toNode)
    if ((fromNode.type.name === 'widgetField' && fromNode.attrs.id === fieldId) || (toNode.type.name === 'widgetField' && toNode.attrs.id === fieldId)) {
        // console.warn(props.node.attrs)
        return true;
    }
    return false;
};
function handleInput(value: any) {
    console.log(props.node.attrs.typeName, value);
    props.updateAttributes({ value });
}
// 监听属性值的变化，增加变化效果
const stopWatch = watch(() => props.node.attrs, (value) => {
    console.log(value, props)
    // if (value.isRequired == 1) {
    //     console.log('validate')
    //     setTimeout(() => {
    //         const valid = props.editor.commands.validateField()
    //         console.error(valid)
    //     }, 3000);
    // }
    // shink.value = true;
    // setTimeout(() => {
    //     shink.value = false;
    // }, 500);
    // console.log(value)
    // if (value) {
    //     // props.updateAttributes({
    //     //     widgetValue: value,
    //     // });
    //     computedPlaceholder.value = ''
    // } else {
    //     // props.updateAttributes({
    //     //     widgetValue: value,
    //     // });
    //     debugger
    //     computedPlaceholder.value = props.node.attrs.placeholder || props.node.attrs.widgetTypeName || '文本输入'
    // }
    // props.updateAttributes({ value });
})
onBeforeUnmount(() => {

    stopWatch();
});
onMounted(() => {

});


</script>
