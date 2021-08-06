# -*- coding: utf-8 -*-

import graphene
from graphene.types import generic

from odoo.addons.graphql_base import OdooObjectType
from odoo.addons.http_routing.models.ir_http import slug


# --------------------- #
#       ENUMS           #
# --------------------- #

class SortEnum(graphene.Enum):
    ASC = 'ASC'
    DESC = 'DESC'


# --------------------- #
#       Objects         #
# --------------------- #

class Category(OdooObjectType):
    id = graphene.ID(required=True)
    name = graphene.String()
    parent_id = graphene.List(graphene.NonNull(lambda: Category))
    slug = graphene.String()

    def resolve_parent_id(self, info):
        return self.parent_id or None

    def resolve_slug(self, info):
        return slug(self)
