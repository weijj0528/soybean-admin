<script setup lang="ts">
// import { computed } from 'vue';
// import { useRoute } from 'vue-router';
import { useRouteStore } from '@/store/modules/route';
// import { useRouterPush } from '@/hooks/common/router';

defineOptions({
  name: 'HorizontalModule'
});

// const route = useRoute();
const routeStore = useRouteStore();
// const { routerPushByKeyWithMetaQuery } = useRouterPush();

// const selectedKey = computed(() => {
//   /* const { hideInMenu, activeMenu } = route.meta;
//   const name = route.name as string;

//   const routeName = (hideInMenu ? activeMenu : name) || name; */

//   return '';
// });
</script>

<template>
  <!-- <Teleport :to="`#${GLOBAL_HEADER_MODULE_ID}`"> -->
  <NMenu
    mode="horizontal"
    :value="routeStore.currentModule?.name"
    :options="routeStore.modules"
    :indent="18"
    responsive
    @update:value="routeStore.setCurrentModuleName"
  />
  <!-- </Teleport> -->
</template>

<style scoped></style>
