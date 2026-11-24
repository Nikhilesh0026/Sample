const { test: base, expect } = require('@playwright/test');

const test = base.extend({
  context: async ({ browser }, use) => {
    const context = await browser.newContext();
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    await use(await context.newPage());
  },

   dashboardPage: async ({ page }, use) => {
    const Dashboard = require('../pages/dashboard');
    await use(new Dashboard(page));
  },
  
});

module.exports = { test, expect };