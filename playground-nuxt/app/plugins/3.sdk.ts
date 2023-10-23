import { initSDK, buildModule } from '@vue-storefront/sdk';
import { OdooModule,  OdooModuleType } from '../../../packages/sdk/src'; 

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig();
  
  const sdkConfig = {
    odoo: buildModule<OdooModuleType>(OdooModule, {
      apiUrl: `${config.public.middlewareUrl}api/odoo/`,
      ofetch: $fetch
    })
  };

  return {
    provide: {
      sdk: () => initSDK<typeof sdkConfig>(sdkConfig)
    }
  };
});
