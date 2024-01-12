# UserCentrics CMP Consent Wall (Only for CMP V2)

Adds a Consent Wall to your Website. The Content of the Consent Wall is only shown if the User accepts all required Services. This only works with the UserCentrics CMP V2.j

### Preview

![Preview](https://github.com/bitbirddev/web-components/blob/main/components/consent/preview.png?raw=true)

## Install the component

`yarn add bitbirddev-web-components`

## Import the component

```js
import { Consent } from "bitbirddev-web-components";
customElements.define("consent-wall", Consent);
```

## Use the component

```html
<consent-wall
  previewImageUrl="https://picsum.photos/seed/picsum/1280/1024"
  requiredConsents='["BJz7qNsdj-7"]'
>
  Your Content behind the Wall. This Content is only shown if the User accepts
  all required Services. Perfekt for Youtube/Vimeo Videos, Google Maps or other
  Services.
</consent-wall>
```

## Props

| name             | description                                                                                                             |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------- |
| requiredConsents | Array of Usercentrics Service IDs. The Content of the Consent-Wall is only shown if all of this ServiceIds ara accepted |
| previewImageUrl  | URL to a previewImage shown in the background of the ConsentWall                                                        |

## CSS Variables

| name                              | default |
| --------------------------------- | ------- |
| ---consent-button-bg-color        | #EC7D28 |
| --consent-button-bg-color-hover   | #D76D2A |
| --consent-button-text-color       | #FFFFFF |
| --consent-button-text-color-hover | #FFFFFF |
| --consent-link-text-color         | #EC7D28 |
| --consent-link-text-color-hover   | #D76D2A |
| --consent-spinner-color           | #EC7D28 |
