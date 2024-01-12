import { LitElement, html, css, unsafeCSS } from "lit";
import globalStyles from "/css/tailwind.css?inline";

export default class Consent extends LitElement {
  static styles = [
    unsafeCSS(globalStyles),
    css`
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
    `,
  ];

  static properties = {
    previewImageUrl: { type: String },
    requiredConsents: { type: Array },
    consentStatus: { type: Array },
    UCInitialized: { type: Boolean },
  };

  constructor() {
    super();
    this.requiredConsents = [];
    this.previewImageUrl = "";
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

    // map to a simpler object
    this.consentStatus = filtered.map((service) => {
      return {
        id: service.id,
        name: service.name,
        consentGiven: service.consent.status,
      };
    });
  }

  handleConsentStatusChange = (event) => {
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
  acceptAllRequiredConsents() {
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
  toggleInfocenter(id = null) {
    UC_UI.showSecondLayer(id);
  }

  getInitializingTemplate() {
    return html`<div
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
    return html`
      ${this.previewImageUrl
        ? html`<img
            src="${this.previewImageUrl}"
            class="h-full w-full object-cover opacity-20 absolute inset-0 m-0"
            loading="lazy"
          />`
        : null}
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
            (service) =>
              html`<li>
                <a
                  class="cursor-pointer text-xs sm:text-lg lg:text-xl"
                  @click="${() => this.toggleInfocenter(service.id)}"
                >
                  ${service.name}
                </a>
              </li>`,
          )}
        </ul>
      </div>
    `;
  }

  render() {
    if (this.UCInitialized) {
      if (this.allRequiredConsentsAccepted()) {
        // show content behind wall
        return html`<slot></slot>`;
      } else {
        // show consent wall
        return this.getConsentTemplate();
      }
    } else {
      // show "initializing..." message
      return this.getInitializingTemplate();
    }
  }
}
