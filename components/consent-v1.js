import { LitElement, html, css } from "lit";
import _every from "lodash/every";
import _map from "lodash/map";

export default class Consent extends LitElement {
  static styles = css`
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
    services: { type: Array },
  };

  constructor() {
    super();
    this.previewImageUrl = "https://picsum.photos/seed/picsum/200/300";
    this.services = [];
    this.neededServices = [];
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("onConsentStatusChange", this._handleKeydown);
    window.removeEventListener("onConsentStatusChange", this._handleKeydown);
  }

  connectedCallback() {
    super.connectedCallback();
    // load current services status when Usercentrics has initialized
    window.addEventListener("onConsentStatusChange", (event) => {
      if (event.data.event === "consents_initialized") {
        const services = [];
        for (const service of this.neededServices) {
          services.push({
            name: service.name,
            ucId: service.ucId,
            isGranted: this.getServiceStatus(service.ucId),
          });
        }
        this.services = services;
      }
    });
    window.addEventListener("onConsentStatusChange", (event) => {
      if (event.data.event === "consent_changed") {
        const services = [];
        for (const service of this.neededServices) {
          services.push({
            name: service.name,
            ucId: service.ucId,
            isGranted: this.getServiceStatus(service.ucId),
          });
        }
        this.services = services;
      }
    });
  }

  allConsentsAccepted() {
    return _every(this.services, { isGranted: true });
  }
  accepted() {
    return this.services.filter(function (el) {
      return el.isGranted === true;
    });
  }
  notAccepted() {
    return this.services.filter(function (el) {
      return el.isGranted === false;
    });
  }
  notAcceptedString() {
    if (this.notAccepted.length > 0) {
      const names = _map(this.notAccepted, "name");
      return names.join(",");
    }
    return null;
  }

  getServiceStatus(ucId) {
    return window.usercentrics.getConsents(ucId).consentStatus;
  }
  acceptServiceWithId(ucId) {
    window.usercentrics.updateConsents([{ templateId: ucId, status: true }]);
  }
  revokeServiceWithId(ucId) {
    window.usercentrics.updateConsents([{ templateId: ucId, status: false }]);
  }

  revokeAll() {
    for (const service of this.services) {
      this.revokeServiceWithId(service.ucId);
    }
  }
  acceptAll() {
    for (const service of this.services) {
      this.acceptServiceWithId(service.ucId);
    }
  }

  toggleInfocenter() {
    usercentrics.toggleConsentInfoModalIsVisible();
  }

  render() {
    if (!this.allConsentsAccepted()) {
      return html`
        ${this.previewImageUrl
          ? html`<img
              src="${this.previewImageUrl}"
              class="previewImage"
              alt="Description"
            />`
          : ""}
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
                  (item) => html`<li>${item.name} (${item.ucId})</li>`,
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
    } else {
      return html`<slot></slot>`;
    }
  }
}
