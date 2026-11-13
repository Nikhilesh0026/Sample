const fs = require('fs');
const { test: base, expect } = require('@playwright/test');
const { RequestPage } = require('../pages/request.page');
//const {admin} = require('../setup/admin.js');
const { admincontractRequest } = require('../data/adminrequest.js');

// NEW: a fresh browser for each test
const test = base.extend({
  browser: async ({ playwright }, use) => {
    const browser = await playwright.chromium.launch();
    await use(browser);
    await browser.close();
  },
  context: async ({ browser }, use) => {
    const context = await browser.newContext();
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    await use(await context.newPage());
  },
});


test.describe('Admin user - requests', () => {
  test.use({ storageState: '.auth/admin.json' });

  test.beforeEach(async ({ page }) => {
    const session = JSON.parse(fs.readFileSync('.auth/admin-session.json', 'utf8'));
    await page.addInitScript((data) => {
      for (const [key, value] of Object.entries(data)) {
        sessionStorage.setItem(key, value);
      }
    }, session);
  });

  test('user can create a contract request', async ({ page }) => {
    await page.goto('/Home');
    const requestPage = new RequestPage(page);
    await requestPage.createRequestMandatory(admincontractRequest);
   // await expect(page.getByText('Contract Request Added Successfully.')).toBeVisible();
  });
});