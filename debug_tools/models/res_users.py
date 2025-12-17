# -*- coding: utf-8 -*-
from odoo import models, fields, _
from odoo.http import request


class ResUsers(models.Model):
    _inherit = "res.users"

    sh_enable_debug_selection = fields.Boolean('Debug Switch', default=True)

    @property
    def SELF_READABLE_FIELDS(self):
        return super().SELF_READABLE_FIELDS + ['sh_enable_debug_selection']

    @property
    def SELF_WRITEABLE_FIELDS(self):
        return super().SELF_WRITEABLE_FIELDS + ['sh_enable_debug_selection']


class IrHttp(models.AbstractModel):
    _inherit = 'ir.http'

    def session_info(self):
        info = super().session_info()
        user = request.env.user
        info["sh_enable_language_selection"] = user.sh_enable_debug_selection
        return info
