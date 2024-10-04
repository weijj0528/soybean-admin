/**
 * Namespace Api
 *
 * All backend api type
 */
declare namespace Api {
  namespace Common {
    /** common params of paginating */
    interface PaginatingCommonParams {
      /** page number */
      page: number;
      /** page size */
      size: number;
      /** total count */
      total: number;
    }

    /** common params of paginating query list data */
    interface PaginatingQueryRecord<T = any> extends PaginatingCommonParams {
      list: T[];
    }

    /**
     * enable status
     *
     * - "1": enabled
     * - "2": disabled
     */
    type EnableStatus = '1' | '2';

    /**
     * delete status
     *
     * - "1": deleted
     * - "0": not deleted
     */
    type DeleteStatus = '1' | '0';

    /** common record */
    type CommonRecord<T = any> = {
      /** record id */
      id: number;
      /** tenant id */
      tenant: number;
      /** version */
      version: number;
      /** version */
      deleted: DeleteStatus;
      /** record creator */
      creator: string;
      /** record create time */
      ctime: string;
      /** record updater */
      updater: string;
      /** record update time */
      utime: string;
    } & T;
  }

  /**
   * namespace Auth
   *
   * backend api module: "auth"
   */
  namespace Auth {
    interface LoginToken {
      token: string;
      refreshToken: string;
    }

    interface SystemManage {
      userId: string;
      username: string;
      roles: string[];
      buttons: string[];
    }
  }

  /**
   * namespace Route
   *
   * backend api module: "route"
   */
  namespace Route {
    type ElegantConstRoute = import('@elegant-router/types').ElegantConstRoute;

    interface MenuRoute extends ElegantConstRoute {
      id: string;
    }

    interface UserRoute {
      routes: MenuRoute[];
      home: import('@elegant-router/types').LastLevelRouteKey;
    }
  }

  /**
   * namespace SystemManage
   *
   * backend api module: "systemManage"
   */
  namespace SystemManage {
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'page' | 'size'>;

    /**
     * menu type
     *
     * - "1": directory
     * - "2": menu
     */
    type MenuType = '1' | '2';

    type MenuButton = {
      /**
       * button code
       *
       * it can be used to control the button permission
       */
      code: string;
      /** button description */
      desc: string;
    };

    /**
     * icon type
     *
     * - "1": iconify icon
     * - "2": local icon
     */
    type IconType = '1' | '2';

    type MenuPropsOfRoute = Pick<
      import('vue-router').RouteMeta,
      | 'i18nKey'
      | 'keepAlive'
      | 'constant'
      | 'order'
      | 'href'
      | 'hideInMenu'
      | 'activeMenu'
      | 'multiTab'
      | 'fixedIndexInTab'
      | 'query'
    >;

    type Menu = Common.CommonRecord<{
      /** status */
      status: Common.EnableStatus | null;
      /** parent menu id */
      parentId: number;
      /** menu type */
      menuType: MenuType;
      /** menu name */
      menuName: string;
      /** route name */
      routeName: string;
      /** route path */
      routePath: string;
      /** component */
      component?: string;
      /** iconify icon name or local icon name */
      icon: string;
      /** icon type */
      iconType: IconType;
      /** buttons */
      buttons?: MenuButton[] | null;
      /** children menu */
      children?: Menu[] | null;
    }> &
      MenuPropsOfRoute;

    /** menu list */
    type MenuList = Common.PaginatingQueryRecord<Menu>;

    type MenuTree = {
      id: number;
      label: string;
      pId: number;
      children?: MenuTree[];
    };
    /** role */
    type Role = Common.CommonRecord<{
      /** status */
      status: Common.EnableStatus | null;
      /** role name */
      name: string;
      /** role code */
      code: string;
      /** role code */
      type: string;
      /** role description */
      remark: string;
    }>;

    /** role search params */
    type RoleSearchParams = CommonType.RecordNullable<
      Pick<Api.SystemManage.Role, 'status' | 'name' | 'code' | 'type'> & CommonSearchParams
    >;

    /** role list */
    type RoleList = Common.PaginatingQueryRecord<Role>;

    /** all role */
    type AllRole = Pick<Role, 'id' | 'status' | 'name' | 'code' | 'type'>;

    /** tenant */
    type Tenant = Common.CommonRecord<{
      /** status */
      status: Common.EnableStatus | null;
      /** tenant name */
      name: string;
      /** tenant code */
      code: string;
      /** sys code */
      sysCode: string;
      /** tenant description */
      remark: string;
      /** tenant description */
      adminUser: string;
      /** tenant description */
      adminName: string;
    }>;

    /** tenant list */
    type TenantList = Common.PaginatingQueryRecord<Tenant>;

    /** tenant search params */
    type TenantSearchParams = CommonType.RecordNullable<
      Pick<Api.SystemManage.Tenant, 'status' | 'name' | 'code' | 'sysCode'> & CommonSearchParams
    >;
    /**
     * user gender
     *
     * - "1": "male"
     * - "2": "female"
     */
    type UserGender = '1' | '0';

    /**
     * freeze status
     *
     * - "1": "freeze"
     * - "0": "normal"
     */
    type FreezeStatus = '1' | '0';

    /** user */
    type User = Common.CommonRecord<{
      /** user name */
      name: string;
      /** user gender */
      gender: UserGender | null;
      /** user nick name */
      nickname: string;
      /** user phone */
      phone: string;
      /** user email */
      email: string;
      /** freeze status */
      freeze: FreezeStatus | null;
    }>;

    /** user search params */
    type UserSearchParams = CommonType.RecordNullable<
      Pick<Api.SystemManage.User, 'name' | 'gender' | 'nickname' | 'phone' | 'email' | 'freeze'> &
        SystemManage.CommonSearchParams
    >;

    /** user list */
    type UserList = Common.PaginatingQueryRecord<User>;
  }
}
