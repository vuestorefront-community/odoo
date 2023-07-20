# Docker Compose

This session is about docker-compose explanation. Here you can understand deeply whats behind our enviroment. Remember, all the services inside this file will be abled automatically when you type ```docker-compose up``` on your command line.

## Under the docker-compose file

```yml

version: "3.7"


services:

  redis:
    container_name: redis
    image: library/redis:5.0-alpine
    restart: unless-stopped
    ports:
      - 6379:6379
    networks:
      - net01
    volumes:
      - redis_data:/data

  db:
    env_file: .env
    image: postgres:14
    container_name: db
    restart: unless-stopped
    networks:
      - net01
    volumes:
      - db_home:/var/lib/postgresql/data
    environment:
      - POSTGRES_USER=odoo
      - POSTGRES_PASSWORD=odoo
      - POSTGRES_DB=v16_odoo

  odoo:
    env_file: .env
    user: "root"
    build:
      context: ./16.0
      dockerfile: Dockerfile
    container_name: odoo
    image: odoogap
    restart: unless-stopped
    command: ["/startup.sh"]
    ports:
      - 8069:8069
    volumes:
      - odoo_home:/var/lib/odoo
      - odoo_extra:/mnt/extra-addons
      - ./16.0/odoo.conf:/etc/odoo/odoo.conf
    depends_on:
      - db
    networks:
      - net01

  vsf:
    env_file: .env
    build:
      context: ./vsf
      dockerfile: Dockerfile
      args:
        TAG_BRANCH: "v1.5.2"
    container_name: vsf
    ports:
      - 3000:3000
    image: vsf2
    restart: unless-stopped
    volumes:
      - nuxt_build:/apt/.nuxt
    depends_on:
      - odoo
      - redis
    networks:
      - net01


volumes:
  db_home:
    external: false
  odoo_home:
    external: false
  odoo_extra:
    external: False
  redis_data:
    external: false
  nuxt_build:
    external: false

networks:
  net01:
    name: net01


```