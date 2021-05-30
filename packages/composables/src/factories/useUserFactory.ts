import { Context, FactoryParams, UseUser } from "@vue-storefront/core";

export interface UseUserFactoryParams<USER, UPDATE_USER_PARAMS, REGISTER_USER_PARAMS> extends FactoryParams {
    load: (context: Context, params?: {}) => Promise<USER>;
    logOut: (context: Context, params?: {
        currentUser?: USER;
    }) => Promise<void>;
    updateUser: (context: Context, params: {
        currentUser: USER;
        updatedUserData: UPDATE_USER_PARAMS;
    }) => Promise<USER>;
    register: (context: Context, params: REGISTER_USER_PARAMS) => Promise<USER>;
    logIn: (context: Context, params: {
        username: string;
        password: string;
    }) => Promise<USER>;
    changePassword: (context: Context, params: {
        currentUser: USER;
        currentPassword: string;
        newPassword: string;
    }) => Promise<USER>;
}

export declare const useUserFactory: <USER, UPDATE_USER_PARAMS, REGISTER_USER_PARAMS extends {
    email: string;
    password: string;
}>(factoryParams: UseUserFactoryParams<USER, UPDATE_USER_PARAMS, REGISTER_USER_PARAMS>) => () => UseUser<USER, UPDATE_USER_PARAMS>;

