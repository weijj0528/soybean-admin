<script setup lang="ts">
// import { useBoolean } from '@sa/hooks';
import { computed, reactive, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';
import { fetchAddTenant, fetchUpdateTenant } from '@/service/api';
// import MenuAuthModal from './menu-auth-modal.vue';
// import ButtonAuthModal from './button-auth-modal.vue';

defineOptions({
  name: 'RoleOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.SystemManage.Tenant | null;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const { formRef, validate, restoreValidation } = useNaiveForm();
const { defaultRequiredRule, defaultOptionalRule } = useFormRules();
// const { bool: menuAuthVisible, setTrue: openMenuAuthModal } = useBoolean();
// const { bool: buttonAuthVisible, setTrue: openButtonAuthModal } = useBoolean();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: $t('page.manage.tenant.addTenant'),
    edit: $t('page.manage.tenant.editTenant')
  };
  return titles[props.operateType];
});

type Model = Pick<Api.SystemManage.Tenant, 'name' | 'code' | 'platform' | 'remark'>;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    name: '',
    code: '',
    platform: '',
    remark: ''
  };
}

type RuleKey = Exclude<keyof Model, 'roleDesc'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  name: defaultRequiredRule,
  code: defaultOptionalRule,
  platform: defaultRequiredRule,
  remark: defaultRequiredRule
};

const roleId = computed(() => props.rowData?.id || -1);

const isEdit = computed(() => props.operateType === 'edit');

const platformList = [
  {
    name: 'SAAS管理',
    code: 'SAAS'
  },
  {
    name: '商城系统',
    code: 'MALL'
  },
  {
    name: '门店系统',
    code: 'SHOP'
  },
  {
    name: '支付系统',
    code: 'PAY'
  },
  {
    name: '安全系统',
    code: 'SECURITY'
  }
];
function handleInitModel() {
  Object.assign(model, createDefaultModel());
  Object.assign(model, { id: null });

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model, props.rowData);
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();
  // request
  const isAdd = props.operateType === 'add';
  console.log('handleSubmit: ', props.operateType, isAdd, model);
  if (isAdd) {
    await fetchAddTenant(model);
  } else {
    await fetchUpdateTenant(roleId.value, model);
  }
  // window.$message?.success($t('common.updateSuccess'));
  closeDrawer();
  emit('submitted');
}

watch(visible, () => {
  if (visible.value) {
    handleInitModel();
    restoreValidation();
  }
});
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="360">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem :label="$t('page.manage.tenant.name')" path="name">
          <NInput v-model:value="model.name" :placeholder="$t('page.manage.tenant.form.name')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.tenant.code')" path="code">
          <NInput v-model:value="model.code" :placeholder="$t('page.manage.tenant.form.code')" :disabled="isEdit" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.tenant.platform')" path="platform">
          <NSelect
            v-model:value="model.platform"
            :placeholder="$t('page.manage.tenant.form.platform')"
            label-field="name"
            value-field="code"
            :options="platformList"
            :disabled="isEdit"
          ></NSelect>
        </NFormItem>
        <!--
 <NFormItem :label="$t('page.manage.tenant.status')" path="status">
          <NRadioGroup v-model:value="model.status">
            <NRadio v-for="item in enableStatusOptions" :key="item.value" :value="item.value" :label="$t(item.label)" />
          </NRadioGroup>
        </NFormItem>
-->
        <NFormItem :label="$t('page.manage.tenant.desc')" path="remark">
          <NInput v-model:value="model.remark" :placeholder="$t('page.manage.tenant.form.desc')" />
        </NFormItem>
      </NForm>
      <!--
 <NSpace v-if="isEdit">
        <NButton @click="openMenuAuthModal">{{ $t('page.manage.tenant.menuAuth') }}</NButton>
        <MenuAuthModal v-model:visible="menuAuthVisible" :role-id="roleId" />
        <NButton @click="openButtonAuthModal">{{ $t('page.manage.tenant.buttonAuth') }}</NButton>
        <ButtonAuthModal v-model:visible="buttonAuthVisible" :role-id="roleId" />
      </NSpace>
-->
      <template #footer>
        <NSpace :size="16">
          <NButton @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
          <NButton type="primary" @click="handleSubmit">{{ $t('common.confirm') }}</NButton>
        </NSpace>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped></style>
