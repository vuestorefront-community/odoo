# -*- coding: utf-8 -*-
# Copyright 2021 ODOOGAP/PROMPTEQUATION LDA
# License LGPL-3.0 or later (http://www.gnu.org/licenses/lgpl).

import logging

from odoo import api, models, _
from odoo.addons.auth_signup.models.res_partner import now
from odoo.exceptions import UserError

_logger = logging.getLogger(__name__)


class ResUsers(models.Model):
    _inherit = 'res.users'

    def api_action_reset_password(self):
        """ create signup token for each user, and send their signup url by email """
        # prepare reset password signup
        create_mode = bool(self.env.context.get('create_user'))

        # no time limit for initial invitation, only for reset password
        expiration = False if create_mode else now(days=+1)

        self.mapped('partner_id').signup_prepare(signup_type="reset", expiration=expiration)

        # send email to users with their signup url
        template = self.env.ref('graphql_vuestorefront.website_reset_password_email')

        assert template._name == 'mail.template'

        api_reset_password_url = self.env['ir.config_parameter'].sudo().get_param('api_reset_password_url')

        if not api_reset_password_url:
            raise UserError(_('Please define the API Reset Password URL.'))

        template_values = {
            'email_to': '${object.email|safe}',
            'email_cc': False,
            'auto_delete': True,
            'partner_to': False,
            'scheduled_date': False
        }
        template.write(template_values)

        for user in self:
            token = user.signup_token
            signup_url = "%s?token=%s" % (api_reset_password_url, token)
            if not user.email:
                raise UserError(_("Cannot send email: user %s has no email address.") % user.name)
            with self.env.cr.savepoint():
                template.with_context(lang=user.lang, signup_url=signup_url).send_mail(user.id, force_send=not create_mode, raise_exception=True)
            _logger.info("Password reset email sent for user <%s> to <%s>", user.login, user.email)
