import { LitElement, html, css } from "lit";

export default class Consent extends LitElement {
  static styles = css`
    :host {
      color: #fff;
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
      align-items: center;
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
      text-align: center;

      color: #3490dc; /* Default Tailwind 'primary' color, adjust as needed */
      font-size: 1.125rem; /* Tailwind's 'md' font size */
      background-color: #ffffff;
      font-weight: 500;
    }

    @media (min-width: 640px) {
      /* Tailwind's 'sm' breakpoint */
      .bg-letters {
        font-size: 1.125rem; /* Tailwind's 'lg' font size */
      }
    }

    @media (min-width: 768px) {
      /* Tailwind's 'md' breakpoint */
      .bg-letters {
        font-size: 1.25rem; /* Tailwind's 'xl' font size */
      }
    }

    @media (min-width: 1024px) {
      /* Tailwind's 'lg' breakpoint */
      .bg-letters {
        font-size: 1.5rem; /* Tailwind's '2xl' font size */
      }
    }
    .btn {
      text-dcoration: none;
      text-style: no-underline;
      background-color: #fff;
      padding: 0.5rem 1rem;
      border-radius: 0.25rem;
      margin: 2rem 0;

      /* btn-default no-underline sm:my-8 md:my-12 lg:my-16 */
    }
  `;

  static properties = {
    previewImageUrl: { type: String },
    requiredConsents: { type: Array },
    consentStatus: { type: Array },
    UCInitialized: { type: Boolean },
  };

  constructor() {
    super();
    this.requiredConsents = [];
    this.previewImageUrl = "https://picsum.photos/seed/picsum/200/300";
    this.consentStatus = [];
    this.UCInitialized = false;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener(
      "onConsentStatusChange",
      this.handleConsentStatusChange,
    );
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("UC_UI_INITIALIZED", (event) => {
      // load current consent status when Usercentrics has initialized
      this.UCInitialized = true;
      this.refreshConsentStatus();
    });
    // update consent status when it changes
    window.addEventListener(
      "onConsentStatusChange",
      this.handleConsentStatusChange,
    );
  }

  refreshConsentStatus() {
    const UCstatus = UC_UI.getServicesBaseInfo();

    // only keep services that are required for this component
    const filtered = UCstatus.filter((service) => {
      return this.requiredConsents.includes(service.id);
    });

    // map to a simpler objectj
    console.log("refreshing");
    this.consentStatus = filtered.map((service) => {
      return {
        id: service.id,
        name: service.name,
        consentGiven: service.consent.status,
      };
    });
  }

  handleConsentStatusChange = (event) => {
    console.log("event");
    if (
      event.detail.event === "consent_status" &&
      event.detail.action === "onUpdateServices"
    ) {
      this.refreshConsentStatus();
    }
  };

  allRequiredConsentsAccepted() {
    return this.consentStatus.every((service) => service.consentGiven === true);
  }
  acceptedConsents() {
    return this.consentStatus.filter(
      (service) => service.consentGiven === true,
    );
  }
  missingConsents() {
    return this.consentStatus.filter(
      (service) => service.consentGiven === false,
    );
  }
  giveConsentForId(id) {
    UC_UI.acceptService(id).then(() => console.log("Service is accepted"));
  }
  revokeConsentForId(id) {
    UC_UI.rejectService(id).then(() => console.log("Service is rejected"));
  }
  _acceptAllRequiredConsents() {
    const services = this.consentStatus.map((service) => service.id);
    UC_UI.acceptServices(services).then(() =>
      console.log("All Services are accepted"),
    );
  }
  revokeAllRequiredConsents() {
    const services = this.consentStatus.map((service) => service.id);
    UC_UI.rejectServices(services).then(() =>
      console.log("All Services are rejected"),
    );
  }
  _toggleInfocenter(id = null) {
    UC_UI.showSecondLayer(id);
  }

  render() {
    if (!this.UCInitialized) {
      return html`<div>not initialized</div>`;
    } else if (!this.allRequiredConsentsAccepted()) {
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
            <span class="bg-letters">
              Dieser Inhalt kann aufgrund Ihrer Datenschutzeinstellungen nicht
              angezeigt werden
            </span>
          </div>
          <a
            href="#"
            class="btn"
            @click=${() => this._acceptAllRequiredConsents()}
            >Cookies akzeptieren und Inhalt anzeigen</a
          >
          <div class="prose-white prose text-center text-xs text-white">
            <div>
              Folgende Cookies werden akzeptiert:
              <ul>
                ${this.missingConsents().map(
                  (service) =>
                    html`<li>
                      <a @click="${() => this._toggleInfocenter(service.id)}">
                        ${service.name}
                      </a>
                    </li>`,
                )}
              </ul>
            </div>
            <a
              @click="${() => this._toggleInfocenter()}"
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
