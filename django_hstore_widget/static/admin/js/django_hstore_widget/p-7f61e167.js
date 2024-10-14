var e = Object.defineProperty,
    t = new WeakMap(),
    n = e => t.get(e),
    l = (e, n) => t.set((n.t = e), n),
    o = (e, t) => t in e,
    s = (e, t) => (0, console.error)(e, t),
    i = new Map(),
    r = new Map(),
    c = 'slot-fb{display:contents}slot-fb[hidden]{display:none}',
    u = 'undefined' != typeof window ? window : {},
    a = u.document || { head: {} },
    f = {
        l: 0,
        o: '',
        jmp: e => e(),
        raf: e => requestAnimationFrame(e),
        ael: (e, t, n, l) => e.addEventListener(t, n, l),
        rel: (e, t, n, l) => e.removeEventListener(t, n, l),
        ce: (e, t) => new CustomEvent(e, t),
    },
    h = e => Promise.resolve(e),
    d = (() => {
        try {
            return new CSSStyleSheet(), 'function' == typeof new CSSStyleSheet().replaceSync;
        } catch (e) {}
        return !1;
    })(),
    m = !1,
    p = [],
    y = [],
    v = (e, t) => n => {
        e.push(n), m || ((m = !0), t && 4 & f.l ? b(w) : f.raf(w));
    },
    $ = e => {
        for (let t = 0; t < e.length; t++)
            try {
                e[t](performance.now());
            } catch (e) {
                s(e);
            }
        e.length = 0;
    },
    w = () => {
        $(p), $(y), (m = p.length > 0) && f.raf(w);
    },
    b = e => h().then(e),
    g = v(y, !0),
    S = {},
    j = e => 'object' == (e = typeof e) || 'function' === e;
function k(e) {
    var t, n, l;
    return null != (l = null == (n = null == (t = e.head) ? void 0 : t.querySelector('meta[name="csp-nonce"]')) ? void 0 : n.getAttribute('content')) ? l : void 0;
}
((t, n) => {
    for (var l in n) e(t, l, { get: n[l], enumerable: !0 });
})({}, { err: () => O, map: () => C, ok: () => E, unwrap: () => x, unwrapErr: () => P });
var E = e => ({ isOk: !0, isErr: !1, value: e }),
    O = e => ({ isOk: !1, isErr: !0, value: e });
function C(e, t) {
    if (e.isOk) {
        const n = t(e.value);
        return n instanceof Promise ? n.then(e => E(e)) : E(n);
    }
    if (e.isErr) return O(e.value);
    throw 'should never get here';
}
var M,
    x = e => {
        if (e.isOk) return e.value;
        throw e.value;
    },
    P = e => {
        if (e.isErr) return e.value;
        throw e.value;
    },
    A = (e, t, ...n) => {
        let l = null,
            o = null,
            s = !1,
            i = !1;
        const r = [],
            c = t => {
                for (let n = 0; n < t.length; n++)
                    (l = t[n]),
                        Array.isArray(l)
                            ? c(l)
                            : null != l &&
                              'boolean' != typeof l &&
                              ((s = 'function' != typeof e && !j(l)) && (l += ''), s && i ? (r[r.length - 1].i += l) : r.push(s ? H(null, l) : l), (i = s));
            };
        if ((c(n), t)) {
            t.key && (o = t.key);
            {
                const e = t.className || t.class;
                e &&
                    (t.class =
                        'object' != typeof e
                            ? e
                            : Object.keys(e)
                                  .filter(t => e[t])
                                  .join(' '));
            }
        }
        if ('function' == typeof e) return e(null === t ? {} : t, r, T);
        const u = H(e, null);
        return (u.u = t), r.length > 0 && (u.h = r), (u.m = o), u;
    },
    H = (e, t) => ({ l: 0, p: e, i: t, v: null, h: null, u: null, m: null }),
    R = {},
    T = { forEach: (e, t) => e.map(D).forEach(t), map: (e, t) => e.map(D).map(t).map(F) },
    D = e => ({ vattrs: e.u, vchildren: e.h, vkey: e.m, vname: e.$, vtag: e.p, vtext: e.i }),
    F = e => {
        if ('function' == typeof e.vtag) {
            const t = { ...e.vattrs };
            return e.vkey && (t.key = e.vkey), e.vname && (t.name = e.vname), A(e.vtag, t, ...(e.vchildren || []));
        }
        const t = H(e.vtag, e.vtext);
        return (t.u = e.vattrs), (t.h = e.vchildren), (t.m = e.vkey), (t.$ = e.vname), t;
    },
    N = new WeakMap(),
    L = e => 'sc-' + e.S,
    U = (e, t, n, l, s, i) => {
        if (n !== l) {
            let r = o(e, t),
                c = t.toLowerCase();
            if ('class' === t) {
                const t = e.classList,
                    o = q(n),
                    s = q(l);
                t.remove(...o.filter(e => e && !s.includes(e))), t.add(...s.filter(e => e && !o.includes(e)));
            } else if ('key' === t);
            else if (r || 'o' !== t[0] || 'n' !== t[1]) {
                const o = j(l);
                if ((r || (o && null !== l)) && !s)
                    try {
                        if (e.tagName.includes('-')) e[t] = l;
                        else {
                            const o = null == l ? '' : l;
                            'list' === t ? (r = !1) : (null != n && e[t] == o) || ('function' == typeof e.__lookupSetter__(t) ? (e[t] = o) : e.setAttribute(t, o));
                        }
                    } catch (e) {}
                null == l || !1 === l ? (!1 === l && '' !== e.getAttribute(t)) || e.removeAttribute(t) : (!r || 4 & i || s) && !o && e.setAttribute(t, (l = !0 === l ? '' : l));
            } else if (((t = '-' === t[2] ? t.slice(3) : o(u, c) ? c.slice(2) : c[2] + t.slice(3)), n || l)) {
                const o = t.endsWith(G);
                (t = t.replace(V, '')), n && f.rel(e, t, n, o), l && f.ael(e, t, l, o);
            }
        }
    },
    W = /\s/,
    q = e => (e ? e.split(W) : []),
    G = 'Capture',
    V = RegExp(G + '$'),
    _ = (e, t, n) => {
        const l = 11 === t.v.nodeType && t.v.host ? t.v.host : t.v,
            o = (e && e.u) || S,
            s = t.u || S;
        for (const e of z(Object.keys(o))) e in s || U(l, e, o[e], void 0, n, t.l);
        for (const e of z(Object.keys(s))) U(l, e, o[e], s[e], n, t.l);
    };
function z(e) {
    return e.includes('ref') ? [...e.filter(e => 'ref' !== e), 'ref'] : e;
}
var B = !1,
    I = (e, t, n) => {
        const l = t.h[n];
        let o,
            s,
            i = 0;
        if (null !== l.i) o = l.v = a.createTextNode(l.i);
        else if (((o = l.v = a.createElement(l.p)), _(null, l, B), o.getRootNode().querySelector('body'), l.h))
            for (i = 0; i < l.h.length; ++i) (s = I(e, l, i)), s && o.appendChild(s);
        return (o['s-hn'] = M), o;
    },
    J = (e, t, n, l, o, s) => {
        let i,
            r = e;
        for (; o <= s; ++o) l[o] && ((i = I(null, n, o)), i && ((l[o].v = i), Y(r, i, t)));
    },
    K = (e, t, n) => {
        for (let l = t; l <= n; ++l) {
            const t = e[l];
            if (t) {
                const e = t.v;
                e && e.remove();
            }
        }
    },
    Q = (e, t, n = !1) => e.p === t.p && (!!n || e.m === t.m),
    X = (e, t, n = !1) => {
        const l = (t.v = e.v),
            o = e.h,
            s = t.h,
            i = t.i;
        null === i
            ? (_(e, t, B),
              null !== o && null !== s
                  ? ((e, t, n, l, o = !1) => {
                        let s,
                            i,
                            r = 0,
                            c = 0,
                            u = 0,
                            a = 0,
                            f = t.length - 1,
                            h = t[0],
                            d = t[f],
                            m = l.length - 1,
                            p = l[0],
                            y = l[m];
                        for (; r <= f && c <= m; )
                            if (null == h) h = t[++r];
                            else if (null == d) d = t[--f];
                            else if (null == p) p = l[++c];
                            else if (null == y) y = l[--m];
                            else if (Q(h, p, o)) X(h, p, o), (h = t[++r]), (p = l[++c]);
                            else if (Q(d, y, o)) X(d, y, o), (d = t[--f]), (y = l[--m]);
                            else if (Q(h, y, o)) X(h, y, o), Y(e, h.v, d.v.nextSibling), (h = t[++r]), (y = l[--m]);
                            else if (Q(d, p, o)) X(d, p, o), Y(e, d.v, h.v), (d = t[--f]), (p = l[++c]);
                            else {
                                for (u = -1, a = r; a <= f; ++a)
                                    if (t[a] && null !== t[a].m && t[a].m === p.m) {
                                        u = a;
                                        break;
                                    }
                                u >= 0
                                    ? ((i = t[u]), i.p !== p.p ? (s = I(t && t[c], n, u)) : (X(i, p, o), (t[u] = void 0), (s = i.v)), (p = l[++c]))
                                    : ((s = I(t && t[c], n, c)), (p = l[++c])),
                                    s && Y(h.v.parentNode, s, h.v);
                            }
                        r > f ? J(e, null == l[m + 1] ? null : l[m + 1].v, n, l, c, m) : c > m && K(t, r, f);
                    })(l, o, t, s, n)
                  : null !== s
                  ? (null !== e.i && (l.textContent = ''), J(l, null, t, s, 0, s.length - 1))
                  : !n && null !== o && K(o, 0, o.length - 1))
            : e.i !== i && (l.data = i);
    },
    Y = (e, t, n) => (null == e ? void 0 : e.insertBefore(t, n)),
    Z = (e, t) => {
        t && !e.j && t['s-p'] && t['s-p'].push(new Promise(t => (e.j = t)));
    },
    ee = (e, t) => {
        if (((e.l |= 16), !(4 & e.l))) return Z(e, e.k), g(() => te(e, t));
        e.l |= 512;
    },
    te = (e, t) => {
        const n = e.t;
        if (!n)
            throw Error(
                `Can't render component <${e.$hostElement$.tagName.toLowerCase()} /> with invalid Stencil runtime! Make sure this imported component is compiled with a \`externalRuntime: true\` flag. For more information, please refer to https://stenciljs.com/docs/custom-elements#externalruntime`,
            );
        return ne(void 0, () => oe(e, n, t));
    },
    ne = (e, t) =>
        le(e)
            ? e.then(t).catch(e => {
                  console.error(e), t();
              })
            : t(),
    le = e => e instanceof Promise || (e && e.then && 'function' == typeof e.then),
    oe = async (e, t, n) => {
        var l;
        const o = e.$hostElement$,
            s = o['s-rc'];
        n &&
            (e => {
                const t = e.O;
                ((e, t) => {
                    var n;
                    const l = L(t),
                        o = r.get(l);
                    if (((e = 11 === e.nodeType ? e : a), o))
                        if ('string' == typeof o) {
                            let s,
                                i = N.get((e = e.head || e));
                            if ((i || N.set(e, (i = new Set())), !i.has(l))) {
                                {
                                    (s = a.createElement('style')), (s.innerHTML = o);
                                    const l = null != (n = f.C) ? n : k(a);
                                    if ((null != l && s.setAttribute('nonce', l), !(1 & t.l)))
                                        if ('HEAD' === e.nodeName) {
                                            const t = e.querySelectorAll('link[rel=preconnect]'),
                                                n = t.length > 0 ? t[t.length - 1].nextSibling : e.querySelector('style');
                                            e.insertBefore(s, n);
                                        } else if ('host' in e) {
                                            const t = e.querySelector('style');
                                            t ? (t.innerHTML = o + t.innerHTML) : e.prepend(s);
                                        } else e.append(s);
                                    1 & t.l && 'HEAD' !== e.nodeName && e.insertBefore(s, null);
                                }
                                4 & t.l && (s.innerHTML += c), i && i.add(l);
                            }
                        } else e.adoptedStyleSheets.includes(o) || (e.adoptedStyleSheets = [...e.adoptedStyleSheets, o]);
                })(e.$hostElement$.getRootNode(), t);
            })(e);
        se(e, t, o, n), s && (s.map(e => e()), (o['s-rc'] = void 0));
        {
            const t = null != (l = o['s-p']) ? l : [],
                n = () => ie(e);
            0 === t.length ? n() : (Promise.all(t).then(n), (e.l |= 4), (t.length = 0));
        }
    },
    se = (e, t, n, l) => {
        try {
            (t = t.render()),
                (e.l &= -17),
                (e.l |= 2),
                ((e, t, n = !1) => {
                    const l = e.$hostElement$,
                        o = e.M || H(null, null),
                        s = (e => e && e.p === R)(t) ? t : A(null, null, t);
                    if (((M = l.tagName), n && s.u)) for (const e of Object.keys(s.u)) l.hasAttribute(e) && !['key', 'ref', 'style', 'class'].includes(e) && (s.u[e] = l[e]);
                    (s.p = null), (s.l |= 4), (e.M = s), (s.v = o.v = l), X(o, s, n);
                })(e, t, l);
        } catch (t) {
            s(t, e.$hostElement$);
        }
        return null;
    },
    ie = e => {
        const t = e.$hostElement$,
            n = e.k;
        64 & e.l || ((e.l |= 64), ce(t), e.P(t), n || re()), e.j && (e.j(), (e.j = void 0)), 512 & e.l && b(() => ee(e, !1)), (e.l &= -517);
    },
    re = () => {
        ce(a.documentElement),
            b(() =>
                (e => {
                    const t = f.ce('appload', { detail: { namespace: 'django-hstore-widget' } });
                    return e.dispatchEvent(t), t;
                })(u),
            );
    },
    ce = e => e.classList.add('hydrated'),
    ue = (e, t, l) => {
        var o, i;
        const r = e.prototype;
        if (t.A || t.H || e.watchers) {
            e.watchers && !t.H && (t.H = e.watchers);
            const c = Object.entries(null != (o = t.A) ? o : {});
            if (
                (c.map(([e, [o]]) => {
                    (31 & o || (2 & l && 32 & o)) &&
                        Object.defineProperty(r, e, {
                            get() {
                                return ((e, t) => n(this).R.get(t))(0, e);
                            },
                            set(l) {
                                ((e, t, l, o) => {
                                    const i = n(e);
                                    if (!i)
                                        throw Error(
                                            `Couldn't find host element for "${o.S}" as it is unknown to this Stencil runtime. This usually happens when integrating a 3rd party Stencil component with another Stencil component or application. Please reach out to the maintainers of the 3rd party Stencil component or report this on the Stencil Discord server (https://chat.stenciljs.com) or comment on this similar [GitHub issue](https://github.com/ionic-team/stencil/issues/5457).`,
                                        );
                                    const r = i.$hostElement$,
                                        c = i.R.get(t),
                                        u = i.l,
                                        a = i.t;
                                    if (
                                        ((l = ((e, t) => (null == e || j(e) ? e : 1 & t ? e + '' : e))(l, o.A[t][0])),
                                        (!(8 & u) || void 0 === c) && l !== c && (!Number.isNaN(c) || !Number.isNaN(l)) && (i.R.set(t, l), a))
                                    ) {
                                        if (o.H && 128 & u) {
                                            const e = o.H[t];
                                            e &&
                                                e.map(e => {
                                                    try {
                                                        a[e](l, c, t);
                                                    } catch (e) {
                                                        s(e, r);
                                                    }
                                                });
                                        }
                                        2 == (18 & u) && ee(i, !1);
                                    }
                                })(this, e, l, t);
                            },
                            configurable: !0,
                            enumerable: !0,
                        });
                }),
                1 & l)
            ) {
                const l = new Map();
                (r.attributeChangedCallback = function (e, o, s) {
                    f.jmp(() => {
                        var i;
                        const c = l.get(e);
                        if (this.hasOwnProperty(c)) (s = this[c]), delete this[c];
                        else {
                            if (r.hasOwnProperty(c) && 'number' == typeof this[c] && this[c] == s) return;
                            if (null == c) {
                                const l = n(this),
                                    r = null == l ? void 0 : l.l;
                                if (r && !(8 & r) && 128 & r && s !== o) {
                                    const n = l.t,
                                        r = null == (i = t.H) ? void 0 : i[e];
                                    null == r ||
                                        r.forEach(t => {
                                            null != n[t] && n[t].call(n, s, o, e);
                                        });
                                }
                                return;
                            }
                        }
                        this[c] = (null !== s || 'boolean' != typeof this[c]) && s;
                    });
                }),
                    (e.observedAttributes = Array.from(
                        new Set([
                            ...Object.keys(null != (i = t.H) ? i : {}),
                            ...c
                                .filter(([e, t]) => 15 & t[0])
                                .map(([e, t]) => {
                                    const n = t[1] || e;
                                    return l.set(n, e), n;
                                }),
                        ]),
                    ));
            }
        }
        return e;
    },
    ae = e => {
        ((e, t) => {
            if (e && e[t])
                try {
                    return e[t](void 0);
                } catch (e) {
                    s(e);
                }
        })(e, 'connectedCallback');
    },
    fe = (e, l = {}) => {
        var o;
        const h = [],
            m = l.exclude || [],
            p = u.customElements,
            y = a.head,
            v = y.querySelector('meta[charset]'),
            $ = a.createElement('style'),
            w = [];
        let b,
            g = !0;
        Object.assign(f, l), (f.o = new URL(l.resourcesUrl || './', a.baseURI).href);
        let S = !1;
        if (
            (e.map(e => {
                e[1].map(l => {
                    var o;
                    const c = { l: l[0], S: l[1], A: l[2], T: l[3] };
                    4 & c.l && (S = !0), (c.A = l[2]), (c.H = null != (o = l[4]) ? o : {});
                    const u = c.S,
                        a = class extends HTMLElement {
                            constructor(e) {
                                super(e),
                                    (this.hasRegisteredEventListeners = !1),
                                    ((e, n) => {
                                        const l = { l: 0, $hostElement$: e, O: n, R: new Map() };
                                        (l.D = new Promise(e => (l.P = e))), (e['s-p'] = []), (e['s-rc'] = []), t.set(e, l);
                                    })((e = this), c);
                            }
                            connectedCallback() {
                                this.hasRegisteredEventListeners || (this.hasRegisteredEventListeners = !0),
                                    b && (clearTimeout(b), (b = null)),
                                    g
                                        ? w.push(this)
                                        : f.jmp(() =>
                                              (e => {
                                                  if (!(1 & f.l)) {
                                                      const t = n(e),
                                                          l = t.O,
                                                          o = () => {};
                                                      if (1 & t.l) (null == t ? void 0 : t.t) ? ae(t.t) : (null == t ? void 0 : t.D) && t.D.then(() => ae(t.t));
                                                      else {
                                                          t.l |= 1;
                                                          {
                                                              let n = e;
                                                              for (; (n = n.parentNode || n.host); )
                                                                  if (n['s-p']) {
                                                                      Z(t, (t.k = n));
                                                                      break;
                                                                  }
                                                          }
                                                          l.A &&
                                                              Object.entries(l.A).map(([t, [n]]) => {
                                                                  if (31 & n && e.hasOwnProperty(t)) {
                                                                      const n = e[t];
                                                                      delete e[t], (e[t] = n);
                                                                  }
                                                              }),
                                                              (async (e, t, n) => {
                                                                  let l;
                                                                  if (!(32 & t.l)) {
                                                                      if (((t.l |= 32), n.F)) {
                                                                          const e = (e => {
                                                                              const t = e.S.replace(/-/g, '_'),
                                                                                  n = e.F;
                                                                              if (!n) return;
                                                                              const l = i.get(n);
                                                                              return l ? l[t] : import(`./${n}.entry.js`).then(e => (i.set(n, e), e[t]), s);
                                                                              /*!__STENCIL_STATIC_IMPORT_SWITCH__*/
                                                                          })(n);
                                                                          if (e && 'then' in e) {
                                                                              const t = () => {};
                                                                              (l = await e), t();
                                                                          } else l = e;
                                                                          if (!l) throw Error(`Constructor for "${n.S}#${t.N}" was not found`);
                                                                          l.isProxied || ((n.H = l.watchers), ue(l, n, 2), (l.isProxied = !0));
                                                                          const o = () => {};
                                                                          t.l |= 8;
                                                                          try {
                                                                              new l(t);
                                                                          } catch (e) {
                                                                              s(e);
                                                                          }
                                                                          (t.l &= -9), (t.l |= 128), o(), ae(t.t);
                                                                      } else (l = e.constructor), customElements.whenDefined(e.localName).then(() => (t.l |= 128));
                                                                      if (l && l.style) {
                                                                          let e;
                                                                          'string' == typeof l.style && (e = l.style);
                                                                          const t = L(n);
                                                                          if (!r.has(t)) {
                                                                              const l = () => {};
                                                                              ((e, t, n) => {
                                                                                  let l = r.get(e);
                                                                                  d && n
                                                                                      ? ((l = l || new CSSStyleSheet()), 'string' == typeof l ? (l = t) : l.replaceSync(t))
                                                                                      : (l = t),
                                                                                      r.set(e, l);
                                                                              })(t, e, !!(1 & n.l)),
                                                                                  l();
                                                                          }
                                                                      }
                                                                  }
                                                                  const o = t.k,
                                                                      c = () => ee(t, !0);
                                                                  o && o['s-rc'] ? o['s-rc'].push(c) : c();
                                                              })(e, t, l);
                                                      }
                                                      o();
                                                  }
                                              })(this),
                                          );
                            }
                            disconnectedCallback() {
                                f.jmp(() =>
                                    (async () => {
                                        if (!(1 & f.l)) {
                                            const e = n(this);
                                            (null == e ? void 0 : e.t) || ((null == e ? void 0 : e.D) && e.D.then(() => {}));
                                        }
                                    })(),
                                );
                            }
                            componentOnReady() {
                                return n(this).D;
                            }
                        };
                    (c.F = e[0]), m.includes(u) || p.get(u) || (h.push(u), p.define(u, ue(a, c, 1)));
                });
            }),
            h.length > 0 && (S && ($.textContent += c), ($.textContent += h.sort() + '{visibility:hidden}.hydrated{visibility:inherit}'), $.innerHTML.length))
        ) {
            $.setAttribute('data-styles', '');
            const e = null != (o = f.C) ? o : k(a);
            null != e && $.setAttribute('nonce', e), y.insertBefore($, v ? v.nextSibling : y.firstChild);
        }
        (g = !1), w.length ? w.map(e => e.connectedCallback()) : f.jmp(() => (b = setTimeout(re, 30)));
    },
    he = (e, t) => t,
    de = e => (f.C = e);
export { he as F, R as H, fe as b, A as h, h as p, l as r, de as s };