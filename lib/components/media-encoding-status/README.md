# Video Thumbnail Status WebComponent

WebComponent to display the media encoding status of a video thumbnail. Is used by
[bitbirddev/twig-components-bundle](https://github.com/bitbirddev/twig-components-bundle)

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
  style="aspect-ratio: 16 / 9"
>
  <p slot="error">There was an Error while encoding the Video</p>
  <p slot="inprogress">
    The Video is still being encoded. Please try again after a short while.
  </p>
</media-encoding-status>
```

## Props

| name            | description                                                    |
| --------------- | -------------------------------------------------------------- |
| status          | string: "error" or "inprogress"                                |
| previewImageUrl | URL to a previewImage shown in the background of the Component |
| processId       | string: optional                                               |

## Available CSS Variables

| name                                          | default |
| --------------------------------------------- | ------- |
| --media-encoding-status-bg-color              | #000000 |
| --media-encoding-status-bg-opacity            | 20%     |
| --media-encoding-status-text-shadow-color     | #000000 |
| --media-encoding-status-icon-color-inprogress | #EC7D28 |
| --media-encoding-status-icon-color-error      | #FF0000 |
| --media-encoding-status-text-color            | #ffffff |

## Usage of CSS Variables

Add this to your CSS Stylesheet to change the default values of the CSS Variables.

```css
media-encoding-status {
  --media-encoding-status-text-color: #ffffff;
  --media-encoding-status-bg-color: #000000;
  --media-encoding-status-bg-opacity: 20%;

  --media-encoding-status-text-shadow-color: #000000;

  --media-encoding-status-icon-color-inprogress: #ec7d28;
  --media-encoding-status-icon-color-error: #ff0000;
}
```
