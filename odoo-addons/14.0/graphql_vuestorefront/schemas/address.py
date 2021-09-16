# -*- coding: utf-8 -*-

import graphene
from graphql import GraphQLError

from odoo import _
from odoo.http import request
from odoo.addons.graphql_vuestorefront.schemas.objects import Partner


class AddressEnum(graphene.Enum):
    Billing = 'invoice'
    Shipping = 'delivery'


class AddAddressInput(graphene.InputObjectType):
    name = graphene.String(required=True)
    street = graphene.String(required=True)
    street2 = graphene.String()
    zip = graphene.String(required=True)
    city = graphene.String()
    state_id = graphene.Int()
    country_id = graphene.Int(required=True)
    phone = graphene.String(required=True)
    email = graphene.String()


class DeleteAddressInput(graphene.InputObjectType):
    id = graphene.Int(required=True)


class SelectAddressInput(graphene.InputObjectType):
    id = graphene.Int(required=True)


class UpdateAddressInput(graphene.InputObjectType):
    id = graphene.Int(required=True)
    name = graphene.String()
    street = graphene.String()
    street2 = graphene.String()
    zip = graphene.String()
    city = graphene.String()
    state_id = graphene.Int()
    country_id = graphene.Int()
    phone = graphene.String()
    email = graphene.String()


class AddAddress(graphene.Mutation):
    class Arguments:
        type = AddressEnum(required=True)
        address = AddAddressInput()

    Output = Partner

    @staticmethod
    def mutate(self, info, type, address):
        env = info.context["env"]
        ResPartner = env['res.partner'].sudo().with_context(tracking_disable=True)
        website = env['website'].get_current_website()
        request.website = website
        order = website.sale_get_order()

        if not order:
            raise GraphQLError(_('Shopping cart not found.'))

        values = {
            'name': address.get('name'),
            'street': address.get('street'),
            'street2': address.get('street2'),
            'phone': address.get('phone'),
            'zip': address.get('zip'),
            'city': address.get('city'),
            'state_id': address.get('state_id', False),
            'country_id': address.get('country_id', False),
            'email': address.get('email', False),
        }

        partner_id = order.partner_id.id

        # Check if is public user
        if partner_id == request.env.user._is_public():
            # Create main contact
            values['type'] = 'contact'
            partner_id = ResPartner.create(values).id
            order.partner_id = partner_id
            order.with_context(not_self_saleperson=True).onchange_partner_id()

        values['type'] = type
        values['parent_id'] = partner_id

        # Create the new shipping or invoice address
        partner = ResPartner.create(values)

        # Update order with the new shipping or invoice address
        if type == 'invoice':
            order.partner_invoice_id = partner.id
        elif type == 'delivery':
            order.partner_shipping_id = partner.id

        return partner


class UpdateAddress(graphene.Mutation):
    class Arguments:
        address = UpdateAddressInput(required=True)

    Output = Partner

    @staticmethod
    def mutate(self, info, address):
        env = info.context["env"]
        ResPartner = env['res.partner'].with_context(show_address=1).sudo()
        website = env['website'].get_current_website()
        request.website = website
        order = website.sale_get_order()

        if not order:
            raise GraphQLError(_('Shopping cart not found.'))

        # Addresses that belong to this user
        shippings = ResPartner.search([
            ("id", "child_of", env.user.partner_id.commercial_partner_id.ids),
            '|', ("type", "in", ["delivery", "invoice"]),
            ("id", "=", env.user.partner_id.commercial_partner_id.id)
        ], order='id desc')

        partner = ResPartner.browse(address['id'])

        # Validate if the address exists and if the user has access to this address before the update
        if not partner or not partner.exists() or partner.id not in shippings.ids:
            raise GraphQLError(_('Address not found.'))

        values = {}
        if address.get('name'):
            values.update({'name': address['name']})
        if address.get('street'):
            values.update({'street': address['street']})
        if address.get('street2'):
            values.update({'street2': address['street2']})
        if address.get('phone'):
            values.update({'phone': address['phone']})
        if address.get('zip'):
            values.update({'zip': address['zip']})
        if address.get('city'):
            values.update({'city': address['city']})
        if address.get('state_id'):
            values.update({'state_id': address['state_id']})
        if address.get('country_id'):
            values.update({'country_id': address['country_id']})
        if address.get('email'):
            values.update({'email': address['email']})

        if values:
            partner.write(values)

        # Update order with the new shipping or invoice address
        if partner.type == 'invoice':
            order.partner_invoice_id = partner.id
        elif partner.type == 'delivery':
            order.partner_shipping_id = partner.id

        return partner


class DeleteAddress(graphene.Mutation):
    class Arguments:
        address = DeleteAddressInput()

    Output = graphene.Boolean

    @staticmethod
    def mutate(self, info, address):
        env = info.context["env"]
        ResPartner = env['res.partner'].with_context(show_address=1).sudo()

        # Addresses that belong to this user
        shippings = ResPartner.search([
            ("id", "child_of", env.user.partner_id.commercial_partner_id.ids),
            '|', ("type", "in", ["delivery", "invoice"]),
            ("id", "=", env.user.partner_id.commercial_partner_id.id)
        ], order='id desc')

        partner = ResPartner.browse(address['id'])

        # Validate if the address exists and if the user has access to this address before the delete
        if not partner or not partner.exists() or partner.id not in shippings.ids:
            raise GraphQLError(_('Address not found.'))

        # Check if any sale order is using this address as invoice or shipping address
        sales = env['sale.order'].sudo().search([
            ('|'),
            ('partner_invoice_id', '=', partner.id),
            ('partner_shipping_id', '=', partner.id),
        ])

        # Update sale order to use parent instead
        for sale in sales:
            if sale.partner_invoice_id.id == partner.id:
                sale.write({
                    'partner_invoice_id': partner.parent_id.id,
                })

            elif sale.partner_shipping_id.id == partner.id:
                sale.write({
                    'partner_shipping_id': partner.parent_id.id,
                })

        # Archive address, safer than delete since this address could be in use by other object
        partner.active = False

        return True


class SelectAddress(graphene.Mutation):
    class Arguments:
        address = SelectAddressInput()

    Output = Partner

    @staticmethod
    def mutate(self, info, address):
        env = info.context["env"]
        ResPartner = env['res.partner'].with_context(show_address=1).sudo()
        website = env['website'].get_current_website()
        request.website = website
        order = website.sale_get_order()

        # Addresses that belong to this user
        shippings = ResPartner.search([
            ("id", "child_of", env.user.partner_id.commercial_partner_id.ids),
            '|', ("type", "in", ["delivery", "invoice"]),
            ("id", "=", env.user.partner_id.commercial_partner_id.id)
        ], order='id desc')

        partner = ResPartner.browse(address['id'])

        # Validate if the address exists and if the user has access to this address before the delete
        if not partner or not partner.exists() or partner.id not in shippings.ids:
            raise GraphQLError(_('Address not found.'))

        # Update order with the new shipping or invoice address
        if partner.type == 'invoice':
            order.partner_invoice_id = partner.id
        elif partner.type == 'delivery':
            order.partner_shipping_id = partner.id

        return partner


class AddressMutation(graphene.ObjectType):
    add_address = AddAddress.Field(description='Add new billing or shipping address and set it on the shopping cart.')
    update_address = UpdateAddress.Field(description="Update a billing or shipping address and set it on the shopping "
                                                     "cart.")
    delete_address = DeleteAddress.Field(description='Delete a billing or shipping address.')
    select_address = SelectAddress.Field(description="Select a billing or shipping address to be used on the shopping "
                                                     "cart.")


class AddressQuery(graphene.ObjectType):
    addresses = graphene.List(
        graphene.NonNull(Partner),
    )

    @staticmethod
    def resolve_addresses(self, info):
        env = info.context["env"]
        Partner = env['res.partner'].with_context(show_address=1).sudo()
        shippings = Partner.search([
            ("id", "child_of", env.user.partner_id.commercial_partner_id.ids),
            '|', ("type", "in", ["delivery", "invoice"]),
            ("id", "=", env.user.partner_id.commercial_partner_id.id)
        ], order='id desc')
        return shippings
