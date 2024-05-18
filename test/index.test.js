const postcss = require("postcss");
const { equal } = require("node:assert");
const { test } = require("node:test");

const plugin = require("../src/index.js");

async function run(input, output, opts = {}) {
  const result = await postcss([plugin(opts)]).process(input, { from: undefined });
  equal(result.css, output);
  equal(result.warnings().length, 0);
}

test("the style by the selector that matched the targetRegexp is encapsulated by capsuleSelector.", async () => {
  await run(
    ".target{ color: red; } .not-target { color: blue; }",
    ".capsule.target, .capsule .target{ color: red; } .not-target { color: blue; }",
    {
      targetRegexp: /\.target/,
      capsuleSelector: ".capsule",
    },
  );
});

test("should not change the style if it does not match the targetRegexp.", async () => {
  await run(
    ".target{ color: red; } .not-target{ color: blue; }",
    ".target{ color: red; } .not-target{ color: blue; }",
    {
      targetRegexp: /\.not-match-regxp/,
      capsuleSelector: ".capsule",
    },
  );
});

test("should not change the style if it does not set capsuleSelector.", async () => {
  await run(
    ".target{ color: red; } .not-target{ color: blue; }",
    ".target{ color: red; } .not-target{ color: blue; }",
    {
      targetRegexp: /\.target/,
    },
  );
});

test("the all class style is encapsulated by capsuleSelector if it does not set targetRegexp.", async () => {
  await run(
    ":root{ --var: #000; } .target{ color: red; } .not-target { color: blue; }",
    ":root{ --var: #000; } .capsule.target, .capsule .target{ color: red; } .capsule.not-target, .capsule .not-target { color: blue; }",
    {
      capsuleSelector: ".capsule",
    },
  );
});

test("does not something if it does not set options.", async () => {
  await run(
    ".target{ color: red; } .not-target { color: blue; }",
    ".target{ color: red; } .not-target { color: blue; }",
    {},
  );
});
