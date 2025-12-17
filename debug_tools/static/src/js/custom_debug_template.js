import {Component, onMounted, onWillStart, useState, useRef} from "@odoo/owl";
import {useService} from "@web/core/utils/hooks";
import { router } from "@web/core/browser/router";
import {Dropdown} from "@web/core/dropdown/dropdown";
import {DropdownItem} from "@web/core/dropdown/dropdown_item";
import {registry} from "@web/core/registry";
import { _t } from "@web/core/l10n/translation";
import { session } from "@web/session";
import { user } from "@web/core/user";

export class debug_template extends Component {
    static template = "custom_demo.debug_template"
    static components = {Dropdown, DropdownItem};

    setup() {
        this.orm = useService("orm");
        this.isDebug = Boolean(odoo.debug);
        this.isAssets = odoo.debug.includes("assets");
        this.isTests = odoo.debug.includes("tests");

        this.action = useService("action");
        this.demo = useService("demo_data");
        this.debugAreaRef = useRef("debugArea");

        onWillStart(async () => {
            this.isDemoDataActive = await this.demo.isDemoDataActive();
        });

        onMounted(async () => {
            const userData = await this.orm.searchRead(
                "res.users",
                [["id", "=", user.userId]],
                ["sh_enable_debug_selection"]
            );
            if (userData.length > 0) {
                const isDebugEnabled = userData[0].sh_enable_debug_selection;
                if (this.debugAreaRef.el) {
                    this.debugAreaRef.el.style.display = isDebugEnabled ? 'block' : 'none';
                }
            }
        });
    }

    onBeforeOpen() {
        const icons = ['fa-bug', 'fa-cogs',  'fa-database', 'fa-check-circle'];
        this.debugOptions = [
            {
                condition: !this.isDebug,
                text: _t('Activate the developer mode'),
                onclick: () => this.activateDebug(1),
                icon: icons[Math.floor(Math.random() * icons.length)],
            },
            {
                condition: !this.isAssets,
                text: _t('Activate the developer mode (with assets)'),
                onclick: () => this.activateDebug('assets'),
                icon: icons[Math.floor(Math.random() * icons.length)],
            },
            {
                condition: !this.isTests,
                text: _t('Activate the developer mode (with tests assets)'),
                onclick: () => this.activateDebug('assets,tests'),
                icon: icons[Math.floor(Math.random() * icons.length)],
            },
            {
                condition: this.isDebug,
                text: _t('Deactivate the developer mode'),
                onclick: () => this.activateDebug(0),
                icon: icons[Math.floor(Math.random() * icons.length)],
            },
            {
                condition: this.isDebug && !this.isDemoDataActive,
                text: _t('Load demo data'),
                onclick: this.onClickForceDemo,
                icon: icons[Math.floor(Math.random() * icons.length)],
                extraClass: 'o_web_settings_force_demo'
            },
        ];
    }

    activateDebug(value) {
        router.pushState({debug: value}, {reload: true});
    }
}

registry.category("systray").add("custom_demo.debug_template", {Component: debug_template}, { sequence: 30 });