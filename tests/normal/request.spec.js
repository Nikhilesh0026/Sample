const fs = require('fs');
const { test, expect } = require('../fixture/fixture.js');
const { RequestPage } = require('../pages/request.page');
const { normalcontractRequest } = require('../data/normalrequest.js');
//const{normal}= require('../setup/normal.js')

test.describe('normal user - requests', () => {
  test.use({ storageState: '.auth/normal.json' });

  test.beforeEach(async ({ page, dashboardPage }) => {
    const session = JSON.parse(fs.readFileSync('.auth/normal-session.json', 'utf8'));
    await page.addInitScript((data) => {
      for (const [key, value] of Object.entries(data)) {
        sessionStorage.setItem(key, value);
      }
    }, session);

    await page.goto('/Home');
    await dashboardPage.closeRequestPopupIfShown();
  });

  test('normal user can create a contract request', async ({ page }) => {
    const requestPage = new RequestPage(page);
    await requestPage.createRequestMandatory(normalcontractRequest);
  });

  test('normal user can open a request from the list', async ({ page }) => {
    // add steps for the second case here
    await expect(page).toHaveURL(/Home/);
  });
});