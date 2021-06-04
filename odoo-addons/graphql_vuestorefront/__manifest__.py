# Copyright 2021 ODOOGAP/PROMPTEQUATION LDA
# License LGPL-3.0 or later (http://www.gnu.org/licenses/lgpl).
{
    'name': 'Vue Storefront Api',
    'version': '13.0.1.0.0',
    'summary': 'Vue Storefront API',
    'description': """Vue Storefront API Integration""",
    'category': 'Website',
    'license': 'LGPL-3',
    'author': 'OdooGap',
    'website': 'https://www.odoogap.com/',
    'depends': [
        'graphql_base',
        'website_sale_wishlist',
        'website_sale_delivery',
        'auth_signup',
        'contacts',
    ],
    'data': [
        'data/website_data.xml',
    ],
    'demo': [
        'data/demo_product_attribute.xml',
        'data/demo_product_public_category.xml',
        'data/demo_products_women_clothing.xml',
        'data/demo_products_women_shoes.xml',
        'data/demo_products_women_bags.xml',
        'data/demo_products_men_clothing.xml',
        'data/demo_products_men_shoes.xml'
    ],
    'installable': True,
    'auto_install': False,
}
