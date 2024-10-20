import { request } from '../request';

/** get constant routes */
export function fetchGetConstantRoutes() {
  return { data: [], error: true };
  // return request<Api.Route.MenuRoute[]>({ url: '/route/getConstantRoutes' });
}

/** get user routes */
export function fetchGetUserRoutes() {
  return request<Api.Route.DynamicRoute[]>({ url: '/admin/auth/permission' });
}

/**
 * whether the route is exist
 *
 * @param routeName route name
 */
export function fetchIsRouteExist(routeName: string) {
  console.log('fetchIsRouteExist', routeName);
  return { data: false };
  // return request<boolean>({ url: '/route/isRouteExist', params: { routeName } });
}
