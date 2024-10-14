import { r as e, h as t, F as i, H as s } from './p-7f61e167.js';
var a,
    n,
    d = function (e, t, i, s) {
        if ('a' === i && !s) throw new TypeError('Private accessor was defined without a getter');
        if ('function' == typeof t ? e !== t || !s : !t.has(e)) throw new TypeError('Cannot read private member from an object whose class did not declare it');
        return 'm' === i ? s : 'a' === i ? s.call(e) : s ? s.value : t.get(e);
    };
const r = class {
    constructor(t) {
        e(this, t),
            a.add(this),
            (this.json = void 0),
            (this.field_name = void 0),
            (this.delete_svg_src = '/static/admin/img/icon-deletelink.svg'),
            (this.add_svg_src = '/static/admin/img/icon-addlink.svg'),
            (this.edit_svg_src = '/static/admin/img/icon-changelink.svg'),
            (this.output_render_type = 'rows'),
            (this._json = new Array()),
            (this._json_string = '');
    }
    jsonWatcher(e) {
        d(this, a, 'm', n).call(this, e);
    }
    connectedCallback() {
        d(this, a, 'm', n).call(this, this.json);
    }
    handleDelete(e) {
        const t = this._json.filter(t => t.index !== e);
        this._json = structuredClone(t);
    }
    handleRowAdd() {
        let e = this._json;
        const t = e.at(-1);
        t ? (e.push({ index: t.index + 1, key: '', value: '' }), (this._json = structuredClone(e))) : console.error('`this._json` is empty.');
    }
    handleToggleClick() {
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
    }
    getJSONWithoutIndex() {
        return this._json.reduce((e, t) => ((e[t.key] = t.value), e), {});
    }
    updateJSONString() {
        this._json_string = JSON.stringify(this.getJSONWithoutIndex(), null, 1 === Object.keys(this._json).length ? 0 : 4);
    }
    handleTextAreaInput(e) {
        (this.json = e), this.connectedCallback();
    }
    render() {
        return t(
            s,
            { key: '4e4fd74414abf02f37274fb964ef6f8bf299a35d' },
            t(
                'textarea',
                {
                    key: '20ee76ade9d9ab74df92d88db76e2543f89ca8da',
                    class: ('textarea' === this.output_render_type ? '' : 'hidden') + ' vLargeTextField',
                    cols: 40,
                    name: `${this.field_name}`,
                    rows: 10,
                    onInput: e => {
                        this.handleTextAreaInput(e.currentTarget.value);
                    },
                },
                this._json_string,
            ),
            'rows' === this.output_render_type &&
                this._json &&
                t(
                    i,
                    { key: '7b688aa6c16e2593c9cc7675545e2e685b9a618c' },
                    this._json.map((e, i) =>
                        t(
                            'div',
                            { class: 'form-row field-data' },
                            t(
                                'div',
                                { class: 'wrapper' },
                                t('input', {
                                    value: e.key,
                                    onInput: t => {
                                        (e.key = t.currentTarget.value), this.updateJSONString();
                                    },
                                    placeholder: 'key',
                                    class: 'left',
                                }),
                                t('strong', null, ':'),
                                t('input', {
                                    value: e.value,
                                    onInput: () => {
                                        const t = event.currentTarget;
                                        (e.value = t.value), this.updateJSONString();
                                    },
                                    placeholder: 'value',
                                    class: 'right',
                                }),
                                t(
                                    'div',
                                    {
                                        class: 'centered',
                                        onClick: () => {
                                            this.handleDelete(i);
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
                { key: '0945c553b3a347ac6a9df9175c6ead36f9626847', class: 'form-row end-items' },
                t(
                    i,
                    null,
                    'rows' === this.output_render_type
                        ? t(
                              'div',
                              {
                                  class: 'centered gap-1',
                                  onClick: () => {
                                      this.handleRowAdd();
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
                        key: 'f5e472fd938d04a174e9eb49a3810778e2876b9a',
                        class: 'centered gap-1',
                        onClick: () => {
                            this.handleToggleClick();
                        },
                    },
                    'textarea' === this.output_render_type &&
                        t(
                            i,
                            { key: 'b86924d70f69c0becc74cff66c875ab7f30033c9' },
                            t('img', { key: 'f82cc90e442d9bc409ed94188a0891636cbe0128', src: this.delete_svg_src, alt: '❌' }),
                            'Close TextArea',
                        ),
                    'rows' === this.output_render_type &&
                        t(
                            i,
                            { key: '886d58122b0b0cb1d1aa4063999777fc966ee09b' },
                            t('img', { key: 'a9e3dc7a7c453fe928a7dfcd084c902905c2942f', src: this.edit_svg_src, alt: '✏️' }),
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
        (this._json = i), this.updateJSONString();
    }),
    (r.style =
        'django-hstore-widget .wrapper{display:flex;gap:10px}django-hstore-widget .left{min-width:150px}django-hstore-widget .right{min-width:300px}django-hstore-widget .centered{display:flex;align-items:center;justify-content:center}django-hstore-widget .end-items{display:flex;justify-content:space-between;align-items:center}django-hstore-widget .hidden{display:none;visibility:hidden}django-hstore-widget .gap-1{gap:0.25rem;}');
export { r as django_hstore_widget };
