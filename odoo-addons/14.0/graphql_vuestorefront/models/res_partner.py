# -*- coding: utf-8 -*-

from uuid import uuid4
from odoo import api, models, exceptions, _
from odoo.addons.auth_signup.models.res_partner import now


class ResPartner(models.Model):
    _inherit = 'res.partner'

    def signup_prepare(self, signup_type="signup", expiration=False):
        """Complete overwrite method to replace random url with uuid"""
        for partner in self:
            if expiration or not partner.signup_valid:
                token = uuid4().hex
                while self._signup_retrieve_partner(token):
                    token = uuid4().hex
                if not expiration and signup_type == 'reset':
                    expiration = now(days=+1)
                partner.write({'signup_token': token, 'signup_type': signup_type, 'signup_expiration': expiration})
        return True

    @api.model
    def _signup_retrieve_partner(self, token, check_validity=False, raise_exception=False):
        """Complete overwrite method to improve error message"""
        partner = self.search([('signup_token', '=', token)], limit=1)
        if not partner:
            if raise_exception:
                raise exceptions.UserError(_("Token '%s' is not valid") % token)
            return False
        if check_validity and not partner.signup_valid:
            if raise_exception:
                raise exceptions.UserError(_("Token '%s' is no longer valid") % token)
            return False
        return partner
