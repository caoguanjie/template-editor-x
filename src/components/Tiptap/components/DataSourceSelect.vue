<template>
    <el-select v-model="modelValue" ref="selectRef" popper-class="data-source-select" :placeholder="''"
        no-data-text="暂无数据" :placement="'bottom'" @visible-change="VisibleChange" :offset="5" :hide-after="0"
        :show-arrow="false" clearable tabindex="0">
        <template #header>
            <el-input type="text" v-model="searchKey" :prefix-icon="Search" ref="inputRef" @input="searchDebounce"
                @keydown="handleKeyDown" :clearable="true"></el-input>
        </template>
        <el-option v-for="item in selectOption" :key="item.id" :label="item.name" :value="item[CODE]" />
    </el-select>
</template>

<script lang='ts' setup>
import { Search } from '@element-plus/icons-vue'
import Fuse from 'fuse.js'
import dataSourceJson from '../utils/dataSource.json'

// 全局定义获取数据源的那个属性，可以是id，也可以是code
const CODE = 'id'

// 数据来源的下拉选择框架
const modelValue = defineModel<string>()
const selectOption = ref<any[]>([])
const selectRef = ref<any>()
// 搜索关键词
const searchKey = ref<string>('')

const inputRef = ref<any>()
// 防抖搜索器
const searchDebounce = useDebounceFn(inputChange, 300)
function inputChange() {
    const fuse = new Fuse(dataSourceJson.result, {
        keys: ["name"]
    })
    if (searchKey.value) {
        selectOption.value = fuse.search(searchKey.value).map((item: any) => {
            return item.item
        })
    } else {
        selectOption.value = dataSourceJson.result
    }
    // 重置高亮索引
    highlightIndex.value = 0;
}
function VisibleChange(visible: boolean) {
    selectVisible.value = visible;
    if (visible) {
        nextTick(() => {
            inputRef.value.focus()
            // 初始化选项,把el-select-dropdown__item 转换成数组
            optionItems.value = Array.from(
                document.querySelectorAll('.data-source-select .el-select-dropdown__item')
            );
            // 获取高亮索引，如果是点击事件选中的，不是键盘选中的，则重置高亮索引
            highlightIndex.value = optionItems.value.findIndex((item: any) => {
                return item.classList.contains('is-selected');
            })
        })
    }

}

onMounted(() => {
    selectOption.value = dataSourceJson.result
})


/**
 * 下面是核心的键盘监听逻辑
 * 用 navigateOptions 方法处理键盘事件
 * 上下键更新高亮索引（highlightIndex）
 * 回车键选中当前高亮项
 */
const highlightIndex = ref(0); // 高亮索引
const optionItems = ref<HTMLElement[]>([]); // 下拉选项
const selectVisible = ref(false); // 下拉框是否可见
function navigateOptions(e: KeyboardEvent) {
    if (!selectVisible.value || !optionItems.value.length) return;
    switch (e.key) {
        case 'ArrowUp':
            e.preventDefault();
            highlightIndex.value = highlightIndex.value > 0
                ? highlightIndex.value - 1
                : optionItems.value.length - 1;
            break;
        case 'ArrowDown':
            e.preventDefault();
            highlightIndex.value = highlightIndex.value < optionItems.value.length - 1
                ? highlightIndex.value + 1
                : 0;
            break;
        case 'Enter':
            e.preventDefault();
            if (highlightIndex.value >= 0) {
                selectOptionItem();
            }
            break;

    }
    nextTick(() => {
        scrollToHighlighted();
    })

}
// 滚动到高亮项
function scrollToHighlighted() {
    optionItems.value[highlightIndex.value]?.scrollIntoView({
        //这个选项决定了元素滚动到视窗中的位置。'nearest'值表示如果元素已经在视窗中部分可见，则不会进行滚动；如果元素完全不可见，则会滚动到视窗的最近位置。
        block: 'nearest',
        //这个选项决定了滚动的动画效果。'smooth'值表示滚动会有一个平滑的动画效果，而不是立即跳到目标位置。
        behavior: 'smooth'
    })
}
// 处理键盘事件
const handleKeyDown = (e: KeyboardEvent | Event) => {
    navigateOptions(e as KeyboardEvent);
};
// 选中选项
function selectOptionItem() {
    const _item = selectOption.value[highlightIndex.value];
    modelValue.value = _item[CODE];
    selectRef.value.blur();
};
const scope = effectScope();
scope.run(() => {
    // 监听下拉选项变化，更新optionItems的dom对象
    watch(() => selectOption.value, (val) => {
        nextTick(() => {
            optionItems.value = Array.from(
                document.querySelectorAll('.data-source-select .el-select-dropdown__item')
            );
        });
    })
    // 监听高亮索引的变化，方便添加选中样式
    watch(() => highlightIndex.value, (newVal) => {
        if (newVal >= 0) {
            nextTick(() => {
                optionItems.value.forEach((item: any) => {
                    item.classList.remove('is-hovering');
                });
                // console.error(optionItems.value[newVal], 'optionItems.value[newVal]');
                optionItems.value[newVal].classList.add('is-hovering');
            });
        }
    })

})
onUnmounted(() => {
    scope.stop()
})
</script>
<style lang='scss'>
.data-source-select {
    width: 180px;
    overflow: hidden;

    .el-select-dropdown__header {
        padding: 0;
        // height: 32px;
    }

    .el-input {
        padding: 0 10px;
        --el-input-border: none;
        --el-input-border-color: taransparent;
        border-radius: 0;
        padding: 0;

        &.is-focus {
            box-shadow: none;
        }

        .el-input__wrapper.is-focus,
        .el-input__wrapper:hover {
            box-shadow: none;
        }

    }
}
</style>