import { defineNuxtPlugin } from '#app';
export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig()


  return {
    provide: {
      getImage: (imagePath: string, width: number, heigth: number, name: string) => {
        const resolution = `${width}x${heigth}`;
        return `${config.public.odooImageUrl}${imagePath?.replace('/', '')}/${resolution}/${name}_${resolution}`;
      }
    }
  }
});
