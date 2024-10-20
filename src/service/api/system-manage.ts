import { request } from '../request';

/** get sys api list */
export function fetchGetSysApiList(params?: Api.SystemManage.SysApiSearchParams) {
  return request<Api.SystemManage.SysApiList>({
    url: '/admin/sys/api',
    method: 'get',
    params
  });
}
/** add new sys api */
export function fetchAddSysApi(data?: Pick<Api.SystemManage.SysApi, 'name' | 'module' | 'path' | 'remark'>) {
  return request<Api.SystemManage.SysApi>({
    url: '/admin/sys/api',
    method: 'post',
    data
  });
}
/** update sys api */
export function fetchUpdateSysApi(
  id?: number,
  data?: Pick<Api.SystemManage.SysApi, 'name' | 'module' | 'path' | 'remark'>
) {
  return request<Api.SystemManage.SysApi>({
    url: `/admin/sys/api/${id}`,
    method: 'post',
    data
  });
}

/** get platform list */
export function fetchGetPlatformList(params?: Api.SystemManage.PlatformSearchParams) {
  return request<Api.SystemManage.PlatformList>({
    url: '/admin/sys/platform',
    method: 'get',
    params
  });
}
/** add new platform */
export function fetchAddPlatform(data?: Pick<Api.SystemManage.Platform, 'name' | 'code' | 'remark'>) {
  return request<Api.SystemManage.Platform>({
    url: '/admin/sys/platform',
    method: 'post',
    data
  });
}
/** update platform */
export function fetchUpdatePlatform(id?: number, data?: Pick<Api.SystemManage.Platform, 'name' | 'code' | 'remark'>) {
  return request<Api.SystemManage.Platform>({
    url: `/admin/sys/platform/${id}`,
    method: 'post',
    data
  });
}

/** get tenant list */
export function fetchGetTenantList(params?: Api.SystemManage.TenantSearchParams) {
  return request<Api.SystemManage.TenantList>({
    url: '/admin/sys/tenant',
    method: 'get',
    params
  });
}
/** add new tenant */
export function fetchAddTenant(data?: Pick<Api.SystemManage.Tenant, 'name' | 'code' | 'remark'>) {
  return request<Api.SystemManage.Tenant>({
    url: '/admin/sys/tenant',
    method: 'post',
    data
  });
}
/** update tenant */
export function fetchUpdateTenant(id?: number, data?: Pick<Api.SystemManage.Tenant, 'name' | 'code' | 'remark'>) {
  return request<Api.SystemManage.Tenant>({
    url: `/admin/sys/tenant/${id}`,
    method: 'post',
    data
  });
}

/** get menu list */
export function fetchGetMenuList(params?: Api.SystemManage.MenuSearchParams) {
  return request<Api.SystemManage.MenuList>({
    url: '/admin/sys/menu/all',
    method: 'get',
    params
  });
}

/** add menu */
export function fetchAddMenu(data: Api.SystemManage.MenuEditModel) {
  return request<Api.SystemManage.Menu>({
    url: '/admin/sys/menu',
    method: 'post',
    data
  });
}

/** update menu */
export function fetchUpdateMenu(id: number, data: Api.SystemManage.MenuEditModel) {
  return request<Api.SystemManage.Menu>({
    url: `/admin/sys/menu/${id}`,
    method: 'post',
    data
  });
}

/** get all pages */
export function fetchGetAllPages() {
  return request<string[]>({
    url: '/systemManage/getAllPages',
    method: 'get'
  });
}

/** get menu tree */
export function fetchGetMenuTree(params?: Api.SystemManage.MenuSearchParams) {
  return request<Api.SystemManage.MenuList>({
    url: '/admin/sys/menu/tree',
    method: 'get',
    params
  });
}

/** get role menu */
export function fetchGetRoleMenus(id?: number) {
  return request<Api.SystemManage.Menu[]>({
    url: '/admin/sys/role/menus',
    method: 'get',
    params: {
      id
    }
  });
}

/** get role list */
export function fetchGetRoleList(params?: Api.SystemManage.RoleSearchParams) {
  return request<Api.SystemManage.RoleList>({
    url: '/admin/sys/role',
    method: 'get',
    params
  });
}

/** add role */
export function fetchAddRole(data: Api.SystemManage.RoleEditModel) {
  return request<Api.SystemManage.Role>({
    url: '/admin/sys/role',
    method: 'post',
    data
  });
}
/** update role */
export function fetchUpdateRole(id: number, data: Api.SystemManage.RoleEditModel) {
  return request<Api.SystemManage.Role>({
    url: `/admin/sys/role/${id}`,
    method: 'post',
    data
  });
}

/**
 * get all roles
 *
 * these roles are all enabled
 */
export function fetchGetAllRoles() {
  return request<Api.SystemManage.AllRole[]>({
    url: '/systemManage/getAllRoles',
    method: 'get'
  });
}

/** get user list */
export function fetchGetUserList(params?: Api.SystemManage.UserSearchParams) {
  return request<Api.SystemManage.UserList>({
    url: '/admin/user/info',
    method: 'get',
    params
  });
}
