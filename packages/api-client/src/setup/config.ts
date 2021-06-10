
import ApolloClient, { ApolloClientOptions } from 'apollo-client';

export type ClientInstance = any

export interface ApiConfig {
    uri: string;
    authHost: string;
    projectKey: string;
    clientId: string;
    clientSecret: string;
    scopes: string[];
}

export interface CookiesConfig {
    currencyCookieName: string;
    countryCookieName: string;
    localeCookieName: string;
}

export interface Config<T = any> {
    app: object;
    graphqlBaseUrl: string;
    odooBaseUrl: string;
    cookies: CookiesConfig;
    client?: ApolloClient<T>;
    api: ApiConfig;
    customOptions?: ApolloClientOptions<any>;
    currency: string;
    locale: string;
    country: string;
    languageMap: Record<string, string>;
    acceptLanguage: string[];
    forceToken?: boolean;
    setGuestCheckoutToken: (string) => void;
    getGuestCheckoutToken: () => string;
    removeGuestCheckoutToken: () => void;
}
