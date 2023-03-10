---
title: last-updated
metaTitle: Last-Updated Plugin | KduPress
---

# [@kdupress/plugin-last-updated](https://github.com/kdujs/kdupress/tree/main/packages/@kdupress/plugin-last-updated)

> last-updated plugin for KduPress

If you use the default theme, you don't need to install this plugin, because the plugin is already included in the `core` of KduPress, and you should use the [themeConfig.lastUpdated](../../theme/default-theme-config.md#last-updated) option directly.

If you use it at your custom theme, you'll need to handle the UI by yourself, and you can use __[$page.lastUpdated](../../guide/global-computed.md#page)__ to access the date string.

## Usage

```js
module.exports = {
  plugins: ['@kdupress/last-updated']
}
```

## Options

### transformer

- Type: `(timestamp: number, lang: string) => string`
- Default: `undefined`

By default, this plugin produces a 13-bit timestamp for each page, you can also pass in a transformer to convert it to any format that you want.

e.g.

``` javascript
const moment = require('moment');

module.exports = {
  plugins: [
    [
      '@kdupress/last-updated',
      {
        transformer: (timestamp, lang) => {
          // Don't forget to install moment yourself
          const moment = require('moment')
          moment.locale(lang)
          return moment(timestamp).fromNow()
        }
      }
    ]
  ]
}
```

::: tip
If you are running in [i18n](../../guide/i18n.md) mode, you can also use the second argument `lang` to generate time strings for different languages.

Note that in KduPress, we follow this spec: [W3C > Language tags in HTML and XML](https://en.wikipedia.org/wiki/Language_localisation), so `en-US` uses hyphens (`-`) instead of underscores (`_`). Please make sure that the library you are using follows this spec, otherwise please convert it yourself.
:::

### dateOptions

- Type: `object`
- Default: `undefined`

You can also pass in an options object to customize the timestamp output. For more properties check [`Date.prototype.toLocaleString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString) options argument

```javascript

module.exports = {
  plugins: [
    [
      '@kdupress/last-updated',
      {
        dateOptions:{
          hour12: false
        }
      }
    ]
  ]
}
```
