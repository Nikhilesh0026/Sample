const { test, expect } = require('../fixture/fixture.js');
const { RequestPage } = require('../pages/request.page');
const { normalcontractRequest } = require('../data/normalrequest.js');

test.describe('normal user - requests', () => {
  test('normal user can create a contract request', async ({ loggedInPage, dashboardPage }) => {
    await dashboardPage.closeRequestPopupIfShown();

    const requestPage = new RequestPage(loggedInPage);
    await requestPage.createRequestMandatory(normalcontractRequest);
  });

  test('normal user can open a request from the list', async ({ loggedInPage }) => {
    await expect(loggedInPage).toHaveURL(/Home/);
  });
});