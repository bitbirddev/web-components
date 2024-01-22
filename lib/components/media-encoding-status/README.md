# Video Thumbnail Status

Adds a Consent Wall to your Website. The Content of the Consent Wall is only shown if the User accepts all required Services. This only works with the UserCentrics CMP V2.

### Preview

![Preview](https://github.com/bitbirddev/web-components/blob/main/lib/components/media-encoding-status/inprogress.jpeg?raw=true)
![Preview](https://github.com/bitbirddev/web-components/blob/main/lib/components/media-encoding-status/error.jpeg?raw=true)

## Install the component

`yarn add @bitbirddev/web-components`

## Import the component

```js
import { MediaEncodingStatus } from "@bitbirddev/web-components";
customElements.define("media-encoding-status", MediaEncodingStatus);
```

## Use the component

```html
<media-encoding-status
  previewImageUrl="https://picsum.photos/seed/picsum/1280/1024"
  status="inprogress"
  processId="65ae5b5e2c31c"
>
  <p slot="error">There was an Error while encoding the Video</p>
  <p slot="inprogress">
    The Video is still being encoded. Please try again after a short while.
  </p>
</media-encoding-status>
```

## Props

| name            | description                                                       |
| --------------- | ----------------------------------------------------------------- |
| status          | string: "error" or "inprogress"                                   |
| previewImageUrl | URL to a previewImage shown in the background of the Consent-Wall |
| processId       | string: optional                                                  |

## Available CSS Variables

| name                                     | default |
| ---------------------------------------- | ------- |
| --thumbnail-status-bg-color              | #000000 |
| --thumbnail-status-bg-opacity            | 20%     |
| --thumbnail-status-text-shadow-color     | #000000 |
| --thumbnail-status-icon-color-inprogress | #EC7D28 |
| --thumbnail-status-icon-color-error      | #FF0000 |

## Usage of CSS Variables

Add this to your CSS Stylesheet to change the default values of the CSS Variables.

```css
media-encoding-status {
  --thumbnail-status-bg-color: #000000;
  --thumbnail-status-bg-opacity: 20%;

  --thumbnail-status-text-shadow-color: #000000;

  --thumbnail-status-icon-color-inprogress: #ec7d28;
  --thumbnail-status-icon-color-error: #ff0000;
}
```
