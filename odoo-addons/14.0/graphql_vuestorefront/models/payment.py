# -*- coding: utf-8 -*-
# Copyright 2021 ODOOGAP/PROMPTEQUATION LDA
# License LGPL-3.0 or later (http://www.gnu.org/licenses/lgpl).

from odoo import models


class PaymentAcquirer(models.Model):
    _inherit = 'payment.acquirer'

    def adyen_form_generate_values(self, values):
        """ Inject VSF return url and generate new merchant signature """
        values = super(PaymentAcquirer, self).adyen_form_generate_values(values)

        values['resURL'] = self.env['ir.config_parameter'].sudo().get_param('vsf_payment_return_url', '')

        if self.provider == 'adyen' and len(self.adyen_skin_hmac_key) == 64:
            values['merchantSig'] = self._adyen_generate_merchant_sig_sha256('in', values)
        else:
            values['merchantSig'] = self._adyen_generate_merchant_sig('in', values)
        return values
