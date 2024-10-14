import { r as e, h as t, F as i, H as s } from './p-7f61e167.js';
var a,
    n,
    c,
    d,
    r,
    o,
    h,
    l = function (e, t, i, s) {
        if ('a' === i && !s) throw new TypeError('Private accessor was defined without a getter');
        if ('function' == typeof t ? e !== t || !s : !t.has(e)) throw new TypeError('Cannot read private member from an object whose class did not declare it');
        return 'm' === i ? s : 'a' === i ? s.call(e) : s ? s.value : t.get(e);
    };
const f = class {
    constructor(t) {
        e(this, t),
            a.add(this),
            (this.json = void 0),
            (this.field_name = void 0),
            (this.delete_svg_src = '/static/admin/img/icon-deletelink.svg'),
            (this.add_svg_src = '/static/admin/img/icon-addlink.svg'),
            (this.edit_svg_src = '/static/admin/img/icon-changelink.svg'),
            (this.output_render_type = 'rows'),
            (this._json = new Array());
    }
    jsonWatcher(e) {
        l(this, a, 'm', n).call(this, e);
    }
    connectedCallback() {
        l(this, a, 'm', n).call(this, this.json);
    }
    render() {
        return t(
            s,
            { key: '4d0c0b3c83120ab754192748a7e4364af1eeaffe' },
            t(
                'textarea',
                {
                    key: 'bb09cb7513e8feff94c80d30f64ac4815c067b37',
                    class: ('textarea' === this.output_render_type ? '' : 'hidden') + ' vLargeTextField',
                    cols: 40,
                    name: this.field_name,
                    rows: 10,
                    onInput: e => l(this, a, 'm', o).call(this, e),
                },
                l(this, a, 'm', h).call(this),
            ),
            'rows' === this.output_render_type &&
                this._json &&
                t(
                    i,
                    { key: 'd90fa2fa1cc8ddc906045abbf4a544c09f581623' },
                    this._json.map((e, i) =>
                        t(
                            'div',
                            { class: 'form-row field-data', key: e.index },
                            t(
                                'div',
                                { class: 'wrapper' },
                                t('input', {
                                    value: e.key,
                                    onInput: t => {
                                        (e.key = t.currentTarget.value), (this._json = structuredClone(this._json));
                                    },
                                    placeholder: 'key',
                                    class: 'left',
                                }),
                                t('strong', null, ':'),
                                t('input', {
                                    value: e.value,
                                    onInput: t => {
                                        (e.value = t.currentTarget.value), (this._json = structuredClone(this._json));
                                    },
                                    placeholder: 'value',
                                    class: 'right',
                                }),
                                t(
                                    'div',
                                    {
                                        class: 'centered',
                                        onClick: () => {
                                            l(this, a, 'm', c).call(this, i);
                                        },
                                    },
                                    t('img', { src: this.delete_svg_src, alt: '❌' }),
                                ),
                            ),
                        ),
                    ),
                ),
            t(
                'div',
                { key: 'af2ccd8029c357612e3cddd5faf17c0abbd9009b', class: 'form-row end-items' },
                t(
                    i,
                    null,
                    'rows' === this.output_render_type
                        ? t(
                              'div',
                              {
                                  class: 'centered gap-1',
                                  onClick: () => {
                                      l(this, a, 'm', d).call(this);
                                  },
                              },
                              t('img', { src: this.add_svg_src, alt: '➕' }),
                              'Add row',
                          )
                        : t('div', null),
                ),
                t(
                    'div',
                    {
                        key: '1e1545fefe9dc33bc6ba2d4dc9b10608097834e8',
                        class: 'centered gap-1',
                        onClick: () => {
                            l(this, a, 'm', r).call(this);
                        },
                    },
                    'textarea' === this.output_render_type &&
                        t(
                            i,
                            { key: '3487fe138d18cda2d67f8353e81d2dfa514c0671' },
                            t('img', { key: '90456fab09e986ccf1585ed8091f563a4d0cf44e', src: this.delete_svg_src, alt: '❌' }),
                            'Close TextArea',
                        ),
                    'rows' === this.output_render_type &&
                        t(
                            i,
                            { key: '818c157f5d8fa7d24d223b503e46a282ec9a441f' },
                            t('img', { key: '0c7fab7cdc0189eb5cdfab88dbd5bd1482d95b59', src: this.edit_svg_src, alt: '✏️' }),
                            'Open TextArea',
                        ),
                ),
            ),
        );
    }
    static get watchers() {
        return { json: ['jsonWatcher'] };
    }
};
(a = new WeakSet()),
    (n = function (e) {
        let t = JSON.parse(e),
            i = Object.keys(t).map((e, i) => ({ key: e, value: t[e], index: i }));
        this._json = i;
    }),
    (c = function (e) {
        const t = this._json.filter(t => t.index !== e);
        this._json = structuredClone(t);
    }),
    (d = function () {
        let e = this._json;
        const t = e.at(-1);
        e.push({ index: t ? t.index + 1 : 0, key: '', value: '' }), (this._json = structuredClone(e));
    }),
    (r = function () {
        switch (this.output_render_type) {
            case 'rows':
                this.output_render_type = 'textarea';
                break;
            case 'textarea':
                this.output_render_type = 'rows';
                break;
            default:
                console.error('Something is wrong with `output_render_type`');
        }
    }),
    (o = function (e) {
        const t = e.currentTarget.value;
        (this.json = t), l(this, a, 'm', n).call(this, t);
    }),
    (h = function () {
        const e = this._json.reduce((e, t) => ((e[t.key] = t.value), e), {});
        return JSON.stringify(e, null, 1 === Object.keys(e).length ? 0 : 4);
    }),
    (f.style =
        'django-hstore-widget .wrapper{display:flex;gap:10px}django-hstore-widget .left{min-width:150px}django-hstore-widget .right{min-width:300px}django-hstore-widget .centered{display:flex;align-items:center;justify-content:center}django-hstore-widget .end-items{display:flex;justify-content:space-between;align-items:center}django-hstore-widget .hidden{display:none;visibility:hidden}django-hstore-widget .gap-1{gap:0.25rem;}');
export { f as django_hstore_widget };
