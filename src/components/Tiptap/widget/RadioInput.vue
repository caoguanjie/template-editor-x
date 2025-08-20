<template>

  <span class="widget-container" ref="container" :data-checked="node.attrs.checked ? '1' : null">
    <span contenteditable="false" class="prefix-start" @click.stop="handleChecked">​</span>
    <NodeViewContent class="custom-field-content" as="span" :style="$attrs.style" data-placeholder></NodeViewContent>
    <span contenteditable="false" class="prefix-end">​</span>
  </span>
</template>

<script setup lang='ts'>

import { NodeViewRendererProps, NodeViewContent } from '@tiptap/vue-3';

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
const { node } = toRefs(props.nodeViewProps);
function handleChecked() {
  const { editor, node } = props.nodeViewProps;
  console.log(props.nodeViewProps.node.textContent)
  editor.commands.updateFieldAttrs(node.attrs.id, node.attrs.group, {
    checked: !node.attrs.checked
  })
}
const updateDebounce = useDebounceFn((updateParams: { label?: string; checked?: boolean }) => {
  const { editor, node } = props.nodeViewProps;
  editor.commands.updateFieldAttrs(node.attrs.id, node.attrs.group, updateParams)
}, 500)
const stopWatch = watch(() => props.nodeViewProps.node.textContent, (newText) => {
  console.log(newText)
  updateDebounce({
    label: newText
  })
})
onUnmounted(() => {
  stopWatch()
})
</script>
