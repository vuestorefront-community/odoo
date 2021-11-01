# -*- coding: utf-8 -*-
# Copyright 2021 ODOOGAP/PROMPTEQUATION LDA
# License LGPL-3.0 or later (http://www.gnu.org/licenses/lgpl).

import werkzeug
from odoo import http
from odoo.addons.graphql_base import GraphQLControllerMixin
from odoo.addons.payment.controllers.portal import PaymentProcessing
from odoo.addons.payment_adyen.controllers.main import AdyenController
from odoo.http import request

from ..schema import schema


class VSFAdyenController(AdyenController):

    @http.route(['/payment/adyen/return'], type='http', auth='public', csrf=False)
    def adyen_return(self, **post):
        # Confirm payment transaction
        super(VSFAdyenController, self).adyen_return(**post)

        tx_ids_list = request.session.get("__payment_tx_ids__", [])

        # If the session have tx_ids_list it means that the SO payment was done in Odoo
        if tx_ids_list:
            return werkzeug.utils.redirect('/payment/process')

        # If the Session not have Transactions Associated it means that the SO payment was done in VSF
        elif not tx_ids_list and post.get('merchantReference'):
            transaction_reference = post['merchantReference']

            payment_transaction = request.env['payment.transaction'].sudo().search([
                ('reference', 'like', str(transaction_reference))
            ])

            request.session["__payment_tx_ids__"] = [payment_transaction.id]

            # Confirm sale order
            PaymentProcessing().payment_status_poll()

            # Redirect to VSF
            vsf_payment_return_url = request.env['ir.config_parameter'].sudo().get_param('vsf_payment_return_url', '')

            # Clear the payment_tx_ids
            request.session['__payment_tx_ids__'] = []

            return werkzeug.utils.redirect(vsf_payment_return_url)


class GraphQLController(http.Controller, GraphQLControllerMixin):

    def get_domain_of_request_host(self):
        """ Trying get the http_request_host, to update the language that will be used """
        try:
            request_host = request.httprequest.headers.environ['HTTP_RESQUEST_HOST']

            domain = 'https://%s' % request_host

            cr = request.env.cr

            # Query used to get the code of the default_language_id of website
            query = """
                    SELECT code 
                    FROM res_lang
                    WHERE id IN (
                        SELECT default_lang_id
                        FROM website
                        WHERE domain = %s
                    )
                """
            params = (domain,)

            cr.execute(query, params)
            query_result = cr.fetchone()

            if query_result:
                lang = query_result[0]

                # Updating the context language according to the vsf domain verifying that domain in the website
                context = dict(request.context)
                context.update({'lang': lang})
                request.context = context

        except:
            pass

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
        self.get_domain_of_request_host()
        return self._handle_graphql_request(schema)
