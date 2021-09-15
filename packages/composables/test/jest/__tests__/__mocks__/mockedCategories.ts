import { Category } from '@vue-storefront/odoo-api/src/types';

export const mockedCategories: Category[] = [
  {
    id: 1,
    name: 'Components',
    slug: 'components-1',
    childs: null,
    parent: null
  },
  {
    id: 2,
    name: 'Boxes',
    slug: 'boxes-2',
    childs: null,
    parent: null
  },
  {
    id: 3,
    name: 'Desks',
    slug: 'desks-3',
    childs: null,
    parent: null
  },
  {
    id: 4,
    name: 'Cabinets',
    slug: 'cabinets-4',
    childs: null,
    parent: null
  },
  {
    id: 5,
    name: 'Bins',
    slug: 'bins-5',
    childs: null,
    parent: null
  },
  {
    id: 6,
    name: 'Chairs',
    slug: 'chairs-6',
    childs: null,
    parent: null
  },
  {
    id: 7,
    name: 'Drawers',
    slug: 'drawers-7',
    childs: null,
    parent: null
  },
  {
    id: 8,
    name: 'Lamps',
    slug: 'lamps-8',
    childs: null,
    parent: null
  },
  {
    id: 9,
    name: 'Multimedia',
    slug: 'multimedia-9',
    childs: null,
    parent: null
  },
  {
    id: 10,
    name: 'Services',
    slug: 'services-10',
    childs: null,
    parent: null
  },
  {
    id: 11,
    name: 'Women',
    slug: 'women-11',
    childs: [
      {
        id: 13,
        name: 'Clothing',
        slug: 'women-clothing-13',
        childs: [
          {
            id: 17,
            name: 'All',
            slug: 'women-clothing-all-17'
          },
          {
            id: 18,
            name: 'Jackets',
            slug: 'women-clothing-jackets-18'
          },
          {
            id: 19,
            name: 'Blazer',
            slug: 'women-clothing-blazer-19'
          },
          {
            id: 20,
            name: 'Tops',
            slug: 'women-clothing-tops-20'
          },
          {
            id: 21,
            name: 'Shirts',
            slug: 'women-clothing-shirts-21'
          },
          {
            id: 22,
            name: 'T-shirts',
            slug: 'women-clothing-t-shirts-22'
          },
          {
            id: 23,
            name: 'Jeans',
            slug: 'women-clothing-jeans-23'
          },
          {
            id: 24,
            name: 'Trouser',
            slug: 'women-clothing-trouser-24'
          },
          {
            id: 25,
            name: 'Skirts',
            slug: 'women-clothing-skirts-25'
          },
          {
            id: 26,
            name: 'Dresses',
            slug: 'women-clothing-dresses-26'
          },
          {
            id: 27,
            name: 'Swimwear',
            slug: 'women-clothing-swimwear-27'
          }
        ]
      },
      {
        id: 14,
        name: 'Shoes',
        slug: 'women-shoes-14',
        childs: [
          {
            id: 28,
            name: 'All',
            slug: 'women-shoes-all-28'
          },
          {
            id: 29,
            name: 'Sneakers',
            slug: 'women-shoes-sneakers-29'
          },
          {
            id: 30,
            name: 'Boots',
            slug: 'women-shoes-boots-30'
          },
          {
            id: 31,
            name: 'Ankle boots',
            slug: 'women-shoes-ankle-boots-31'
          },
          {
            id: 32,
            name: 'Pumps',
            slug: 'women-shoes-pumps-32'
          },
          {
            id: 33,
            name: 'Ballerinas',
            slug: 'women-shoes-ballerinas-33'
          },
          {
            id: 34,
            name: 'Lace-up shoes',
            slug: 'women-shoes-lace-up-shoes-34'
          },
          {
            id: 35,
            name: 'Loafers',
            slug: 'women-shoes-loafers-35'
          },
          {
            id: 36,
            name: 'Sandals',
            slug: 'women-shoes-sandals-36'
          },
          {
            id: 37,
            name: 'Winterboots',
            slug: 'women-shoes-winterboots-37'
          }
        ]
      },
      {
        id: 15,
        name: 'bags',
        slug: 'women-bags-15',
        childs: [
          {
            id: 38,
            name: 'All',
            slug: 'women-bags-all-38'
          },
          {
            id: 39,
            name: 'Clutches',
            slug: 'women-bags-clutches-39'
          },
          {
            id: 40,
            name: 'Shoulder Bags',
            slug: 'women-bags-shoulder-bags-40'
          },
          {
            id: 41,
            name: 'Shopper',
            slug: 'women-bags-shopper-41'
          },
          {
            id: 42,
            name: 'Handbag',
            slug: 'women-bags-handbag-42'
          },
          {
            id: 43,
            name: 'Wallets',
            slug: 'women-bags-wallets-43'
          },
          {
            id: 44,
            name: 'Bucketbag/packbag',
            slug: 'women-bags-bucketbag-packbag-44'
          }
        ]
      },
      {
        id: 16,
        name: 'Looks',
        slug: 'women-looks-16',
        childs: [
          {
            id: 45,
            name: 'All',
            slug: 'women-looks-all-45'
          }
        ]
      }
    ],
    parent: null
  },
  {
    id: 12,
    name: 'Men',
    slug: 'men-12',
    childs: [
      {
        id: 46,
        name: 'Clothing',
        slug: 'men-clothing-46',
        childs: [
          {
            id: 50,
            name: 'All',
            slug: 'men-clothing-all-50'
          },
          {
            id: 51,
            name: 'Jackets',
            slug: 'men-clothing-jackets-51'
          },
          {
            id: 52,
            name: 'Tops',
            slug: 'men-clothing-tops-52'
          },
          {
            id: 53,
            name: 'Shirts',
            slug: 'men-clothing-shirts-53'
          },
          {
            id: 54,
            name: 'Trousers',
            slug: 'men-clothing-trousers-54'
          },
          {
            id: 55,
            name: 'Jeans',
            slug: 'men-clothing-jeans-55'
          },
          {
            id: 56,
            name: 'Blazer',
            slug: 'men-clothing-blazer-56'
          },
          {
            id: 57,
            name: 'Suits',
            slug: 'men-clothing-suits-57'
          },
          {
            id: 58,
            name: 'T-shirts',
            slug: 'men-clothing-t-shirts-58'
          }
        ]
      },
      {
        id: 47,
        name: 'Shoes',
        slug: 'men-shoes-47',
        childs: [
          {
            id: 59,
            name: 'All',
            slug: 'men-shoes-all-59'
          },
          {
            id: 60,
            name: 'Sneakers',
            slug: 'men-shoes-sneakers-60'
          },
          {
            id: 61,
            name: 'Boots',
            slug: 'men-shoes-boots-61'
          },
          {
            id: 62,
            name: 'Lace-up shoes',
            slug: 'men-shoes-lace-up-shoes-62'
          },
          {
            id: 63,
            name: 'Loafers',
            slug: 'men-shoes-loafers-63'
          },
          {
            id: 64,
            name: 'Sandals',
            slug: 'men-shoes-sandals-64'
          }
        ]
      },
      {
        id: 48,
        name: 'Bags',
        slug: 'men-bags-48',
        childs: [
          {
            id: 65,
            name: 'All',
            slug: 'men-bags-all-65'
          },
          {
            id: 66,
            name: 'Clutches',
            slug: 'men-bags-clutches-66'
          },
          {
            id: 67,
            name: 'Shoulder bags',
            slug: 'men-bags-shoulder-bags-67'
          },
          {
            id: 68,
            name: 'Shopper',
            slug: 'men-bags-shopper-68'
          },
          {
            id: 69,
            name: 'Handbag',
            slug: 'men-bags-handbag-69'
          },
          {
            id: 70,
            name: 'Wallets',
            slug: 'men-bags-wallets-70'
          },
          {
            id: 71,
            name: 'Bucketbag/packbag',
            slug: 'men-bags-bucketbag-packbag-71'
          }
        ]
      },
      {
        id: 49,
        name: 'Looks',
        slug: 'men-looks-49',
        childs: [
          {
            id: 72,
            name: 'All',
            slug: 'men-looks-all-72'
          }
        ]
      }
    ],
    parent: null
  }
];
