# -*- coding: utf-8 -*-
################################################################################
#    Author: Don Shan
#
################################################################################
{
    'name': 'Debug Tools',
    'version': '18.0.1.0.0',
    'category': 'Extra Tools',
    'summary': """Debug Tools""",
    'description': """More convenient way to enable debug mode.""",
    'author': 'Don Shan',
    'maintainer': 'Don Shan',
    'depends': ['base'],
    'data': [
        'views/res_users_views.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'debug_tools/static/src/js/**/*',
            'debug_tools/static/src/xml/**/*',
        ],
    },
    'images': ['static/description/icon.png'],
    'license': 'AGPL-3',
    'installable': True,
    'auto_install': False,
    'application': False,
    'price': 8,
    'currency': "USD",
}
