import { r as e, h as t, F as i, H as s } from './p-f350f2d0.js';
const a =
    'django-hstore-widget .wrapper{display:flex;gap:10px}django-hstore-widget .left{min-width:150px}django-hstore-widget .right{min-width:300px}django-hstore-widget .image-div{display:flex;align-items:center;justify-content:center}django-hstore-widget .end-items{display:flex;justify-content:space-between;align-items:center}';
const n = a;
var c =
    (undefined && undefined.__rest) ||
    function (e, t) {
        var i = {};
        for (var s in e)
            if (Object.prototype.hasOwnProperty.call(e, s) && t.indexOf(s) < 0)
                i[s] = e[s];
        if (e != null && typeof Object.getOwnPropertySymbols === 'function')
            for (
                var a = 0, s = Object.getOwnPropertySymbols(e);
                a < s.length;
                a++
            ) {
                if (
                    t.indexOf(s[a]) < 0 &&
                    Object.prototype.propertyIsEnumerable.call(e, s[a])
                )
                    i[s[a]] = e[s[a]];
            }
        return i;
    };
const d = class {
    constructor(t) {
        e(this, t);
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
            const i = t[e];
            const s = this._json,
                a = i,
                n = c(s, [typeof a === 'symbol' ? a : a + '']);
            this._json = n;
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
    handleDataInput(e, t, i) {
        if (e in this._json && e !== t) {
            delete this._json[e];
        }
        this._json[t] = i;
        if (e !== t) {
            const e = {};
            for (const i of Object.keys(this._json)) {
                if (i !== t) {
                    e[i] = this._json[i];
                }
            }
            e[t] = i;
            this._json = e;
        }
    }
    render() {
        return t(
            s,
            { key: '530ab6bc12722fe7de03930e48ff930f9a705ec7' },
            this.output_render_type === 'textarea' &&
                t(
                    i,
                    { key: 'b53aea578d386271fda140670059e1c60ce63e9e' },
                    t('textarea', {
                        key: 'b2d322e1d350991efcb980873c13a12c42646428',
                        class: 'vLargeTextField',
                        cols: 40,
                        name: `${this.field_name}`,
                        rows: 10,
                        onInput: (e) => {
                            const t = e.currentTarget;
                            const i = t.value;
                            this._json = Object.assign({}, JSON.parse(i));
                        },
                        value: JSON.stringify(
                            this._json,
                            null,
                            Object.keys(this._json).length === 1 ? 0 : 4
                        ),
                    })
                ),
            this.output_render_type === 'rows' &&
                this._json &&
                t(
                    i,
                    { key: '2b68a57bbdc09203c8027bc53c4cfb13d4a38af4' },
                    Object.entries(this._json).map((e, i) =>
                        t(
                            'div',
                            { class: 'form-row field-data' },
                            t(
                                'div',
                                { class: 'wrapper' },
                                t('input', {
                                    value: e[0],
                                    onInput: (t) => {
                                        const i = t.currentTarget;
                                        const s = i.value;
                                        const a = e[0];
                                        e[0] = s;
                                        this.handleDataInput(a, e[0], e[1]);
                                    },
                                    placeholder: 'key',
                                    class: 'left',
                                }),
                                t('strong', null, ':'),
                                t('input', {
                                    value: e[1],
                                    onInput: (t) => {
                                        const i = t.currentTarget;
                                        const s = i.value;
                                        const a = e[1];
                                        e[1] = s;
                                        this.handleDataInput(a, e[0], e[1]);
                                    },
                                    placeholder: 'value',
                                    class: 'right',
                                }),
                                t(
                                    'div',
                                    {
                                        class: 'image-div',
                                        onClick: () => {
                                            this.handleDelete(i);
                                        },
                                    },
                                    t('img', {
                                        src: this.delete_svg_src,
                                        alt: '❌',
                                    })
                                )
                            )
                        )
                    )
                ),
            t(
                'div',
                {
                    key: '314bcf057fe79d1b1942924fd150f65591877ab5',
                    class: 'form-row end-items',
                },
                this.output_render_type === 'rows'
                    ? t(
                          i,
                          null,
                          t(
                              'div',
                              {
                                  onClick: () => {
                                      this.handleRowAdd();
                                  },
                              },
                              t('img', { src: this.add_svg_src, alt: '➕' }),
                              'Add row'
                          )
                      )
                    : t(i, null, t('div', null)),
                t(
                    'div',
                    {
                        key: '05605ea2df4fbf9d1002f59a91d77f7f7bc9b16e',
                        onClick: () => {
                            this.handleToggleClick();
                        },
                    },
                    this.output_render_type === 'textarea' &&
                        t(
                            i,
                            { key: '7e6dc0119e5ed5df6bf3bdbe9e102ea753e87594' },
                            t('img', {
                                key: '888bed11c2ff09014b049523024ad109d504e7a7',
                                src: this.delete_svg_src,
                                alt: '❌',
                            }),
                            'Close TextArea'
                        ),
                    this.output_render_type === 'rows' &&
                        t(
                            i,
                            { key: 'a84281311af3a3b8fde1b6228ac1860ab6d0d1c6' },
                            t('img', {
                                key: 'fadbf64976246794a1001146a4f491c984b45d63',
                                src: this.edit_svg_src,
                                alt: '✏️',
                            }),
                            'Open TextArea'
                        )
                )
            )
        );
    }
};
d.style = n;
export { d as django_hstore_widget };
//# sourceMappingURL=p-5fd011bd.entry.js.map
