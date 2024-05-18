# PostCSS Plugin Add Encapsulation Selector

[PostCSS](https://postcss.org/) plugin to add encapsulation selector.

This plugin can modify styles with any selector as follows,
and can limit them to having the specified selector or being a child element of the specified selector.

## Installation

```sh
npm install -D madogiwa0124/postcss-plugin-add-encapsulation-selector
```

## Usage

Please add the following description to the PostCSS configuration file.

```diff
module.exports = {
  plugins: [
+   require('postcss-plugin-add-encapsulation-selector', {
+     targetRegexp: /\.target/,
+     capsuleSelector: '.capsule'
+   }),
  ]
}
```

The style of the selector that matches `targetRegexp` is limited to having the selector specified by `capsuleSelector`, or being a child element of `capsuleSelector`.

```diff
- .target{ color: red; } .not-target { color: blue; }
+ .capsule.target, .capsule .target{ color: red; } .not-target { color: blue; }
```

### Options

#### `targetRegexp`

- Type: RegExp
- Default: `/\.+/`

A regular expression that matches the selector to be encapsulated.

### `capsuleSelector`

- Type: string | undefined
- Default: undefined

The string of the selector used for encapsulation.
