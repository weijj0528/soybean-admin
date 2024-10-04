<script setup lang="ts">
import { $t } from '@/locales';
// import { enableStatusOptions } from '@/constants/business';
// import { translateOptions } from '@/utils/common';

defineOptions({
  name: 'TenantSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const model = defineModel<Api.SystemManage.TenantSearchParams>('model', { required: true });

function reset() {
  emit('reset');
}

function search() {
  emit('search');
}
</script>

<template>
  <NCard :bordered="false" size="small" class="card-wrapper">
    <NCollapse :default-expanded-names="['tenant-search']">
      <NCollapseItem :title="$t('common.search')" name="tenant-search">
        <NForm :model="model" label-placement="left" :label-width="80">
          <NGrid responsive="screen" item-responsive>
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.manage.tenant.name')" path="name" class="pr-24px">
              <NInput v-model:value="model.name" :placeholder="$t('page.manage.tenant.form.name')" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.manage.tenant.code')" path="code" class="pr-24px">
              <NInput v-model:value="model.code" :placeholder="$t('page.manage.tenant.form.code')" />
            </NFormItemGi>
            <!--
 <NFormItemGi span="24 s:12 m:6" :label="$t('page.manage.tenant.status')" path="status" class="pr-24px">
              <NSelect
                v-model:value="model.status"
                :placeholder="$t('page.manage.tenant.form.status')"
                :options="translateOptions(enableStatusOptions)"
                clearable
              />
            </NFormItemGi>
-->
            <NFormItemGi span="24 s:12 m:12">
              <NSpace class="w-full" justify="end">
                <NButton @click="reset">
                  <template #icon>
                    <icon-ic-round-refresh class="text-icon" />
                  </template>
                  {{ $t('common.reset') }}
                </NButton>
                <NButton type="primary" ghost @click="search">
                  <template #icon>
                    <icon-ic-round-search class="text-icon" />
                  </template>
                  {{ $t('common.search') }}
                </NButton>
              </NSpace>
            </NFormItemGi>
          </NGrid>
        </NForm>
      </NCollapseItem>
    </NCollapse>
  </NCard>
</template>

<style scoped></style>
