import { transformRecordToOption } from '@/utils/common';

export const enableStatusRecord: Record<Api.Common.EnableStatus, App.I18n.I18nKey> = {
  '1': 'page.manage.common.status.enable',
  '2': 'page.manage.common.status.disable'
};

export const enableStatusOptions = transformRecordToOption(enableStatusRecord);

export const userGenderRecord: Record<Api.SystemManage.UserGender, App.I18n.I18nKey> = {
  '1': 'page.manage.user.gender.male',
  '0': 'page.manage.user.gender.female'
};

export const userGenderOptions = transformRecordToOption(userGenderRecord);

export const freezeStatusRecord: Record<Api.SystemManage.FreezeStatus, App.I18n.I18nKey> = {
  '0': 'page.manage.common.status.enable',
  '1': 'page.manage.common.status.disable'
};

export const menuTypeRecord: Record<Api.SystemManage.MenuType, App.I18n.I18nKey> = {
  MODULE: 'page.manage.menu.type.module',
  GROUP: 'page.manage.menu.type.group',
  PAGE: 'page.manage.menu.type.page',
  FUNC: 'page.manage.menu.type.func'
};

export const menuTypeOptions = transformRecordToOption(menuTypeRecord);

export const menuIconTypeRecord: Record<Api.SystemManage.IconType, App.I18n.I18nKey> = {
  '1': 'page.manage.menu.iconType.local',
  '2': 'page.manage.menu.iconType.iconify'
};

export const menuIconTypeOptions = transformRecordToOption(menuIconTypeRecord);
