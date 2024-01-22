/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const I = globalThis, H = I.ShadowRoot && (I.ShadyCSS === void 0 || I.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, R = Symbol(), j = /* @__PURE__ */ new WeakMap();
let Q = class {
  constructor(e, o, t) {
    if (this._$cssResult$ = !0, t !== R)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = o;
  }
  get styleSheet() {
    let e = this.o;
    const o = this.t;
    if (H && e === void 0) {
      const t = o !== void 0 && o.length === 1;
      t && (e = j.get(o)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), t && j.set(o, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const q = (r) => new Q(typeof r == "string" ? r : r + "", void 0, R), X = (r, ...e) => {
  const o = r.length === 1 ? r[0] : e.reduce((t, s, n) => t + ((i) => {
    if (i._$cssResult$ === !0)
      return i.cssText;
    if (typeof i == "number")
      return i;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + i + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + r[n + 1], r[0]);
  return new Q(o, r, R);
}, ie = (r, e) => {
  if (H)
    r.adoptedStyleSheets = e.map((o) => o instanceof CSSStyleSheet ? o : o.styleSheet);
  else
    for (const o of e) {
      const t = document.createElement("style"), s = I.litNonce;
      s !== void 0 && t.setAttribute("nonce", s), t.textContent = o.cssText, r.appendChild(t);
    }
}, O = H ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let o = "";
  for (const t of e.cssRules)
    o += t.cssText;
  return q(o);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ae, defineProperty: le, getOwnPropertyDescriptor: pe, getOwnPropertyNames: he, getOwnPropertySymbols: ce, getPrototypeOf: me } = Object, D = globalThis, L = D.trustedTypes, de = L ? L.emptyScript : "", ge = D.reactiveElementPolyfillSupport, z = (r, e) => r, M = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? de : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, e) {
  let o = r;
  switch (e) {
    case Boolean:
      o = r !== null;
      break;
    case Number:
      o = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        o = JSON.parse(r);
      } catch {
        o = null;
      }
  }
  return o;
} }, Y = (r, e) => !ae(r, e), B = { attribute: !0, type: String, converter: M, reflect: !1, hasChanged: Y };
Symbol.metadata ??= Symbol("metadata"), D.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
class x extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, o = B) {
    if (o.state && (o.attribute = !1), this._$Ei(), this.elementProperties.set(e, o), !o.noAccessor) {
      const t = Symbol(), s = this.getPropertyDescriptor(e, t, o);
      s !== void 0 && le(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, o, t) {
    const { get: s, set: n } = pe(this.prototype, e) ?? { get() {
      return this[o];
    }, set(i) {
      this[o] = i;
    } };
    return { get() {
      return s?.call(this);
    }, set(i) {
      const m = s?.call(this);
      n.call(this, i), this.requestUpdate(e, m, t);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? B;
  }
  static _$Ei() {
    if (this.hasOwnProperty(z("elementProperties")))
      return;
    const e = me(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(z("finalized")))
      return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(z("properties"))) {
      const o = this.properties, t = [...he(o), ...ce(o)];
      for (const s of t)
        this.createProperty(s, o[s]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const o = litPropertyMetadata.get(e);
      if (o !== void 0)
        for (const [t, s] of o)
          this.elementProperties.set(t, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [o, t] of this.elementProperties) {
      const s = this._$Eu(o, t);
      s !== void 0 && this._$Eh.set(s, o);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const o = [];
    if (Array.isArray(e)) {
      const t = new Set(e.flat(1 / 0).reverse());
      for (const s of t)
        o.unshift(O(s));
    } else
      e !== void 0 && o.push(O(e));
    return o;
  }
  static _$Eu(e, o) {
    const t = o.attribute;
    return t === !1 ? void 0 : typeof t == "string" ? t : typeof e == "string" ? e.toLowerCase() : void 0;
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
    const e = /* @__PURE__ */ new Map(), o = this.constructor.elementProperties;
    for (const t of o.keys())
      this.hasOwnProperty(t) && (e.set(t, this[t]), delete this[t]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ie(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$E_?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$E_?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, o, t) {
    this._$AK(e, t);
  }
  _$EO(e, o) {
    const t = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, t);
    if (s !== void 0 && t.reflect === !0) {
      const n = (t.converter?.toAttribute !== void 0 ? t.converter : M).toAttribute(o, t.type);
      this._$Em = e, n == null ? this.removeAttribute(s) : this.setAttribute(s, n), this._$Em = null;
    }
  }
  _$AK(e, o) {
    const t = this.constructor, s = t._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const n = t.getPropertyOptions(s), i = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : M;
      this._$Em = s, this[s] = i.fromAttribute(o, n.type), this._$Em = null;
    }
  }
  requestUpdate(e, o, t) {
    if (e !== void 0) {
      if (t ??= this.constructor.getPropertyOptions(e), !(t.hasChanged ?? Y)(this[e], o))
        return;
      this.C(e, o, t);
    }
    this.isUpdatePending === !1 && (this._$Eg = this._$EP());
  }
  C(e, o, t) {
    this._$AL.has(e) || this._$AL.set(e, o), t.reflect === !0 && this._$Em !== e && (this._$ET ??= /* @__PURE__ */ new Set()).add(e);
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$Eg;
    } catch (o) {
      Promise.reject(o);
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
        for (const [s, n] of this._$Ep)
          this[s] = n;
        this._$Ep = void 0;
      }
      const t = this.constructor.elementProperties;
      if (t.size > 0)
        for (const [s, n] of t)
          n.wrapped !== !0 || this._$AL.has(s) || this[s] === void 0 || this.C(s, this[s], n);
    }
    let e = !1;
    const o = this._$AL;
    try {
      e = this.shouldUpdate(o), e ? (this.willUpdate(o), this._$E_?.forEach((t) => t.hostUpdate?.()), this.update(o)) : this._$Ej();
    } catch (t) {
      throw e = !1, this._$Ej(), t;
    }
    e && this._$AE(o);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$E_?.forEach((o) => o.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
    this._$ET &&= this._$ET.forEach((o) => this._$EO(o, this[o])), this._$Ej();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
}
x.elementStyles = [], x.shadowRootOptions = { mode: "open" }, x[z("elementProperties")] = /* @__PURE__ */ new Map(), x[z("finalized")] = /* @__PURE__ */ new Map(), ge?.({ ReactiveElement: x }), (D.reactiveElementVersions ??= []).push("2.0.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const N = globalThis, P = N.trustedTypes, W = P ? P.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, ee = "$lit$", b = `lit$${(Math.random() + "").slice(9)}$`, oe = "?" + b, we = `<${oe}>`, v = document, C = () => v.createComment(""), k = (r) => r === null || typeof r != "object" && typeof r != "function", te = Array.isArray, be = (r) => te(r) || typeof r?.[Symbol.iterator] == "function", T = `[ 	
\f\r]`, A = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, V = /-->/g, Z = />/g, f = RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), G = /'/g, J = /"/g, se = /^(?:script|style|textarea|title)$/i, fe = (r) => (e, ...o) => ({ _$litType$: r, strings: e, values: o }), d = fe(1), $ = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), K = /* @__PURE__ */ new WeakMap(), u = v.createTreeWalker(v, 129);
function re(r, e) {
  if (!Array.isArray(r) || !r.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return W !== void 0 ? W.createHTML(e) : e;
}
const ue = (r, e) => {
  const o = r.length - 1, t = [];
  let s, n = e === 2 ? "<svg>" : "", i = A;
  for (let m = 0; m < o; m++) {
    const a = r[m];
    let p, c, l = -1, g = 0;
    for (; g < a.length && (i.lastIndex = g, c = i.exec(a), c !== null); )
      g = i.lastIndex, i === A ? c[1] === "!--" ? i = V : c[1] !== void 0 ? i = Z : c[2] !== void 0 ? (se.test(c[2]) && (s = RegExp("</" + c[2], "g")), i = f) : c[3] !== void 0 && (i = f) : i === f ? c[0] === ">" ? (i = s ?? A, l = -1) : c[1] === void 0 ? l = -2 : (l = i.lastIndex - c[2].length, p = c[1], i = c[3] === void 0 ? f : c[3] === '"' ? J : G) : i === J || i === G ? i = f : i === V || i === Z ? i = A : (i = f, s = void 0);
    const w = i === f && r[m + 1].startsWith("/>") ? " " : "";
    n += i === A ? a + we : l >= 0 ? (t.push(p), a.slice(0, l) + ee + a.slice(l) + b + w) : a + b + (l === -2 ? m : w);
  }
  return [re(r, n + (r[o] || "<?>") + (e === 2 ? "</svg>" : "")), t];
};
class S {
  constructor({ strings: e, _$litType$: o }, t) {
    let s;
    this.parts = [];
    let n = 0, i = 0;
    const m = e.length - 1, a = this.parts, [p, c] = ue(e, o);
    if (this.el = S.createElement(p, t), u.currentNode = this.el.content, o === 2) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (s = u.nextNode()) !== null && a.length < m; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes())
          for (const l of s.getAttributeNames())
            if (l.endsWith(ee)) {
              const g = c[i++], w = s.getAttribute(l).split(b), U = /([.?@])?(.*)/.exec(g);
              a.push({ type: 1, index: n, name: U[2], strings: w, ctor: U[1] === "." ? xe : U[1] === "?" ? ye : U[1] === "@" ? $e : F }), s.removeAttribute(l);
            } else
              l.startsWith(b) && (a.push({ type: 6, index: n }), s.removeAttribute(l));
        if (se.test(s.tagName)) {
          const l = s.textContent.split(b), g = l.length - 1;
          if (g > 0) {
            s.textContent = P ? P.emptyScript : "";
            for (let w = 0; w < g; w++)
              s.append(l[w], C()), u.nextNode(), a.push({ type: 2, index: ++n });
            s.append(l[g], C());
          }
        }
      } else if (s.nodeType === 8)
        if (s.data === oe)
          a.push({ type: 2, index: n });
        else {
          let l = -1;
          for (; (l = s.data.indexOf(b, l + 1)) !== -1; )
            a.push({ type: 7, index: n }), l += b.length - 1;
        }
      n++;
    }
  }
  static createElement(e, o) {
    const t = v.createElement("template");
    return t.innerHTML = e, t;
  }
}
function _(r, e, o = r, t) {
  if (e === $)
    return e;
  let s = t !== void 0 ? o._$Co?.[t] : o._$Cl;
  const n = k(e) ? void 0 : e._$litDirective$;
  return s?.constructor !== n && (s?._$AO?.(!1), n === void 0 ? s = void 0 : (s = new n(r), s._$AT(r, o, t)), t !== void 0 ? (o._$Co ??= [])[t] = s : o._$Cl = s), s !== void 0 && (e = _(r, s._$AS(r, e.values), s, t)), e;
}
class ve {
  constructor(e, o) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = o;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: o }, parts: t } = this._$AD, s = (e?.creationScope ?? v).importNode(o, !0);
    u.currentNode = s;
    let n = u.nextNode(), i = 0, m = 0, a = t[0];
    for (; a !== void 0; ) {
      if (i === a.index) {
        let p;
        a.type === 2 ? p = new E(n, n.nextSibling, this, e) : a.type === 1 ? p = new a.ctor(n, a.name, a.strings, this, e) : a.type === 6 && (p = new _e(n, this, e)), this._$AV.push(p), a = t[++m];
      }
      i !== a?.index && (n = u.nextNode(), i++);
    }
    return u.currentNode = v, s;
  }
  p(e) {
    let o = 0;
    for (const t of this._$AV)
      t !== void 0 && (t.strings !== void 0 ? (t._$AI(e, t, o), o += t.strings.length - 2) : t._$AI(e[o])), o++;
  }
}
class E {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, o, t, s) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = e, this._$AB = o, this._$AM = t, this.options = s, this._$Cv = s?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const o = this._$AM;
    return o !== void 0 && e?.nodeType === 11 && (e = o.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, o = this) {
    e = _(this, e, o), k(e) ? e === h || e == null || e === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : e !== this._$AH && e !== $ && this._(e) : e._$litType$ !== void 0 ? this.g(e) : e.nodeType !== void 0 ? this.$(e) : be(e) ? this.T(e) : this._(e);
  }
  k(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  $(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.k(e));
  }
  _(e) {
    this._$AH !== h && k(this._$AH) ? this._$AA.nextSibling.data = e : this.$(v.createTextNode(e)), this._$AH = e;
  }
  g(e) {
    const { values: o, _$litType$: t } = e, s = typeof t == "number" ? this._$AC(e) : (t.el === void 0 && (t.el = S.createElement(re(t.h, t.h[0]), this.options)), t);
    if (this._$AH?._$AD === s)
      this._$AH.p(o);
    else {
      const n = new ve(s, this), i = n.u(this.options);
      n.p(o), this.$(i), this._$AH = n;
    }
  }
  _$AC(e) {
    let o = K.get(e.strings);
    return o === void 0 && K.set(e.strings, o = new S(e)), o;
  }
  T(e) {
    te(this._$AH) || (this._$AH = [], this._$AR());
    const o = this._$AH;
    let t, s = 0;
    for (const n of e)
      s === o.length ? o.push(t = new E(this.k(C()), this.k(C()), this, this.options)) : t = o[s], t._$AI(n), s++;
    s < o.length && (this._$AR(t && t._$AB.nextSibling, s), o.length = s);
  }
  _$AR(e = this._$AA.nextSibling, o) {
    for (this._$AP?.(!1, !0, o); e && e !== this._$AB; ) {
      const t = e.nextSibling;
      e.remove(), e = t;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class F {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, o, t, s, n) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = e, this.name = o, this._$AM = s, this.options = n, t.length > 2 || t[0] !== "" || t[1] !== "" ? (this._$AH = Array(t.length - 1).fill(new String()), this.strings = t) : this._$AH = h;
  }
  _$AI(e, o = this, t, s) {
    const n = this.strings;
    let i = !1;
    if (n === void 0)
      e = _(this, e, o, 0), i = !k(e) || e !== this._$AH && e !== $, i && (this._$AH = e);
    else {
      const m = e;
      let a, p;
      for (e = n[0], a = 0; a < n.length - 1; a++)
        p = _(this, m[t + a], o, a), p === $ && (p = this._$AH[a]), i ||= !k(p) || p !== this._$AH[a], p === h ? e = h : e !== h && (e += (p ?? "") + n[a + 1]), this._$AH[a] = p;
    }
    i && !s && this.O(e);
  }
  O(e) {
    e === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class xe extends F {
  constructor() {
    super(...arguments), this.type = 3;
  }
  O(e) {
    this.element[this.name] = e === h ? void 0 : e;
  }
}
class ye extends F {
  constructor() {
    super(...arguments), this.type = 4;
  }
  O(e) {
    this.element.toggleAttribute(this.name, !!e && e !== h);
  }
}
class $e extends F {
  constructor(e, o, t, s, n) {
    super(e, o, t, s, n), this.type = 5;
  }
  _$AI(e, o = this) {
    if ((e = _(this, e, o, 0) ?? h) === $)
      return;
    const t = this._$AH, s = e === h && t !== h || e.capture !== t.capture || e.once !== t.once || e.passive !== t.passive, n = e !== h && (t === h || s);
    s && this.element.removeEventListener(this.name, this, t), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class _e {
  constructor(e, o, t) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = o, this.options = t;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    _(this, e);
  }
}
const Ae = N.litHtmlPolyfillSupport;
Ae?.(S, E), (N.litHtmlVersions ??= []).push("3.1.1");
const ze = (r, e, o) => {
  const t = o?.renderBefore ?? e;
  let s = t._$litPart$;
  if (s === void 0) {
    const n = o?.renderBefore ?? null;
    t._$litPart$ = s = new E(e.insertBefore(C(), n), n, void 0, o ?? {});
  }
  return s._$AI(r), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class y extends x {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const o = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ze(o, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return $;
  }
}
y._$litElement$ = !0, y.finalized = !0, globalThis.litElementHydrateSupport?.({ LitElement: y });
const Ce = globalThis.litElementPolyfillSupport;
Ce?.({ LitElement: y });
(globalThis.litElementVersions ??= []).push("4.0.3");
const ne = '*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:before,:after{--tw-content: ""}html,:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.prose{color:var(--tw-prose-body);max-width:65ch}.prose :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.prose :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-lead);font-size:1.25em;line-height:1.6;margin-top:1.2em;margin-bottom:1.2em}.prose :where(a):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-links);text-decoration:underline;font-weight:500}.prose :where(strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-bold);font-weight:600}.prose :where(a strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.prose :where(blockquote strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.prose :where(thead th strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.prose :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:decimal;margin-top:1.25em;margin-bottom:1.25em;padding-left:1.625em}.prose :where(ol[type=A]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.prose :where(ol[type=a]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.prose :where(ol[type=A s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.prose :where(ol[type=a s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.prose :where(ol[type=I]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.prose :where(ol[type=i]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.prose :where(ol[type=I s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.prose :where(ol[type=i s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.prose :where(ol[type="1"]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:decimal}.prose :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:disc;margin-top:1.25em;margin-bottom:1.25em;padding-left:1.625em}.prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{font-weight:400;color:var(--tw-prose-counters)}.prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-bullets)}.prose :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);font-weight:600;margin-top:1.25em}.prose :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){border-color:var(--tw-prose-hr);border-top-width:1px;margin-top:3em;margin-bottom:3em}.prose :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:500;font-style:italic;color:var(--tw-prose-quotes);border-left-width:.25rem;border-left-color:var(--tw-prose-quote-borders);quotes:"“""”""‘""’";margin-top:1.6em;margin-bottom:1.6em;padding-left:1em}.prose :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before{content:open-quote}.prose :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:close-quote}.prose :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);font-weight:800;font-size:2.25em;margin-top:0;margin-bottom:.8888889em;line-height:1.1111111}.prose :where(h1 strong):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:900;color:inherit}.prose :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);font-weight:700;font-size:1.5em;margin-top:2em;margin-bottom:1em;line-height:1.3333333}.prose :where(h2 strong):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:800;color:inherit}.prose :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);font-weight:600;font-size:1.25em;margin-top:1.6em;margin-bottom:.6em;line-height:1.6}.prose :where(h3 strong):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:700;color:inherit}.prose :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);font-weight:600;margin-top:1.5em;margin-bottom:.5em;line-height:1.5}.prose :where(h4 strong):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:700;color:inherit}.prose :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.prose :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){display:block;margin-top:2em;margin-bottom:2em}.prose :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:500;font-family:inherit;color:var(--tw-prose-kbd);box-shadow:0 0 0 1px rgb(var(--tw-prose-kbd-shadows) / 10%),0 3px rgb(var(--tw-prose-kbd-shadows) / 10%);font-size:.875em;border-radius:.3125rem;padding:.1875em .375em}.prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-code);font-weight:600;font-size:.875em}.prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):before{content:"`"}.prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:"`"}.prose :where(a code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.prose :where(h1 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.prose :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.875em}.prose :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.9em}.prose :where(h4 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.prose :where(blockquote code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.prose :where(thead th code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.prose :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-pre-code);background-color:var(--tw-prose-pre-bg);overflow-x:auto;font-weight:400;font-size:.875em;line-height:1.7142857;margin-top:1.7142857em;margin-bottom:1.7142857em;border-radius:.375rem;padding:.8571429em 1.1428571em}.prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)){background-color:transparent;border-width:0;border-radius:0;padding:0;font-weight:inherit;color:inherit;font-size:inherit;font-family:inherit;line-height:inherit}.prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):before{content:none}.prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.prose :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){width:100%;table-layout:auto;text-align:left;margin-top:2em;margin-bottom:2em;font-size:.875em;line-height:1.7142857}.prose :where(thead):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-th-borders)}.prose :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);font-weight:600;vertical-align:bottom;padding-right:.5714286em;padding-bottom:.5714286em;padding-left:.5714286em}.prose :where(tbody tr):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-td-borders)}.prose :where(tbody tr:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:0}.prose :where(tbody td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:baseline}.prose :where(tfoot):not(:where([class~=not-prose],[class~=not-prose] *)){border-top-width:1px;border-top-color:var(--tw-prose-th-borders)}.prose :where(tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:top}.prose :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.prose :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-captions);font-size:.875em;line-height:1.4285714;margin-top:.8571429em}.prose{--tw-prose-body: #374151;--tw-prose-headings: #111827;--tw-prose-lead: #4b5563;--tw-prose-links: #111827;--tw-prose-bold: #111827;--tw-prose-counters: #6b7280;--tw-prose-bullets: #d1d5db;--tw-prose-hr: #e5e7eb;--tw-prose-quotes: #111827;--tw-prose-quote-borders: #e5e7eb;--tw-prose-captions: #6b7280;--tw-prose-kbd: #111827;--tw-prose-kbd-shadows: 17 24 39;--tw-prose-code: #111827;--tw-prose-pre-code: #e5e7eb;--tw-prose-pre-bg: #1f2937;--tw-prose-th-borders: #d1d5db;--tw-prose-td-borders: #e5e7eb;--tw-prose-invert-body: #d1d5db;--tw-prose-invert-headings: #fff;--tw-prose-invert-lead: #9ca3af;--tw-prose-invert-links: #fff;--tw-prose-invert-bold: #fff;--tw-prose-invert-counters: #9ca3af;--tw-prose-invert-bullets: #4b5563;--tw-prose-invert-hr: #374151;--tw-prose-invert-quotes: #f3f4f6;--tw-prose-invert-quote-borders: #374151;--tw-prose-invert-captions: #9ca3af;--tw-prose-invert-kbd: #fff;--tw-prose-invert-kbd-shadows: 255 255 255;--tw-prose-invert-code: #fff;--tw-prose-invert-pre-code: #d1d5db;--tw-prose-invert-pre-bg: rgb(0 0 0 / 50%);--tw-prose-invert-th-borders: #4b5563;--tw-prose-invert-td-borders: #374151;font-size:1rem;line-height:1.75}.prose :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.prose :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.prose :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;margin-bottom:.5em}.prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:.375em}.prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:.375em}.prose :where(.prose>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.prose :where(.prose>ul>li>*:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.prose :where(.prose>ul>li>*:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.prose :where(.prose>ol>li>*:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.prose :where(.prose>ol>li>*:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.prose :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.prose :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.prose :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;padding-left:1.625em}.prose :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:0}.prose :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:0}.prose :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding:.5714286em}.prose :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:0}.prose :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:0}.prose :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.prose :where(.prose>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose :where(.prose>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.prose-sm{font-size:.875rem;line-height:1.7142857}.prose-sm :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.1428571em;margin-bottom:1.1428571em}.prose-sm :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:1.2857143em;line-height:1.5555556;margin-top:.8888889em;margin-bottom:.8888889em}.prose-sm :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.3333333em;margin-bottom:1.3333333em;padding-left:1.1111111em}.prose-sm :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:2.1428571em;margin-top:0;margin-bottom:.8em;line-height:1.2}.prose-sm :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:1.4285714em;margin-top:1.6em;margin-bottom:.8em;line-height:1.4}.prose-sm :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:1.2857143em;margin-top:1.5555556em;margin-bottom:.4444444em;line-height:1.5555556}.prose-sm :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.4285714em;margin-bottom:.5714286em;line-height:1.4285714}.prose-sm :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7142857em;margin-bottom:1.7142857em}.prose-sm :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7142857em;margin-bottom:1.7142857em}.prose-sm :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.prose-sm :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7142857em;margin-bottom:1.7142857em}.prose-sm :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8571429em;border-radius:.3125rem;padding:.1428571em .3571429em}.prose-sm :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8571429em}.prose-sm :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.9em}.prose-sm :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8888889em}.prose-sm :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8571429em;line-height:1.6666667;margin-top:1.6666667em;margin-bottom:1.6666667em;border-radius:.25rem;padding:.6666667em 1em}.prose-sm :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.1428571em;margin-bottom:1.1428571em;padding-left:1.5714286em}.prose-sm :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.1428571em;margin-bottom:1.1428571em;padding-left:1.5714286em}.prose-sm :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.2857143em;margin-bottom:.2857143em}.prose-sm :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:.4285714em}.prose-sm :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:.4285714em}.prose-sm :where(.prose-sm>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5714286em;margin-bottom:.5714286em}.prose-sm :where(.prose-sm>ul>li>*:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.1428571em}.prose-sm :where(.prose-sm>ul>li>*:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.1428571em}.prose-sm :where(.prose-sm>ol>li>*:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.1428571em}.prose-sm :where(.prose-sm>ol>li>*:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.1428571em}.prose-sm :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5714286em;margin-bottom:.5714286em}.prose-sm :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.1428571em;margin-bottom:1.1428571em}.prose-sm :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.1428571em}.prose-sm :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.2857143em;padding-left:1.5714286em}.prose-sm :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2.8571429em;margin-bottom:2.8571429em}.prose-sm :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose-sm :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose-sm :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose-sm :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose-sm :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8571429em;line-height:1.5}.prose-sm :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:1em;padding-bottom:.6666667em;padding-left:1em}.prose-sm :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:0}.prose-sm :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:0}.prose-sm :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding:.6666667em 1em}.prose-sm :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:0}.prose-sm :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:0}.prose-sm :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7142857em;margin-bottom:1.7142857em}.prose-sm :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.prose-sm :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8571429em;line-height:1.3333333;margin-top:.6666667em}.prose-sm :where(.prose-sm>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose-sm :where(.prose-sm>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.prose-lg{font-size:1.125rem;line-height:1.7777778}.prose-lg :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.3333333em;margin-bottom:1.3333333em}.prose-lg :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:1.2222222em;line-height:1.4545455;margin-top:1.0909091em;margin-bottom:1.0909091em}.prose-lg :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.6666667em;margin-bottom:1.6666667em;padding-left:1em}.prose-lg :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:2.6666667em;margin-top:0;margin-bottom:.8333333em;line-height:1}.prose-lg :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:1.6666667em;margin-top:1.8666667em;margin-bottom:1.0666667em;line-height:1.3333333}.prose-lg :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:1.3333333em;margin-top:1.6666667em;margin-bottom:.6666667em;line-height:1.5}.prose-lg :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7777778em;margin-bottom:.4444444em;line-height:1.5555556}.prose-lg :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7777778em;margin-bottom:1.7777778em}.prose-lg :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7777778em;margin-bottom:1.7777778em}.prose-lg :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.prose-lg :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7777778em;margin-bottom:1.7777778em}.prose-lg :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8888889em;border-radius:.3125rem;padding:.2222222em .4444444em}.prose-lg :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8888889em}.prose-lg :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8666667em}.prose-lg :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.875em}.prose-lg :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8888889em;line-height:1.75;margin-top:2em;margin-bottom:2em;border-radius:.375rem;padding:1em 1.5em}.prose-lg :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.3333333em;margin-bottom:1.3333333em;padding-left:1.5555556em}.prose-lg :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.3333333em;margin-bottom:1.3333333em;padding-left:1.5555556em}.prose-lg :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.6666667em;margin-bottom:.6666667em}.prose-lg :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:.4444444em}.prose-lg :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:.4444444em}.prose-lg :where(.prose-lg>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.8888889em;margin-bottom:.8888889em}.prose-lg :where(.prose-lg>ul>li>*:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.3333333em}.prose-lg :where(.prose-lg>ul>li>*:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.3333333em}.prose-lg :where(.prose-lg>ol>li>*:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.3333333em}.prose-lg :where(.prose-lg>ol>li>*:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.3333333em}.prose-lg :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.8888889em;margin-bottom:.8888889em}.prose-lg :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.3333333em;margin-bottom:1.3333333em}.prose-lg :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.3333333em}.prose-lg :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.6666667em;padding-left:1.5555556em}.prose-lg :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:3.1111111em;margin-bottom:3.1111111em}.prose-lg :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose-lg :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose-lg :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose-lg :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose-lg :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8888889em;line-height:1.5}.prose-lg :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:.75em;padding-bottom:.75em;padding-left:.75em}.prose-lg :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:0}.prose-lg :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:0}.prose-lg :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding:.75em}.prose-lg :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:0}.prose-lg :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:0}.prose-lg :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7777778em;margin-bottom:1.7777778em}.prose-lg :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.prose-lg :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8888889em;line-height:1.5;margin-top:1em}.prose-lg :where(.prose-lg>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose-lg :where(.prose-lg>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.static{position:static}.absolute{position:absolute}.relative{position:relative}.inset-0{inset:0}.z-10{z-index:10}.z-\\[-1\\]{z-index:-1}.m-0{margin:0}.mx-auto{margin-left:auto;margin-right:auto}.my-1{margin-top:.25rem;margin-bottom:.25rem}.my-4{margin-top:1rem;margin-bottom:1rem}.mb-4{margin-bottom:1rem}.mt-4{margin-top:1rem}.inline-block{display:inline-block}.flex{display:flex}.inline-flex{display:inline-flex}.grid{display:grid}.hidden{display:none}.aspect-\\[16\\/9\\]{aspect-ratio:16/9}.size-7{width:1.75rem;height:1.75rem}.size-8{width:2rem;height:2rem}.h-full{height:100%}.w-full{width:100%}.max-w-none{max-width:none}.max-w-screen-lg{max-width:1024px}@keyframes spin{to{transform:rotate(360deg)}}.animate-spin{animation:spin 1s linear infinite}.cursor-pointer{cursor:pointer}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.flex-col{flex-direction:column}.items-center{align-items:center}.justify-center{justify-content:center}.gap-12{gap:3rem}.space-x-2>:not([hidden])~:not([hidden]){--tw-space-x-reverse: 0;margin-right:calc(.5rem * var(--tw-space-x-reverse));margin-left:calc(.5rem * calc(1 - var(--tw-space-x-reverse)))}.overflow-hidden{overflow:hidden}.rounded{border-radius:.25rem}.\\!bg-\\[var\\(--consent-button-bg-color\\,\\#EC7D28\\)\\]{background-color:var(--consent-button-bg-color,#EC7D28)!important}.bg-gray-100{--tw-bg-opacity: 1;background-color:rgb(243 244 246 / var(--tw-bg-opacity))}.object-cover{-o-object-fit:cover;object-fit:cover}.p-4{padding:1rem}.px-2{padding-left:.5rem;padding-right:.5rem}.py-1{padding-top:.25rem;padding-bottom:.25rem}.py-8{padding-top:2rem;padding-bottom:2rem}.text-center{text-align:center}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xs{font-size:.75rem;line-height:1rem}.font-normal{font-weight:400}.font-semibold{font-weight:600}.\\!text-\\[var\\(--consent-button-text-color\\,\\#FFFFFF\\)\\]{color:var(--consent-button-text-color,#FFFFFF)!important}.text-\\[var\\(--consent-spinner-color\\)\\]{color:var(--consent-spinner-color)}.text-\\[var\\(--media-encoding-status-icon-color-error\\,\\#FF0000\\)\\]{color:var(--media-encoding-status-icon-color-error,#FF0000)}.text-\\[var\\(--media-encoding-status-icon-color-inprogress\\,\\#EC7D28\\)\\]{color:var(--media-encoding-status-icon-color-inprogress,#EC7D28)}.text-current{color:currentColor}.no-underline{text-decoration-line:none}.opacity-15{opacity:.15}.opacity-25{opacity:.25}.opacity-75{opacity:.75}.opacity-\\[var\\(--consent-bg-opacity\\,20\\%\\)\\]{opacity:var(--consent-bg-opacity,20%)}.opacity-\\[var\\(--media-encoding-status-bg-opacity\\,20\\%\\)\\]{opacity:var(--media-encoding-status-bg-opacity,20%)}.ring-\\[var\\(--consent-button-bg-color-hover\\,\\#EC7D28\\)\\]{--tw-ring-color: var(--consent-button-bg-color-hover,#EC7D28)}.ring-offset-2{--tw-ring-offset-width: 2px}.ring-offset-black{--tw-ring-offset-color: #000}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.\\@container{container-type:inline-size}@container (min-width: 24rem){.\\@sm\\:prose-sm{font-size:.875rem;line-height:1.7142857}.\\@sm\\:prose-sm :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.1428571em;margin-bottom:1.1428571em}.\\@sm\\:prose-sm :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:1.2857143em;line-height:1.5555556;margin-top:.8888889em;margin-bottom:.8888889em}.\\@sm\\:prose-sm :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.3333333em;margin-bottom:1.3333333em;padding-left:1.1111111em}.\\@sm\\:prose-sm :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:2.1428571em;margin-top:0;margin-bottom:.8em;line-height:1.2}.\\@sm\\:prose-sm :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:1.4285714em;margin-top:1.6em;margin-bottom:.8em;line-height:1.4}.\\@sm\\:prose-sm :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:1.2857143em;margin-top:1.5555556em;margin-bottom:.4444444em;line-height:1.5555556}.\\@sm\\:prose-sm :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.4285714em;margin-bottom:.5714286em;line-height:1.4285714}.\\@sm\\:prose-sm :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7142857em;margin-bottom:1.7142857em}.\\@sm\\:prose-sm :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7142857em;margin-bottom:1.7142857em}.\\@sm\\:prose-sm :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.\\@sm\\:prose-sm :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7142857em;margin-bottom:1.7142857em}.\\@sm\\:prose-sm :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8571429em;border-radius:.3125rem;padding:.1428571em .3571429em}.\\@sm\\:prose-sm :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8571429em}.\\@sm\\:prose-sm :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.9em}.\\@sm\\:prose-sm :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8888889em}.\\@sm\\:prose-sm :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8571429em;line-height:1.6666667;margin-top:1.6666667em;margin-bottom:1.6666667em;border-radius:.25rem;padding:.6666667em 1em}.\\@sm\\:prose-sm :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.1428571em;margin-bottom:1.1428571em;padding-left:1.5714286em}.\\@sm\\:prose-sm :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.1428571em;margin-bottom:1.1428571em;padding-left:1.5714286em}.\\@sm\\:prose-sm :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.2857143em;margin-bottom:.2857143em}.\\@sm\\:prose-sm :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:.4285714em}.\\@sm\\:prose-sm :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:.4285714em}.\\@sm\\:prose-sm :where(.\\@sm\\:prose-sm>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5714286em;margin-bottom:.5714286em}.\\@sm\\:prose-sm :where(.\\@sm\\:prose-sm>ul>li>*:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.1428571em}.\\@sm\\:prose-sm :where(.\\@sm\\:prose-sm>ul>li>*:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.1428571em}.\\@sm\\:prose-sm :where(.\\@sm\\:prose-sm>ol>li>*:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.1428571em}.\\@sm\\:prose-sm :where(.\\@sm\\:prose-sm>ol>li>*:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.1428571em}.\\@sm\\:prose-sm :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5714286em;margin-bottom:.5714286em}.\\@sm\\:prose-sm :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.1428571em;margin-bottom:1.1428571em}.\\@sm\\:prose-sm :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.1428571em}.\\@sm\\:prose-sm :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.2857143em;padding-left:1.5714286em}.\\@sm\\:prose-sm :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2.8571429em;margin-bottom:2.8571429em}.\\@sm\\:prose-sm :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.\\@sm\\:prose-sm :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.\\@sm\\:prose-sm :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.\\@sm\\:prose-sm :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.\\@sm\\:prose-sm :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8571429em;line-height:1.5}.\\@sm\\:prose-sm :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:1em;padding-bottom:.6666667em;padding-left:1em}.\\@sm\\:prose-sm :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:0}.\\@sm\\:prose-sm :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:0}.\\@sm\\:prose-sm :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding:.6666667em 1em}.\\@sm\\:prose-sm :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:0}.\\@sm\\:prose-sm :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:0}.\\@sm\\:prose-sm :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7142857em;margin-bottom:1.7142857em}.\\@sm\\:prose-sm :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.\\@sm\\:prose-sm :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8571429em;line-height:1.3333333;margin-top:.6666667em}.\\@sm\\:prose-sm :where(.\\@sm\\:prose-sm>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.\\@sm\\:prose-sm :where(.\\@sm\\:prose-sm>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}}@container (min-width: 28rem){.\\@md\\:prose-base{font-size:1rem;line-height:1.75}.\\@md\\:prose-base :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.\\@md\\:prose-base :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:1.25em;line-height:1.6;margin-top:1.2em;margin-bottom:1.2em}.\\@md\\:prose-base :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.6em;margin-bottom:1.6em;padding-left:1em}.\\@md\\:prose-base :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:2.25em;margin-top:0;margin-bottom:.8888889em;line-height:1.1111111}.\\@md\\:prose-base :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:1.5em;margin-top:2em;margin-bottom:1em;line-height:1.3333333}.\\@md\\:prose-base :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:1.25em;margin-top:1.6em;margin-bottom:.6em;line-height:1.6}.\\@md\\:prose-base :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.5em;margin-bottom:.5em;line-height:1.5}.\\@md\\:prose-base :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.\\@md\\:prose-base :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.\\@md\\:prose-base :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.\\@md\\:prose-base :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.\\@md\\:prose-base :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.875em;border-radius:.3125rem;padding:.1875em .375em}.\\@md\\:prose-base :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.875em}.\\@md\\:prose-base :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.875em}.\\@md\\:prose-base :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.9em}.\\@md\\:prose-base :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.875em;line-height:1.7142857;margin-top:1.7142857em;margin-bottom:1.7142857em;border-radius:.375rem;padding:.8571429em 1.1428571em}.\\@md\\:prose-base :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-left:1.625em}.\\@md\\:prose-base :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-left:1.625em}.\\@md\\:prose-base :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;margin-bottom:.5em}.\\@md\\:prose-base :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:.375em}.\\@md\\:prose-base :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:.375em}.\\@md\\:prose-base :where(.\\@md\\:prose-base>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.\\@md\\:prose-base :where(.\\@md\\:prose-base>ul>li>*:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.\\@md\\:prose-base :where(.\\@md\\:prose-base>ul>li>*:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.\\@md\\:prose-base :where(.\\@md\\:prose-base>ol>li>*:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.\\@md\\:prose-base :where(.\\@md\\:prose-base>ol>li>*:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.\\@md\\:prose-base :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.\\@md\\:prose-base :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.\\@md\\:prose-base :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.\\@md\\:prose-base :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;padding-left:1.625em}.\\@md\\:prose-base :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:3em;margin-bottom:3em}.\\@md\\:prose-base :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.\\@md\\:prose-base :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.\\@md\\:prose-base :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.\\@md\\:prose-base :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.\\@md\\:prose-base :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.875em;line-height:1.7142857}.\\@md\\:prose-base :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:.5714286em;padding-bottom:.5714286em;padding-left:.5714286em}.\\@md\\:prose-base :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:0}.\\@md\\:prose-base :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:0}.\\@md\\:prose-base :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding:.5714286em}.\\@md\\:prose-base :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:0}.\\@md\\:prose-base :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:0}.\\@md\\:prose-base :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.\\@md\\:prose-base :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.\\@md\\:prose-base :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.875em;line-height:1.4285714;margin-top:.8571429em}.\\@md\\:prose-base :where(.\\@md\\:prose-base>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.\\@md\\:prose-base :where(.\\@md\\:prose-base>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}}@container (min-width: 32rem){.\\@lg\\:prose-lg{font-size:1.125rem;line-height:1.7777778}.\\@lg\\:prose-lg :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.3333333em;margin-bottom:1.3333333em}.\\@lg\\:prose-lg :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:1.2222222em;line-height:1.4545455;margin-top:1.0909091em;margin-bottom:1.0909091em}.\\@lg\\:prose-lg :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.6666667em;margin-bottom:1.6666667em;padding-left:1em}.\\@lg\\:prose-lg :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:2.6666667em;margin-top:0;margin-bottom:.8333333em;line-height:1}.\\@lg\\:prose-lg :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:1.6666667em;margin-top:1.8666667em;margin-bottom:1.0666667em;line-height:1.3333333}.\\@lg\\:prose-lg :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:1.3333333em;margin-top:1.6666667em;margin-bottom:.6666667em;line-height:1.5}.\\@lg\\:prose-lg :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7777778em;margin-bottom:.4444444em;line-height:1.5555556}.\\@lg\\:prose-lg :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7777778em;margin-bottom:1.7777778em}.\\@lg\\:prose-lg :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7777778em;margin-bottom:1.7777778em}.\\@lg\\:prose-lg :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.\\@lg\\:prose-lg :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7777778em;margin-bottom:1.7777778em}.\\@lg\\:prose-lg :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8888889em;border-radius:.3125rem;padding:.2222222em .4444444em}.\\@lg\\:prose-lg :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8888889em}.\\@lg\\:prose-lg :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8666667em}.\\@lg\\:prose-lg :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.875em}.\\@lg\\:prose-lg :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8888889em;line-height:1.75;margin-top:2em;margin-bottom:2em;border-radius:.375rem;padding:1em 1.5em}.\\@lg\\:prose-lg :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.3333333em;margin-bottom:1.3333333em;padding-left:1.5555556em}.\\@lg\\:prose-lg :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.3333333em;margin-bottom:1.3333333em;padding-left:1.5555556em}.\\@lg\\:prose-lg :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.6666667em;margin-bottom:.6666667em}.\\@lg\\:prose-lg :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:.4444444em}.\\@lg\\:prose-lg :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:.4444444em}.\\@lg\\:prose-lg :where(.\\@lg\\:prose-lg>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.8888889em;margin-bottom:.8888889em}.\\@lg\\:prose-lg :where(.\\@lg\\:prose-lg>ul>li>*:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.3333333em}.\\@lg\\:prose-lg :where(.\\@lg\\:prose-lg>ul>li>*:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.3333333em}.\\@lg\\:prose-lg :where(.\\@lg\\:prose-lg>ol>li>*:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.3333333em}.\\@lg\\:prose-lg :where(.\\@lg\\:prose-lg>ol>li>*:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.3333333em}.\\@lg\\:prose-lg :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.8888889em;margin-bottom:.8888889em}.\\@lg\\:prose-lg :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.3333333em;margin-bottom:1.3333333em}.\\@lg\\:prose-lg :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.3333333em}.\\@lg\\:prose-lg :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.6666667em;padding-left:1.5555556em}.\\@lg\\:prose-lg :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:3.1111111em;margin-bottom:3.1111111em}.\\@lg\\:prose-lg :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.\\@lg\\:prose-lg :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.\\@lg\\:prose-lg :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.\\@lg\\:prose-lg :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.\\@lg\\:prose-lg :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8888889em;line-height:1.5}.\\@lg\\:prose-lg :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:.75em;padding-bottom:.75em;padding-left:.75em}.\\@lg\\:prose-lg :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:0}.\\@lg\\:prose-lg :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:0}.\\@lg\\:prose-lg :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding:.75em}.\\@lg\\:prose-lg :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:0}.\\@lg\\:prose-lg :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:0}.\\@lg\\:prose-lg :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7777778em;margin-bottom:1.7777778em}.\\@lg\\:prose-lg :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.\\@lg\\:prose-lg :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8888889em;line-height:1.5;margin-top:1em}.\\@lg\\:prose-lg :where(.\\@lg\\:prose-lg>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.\\@lg\\:prose-lg :where(.\\@lg\\:prose-lg>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}}@container (min-width: 72rem){.\\@6xl\\:prose-xl{font-size:1.25rem;line-height:1.8}.\\@6xl\\:prose-xl :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.2em;margin-bottom:1.2em}.\\@6xl\\:prose-xl :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:1.2em;line-height:1.5;margin-top:1em;margin-bottom:1em}.\\@6xl\\:prose-xl :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.6em;margin-bottom:1.6em;padding-left:1.0666667em}.\\@6xl\\:prose-xl :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:2.8em;margin-top:0;margin-bottom:.8571429em;line-height:1}.\\@6xl\\:prose-xl :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:1.8em;margin-top:1.5555556em;margin-bottom:.8888889em;line-height:1.1111111}.\\@6xl\\:prose-xl :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:1.5em;margin-top:1.6em;margin-bottom:.6666667em;line-height:1.3333333}.\\@6xl\\:prose-xl :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.8em;margin-bottom:.6em;line-height:1.6}.\\@6xl\\:prose-xl :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.\\@6xl\\:prose-xl :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.\\@6xl\\:prose-xl :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.\\@6xl\\:prose-xl :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.\\@6xl\\:prose-xl :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.9em;border-radius:.3125rem;padding:.25em .4em}.\\@6xl\\:prose-xl :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.9em}.\\@6xl\\:prose-xl :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8611111em}.\\@6xl\\:prose-xl :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.9em}.\\@6xl\\:prose-xl :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.9em;line-height:1.7777778;margin-top:2em;margin-bottom:2em;border-radius:.5rem;padding:1.1111111em 1.3333333em}.\\@6xl\\:prose-xl :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.2em;margin-bottom:1.2em;padding-left:1.6em}.\\@6xl\\:prose-xl :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.2em;margin-bottom:1.2em;padding-left:1.6em}.\\@6xl\\:prose-xl :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.6em;margin-bottom:.6em}.\\@6xl\\:prose-xl :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:.4em}.\\@6xl\\:prose-xl :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:.4em}.\\@6xl\\:prose-xl :where(.\\@6xl\\:prose-xl>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.8em;margin-bottom:.8em}.\\@6xl\\:prose-xl :where(.\\@6xl\\:prose-xl>ul>li>*:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.2em}.\\@6xl\\:prose-xl :where(.\\@6xl\\:prose-xl>ul>li>*:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.2em}.\\@6xl\\:prose-xl :where(.\\@6xl\\:prose-xl>ol>li>*:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.2em}.\\@6xl\\:prose-xl :where(.\\@6xl\\:prose-xl>ol>li>*:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.2em}.\\@6xl\\:prose-xl :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.8em;margin-bottom:.8em}.\\@6xl\\:prose-xl :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.2em;margin-bottom:1.2em}.\\@6xl\\:prose-xl :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.2em}.\\@6xl\\:prose-xl :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.6em;padding-left:1.6em}.\\@6xl\\:prose-xl :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2.8em;margin-bottom:2.8em}.\\@6xl\\:prose-xl :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.\\@6xl\\:prose-xl :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.\\@6xl\\:prose-xl :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.\\@6xl\\:prose-xl :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.\\@6xl\\:prose-xl :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.9em;line-height:1.5555556}.\\@6xl\\:prose-xl :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:.6666667em;padding-bottom:.8888889em;padding-left:.6666667em}.\\@6xl\\:prose-xl :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:0}.\\@6xl\\:prose-xl :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:0}.\\@6xl\\:prose-xl :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding:.8888889em .6666667em}.\\@6xl\\:prose-xl :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:0}.\\@6xl\\:prose-xl :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:0}.\\@6xl\\:prose-xl :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.\\@6xl\\:prose-xl :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.\\@6xl\\:prose-xl :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.9em;line-height:1.5555556;margin-top:1em}.\\@6xl\\:prose-xl :where(.\\@6xl\\:prose-xl>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.\\@6xl\\:prose-xl :where(.\\@6xl\\:prose-xl>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}}.hover\\:\\!bg-\\[var\\(--consent-button-bg-color-hover\\,\\#D76D2A\\)\\]:hover{background-color:var(--consent-button-bg-color-hover,#D76D2A)!important}.hover\\:\\!text-\\[var\\(--consent-button-text-color-hover\\,\\#FFFFFF\\)\\]:hover{color:var(--consent-button-text-color-hover,#FFFFFF)!important}.hover\\:ring:hover{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.prose-a\\:text-\\[var\\(--consent-link-text-color\\,\\#EC7D28\\)\\] :is(:where(a):not(:where([class~=not-prose],[class~=not-prose] *))){color:var(--consent-link-text-color,#EC7D28)}.hover\\:prose-a\\:text-\\[var\\(--consent-link-text-color-hover\\,\\#D76D2A\\)\\] :is(:where(a):not(:where([class~=not-prose],[class~=not-prose] *))):hover{color:var(--consent-link-text-color-hover,#D76D2A)}.prose-ul\\:mt-0 :is(:where(ul):not(:where([class~=not-prose],[class~=not-prose] *))){margin-top:0}.prose-ul\\:list-none :is(:where(ul):not(:where([class~=not-prose],[class~=not-prose] *))){list-style-type:none}.prose-ul\\:pl-0 :is(:where(ul):not(:where([class~=not-prose],[class~=not-prose] *))){padding-left:0}.first\\:prose-li\\:mt-0 :is(:where(li):not(:where([class~=not-prose],[class~=not-prose] *))):first-child{margin-top:0}@container (min-width: 24rem){.\\@sm\\:my-6{margin-top:1.5rem;margin-bottom:1.5rem}.\\@sm\\:inline{display:inline}.\\@sm\\:px-4{padding-left:1rem;padding-right:1rem}.\\@sm\\:py-2{padding-top:.5rem;padding-bottom:.5rem}.\\@sm\\:text-sm{font-size:.875rem;line-height:1.25rem}}@container (min-width: 28rem){.\\@md\\:my-1{margin-top:.25rem;margin-bottom:.25rem}.\\@md\\:my-12{margin-top:3rem;margin-bottom:3rem}.\\@md\\:inline{display:inline}.\\@md\\:max-w-lg{max-width:32rem}}@container (min-width: 32rem){.\\@lg\\:my-16{margin-top:4rem;margin-bottom:4rem}.\\@lg\\:text-base{font-size:1rem;line-height:1.5rem}}';
class ke extends y {
  static styles = [
    q(ne),
    X`
      :host {
        position: relative;
        aspect-ratio: 16/9;
        color: var(--consent-text-color, #ffffff);
        background-color: var(--consent-bg-color, #000000);
      }
      .bg-letters {
        color: currentColor;
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
      const o = this.querySelector("media-player");
      o && (this.allRequiredConsentsAccepted() || o.pause());
    }
  }
  refreshConsentStatus() {
    const o = UC_UI.getServicesBaseInfo().filter((t) => this.requiredConsents.includes(t.id));
    this.consentStatus = o.map((t) => ({
      id: t.id,
      name: t.name,
      consentGiven: t.consent.status
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
    const e = this.consentStatus.map((o) => o.id);
    UC_UI.acceptServices(e).then(
      () => console.log("All Services are accepted")
    );
  }
  revokeAllRequiredConsents() {
    const e = this.consentStatus.map((o) => o.id);
    UC_UI.rejectServices(e).then(
      () => console.log("All Services are rejected")
    );
  }
  toggleInfocenter(e = null) {
    UC_UI.showSecondLayer(e);
  }
  getInitializingTemplate() {
    return d`
      <div class="prose prose-lg text-current flex flex-col items-center justify-center">
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
    return this.previewImageUrl ? d`<img
          src="${this.previewImageUrl}"
          class="h-full w-full object-cover opacity-[var(--consent-bg-opacity,20%)] absolute inset-0 m-0"
          loading="lazy"
        />` : null;
  }
  wrapWithDiv(e) {
    return d`<div
      class="@container absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
    >
      ${this.getPreviewImageTempalte()} ${e}
    </div>`;
  }
  getConsentTemplate() {
    return d`
      <div
        class="py-8 px-2  text-current text-center z-10
            prose prose-sm @sm:prose-sm @md:prose-base @6xl:prose-xl
            prose-ul:pl-0 prose-ul:mt-0 prose-ul:list-none first:prose-li:mt-0
            prose-a:text-[var(--consent-link-text-color,#EC7D28)] hover:prose-a:text-[var(--consent-link-text-color-hover,#D76D2A)]
            "
      >
        <h3 class="bg-letters text-xs ">
          <slot name="headline">
            Dieser Inhalt kann aufgrund Ihrer Datenschutzeinstellungen nicht
            angezeigt werden
          </slot>
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
            <span>
              <slot name="button-text"
                >Cookies akzeptieren<span class="hidden @sm:inline">
                  und Inhalt anzeigen</span
                >
              </slot>
            </span>
          </a>
        </h4>
        <p class="hidden @md:inline my-1 @md:my-1">
          <slot name="services-list-headline">
            Folgende Cookies werden akzeptiert:
          </slot>
        </p>
        <ul>
          ${this.missingConsents().map(
      (e) => d`<li>
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
    return this.requiredConsents.length === 0 ? this.wrapWithDiv(d`<slot></slot>`) : this.UCInitialized ? this.allRequiredConsentsAccepted() ? this.wrapWithDiv(d`<slot></slot>`) : this.wrapWithDiv(this.getConsentTemplate()) : this.wrapWithDiv(this.getInitializingTemplate());
  }
}
class Se extends y {
  static styles = [
    q(ne),
    X`
      :host {
        position: relative;
        aspect-ratio: 16/9;
        color: var(--media-encoding-status-text-color, #ffffff);
        background-color: var(--media-encoding-status-bg-color, #000000);
      }
      .bg-letters {
        color: currentColor;
        text-shadow:
          1px 1px 2px var(--media-encoding-status-text-shadow-color, #000000),
          0 0 25px var(--media-encoding-status-text-shadow-color, #000000),
          0 0 15px var(--media-encoding-status-text-shadow-color, #000000);
      }
    `
  ];
  static properties = {
    status: { type: String },
    processId: { type: String },
    previewImageUrl: { type: String }
  };
  constructor() {
    super(), this.status = "processing";
  }
  render() {
    return d`
      <div
        class="@container absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      >
        <div
          class="prose text-xs @sm:prose-sm @lg:prose-lg text-current flex flex-col items-center justify-center p-4"
        >
          ${this.status === "inprogress" ? d`
                <svg
                  class="animate-spin size-8 text-[var(--media-encoding-status-icon-color-inprogress,#EC7D28)] mb-4"
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
                <span
                  class="@md:max-w-lg bg-letters text-center font-semibold spacing-wider"
                  ><slot name="inprogress"
                    >Die Umwandlung des Videos ist noch nicht abgeschlossen.
                    Bitte probieren Sie es in ein paar Minuten erneut.</slot
                  ></span
                >
                ${this.processId ? d` <div
                      class="mt-4 inline-block text-sm text-current opacity-15"
                    >
                      Prozess-ID: ${this.processId}
                    </div>` : null}
              ` : null}
          ${this.status === "error" ? d` <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-8 text-[var(--media-encoding-status-icon-color-error,#FF0000)] mb-4"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="bg-letters text-center font-semibold spacing-wider"
                  ><slot name="error"
                    >Es trat ein Fehler bei der Codierung des Videos auf.</slot
                  ></span
                >` : null}
        </div>

        ${this.previewImageUrl ? d`<img
              src="${this.previewImageUrl}"
              class="h-full w-full object-cover opacity-[var(--media-encoding-status-bg-opacity,20%)] absolute inset-0 m-0 z-[-1]"
              loading="lazy"
            />` : null}
      </div>
    `;
  }
}
customElements.define("consent-wall", ke);
customElements.define("media-encoding-status", Se);
export {
  ke as ConsentWall,
  Se as MediaEncodingStatus
};
