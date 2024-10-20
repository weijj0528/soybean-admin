<script setup lang="ts">
// import { useBoolean } from '@sa/hooks';
import { computed, reactive, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';
import { fetchAddPlatform, fetchUpdatePlatform } from '@/service/api';
// import MenuAuthModal from './menu-auth-modal.vue';
// import ButtonAuthModal from './button-auth-modal.vue';

defineOptions({
  name: 'PlatformOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.SystemManage.Platform | null;
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
    add: $t('page.manage.platform.addPlatform'),
    edit: $t('page.manage.platform.editPlatform')
  };
  return titles[props.operateType];
});

type Model = Pick<Api.SystemManage.Platform, 'name' | 'code' | 'remark'>;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    name: '',
    code: '',
    remark: ''
  };
}

type RuleKey = Exclude<keyof Model, 'roleDesc'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  name: defaultRequiredRule,
  code: defaultOptionalRule,
  remark: defaultRequiredRule
};

const roleId = computed(() => props.rowData?.id || -1);

const isEdit = computed(() => props.operateType === 'edit');
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
    await fetchAddPlatform(model);
  } else {
    await fetchUpdatePlatform(roleId.value, model);
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
        <NFormItem :label="$t('page.manage.platform.name')" path="name">
          <NInput v-model:value="model.name" :placeholder="$t('page.manage.platform.form.name')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.platform.code')" path="code">
          <NInput v-model:value="model.code" :placeholder="$t('page.manage.platform.form.code')" :disabled="isEdit" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.platform.remark')" path="remark">
          <NInput v-model:value="model.remark" :placeholder="$t('page.manage.platform.form.remark')" />
        </NFormItem>
      </NForm>
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
