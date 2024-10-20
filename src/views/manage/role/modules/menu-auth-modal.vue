<script setup lang="ts">
import { computed, shallowRef, watch } from 'vue';
import { $t } from '@/locales';
import { fetchGetMenuTree, fetchGetRoleMenus, fetchUpdateRole } from '@/service/api';

defineOptions({
  name: 'MenuAuthModal'
});

interface Props {
  /** the roleId */
  roleId: number;
  /** the platform */
  platform: string;
}

const props = defineProps<Props>();

const visible = defineModel<boolean>('visible', {
  default: false
});

function closeModal() {
  visible.value = false;
}

const title = computed(() => $t('common.edit') + $t('page.manage.role.menuAuth'));

const home = shallowRef('');

async function getHome() {
  console.log(props.roleId);

  home.value = 'home';
}

// async function updateHome(val: string) {
//   // request

//   home.value = val;
// }

// const pages = shallowRef<string[]>([]);

// async function getPages() {
//   const { error, data } = await fetchGetAllPages();

//   if (!error) {
//     pages.value = data;
//   }
// }

// const pageSelectOptions = computed(() => {
//   const opts: CommonType.Option[] = pages.value.map(page => ({
//     label: page,
//     value: page
//   }));

//   return opts;
// });

const tree = shallowRef<Api.SystemManage.MenuTree[]>([]);

async function getTree() {
  const { error, data } = await fetchGetMenuTree({ platform: props.platform });

  if (!error) {
    // debugger
    const menus = data.list.map(item => menuToTree(item));
    tree.value = menus;
  }
}

function menuToTree(menu: Api.SystemManage.Menu) {
  const mt: Api.SystemManage.MenuTree = {
    id: menu.id,
    name: menu.name,
    parent: menu.parent,
    children:
      menu.children?.map(child => {
        return menuToTree(child);
      }) || []
  };
  return mt;
}

const checks = shallowRef<number[]>([]);

async function getChecks() {
  console.log(props.roleId);
  // request
  const { error, data } = await fetchGetRoleMenus(props.roleId);
  if (!error) {
    checks.value = data.map(item => item.id);
  }
}

async function handleSubmit() {
  console.log(checks.value, props.roleId);
  // request
  const { error } = await fetchUpdateRole(props.roleId, {
    menus: checks.value
  });
  if (!error) {
    window.$message?.success?.($t('common.modifySuccess'));
  }
  closeModal();
}

function init() {
  getHome();
  // getPages();
  getTree();
  getChecks();
}

watch(visible, val => {
  if (val) {
    init();
  }
});
</script>

<template>
  <NModal v-model:show="visible" :title="title" preset="card" class="w-600px">
    <!--
 <div class="flex-y-center gap-16px pb-12px">
      <div>{{ $t('page.manage.menu.home') }}</div>
      <NSelect :value="home" :options="pageSelectOptions" size="small" class="w-160px" @update:value="updateHome" />
    </div> 
-->
    <NTree
      v-model:checked-keys="checks"
      :data="tree"
      key-field="id"
      label-field="name"
      show-line
      cascade
      checkable
      expand-on-click
      virtual-scroll
      block-line
      default-expand-all
      class="h-400px"
    />
    <template #footer>
      <NSpace justify="end">
        <NButton size="small" class="mt-16px" @click="closeModal">
          {{ $t('common.cancel') }}
        </NButton>
        <NButton type="primary" size="small" class="mt-16px" @click="handleSubmit">
          {{ $t('common.confirm') }}
        </NButton>
      </NSpace>
    </template>
  </NModal>
</template>

<style scoped></style>
