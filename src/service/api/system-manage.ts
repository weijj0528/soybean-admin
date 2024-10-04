import { request } from '../request';

/** get role list */
export function fetchGetRoleList(params?: Api.SystemManage.RoleSearchParams) {
  return request<Api.SystemManage.RoleList>({
    url: '/admin/sysRole',
    method: 'get',
    params
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

/** get tenant list */
export function fetchGetTenantList(params?: Api.SystemManage.TenantSearchParams) {
  return request<Api.SystemManage.TenantList>({
    url: '/admin/tenant',
    method: 'get',
    params
  });
}
/** add new tenant */
export function fetchAddTenant(data?: Pick<Api.SystemManage.Tenant, 'name' | 'code' | 'remark'>) {
  return request<Api.SystemManage.Tenant>({
    url: '/admin/tenant',
    method: 'post',
    data
  });
}
/** add new tenant */
export function fetchUpdateTenant(id?: number, data?: Pick<Api.SystemManage.Tenant, 'name' | 'code' | 'remark'>) {
  return request<Api.SystemManage.Tenant>({
    url: `/admin/tenant/${id}`,
    method: 'post',
    data
  });
}

/** get user list */
export function fetchGetUserList(params?: Api.SystemManage.UserSearchParams) {
  return request<Api.SystemManage.UserList>({
    url: '/admin/user',
    method: 'get',
    params
  });
}

/** get menu list */
export function fetchGetMenuList() {
  return request<Api.SystemManage.MenuList>({
    url: '/systemManage/getMenuList/v2',
    method: 'get'
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
export function fetchGetMenuTree() {
  return request<Api.SystemManage.MenuTree[]>({
    url: '/systemManage/getMenuTree',
    method: 'get'
  });
}
