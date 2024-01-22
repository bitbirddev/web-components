import { LitElement, html, css, unsafeCSS } from "lit";
import globalStyles from "/assets/css/tailwind.css?inline";

export default class ConsentWall extends LitElement {
  static styles = [
    unsafeCSS(globalStyles),
    css`
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
    if (this.requiredConsents.length > 0) {
      window.removeEventListener(
        "onConsentStatusChange",
        this.handleConsentStatusChange,
      );
    }
  }

  connectedCallback() {
    super.connectedCallback();
    // only register event listeners if requiredConsents are set
    if (this.requiredConsents.length > 0) {
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
  }

  updated(changedProperties) {
    if (changedProperties.has("consentStatus")) {
      // pause player when consent is revoked
      const player = this.querySelector("media-player");
      if (player) {
        if (!this.allRequiredConsentsAccepted()) {
          player.pause();
        }
      }
    }
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
    return html`
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
    return this.previewImageUrl
      ? html`<img
          src="${this.previewImageUrl}"
          class="h-full w-full object-cover opacity-[var(--consent-bg-opacity,20%)] absolute inset-0 m-0"
          loading="lazy"
        />`
      : null;
  }

  wrapWithDiv(content) {
    return html`<div
      class="@container absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
    >
      ${this.getPreviewImageTempalte()} ${content}
    </div>`;
  }

  getConsentTemplate() {
    return html`
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
            (service) =>
              html`<li>
                <a
                  class="cursor-pointer text-xs @sm:text-sm @lg:text-base"
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
    // if no consents are required, return slot-content right away
    if (this.requiredConsents.length === 0) {
      return this.wrapWithDiv(html`<slot></slot>`);
    }

    // return "initializing..." if usercentrics has not initialized yet
    if (!this.UCInitialized) {
      return this.wrapWithDiv(this.getInitializingTemplate());
    }

    // if all consents are accepted, return slot-content
    if (this.allRequiredConsentsAccepted()) {
      return this.wrapWithDiv(html`<slot></slot>`);
    }

    // show consent wall
    return this.wrapWithDiv(this.getConsentTemplate());
  }
}
