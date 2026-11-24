const fs = require('fs');
const { test, expect } = require('../fixture/fixture.js');
const { RequestPage } = require('../pages/request.page');
const { admincontractRequest } = require('../data/adminrequest.js');
const {admin} = require ('../setup/admin.js')

test.describe('Branch user - requests', () => {
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

  test('branch user can create a contract request', async ({ page,  }) => {
    await page.goto('/Home');
    const requestPage = new RequestPage(page);
    await requestPage.createRequestMandatory(admincontractRequest);
  
  });
});