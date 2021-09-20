# -*- coding: utf-8 -*-

import graphene
from graphql import GraphQLError
from odoo import _
from odoo.http import request

from odoo.addons.graphql_vuestorefront.schemas.objects import Partner


class UserProfileQuery(graphene.ObjectType):
    partner = graphene.Field(
        Partner,
        required=True,
    )

    @staticmethod
    def resolve_partner(self, info):
        uid = request.session.uid
        user = info.context['env']['res.users'].sudo().browse(uid)
        if user:
            partner = user.partner_id
            if not partner:
                raise GraphQLError(_('Partner does not exist.'))
        else:
            raise GraphQLError(_('User does not exist.'))
        return partner


class UpdateMyAccountParams(graphene.InputObjectType):
    id = graphene.Int(required=True)
    name = graphene.String()
    email = graphene.String()


class UpdateMyAccount(graphene.Mutation):
    class Arguments:
        myaccount = UpdateMyAccountParams()

    Output = Partner

    @staticmethod
    def mutate(self, info, myaccount):
        env = info.context["env"]
        ResPartner = env['res.partner'].with_context(show_address=1).sudo()
        partner = ResPartner.search([('id', '=', myaccount['id'])], limit=1)
        if partner:
            partner.write(myaccount)
        else:
            raise GraphQLError(_('Partner does not exist.'))
        return partner


class UserProfileMutation(graphene.ObjectType):
    update_my_account = UpdateMyAccount.Field(description='Update MyAccount')
