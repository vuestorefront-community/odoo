import { defineNuxtPlugin } from '#app';
import { format } from 'winston';

export default defineNuxtPlugin(async (nuxtApp) => {
  const appConfig = useAppConfig()
  return {
    provide: {
      getImagePlugin: (imagePath: string, width: number, heigth: number, name: string) => {
        const resolution = `${width}x${heigth}`;
        return `${appConfig}${imagePath?.replace('/', '')}/${resolution}/${name}_${resolution}`;
      }
    }
  }
});
