<script setup lang="ts">
import { computed } from 'vue';
import type { Component } from 'vue';
import { useAppStore } from '@/store/modules/app';
import { useThemeStore } from '@/store/modules/theme';
import VerticalModule from './modules/vertical-module.vue';
// import VerticalMixModule from './modules/vertical-mix-module.vue';
import HorizontalModule from './modules/horizontal-module.vue';
// import HorizontalMixModule from './modules/horizontal-mix-module.vue';
// import ReversedHorizontalMixModule from './modules/reversed-horizontal-mix-module.vue';

defineOptions({
  name: 'GlobalModule'
});

const appStore = useAppStore();
const themeStore = useThemeStore();

const activeMenu = computed(() => {
  const menuMap: Record<UnionKey.ThemeLayoutMode, Component> = {
    vertical: HorizontalModule,
    'vertical-mix': HorizontalModule,
    horizontal: VerticalModule,
    'horizontal-mix': HorizontalModule
  };

  return menuMap[themeStore.layout.mode];
});

const reRenderVertical = computed(() => themeStore.layout.mode === 'vertical' && appStore.isMobile);
</script>

<template>
  <component :is="activeMenu" :key="reRenderVertical" />
</template>

<style scoped></style>
