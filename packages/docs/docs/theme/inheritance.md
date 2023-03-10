# Theme Inheritance <Badge type="warning" text="beta" />

## Concepts

To introduce this section, let’s start with some basic concepts:

- **Atomic theme**：that is the parent theme, implemented entirely from scratch, like the default theme.
- **Derived theme**：that is the child theme, created based on parent theme.

::: tip
For now theme inheritance doesn’t support high-order inheritance, that means, a derived theme cannot be inherited.
:::

## Usage

Suppose you want to create a theme inherited from the default theme, you only need to configure the [extend](./option-api.md#extend) option in your theme configuration:

```js
// .kdupress/theme/index.js
module.exports = {
  extend: '@kdupress/theme-default'
}
```

## Inheritance Strategy

All the capabilities of the parent theme will be `"passed"` to the child theme. For file-level conventions, child theme can override it by creating a file with the same name in the same location. For some theme configuration options, such as [globalLayout](./option-api.md#globallayout), child theme can override it by the same name configuration.

The [file-level conventions](./writing-a-theme.md#directory-structure) are as follows:

- **Global Components**，that is the Kdu components under `theme/global-components`.
- **Components**，that is the Kdu components under `theme/components`.
- **Global Style and Palette**，that is `index.styl` and `palette.styl` under `theme/styles`.
- **HTML Template**, that is `dev.html` and `ssr.html` under `theme/templates`.
- **Theme-Level App Enhancement File**，that is `theme/enhanceApp.js`

For theme configuration, the configuration options that can be overrode by child theme are as follows:

- [devTemplate](./option-api.md#devtemplate)
- [ssrTemplate](./option-api.md#ssrtemplate)
- [globalLayout](./option-api.md#globallayout)

Theme configuration options that cannot be overrode by child theme:

- [extend](./option-api.md#extend)

Theme configuration options requiring special treatment:

- [plugins](./option-api.md#plugins)：See [Override Plugins](#override-plugins)。

## Override Plugins

For [plugins](./option-api.md#plugins) in the parent theme, the child theme cannot override it intuitively, but the options of plugin can be overrode by creating plugin configuration with the same name.

For example, if the parent theme has the following configuration:

```js
// parentThemePath/index.js
module.exports = {
  plugins: [
    ['@kdupress/search', {
      searchMaxSuggestions: 5
    }]
  ]
}
```

The child theme can edit the options of plugin in the following ways:

```js
// .kdupress/theme/index.js
module.exports = {
  plugins: [
    ['@kdupress/search', {
      searchMaxSuggestions: 10
    }]
  ]
}
```

Child theme can even disable it:

```js
// .kdupress/theme/index.js
module.exports = {
  plugins: [
    ['@kdupress/search', false]
  ]
}
```

::: warning
You shouldn’t need to do this unless you know for sure that disabling plugins in parent themes won’t cause problems.
:::

## Override Components

You may want to override the same-name components in the parent theme. By default, when the components in the parent theme use relative paths to reference other components, you will not be able to do this because you cannot edit the code of the parent theme at runtime.

KduPress achieves this requirement in a clever way, but there is a requirement for the parent theme - **All components must use the `@theme` alias to refer to other components**.

For example, if you are developing an atomic theme with the following structure:

::: kdu
theme
├── components
│   ├── `Home.kdu`
│   ├── `Navbar.kdu`
│   └── `Sidebar.kdu`
├── layouts
│   ├── `404.kdu`
│   └── `Layout.kdu`
├── package.json
└── index.js
:::

Then, in any Kdu components on the theme, **you should access the theme root directory through `@theme`**:

```kdu
<script>
import Navbar from '@theme/components/Navbar.kdu'
// ...
</script>
```

On this premise, when you create a `Navbar` component in the same place in the child theme

::: kdu
theme
└── components
    └── `Navbar.kdu`
:::

`@theme/components/Navbar.kdu` will automatically map to the Navbar component in the child theme, and when you remove the component, `@theme/components/Navbar.kdu` will automatically restore to the Navbar component in the parent theme.

This way, you can "tamper" with some part of an atomic theme.

<!-- textlint-disable en-capitalization -->

::: tip
1. You’d better override the component based on the code of the corresponding component in the parent theme.
2. When developing theme locally, you need to manually restart the dev server when a component is created or removed.
:::

<!-- textlint-enable -->

## Access Parent Theme

You can use `@parent-theme` to access the root path of the parent theme. The following example shows creating a layout component with the same name in a child theme and using slots in the parent theme. [@kdupress/theme-kdu](https://github.com/kdujs/kdupress/tree/main/packages/%40kdupress/theme-kdu) is created in this way.

```kdu
<!-- .kdupress/theme/components/Foo.kdu -->
<template>
  <ParentLayout>
    <Foo #foo/>
  </ParentLayout>
</template>

<script>
import ParentLayout from '@parent-theme/layouts/Layout.kdu'
import Foo from '@theme/components/Foo.kdu'

export default {
  components: {
    ParentLayout,
    Foo
  }
}
</script>
```





