<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
// import { SimpleScrollbar } from '@sa/materials';
// import SvgIcon from '@/components/custom/svg-icon.vue';
import { useAppStore } from '@/store/modules/app';
import { useThemeStore } from '@/store/modules/theme';
import { useRouteStore } from '@/store/modules/route';
// import { useRouterPush } from '@/hooks/common/router';
// import { GLOBAL_HEADER_MODULE_ID } from '@/constants/app';
// import { $t } from '@/locales';

defineOptions({
  name: 'VerticalModule'
});

const route = useRoute();
const appStore = useAppStore();
const themeStore = useThemeStore();
const routeStore = useRouteStore();
// const { routerPushByKeyWithMetaQuery } = useRouterPush();

const inverted = computed(() => !themeStore.darkMode && themeStore.sider.inverted);

const selectedKey = computed(() => {
  /* const { hideInMenu, activeMenu } = route.meta;
  const name = route.name as string;

  const routeName = (hideInMenu ? activeMenu : name) || name; */

  return '';
});

const expandedKeys = ref<string[]>([]);

const currentOption = ref<any>();

function updateExpandedKeys() {
  if (appStore.siderCollapse || !selectedKey.value) {
    expandedKeys.value = [];
    return;
  }
  expandedKeys.value = routeStore.getSelectedMenuKeyPath(selectedKey.value);
}

function handleSelect(key: string | number, option: any) {
  currentOption.value = option;
  routeStore.setCurrentModuleName(String(key));
}

function init() {
  currentOption.value = routeStore.modules[0];
}

init();

watch(
  () => route.name,
  () => {
    updateExpandedKeys();
  },
  { immediate: true }
);
</script>

<template>
  <!-- <Teleport :to="`#${GLOBAL_HEADER_MODULE_ID}`"> -->
  <!-- <SimpleScrollbar> -->
  <NDropdown placement="bottom-start" trigger="click" size="huge" :options="routeStore.modules" @select="handleSelect">
    <NMenu
      mode="vertical"
      :value="routeStore.currentModule?.name"
      :collapsed="appStore.siderCollapse"
      :collapsed-width="themeStore.sider.collapsedWidth"
      :collapsed-icon-size="22"
      :options="[currentOption]"
      :inverted="inverted"
      :indent="18"
    />
  </NDropdown>
  <!-- </SimpleScrollbar> -->
  <!-- </Teleport> -->
</template>

<style scoped></style>
