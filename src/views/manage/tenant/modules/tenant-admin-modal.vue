<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { $t } from '@/locales';
import { fetchUpdateTenantAdmin } from '@/service/api';

defineOptions({
  name: 'TenantAdminModal'
});

interface Props {
  tenant: Api.SystemManage.Tenant | null;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'finish'): void;
}

const emit = defineEmits<Emits>();

function finish() {
  emit('finish');
}

const visible = defineModel<boolean>('visible', {
  default: false
});

const model: Api.SystemManage.TenantAdminEditModel = reactive(createDefaultModel());

function createDefaultModel(): Api.SystemManage.TenantAdminEditModel {
  return {
    name: '',
    adminUser: undefined,
    adminName: '',
    adminPwd: ''
  };
}

function closeModal() {
  visible.value = false;
}

const title = computed(() => props.tenant?.name + $t('page.manage.tenant.editAdmin'));

const newAdmin = computed(() => (props.tenant?.adminUser || 0) === 0);

async function handleSubmit() {
  console.log('handleSubmit', props);
  // request
  const { error } = await fetchUpdateTenantAdmin(props.tenant?.id || 0, {
    ...model
  });
  if (!error) {
    window.$message?.success?.($t('common.modifySuccess'));
  }
  finish();
  closeModal();
}

function init() {
  console.log('init', props.tenant);
  Object.assign(model, createDefaultModel());
  model.name = props.tenant?.name || '';
  model.adminName = props.tenant?.adminName || '';
  model.adminUser = props.tenant?.adminUser;
}

watch(visible, val => {
  if (val) {
    init();
  }
});
</script>

<template>
  <NModal v-model:show="visible" :title="title" preset="card" class="w-600px">
    <NForm ref="formRef" :model="model">
      <NFormItem :label="$t('page.manage.tenant.editAdminName')" path="adminName">
        <NInput
          v-model:value="model.adminName"
          :disabled="!newAdmin"
          :placeholder="$t('page.manage.tenant.editAdminForm.adminName')"
        />
      </NFormItem>
      <NFormItem :label="$t('page.manage.tenant.editAdminPwd')" path="adminPwd">
        <NInput v-model:value="model.adminPwd" :placeholder="$t('page.manage.tenant.editAdminForm.adminPwd')" />
      </NFormItem>
    </NForm>
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
