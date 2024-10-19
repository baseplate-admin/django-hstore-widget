import { r as t, h as e, H as i, F as s } from './p-9af118fb.js';
var n,
    o,
    r,
    a,
    l,
    h,
    c,
    d,
    u,
    g = function (t, e, i, s) {
        if ('a' === i && !s) throw new TypeError('Private accessor was defined without a getter');
        if ('function' == typeof e ? t !== e || !s : !e.has(t)) throw new TypeError('Cannot read private member from an object whose class did not declare it');
        return 'm' === i ? s : 'a' === i ? s.call(t) : s ? s.value : e.get(t);
    };
const f = class {
    constructor(e) {
        t(this, e),
            n.add(this),
            (this.json = void 0),
            (this.field_name = void 0),
            (this.cols = 40),
            (this.rows = 10),
            (this.delete_svg_src = '/static/admin/img/icon-deletelink.svg'),
            (this.add_svg_src = '/static/admin/img/icon-addlink.svg'),
            (this.edit_svg_src = '/static/admin/img/icon-changelink.svg'),
            (this.mounted = !1),
            (this.error = null),
            (this.output_render_type = 'rows'),
            (this.__json = new Array());
    }
    async jsonWatcher(t) {
        await g(this, n, 'm', a).call(this, t);
    }
    connectedCallback() {
        g(this, n, 'm', a)
            .call(this, this.json)
            .then(() => {
                this.mounted = !0;
            });
    }
    JSONComponent(t) {
        return e(
            'div',
            { class: 'form-row field-data' },
            e(
                'div',
                { class: 'flex gap-2.5 items-center justify-start' },
                e('input', { value: t.key, onInput: e => g(this, n, 'm', u).call(this, e, t, 'key'), placeholder: 'key', class: 'min-width-[150px]' }),
                e('strong', null, ':'),
                e('input', { value: t.value, onInput: e => g(this, n, 'm', u).call(this, e, t, 'value'), placeholder: 'value', class: 'min-width-[300px]' }),
                e(
                    'div',
                    { class: 'items-center justify-center flex cursor-pointer select-none', onClick: () => g(this, n, 'm', l).call(this, t.index) },
                    e('img', { src: this.delete_svg_src, alt: '❌' }),
                ),
            ),
        );
    }
    render() {
        return this.mounted
            ? e(
                  i,
                  null,
                  e(
                      'div',
                      { class: 'flex gap-2.5 items-center' },
                      e(
                          'textarea',
                          {
                              class: `${'textarea' === this.output_render_type ? '' : 'hidden invisible'} ${null === this.error ? '' : 'warning'} vLargeTextField`,
                              cols: this.cols,
                              name: this.field_name,
                              rows: this.rows,
                              onInput: g(this, n, 'm', d).bind(this),
                          },
                          g(this, n, 'a', r),
                      ),
                      null !== this.error && e('div', { class: 'warning brightness-90' }, this.error),
                  ),
                  'rows' === this.output_render_type &&
                      null === this.error &&
                      this.__json &&
                      e(
                          s,
                          null,
                          this.__json.map(t => this.JSONComponent(t)),
                      ),
                  e(
                      'div',
                      { class: 'form-row justify-between items-center flex' },
                      e(
                          'div',
                          {
                              class: 'items-center select-none justify-center flex gap-1 cursor-pointer ' + ('textarea' === this.output_render_type ? 'invisible' : ''),
                              onClick: g(this, n, 'm', h).bind(this),
                          },
                          e('img', { src: this.add_svg_src, alt: '➕' }),
                          'Add row',
                      ),
                      e(
                          'div',
                          {
                              class: 'items-center select-none justify-center flex gap-1 ' + (null === this.error ? 'cursor-pointer' : 'opacity-60'),
                              onClick: g(this, n, 'm', c).bind(this),
                          },
                          'textarea' === this.output_render_type
                              ? e(s, null, e('img', { src: this.delete_svg_src, alt: '❌' }), 'Close TextArea')
                              : 'rows' === this.output_render_type
                              ? e(s, null, e('img', { src: this.edit_svg_src, alt: '✏️' }), 'Open TextArea')
                              : e(
                                    'div',
                                    null,
                                    'Output render type is ',
                                    this.output_render_type,
                                    " which doesn't fall in ",
                                    e('code', null, 'rows'),
                                    ' or ',
                                    e('code', null, 'textarea'),
                                ),
                      ),
                  ),
              )
            : e(
                  i,
                  null,
                  e(
                      'div',
                      { class: 'flex items-center justify-center gap-1' },
                      e('p', null, 'Failed to mount. Unexpected JSON from ', e('code', null, 'django backend')),
                      e('p', null, 'The provided json is ', e('code', null, this.json), ' which is not valid.'),
                      e('p', null, 'Please check the json or ', e('a', { href: g(this, n, 'a', o) }, 'file an issue at Github')),
                  ),
              );
    }
    static get watchers() {
        return { json: ['jsonWatcher'] };
    }
};
(n = new WeakSet()),
    (o = function () {
        return 'https://github.com/baseplate-admin/django-hstore-widget/issues';
    }),
    (r = function () {
        const t = this.__json.reduce((t, e) => ((t[e.key] = e.value), t), {});
        let e = Object.keys(t).length > 1 ? 4 : 0;
        return globalThis.JSON.stringify(t, null, e);
    }),
    (a = async function (t) {
        try {
            let e = globalThis.JSON.parse(t);
            (this.__json = Object.keys(e).map((t, i) => ({ key: t, value: e[t], index: i }))), (this.error = null);
        } catch (t) {
            this.error = t.toString();
        } finally {
            this.__json = globalThis.structuredClone(this.__json);
        }
    }),
    (l = async function (t) {
        (this.__json = this.__json.filter(e => e.index !== t)), (this.__json = globalThis.structuredClone(this.__json));
    }),
    (h = async function () {
        const t = this.__json.at(-1);
        this.__json.push({ index: t ? t.index + 1 : 0, key: '', value: '' }), (this.__json = globalThis.structuredClone(this.__json));
    }),
    (c = async function () {
        if ('rows' === this.output_render_type) this.output_render_type = 'textarea';
        else if ('textarea' === this.output_render_type) {
            if (null !== this.error) return;
            this.output_render_type = 'rows';
        } else console.error(`Something is wrong with 'output_render_type'. It is ${this.output_render_type}`);
    }),
    (d = async function (t) {
        const e = t.currentTarget.value;
        g(this, n, 'm', a).call(this, e || '{}'),
            this.__json.forEach(t => {
                'object' == typeof t.value && (this.error = "SyntaxError: 'ltree' doesn't support nested json");
            });
    }),
    (u = async function (t, e, i) {
        const s = t.currentTarget.value;
        'key' === i ? (e.key = s) : 'value' === i && (e.value = s), (this.__json = globalThis.structuredClone(this.__json));
    }),
    (f.style =
        'django-hstore-widget .min-width-\\[150px\\]{min-width:150px}django-hstore-widget .min-width-\\[300px\\]{min-width:300px}django-hstore-widget .flex{display:flex}django-hstore-widget .select-none{user-select:none}django-hstore-widget .justify-center{justify-content:center}django-hstore-widget .justify-start{justify-content:flex-start}django-hstore-widget .justify-between{justify-content:space-between}django-hstore-widget .items-center{align-items:center}django-hstore-widget .flex-col{flex-direction:column}django-hstore-widget .invisible{visibility:hidden}django-hstore-widget .hidden{display:none}django-hstore-widget .gap-1{gap:0.25rem;}django-hstore-widget .gap-2\\.5{gap:0.625rem;}django-hstore-widget .opacity-60{opacity:0.6}django-hstore-widget .cursor-pointer{cursor:pointer}django-hstore-widget .cursor-default{cursor:default}django-hstore-widget .brightness-90{filter:brightness(0.9)}django-hstore-widget .warning{color:var(--error-fg, red);border-color:var(--error-fg, red)}');
export { f as django_hstore_widget };