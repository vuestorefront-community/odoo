<div align="center">
  <img src="https://user-images.githubusercontent.com/1626923/137323036-91d4262b-74dd-40c3-83da-a405a75de5c8.jpg" alt="Vue Storefront" />
</div>

---------

# #TechForUkraine

<table>
  <tr>
    <td style="width:40%;">
       <img src="https://user-images.githubusercontent.com/1626923/155853691-d6d0a541-d3b9-40bf-b8f5-2d38303e9e49.png" />
    </td>
    <td>
      <h2><strong>Ongoing tensions on Ukrainian territory close the space for civil society.</strong></h2>
      <h3>How can you support Ukrainian civil society?</h3>
      All the help is valid, and if you are not able to help locally, by giving shelter to a fellow Ukraine, there are some ways that you can help also:
      <ul>
        <li>
          Support the Ukraine Armed forces directly by sending funding to the open special accounts.<br />
          <a href="https://bank.gov.ua/en/news/all/natsionalniy-bank-vidkriv-spetsrahunok-dlya-zboru-koshtiv-na-potrebi-armiyi" target="_blank">NBU Opens Special Account to Raise Funds for Ukraine’s Armed Forces</a>
        </li>
        <li>
          Help the ICRC (Red Cross) with donations.<br />
          <a href="https://www.icrc.org/en/where-we-work/europe-central-asia/ukraine" target="_blank">Ukrainian Red Cross Society</a>
        </li>
        <li>
          Donate to the United Help Ukraine.<br />
          <a href="https://unitedhelpukraine.org/" target="_blank">United Help Ukraine</a>
        </li>
        <li>
          Donate to Voices of Children<br />
          <a href="https://voices.org.ua/en/" target="_blank">Voices of Children</a>
        </li>
    </td>
  </tr>
</table>

---------

## Vue Storefront 2 integration with Odoo (beta)

This project is a Odoo integration with [Vue Storefront 2](https://github.com/vuestorefront-community/vue-storefront/).
This integration is being developed and maintained by [ODOOGAP / PROMPTEQUATION](https://www.odoogap.com/) ❤️

Check our [demo](https://vsf.labs.odoogap.com/) server (it's a dev server so could be down sometimes)


## How to start?


```sh
1. git clone https://github.com/vuestorefront-community/odoo
2. yarn install
3. yarn build # (optional) Verify if everything works properly by building all three projects
4. yarn dev
5. If you want to use your own Odoo server you will need to add the [odoo-addons](https://github.com/vuestorefront-community/odoo) repository to your server
```

Want to contribute? Ping us on `odoo` channel on [our Discord](https://discord.vuestorefront.io) or email us at info (at) odoogap.com!


## Directory structure

* **packages/api-client** - communicates with a backend;
* **packages/composables** - exposes composable functions used to retrieve data using `api-client` and to map them to universal data formats using `getters`;
* **packages/theme** - `nuxt` project that glues everything together. It extends our core theme and uses `composables` to retrieve data.

## Resources

- [Vue Storefront Documentation](https://docs.vuestorefront.io/v2/)
- [Odoo integration Documentation](https://docs.vuestorefront.io/odoo)
- [Odoo Backend Modules](https://github.com/vuestorefront-community/odoo)

## Support

If you have any questions about this integration we will be happy to answer them on `odoo` channel on [our Discord](discord.vuestorefront.io).

## Credits

### Authors:

- ODOOGAP / PROMPTEQUATION

### Dependency Odoo Modules

- [OCA - Odoo Community Association - Base REST](https://github.com/OCA/rest-framework)

## Contributors ✨

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://www.promptequation.com/"><img src="https://avatars.githubusercontent.com/u/7774534?v=4?s=80" width="80px;" alt=""/><br /><sub><b>LMuniz</b></sub></a><br />
    <a href="https://github.com/vuestorefront-community/odoo/commits?author=LeoMunizOdoo " title="Code">💻</a></td>
    <td align="center"><a href="http://www.promptequation.com/"><img src="https://avatars.githubusercontent.com/u/21957046?v=4?s=80" width="80px;" alt=""/><br /><sub><b>cpintofonseca</b></sub></a><br />    <a href="https://github.com/vuestorefront-community/odoo/commits?author=cpintofonseca" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/SDMonteiro"><img src="https://avatars.githubusercontent.com/u/68434298?v=4?s=80" width="80px;" alt=""/><br /><sub><b>SDMonteiro</b></sub></a><br /><a href="https://github.com/vuestorefront-community/odoo/commits?author=SDMonteiro" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/brunoodoogap"><img src="https://avatars.githubusercontent.com/u/84967663?v=4?s=80" width="80px;" alt=""/><br /><sub><b>brunoodoogap</b></sub></a><br /><a href="https://github.com/vuestorefront-community/odoo/commits?author=brunoodoogap" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/dduarte-odoogap"><img src="https://avatars.githubusercontent.com/u/18329970?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Diogo Duarte</b></sub></a><br /><a href="https://github.com/vuestorefront-community/odoo/commits?author=dduarte-odoogap" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
