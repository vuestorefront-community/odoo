import { Context } from '@vue-storefront/core';

export default async function cartLoadRedis(context: Context): Promise<any> {
  console.log(context.req.session);
  return null;
}
