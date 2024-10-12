import { p as e, H as t, h as s, F as i, c as n } from './p-c76398a1.js';
const a =
    'django-hstore-widget .wrapper{display:flex;gap:10px}django-hstore-widget .left{min-width:150px}django-hstore-widget .right{min-width:300px}django-hstore-widget .image-div{display:flex;align-items:center;justify-content:center}django-hstore-widget .end-items{display:flex;justify-content:space-between;align-items:center}';
const c = a;
var d =
    (undefined && undefined.__rest) ||
    function (e, t) {
        var s = {};
        for (var i in e) if (Object.prototype.hasOwnProperty.call(e, i) && t.indexOf(i) < 0) s[i] = e[i];
        if (e != null && typeof Object.getOwnPropertySymbols === 'function')
            for (var n = 0, i = Object.getOwnPropertySymbols(e); n < i.length; n++) {
                if (t.indexOf(i[n]) < 0 && Object.prototype.propertyIsEnumerable.call(e, i[n])) s[i[n]] = e[i[n]];
            }
        return s;
    };
const o = e(
    class e extends t {
        constructor() {
            super();
            this.__registerHost();
            this.json = undefined;
            this.field_name = undefined;
            this.delete_svg_src = '/static/admin/img/icon-deletelink.svg';
            this.add_svg_src = '/static/admin/img/icon-addlink.svg';
            this.edit_svg_src = '/static/admin/img/icon-changelink.svg';
            this._json = {};
            this.output_render_type = 'rows';
        }
        connectedCallback() {
            this._json = JSON.parse(this.json);
            this._json['hello'] = 'world';
        }
        handleDelete(e) {
            const t = Object.keys(this._json);
            if (e >= 0 && e < t.length) {
                const s = t[e];
                const i = this._json,
                    n = s,
                    a = d(i, [typeof n === 'symbol' ? n : n + '']);
                this._json = a;
            } else {
                console.error('Invalid index');
            }
        }
        handleRowAdd() {
            this._json[''] = '';
            this._json = Object.assign({}, this._json);
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
                    break;
            }
        }
        handleDataInput(e, t, s) {
            if (e in this._json && e !== t) {
                delete this._json[e];
            }
            this._json[t] = s;
            if (e !== t) {
                const e = {};
                for (const s of Object.keys(this._json)) {
                    if (s !== t) {
                        e[s] = this._json[s];
                    }
                }
                e[t] = s;
                this._json = e;
            }
        }
        render() {
            return s(
                n,
                { key: '530ab6bc12722fe7de03930e48ff930f9a705ec7' },
                s('h2', { key: 'e1916bfc573b1e00362ce8a9e22101f0d918ab72' }, this.field_name),
                this.output_render_type === 'textarea' &&
                    s(
                        i,
                        { key: 'b53aea578d386271fda140670059e1c60ce63e9e' },
                        s('textarea', {
                            key: 'b2d322e1d350991efcb980873c13a12c42646428',
                            class: 'vLargeTextField',
                            cols: 40,
                            name: `${this.field_name}`,
                            rows: 10,
                            onInput: e => {
                                const t = e.currentTarget;
                                const s = t.value;
                                this._json = Object.assign({}, JSON.parse(s));
                            },
                            value: JSON.stringify(this._json, null, Object.keys(this._json).length === 1 ? 0 : 4),
                        }),
                    ),
                this.output_render_type === 'rows' &&
                    this._json &&
                    s(
                        i,
                        { key: '2b68a57bbdc09203c8027bc53c4cfb13d4a38af4' },
                        Object.entries(this._json).map((e, t) =>
                            s(
                                'div',
                                { class: 'form-row field-data' },
                                s(
                                    'div',
                                    { class: 'wrapper' },
                                    s('input', {
                                        value: e[0],
                                        onInput: t => {
                                            const s = t.currentTarget;
                                            const i = s.value;
                                            const n = e[0];
                                            e[0] = i;
                                            this.handleDataInput(n, e[0], e[1]);
                                        },
                                        placeholder: 'key',
                                        class: 'left',
                                    }),
                                    s('strong', null, ':'),
                                    s('input', {
                                        value: e[1],
                                        onInput: t => {
                                            const s = t.currentTarget;
                                            const i = s.value;
                                            const n = e[1];
                                            e[1] = i;
                                            this.handleDataInput(n, e[0], e[1]);
                                        },
                                        placeholder: 'value',
                                        class: 'right',
                                    }),
                                    s(
                                        'div',
                                        {
                                            class: 'image-div',
                                            onClick: () => {
                                                this.handleDelete(t);
                                            },
                                        },
                                        s('img', { src: this.delete_svg_src, alt: '❌' }),
                                    ),
                                ),
                            ),
                        ),
                    ),
                s(
                    'div',
                    { key: '314bcf057fe79d1b1942924fd150f65591877ab5', class: 'form-row end-items' },
                    this.output_render_type === 'rows'
                        ? s(
                              i,
                              null,
                              s(
                                  'div',
                                  {
                                      onClick: () => {
                                          this.handleRowAdd();
                                      },
                                  },
                                  s('img', { src: this.add_svg_src, alt: '➕' }),
                                  'Add row',
                              ),
                          )
                        : s(i, null, s('div', null)),
                    s(
                        'div',
                        {
                            key: '05605ea2df4fbf9d1002f59a91d77f7f7bc9b16e',
                            onClick: () => {
                                this.handleToggleClick();
                            },
                        },
                        this.output_render_type === 'textarea' &&
                            s(
                                i,
                                { key: '7e6dc0119e5ed5df6bf3bdbe9e102ea753e87594' },
                                s('img', { key: '888bed11c2ff09014b049523024ad109d504e7a7', src: this.delete_svg_src, alt: '❌' }),
                                'Close TextArea',
                            ),
                        this.output_render_type === 'rows' &&
                            s(
                                i,
                                { key: 'a84281311af3a3b8fde1b6228ac1860ab6d0d1c6' },
                                s('img', { key: 'fadbf64976246794a1001146a4f491c984b45d63', src: this.edit_svg_src, alt: '✏️' }),
                                'Open TextArea',
                            ),
                    ),
                ),
            );
        }
        static get style() {
            return c;
        }
    },
    [0, 'django-hstore-widget', { json: [1], field_name: [1], delete_svg_src: [1], add_svg_src: [1], edit_svg_src: [1], _json: [32], output_render_type: [32] }],
);
function r() {
    if (typeof customElements === 'undefined') {
        return;
    }
    const e = ['django-hstore-widget'];
    e.forEach(e => {
        switch (e) {
            case 'django-hstore-widget':
                if (!customElements.get(e)) {
                    customElements.define(e, o);
                }
                break;
        }
    });
}
r();
const l = o;
const h = r;
export { l as DjangoHstoreWidget, h as defineCustomElement };
//# sourceMappingURL=django-hstore-widget.js.map
