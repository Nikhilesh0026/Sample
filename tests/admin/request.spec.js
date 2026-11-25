const fs = require('fs');
const { test, expect } = require('../fixture/fixture.js');
const { RequestPage } = require('../pages/request.page');
const { admincontractRequest } = require('../data/adminrequest.js');
//const{admin} = require('../setup/admin.js');

test.describe('admin user - requests', () => {
  test.use({ storageState: '.auth/admin.json' });

  test.beforeEach(async ({ page, dashboardPage }) => {
    const session = JSON.parse(fs.readFileSync('.auth/admin-session.json', 'utf8'));
    await page.addInitScript((data) => {
      for (const [key, value] of Object.entries(data)) {
        sessionStorage.setItem(key, value);
      }
    }, session);

    await page.goto('/Home');
    await dashboardPage.closeRequestPopupIfShown();
  });

  test('admin user can create a contract request', async ({ page }) => {
    const requestPage = new RequestPage(page);
    await requestPage.createRequestMandatory(admincontractRequest);
  });

  test('admin user can open a request from the list', async ({ page }) => {
    // add steps for the second case here
    await expect(page).toHaveURL(/Home/);
  });
});