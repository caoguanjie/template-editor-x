<!-- 可编辑的div -->
<template>
    <div class="editableDiv-wrapp" :class="{ 'is-focus': !isBlur }" tabindex="-1">
        <div id="editableDiv" ref="editableDivRef" :contenteditable='!disabled' :placeholder class="input"
            :class="{ 'is-disabled': disabled }" tabindex="0" @input='input' @focus="inputFocus" @blur="inputBlur"
            v-text="innerText">
        </div>
    </div>

</template>

<script lang='ts' setup>
const modelValue = defineModel()
const props = defineProps({
    placeholder: {
        type: String,
        default: '请输入'
    },
    // 只读属性
    disabled: {
        type: Boolean,
        default: false
    }
})


const innerText = ref(modelValue.value);

const emit = defineEmits(['focus', 'blur', 'input'])
const editableDivRef = ref<HTMLElement>()
const isBlur = ref(true); // 解决赋值时光标自动定位到起始位置

function input(event: any) {
    // 过滤掉空格和\n
    // event.target.innerText = event.target.innerText.replace(/(^\s*)|(\s*$)/g, '');
    // if (event.target.innerText.trim() === '') {
    //     event.target.innerText = ''
    // }
    modelValue.value = event.target.innerText;
    console.log(event.target.innerText, 111111)
    emit('input', event.target.innerText.replace(/(^\s*)|(\s*$)/g, ''))
}
function inputFocus(event: any) {
    // 光标移动到最后
    po_Last_Div()
    isBlur.value = false
    emit('focus')
}
function inputBlur(event: any) {
    // 空字符会让v-html指令产生多个br标签
    if (event.target.innerHtml === '<br>') {
        innerText.value = undefined
    }
    isBlur.value = true;
    emit('blur')
}

watch(() => modelValue.value, (newVal: any) => {
    if (isBlur.value && innerText.value !== newVal) {
        innerText.value = newVal
    }
})
// 这里解决的是，tab键后，光标会定位到起始位置的问题
function po_Last_Div() {
    if (window.getSelection && editableDivRef.value) {//ie11 10 9 ff safari
        // editableDivRef.value.focus(); //解决不获取焦点无法定位问题
        var range = window.getSelection();//创建range
        range?.selectAllChildren(editableDivRef.value);//range 选择obj下所有子内容
        range?.collapseToEnd();//光标移至最后
    }
}
// 监听键盘的粘贴事件，解决粘贴内容格式问题
const handlePaste = (e: any) => {
    e.stopPropagation();
    // 取消默认的粘贴行为
    e.preventDefault();
    let text = e.clipboardData?.getData('text/plain');
    innerText.value = innerText.value + text;
}
onMounted(() => {
    nextTick(() => {
        //  监听键盘的粘贴事件，解决粘贴内容格式问题
        editableDivRef.value?.addEventListener('paste', handlePaste)
    })
})
// onUnmounted(() => {
//     // 移除监听键盘的粘贴事件，解决粘贴内容格式问题
//     editableDivRef.value?.removeEventListener('paste', handlePaste)
// })
</script>
<style lang='scss' scoped>
.editableDiv-wrapp {
    width: 100%;
    line-height: 20px;
    min-height: 20px;
    padding: 8px 10px;
    box-shadow: 0 0 0 1px #E3E3E3 inset;
    position: relative;



    &.is-focus {
        box-shadow: 0 0 0 2px #c3e0fe inset !important;


        &::after {
            content: "";
            position: absolute;
            top: 2px;
            left: 2px;
            width: calc(100% - 4px);
            height: calc(100% - 4px);
            z-index: 0;
            box-shadow: 0 0 0 1px var(--el-color-primary) inset !important;
        }
    }

    &:has(.is-disabled) {
        &::after {
            box-shadow: 0 0 0 1px transparent inset !important;
        }
    }



}

.input {

    line-height: 1.5;
    margin: 1px;
    width: 100%;
    outline: none;
    /*去掉聚焦时的默认外边框*/
    // overflow: hidden;
    // white-space: nowrap;
    white-space: pre-wrap;
    /*保留换行符并自动换行*/
    display: block;

    &.is-disabled {
        background-color: #F9FAFC;
    }
}

.input:empty::before {
    content: attr(placeholder);
    color: #ADADAD;
    font-size: 14px;
}
</style>