/* eslint-disable camelcase */
module.exports = {
  apps: [
    {
      name: 'Vuestorefront-Odoo',
      script: './node_modules/nuxt/bin/nuxt.js',
      cwd: './packages/theme/',
      exec_mode: 'cluster',
      instances: 4,
      args: 'start',
      env: {
        PORT: '3000',
        NODE_ENV: 'development'
      },
      env_production: {
        PORT: '3000',
        NODE_ENV: 'production'
      }
    }
  ]
};
