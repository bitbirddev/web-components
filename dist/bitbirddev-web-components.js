/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const P = globalThis, R = P.ShadowRoot && (P.ShadyCSS === void 0 || P.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, N = Symbol(), O = /* @__PURE__ */ new WeakMap();
let K = class {
  constructor(e, t, o) {
    if (this._$cssResult$ = !0, o !== N)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (R && e === void 0) {
      const o = t !== void 0 && t.length === 1;
      o && (e = O.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), o && O.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Q = (r) => new K(typeof r == "string" ? r : r + "", void 0, N), re = (r, ...e) => {
  const t = r.length === 1 ? r[0] : e.reduce((o, s, n) => o + ((i) => {
    if (i._$cssResult$ === !0)
      return i.cssText;
    if (typeof i == "number")
      return i;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + i + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + r[n + 1], r[0]);
  return new K(t, r, N);
}, ne = (r, e) => {
  if (R)
    r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else
    for (const t of e) {
      const o = document.createElement("style"), s = P.litNonce;
      s !== void 0 && o.setAttribute("nonce", s), o.textContent = t.cssText, r.appendChild(o);
    }
}, j = R ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const o of e.cssRules)
    t += o.cssText;
  return Q(t);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ie, defineProperty: ae, getOwnPropertyDescriptor: le, getOwnPropertyNames: pe, getOwnPropertySymbols: he, getPrototypeOf: ce } = Object, F = globalThis, q = F.trustedTypes, me = q ? q.emptyScript : "", de = F.reactiveElementPolyfillSupport, A = (r, e) => r, H = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? me : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, e) {
  let t = r;
  switch (e) {
    case Boolean:
      t = r !== null;
      break;
    case Number:
      t = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(r);
      } catch {
        t = null;
      }
  }
  return t;
} }, X = (r, e) => !ie(r, e), L = { attribute: !0, type: String, converter: H, reflect: !1, hasChanged: X };
Symbol.metadata ??= Symbol("metadata"), F.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
class v extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = L) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.elementProperties.set(e, t), !t.noAccessor) {
      const o = Symbol(), s = this.getPropertyDescriptor(e, o, t);
      s !== void 0 && ae(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, o) {
    const { get: s, set: n } = le(this.prototype, e) ?? { get() {
      return this[t];
    }, set(i) {
      this[t] = i;
    } };
    return { get() {
      return s?.call(this);
    }, set(i) {
      const m = s?.call(this);
      n.call(this, i), this.requestUpdate(e, m, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? L;
  }
  static _$Ei() {
    if (this.hasOwnProperty(A("elementProperties")))
      return;
    const e = ce(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(A("finalized")))
      return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(A("properties"))) {
      const t = this.properties, o = [...pe(t), ...he(t)];
      for (const s of o)
        this.createProperty(s, t[s]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0)
        for (const [o, s] of t)
          this.elementProperties.set(o, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, o] of this.elementProperties) {
      const s = this._$Eu(t, o);
      s !== void 0 && this._$Eh.set(s, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const o = new Set(e.flat(1 / 0).reverse());
      for (const s of o)
        t.unshift(j(s));
    } else
      e !== void 0 && t.push(j(e));
    return t;
  }
  static _$Eu(e, t) {
    const o = t.attribute;
    return o === !1 ? void 0 : typeof o == "string" ? o : typeof e == "string" ? e.toLowerCase() : void 0;
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
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const o of t.keys())
      this.hasOwnProperty(o) && (e.set(o, this[o]), delete this[o]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ne(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$E_?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$E_?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, t, o) {
    this._$AK(e, o);
  }
  _$EO(e, t) {
    const o = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, o);
    if (s !== void 0 && o.reflect === !0) {
      const n = (o.converter?.toAttribute !== void 0 ? o.converter : H).toAttribute(t, o.type);
      this._$Em = e, n == null ? this.removeAttribute(s) : this.setAttribute(s, n), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const o = this.constructor, s = o._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const n = o.getPropertyOptions(s), i = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : H;
      this._$Em = s, this[s] = i.fromAttribute(t, n.type), this._$Em = null;
    }
  }
  requestUpdate(e, t, o) {
    if (e !== void 0) {
      if (o ??= this.constructor.getPropertyOptions(e), !(o.hasChanged ?? X)(this[e], t))
        return;
      this.C(e, t, o);
    }
    this.isUpdatePending === !1 && (this._$Eg = this._$EP());
  }
  C(e, t, o) {
    this._$AL.has(e) || this._$AL.set(e, t), o.reflect === !0 && this._$Em !== e && (this._$ET ??= /* @__PURE__ */ new Set()).add(e);
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$Eg;
    } catch (t) {
      Promise.reject(t);
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
      const o = this.constructor.elementProperties;
      if (o.size > 0)
        for (const [s, n] of o)
          n.wrapped !== !0 || this._$AL.has(s) || this[s] === void 0 || this.C(s, this[s], n);
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$E_?.forEach((o) => o.hostUpdate?.()), this.update(t)) : this._$Ej();
    } catch (o) {
      throw e = !1, this._$Ej(), o;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$E_?.forEach((t) => t.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
    this._$ET &&= this._$ET.forEach((t) => this._$EO(t, this[t])), this._$Ej();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
}
v.elementStyles = [], v.shadowRootOptions = { mode: "open" }, v[A("elementProperties")] = /* @__PURE__ */ new Map(), v[A("finalized")] = /* @__PURE__ */ new Map(), de?.({ ReactiveElement: v }), (F.reactiveElementVersions ??= []).push("2.0.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = globalThis, I = M.trustedTypes, B = I ? I.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, Y = "$lit$", w = `lit$${(Math.random() + "").slice(9)}$`, ee = "?" + w, ge = `<${ee}>`, b = document, C = () => b.createComment(""), S = (r) => r === null || typeof r != "object" && typeof r != "function", te = Array.isArray, we = (r) => te(r) || typeof r?.[Symbol.iterator] == "function", D = `[ 	
\f\r]`, $ = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, W = /-->/g, V = />/g, u = RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), G = /'/g, Z = /"/g, oe = /^(?:script|style|textarea|title)$/i, ue = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), _ = ue(1), y = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), J = /* @__PURE__ */ new WeakMap(), f = b.createTreeWalker(b, 129);
function se(r, e) {
  if (!Array.isArray(r) || !r.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return B !== void 0 ? B.createHTML(e) : e;
}
const fe = (r, e) => {
  const t = r.length - 1, o = [];
  let s, n = e === 2 ? "<svg>" : "", i = $;
  for (let m = 0; m < t; m++) {
    const a = r[m];
    let p, c, l = -1, d = 0;
    for (; d < a.length && (i.lastIndex = d, c = i.exec(a), c !== null); )
      d = i.lastIndex, i === $ ? c[1] === "!--" ? i = W : c[1] !== void 0 ? i = V : c[2] !== void 0 ? (oe.test(c[2]) && (s = RegExp("</" + c[2], "g")), i = u) : c[3] !== void 0 && (i = u) : i === u ? c[0] === ">" ? (i = s ?? $, l = -1) : c[1] === void 0 ? l = -2 : (l = i.lastIndex - c[2].length, p = c[1], i = c[3] === void 0 ? u : c[3] === '"' ? Z : G) : i === Z || i === G ? i = u : i === W || i === V ? i = $ : (i = u, s = void 0);
    const g = i === u && r[m + 1].startsWith("/>") ? " " : "";
    n += i === $ ? a + ge : l >= 0 ? (o.push(p), a.slice(0, l) + Y + a.slice(l) + w + g) : a + w + (l === -2 ? m : g);
  }
  return [se(r, n + (r[t] || "<?>") + (e === 2 ? "</svg>" : "")), o];
};
class z {
  constructor({ strings: e, _$litType$: t }, o) {
    let s;
    this.parts = [];
    let n = 0, i = 0;
    const m = e.length - 1, a = this.parts, [p, c] = fe(e, t);
    if (this.el = z.createElement(p, o), f.currentNode = this.el.content, t === 2) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (s = f.nextNode()) !== null && a.length < m; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes())
          for (const l of s.getAttributeNames())
            if (l.endsWith(Y)) {
              const d = c[i++], g = s.getAttribute(l).split(w), U = /([.?@])?(.*)/.exec(d);
              a.push({ type: 1, index: n, name: U[2], strings: g, ctor: U[1] === "." ? ve : U[1] === "?" ? ye : U[1] === "@" ? xe : T }), s.removeAttribute(l);
            } else
              l.startsWith(w) && (a.push({ type: 6, index: n }), s.removeAttribute(l));
        if (oe.test(s.tagName)) {
          const l = s.textContent.split(w), d = l.length - 1;
          if (d > 0) {
            s.textContent = I ? I.emptyScript : "";
            for (let g = 0; g < d; g++)
              s.append(l[g], C()), f.nextNode(), a.push({ type: 2, index: ++n });
            s.append(l[d], C());
          }
        }
      } else if (s.nodeType === 8)
        if (s.data === ee)
          a.push({ type: 2, index: n });
        else {
          let l = -1;
          for (; (l = s.data.indexOf(w, l + 1)) !== -1; )
            a.push({ type: 7, index: n }), l += w.length - 1;
        }
      n++;
    }
  }
  static createElement(e, t) {
    const o = b.createElement("template");
    return o.innerHTML = e, o;
  }
}
function x(r, e, t = r, o) {
  if (e === y)
    return e;
  let s = o !== void 0 ? t._$Co?.[o] : t._$Cl;
  const n = S(e) ? void 0 : e._$litDirective$;
  return s?.constructor !== n && (s?._$AO?.(!1), n === void 0 ? s = void 0 : (s = new n(r), s._$AT(r, t, o)), o !== void 0 ? (t._$Co ??= [])[o] = s : t._$Cl = s), s !== void 0 && (e = x(r, s._$AS(r, e.values), s, o)), e;
}
class be {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: o } = this._$AD, s = (e?.creationScope ?? b).importNode(t, !0);
    f.currentNode = s;
    let n = f.nextNode(), i = 0, m = 0, a = o[0];
    for (; a !== void 0; ) {
      if (i === a.index) {
        let p;
        a.type === 2 ? p = new E(n, n.nextSibling, this, e) : a.type === 1 ? p = new a.ctor(n, a.name, a.strings, this, e) : a.type === 6 && (p = new $e(n, this, e)), this._$AV.push(p), a = o[++m];
      }
      i !== a?.index && (n = f.nextNode(), i++);
    }
    return f.currentNode = b, s;
  }
  p(e) {
    let t = 0;
    for (const o of this._$AV)
      o !== void 0 && (o.strings !== void 0 ? (o._$AI(e, o, t), t += o.strings.length - 2) : o._$AI(e[t])), t++;
  }
}
class E {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, o, s) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = o, this.options = s, this._$Cv = s?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = x(this, e, t), S(e) ? e === h || e == null || e === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : e !== this._$AH && e !== y && this._(e) : e._$litType$ !== void 0 ? this.g(e) : e.nodeType !== void 0 ? this.$(e) : we(e) ? this.T(e) : this._(e);
  }
  k(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  $(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.k(e));
  }
  _(e) {
    this._$AH !== h && S(this._$AH) ? this._$AA.nextSibling.data = e : this.$(b.createTextNode(e)), this._$AH = e;
  }
  g(e) {
    const { values: t, _$litType$: o } = e, s = typeof o == "number" ? this._$AC(e) : (o.el === void 0 && (o.el = z.createElement(se(o.h, o.h[0]), this.options)), o);
    if (this._$AH?._$AD === s)
      this._$AH.p(t);
    else {
      const n = new be(s, this), i = n.u(this.options);
      n.p(t), this.$(i), this._$AH = n;
    }
  }
  _$AC(e) {
    let t = J.get(e.strings);
    return t === void 0 && J.set(e.strings, t = new z(e)), t;
  }
  T(e) {
    te(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let o, s = 0;
    for (const n of e)
      s === t.length ? t.push(o = new E(this.k(C()), this.k(C()), this, this.options)) : o = t[s], o._$AI(n), s++;
    s < t.length && (this._$AR(o && o._$AB.nextSibling, s), t.length = s);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e && e !== this._$AB; ) {
      const o = e.nextSibling;
      e.remove(), e = o;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class T {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, o, s, n) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = e, this.name = t, this._$AM = s, this.options = n, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = h;
  }
  _$AI(e, t = this, o, s) {
    const n = this.strings;
    let i = !1;
    if (n === void 0)
      e = x(this, e, t, 0), i = !S(e) || e !== this._$AH && e !== y, i && (this._$AH = e);
    else {
      const m = e;
      let a, p;
      for (e = n[0], a = 0; a < n.length - 1; a++)
        p = x(this, m[o + a], t, a), p === y && (p = this._$AH[a]), i ||= !S(p) || p !== this._$AH[a], p === h ? e = h : e !== h && (e += (p ?? "") + n[a + 1]), this._$AH[a] = p;
    }
    i && !s && this.O(e);
  }
  O(e) {
    e === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class ve extends T {
  constructor() {
    super(...arguments), this.type = 3;
  }
  O(e) {
    this.element[this.name] = e === h ? void 0 : e;
  }
}
class ye extends T {
  constructor() {
    super(...arguments), this.type = 4;
  }
  O(e) {
    this.element.toggleAttribute(this.name, !!e && e !== h);
  }
}
class xe extends T {
  constructor(e, t, o, s, n) {
    super(e, t, o, s, n), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = x(this, e, t, 0) ?? h) === y)
      return;
    const o = this._$AH, s = e === h && o !== h || e.capture !== o.capture || e.once !== o.once || e.passive !== o.passive, n = e !== h && (o === h || s);
    s && this.element.removeEventListener(this.name, this, o), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class $e {
  constructor(e, t, o) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    x(this, e);
  }
}
const _e = M.litHtmlPolyfillSupport;
_e?.(z, E), (M.litHtmlVersions ??= []).push("3.1.1");
const Ae = (r, e, t) => {
  const o = t?.renderBefore ?? e;
  let s = o._$litPart$;
  if (s === void 0) {
    const n = t?.renderBefore ?? null;
    o._$litPart$ = s = new E(e.insertBefore(C(), n), n, void 0, t ?? {});
  }
  return s._$AI(r), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class k extends v {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ae(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return y;
  }
}
k._$litElement$ = !0, k.finalized = !0, globalThis.litElementHydrateSupport?.({ LitElement: k });
const ke = globalThis.litElementPolyfillSupport;
ke?.({ LitElement: k });
(globalThis.litElementVersions ??= []).push("4.0.3");
const Ce = '*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:before,:after{--tw-content: ""}html,:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.prose{color:var(--tw-prose-body);max-width:65ch}.prose :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.prose :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-lead);font-size:1.25em;line-height:1.6;margin-top:1.2em;margin-bottom:1.2em}.prose :where(a):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-links);text-decoration:underline;font-weight:500}.prose :where(strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-bold);font-weight:600}.prose :where(a strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.prose :where(blockquote strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.prose :where(thead th strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.prose :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:decimal;margin-top:1.25em;margin-bottom:1.25em;padding-left:1.625em}.prose :where(ol[type=A]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.prose :where(ol[type=a]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.prose :where(ol[type=A s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.prose :where(ol[type=a s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.prose :where(ol[type=I]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.prose :where(ol[type=i]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.prose :where(ol[type=I s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.prose :where(ol[type=i s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.prose :where(ol[type="1"]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:decimal}.prose :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:disc;margin-top:1.25em;margin-bottom:1.25em;padding-left:1.625em}.prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{font-weight:400;color:var(--tw-prose-counters)}.prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-bullets)}.prose :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);font-weight:600;margin-top:1.25em}.prose :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){border-color:var(--tw-prose-hr);border-top-width:1px;margin-top:3em;margin-bottom:3em}.prose :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:500;font-style:italic;color:var(--tw-prose-quotes);border-left-width:.25rem;border-left-color:var(--tw-prose-quote-borders);quotes:"“""”""‘""’";margin-top:1.6em;margin-bottom:1.6em;padding-left:1em}.prose :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before{content:open-quote}.prose :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:close-quote}.prose :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);font-weight:800;font-size:2.25em;margin-top:0;margin-bottom:.8888889em;line-height:1.1111111}.prose :where(h1 strong):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:900;color:inherit}.prose :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);font-weight:700;font-size:1.5em;margin-top:2em;margin-bottom:1em;line-height:1.3333333}.prose :where(h2 strong):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:800;color:inherit}.prose :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);font-weight:600;font-size:1.25em;margin-top:1.6em;margin-bottom:.6em;line-height:1.6}.prose :where(h3 strong):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:700;color:inherit}.prose :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);font-weight:600;margin-top:1.5em;margin-bottom:.5em;line-height:1.5}.prose :where(h4 strong):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:700;color:inherit}.prose :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.prose :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){display:block;margin-top:2em;margin-bottom:2em}.prose :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:500;font-family:inherit;color:var(--tw-prose-kbd);box-shadow:0 0 0 1px rgb(var(--tw-prose-kbd-shadows) / 10%),0 3px rgb(var(--tw-prose-kbd-shadows) / 10%);font-size:.875em;border-radius:.3125rem;padding:.1875em .375em}.prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-code);font-weight:600;font-size:.875em}.prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):before{content:"`"}.prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:"`"}.prose :where(a code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.prose :where(h1 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.prose :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.875em}.prose :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.9em}.prose :where(h4 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.prose :where(blockquote code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.prose :where(thead th code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.prose :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-pre-code);background-color:var(--tw-prose-pre-bg);overflow-x:auto;font-weight:400;font-size:.875em;line-height:1.7142857;margin-top:1.7142857em;margin-bottom:1.7142857em;border-radius:.375rem;padding:.8571429em 1.1428571em}.prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)){background-color:transparent;border-width:0;border-radius:0;padding:0;font-weight:inherit;color:inherit;font-size:inherit;font-family:inherit;line-height:inherit}.prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):before{content:none}.prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.prose :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){width:100%;table-layout:auto;text-align:left;margin-top:2em;margin-bottom:2em;font-size:.875em;line-height:1.7142857}.prose :where(thead):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-th-borders)}.prose :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);font-weight:600;vertical-align:bottom;padding-right:.5714286em;padding-bottom:.5714286em;padding-left:.5714286em}.prose :where(tbody tr):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-td-borders)}.prose :where(tbody tr:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:0}.prose :where(tbody td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:baseline}.prose :where(tfoot):not(:where([class~=not-prose],[class~=not-prose] *)){border-top-width:1px;border-top-color:var(--tw-prose-th-borders)}.prose :where(tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:top}.prose :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.prose :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-captions);font-size:.875em;line-height:1.4285714;margin-top:.8571429em}.prose{--tw-prose-body: #374151;--tw-prose-headings: #111827;--tw-prose-lead: #4b5563;--tw-prose-links: #111827;--tw-prose-bold: #111827;--tw-prose-counters: #6b7280;--tw-prose-bullets: #d1d5db;--tw-prose-hr: #e5e7eb;--tw-prose-quotes: #111827;--tw-prose-quote-borders: #e5e7eb;--tw-prose-captions: #6b7280;--tw-prose-kbd: #111827;--tw-prose-kbd-shadows: 17 24 39;--tw-prose-code: #111827;--tw-prose-pre-code: #e5e7eb;--tw-prose-pre-bg: #1f2937;--tw-prose-th-borders: #d1d5db;--tw-prose-td-borders: #e5e7eb;--tw-prose-invert-body: #d1d5db;--tw-prose-invert-headings: #fff;--tw-prose-invert-lead: #9ca3af;--tw-prose-invert-links: #fff;--tw-prose-invert-bold: #fff;--tw-prose-invert-counters: #9ca3af;--tw-prose-invert-bullets: #4b5563;--tw-prose-invert-hr: #374151;--tw-prose-invert-quotes: #f3f4f6;--tw-prose-invert-quote-borders: #374151;--tw-prose-invert-captions: #9ca3af;--tw-prose-invert-kbd: #fff;--tw-prose-invert-kbd-shadows: 255 255 255;--tw-prose-invert-code: #fff;--tw-prose-invert-pre-code: #d1d5db;--tw-prose-invert-pre-bg: rgb(0 0 0 / 50%);--tw-prose-invert-th-borders: #4b5563;--tw-prose-invert-td-borders: #374151;font-size:1rem;line-height:1.75}.prose :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.prose :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.prose :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;margin-bottom:.5em}.prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:.375em}.prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:.375em}.prose :where(.prose>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.prose :where(.prose>ul>li>*:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.prose :where(.prose>ul>li>*:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.prose :where(.prose>ol>li>*:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.prose :where(.prose>ol>li>*:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.prose :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.prose :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.prose :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;padding-left:1.625em}.prose :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:0}.prose :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:0}.prose :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding:.5714286em}.prose :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:0}.prose :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:0}.prose :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.prose :where(.prose>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose :where(.prose>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.prose-sm{font-size:.875rem;line-height:1.7142857}.prose-sm :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.1428571em;margin-bottom:1.1428571em}.prose-sm :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:1.2857143em;line-height:1.5555556;margin-top:.8888889em;margin-bottom:.8888889em}.prose-sm :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.3333333em;margin-bottom:1.3333333em;padding-left:1.1111111em}.prose-sm :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:2.1428571em;margin-top:0;margin-bottom:.8em;line-height:1.2}.prose-sm :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:1.4285714em;margin-top:1.6em;margin-bottom:.8em;line-height:1.4}.prose-sm :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:1.2857143em;margin-top:1.5555556em;margin-bottom:.4444444em;line-height:1.5555556}.prose-sm :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.4285714em;margin-bottom:.5714286em;line-height:1.4285714}.prose-sm :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7142857em;margin-bottom:1.7142857em}.prose-sm :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7142857em;margin-bottom:1.7142857em}.prose-sm :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.prose-sm :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7142857em;margin-bottom:1.7142857em}.prose-sm :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8571429em;border-radius:.3125rem;padding:.1428571em .3571429em}.prose-sm :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8571429em}.prose-sm :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.9em}.prose-sm :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8888889em}.prose-sm :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8571429em;line-height:1.6666667;margin-top:1.6666667em;margin-bottom:1.6666667em;border-radius:.25rem;padding:.6666667em 1em}.prose-sm :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.1428571em;margin-bottom:1.1428571em;padding-left:1.5714286em}.prose-sm :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.1428571em;margin-bottom:1.1428571em;padding-left:1.5714286em}.prose-sm :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.2857143em;margin-bottom:.2857143em}.prose-sm :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:.4285714em}.prose-sm :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:.4285714em}.prose-sm :where(.prose-sm>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5714286em;margin-bottom:.5714286em}.prose-sm :where(.prose-sm>ul>li>*:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.1428571em}.prose-sm :where(.prose-sm>ul>li>*:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.1428571em}.prose-sm :where(.prose-sm>ol>li>*:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.1428571em}.prose-sm :where(.prose-sm>ol>li>*:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.1428571em}.prose-sm :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5714286em;margin-bottom:.5714286em}.prose-sm :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.1428571em;margin-bottom:1.1428571em}.prose-sm :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.1428571em}.prose-sm :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.2857143em;padding-left:1.5714286em}.prose-sm :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2.8571429em;margin-bottom:2.8571429em}.prose-sm :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose-sm :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose-sm :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose-sm :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose-sm :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8571429em;line-height:1.5}.prose-sm :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:1em;padding-bottom:.6666667em;padding-left:1em}.prose-sm :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:0}.prose-sm :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:0}.prose-sm :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding:.6666667em 1em}.prose-sm :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:0}.prose-sm :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:0}.prose-sm :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7142857em;margin-bottom:1.7142857em}.prose-sm :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.prose-sm :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8571429em;line-height:1.3333333;margin-top:.6666667em}.prose-sm :where(.prose-sm>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose-sm :where(.prose-sm>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.static{position:static}.absolute{position:absolute}.inset-0{inset:0}.z-10{z-index:10}.m-0{margin:0}.mx-auto{margin-left:auto;margin-right:auto}.my-1{margin-top:.25rem;margin-bottom:.25rem}.my-2{margin-top:.5rem;margin-bottom:.5rem}.mb-4{margin-bottom:1rem}.mt-2{margin-top:.5rem}.block{display:block}.inline-block{display:inline-block}.inline{display:inline}.flex{display:flex}.hidden{display:none}.size-8{width:2rem;height:2rem}.h-full{height:100%}.w-full{width:100%}.max-w-lg{max-width:32rem}.flex-grow{flex-grow:1}@keyframes spin{to{transform:rotate(360deg)}}.animate-spin{animation:spin 1s linear infinite}.cursor-pointer{cursor:pointer}.flex-col{flex-direction:column}.items-center{align-items:center}.justify-center{justify-content:center}.rounded{border-radius:.25rem}.\\!bg-\\[var\\(--consent-button-bg-color\\,\\#EC7D28\\)\\]{background-color:var(--consent-button-bg-color,#EC7D28)!important}.bg-white{--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity))}.object-cover{-o-object-fit:cover;object-fit:cover}.px-2{padding-left:.5rem;padding-right:.5rem}.py-1{padding-top:.25rem;padding-bottom:.25rem}.py-8{padding-top:2rem;padding-bottom:2rem}.text-center{text-align:center}.text-xs{font-size:.75rem;line-height:1rem}.font-medium{font-weight:500}.\\!text-\\[var\\(--consent-button-text-color\\,\\#FFFFFF\\)\\]{color:var(--consent-button-text-color,#FFFFFF)!important}.text-\\[var\\(--consent-spinner-color\\)\\]{color:var(--consent-spinner-color)}.text-primary{color:var(--consent-button-bg-color)}.text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}.no-underline{text-decoration-line:none}.opacity-20{opacity:.2}.opacity-25{opacity:.25}.opacity-75{opacity:.75}.ring-\\[var\\(--consent-button-bg-color-hover\\,\\#EC7D28\\)\\]{--tw-ring-color: var(--consent-button-bg-color-hover,#EC7D28)}.ring-offset-2{--tw-ring-offset-width: 2px}.ring-offset-black{--tw-ring-offset-color: #000}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}@media (min-width: 640px){.sm\\:prose-lg{font-size:1.125rem;line-height:1.7777778}.sm\\:prose-lg :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.3333333em;margin-bottom:1.3333333em}.sm\\:prose-lg :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:1.2222222em;line-height:1.4545455;margin-top:1.0909091em;margin-bottom:1.0909091em}.sm\\:prose-lg :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.6666667em;margin-bottom:1.6666667em;padding-left:1em}.sm\\:prose-lg :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:2.6666667em;margin-top:0;margin-bottom:.8333333em;line-height:1}.sm\\:prose-lg :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:1.6666667em;margin-top:1.8666667em;margin-bottom:1.0666667em;line-height:1.3333333}.sm\\:prose-lg :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:1.3333333em;margin-top:1.6666667em;margin-bottom:.6666667em;line-height:1.5}.sm\\:prose-lg :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7777778em;margin-bottom:.4444444em;line-height:1.5555556}.sm\\:prose-lg :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7777778em;margin-bottom:1.7777778em}.sm\\:prose-lg :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7777778em;margin-bottom:1.7777778em}.sm\\:prose-lg :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.sm\\:prose-lg :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7777778em;margin-bottom:1.7777778em}.sm\\:prose-lg :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8888889em;border-radius:.3125rem;padding:.2222222em .4444444em}.sm\\:prose-lg :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8888889em}.sm\\:prose-lg :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8666667em}.sm\\:prose-lg :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.875em}.sm\\:prose-lg :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8888889em;line-height:1.75;margin-top:2em;margin-bottom:2em;border-radius:.375rem;padding:1em 1.5em}.sm\\:prose-lg :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.3333333em;margin-bottom:1.3333333em;padding-left:1.5555556em}.sm\\:prose-lg :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.3333333em;margin-bottom:1.3333333em;padding-left:1.5555556em}.sm\\:prose-lg :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.6666667em;margin-bottom:.6666667em}.sm\\:prose-lg :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:.4444444em}.sm\\:prose-lg :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:.4444444em}.sm\\:prose-lg :where(.sm\\:prose-lg>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.8888889em;margin-bottom:.8888889em}.sm\\:prose-lg :where(.sm\\:prose-lg>ul>li>*:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.3333333em}.sm\\:prose-lg :where(.sm\\:prose-lg>ul>li>*:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.3333333em}.sm\\:prose-lg :where(.sm\\:prose-lg>ol>li>*:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.3333333em}.sm\\:prose-lg :where(.sm\\:prose-lg>ol>li>*:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.3333333em}.sm\\:prose-lg :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.8888889em;margin-bottom:.8888889em}.sm\\:prose-lg :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.3333333em;margin-bottom:1.3333333em}.sm\\:prose-lg :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.3333333em}.sm\\:prose-lg :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.6666667em;padding-left:1.5555556em}.sm\\:prose-lg :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:3.1111111em;margin-bottom:3.1111111em}.sm\\:prose-lg :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.sm\\:prose-lg :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.sm\\:prose-lg :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.sm\\:prose-lg :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.sm\\:prose-lg :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8888889em;line-height:1.5}.sm\\:prose-lg :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:.75em;padding-bottom:.75em;padding-left:.75em}.sm\\:prose-lg :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:0}.sm\\:prose-lg :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:0}.sm\\:prose-lg :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding:.75em}.sm\\:prose-lg :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:0}.sm\\:prose-lg :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:0}.sm\\:prose-lg :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7777778em;margin-bottom:1.7777778em}.sm\\:prose-lg :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.sm\\:prose-lg :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8888889em;line-height:1.5;margin-top:1em}.sm\\:prose-lg :where(.sm\\:prose-lg>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.sm\\:prose-lg :where(.sm\\:prose-lg>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}}@media (min-width: 1024px){.lg\\:prose-2xl{font-size:1.5rem;line-height:1.6666667}.lg\\:prose-2xl :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.3333333em;margin-bottom:1.3333333em}.lg\\:prose-2xl :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:1.25em;line-height:1.4666667;margin-top:1.0666667em;margin-bottom:1.0666667em}.lg\\:prose-2xl :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7777778em;margin-bottom:1.7777778em;padding-left:1.1111111em}.lg\\:prose-2xl :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:2.6666667em;margin-top:0;margin-bottom:.875em;line-height:1}.lg\\:prose-2xl :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:2em;margin-top:1.5em;margin-bottom:.8333333em;line-height:1.0833333}.lg\\:prose-2xl :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:1.5em;margin-top:1.5555556em;margin-bottom:.6666667em;line-height:1.2222222}.lg\\:prose-2xl :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.6666667em;margin-bottom:.6666667em;line-height:1.5}.lg\\:prose-2xl :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.lg\\:prose-2xl :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.lg\\:prose-2xl :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.lg\\:prose-2xl :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.lg\\:prose-2xl :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8333333em;border-radius:.375rem;padding:.25em .3333333em}.lg\\:prose-2xl :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8333333em}.lg\\:prose-2xl :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.875em}.lg\\:prose-2xl :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8888889em}.lg\\:prose-2xl :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8333333em;line-height:1.8;margin-top:2em;margin-bottom:2em;border-radius:.5rem;padding:1.2em 1.6em}.lg\\:prose-2xl :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.3333333em;margin-bottom:1.3333333em;padding-left:1.5833333em}.lg\\:prose-2xl :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.3333333em;margin-bottom:1.3333333em;padding-left:1.5833333em}.lg\\:prose-2xl :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;margin-bottom:.5em}.lg\\:prose-2xl :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:.4166667em}.lg\\:prose-2xl :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:.4166667em}.lg\\:prose-2xl :where(.lg\\:prose-2xl>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.8333333em;margin-bottom:.8333333em}.lg\\:prose-2xl :where(.lg\\:prose-2xl>ul>li>*:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.3333333em}.lg\\:prose-2xl :where(.lg\\:prose-2xl>ul>li>*:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.3333333em}.lg\\:prose-2xl :where(.lg\\:prose-2xl>ol>li>*:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.3333333em}.lg\\:prose-2xl :where(.lg\\:prose-2xl>ol>li>*:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.3333333em}.lg\\:prose-2xl :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.6666667em;margin-bottom:.6666667em}.lg\\:prose-2xl :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.3333333em;margin-bottom:1.3333333em}.lg\\:prose-2xl :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.3333333em}.lg\\:prose-2xl :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;padding-left:1.5833333em}.lg\\:prose-2xl :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:3em;margin-bottom:3em}.lg\\:prose-2xl :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.lg\\:prose-2xl :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.lg\\:prose-2xl :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.lg\\:prose-2xl :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.lg\\:prose-2xl :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8333333em;line-height:1.4}.lg\\:prose-2xl :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:.6em;padding-bottom:.8em;padding-left:.6em}.lg\\:prose-2xl :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:0}.lg\\:prose-2xl :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:0}.lg\\:prose-2xl :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding:.8em .6em}.lg\\:prose-2xl :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-left:0}.lg\\:prose-2xl :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-right:0}.lg\\:prose-2xl :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.lg\\:prose-2xl :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.lg\\:prose-2xl :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8333333em;line-height:1.6;margin-top:1em}.lg\\:prose-2xl :where(.lg\\:prose-2xl>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.lg\\:prose-2xl :where(.lg\\:prose-2xl>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}}.hover\\:\\!bg-\\[var\\(--consent-button-bg-color-hover\\,\\#D76D2A\\)\\]:hover{background-color:var(--consent-button-bg-color-hover,#D76D2A)!important}.hover\\:\\!text-\\[var\\(--consent-button-text-color-hover\\,\\#FFFFFF\\)\\]:hover{color:var(--consent-button-text-color-hover,#FFFFFF)!important}.hover\\:ring:hover{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.prose-a\\:text-\\[var\\(--consent-link-text-color\\,\\#EC7D28\\)\\] :is(:where(a):not(:where([class~=not-prose],[class~=not-prose] *))){color:var(--consent-link-text-color,#EC7D28)}.hover\\:prose-a\\:text-\\[var\\(--consent-link-text-color-hover\\,\\#D76D2A\\)\\] :is(:where(a):not(:where([class~=not-prose],[class~=not-prose] *))):hover{color:var(--consent-link-text-color-hover,#D76D2A)}.prose-ul\\:mt-0 :is(:where(ul):not(:where([class~=not-prose],[class~=not-prose] *))){margin-top:0}.prose-ul\\:list-none :is(:where(ul):not(:where([class~=not-prose],[class~=not-prose] *))){list-style-type:none}.prose-ul\\:pl-0 :is(:where(ul):not(:where([class~=not-prose],[class~=not-prose] *))){padding-left:0}@media (min-width: 640px){.sm\\:my-8{margin-top:2rem;margin-bottom:2rem}.sm\\:inline{display:inline}.sm\\:px-4{padding-left:1rem;padding-right:1rem}.sm\\:py-2{padding-top:.5rem;padding-bottom:.5rem}.sm\\:text-lg{font-size:1.125rem;line-height:1.75rem}}@media (min-width: 768px){.md\\:my-1{margin-top:.25rem;margin-bottom:.25rem}.md\\:my-12{margin-top:3rem;margin-bottom:3rem}.md\\:inline{display:inline}.md\\:text-xl{font-size:1.25rem;line-height:1.75rem}}@media (min-width: 1024px){.lg\\:my-16{margin-top:4rem;margin-bottom:4rem}.lg\\:text-2xl{font-size:1.5rem;line-height:2rem}.lg\\:text-xl{font-size:1.25rem;line-height:1.75rem}}';
class ze extends k {
  static styles = [
    Q(Ce),
    re`
      :host {
        color: #fff;
        background-color: #000;
        display: block;
      }
      .bg-letters {
        color: white;
        text-shadow:
          1px 1px 2px black,
          0 0 25px black,
          0 0 15px black;
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
    super.disconnectedCallback(), window.removeEventListener(
      "onConsentStatusChange",
      this.handleConsentStatusChange
    );
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("UC_UI_INITIALIZED", (e) => {
      this.UCInitialized = !0, this.refreshConsentStatus();
    }), window.addEventListener(
      "onConsentStatusChange",
      this.handleConsentStatusChange
    );
  }
  refreshConsentStatus() {
    const t = UC_UI.getServicesBaseInfo().filter((o) => this.requiredConsents.includes(o.id));
    this.consentStatus = t.map((o) => ({
      id: o.id,
      name: o.name,
      consentGiven: o.consent.status
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
    const e = this.consentStatus.map((t) => t.id);
    UC_UI.acceptServices(e).then(
      () => console.log("All Services are accepted")
    );
  }
  revokeAllRequiredConsents() {
    const e = this.consentStatus.map((t) => t.id);
    UC_UI.rejectServices(e).then(
      () => console.log("All Services are rejected")
    );
  }
  toggleInfocenter(e = null) {
    UC_UI.showSecondLayer(e);
  }
  getInitializingTemplate() {
    return _`<div
      class="absolute inset-0 z-10 flex flex-col items-center  mx-auto justify-center object-cover py-8 text-center"
    >
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
      Warte auf Usercentrics CMP initialisierung...
    </div>`;
  }
  getConsentTemplate() {
    return _`
      ${this.previewImageUrl ? _`<img
            src="${this.previewImageUrl}"
            class="h-full w-full object-cover opacity-20 absolute inset-0 m-0"
            loading="lazy"
          />` : null}
      <div
        class="
            absolute inset-0 z-10 flex flex-col items-center  mx-auto justify-center object-cover py-8 px-2
            text-white text-center
            prose-a:text-[var(--consent-link-text-color,#EC7D28)] hover:prose-a:text-[var(--consent-link-text-color-hover,#D76D2A)]
            prose prose-sm sm:prose-lg lg:prose-2xl
            prose-ul:pl-0 prose-ul:mt-0 prose-ul:list-none
          "
      >
        <h3 class="bg-letters text-xs">
          Dieser Inhalt kann aufgrund Ihrer Datenschutzeinstellungen nicht
          angezeigt werden
        </h3>
        <a
          class="
            !bg-[var(--consent-button-bg-color,#EC7D28)] hover:!bg-[var(--consent-button-bg-color-hover,#D76D2A)] 
            !text-[var(--consent-button-text-color,#FFFFFF)] hover:!text-[var(--consent-button-text-color-hover,#FFFFFF)] 
            hover:ring ring-offset-black ring-offset-2 ring-[var(--consent-button-bg-color-hover,#EC7D28)]
            text-center py-1 px-2 sm:py-2 sm:px-4 rounded no-underline my-2 sm:my-8 md:my-12 lg:my-16 cursor-pointer
            "
          @click=${() => this.acceptAllRequiredConsents()}
          >Cookies akzeptieren<span class="hidden sm:inline">
            und Inhalt anzeigen</span
          ></a
        >
        <p class="hidden md:inline my-1 md:my-1">
          Folgende Cookies werden akzeptiert:
        </p>
        <ul>
          ${this.missingConsents().map(
      (e) => _`<li>
                <a
                  class="cursor-pointer text-xs sm:text-lg lg:text-xl"
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
    return this.UCInitialized ? this.allRequiredConsentsAccepted() ? _`<slot></slot>` : this.getConsentTemplate() : this.getInitializingTemplate();
  }
}
export {
  ze as Consent,
  ze as Consent2
};