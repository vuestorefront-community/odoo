import { Plugin } from '@nuxt/types';
declare module 'vue/types/vue' {
  interface Vue {
    $image(imagePath: string, width: number, heigth: number, name: string): string
  }
}
declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $image(imagePath: string, width: number, heigth: number, name: string): string
  }
  interface Context {
    $image(imagePath: string, width: number, heigth: number, name: string): string
  }
}
const getImagePlugin: Plugin = (context, inject) => {
  inject('image', (imagePath: string, width: number, heigth: number, name: string) => {
    const resolution = `${width}x${heigth}`;
    return `${context.app.$config.baseURL}${imagePath?.replace('/', '')}/${resolution}/${name}_${resolution}`;
  });
};

export default getImagePlugin;
