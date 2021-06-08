# Copyright 2021 ODOOGAP/PROMPTEQUATION LDA
# License LGPL-3.0 or later (http://www.gnu.org/licenses/lgpl).

from odoo import http
from odoo.addons.graphql_base import GraphQLControllerMixin
from odoo.addons.sale.controllers.variant import VariantController
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
        res = {}

        product_template = request.env['product.template'].browse(int(product_template_id))
        if product_template.exists():
            for ptal in product_template.valid_product_template_attribute_line_ids:
                for ptav in ptal.product_template_value_ids._only_active():
                    res.update({
                        'attribute_value_id': ptav.id,
                        'attribute_value_name': ptav.name,
                        'attribute_id': ptav.attribute_id.name,
                        'price_extra': ptav.price_extra,
                    })

        return res
