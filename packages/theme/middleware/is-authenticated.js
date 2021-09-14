export default async ({ app, redirect }) => {
  if (!app.$cookies.get('odoo-user')) {
    return redirect('/');
  }
};
