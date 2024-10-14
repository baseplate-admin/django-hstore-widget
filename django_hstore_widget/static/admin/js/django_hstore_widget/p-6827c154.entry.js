import { r as t, h as e, F as i, H as s } from './p-7f61e167.js';
var n,
    r,
    o,
    a,
    h,
    l,
    c,
    d,
    u,
    g = function (t, e, i, s) {
        if ('a' === i && !s) throw new TypeError('Private accessor was defined without a getter');
        if ('function' == typeof e ? t !== e || !s : !e.has(t)) throw new TypeError('Cannot read private member from an object whose class did not declare it');
        return 'm' === i ? s : 'a' === i ? s.call(t) : s ? s.value : e.get(t);
    };
const m = class {
    constructor(e) {
        t(this, e),
            n.add(this),
            (this.json = void 0),
            (this.field_name = void 0),
            (this.delete_svg_src = '/static/admin/img/icon-deletelink.svg'),
            (this.add_svg_src = '/static/admin/img/icon-addlink.svg'),
            (this.edit_svg_src = '/static/admin/img/icon-changelink.svg'),
            (this.output_render_type = 'rows'),
            (this._json = new Array());
    }
    jsonWatcher(t) {
        g(this, n, 'm', r).call(this, t);
    }
    connectedCallback() {
        g(this, n, 'm', r).call(this, this.json);
    }
    render() {
        if (!(this._json.length > 0 && Array.isArray(this._json)))
            return e(
                s,
                null,
                e(
                    'div',
                    { class: 'flex items-center justify-center gap-1' },
                    e('p', null, 'The provided json is ', e('code', null, this.json), ' which is not valid.'),
                    e('p', null, 'Please check the the json or ', e('a', { href: 'https://github.com/baseplate-admin/django-hstore-widget/issues' }, 'file an issue at Github')),
                ),
            );
        e(
            s,
            null,
            e(
                'textarea',
                {
                    class: ('textarea' === this.output_render_type ? '' : 'hidden') + ' vLargeTextField',
                    cols: 40,
                    name: this.field_name,
                    rows: 10,
                    onInput: t => g(this, n, 'm', l).call(this, t),
                },
                g(this, n, 'm', u).call(this),
            ),
            'rows' === this.output_render_type &&
                this._json &&
                e(
                    i,
                    null,
                    this._json.map(t =>
                        e(
                            'div',
                            { class: 'form-row field-data', key: t.index },
                            e(
                                'div',
                                { class: 'wrapper' },
                                e('input', { value: t.key, onInput: e => g(this, n, 'm', c).call(this, e, t), placeholder: 'key', class: 'left' }),
                                e('strong', null, ':'),
                                e('input', { value: t.value, onInput: e => g(this, n, 'm', d).call(this, e, t), placeholder: 'value', class: 'right' }),
                                e(
                                    'div',
                                    { class: 'items-center justify-center flex', onClick: () => g(this, n, 'm', o).call(this, t.index) },
                                    e('img', { src: this.delete_svg_src, alt: '❌' }),
                                ),
                            ),
                        ),
                    ),
                ),
            e(
                'div',
                { class: 'form-row end-items flex' },
                e(
                    i,
                    null,
                    'rows' === this.output_render_type
                        ? e(
                              'div',
                              { class: 'items-center justify-center flex gap-1', onClick: () => g(this, n, 'm', a).call(this) },
                              e('img', { src: this.add_svg_src, alt: '➕' }),
                              'Add row',
                          )
                        : e('div', null),
                ),
                e(
                    'div',
                    {
                        class: 'items-center justify-center flex gap-1',
                        onClick: () => {
                            g(this, n, 'm', h).call(this);
                        },
                    },
                    'textarea' === this.output_render_type && e(i, null, e('img', { src: this.delete_svg_src, alt: '❌' }), 'Close TextArea'),
                    'rows' === this.output_render_type && e(i, null, e('img', { src: this.edit_svg_src, alt: '✏️' }), 'Open TextArea'),
                ),
            ),
        );
    }
    static get watchers() {
        return { json: ['jsonWatcher'] };
    }
};
(n = new WeakSet()),
    (r = function (t) {
        try {
            let e = JSON.parse(t),
                i = Object.keys(e).map((t, i) => ({ key: t, value: e[t], index: i }));
            this._json = i;
        } catch (t) {
            console.error(t), (this._json = []);
        }
    }),
    (o = function (t) {
        const e = this._json.filter(e => e.index !== t);
        this._json = structuredClone(e);
    }),
    (a = function () {
        let t = this._json;
        const e = t.at(-1);
        t.push({ index: e ? e.index + 1 : 0, key: '', value: '' }), (this._json = structuredClone(t));
    }),
    (h = function () {
        'rows' === this.output_render_type
            ? (this.output_render_type = 'textarea')
            : 'textarea' === this.output_render_type
            ? (this.output_render_type = 'rows')
            : console.error('Something is wrong with `output_render_type`');
    }),
    (l = function (t) {
        const e = t.currentTarget.value;
        (this.json = e), g(this, n, 'm', r).call(this, e);
    }),
    (c = function (t, e) {
        (e.key = t.currentTarget.value), (this._json = structuredClone(this._json));
    }),
    (d = function (t, e) {
        (e.value = t.currentTarget.value), (this._json = structuredClone(this._json));
    }),
    (u = function () {
        const t = this._json.reduce((t, e) => ((t[e.key] = e.value), t), {});
        return JSON.stringify(t, null, 1 === Object.keys(t).length ? 0 : 4);
    }),
    (m.style =
        'django-hstore-widget .wrapper{display:flex;gap:10px}django-hstore-widget .left{min-width:150px}django-hstore-widget .right{min-width:300px}django-hstore-widget .flex{display:flex}django-hstore-widget .justify-center{justify-content:center}django-hstore-widget .items-center{align-items:center}django-hstore-widget .end-items{justify-content:space-between;align-items:center}django-hstore-widget .flex-col{flex-direction:column}django-hstore-widget .hidden{display:none;visibility:hidden}django-hstore-widget .gap-1{gap:0.25rem;}');
export { m as django_hstore_widget };
