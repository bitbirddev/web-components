import { LitElement, html, css, unsafeCSS } from "lit";
import globalStyles from "/assets/css/tailwind.css?inline";

export default class MediaEncodingStatus extends LitElement {
  static styles = [
    unsafeCSS(globalStyles),
    css`
      :host {
        display: block;
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
    `,
  ];

  static properties = {
    status: { type: String },
    processId: { type: String },
    previewImageUrl: { type: String },
  };

  constructor() {
    super();
    this.status = "processing";
  }

  render() {
    return html`
      <div
        class="@container absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      >
        <div
          class="prose text-xs @sm:prose-sm @lg:prose-lg text-current flex flex-col items-center justify-center p-4"
        >
          ${this.status === "inprogress"
            ? html`
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
                ${this.processId
                  ? html` <div
                      class="mt-4 inline-block text-sm text-current opacity-15"
                    >
                      Prozess-ID: ${this.processId}
                    </div>`
                  : null}
              `
            : null}
          ${this.status === "error"
            ? html` <svg
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
                >`
            : null}
        </div>

        ${this.previewImageUrl
          ? html`<img
              src="${this.previewImageUrl}"
              class="h-full w-full object-cover opacity-[var(--media-encoding-status-bg-opacity,20%)] absolute inset-0 m-0 z-[-1]"
              loading="lazy"
            />`
          : null}
      </div>
    `;
  }
}
