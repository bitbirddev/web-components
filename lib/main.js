import ConsentV1 from "./components/consent/consent-v1.js";
import Consent from "./components/consent/consent-v2.js";

customElements.define("consent-wall", Consent);

export { Consent, ConsentV1 };
