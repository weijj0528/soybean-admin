import { urlSafeEncodeToBase64 } from '@sa/utils';
import { request } from '../request';

/**
 * Login
 *
 * @param username User name
 * @param password Password
 */
export function fetchLogin(username: string, password: string) {
  const pwd = urlSafeEncodeToBase64(password);
  return request<Api.Auth.LoginToken>({
    url: '/admin/auth/login/userPwdLogin',
    method: 'post',
    data: {
      username,
      password: pwd,
      sys: 'SAAS'
    }
  });
}

/** Get user info */
export function fetchGetUserInfo() {
  return request<Api.Auth.SystemManage>({ url: '/admin/user/info' });
}

/**
 * Refresh token
 *
 * @param refreshToken Refresh token
 */
export function fetchRefreshToken(refreshToken: string) {
  return request<Api.Auth.LoginToken>({
    url: '/auth/refreshToken',
    method: 'post',
    data: {
      refreshToken
    }
  });
}

/**
 * return custom backend error
 *
 * @param code error code
 * @param msg error message
 */
export function fetchCustomBackendError(code: string, msg: string) {
  return request({ url: '/auth/error', params: { code, msg } });
}
