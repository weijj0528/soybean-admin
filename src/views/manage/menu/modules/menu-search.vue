<script setup lang="ts">
import { ref } from 'vue';
import { $t } from '@/locales';
import { fetchGetPlatformList } from '@/service/api';

defineOptions({
  name: 'MenuSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const platform = ref<CommonType.Option[]>([]);

const model = defineModel<Api.SystemManage.MenuSearchParams>('model', { required: true });

function reset() {
  model.value.platform = 'SAAS';
  emit('reset');
  search();
}

function search() {
  emit('search');
}

function initPlatformSelect() {
  fetchGetPlatformList().then(res => {
    const { data } = res;
    data?.list?.forEach(item => {
      platform.value.push({
        value: item.code,
        label: item.name
      });
    });
  });
}

initPlatformSelect();
</script>

<template>
  <NCard :bordered="false" size="small" class="card-wrapper">
    <NCollapse :default-expanded-names="['menu-search']">
      <NCollapseItem :title="$t('common.search')" name="menu-search">
        <NForm :model="model" label-placement="left" :label-width="80">
          <NGrid responsive="screen" item-responsive>
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.manage.menu.platform')" path="platform" class="pr-24px">
              <NSelect
                v-model:value="model.platform"
                :placeholder="$t('page.manage.menu.form.platform')"
                :options="platform"
                @update:value="search"
              />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:18">
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
