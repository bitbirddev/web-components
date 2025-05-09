# @bitbirddev/web-components

## Description

A hopefully growing collection of web components.

### Finished Components

- [Usercentrics Consent Wall WebComponent](/lib/components/consent-wall/README.md)
- [Media Encoding Status WebComponent](/lib/components/media-encoding-status/README.md)

## 1. Install Dependencies

```bash
bun install
```

### 2. Develop

```bash
bun run dev --open
```

### 3. Bundle

```bash
bun run build
```

### Exclude from vue

```js
app.config.compilerOptions.isCustomElement = (tag) => {
  return ["media-encoding-status", "consent-wall"].includes(tag);
};
```
