const fs = require('fs');
const { test, expect } = require('../fixture/fixture.js');
const { RequestPage } = require('../pages/request.page');
const { normalcontractRequest } = require('../data/normalrequest.js');
const {normal} = require ('../setup/normal.js')

test.describe('Normal user - requests', () => {
  test.use({ storageState: '.auth/normal.json' });

  test.beforeEach(async ({context, page, dashboardPage }) => {
    const session = JSON.parse(fs.readFileSync('.auth/normal-session.json', 'utf8'));
    await page.addInitScript((context,data) => {
      for (const [key, value] of Object.entries(context,data)) {
        sessionStorage.setItem(key, value);
        context
      }
    }, session);

    await page.goto('/Home');
    await dashboardPage.closeRequestPopupIfShown();
  });

  test('normal user can create a contract request', async ({ page,  }) => {
    await page.goto('/Home');
    const requestPage = new RequestPage(page);
    await requestPage.createRequestMandatory(normalcontractRequest);
  
  });
});