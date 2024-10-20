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
    interface DynamicRoute {
      id: number;
      name: string;
      type: string;
      code: string;
      icon: string;
      iconType: SystemManage.IconType;
      routeName: string;
      routePath: string;
      routeParams: string;
      pathParams: string;
      i18nKey?: App.I18n.I18nKey;
      layout: string;
      component: string;
      hide: boolean;
      sort?: number;
      children?: DynamicRoute[];
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
     * - "MODULE": 模块
     * - "GROUP": 分组
     * - "PAGE": 页面
     * - "FUNC": 功能
     */
    type MenuType = 'MODULE' | 'GROUP' | 'PAGE' | 'FUNC';

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
     * - '1': local icon
     * - '2': iconify icon
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
    /* 菜单 */
    type Menu = Common.CommonRecord<{
      /** menu platform */
      platform: string;
      /** parent menu id */
      parent: number;
      /** menu type */
      type: MenuType;
      /** menu name */
      name: string;
      /** menu code */
      code: string;
      /** route name */
      routeName: string;
      /** route path */
      routePath: string;
      /** route params */
      routeParams: any[];
      /** path params */
      pathParams: string;
      /** layout */
      layout?: string;
      /** component */
      component?: string;
      /** iconify icon name or local icon name */
      icon: string;
      /** iconify icon or local icon */
      iconType: IconType;
      /** menu sort */
      sort: number;
      /** children menu */
      children?: Menu[] | null;
    }> &
      MenuPropsOfRoute;

    /** menu list */
    type MenuList = Common.PaginatingQueryRecord<Menu>;

    /** menu edit model */
    type MenuEditModel = Pick<
      Menu,
      | 'platform'
      | 'type'
      | 'name'
      | 'code'
      | 'routeName'
      | 'routePath'
      | 'routeParams'
      | 'pathParams'
      | 'layout'
      | 'component'
      | 'sort'
      | 'i18nKey'
      | 'icon'
      | 'iconType'
      | 'parent'
      // | 'keepAlive'
      // | 'constant'
      // | 'href'
      // | 'hideInMenu'
      // | 'activeMenu'
      // | 'multiTab'
      // | 'fixedIndexInTab'
    > & {
      // query: NonNullable<Api.SystemManage.Menu['routeParams']>;
      layout: string;
      page: string;
      // pathParam: string;
    };

    type MenuTree = {
      id: number;
      name: string;
      parent: number;
      children?: MenuTree[];
    };

    /** role search params */
    type MenuSearchParams = CommonType.RecordNullable<Pick<Api.SystemManage.Menu, 'platform'> & CommonSearchParams>;

    /** role */
    type Role = Common.CommonRecord<{
      /** role platform */
      platform: string;
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
      Pick<Api.SystemManage.Role, 'name' | 'code'> & CommonSearchParams & { types: string }
    >;

    /** role list */
    type RoleList = Common.PaginatingQueryRecord<Role>;

    /** all role */
    type AllRole = Pick<Role, 'id' | 'name' | 'code' | 'type'>;

    type RoleEditModel = {
      name?: string;
      code?: string;
      remark?: string;
      menus?: number[];
    };

    /** platform */
    type SysApi = Common.CommonRecord<{
      /** api name */
      name: string;
      /** api module */
      module: string;
      /** api path */
      path: string;
      /** api description */
      remark: string;
    }>;

    /** platform list */
    type SysApiList = Common.PaginatingQueryRecord<SysApi>;

    /** platform search params */
    type SysApiSearchParams = CommonType.RecordNullable<
      Pick<Api.SystemManage.SysApi, 'name' | 'module' | 'path'> & CommonSearchParams
    >;

    /** platform */
    type Platform = Common.CommonRecord<{
      /** platform name */
      name: string;
      /** platform code */
      code: string;
      /** platform description */
      remark: string;
    }>;

    /** platform list */
    type PlatformList = Common.PaginatingQueryRecord<Platform>;

    /** platform search params */
    type PlatformSearchParams = CommonType.RecordNullable<
      Pick<Api.SystemManage.Platform, 'name' | 'code'> & CommonSearchParams
    >;

    /** tenant */
    type Tenant = Common.CommonRecord<{
      /** status */
      status: Common.EnableStatus | null;
      /** tenant name */
      name: string;
      /** tenant code */
      code: string;
      /** sys code */
      platform: string;
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
      Pick<Api.SystemManage.Tenant, 'status' | 'name' | 'code' | 'platform'> & CommonSearchParams
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
