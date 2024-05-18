/**
 * @typedef {{
 *  targetRegexp?: RegExp,
 *  capsuleSelector?: string
 * }} PostCssCalcOptions
 */
/**
 * @type {import('postcss').PluginCreator<PostCssCalcOptions>}
 * @param {PostCssCalcOptions} opts - The options for the plugin.
 * @return {import('postcss').Plugin} - The PostCSS plugin.
 */
const pluginCreator = (opts) => {
  const options = Object.assign({ targetRegexp: new RegExp(opts.targetRegexp || /\.+/) }, opts);

  return {
    postcssPlugin: "postcss-plugin-add-encapsulation-selector",
    Rule(rule) {
      rule.selectors = rule.selectors.map((selector) => {
        if (!selector.match(options.targetRegexp)) return selector;
        if (!options.capsuleSelector) return selector;
        const compound = compoundSelector(selector, options.capsuleSelector);
        const descendantCombinator = descendantCombinatorSelector(selector, options.capsuleSelector);
        return [compound, descendantCombinator].join(", ");
      });
    },
  };
};

const descendantCombinatorSelector = (selector, capsuleSelector) => {
  return `${capsuleSelector} ${selector}`;
};

const compoundSelector = (selector, capsuleSelector) => {
  return `${capsuleSelector}${selector}`;
};

pluginCreator.postcss = true;

module.exports = pluginCreator;
