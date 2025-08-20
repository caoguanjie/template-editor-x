<template>
  <ReadyComponent></ReadyComponent>
  <FitsTiptapDialog></FitsTiptapDialog>
</template>

<script setup lang="ts">

import { useStopDebug } from '@/utils/hooks/stopDebug';
import ReadyComponent from '@/views/ready/index.vue'
import FitsTiptapDialog from '@/components/Tiptap/index.vue';



if (import.meta.env.MODE === 'prod') {
  useStopDebug();// 启用阻止调试
}

</script>

<style lang="scss" scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 1s ease;
}

.slide-fade-enter {
  transform: translateY(-30px);
  opacity: 0;
}

.slide-fade-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.slide-fade-leave {
  transform: translateY(0);
  opacity: 1;
}

.slide-fade-leave-to {
  transform: translateY(-30px);
  opacity: 0;
}
</style>
