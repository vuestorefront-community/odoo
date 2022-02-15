/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export default ({ app }, inject) => {
  const getImage = (imagePath: string) => {
    return `${app.$config.baseURL}${imagePath?.replace('/', '')}`;
  };
  inject('image', getImage);
};
