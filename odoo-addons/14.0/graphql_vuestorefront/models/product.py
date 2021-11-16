# -*- coding: utf-8 -*-
# Copyright 2021 ODOOGAP/PROMPTEQUATION LDA
# License LGPL-3.0 or later (http://www.gnu.org/licenses/lgpl).

import requests
from odoo import models, fields, api


class ProductTemplate(models.Model):
    _inherit = 'product.template'

    def _set_vsf_tags(self):
        for product in self:
            tags = []
            product_tag = 'P%s' % product.id
            tags.append(product_tag)
            category_ids = product.public_categ_ids.ids
            for category_id in category_ids:
                tags.append('C%s' % category_id)
            product._vsf_request_cache_invalidation(tags)

    def _vsf_request_cache_invalidation(self, tags_list):
        url = self.env['ir.config_parameter'].sudo().get_param('vsf_cache_invalidation_url')
        key = self.env['ir.config_parameter'].sudo().get_param('vsf_cache_invalidation_key')
        tags = tags_list

        # Make the GET request to the /cache-invalidate
        requests.get(url, params={'key': key, 'tag': tags})

    def write(self, vals):
        res = super(ProductTemplate, self).write(vals)
        self._set_vsf_tags()
        return res

    def unlink(self):
        self._set_vsf_tags()
        return super(ProductTemplate, self).unlink()


class ProductPublicCategory(models.Model):
    _inherit = 'product.public.category'

    def _set_vsf_tags(self):
        for category in self:
            tags = 'C%s' % category.id
            category._vsf_request_cache_invalidation(tags)

    def _vsf_request_cache_invalidation(self, tags_list):
        url = self.env['ir.config_parameter'].sudo().get_param('vsf_cache_invalidation_url')
        key = self.env['ir.config_parameter'].sudo().get_param('vsf_cache_invalidation_key')
        tags = tags_list

        # Make the GET request to the /cache-invalidate
        requests.get(url, params={'key': key, 'tag': tags})

    def write(self, vals):
        res = super(ProductPublicCategory, self).write(vals)
        self._set_vsf_tags()
        return res

    def unlink(self):
        self._set_vsf_tags()
        return super(ProductPublicCategory, self).unlink()
