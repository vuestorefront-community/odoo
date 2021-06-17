# Copyright 2021 ODOOGAP/PROMPTEQUATION LDA
# License LGPL-3.0 or later (http://www.gnu.org/licenses/lgpl).

from odoo import http
from odoo.addons.graphql_base import GraphQLControllerMixin
from odoo.addons.sale.controllers.variant import VariantController
from odoo.addons.website_sale.controllers.main import WebsiteSale
from odoo.http import request
from odoo.addons.http_routing.models.ir_http import slug

from ..schema import schema


class GraphQLController(http.Controller, GraphQLControllerMixin):

    # The GraphiQL route, providing an IDE for developers
    @http.route("/graphiql/vsf", auth="user")
    def graphiql(self, **kwargs):
        return self._handle_graphiql_request(schema)

    # Optional monkey patch, needed to accept application/json GraphQL
    # requests. If you only need to accept GET requests or POST
    # with application/x-www-form-urlencoded content,
    # this is not necessary.
    GraphQLControllerMixin.patch_for_json("^/graphql/vsf/?$")

    # The graphql route, for applications.
    # Note csrf=False: you may want to apply extra security
    # (such as origin restrictions) to this route.
    @http.route("/graphql/vsf", auth="public", csrf=False)
    def graphql(self, **kwargs):
        return self._handle_graphql_request(schema)


class VsfVariantController(VariantController):
    @http.route(['/shop/get_combinations/<int:product_template_id>'], type='json', auth='public', website=True)
    def shop_get_combination(self, product_template_id, **kw):
        """ Get all product template attributes for product template page """
        res = {
            'attribute_values': [],
        }

        product_template = request.env['product.template'].browse(int(product_template_id))
        if product_template.exists():
            for ptal in product_template.valid_product_template_attribute_line_ids:
                for ptav in ptal.product_template_value_ids._only_active():
                    res['attribute_values'].append({
                        'attribute_name': ptav.attribute_id.name,
                        'attribute_display_type': ptav.attribute_id.display_type,
                        'attribute_value_id': ptav.id,
                        'attribute_value_name': ptav.name,
                        'attribute_value_html_color': ptav.html_color,
                        'attribute_value_price_extra': ptav.price_extra,
                    })

        return res

    @http.route(['/shop/get_combination_info/<int:product_template_id>'], type='json', auth='public', website=True)
    def shop_get_combination_info(self, product_template_id, combination_ids=[], add_qty=1, pricelist=None, **kw):
        """ Get product id and price after selecting the combination on the product template page """
        env = request.env

        product_template = env['product.template'].browse(int(product_template_id))
        if product_template.exists():
            combination = env['product.template.attribute.value'].browse(combination_ids)
            return product_template._get_combination_info(combination, add_qty=add_qty, pricelist=pricelist)

        return {}


class VsfWebsiteSale(WebsiteSale):
    @http.route(['/shop/products'], type='json', auth='public', website=True)
    def shop_get_combination_info(self, search='', category_id=None, offset=0, ppg=20, attrib_list=[], **post):
        env = request.env
        Product = env['product.template']
        Category = env['product.public.category']
        ProductAttribute = env['product.attribute']
        base_url = env['ir.config_parameter'].sudo().get_param('web.base.url', '')

        # Get category
        if category_id:
            category = Category.search([('id', '=', category_id)], limit=1)
            if not category or not category.can_access_from_current_website():
                category = Category
        else:
            category = Category

        # Get attributes
        attrib_values = [[int(x) for x in v.split("-")] for v in attrib_list if v]
        attributes_ids = {v[0] for v in attrib_values}

        # Get domain with search, category and attributes
        domain = self._get_search_domain(search, category, attrib_values)

        # Search products and get total of products and sliced version based on pagination
        search_product = Product.search(domain, order=self._get_search_order(post))
        product_count = len(search_product)
        products = search_product[offset: offset + ppg]

        # Get attributes of total products for search
        if products:
            # get all products without limit
            attributes = ProductAttribute.search([('product_tmpl_ids', 'in', search_product.ids)])
        else:
            attributes = ProductAttribute.browse(attributes_ids)

        return {
            'products': [{
                'id': product.id,
                'name': product.name,
                'image': '{}/web/image/product.template/{}/image_1920'.format(base_url, product.id),
                'price': product.list_price,
                'slug': slug(product).replace('-{}'.format(product.id), ''),
                'first_variant_id': product.product_variant_id.id,
            } for product in products],
            'product_count': product_count,
            'attributes': [{
                'id': attribute.id,
                'name': attribute.name,
                'display_type': attribute.display_type,
                'values': [{
                    'id': value.id,
                    'name': value.name,
                    'html_color': value.html_color,
                    'search': '{}-{}'.format(attribute.id, value.id),
                } for value in attribute.value_ids],
            } for attribute in attributes],
        }
