# Copyright 2021 ODOOGAP/PROMPTEQUATION LDA
# License LGPL-3.0 or later (http://www.gnu.org/licenses/lgpl).

from odoo import http
from odoo.addons.graphql_base import GraphQLControllerMixin
from odoo.addons.sale.controllers.variant import VariantController
from odoo.addons.website_sale.controllers.main import WebsiteSale
from odoo.http import request

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


class WebsiteSaleVariantController(VariantController):
    @http.route(['/sale/get_combination/<int:product_template_id>'], type='json', auth='public', website=True)
    def get_combination(self, product_template_id, **kw):
        res = {
            'attribute_values': [],
        }

        product_template = request.env['product.template'].browse(int(product_template_id))
        if product_template.exists():
            for ptal in product_template.valid_product_template_attribute_line_ids:
                for ptav in ptal.product_template_value_ids._only_active():
                    res['attribute_values'].append({
                        'attribute_value_id': ptav.id,
                        'attribute_value_name': ptav.name,
                        'attribute_name': ptav.attribute_id.name,
                        'price_extra': ptav.price_extra,
                        'display_type': ptav.attribute_id.display_type,
                    })

        return res

    @http.route(['/shop/get_combination/<int:product_template_id>'], type='json', auth='public', website=True)
    def get_combination(self, product_template_id, **kw):
        """ Get all attributes from product template """
        res = {
            'attribute_values': [],
        }

        product_template = request.env['product.template'].browse(int(product_template_id))
        if product_template.exists():
            for ptal in product_template.valid_product_template_attribute_line_ids:
                for ptav in ptal.product_template_value_ids._only_active():
                    res['attribute_values'].append({
                        'attribute_value_id': ptav.id,
                        'attribute_value_name': ptav.name,
                        'attribute_name': ptav.attribute_id.name,
                        'price_extra': ptav.price_extra,
                        'display_type': ptav.attribute_id.display_type,
                    })

        return res

    @http.route(['/shop/get_combination_info/<int:product_template_id>'], type='json', auth='public', website=True)
    def get_combination_info(self, product_template_id, combination_ids=[], add_qty=1, pricelist=None, **kw):
        """ Get variant id and price after selecting the combination on product page """
        env = request.env

        product_template = env['product.template'].browse(int(product_template_id))
        if product_template.exists():
            combination = env['product.template.attribute.value'].browse(combination_ids)
            return product_template._get_combination_info(combination, add_qty=add_qty, pricelist=pricelist)

        return {}

class WebsiteSaleController(WebsiteSale):

    @http.route(['/shop/register_payment/<int:token_id>'], type='json', auth='public', website=True)
    def json_rpc_to_register_payment(self, pm_id):
        self.payment_token(pm_id)
