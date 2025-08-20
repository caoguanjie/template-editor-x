<template>
    <div :ref="dropRef" :class="{ 'is-over': dropCollect.isOver }" class="drop-control">
        <slot />
    </div>
</template>

<script lang='ts' setup>
import { Editor } from '@tiptap/vue-3';
import { useDrop } from 'vue3-dnd';
import { TemplateControl } from '../type';

const props = defineProps({
    editor: {
        type: Editor,
        default: null
    }
});

// 拖放逻辑
const [dropCollect, dropRef] = useDrop({
    accept: 'CONTROL',
    drop: (item: TemplateControl, monitor) => {
        if (!props.editor) return;

        // 获取光标位置
        const dropPosition = getDropPosition(monitor, props.editor.view);
        if (dropPosition === null) return;
        console.log('dropPosition', dropPosition, item);
        // 先聚焦当前的位置
        props.editor?.commands.focus(dropPosition);
        // 插入新控件
        props.editor?.commands.insertField(item);
        nextTick(() => {
            // 聚焦到新插入的控件里面
            props.editor?.commands.focus(dropPosition + 1);
        });
    },

    collect: monitor => ({
        isOver: monitor.isOver()
    })
});


// 计算拖放位置
const getDropPosition = (monitor: any, view: any) => {
    const dropOffset = monitor.getClientOffset();
    if (!dropOffset) return null;

    // 转换为编辑器内坐标
    const coords = { left: dropOffset.x, top: dropOffset.y };
    const pos = view.posAtCoords(coords);

    return pos ? pos.pos : null;
};

</script>
