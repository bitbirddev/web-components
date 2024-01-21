/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Y = globalThis, xe = Y.ShadowRoot && (Y.ShadyCSS === void 0 || Y.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ae = Symbol(), Ue = /* @__PURE__ */ new WeakMap();
let $t = class {
  constructor(e, r, s) {
    if (this._$cssResult$ = !0, s !== Ae)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = r;
  }
  get styleSheet() {
    let e = this.o;
    const r = this.t;
    if (xe && e === void 0) {
      const s = r !== void 0 && r.length === 1;
      s && (e = Ue.get(r)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && Ue.set(r, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const _t = (t) => new $t(typeof t == "string" ? t : t + "", void 0, Ae), xt = (t, ...e) => {
  const r = t.length === 1 ? t[0] : e.reduce((s, o, n) => s + ((a) => {
    if (a._$cssResult$ === !0)
      return a.cssText;
    if (typeof a == "number")
      return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + t[n + 1], t[0]);
  return new $t(r, t, Ae);
}, Qt = (t, e) => {
  if (xe)
    t.adoptedStyleSheets = e.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else
    for (const r of e) {
      const s = document.createElement("style"), o = Y.litNonce;
      o !== void 0 && s.setAttribute("nonce", o), s.textContent = r.cssText, t.appendChild(s);
    }
}, je = xe ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let r = "";
  for (const s of e.cssRules)
    r += s.cssText;
  return _t(r);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: er, defineProperty: tr, getOwnPropertyDescriptor: rr, getOwnPropertyNames: sr, getOwnPropertySymbols: or, getPrototypeOf: nr } = Object, se = globalThis, Fe = se.trustedTypes, ar = Fe ? Fe.emptyScript : "", ir = se.reactiveElementPolyfillSupport, N = (t, e) => t, ue = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? ar : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let r = t;
  switch (e) {
    case Boolean:
      r = t !== null;
      break;
    case Number:
      r = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        r = JSON.parse(t);
      } catch {
        r = null;
      }
  }
  return r;
} }, At = (t, e) => !er(t, e), Le = { attribute: !0, type: String, converter: ue, reflect: !1, hasChanged: At };
Symbol.metadata ??= Symbol("metadata"), se.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
class z extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, r = Le) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.elementProperties.set(e, r), !r.noAccessor) {
      const s = Symbol(), o = this.getPropertyDescriptor(e, s, r);
      o !== void 0 && tr(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, r, s) {
    const { get: o, set: n } = rr(this.prototype, e) ?? { get() {
      return this[r];
    }, set(a) {
      this[r] = a;
    } };
    return { get() {
      return o?.call(this);
    }, set(a) {
      const l = o?.call(this);
      n.call(this, a), this.requestUpdate(e, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Le;
  }
  static _$Ei() {
    if (this.hasOwnProperty(N("elementProperties")))
      return;
    const e = nr(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(N("finalized")))
      return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(N("properties"))) {
      const r = this.properties, s = [...sr(r), ...or(r)];
      for (const o of s)
        this.createProperty(o, r[o]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const r = litPropertyMetadata.get(e);
      if (r !== void 0)
        for (const [s, o] of r)
          this.elementProperties.set(s, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [r, s] of this.elementProperties) {
      const o = this._$Eu(r, s);
      o !== void 0 && this._$Eh.set(o, r);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const r = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const o of s)
        r.unshift(je(o));
    } else
      e !== void 0 && r.push(je(e));
    return r;
  }
  static _$Eu(e, r) {
    const s = r.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$Eg = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$ES(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$E_ ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$E_?.delete(e);
  }
  _$ES() {
    const e = /* @__PURE__ */ new Map(), r = this.constructor.elementProperties;
    for (const s of r.keys())
      this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Qt(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$E_?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$E_?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, r, s) {
    this._$AK(e, s);
  }
  _$EO(e, r) {
    const s = this.constructor.elementProperties.get(e), o = this.constructor._$Eu(e, s);
    if (o !== void 0 && s.reflect === !0) {
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : ue).toAttribute(r, s.type);
      this._$Em = e, n == null ? this.removeAttribute(o) : this.setAttribute(o, n), this._$Em = null;
    }
  }
  _$AK(e, r) {
    const s = this.constructor, o = s._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const n = s.getPropertyOptions(o), a = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : ue;
      this._$Em = o, this[o] = a.fromAttribute(r, n.type), this._$Em = null;
    }
  }
  requestUpdate(e, r, s) {
    if (e !== void 0) {
      if (s ??= this.constructor.getPropertyOptions(e), !(s.hasChanged ?? At)(this[e], r))
        return;
      this.C(e, r, s);
    }
    this.isUpdatePending === !1 && (this._$Eg = this._$EP());
  }
  C(e, r, s) {
    this._$AL.has(e) || this._$AL.set(e, r), s.reflect === !0 && this._$Em !== e && (this._$ET ??= /* @__PURE__ */ new Set()).add(e);
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$Eg;
    } catch (r) {
      Promise.reject(r);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending)
      return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [o, n] of this._$Ep)
          this[o] = n;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0)
        for (const [o, n] of s)
          n.wrapped !== !0 || this._$AL.has(o) || this[o] === void 0 || this.C(o, this[o], n);
    }
    let e = !1;
    const r = this._$AL;
    try {
      e = this.shouldUpdate(r), e ? (this.willUpdate(r), this._$E_?.forEach((s) => s.hostUpdate?.()), this.update(r)) : this._$Ej();
    } catch (s) {
      throw e = !1, this._$Ej(), s;
    }
    e && this._$AE(r);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$E_?.forEach((r) => r.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$Ej() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$Eg;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$ET &&= this._$ET.forEach((r) => this._$EO(r, this[r])), this._$Ej();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
}
z.elementStyles = [], z.shadowRootOptions = { mode: "open" }, z[N("elementProperties")] = /* @__PURE__ */ new Map(), z[N("finalized")] = /* @__PURE__ */ new Map(), ir?.({ ReactiveElement: z }), (se.reactiveElementVersions ??= []).push("2.0.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ce = globalThis, Q = Ce.trustedTypes, Re = Q ? Q.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Ct = "$lit$", _ = `lit$${(Math.random() + "").slice(9)}$`, St = "?" + _, lr = `<${St}>`, T = document, H = () => T.createComment(""), q = (t) => t === null || typeof t != "object" && typeof t != "function", Et = Array.isArray, pr = (t) => Et(t) || typeof t?.[Symbol.iterator] == "function", de = `[ 	
\f\r]`, L = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ne = /-->/g, He = />/g, C = RegExp(`>|${de}(?:([^\\s"'>=/]+)(${de}*=${de}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), qe = /'/g, Ge = /"/g, Tt = /^(?:script|style|textarea|title)$/i, cr = (t) => (e, ...r) => ({ _$litType$: t, strings: e, values: r }), b = cr(1), P = Symbol.for("lit-noChange"), w = Symbol.for("lit-nothing"), Be = /* @__PURE__ */ new WeakMap(), E = T.createTreeWalker(T, 129);
function zt(t, e) {
  if (!Array.isArray(t) || !t.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return Re !== void 0 ? Re.createHTML(e) : e;
}
const hr = (t, e) => {
  const r = t.length - 1, s = [];
  let o, n = e === 2 ? "<svg>" : "", a = L;
  for (let l = 0; l < r; l++) {
    const i = t[l];
    let p, h, c = -1, m = 0;
    for (; m < i.length && (a.lastIndex = m, h = a.exec(i), h !== null); )
      m = a.lastIndex, a === L ? h[1] === "!--" ? a = Ne : h[1] !== void 0 ? a = He : h[2] !== void 0 ? (Tt.test(h[2]) && (o = RegExp("</" + h[2], "g")), a = C) : h[3] !== void 0 && (a = C) : a === C ? h[0] === ">" ? (a = o ?? L, c = -1) : h[1] === void 0 ? c = -2 : (c = a.lastIndex - h[2].length, p = h[1], a = h[3] === void 0 ? C : h[3] === '"' ? Ge : qe) : a === Ge || a === qe ? a = C : a === Ne || a === He ? a = L : (a = C, o = void 0);
    const g = a === C && t[l + 1].startsWith("/>") ? " " : "";
    n += a === L ? i + lr : c >= 0 ? (s.push(p), i.slice(0, c) + Ct + i.slice(c) + _ + g) : i + _ + (c === -2 ? l : g);
  }
  return [zt(t, n + (t[r] || "<?>") + (e === 2 ? "</svg>" : "")), s];
};
class G {
  constructor({ strings: e, _$litType$: r }, s) {
    let o;
    this.parts = [];
    let n = 0, a = 0;
    const l = e.length - 1, i = this.parts, [p, h] = hr(e, r);
    if (this.el = G.createElement(p, s), E.currentNode = this.el.content, r === 2) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (o = E.nextNode()) !== null && i.length < l; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes())
          for (const c of o.getAttributeNames())
            if (c.endsWith(Ct)) {
              const m = h[a++], g = o.getAttribute(c).split(_), f = /([.?@])?(.*)/.exec(m);
              i.push({ type: 1, index: n, name: f[2], strings: g, ctor: f[1] === "." ? dr : f[1] === "?" ? gr : f[1] === "@" ? wr : oe }), o.removeAttribute(c);
            } else
              c.startsWith(_) && (i.push({ type: 6, index: n }), o.removeAttribute(c));
        if (Tt.test(o.tagName)) {
          const c = o.textContent.split(_), m = c.length - 1;
          if (m > 0) {
            o.textContent = Q ? Q.emptyScript : "";
            for (let g = 0; g < m; g++)
              o.append(c[g], H()), E.nextNode(), i.push({ type: 2, index: ++n });
            o.append(c[m], H());
          }
        }
      } else if (o.nodeType === 8)
        if (o.data === St)
          i.push({ type: 2, index: n });
        else {
          let c = -1;
          for (; (c = o.data.indexOf(_, c + 1)) !== -1; )
            i.push({ type: 7, index: n }), c += _.length - 1;
        }
      n++;
    }
  }
  static createElement(e, r) {
    const s = T.createElement("template");
    return s.innerHTML = e, s;
  }
}
function k(t, e, r = t, s) {
  if (e === P)
    return e;
  let o = s !== void 0 ? r._$Co?.[s] : r._$Cl;
  const n = q(e) ? void 0 : e._$litDirective$;
  return o?.constructor !== n && (o?._$AO?.(!1), n === void 0 ? o = void 0 : (o = new n(t), o._$AT(t, r, s)), s !== void 0 ? (r._$Co ??= [])[s] = o : r._$Cl = o), o !== void 0 && (e = k(t, o._$AS(t, e.values), o, s)), e;
}
class mr {
  constructor(e, r) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = r;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: r }, parts: s } = this._$AD, o = (e?.creationScope ?? T).importNode(r, !0);
    E.currentNode = o;
    let n = E.nextNode(), a = 0, l = 0, i = s[0];
    for (; i !== void 0; ) {
      if (a === i.index) {
        let p;
        i.type === 2 ? p = new B(n, n.nextSibling, this, e) : i.type === 1 ? p = new i.ctor(n, i.name, i.strings, this, e) : i.type === 6 && (p = new fr(n, this, e)), this._$AV.push(p), i = s[++l];
      }
      a !== i?.index && (n = E.nextNode(), a++);
    }
    return E.currentNode = T, o;
  }
  p(e) {
    let r = 0;
    for (const s of this._$AV)
      s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, r), r += s.strings.length - 2) : s._$AI(e[r])), r++;
  }
}
class B {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, r, s, o) {
    this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = e, this._$AB = r, this._$AM = s, this.options = o, this._$Cv = o?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const r = this._$AM;
    return r !== void 0 && e?.nodeType === 11 && (e = r.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, r = this) {
    e = k(this, e, r), q(e) ? e === w || e == null || e === "" ? (this._$AH !== w && this._$AR(), this._$AH = w) : e !== this._$AH && e !== P && this._(e) : e._$litType$ !== void 0 ? this.g(e) : e.nodeType !== void 0 ? this.$(e) : pr(e) ? this.T(e) : this._(e);
  }
  k(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  $(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.k(e));
  }
  _(e) {
    this._$AH !== w && q(this._$AH) ? this._$AA.nextSibling.data = e : this.$(T.createTextNode(e)), this._$AH = e;
  }
  g(e) {
    const { values: r, _$litType$: s } = e, o = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = G.createElement(zt(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === o)
      this._$AH.p(r);
    else {
      const n = new mr(o, this), a = n.u(this.options);
      n.p(r), this.$(a), this._$AH = n;
    }
  }
  _$AC(e) {
    let r = Be.get(e.strings);
    return r === void 0 && Be.set(e.strings, r = new G(e)), r;
  }
  T(e) {
    Et(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let s, o = 0;
    for (const n of e)
      o === r.length ? r.push(s = new B(this.k(H()), this.k(H()), this, this.options)) : s = r[o], s._$AI(n), o++;
    o < r.length && (this._$AR(s && s._$AB.nextSibling, o), r.length = o);
  }
  _$AR(e = this._$AA.nextSibling, r) {
    for (this._$AP?.(!1, !0, r); e && e !== this._$AB; ) {
      const s = e.nextSibling;
      e.remove(), e = s;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class oe {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, r, s, o, n) {
    this.type = 1, this._$AH = w, this._$AN = void 0, this.element = e, this.name = r, this._$AM = o, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = w;
  }
  _$AI(e, r = this, s, o) {
    const n = this.strings;
    let a = !1;
    if (n === void 0)
      e = k(this, e, r, 0), a = !q(e) || e !== this._$AH && e !== P, a && (this._$AH = e);
    else {
      const l = e;
      let i, p;
      for (e = n[0], i = 0; i < n.length - 1; i++)
        p = k(this, l[s + i], r, i), p === P && (p = this._$AH[i]), a ||= !q(p) || p !== this._$AH[i], p === w ? e = w : e !== w && (e += (p ?? "") + n[i + 1]), this._$AH[i] = p;
    }
    a && !o && this.O(e);
  }
  O(e) {
    e === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class dr extends oe {
  constructor() {
    super(...arguments), this.type = 3;
  }
  O(e) {
    this.element[this.name] = e === w ? void 0 : e;
  }
}
class gr extends oe {
  constructor() {
    super(...arguments), this.type = 4;
  }
  O(e) {
    this.element.toggleAttribute(this.name, !!e && e !== w);
  }
}
class wr extends oe {
  constructor(e, r, s, o, n) {
    super(e, r, s, o, n), this.type = 5;
  }
  _$AI(e, r = this) {
    if ((e = k(this, e, r, 0) ?? w) === P)
      return;
    const s = this._$AH, o = e === w && s !== w || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, n = e !== w && (s === w || o);
    o && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class fr {
  constructor(e, r, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    k(this, e);
  }
}
const ur = Ce.litHtmlPolyfillSupport;
ur?.(G, B), (Ce.litHtmlVersions ??= []).push("3.1.1");
const br = (t, e, r) => {
  const s = r?.renderBefore ?? e;
  let o = s._$litPart$;
  if (o === void 0) {
    const n = r?.renderBefore ?? null;
    s._$litPart$ = o = new B(e.insertBefore(H(), n), n, void 0, r ?? {});
  }
  return o._$AI(t), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class I extends z {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const r = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = br(r, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return P;
  }
}
I._$litElement$ = !0, I.finalized = !0, globalThis.litElementHydrateSupport?.({ LitElement: I });
const vr = globalThis.litElementPolyfillSupport;
vr?.({ LitElement: I });
(globalThis.litElementVersions ??= []).push("4.0.3");
var V = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function It(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function yr(t, e) {
  for (var r = -1, s = t == null ? 0 : t.length; ++r < s; )
    if (!e(t[r], r, t))
      return !1;
  return !0;
}
var $r = yr;
function _r(t) {
  return function(e, r, s) {
    for (var o = -1, n = Object(e), a = s(e), l = a.length; l--; ) {
      var i = a[t ? l : ++o];
      if (r(n[i], i, n) === !1)
        break;
    }
    return e;
  };
}
var xr = _r, Ar = xr, Cr = Ar(), Sr = Cr;
function Er(t, e) {
  for (var r = -1, s = Array(t); ++r < t; )
    s[r] = e(r);
  return s;
}
var Tr = Er, zr = typeof V == "object" && V && V.Object === Object && V, Pt = zr, Ir = Pt, Pr = typeof self == "object" && self && self.Object === Object && self, kr = Ir || Pr || Function("return this")(), y = kr, Or = y, Mr = Or.Symbol, ne = Mr, Ke = ne, kt = Object.prototype, Dr = kt.hasOwnProperty, Ur = kt.toString, R = Ke ? Ke.toStringTag : void 0;
function jr(t) {
  var e = Dr.call(t, R), r = t[R];
  try {
    t[R] = void 0;
    var s = !0;
  } catch {
  }
  var o = Ur.call(t);
  return s && (e ? t[R] = r : delete t[R]), o;
}
var Fr = jr, Lr = Object.prototype, Rr = Lr.toString;
function Nr(t) {
  return Rr.call(t);
}
var Hr = Nr, We = ne, qr = Fr, Gr = Hr, Br = "[object Null]", Kr = "[object Undefined]", Ze = We ? We.toStringTag : void 0;
function Wr(t) {
  return t == null ? t === void 0 ? Kr : Br : Ze && Ze in Object(t) ? qr(t) : Gr(t);
}
var K = Wr;
function Zr(t) {
  return t != null && typeof t == "object";
}
var W = Zr, Jr = K, Vr = W, Xr = "[object Arguments]";
function Yr(t) {
  return Vr(t) && Jr(t) == Xr;
}
var Qr = Yr, Je = Qr, es = W, Ot = Object.prototype, ts = Ot.hasOwnProperty, rs = Ot.propertyIsEnumerable, ss = Je(/* @__PURE__ */ function() {
  return arguments;
}()) ? Je : function(t) {
  return es(t) && ts.call(t, "callee") && !rs.call(t, "callee");
}, Mt = ss, os = Array.isArray, v = os, ee = { exports: {} };
function ns() {
  return !1;
}
var as = ns;
ee.exports;
(function(t, e) {
  var r = y, s = as, o = e && !e.nodeType && e, n = o && !0 && t && !t.nodeType && t, a = n && n.exports === o, l = a ? r.Buffer : void 0, i = l ? l.isBuffer : void 0, p = i || s;
  t.exports = p;
})(ee, ee.exports);
var Dt = ee.exports, is = 9007199254740991, ls = /^(?:0|[1-9]\d*)$/;
function ps(t, e) {
  var r = typeof t;
  return e = e ?? is, !!e && (r == "number" || r != "symbol" && ls.test(t)) && t > -1 && t % 1 == 0 && t < e;
}
var Se = ps, cs = 9007199254740991;
function hs(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= cs;
}
var Ee = hs, ms = K, ds = Ee, gs = W, ws = "[object Arguments]", fs = "[object Array]", us = "[object Boolean]", bs = "[object Date]", vs = "[object Error]", ys = "[object Function]", $s = "[object Map]", _s = "[object Number]", xs = "[object Object]", As = "[object RegExp]", Cs = "[object Set]", Ss = "[object String]", Es = "[object WeakMap]", Ts = "[object ArrayBuffer]", zs = "[object DataView]", Is = "[object Float32Array]", Ps = "[object Float64Array]", ks = "[object Int8Array]", Os = "[object Int16Array]", Ms = "[object Int32Array]", Ds = "[object Uint8Array]", Us = "[object Uint8ClampedArray]", js = "[object Uint16Array]", Fs = "[object Uint32Array]", d = {};
d[Is] = d[Ps] = d[ks] = d[Os] = d[Ms] = d[Ds] = d[Us] = d[js] = d[Fs] = !0;
d[ws] = d[fs] = d[Ts] = d[us] = d[zs] = d[bs] = d[vs] = d[ys] = d[$s] = d[_s] = d[xs] = d[As] = d[Cs] = d[Ss] = d[Es] = !1;
function Ls(t) {
  return gs(t) && ds(t.length) && !!d[ms(t)];
}
var Rs = Ls;
function Ns(t) {
  return function(e) {
    return t(e);
  };
}
var Hs = Ns, te = { exports: {} };
te.exports;
(function(t, e) {
  var r = Pt, s = e && !e.nodeType && e, o = s && !0 && t && !t.nodeType && t, n = o && o.exports === s, a = n && r.process, l = function() {
    try {
      var i = o && o.require && o.require("util").types;
      return i || a && a.binding && a.binding("util");
    } catch {
    }
  }();
  t.exports = l;
})(te, te.exports);
var qs = te.exports, Gs = Rs, Bs = Hs, Ve = qs, Xe = Ve && Ve.isTypedArray, Ks = Xe ? Bs(Xe) : Gs, Ut = Ks, Ws = Tr, Zs = Mt, Js = v, Vs = Dt, Xs = Se, Ys = Ut, Qs = Object.prototype, eo = Qs.hasOwnProperty;
function to(t, e) {
  var r = Js(t), s = !r && Zs(t), o = !r && !s && Vs(t), n = !r && !s && !o && Ys(t), a = r || s || o || n, l = a ? Ws(t.length, String) : [], i = l.length;
  for (var p in t)
    (e || eo.call(t, p)) && !(a && // Safari 9 has enumerable `arguments.length` in strict mode.
    (p == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    o && (p == "offset" || p == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    n && (p == "buffer" || p == "byteLength" || p == "byteOffset") || // Skip index properties.
    Xs(p, i))) && l.push(p);
  return l;
}
var ro = to, so = Object.prototype;
function oo(t) {
  var e = t && t.constructor, r = typeof e == "function" && e.prototype || so;
  return t === r;
}
var no = oo;
function ao(t, e) {
  return function(r) {
    return t(e(r));
  };
}
var io = ao, lo = io, po = lo(Object.keys, Object), co = po, ho = no, mo = co, go = Object.prototype, wo = go.hasOwnProperty;
function fo(t) {
  if (!ho(t))
    return mo(t);
  var e = [];
  for (var r in Object(t))
    wo.call(t, r) && r != "constructor" && e.push(r);
  return e;
}
var uo = fo;
function bo(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var ae = bo, vo = K, yo = ae, $o = "[object AsyncFunction]", _o = "[object Function]", xo = "[object GeneratorFunction]", Ao = "[object Proxy]";
function Co(t) {
  if (!yo(t))
    return !1;
  var e = vo(t);
  return e == _o || e == xo || e == $o || e == Ao;
}
var jt = Co, So = jt, Eo = Ee;
function To(t) {
  return t != null && Eo(t.length) && !So(t);
}
var ie = To, zo = ro, Io = uo, Po = ie;
function ko(t) {
  return Po(t) ? zo(t) : Io(t);
}
var Te = ko, Oo = Sr, Mo = Te;
function Do(t, e) {
  return t && Oo(t, e, Mo);
}
var Uo = Do, jo = ie;
function Fo(t, e) {
  return function(r, s) {
    if (r == null)
      return r;
    if (!jo(r))
      return t(r, s);
    for (var o = r.length, n = e ? o : -1, a = Object(r); (e ? n-- : ++n < o) && s(a[n], n, a) !== !1; )
      ;
    return r;
  };
}
var Lo = Fo, Ro = Uo, No = Lo, Ho = No(Ro), Ft = Ho, qo = Ft;
function Go(t, e) {
  var r = !0;
  return qo(t, function(s, o, n) {
    return r = !!e(s, o, n), r;
  }), r;
}
var Bo = Go;
function Ko() {
  this.__data__ = [], this.size = 0;
}
var Wo = Ko;
function Zo(t, e) {
  return t === e || t !== t && e !== e;
}
var ze = Zo, Jo = ze;
function Vo(t, e) {
  for (var r = t.length; r--; )
    if (Jo(t[r][0], e))
      return r;
  return -1;
}
var le = Vo, Xo = le, Yo = Array.prototype, Qo = Yo.splice;
function en(t) {
  var e = this.__data__, r = Xo(e, t);
  if (r < 0)
    return !1;
  var s = e.length - 1;
  return r == s ? e.pop() : Qo.call(e, r, 1), --this.size, !0;
}
var tn = en, rn = le;
function sn(t) {
  var e = this.__data__, r = rn(e, t);
  return r < 0 ? void 0 : e[r][1];
}
var on = sn, nn = le;
function an(t) {
  return nn(this.__data__, t) > -1;
}
var ln = an, pn = le;
function cn(t, e) {
  var r = this.__data__, s = pn(r, t);
  return s < 0 ? (++this.size, r.push([t, e])) : r[s][1] = e, this;
}
var hn = cn, mn = Wo, dn = tn, gn = on, wn = ln, fn = hn;
function O(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var s = t[e];
    this.set(s[0], s[1]);
  }
}
O.prototype.clear = mn;
O.prototype.delete = dn;
O.prototype.get = gn;
O.prototype.has = wn;
O.prototype.set = fn;
var pe = O, un = pe;
function bn() {
  this.__data__ = new un(), this.size = 0;
}
var vn = bn;
function yn(t) {
  var e = this.__data__, r = e.delete(t);
  return this.size = e.size, r;
}
var $n = yn;
function _n(t) {
  return this.__data__.get(t);
}
var xn = _n;
function An(t) {
  return this.__data__.has(t);
}
var Cn = An, Sn = y, En = Sn["__core-js_shared__"], Tn = En, ge = Tn, Ye = function() {
  var t = /[^.]+$/.exec(ge && ge.keys && ge.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}();
function zn(t) {
  return !!Ye && Ye in t;
}
var In = zn, Pn = Function.prototype, kn = Pn.toString;
function On(t) {
  if (t != null) {
    try {
      return kn.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var Lt = On, Mn = jt, Dn = In, Un = ae, jn = Lt, Fn = /[\\^$.*+?()[\]{}|]/g, Ln = /^\[object .+?Constructor\]$/, Rn = Function.prototype, Nn = Object.prototype, Hn = Rn.toString, qn = Nn.hasOwnProperty, Gn = RegExp(
  "^" + Hn.call(qn).replace(Fn, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Bn(t) {
  if (!Un(t) || Dn(t))
    return !1;
  var e = Mn(t) ? Gn : Ln;
  return e.test(jn(t));
}
var Kn = Bn;
function Wn(t, e) {
  return t?.[e];
}
var Zn = Wn, Jn = Kn, Vn = Zn;
function Xn(t, e) {
  var r = Vn(t, e);
  return Jn(r) ? r : void 0;
}
var M = Xn, Yn = M, Qn = y, ea = Yn(Qn, "Map"), Ie = ea, ta = M, ra = ta(Object, "create"), ce = ra, Qe = ce;
function sa() {
  this.__data__ = Qe ? Qe(null) : {}, this.size = 0;
}
var oa = sa;
function na(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
}
var aa = na, ia = ce, la = "__lodash_hash_undefined__", pa = Object.prototype, ca = pa.hasOwnProperty;
function ha(t) {
  var e = this.__data__;
  if (ia) {
    var r = e[t];
    return r === la ? void 0 : r;
  }
  return ca.call(e, t) ? e[t] : void 0;
}
var ma = ha, da = ce, ga = Object.prototype, wa = ga.hasOwnProperty;
function fa(t) {
  var e = this.__data__;
  return da ? e[t] !== void 0 : wa.call(e, t);
}
var ua = fa, ba = ce, va = "__lodash_hash_undefined__";
function ya(t, e) {
  var r = this.__data__;
  return this.size += this.has(t) ? 0 : 1, r[t] = ba && e === void 0 ? va : e, this;
}
var $a = ya, _a = oa, xa = aa, Aa = ma, Ca = ua, Sa = $a;
function D(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var s = t[e];
    this.set(s[0], s[1]);
  }
}
D.prototype.clear = _a;
D.prototype.delete = xa;
D.prototype.get = Aa;
D.prototype.has = Ca;
D.prototype.set = Sa;
var Ea = D, et = Ea, Ta = pe, za = Ie;
function Ia() {
  this.size = 0, this.__data__ = {
    hash: new et(),
    map: new (za || Ta)(),
    string: new et()
  };
}
var Pa = Ia;
function ka(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
}
var Oa = ka, Ma = Oa;
function Da(t, e) {
  var r = t.__data__;
  return Ma(e) ? r[typeof e == "string" ? "string" : "hash"] : r.map;
}
var he = Da, Ua = he;
function ja(t) {
  var e = Ua(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
}
var Fa = ja, La = he;
function Ra(t) {
  return La(this, t).get(t);
}
var Na = Ra, Ha = he;
function qa(t) {
  return Ha(this, t).has(t);
}
var Ga = qa, Ba = he;
function Ka(t, e) {
  var r = Ba(this, t), s = r.size;
  return r.set(t, e), this.size += r.size == s ? 0 : 1, this;
}
var Wa = Ka, Za = Pa, Ja = Fa, Va = Na, Xa = Ga, Ya = Wa;
function U(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var s = t[e];
    this.set(s[0], s[1]);
  }
}
U.prototype.clear = Za;
U.prototype.delete = Ja;
U.prototype.get = Va;
U.prototype.has = Xa;
U.prototype.set = Ya;
var Pe = U, Qa = pe, ei = Ie, ti = Pe, ri = 200;
function si(t, e) {
  var r = this.__data__;
  if (r instanceof Qa) {
    var s = r.__data__;
    if (!ei || s.length < ri - 1)
      return s.push([t, e]), this.size = ++r.size, this;
    r = this.__data__ = new ti(s);
  }
  return r.set(t, e), this.size = r.size, this;
}
var oi = si, ni = pe, ai = vn, ii = $n, li = xn, pi = Cn, ci = oi;
function j(t) {
  var e = this.__data__ = new ni(t);
  this.size = e.size;
}
j.prototype.clear = ai;
j.prototype.delete = ii;
j.prototype.get = li;
j.prototype.has = pi;
j.prototype.set = ci;
var Rt = j, hi = "__lodash_hash_undefined__";
function mi(t) {
  return this.__data__.set(t, hi), this;
}
var di = mi;
function gi(t) {
  return this.__data__.has(t);
}
var wi = gi, fi = Pe, ui = di, bi = wi;
function re(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.__data__ = new fi(); ++e < r; )
    this.add(t[e]);
}
re.prototype.add = re.prototype.push = ui;
re.prototype.has = bi;
var vi = re;
function yi(t, e) {
  for (var r = -1, s = t == null ? 0 : t.length; ++r < s; )
    if (e(t[r], r, t))
      return !0;
  return !1;
}
var $i = yi;
function _i(t, e) {
  return t.has(e);
}
var xi = _i, Ai = vi, Ci = $i, Si = xi, Ei = 1, Ti = 2;
function zi(t, e, r, s, o, n) {
  var a = r & Ei, l = t.length, i = e.length;
  if (l != i && !(a && i > l))
    return !1;
  var p = n.get(t), h = n.get(e);
  if (p && h)
    return p == e && h == t;
  var c = -1, m = !0, g = r & Ti ? new Ai() : void 0;
  for (n.set(t, e), n.set(e, t); ++c < l; ) {
    var f = t[c], u = e[c];
    if (s)
      var $ = a ? s(u, f, c, e, t, n) : s(f, u, c, t, e, n);
    if ($ !== void 0) {
      if ($)
        continue;
      m = !1;
      break;
    }
    if (g) {
      if (!Ci(e, function(x, A) {
        if (!Si(g, A) && (f === x || o(f, x, r, s, n)))
          return g.push(A);
      })) {
        m = !1;
        break;
      }
    } else if (!(f === u || o(f, u, r, s, n))) {
      m = !1;
      break;
    }
  }
  return n.delete(t), n.delete(e), m;
}
var Nt = zi, Ii = y, Pi = Ii.Uint8Array, ki = Pi;
function Oi(t) {
  var e = -1, r = Array(t.size);
  return t.forEach(function(s, o) {
    r[++e] = [o, s];
  }), r;
}
var Mi = Oi;
function Di(t) {
  var e = -1, r = Array(t.size);
  return t.forEach(function(s) {
    r[++e] = s;
  }), r;
}
var Ui = Di, tt = ne, rt = ki, ji = ze, Fi = Nt, Li = Mi, Ri = Ui, Ni = 1, Hi = 2, qi = "[object Boolean]", Gi = "[object Date]", Bi = "[object Error]", Ki = "[object Map]", Wi = "[object Number]", Zi = "[object RegExp]", Ji = "[object Set]", Vi = "[object String]", Xi = "[object Symbol]", Yi = "[object ArrayBuffer]", Qi = "[object DataView]", st = tt ? tt.prototype : void 0, we = st ? st.valueOf : void 0;
function el(t, e, r, s, o, n, a) {
  switch (r) {
    case Qi:
      if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset)
        return !1;
      t = t.buffer, e = e.buffer;
    case Yi:
      return !(t.byteLength != e.byteLength || !n(new rt(t), new rt(e)));
    case qi:
    case Gi:
    case Wi:
      return ji(+t, +e);
    case Bi:
      return t.name == e.name && t.message == e.message;
    case Zi:
    case Vi:
      return t == e + "";
    case Ki:
      var l = Li;
    case Ji:
      var i = s & Ni;
      if (l || (l = Ri), t.size != e.size && !i)
        return !1;
      var p = a.get(t);
      if (p)
        return p == e;
      s |= Hi, a.set(t, e);
      var h = Fi(l(t), l(e), s, o, n, a);
      return a.delete(t), h;
    case Xi:
      if (we)
        return we.call(t) == we.call(e);
  }
  return !1;
}
var tl = el;
function rl(t, e) {
  for (var r = -1, s = e.length, o = t.length; ++r < s; )
    t[o + r] = e[r];
  return t;
}
var sl = rl, ol = sl, nl = v;
function al(t, e, r) {
  var s = e(t);
  return nl(t) ? s : ol(s, r(t));
}
var il = al;
function ll(t, e) {
  for (var r = -1, s = t == null ? 0 : t.length, o = 0, n = []; ++r < s; ) {
    var a = t[r];
    e(a, r, t) && (n[o++] = a);
  }
  return n;
}
var pl = ll;
function cl() {
  return [];
}
var hl = cl, ml = pl, dl = hl, gl = Object.prototype, wl = gl.propertyIsEnumerable, ot = Object.getOwnPropertySymbols, fl = ot ? function(t) {
  return t == null ? [] : (t = Object(t), ml(ot(t), function(e) {
    return wl.call(t, e);
  }));
} : dl, ul = fl, bl = il, vl = ul, yl = Te;
function $l(t) {
  return bl(t, yl, vl);
}
var _l = $l, nt = _l, xl = 1, Al = Object.prototype, Cl = Al.hasOwnProperty;
function Sl(t, e, r, s, o, n) {
  var a = r & xl, l = nt(t), i = l.length, p = nt(e), h = p.length;
  if (i != h && !a)
    return !1;
  for (var c = i; c--; ) {
    var m = l[c];
    if (!(a ? m in e : Cl.call(e, m)))
      return !1;
  }
  var g = n.get(t), f = n.get(e);
  if (g && f)
    return g == e && f == t;
  var u = !0;
  n.set(t, e), n.set(e, t);
  for (var $ = a; ++c < i; ) {
    m = l[c];
    var x = t[m], A = e[m];
    if (s)
      var De = a ? s(A, x, m, e, t, n) : s(x, A, m, t, e, n);
    if (!(De === void 0 ? x === A || o(x, A, r, s, n) : De)) {
      u = !1;
      break;
    }
    $ || ($ = m == "constructor");
  }
  if (u && !$) {
    var Z = t.constructor, J = e.constructor;
    Z != J && "constructor" in t && "constructor" in e && !(typeof Z == "function" && Z instanceof Z && typeof J == "function" && J instanceof J) && (u = !1);
  }
  return n.delete(t), n.delete(e), u;
}
var El = Sl, Tl = M, zl = y, Il = Tl(zl, "DataView"), Pl = Il, kl = M, Ol = y, Ml = kl(Ol, "Promise"), Dl = Ml, Ul = M, jl = y, Fl = Ul(jl, "Set"), Ll = Fl, Rl = M, Nl = y, Hl = Rl(Nl, "WeakMap"), ql = Hl, be = Pl, ve = Ie, ye = Dl, $e = Ll, _e = ql, Ht = K, F = Lt, at = "[object Map]", Gl = "[object Object]", it = "[object Promise]", lt = "[object Set]", pt = "[object WeakMap]", ct = "[object DataView]", Bl = F(be), Kl = F(ve), Wl = F(ye), Zl = F($e), Jl = F(_e), S = Ht;
(be && S(new be(new ArrayBuffer(1))) != ct || ve && S(new ve()) != at || ye && S(ye.resolve()) != it || $e && S(new $e()) != lt || _e && S(new _e()) != pt) && (S = function(t) {
  var e = Ht(t), r = e == Gl ? t.constructor : void 0, s = r ? F(r) : "";
  if (s)
    switch (s) {
      case Bl:
        return ct;
      case Kl:
        return at;
      case Wl:
        return it;
      case Zl:
        return lt;
      case Jl:
        return pt;
    }
  return e;
});
var Vl = S, fe = Rt, Xl = Nt, Yl = tl, Ql = El, ht = Vl, mt = v, dt = Dt, ep = Ut, tp = 1, gt = "[object Arguments]", wt = "[object Array]", X = "[object Object]", rp = Object.prototype, ft = rp.hasOwnProperty;
function sp(t, e, r, s, o, n) {
  var a = mt(t), l = mt(e), i = a ? wt : ht(t), p = l ? wt : ht(e);
  i = i == gt ? X : i, p = p == gt ? X : p;
  var h = i == X, c = p == X, m = i == p;
  if (m && dt(t)) {
    if (!dt(e))
      return !1;
    a = !0, h = !1;
  }
  if (m && !h)
    return n || (n = new fe()), a || ep(t) ? Xl(t, e, r, s, o, n) : Yl(t, e, i, r, s, o, n);
  if (!(r & tp)) {
    var g = h && ft.call(t, "__wrapped__"), f = c && ft.call(e, "__wrapped__");
    if (g || f) {
      var u = g ? t.value() : t, $ = f ? e.value() : e;
      return n || (n = new fe()), o(u, $, r, s, n);
    }
  }
  return m ? (n || (n = new fe()), Ql(t, e, r, s, o, n)) : !1;
}
var op = sp, np = op, ut = W;
function qt(t, e, r, s, o) {
  return t === e ? !0 : t == null || e == null || !ut(t) && !ut(e) ? t !== t && e !== e : np(t, e, r, s, qt, o);
}
var Gt = qt, ap = Rt, ip = Gt, lp = 1, pp = 2;
function cp(t, e, r, s) {
  var o = r.length, n = o, a = !s;
  if (t == null)
    return !n;
  for (t = Object(t); o--; ) {
    var l = r[o];
    if (a && l[2] ? l[1] !== t[l[0]] : !(l[0] in t))
      return !1;
  }
  for (; ++o < n; ) {
    l = r[o];
    var i = l[0], p = t[i], h = l[1];
    if (a && l[2]) {
      if (p === void 0 && !(i in t))
        return !1;
    } else {
      var c = new ap();
      if (s)
        var m = s(p, h, i, t, e, c);
      if (!(m === void 0 ? ip(h, p, lp | pp, s, c) : m))
        return !1;
    }
  }
  return !0;
}
var hp = cp, mp = ae;
function dp(t) {
  return t === t && !mp(t);
}
var Bt = dp, gp = Bt, wp = Te;
function fp(t) {
  for (var e = wp(t), r = e.length; r--; ) {
    var s = e[r], o = t[s];
    e[r] = [s, o, gp(o)];
  }
  return e;
}
var up = fp;
function bp(t, e) {
  return function(r) {
    return r == null ? !1 : r[t] === e && (e !== void 0 || t in Object(r));
  };
}
var Kt = bp, vp = hp, yp = up, $p = Kt;
function _p(t) {
  var e = yp(t);
  return e.length == 1 && e[0][2] ? $p(e[0][0], e[0][1]) : function(r) {
    return r === t || vp(r, t, e);
  };
}
var xp = _p, Ap = K, Cp = W, Sp = "[object Symbol]";
function Ep(t) {
  return typeof t == "symbol" || Cp(t) && Ap(t) == Sp;
}
var ke = Ep, Tp = v, zp = ke, Ip = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Pp = /^\w*$/;
function kp(t, e) {
  if (Tp(t))
    return !1;
  var r = typeof t;
  return r == "number" || r == "symbol" || r == "boolean" || t == null || zp(t) ? !0 : Pp.test(t) || !Ip.test(t) || e != null && t in Object(e);
}
var Oe = kp, Wt = Pe, Op = "Expected a function";
function Me(t, e) {
  if (typeof t != "function" || e != null && typeof e != "function")
    throw new TypeError(Op);
  var r = function() {
    var s = arguments, o = e ? e.apply(this, s) : s[0], n = r.cache;
    if (n.has(o))
      return n.get(o);
    var a = t.apply(this, s);
    return r.cache = n.set(o, a) || n, a;
  };
  return r.cache = new (Me.Cache || Wt)(), r;
}
Me.Cache = Wt;
var Mp = Me, Dp = Mp, Up = 500;
function jp(t) {
  var e = Dp(t, function(s) {
    return r.size === Up && r.clear(), s;
  }), r = e.cache;
  return e;
}
var Fp = jp, Lp = Fp, Rp = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Np = /\\(\\)?/g, Hp = Lp(function(t) {
  var e = [];
  return t.charCodeAt(0) === 46 && e.push(""), t.replace(Rp, function(r, s, o, n) {
    e.push(o ? n.replace(Np, "$1") : s || r);
  }), e;
}), qp = Hp;
function Gp(t, e) {
  for (var r = -1, s = t == null ? 0 : t.length, o = Array(s); ++r < s; )
    o[r] = e(t[r], r, t);
  return o;
}
var Zt = Gp, bt = ne, Bp = Zt, Kp = v, Wp = ke, Zp = 1 / 0, vt = bt ? bt.prototype : void 0, yt = vt ? vt.toString : void 0;
function Jt(t) {
  if (typeof t == "string")
    return t;
  if (Kp(t))
    return Bp(t, Jt) + "";
  if (Wp(t))
    return yt ? yt.call(t) : "";
  var e = t + "";
  return e == "0" && 1 / t == -Zp ? "-0" : e;
}
var Jp = Jt, Vp = Jp;
function Xp(t) {
  return t == null ? "" : Vp(t);
}
var Yp = Xp, Qp = v, ec = Oe, tc = qp, rc = Yp;
function sc(t, e) {
  return Qp(t) ? t : ec(t, e) ? [t] : tc(rc(t));
}
var Vt = sc, oc = ke, nc = 1 / 0;
function ac(t) {
  if (typeof t == "string" || oc(t))
    return t;
  var e = t + "";
  return e == "0" && 1 / t == -nc ? "-0" : e;
}
var me = ac, ic = Vt, lc = me;
function pc(t, e) {
  e = ic(e, t);
  for (var r = 0, s = e.length; t != null && r < s; )
    t = t[lc(e[r++])];
  return r && r == s ? t : void 0;
}
var Xt = pc, cc = Xt;
function hc(t, e, r) {
  var s = t == null ? void 0 : cc(t, e);
  return s === void 0 ? r : s;
}
var mc = hc;
function dc(t, e) {
  return t != null && e in Object(t);
}
var gc = dc, wc = Vt, fc = Mt, uc = v, bc = Se, vc = Ee, yc = me;
function $c(t, e, r) {
  e = wc(e, t);
  for (var s = -1, o = e.length, n = !1; ++s < o; ) {
    var a = yc(e[s]);
    if (!(n = t != null && r(t, a)))
      break;
    t = t[a];
  }
  return n || ++s != o ? n : (o = t == null ? 0 : t.length, !!o && vc(o) && bc(a, o) && (uc(t) || fc(t)));
}
var _c = $c, xc = gc, Ac = _c;
function Cc(t, e) {
  return t != null && Ac(t, e, xc);
}
var Sc = Cc, Ec = Gt, Tc = mc, zc = Sc, Ic = Oe, Pc = Bt, kc = Kt, Oc = me, Mc = 1, Dc = 2;
function Uc(t, e) {
  return Ic(t) && Pc(e) ? kc(Oc(t), e) : function(r) {
    var s = Tc(r, t);
    return s === void 0 && s === e ? zc(r, t) : Ec(e, s, Mc | Dc);
  };
}
var jc = Uc;
function Fc(t) {
  return t;
}
var Lc = Fc;
function Rc(t) {
  return function(e) {
    return e?.[t];
  };
}
var Nc = Rc, Hc = Xt;
function qc(t) {
  return function(e) {
    return Hc(e, t);
  };
}
var Gc = qc, Bc = Nc, Kc = Gc, Wc = Oe, Zc = me;
function Jc(t) {
  return Wc(t) ? Bc(Zc(t)) : Kc(t);
}
var Vc = Jc, Xc = xp, Yc = jc, Qc = Lc, eh = v, th = Vc;
function rh(t) {
  return typeof t == "function" ? t : t == null ? Qc : typeof t == "object" ? eh(t) ? Yc(t[0], t[1]) : Xc(t) : th(t);
}
var Yt = rh, sh = ze, oh = ie, nh = Se, ah = ae;
function ih(t, e, r) {
  if (!ah(r))
    return !1;
  var s = typeof e;
  return (s == "number" ? oh(r) && nh(e, r.length) : s == "string" && e in r) ? sh(r[e], t) : !1;
}
var lh = ih, ph = $r, ch = Bo, hh = Yt, mh = v, dh = lh;
function gh(t, e, r) {
  var s = mh(t) ? ph : ch;
  return r && dh(t, e, r) && (e = void 0), s(t, hh(e));
}
var wh = gh;
const fh = /* @__PURE__ */ It(wh);
var uh = Ft, bh = ie;
function vh(t, e) {
  var r = -1, s = bh(t) ? Array(t.length) : [];
  return uh(t, function(o, n, a) {
    s[++r] = e(o, n, a);
  }), s;
}
var yh = vh, $h = Zt, _h = Yt, xh = yh, Ah = v;
function Ch(t, e) {
  var r = Ah(t) ? $h : xh;
  return r(t, _h(e));
}
var Sh = Ch;
const Eh = /* @__PURE__ */ It(Sh);
let Ph = class extends I {
  static styles = xt`
    :host {
      background-color: #000;
      display: block;
    }
    .previewImage {
      margin: 0px;
      height: 100%;
      width: 100%;
      object-fit: cover;
      opacity: 0.2;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
    .banner {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 10;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      justify-items: center;
      justify-content: center;
      object-fit: cover;
      padding: 2rem;
    }
    .bg-letters {
      box-shadow: 0 0 0 10px #fff;
      box-shadow:
        -7px 0 0 10px #fff,
        7px 0 0 10px #fff;
      box-decoration-break: clone #Fix Firefox;
      line-height: 2.3;
    }
  `;
  static properties = {
    previewImageUrl: { type: String },
    neededServices: { type: Array },
    services: { type: Array }
  };
  constructor() {
    super(), this.previewImageUrl = "https://picsum.photos/seed/picsum/200/300", this.services = [], this.neededServices = [];
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("onConsentStatusChange", this._handleKeydown), window.removeEventListener("onConsentStatusChange", this._handleKeydown);
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("onConsentStatusChange", (e) => {
      if (e.data.event === "consents_initialized") {
        const r = [];
        for (const s of this.neededServices)
          r.push({
            name: s.name,
            ucId: s.ucId,
            isGranted: this.getServiceStatus(s.ucId)
          });
        this.services = r;
      }
    }), window.addEventListener("onConsentStatusChange", (e) => {
      if (e.data.event === "consent_changed") {
        const r = [];
        for (const s of this.neededServices)
          r.push({
            name: s.name,
            ucId: s.ucId,
            isGranted: this.getServiceStatus(s.ucId)
          });
        this.services = r;
      }
    });
  }
  allConsentsAccepted() {
    return fh(this.services, { isGranted: !0 });
  }
  accepted() {
    return this.services.filter(function(e) {
      return e.isGranted === !0;
    });
  }
  notAccepted() {
    return this.services.filter(function(e) {
      return e.isGranted === !1;
    });
  }
  notAcceptedString() {
    return this.notAccepted.length > 0 ? Eh(this.notAccepted, "name").join(",") : null;
  }
  getServiceStatus(e) {
    return window.usercentrics.getConsents(e).consentStatus;
  }
  acceptServiceWithId(e) {
    window.usercentrics.updateConsents([{ templateId: e, status: !0 }]);
  }
  revokeServiceWithId(e) {
    window.usercentrics.updateConsents([{ templateId: e, status: !1 }]);
  }
  revokeAll() {
    for (const e of this.services)
      this.revokeServiceWithId(e.ucId);
  }
  acceptAll() {
    for (const e of this.services)
      this.acceptServiceWithId(e.ucId);
  }
  toggleInfocenter() {
    usercentrics.toggleConsentInfoModalIsVisible();
  }
  render() {
    return this.allConsentsAccepted() ? b`<slot></slot>` : b`
        ${this.previewImageUrl ? b`<img
              src="${this.previewImageUrl}"
              class="previewImage"
              alt="Description"
            />` : ""}
        <div class="banner">
          <div class="inline max-w-lg text-center">
            <span
              class="bg-letters text-primary text-md bg-white font-medium sm:text-lg md:text-xl lg:text-2xl"
            >
              Dieser Inhalt kann aufgrund Ihrer Datenschutzeinstellungen nicht
              angezeigt werden
            </span>
          </div>
          <a
            href="#"
            class="btn btn-default no-underline sm:my-8 md:my-12 lg:my-16"
            @click="${this.acceptAll}"
            >Cookies akzeptieren und Inhalt anzeigen</a
          >
          <div class="prose-white prose text-center text-xs text-white">
            <div>
              Folgende Cookies werden akzeptiert:
              <ul>
                ${this.notAccepted().map(
      (e) => b`<li>${e.name} (${e.ucId})</li>`
    )}
              </ul>
            </div>
            <a
              @click="${this.toggleInfocenter()}"
              class="mt-2 inline-block text-xs text-white"
              >mehr Informationen</a
            >
          </div>
        </div>
      `;
  }
};
const Th = '*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:before,:after{--tw-content: ""}html,:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.prose{color:var(--tw-prose-body);max-width:65ch}.prose :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.prose :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-lead);font-size:1.25em;line-height:1.6;margin-top:1.2em;margin-bottom:1.2em}.prose :where(a):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-links);text-decoration:underline;font-weight:500}.prose :where(strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-bold);font-weight:600}.prose :where(a strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.prose :where(blockquote strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.prose :where(thead th strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.prose :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:decimal;margin-top:1.25em;margin-bottom:1.25em;padding-left:1.625em}.prose :where(ol[type=A]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.prose :where(ol[type=a]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.prose :where(ol[type=A s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.prose :where(ol[type=a s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.prose :where(ol[type=I]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.prose :where(ol[type=i]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.prose :where(ol[type=I s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.prose :where(ol[type=i s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.prose :where(ol[type="1"]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:decimal}.prose :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:disc;margin-top:1.25em;margin-bottom:1.25em;padding-left:1.625em}.prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{font-weight:400;color:var(--tw-prose-counters)}.prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-bullets)}.prose :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);font-weight:600;margin-top:1.25em}.prose :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){border-color:var(--tw-prose-hr);border-top-width:1px;margin-top:3em;margin-bottom:3em}.prose :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:500;font-style:italic;color:var(--tw-prose-quotes);border-left-width:.25rem;border-left-color:var(--tw-prose-quote-borders);quotes:"“""”""‘""’";margin-top:1.6em;margin-bottom:1.6em;padding-left:1em}.prose :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before{content:open-quote}.prose :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:close-quote}.prose :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);font-weight:800;font-size:2.25em;margin-top:0;margin-bottom:.8888889em;line-height:1.1111111}.prose :where(h1 strong):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:900;color:inherit}.prose :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);font-weight:700;font-size:1.5em;margin-top:2em;margin-bottom:1em;line-height:1.3333333}.prose :where(h2 strong):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:800;color:inherit}.prose :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);font-weight:600;font-size:1.25em;margin-top:1.6em;margin-bottom:.6em;line-height:1.6}.prose :where(h3 strong):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:700;color:inherit}.prose :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);font-weight:600;margin-top:1.5em;margin-bottom:.5em;line-height:1.5}.prose :where(h4 strong):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:700;color:inherit}.prose :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.prose :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){display:block;margin-top:2em;margin-bottom:2em}.prose :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:500;font-family:inherit;color:var(--tw-prose-kbd);box-shadow:0 0 0 1px rgb(var(--tw-prose-kbd-shadows) / 10%),0 3px rgb(var(--tw-prose-kbd-shadows) / 10%);font-size:.875em;border-radius:.3125rem;padding:.1875em .375em}.prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-code);font-weight:600;font-size:.875em}.prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):before{content:"`"}.prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:"`"}.prose :where(a code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.prose :where(h1 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.prose :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.875em}.prose :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.9em}.prose :where(h4 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.prose :where(blockquote code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.prose :where(thead th code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.prose :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-pre-code);background-color:var(--tw-prose-pre-bg);overflow-x:auto;font-weight:400;font-size:.875em;line-height:1.7142857;margin-top:1.7142857em;margin-bottom:1.7142857em;border-radius:.375rem;padding:.8571429em 1.1428571em}.prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)){background-color:transparent;border-width:0;border-radius:0;padding:0;font-weight:inherit;color:inherit;font-size:inherit;font-family:inherit;line-height:inherit}.prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):before{content:none}.prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.prose :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){width:100%;table-layout:auto;text-align:left;margin-top:2em;margin-bottom:2em;font-size:.875em;line-height:1.7142857}.prose :where(thead):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-th-borders)}.prose :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);font-weight:600;vertical-align:bottom;padding-right:.5714286em;padding-bottom:.5714286em;padding-left:.5714286em}.prose :where(tbody tr):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-td-borders)}.prose :where(tbody tr:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:0}.prose :where(tbody td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:baseline}.prose :where(tfoot):not(:where([class~=not-prose],[class~=not-prose] *)){border-top-width:1px;border-top-color:var(--tw-prose-th-borders)}.prose :where(tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:top}.prose :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.prose :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-captions);font-size:.875em;line-height:1.4285714;margin-top:.8571429em}.prose{--tw-prose-body: #374151;--tw-prose-headings: #111827;--tw-prose-lead: #4b5563;--tw-prose-links: #111827;--tw-prose-bold: #111827;--tw-prose-counters: #6b7280;--tw-prose-bullets: #d1d5db;--tw-prose-hr: #e5e7eb;--tw-prose-quotes: #111827;--tw-prose-quote-borders: #e5e7eb;--tw-prose-captions: #6b7280;--tw-prose-kbd: #111827;--tw-prose-kbd-shadows: 17 24 39;--tw-prose-code: #111827;--tw-prose-pre-code: #e5e7eb;--tw-prose-pre-bg: #1f2937;--tw-prose-th-borders: #d1d5db;--tw-prose-td-borders: #e5e7eb;--tw-prose-invert-body: #d1d5db;--tw-prose-invert-headings: #fff;--tw-prose-invert-lead: #9ca3af;--tw-prose-invert-links: #fff;--tw-prose-invert-bold: #fff;--tw-prose-invert-counters: #9ca3af;--tw-prose-invert-bullets: #4b5563;--tw-prose-invert-hr: #374151;--tw-prose-invert-quotes: #f3f4f6;--tw-prose-invert-quote-borders: #374151;--tw-prose-invert-captions: #9ca3af;--tw-prose-invert-kbd: #fff;--tw-prose-invert-kbd-shadows: 255 255 255;--tw-prose-invert-code: #fff;--tw-prose-invert-pre-code: #d1d5db;--tw-prose-invert-pre-bg: rgb(0 0 0 / 50%);--tw-prose-invert-th-borders: #4b5563;--tw-prose-invert-td-borders: #374151;font-size:1rem;line-height:1.75}.prose :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.prose :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.prose :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;margin-bottom:.5em}.prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:.375em}.prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:.375em}.prose :where(.prose>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.prose :where(.prose>ul>li>*:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.prose :where(.prose>ul>li>*:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.prose :where(.prose>ol>li>*:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.prose :where(.prose>ol>li>*:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.prose :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.prose :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.prose :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;padding-left:1.625em}.prose :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:0}.prose :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:0}.prose :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding:.5714286em}.prose :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:0}.prose :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:0}.prose :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.prose :where(.prose>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose :where(.prose>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.prose-sm{font-size:.875rem;line-height:1.7142857}.prose-sm :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.1428571em;margin-bottom:1.1428571em}.prose-sm :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:1.2857143em;line-height:1.5555556;margin-top:.8888889em;margin-bottom:.8888889em}.prose-sm :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.3333333em;margin-bottom:1.3333333em;padding-left:1.1111111em}.prose-sm :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:2.1428571em;margin-top:0;margin-bottom:.8em;line-height:1.2}.prose-sm :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:1.4285714em;margin-top:1.6em;margin-bottom:.8em;line-height:1.4}.prose-sm :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:1.2857143em;margin-top:1.5555556em;margin-bottom:.4444444em;line-height:1.5555556}.prose-sm :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.4285714em;margin-bottom:.5714286em;line-height:1.4285714}.prose-sm :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7142857em;margin-bottom:1.7142857em}.prose-sm :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7142857em;margin-bottom:1.7142857em}.prose-sm :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.prose-sm :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7142857em;margin-bottom:1.7142857em}.prose-sm :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8571429em;border-radius:.3125rem;padding:.1428571em .3571429em}.prose-sm :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8571429em}.prose-sm :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.9em}.prose-sm :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8888889em}.prose-sm :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8571429em;line-height:1.6666667;margin-top:1.6666667em;margin-bottom:1.6666667em;border-radius:.25rem;padding:.6666667em 1em}.prose-sm :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.1428571em;margin-bottom:1.1428571em;padding-left:1.5714286em}.prose-sm :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.1428571em;margin-bottom:1.1428571em;padding-left:1.5714286em}.prose-sm :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.2857143em;margin-bottom:.2857143em}.prose-sm :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:.4285714em}.prose-sm :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:.4285714em}.prose-sm :where(.prose-sm>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5714286em;margin-bottom:.5714286em}.prose-sm :where(.prose-sm>ul>li>*:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.1428571em}.prose-sm :where(.prose-sm>ul>li>*:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.1428571em}.prose-sm :where(.prose-sm>ol>li>*:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.1428571em}.prose-sm :where(.prose-sm>ol>li>*:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.1428571em}.prose-sm :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5714286em;margin-bottom:.5714286em}.prose-sm :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.1428571em;margin-bottom:1.1428571em}.prose-sm :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.1428571em}.prose-sm :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.2857143em;padding-left:1.5714286em}.prose-sm :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2.8571429em;margin-bottom:2.8571429em}.prose-sm :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose-sm :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose-sm :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose-sm :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose-sm :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8571429em;line-height:1.5}.prose-sm :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:1em;padding-bottom:.6666667em;padding-left:1em}.prose-sm :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:0}.prose-sm :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:0}.prose-sm :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding:.6666667em 1em}.prose-sm :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:0}.prose-sm :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:0}.prose-sm :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7142857em;margin-bottom:1.7142857em}.prose-sm :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.prose-sm :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8571429em;line-height:1.3333333;margin-top:.6666667em}.prose-sm :where(.prose-sm>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose-sm :where(.prose-sm>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.prose-lg{font-size:1.125rem;line-height:1.7777778}.prose-lg :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.3333333em;margin-bottom:1.3333333em}.prose-lg :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:1.2222222em;line-height:1.4545455;margin-top:1.0909091em;margin-bottom:1.0909091em}.prose-lg :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.6666667em;margin-bottom:1.6666667em;padding-left:1em}.prose-lg :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:2.6666667em;margin-top:0;margin-bottom:.8333333em;line-height:1}.prose-lg :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:1.6666667em;margin-top:1.8666667em;margin-bottom:1.0666667em;line-height:1.3333333}.prose-lg :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:1.3333333em;margin-top:1.6666667em;margin-bottom:.6666667em;line-height:1.5}.prose-lg :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7777778em;margin-bottom:.4444444em;line-height:1.5555556}.prose-lg :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7777778em;margin-bottom:1.7777778em}.prose-lg :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7777778em;margin-bottom:1.7777778em}.prose-lg :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.prose-lg :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7777778em;margin-bottom:1.7777778em}.prose-lg :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8888889em;border-radius:.3125rem;padding:.2222222em .4444444em}.prose-lg :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8888889em}.prose-lg :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8666667em}.prose-lg :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.875em}.prose-lg :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8888889em;line-height:1.75;margin-top:2em;margin-bottom:2em;border-radius:.375rem;padding:1em 1.5em}.prose-lg :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.3333333em;margin-bottom:1.3333333em;padding-left:1.5555556em}.prose-lg :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.3333333em;margin-bottom:1.3333333em;padding-left:1.5555556em}.prose-lg :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.6666667em;margin-bottom:.6666667em}.prose-lg :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:.4444444em}.prose-lg :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:.4444444em}.prose-lg :where(.prose-lg>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.8888889em;margin-bottom:.8888889em}.prose-lg :where(.prose-lg>ul>li>*:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.3333333em}.prose-lg :where(.prose-lg>ul>li>*:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.3333333em}.prose-lg :where(.prose-lg>ol>li>*:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.3333333em}.prose-lg :where(.prose-lg>ol>li>*:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.3333333em}.prose-lg :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.8888889em;margin-bottom:.8888889em}.prose-lg :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.3333333em;margin-bottom:1.3333333em}.prose-lg :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.3333333em}.prose-lg :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.6666667em;padding-left:1.5555556em}.prose-lg :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:3.1111111em;margin-bottom:3.1111111em}.prose-lg :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose-lg :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose-lg :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose-lg :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose-lg :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8888889em;line-height:1.5}.prose-lg :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:.75em;padding-bottom:.75em;padding-left:.75em}.prose-lg :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:0}.prose-lg :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:0}.prose-lg :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding:.75em}.prose-lg :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:0}.prose-lg :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:0}.prose-lg :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7777778em;margin-bottom:1.7777778em}.prose-lg :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.prose-lg :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8888889em;line-height:1.5;margin-top:1em}.prose-lg :where(.prose-lg>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose-lg :where(.prose-lg>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.aspect-h-9{--tw-aspect-h: 9}.aspect-w-16{position:relative;padding-bottom:calc(var(--tw-aspect-h) / var(--tw-aspect-w) * 100%);--tw-aspect-w: 16}.aspect-w-16>*{position:absolute;height:100%;width:100%;inset:0}.static{position:static}.absolute{position:absolute}.inset-0{inset:0}.z-10{z-index:10}.m-0{margin:0}.mx-auto{margin-left:auto;margin-right:auto}.my-1{margin-top:.25rem;margin-bottom:.25rem}.my-4{margin-top:1rem;margin-bottom:1rem}.mb-4{margin-bottom:1rem}.mt-2{margin-top:.5rem}.block{display:block}.inline-block{display:inline-block}.inline{display:inline}.flex{display:flex}.inline-flex{display:inline-flex}.grid{display:grid}.hidden{display:none}.size-7{width:1.75rem;height:1.75rem}.size-8{width:2rem;height:2rem}.h-full{height:100%}.w-full{width:100%}.max-w-lg{max-width:32rem}.max-w-screen-lg{max-width:1024px}.flex-grow{flex-grow:1}@keyframes spin{to{transform:rotate(360deg)}}.animate-spin{animation:spin 1s linear infinite}.cursor-pointer{cursor:pointer}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.flex-col{flex-direction:column}.items-center{align-items:center}.justify-center{justify-content:center}.gap-12{gap:3rem}.space-x-2>:not([hidden])~:not([hidden]){--tw-space-x-reverse: 0;margin-right:calc(.5rem * var(--tw-space-x-reverse));margin-left:calc(.5rem * calc(1 - var(--tw-space-x-reverse)))}.overflow-hidden{overflow:hidden}.rounded{border-radius:.25rem}.\\!bg-\\[var\\(--consent-button-bg-color\\,\\#EC7D28\\)\\]{background-color:var(--consent-button-bg-color,#EC7D28)!important}.bg-black{--tw-bg-opacity: 1;background-color:rgb(0 0 0 / var(--tw-bg-opacity))}.bg-gray-100{--tw-bg-opacity: 1;background-color:rgb(243 244 246 / var(--tw-bg-opacity))}.bg-white{--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity))}.object-cover{-o-object-fit:cover;object-fit:cover}.px-2{padding-left:.5rem;padding-right:.5rem}.py-1{padding-top:.25rem;padding-bottom:.25rem}.py-8{padding-top:2rem;padding-bottom:2rem}.text-center{text-align:center}.text-xs{font-size:.75rem;line-height:1rem}.font-medium{font-weight:500}.font-normal{font-weight:400}.\\!text-\\[var\\(--consent-button-text-color\\,\\#FFFFFF\\)\\]{color:var(--consent-button-text-color,#FFFFFF)!important}.text-\\[var\\(--consent-spinner-color\\)\\]{color:var(--consent-spinner-color)}.text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}.no-underline{text-decoration-line:none}.opacity-25{opacity:.25}.opacity-75{opacity:.75}.opacity-\\[var\\(--consent-bg-opacity\\,20\\%\\)\\]{opacity:var(--consent-bg-opacity,20%)}.ring-\\[var\\(--consent-button-bg-color-hover\\,\\#EC7D28\\)\\]{--tw-ring-color: var(--consent-button-bg-color-hover,#EC7D28)}.ring-offset-2{--tw-ring-offset-width: 2px}.ring-offset-black{--tw-ring-offset-color: #000}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.\\@container{container-type:inline-size}@container (min-width: 24rem){.\\@sm\\:prose-sm{font-size:.875rem;line-height:1.7142857}.\\@sm\\:prose-sm :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.1428571em;margin-bottom:1.1428571em}.\\@sm\\:prose-sm :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:1.2857143em;line-height:1.5555556;margin-top:.8888889em;margin-bottom:.8888889em}.\\@sm\\:prose-sm :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.3333333em;margin-bottom:1.3333333em;padding-left:1.1111111em}.\\@sm\\:prose-sm :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:2.1428571em;margin-top:0;margin-bottom:.8em;line-height:1.2}.\\@sm\\:prose-sm :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:1.4285714em;margin-top:1.6em;margin-bottom:.8em;line-height:1.4}.\\@sm\\:prose-sm :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:1.2857143em;margin-top:1.5555556em;margin-bottom:.4444444em;line-height:1.5555556}.\\@sm\\:prose-sm :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.4285714em;margin-bottom:.5714286em;line-height:1.4285714}.\\@sm\\:prose-sm :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7142857em;margin-bottom:1.7142857em}.\\@sm\\:prose-sm :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7142857em;margin-bottom:1.7142857em}.\\@sm\\:prose-sm :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.\\@sm\\:prose-sm :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7142857em;margin-bottom:1.7142857em}.\\@sm\\:prose-sm :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8571429em;border-radius:.3125rem;padding:.1428571em .3571429em}.\\@sm\\:prose-sm :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8571429em}.\\@sm\\:prose-sm :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.9em}.\\@sm\\:prose-sm :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8888889em}.\\@sm\\:prose-sm :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8571429em;line-height:1.6666667;margin-top:1.6666667em;margin-bottom:1.6666667em;border-radius:.25rem;padding:.6666667em 1em}.\\@sm\\:prose-sm :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.1428571em;margin-bottom:1.1428571em;padding-left:1.5714286em}.\\@sm\\:prose-sm :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.1428571em;margin-bottom:1.1428571em;padding-left:1.5714286em}.\\@sm\\:prose-sm :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.2857143em;margin-bottom:.2857143em}.\\@sm\\:prose-sm :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:.4285714em}.\\@sm\\:prose-sm :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:.4285714em}.\\@sm\\:prose-sm :where(.\\@sm\\:prose-sm>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5714286em;margin-bottom:.5714286em}.\\@sm\\:prose-sm :where(.\\@sm\\:prose-sm>ul>li>*:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.1428571em}.\\@sm\\:prose-sm :where(.\\@sm\\:prose-sm>ul>li>*:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.1428571em}.\\@sm\\:prose-sm :where(.\\@sm\\:prose-sm>ol>li>*:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.1428571em}.\\@sm\\:prose-sm :where(.\\@sm\\:prose-sm>ol>li>*:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.1428571em}.\\@sm\\:prose-sm :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5714286em;margin-bottom:.5714286em}.\\@sm\\:prose-sm :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.1428571em;margin-bottom:1.1428571em}.\\@sm\\:prose-sm :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.1428571em}.\\@sm\\:prose-sm :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.2857143em;padding-left:1.5714286em}.\\@sm\\:prose-sm :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2.8571429em;margin-bottom:2.8571429em}.\\@sm\\:prose-sm :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.\\@sm\\:prose-sm :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.\\@sm\\:prose-sm :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.\\@sm\\:prose-sm :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.\\@sm\\:prose-sm :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8571429em;line-height:1.5}.\\@sm\\:prose-sm :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:1em;padding-bottom:.6666667em;padding-left:1em}.\\@sm\\:prose-sm :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:0}.\\@sm\\:prose-sm :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:0}.\\@sm\\:prose-sm :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding:.6666667em 1em}.\\@sm\\:prose-sm :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:0}.\\@sm\\:prose-sm :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:0}.\\@sm\\:prose-sm :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7142857em;margin-bottom:1.7142857em}.\\@sm\\:prose-sm :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.\\@sm\\:prose-sm :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8571429em;line-height:1.3333333;margin-top:.6666667em}.\\@sm\\:prose-sm :where(.\\@sm\\:prose-sm>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.\\@sm\\:prose-sm :where(.\\@sm\\:prose-sm>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}}@container (min-width: 28rem){.\\@md\\:prose-base{font-size:1rem;line-height:1.75}.\\@md\\:prose-base :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.\\@md\\:prose-base :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:1.25em;line-height:1.6;margin-top:1.2em;margin-bottom:1.2em}.\\@md\\:prose-base :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.6em;margin-bottom:1.6em;padding-left:1em}.\\@md\\:prose-base :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:2.25em;margin-top:0;margin-bottom:.8888889em;line-height:1.1111111}.\\@md\\:prose-base :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:1.5em;margin-top:2em;margin-bottom:1em;line-height:1.3333333}.\\@md\\:prose-base :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:1.25em;margin-top:1.6em;margin-bottom:.6em;line-height:1.6}.\\@md\\:prose-base :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.5em;margin-bottom:.5em;line-height:1.5}.\\@md\\:prose-base :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.\\@md\\:prose-base :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.\\@md\\:prose-base :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.\\@md\\:prose-base :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.\\@md\\:prose-base :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.875em;border-radius:.3125rem;padding:.1875em .375em}.\\@md\\:prose-base :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.875em}.\\@md\\:prose-base :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.875em}.\\@md\\:prose-base :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.9em}.\\@md\\:prose-base :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.875em;line-height:1.7142857;margin-top:1.7142857em;margin-bottom:1.7142857em;border-radius:.375rem;padding:.8571429em 1.1428571em}.\\@md\\:prose-base :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-left:1.625em}.\\@md\\:prose-base :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-left:1.625em}.\\@md\\:prose-base :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;margin-bottom:.5em}.\\@md\\:prose-base :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:.375em}.\\@md\\:prose-base :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:.375em}.\\@md\\:prose-base :where(.\\@md\\:prose-base>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.\\@md\\:prose-base :where(.\\@md\\:prose-base>ul>li>*:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.\\@md\\:prose-base :where(.\\@md\\:prose-base>ul>li>*:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.\\@md\\:prose-base :where(.\\@md\\:prose-base>ol>li>*:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.\\@md\\:prose-base :where(.\\@md\\:prose-base>ol>li>*:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.\\@md\\:prose-base :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.\\@md\\:prose-base :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.\\@md\\:prose-base :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.\\@md\\:prose-base :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;padding-left:1.625em}.\\@md\\:prose-base :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:3em;margin-bottom:3em}.\\@md\\:prose-base :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.\\@md\\:prose-base :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.\\@md\\:prose-base :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.\\@md\\:prose-base :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.\\@md\\:prose-base :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.875em;line-height:1.7142857}.\\@md\\:prose-base :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:.5714286em;padding-bottom:.5714286em;padding-left:.5714286em}.\\@md\\:prose-base :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:0}.\\@md\\:prose-base :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:0}.\\@md\\:prose-base :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding:.5714286em}.\\@md\\:prose-base :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:0}.\\@md\\:prose-base :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:0}.\\@md\\:prose-base :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.\\@md\\:prose-base :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.\\@md\\:prose-base :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.875em;line-height:1.4285714;margin-top:.8571429em}.\\@md\\:prose-base :where(.\\@md\\:prose-base>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.\\@md\\:prose-base :where(.\\@md\\:prose-base>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}}@container (min-width: 72rem){.\\@6xl\\:prose-xl{font-size:1.25rem;line-height:1.8}.\\@6xl\\:prose-xl :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.2em;margin-bottom:1.2em}.\\@6xl\\:prose-xl :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:1.2em;line-height:1.5;margin-top:1em;margin-bottom:1em}.\\@6xl\\:prose-xl :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.6em;margin-bottom:1.6em;padding-left:1.0666667em}.\\@6xl\\:prose-xl :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:2.8em;margin-top:0;margin-bottom:.8571429em;line-height:1}.\\@6xl\\:prose-xl :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:1.8em;margin-top:1.5555556em;margin-bottom:.8888889em;line-height:1.1111111}.\\@6xl\\:prose-xl :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:1.5em;margin-top:1.6em;margin-bottom:.6666667em;line-height:1.3333333}.\\@6xl\\:prose-xl :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.8em;margin-bottom:.6em;line-height:1.6}.\\@6xl\\:prose-xl :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.\\@6xl\\:prose-xl :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.\\@6xl\\:prose-xl :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.\\@6xl\\:prose-xl :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.\\@6xl\\:prose-xl :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.9em;border-radius:.3125rem;padding:.25em .4em}.\\@6xl\\:prose-xl :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.9em}.\\@6xl\\:prose-xl :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8611111em}.\\@6xl\\:prose-xl :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.9em}.\\@6xl\\:prose-xl :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.9em;line-height:1.7777778;margin-top:2em;margin-bottom:2em;border-radius:.5rem;padding:1.1111111em 1.3333333em}.\\@6xl\\:prose-xl :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.2em;margin-bottom:1.2em;padding-left:1.6em}.\\@6xl\\:prose-xl :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.2em;margin-bottom:1.2em;padding-left:1.6em}.\\@6xl\\:prose-xl :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.6em;margin-bottom:.6em}.\\@6xl\\:prose-xl :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:.4em}.\\@6xl\\:prose-xl :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:.4em}.\\@6xl\\:prose-xl :where(.\\@6xl\\:prose-xl>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.8em;margin-bottom:.8em}.\\@6xl\\:prose-xl :where(.\\@6xl\\:prose-xl>ul>li>*:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.2em}.\\@6xl\\:prose-xl :where(.\\@6xl\\:prose-xl>ul>li>*:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.2em}.\\@6xl\\:prose-xl :where(.\\@6xl\\:prose-xl>ol>li>*:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.2em}.\\@6xl\\:prose-xl :where(.\\@6xl\\:prose-xl>ol>li>*:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.2em}.\\@6xl\\:prose-xl :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.8em;margin-bottom:.8em}.\\@6xl\\:prose-xl :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.2em;margin-bottom:1.2em}.\\@6xl\\:prose-xl :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.2em}.\\@6xl\\:prose-xl :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.6em;padding-left:1.6em}.\\@6xl\\:prose-xl :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2.8em;margin-bottom:2.8em}.\\@6xl\\:prose-xl :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.\\@6xl\\:prose-xl :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.\\@6xl\\:prose-xl :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.\\@6xl\\:prose-xl :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.\\@6xl\\:prose-xl :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.9em;line-height:1.5555556}.\\@6xl\\:prose-xl :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:.6666667em;padding-bottom:.8888889em;padding-left:.6666667em}.\\@6xl\\:prose-xl :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:0}.\\@6xl\\:prose-xl :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:0}.\\@6xl\\:prose-xl :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding:.8888889em .6666667em}.\\@6xl\\:prose-xl :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:0}.\\@6xl\\:prose-xl :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:0}.\\@6xl\\:prose-xl :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.\\@6xl\\:prose-xl :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.\\@6xl\\:prose-xl :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.9em;line-height:1.5555556;margin-top:1em}.\\@6xl\\:prose-xl :where(.\\@6xl\\:prose-xl>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.\\@6xl\\:prose-xl :where(.\\@6xl\\:prose-xl>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}}.hover\\:\\!bg-\\[var\\(--consent-button-bg-color-hover\\,\\#D76D2A\\)\\]:hover{background-color:var(--consent-button-bg-color-hover,#D76D2A)!important}.hover\\:\\!text-\\[var\\(--consent-button-text-color-hover\\,\\#FFFFFF\\)\\]:hover{color:var(--consent-button-text-color-hover,#FFFFFF)!important}.hover\\:ring:hover{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.prose-a\\:text-\\[var\\(--consent-link-text-color\\,\\#EC7D28\\)\\] :is(:where(a):not(:where([class~=not-prose],[class~=not-prose] *))){color:var(--consent-link-text-color,#EC7D28)}.hover\\:prose-a\\:text-\\[var\\(--consent-link-text-color-hover\\,\\#D76D2A\\)\\] :is(:where(a):not(:where([class~=not-prose],[class~=not-prose] *))):hover{color:var(--consent-link-text-color-hover,#D76D2A)}.prose-ul\\:mt-0 :is(:where(ul):not(:where([class~=not-prose],[class~=not-prose] *))){margin-top:0}.prose-ul\\:list-none :is(:where(ul):not(:where([class~=not-prose],[class~=not-prose] *))){list-style-type:none}.prose-ul\\:pl-0 :is(:where(ul):not(:where([class~=not-prose],[class~=not-prose] *))){padding-left:0}.first\\:prose-li\\:mt-0 :is(:where(li):not(:where([class~=not-prose],[class~=not-prose] *))):first-child{margin-top:0}@container (min-width: 24rem){.\\@sm\\:my-6{margin-top:1.5rem;margin-bottom:1.5rem}.\\@sm\\:inline{display:inline}.\\@sm\\:px-4{padding-left:1rem;padding-right:1rem}.\\@sm\\:py-2{padding-top:.5rem;padding-bottom:.5rem}.\\@sm\\:text-sm{font-size:.875rem;line-height:1.25rem}}@container (min-width: 28rem){.\\@md\\:my-1{margin-top:.25rem;margin-bottom:.25rem}.\\@md\\:my-12{margin-top:3rem;margin-bottom:3rem}.\\@md\\:inline{display:inline}}@container (min-width: 32rem){.\\@lg\\:my-16{margin-top:4rem;margin-bottom:4rem}.\\@lg\\:text-base{font-size:1rem;line-height:1.5rem}}@media (min-width: 640px){.sm\\:my-8{margin-top:2rem;margin-bottom:2rem}.sm\\:text-lg{font-size:1.125rem;line-height:1.75rem}}@media (min-width: 768px){.md\\:my-12{margin-top:3rem;margin-bottom:3rem}.md\\:text-xl{font-size:1.25rem;line-height:1.75rem}}@media (min-width: 1024px){.lg\\:my-16{margin-top:4rem;margin-bottom:4rem}.lg\\:text-2xl{font-size:1.5rem;line-height:2rem}}';
class zh extends I {
  static styles = [
    _t(Th),
    xt`
      :host {
        color: #fff;
        background-color: var(--consent-bg-color, #000000);
        display: block;
      }
      .bg-letters {
        color: white;
        text-shadow:
          1px 1px 2px var(--consent-text-shadow-color, #000000),
          0 0 25px var(--consent-text-shadow-color, #000000),
          0 0 15px var(--consent-text-shadow-color, #000000);
      }
    `
  ];
  static properties = {
    previewImageUrl: { type: String },
    requiredConsents: { type: Array },
    consentStatus: { type: Array },
    UCInitialized: { type: Boolean }
  };
  constructor() {
    super(), this.requiredConsents = [], this.previewImageUrl = "", this.consentStatus = [], this.UCInitialized = !1;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.requiredConsents.length > 0 && window.removeEventListener(
      "onConsentStatusChange",
      this.handleConsentStatusChange
    );
  }
  connectedCallback() {
    super.connectedCallback(), this.requiredConsents.length > 0 && (window.addEventListener("UC_UI_INITIALIZED", (e) => {
      this.UCInitialized = !0, this.refreshConsentStatus();
    }), window.addEventListener(
      "onConsentStatusChange",
      this.handleConsentStatusChange
    ));
  }
  updated(e) {
    if (e.has("consentStatus")) {
      const r = this.querySelector("media-player");
      r && (this.allRequiredConsentsAccepted() || r.pause());
    }
  }
  refreshConsentStatus() {
    const r = UC_UI.getServicesBaseInfo().filter((s) => this.requiredConsents.includes(s.id));
    this.consentStatus = r.map((s) => ({
      id: s.id,
      name: s.name,
      consentGiven: s.consent.status
    }));
  }
  handleConsentStatusChange = (e) => {
    e.detail.event === "consent_status" && e.detail.action === "onUpdateServices" && this.refreshConsentStatus();
  };
  allRequiredConsentsAccepted() {
    return this.consentStatus.every((e) => e.consentGiven === !0);
  }
  acceptedConsents() {
    return this.consentStatus.filter(
      (e) => e.consentGiven === !0
    );
  }
  missingConsents() {
    return this.consentStatus.filter(
      (e) => e.consentGiven === !1
    );
  }
  giveConsentForId(e) {
    UC_UI.acceptService(e).then(() => console.log("Service is accepted"));
  }
  revokeConsentForId(e) {
    UC_UI.rejectService(e).then(() => console.log("Service is rejected"));
  }
  acceptAllRequiredConsents() {
    const e = this.consentStatus.map((r) => r.id);
    UC_UI.acceptServices(e).then(
      () => console.log("All Services are accepted")
    );
  }
  revokeAllRequiredConsents() {
    const e = this.consentStatus.map((r) => r.id);
    UC_UI.rejectServices(e).then(
      () => console.log("All Services are rejected")
    );
  }
  toggleInfocenter(e = null) {
    UC_UI.showSecondLayer(e);
  }
  getInitializingTemplate() {
    return b`
      <div class="prose prose-lg text-white flex flex-col items-center justify-center">
        <svg
          class="animate-spin size-8 text-[var(--consent-spinner-color)] mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span>Warte auf Usercentrics CMP Initialisierung...</span>
        </div>
      </div>
    `;
  }
  getPreviewImageTempalte() {
    return this.previewImageUrl ? b`<img
          src="${this.previewImageUrl}"
          class="h-full w-full object-cover opacity-[var(--consent-bg-opacity,20%)] absolute inset-0 m-0"
          loading="lazy"
        />` : null;
  }
  wrapWithDiv(e) {
    return b`<div
      class="@container absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
    >
      ${this.getPreviewImageTempalte()} ${e}
    </div>`;
  }
  getConsentTemplate() {
    return b`
      <div
        class="py-8 px-2  text-white text-center z-10
            prose prose-sm @sm:prose-sm @md:prose-base @6xl:prose-xl
            prose-ul:pl-0 prose-ul:mt-0 prose-ul:list-none first:prose-li:mt-0
            prose-a:text-[var(--consent-link-text-color,#EC7D28)] hover:prose-a:text-[var(--consent-link-text-color-hover,#D76D2A)]
            "
      >
        <h3 class="bg-letters text-xs ">
          Dieser Inhalt kann aufgrund Ihrer Datenschutzeinstellungen nicht
          angezeigt werden
        </h3>
        <h4 class="my-4 @sm:my-6 @md:my-12 @lg:my-16 font-normal">
          <a
            class="
            text-center py-1 px-2 @sm:py-2 @sm:px-4 rounded no-underline cursor-pointer
            !bg-[var(--consent-button-bg-color,#EC7D28)] hover:!bg-[var(--consent-button-bg-color-hover,#D76D2A)] 
            !text-[var(--consent-button-text-color,#FFFFFF)] hover:!text-[var(--consent-button-text-color-hover,#FFFFFF)] 
            hover:ring ring-offset-black ring-offset-2 ring-[var(--consent-button-bg-color-hover,#EC7D28)]
            inline-flex items-center justify-center space-x-2
            "
            @click=${() => this.acceptAllRequiredConsents()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-7"
            >
              <path
                fill-rule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clip-rule="evenodd"
              />
            </svg>
            <span
              >Cookies akzeptieren<span class="hidden @sm:inline">
                und Inhalt anzeigen</span
              >
            </span>
          </a>
        </h4>
        <p class="hidden @md:inline my-1 @md:my-1">
          Folgende Cookies werden akzeptiert:
        </p>
        <ul>
          ${this.missingConsents().map(
      (e) => b`<li>
                <a
                  class="cursor-pointer text-xs @sm:text-sm @lg:text-base"
                  @click="${() => this.toggleInfocenter(e.id)}"
                >
                  ${e.name}
                </a>
              </li>`
    )}
        </ul>
      </div>
    `;
  }
  render() {
    return this.requiredConsents.length === 0 ? this.wrapWithDiv(b`<slot></slot>`) : this.UCInitialized ? this.allRequiredConsentsAccepted() ? this.wrapWithDiv(b`<slot></slot>`) : this.wrapWithDiv(this.getConsentTemplate()) : this.wrapWithDiv(this.getInitializingTemplate());
  }
}
customElements.define("consent-wall", zh);
export {
  zh as Consent,
  Ph as ConsentV1
};
