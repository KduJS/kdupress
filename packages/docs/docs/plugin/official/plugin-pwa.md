---
title: pwa
metaTitle: PWA Plugin | KduPress
---

# [@kdupress/plugin-pwa](https://github.com/kdujs/kdupress/tree/main/packages/%40kdupress/plugin-pwa)

> PWA plugin

## Install

```bash
yarn add -D @kdupress/plugin-pwa
# OR npm install -D @kdupress/plugin-pwa
```

## Usage

```javascript
module.exports = {
  plugins: ['@kdupress/pwa']
}
```

::: tip
To make your site fully PWA-compliant, you need to:

- provide a web app manifest and icons in `.kdupress/public`,
- add correct [head links](/config/#head) in `.kdupress/config.js` (see example below).

For more details, see [MDN docs about the Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest).
:::

Here is an example of a fully PWA-compliant configuration with KduPress:

```javascript
module.exports = {
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-152x152.png' }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  plugins: [
    [
      '@kdupress/pwa',
      {
        serviceWorker: true,
        updatePopup: true
      }
    ]
  ],
}
```

## Options

### serviceWorker

- Type: `boolean`
- Default: `true`

If set to `true`, KduPress will automatically generate and register a [service worker](https://developers.google.com/web/fundamentals/primers/service-workers/) that caches the content for offline use (only enabled in production).

There is a aliased module `@sw-event` module that will also be emitting the following events:

- `sw-ready`
- `sw-cached`
- `sw-updated`
- `sw-offline`
- `sw-error`

::: tip
Since you can only register service workers under HTTPs URLs, make sure you can deploy your site with SSL before enabling this option.
:::

### generateSWConfig

- Type: `object`
- Default: `{}`

[generateSW config](https://developers.google.com/web/tools/workbox/modules/workbox-build#full_generatesw_config) of workbox-build.


### updatePopup

- Type: `boolean|object`
- Default: `undefined`

The definition of type `popupConfig` is as follows:

```typescript
interface normalPopupConfig {
  message: string; // defaults to 'New content is available.'
  buttonText: string; // defaults to 'Refresh'
}

interface localedPopupConfig {
  [localePath: string]: normalPopupConfig
}

type popupConfig = normalPopupConfig | localedPopupConfig
```

This option enables the popup to refresh contents. The popup will be shown when the site is updated (i.e. service worker is updated). It provides `refresh` button to allow users to refresh contents immediately.

> If without the `refresh` button, the new service worker will be active after all [clients](https://developer.mozilla.org/en-US/docs/Web/API/Clients) are closed. This means that visitors cannot see new contents until they close all tabs of your site. But the `refresh` button activates the new service worker immediately.

### popupComponent

- Type: `string`
- Default: `undefined`

A custom component to replace the default popup component.

**Also see:**

- [Customize the SW-Update Popup UI](#customize-the-ui-of-sw-update-popup)

## Customize the UI of SW-Update Popup

The default sw-update popup component provides a default slot which gives you the ability to fully control the appearance of the popup.

First, you need to create a global component (e.g. `MySWUpdatePopup`) at `.kdupress/components`. A simple component created based on the default component is as follows:

```kdu
<template>
  <SWUpdatePopup k-slot="{ enabled, reload, message, buttonText }">
    <div
      k-if="enabled"
      class="my-sw-update-popup">
      {{ message }}<br>
      <button @click="reload">{{ buttonText }}</button>
    </div>
  </SWUpdatePopup>
</template>

<script>
import SWUpdatePopup from '@kdupress/plugin-pwa/lib/SWUpdatePopup.kdu'

export default {
  components: { SWUpdatePopup }
}
</script>

<style>
.my-sw-update-popup {
  text-align: right;
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #fff;
  font-size: 20px;
  padding: 10px;
  border: 5px solid #3eaf7c;
}

.my-sw-update-popup button {
  border: 1px solid #fefefe;
}
</style>
```

Then, update your plugin config:

``` diff
module.exports = {
   plugins: {
    '@kdupress/pwa': {
       serviceWorker: true,
+      popupComponent: 'MySWUpdatePopup',
       updatePopup: true
     }
  }
}
```

**Also see:**

- [KduPress > Using Components](../../guide/using-kdu.md#using-components)
- [Kdu > Scoped Slots](https://kdujs-v2.web.app/v2/guide/components-slots.html#scoped-slots)
