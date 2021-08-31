# -*- coding: utf-8 -*-

import graphene
from graphql import GraphQLError
from odoo import _

from odoo.addons.graphql_vuestorefront.schemas.objects import Partner


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
