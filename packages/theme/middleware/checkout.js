const canEnterShipping = (cart) => cart?.order.orderLines?.length > 0 || false;

const canEnterBiling = (cart) => canEnterShipping(cart) && cart?.order.partnerShipping.id;

const canEnterPayment = (cart) => canEnterShipping(cart) && canEnterBiling(cart) && cart?.order.partnerInvoice.id;

export default async ({ app, $vsf }) => {
  const currentPath = app.context.route.fullPath.split('/checkout/')[1];

  if (!currentPath) return;

  const { cart } = await $vsf.$odoo.api.cartLoad();

  if (!cart) return;

  switch (currentPath) {
    case 'shipping':
      if (!canEnterShipping(cart)) {
        app.context.redirect('/');
      }
      break;
    case 'billing':
      if (!canEnterBiling(cart)) {
        app.context.redirect('/');
      }
      break;
    case 'payment':
      if (!canEnterPayment(cart)) {
        app.context.redirect('/');
      }
      break;
  }
};
