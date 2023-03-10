## Development Setup

This project uses a monorepo setup that requires using [Yarn](https://yarnpkg.com) because it relies on [Yarn workspaces](https://yarnpkg.com/blog/2017/08/02/introducing-workspaces/).

``` sh
# Install all dependencies.
yarn

# Serves KduPress' own docs with itself.
yarn dev

# Build KduPress' own docs with itself.
yarn build

# Clean dependencies.
yarn clean

# Useful when creating new a package.
yarn boot
```

## Core Packages

- **docs**: Docs of KduPress (do not publish to npm).
- **kdupress**: KduPress CLI.
- **packages**
  - `core`: containing the Node.js API, the Plugin API, the Theme API, the Client SPA, etc.
  - `markdown`: internal Markdown compiler.
  - `markdown-loader`: internal Markdown loader.
  - `plugin-active-header-links`: a plugin for active sidebar heading links.
  - `plugin-google-analytics`: Google Analytics integration.
  - `plugin-last-updated`: implementation of "last updated" feature.
  - `plugin-medium-zoom`: `medium-zoom` integration.
  - `plugin-nprogress`: `nprogress` integration.
  - `plugin-pwa`: PWA plugin.
  - `plugin-search`: search plugin, providing the `SearchBox` component.
  - `shared-utils`: TypeScript utilities.
  - `theme-default`: default theme.
  - `theme-kdu`: a theme tweak from default theme, used for the official Kdu project.

## Workflow

### Issue

Use one of the [issues templates](https://github.com/kdujs/kdupress/issues/new/choose) when you open a issue.

We'll close your issue if you delete the template or it contains questions.

### Pull Requests

- Create a feature branch from the default branch (`main`) and merge back against that branch.
- It's OK to have multiple small commits as you work on the PR - GitHub automatically squashes them before merging.
- Make sure tests pass.
- If adding a new feature:
  - Add accompanying test case(s).
  - Provide a convincing reason to add this feature. Ideally, you should open a suggestion issue first and have it approved before working on it.
- If fixing bug:
  - If you are resolving an open issue, add `(fix #xxxx)` (`#xxxx` being the issue ID) in your PR title for a better release log, e.g. `chore(feat): implement SSR (fix #1234)`.
  - Provide a detailed description of the bug in the PR. Live demo preferred.
  - Add appropriate test coverage if applicable.

## Code Specification

> TODO

## Commit Specification

Commit messages should follow the [commit message convention](https://www.conventionalcommits.org) so that changelogs can be automatically generated.

Check out the availalbe types at [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional#type-enum). And the scopes should be one of the followings:

``` sh
cli

# Core Packages/packages:
core
markdown
...
theme-kdu
```

Correct examples would be: `fix($core): some message` or `feat: some message`
