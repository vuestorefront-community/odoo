# Enviroment configuration

In this session we show all env variables that are used by template_odoo and vsf_docker projects.

## Template Odoo
|       Env        |                                  Default                                   |                                                                     Description                                                                      |
| :--------------: | :----------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------: |
|     ODOO_BASE_URL     | http://vsfdemo15.labs.odoogap.com/ # or https://localhost:8069 for local |                                                        Base url should target the Odoo server                                                        |
|     VSF_SITE_URL     |                          http://localhost:3000/                          |                                                Front end base url should point to the frontend server                                                |
| ODOO_BACKEND_BASE_URL |                         https://vsf.odoogap.com/                         | Backend base url will point for a private address if required internal access don't need to pass it unless you need a private access to the endpints |
|   PUBLIC_PATH    |                      https://xyz.cloudfront.cdn.com                      |                                              Public path should be defined on production for CDN access                                              |
|     NODE_ENV     |                                   dev                                    |                                      Node enviroment. Should be set to production on production. Default is dev                                      |
|   NODE_LOCALE    |                                  en-EN                                   |                                                            Node locale. Default is en-EN                                                             |
|       VSF_PORT       |                                   3000                                   |                                                              Node port. Default is 3000                                                              |
|       VSF_HOST       |                                 0.0.0.0                                  |                                                            Node host. Default is 0.0.0.0                                                             |
|  REDIS_ENABLED   |                                  false                                   |                                                   Enable or disable redis cache. Default is false                                                    |
|    REDIS_HOST    |                                127.0.0.1                                 |                                                       Redis host. Default is localhost for dev                                                       |
|    REDIS_PORT    |                                   6379                                   |                                                   Redis port. Default is 6379 in dev configuration                                                   |
|  REDIS_PASSWORD  |                                   pass                                   |                                                          Redis password. Empty is default.                                                           |
| REDIS_INVALIDATION_KEY |                                   123                                    |                                                             Used for invalidating cache                                                              |
| GOOGLE_TAG_MANAGER_ID |                                   google_container_id               |                                                             This allows you to easily add tracking tags such as Google Analytics                    |


## Vuestorefront Docker

|       Env        |                                  Value                                   |                                                                     Description                                                                      |
| :--------------: | :----------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------: |
|     NODE_ENV     | production |                                                         Node enviroment.  Docker builds the project in production env                                                         |
|   NODE_LOCALE    |                                  en-EN                                   |                                                            Node locale. Default is en-EN                                                             |
| ODOO_BACKEND_BASE_URL |                         http://odoo:8069/                        | Odoo local server |
|   VSF_SITE_URL   |                      http://localhost:3000/com                      |                                              Public path should be defined on production for CDN access                                              |
|     REDIS_INVALIDATION_KEY     |                                  123                                    |                                      Used for invalidating cache                                      |
|  REDIS_ENABLED   |                                  true                                   |                                                   Enable or disable redis cache. Default is true                                                    |
|    REDIS_HOST    |                                redis                                 |                                                       Redis host. Default is redis for dev                                                       |
|    REDIS_PORT    |                                   6379                                   |                                                   Redis port. Default is 6379 in dev configuration                                                   |
|  ODOO_VERSION  |                                   "16.0"                                   |                                                          Redis password. Empty is default.                                                           |
|     ODOO_POSTGRES_HOST    |                                  db                                   |                                      The database host                                    |
|  ODOO_POSTGRES_DB   |                                  v16_odoo                                   |                                                   Database name                                                  |
|    ODOO_POSTGRES_USER    |                                odoo                                 |                                                       Db user                                                      |
|    ODOO_POSTGRES_PORT    |                                   5432                                   |                                                   DB port                                                   |
|  ODOO_POSTGRES_PASSWORD  |                                   odoo                                   |                                                          Db password                                                           |




::: tip
You can choose to use the .env file or the enviroment variables directly useing **export** command.
:::