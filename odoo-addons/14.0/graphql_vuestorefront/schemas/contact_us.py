# -*- coding: utf-8 -*-
# Copyright 2021 ODOOGAP/PROMPTEQUATION LDA
# License LGPL-3.0 or later (http://www.gnu.org/licenses/lgpl).

import graphene

from odoo.addons.graphql_vuestorefront.schemas.objects import Lead


class ContactUsParams(graphene.InputObjectType):
    name = graphene.String(required=True)
    email = graphene.String(required=True)
    phone = graphene.Int(required=True)
    company = graphene.String()
    subject = graphene.String(required=True)
    message = graphene.String(required=True)


class ContactUs(graphene.Mutation):
    class Arguments:
        contactus = ContactUsParams()

    Output = Lead

    @staticmethod
    def mutate(self, info, contactus):
        env = info.context['env']

        data = {
            'contact_name': contactus['name'],
            'email_from': contactus['email'],
            'phone': contactus['phone'],
            'name': contactus['subject'],
            'description': contactus['message'],
        }

        # If Contact Us have one Company Name
        if contactus.get('company'):
            company = {'partner_name': contactus['company']}
            data.update(company)

        return env['crm.lead'].sudo().create(data)


class ContactUsMutation(graphene.ObjectType):
    contact_us = ContactUs.Field(description='Creates a new lead with the contact information.')
