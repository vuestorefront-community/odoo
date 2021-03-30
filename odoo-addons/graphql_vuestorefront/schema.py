# Copyright 2021 ODOOGAP/PROMPTEQUATION LDA
# License LGPL-3.0 or later (http://www.gnu.org/licenses/lgpl).

# disable undefined variable error, which erroneously triggers
# on forward declarations of classes in lambdas
# pylint: disable=E0602

import graphene

from odoo import _
from odoo.exceptions import UserError

from odoo.addons.graphql_base import OdooObjectType


class Country(OdooObjectType):
    code = graphene.String(required=True)
    name = graphene.String(required=True)


class User(OdooObjectType):
    name = graphene.String(required=True)
    login = graphene.String()
    password = graphene.String()
    new_password = graphene.String()


class Partner(OdooObjectType):
    name = graphene.String(required=True)
    street = graphene.String()
    street2 = graphene.String()
    city = graphene.String()
    zip = graphene.String()
    country = graphene.Field(Country)
    email = graphene.String()
    phone = graphene.String()
    is_company = graphene.Boolean(required=True)
    contacts = graphene.List(graphene.NonNull(lambda: Partner), required=True)

    @staticmethod
    def resolve_country(root, info):
        return root.country_id or None

    @staticmethod
    def resolve_contacts(root, info):
        return root.child_ids


class Category(OdooObjectType):
    id = graphene.ID()
    name = graphene.String(required=True)
    slug = graphene.String()
    items = graphene.List(graphene.NonNull(lambda: Category), required=True)

    @staticmethod
    def resolve_slug(root, info):
        name = root.name
        new_name = name.lower()
        new_name = new_name.replace("-", "")
        new_name = new_name.replace(" ", "-")
        return new_name

    @staticmethod
    def resolve_items(root, info):
        return root.child_id


class Attribute(OdooObjectType):
    id = graphene.ID()
    name = graphene.String()
    display_name = graphene.String()

    @staticmethod
    def resolve_display_name(root, info):
        return root.product_attribute_value_id.display_name


class Currency(OdooObjectType):
    id = graphene.ID()
    name = graphene.String()
    symbol = graphene.String()


class Product(OdooObjectType):
    id = graphene.ID()
    name = graphene.String()
    sku = graphene.String()
    display_name = graphene.String()
    description = graphene.String()
    image = graphene.String()
    default_code = graphene.String()
    list_price = graphene.Float()
    lst_price = graphene.Float()
    rating_count = graphene.Int()
    rating_avg = graphene.Float()
    currency = graphene.Field(Currency)
    categories_ref = graphene.List(graphene.NonNull(lambda: Category))
    attributes = graphene.List(graphene.NonNull(lambda: Attribute))

    @staticmethod
    def resolve_sku(root, info):
        name = root.name
        new_name = name.lower()
        new_name = new_name.replace("-", "")
        new_name = new_name.replace(" ", "-")
        return new_name

    @staticmethod
    def resolve_description(root, info):
        return root.description_sale or None

    @staticmethod
    def resolve_image(root, info):
        base_url = info.context["env"]['ir.config_parameter'].sudo().get_param('web.base.url')
        return str(base_url)+"/web/image?model=product.product&id="+str(root.id)+"&field=image_1920" or None

    @staticmethod
    def resolve_currency(root, info):
        return root.currency_id or None

    @staticmethod
    def resolve_categories_ref(root, info):
        return root.public_categ_ids or None

    @staticmethod
    def resolve_attributes(root, info):
        return root.product_template_attribute_value_ids or None


class Item(OdooObjectType):
    id = graphene.ID()
    name = graphene.String()
    product_tmpl_id = graphene.Field(Product)
    min_quantity = graphene.Float()
    applied_on = graphene.String()
    price_discount = graphene.Float()


class CountryGroup(OdooObjectType):
    id = graphene.ID()
    name = graphene.String()


class Pricelist(OdooObjectType):
    id = graphene.ID()
    name = graphene.String(required=True)
    active = graphene.Boolean()
    item_ids = graphene.List(graphene.NonNull(lambda: Item))
    currency_id = graphene.Field(Currency)
    country_group_ids = graphene.List(graphene.NonNull(lambda: CountryGroup))
    website = graphene.String()
    selectable = graphene.Boolean()

    @staticmethod
    def resolve_website(root, info):
        return root.website_id.name or None


class Query(graphene.ObjectType):
    all_partners = graphene.List(
        graphene.NonNull(Partner),
        required=True,
        companies_only=graphene.Boolean(),
        limit=graphene.Int(),
        offset=graphene.Int(),
    )

    all_categories = graphene.List(
        graphene.NonNull(Category),
        required=True,
        id=graphene.ID(),
        name=graphene.String(),
        parents_only=graphene.Boolean(),
        limit=graphene.Int(),
        offset=graphene.Int(),
    )

    all_products = graphene.List(
        graphene.NonNull(Product),
        required=True,
        id=graphene.ID(),
        name=graphene.String(),
        website_published=graphene.Boolean(),
        limit=graphene.Int(),
        offset=graphene.Int(),
    )

    all_pricelists = graphene.List(
        graphene.NonNull(Pricelist),
        required=True,
        limit=graphene.Int(),
        offset=graphene.Int(),
    )

    reverse = graphene.String(
        required=True,
        description="Reverse a string",
        word=graphene.String(required=True),
    )

    error_example = graphene.String()

    @staticmethod
    def resolve_all_partners(root, info, companies_only=False, limit=None, offset=None):
        domain = []
        if companies_only:
            domain.append(('is_company', '=', True))
        return info.context['env']['res.partner'].search(
            domain, limit=limit, offset=offset
        )

    @staticmethod
    def resolve_all_categories(root, info, id=None, name=False, parents_only=False, limit=None, offset=None):
        domain = []
        if id:
            domain.append(('id', '=', id))
        if name:
            domain.append(('name', '=', name))
        if parents_only:
            domain.append(('parent_id', '=', None))
        return info.context['env']['product.public.category'].search(
            domain, limit=limit, offset=offset
        )

    @staticmethod
    def resolve_all_products(root, info, id=None, name=False, website_published=False, limit=None, offset=None):
        domain = []
        if id:
            domain.append(('id', '=', id))
        if name:
            domain.append(('name', '=', name))
        if website_published:
            domain.append(('website_published', '=', True))
        return info.context['env']['product.product'].search(
            domain, limit=limit, offset=offset
        )

    @staticmethod
    def resolve_all_pricelists(root, info, limit=None, offset=None):
        domain = []
        return info.context['env']['product.pricelist'].search(
            domain, limit=limit, offset=offset
        )

    @staticmethod
    def resolve_reverse(root, info, word):
        return word[::-1]

    @staticmethod
    def resolve_error_example(root, info):
        raise UserError(_("UserError example"))


class CreatePartner(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        email = graphene.String(required=True)
        is_company = graphene.Boolean()
        raise_after_create = graphene.Boolean()

    Output = Partner

    @staticmethod
    def mutate(self, info, name, email, is_company=False, raise_after_create=False):
        env = info.context["env"]
        exist_email = env["res.partner"].search([('email', '=', email)])
        if exist_email:
            raise UserError(_("Email already exist, please verify if you already have a account"))
        else:
            partner = env["res.partner"].create(
                {"name": name, "email": email, "is_company": is_company}
            )
        if raise_after_create:
            raise UserError(_("as requested"))
        return partner


class SignupUser(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        login = graphene.String(required=True)
        password = graphene.String(required=True)
        sel_groups_1_9_10 = graphene.Int()
        raise_after_create = graphene.Boolean()

    Output = User

    @staticmethod
    def mutate(self, info, name, login, password, raise_after_create=False):
        env = info.context["env"]
        user = env["res.users"].create(
            {"name": name, "login": login, "password": password, "sel_groups_1_9_10": 9}
        )
        if raise_after_create:
            raise UserError(_("as requested"))
        return user


class Mutation(graphene.ObjectType):
    create_partner = CreatePartner.Field(description="Documentation of CreatePartner")
    signup_user = SignupUser.Field(description="Documentation of SignupUser")


schema = graphene.Schema(query=Query, mutation=Mutation)
