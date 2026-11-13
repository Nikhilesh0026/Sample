const { test: base, expect } = require('@playwright/test');

// Each test gets its own fresh browser context and page
const test = base.extend({
  context: async ({ browser }, use) => {
    const context = await browser.newContext();
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    await use(await context.newPage());
  },
});

module.exports = { test, expect };