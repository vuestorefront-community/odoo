# -*- coding: utf-8 -*-

import jwt
from odoo import models
from odoo.exceptions import AccessDenied
from odoo.http import request


class IrHttp(models.AbstractModel):
    _inherit = 'ir.http'

    @classmethod
    def _auth_method_public(cls):
        """ Authenticates user with the JWT in the Authorization header using the Bearer schema """
        headers = request.httprequest.environ
        jwt_token = headers.get('HTTP_AUTHORIZATION', '').replace('Bearer ', '')
        if jwt_token:
            jwt_secret = request.env['ir.config_parameter'].sudo().get_param('jwt_secret', '')

            try:
                decode_token = jwt.decode(jwt_token, jwt_secret, algorithms=['HS256'])
                user = request.env['res.users'].sudo().search([('id', '=', decode_token['uid'])], limit=1)
                if user.exists():
                    request._env = None
                    request.uid = user.id
                    return True
            except jwt.ExpiredSignatureError:
                raise AccessDenied('Token expired.')
            except jwt.InvalidTokenError:
                raise AccessDenied('Invalid Token.')

        super(IrHttp, cls)._auth_method_public()
