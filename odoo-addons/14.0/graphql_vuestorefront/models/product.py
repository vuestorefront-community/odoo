# -*- coding: utf-8 -*-
# Copyright 2021 ODOOGAP/PROMPTEQUATION LDA
# License LGPL-3.0 or later (http://www.gnu.org/licenses/lgpl).

from odoo import models, fields, api


class ProductProduct(models.Model):
    _inherit = 'product.product'

    lst_price = fields.Float(store=True)
