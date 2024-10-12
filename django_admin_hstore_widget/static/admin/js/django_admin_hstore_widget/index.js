import { DjangoHstoreWidget as t } from './django-hstore-widget.js';
export { g as getAssetPath, s as setAssetPath, a as setNonce, b as setPlatformOptions } from './django-hstore-widget.js';
const e = s => {
    if (typeof customElements !== 'undefined') {
        [t].forEach(t => {
            if (!customElements.get(t.is)) {
                customElements.define(t.is, t, s);
            }
        });
    }
};
export { e as defineCustomElements };
//# sourceMappingURL=index.js.map
