<script setup lang="tsx">
import { NButton } from 'naive-ui';
import { fetchGetPlatformList } from '@/service/api';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
// import { enableStatusRecord } from '@/constants/business';
// import TenantOperateDrawer from './modules/tenant-operate-drawer.vue';
// import TenantSearch from './modules/tenant-search.vue';

const appStore = useAppStore();

const {
  columns,
  columnChecks,
  data,
  loading,
  getData,
  getDataByPage,
  mobilePagination
  // searchParams,
  // resetSearchParams
} = useTable({
  apiFn: fetchGetPlatformList,
  apiParams: {
    page: 1,
    size: 10,
    // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
    // the value can not be undefined, otherwise the property in Form will not be reactive
    name: null,
    code: null
  },
  columns: () => [
    {
      type: 'selection',
      align: 'center',
      width: 48
    },
    {
      key: 'index',
      title: $t('common.index'),
      width: 64,
      align: 'center'
    },
    {
      key: 'code',
      title: $t('page.manage.platform.code'),
      align: 'center',
      minWidth: 120
    },
    {
      key: 'name',
      title: $t('page.manage.platform.name'),
      align: 'center',
      minWidth: 120
    },
    {
      key: 'remark',
      title: $t('page.manage.platform.remark'),
      minWidth: 120
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 160,
      render: row => (
        <div class="flex-center gap-8px">
          <NButton type="primary" ghost size="small" onClick={() => edit(row.id)}>
            {$t('common.edit')}
          </NButton>
          {/* <NPopconfirm onPositiveClick={() => handleDelete(row.id)}>
            {{
              default: () => $t('common.confirmDelete'),
              trigger: () => (
                <NButton type="error" ghost size="small">
                  {$t('common.delete')}
                </NButton>
              )
            }}
          </NPopconfirm> */}
        </div>
      )
    }
  ]
});

const {
  drawerVisible,
  operateType,
  editingData,
  handleAdd,
  handleEdit,
  checkedRowKeys,
  onBatchDeleted
  // onDeleted
  // closeDrawer
} = useTableOperate(data, getData);

async function handleBatchDelete() {
  // request
  console.log(checkedRowKeys.value);

  onBatchDeleted();
}

// function handleDelete(id: number) {
//   // request
//   console.log(id);

//   onDeleted();
// }

function edit(id: number) {
  handleEdit(id);
}

// function editAdmin(id: number) {
//   console.log('editAdmin', id);
// }
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <!-- <TenantSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" /> -->
    <NCard
      :title="$t('page.manage.platform.title')"
      :bordered="false"
      size="small"
      class="sm:flex-1-hidden card-wrapper"
    >
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :display-delete="false"
          :disabled-delete="true"
          :loading="loading"
          @add="handleAdd"
          @delete="handleBatchDelete"
          @refresh="getData"
        />
      </template>
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        :columns="columns"
        :data="data"
        size="small"
        :flex-height="!appStore.isMobile"
        :scroll-x="702"
        :loading="loading"
        remote
        :row-key="row => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
      <TenantOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
