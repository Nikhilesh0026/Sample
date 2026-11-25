const { test, expect } = require('../fixture/fixture.js');
const { RequestPage } = require('../pages/request.page');
const Dashboard = require('../pages/dashboard');
const { admincontractRequest } = require('../data/adminrequest.js');

test.describe('admin user - requests', () => {
  test('admin user can create a contract request', async ({ loggedInAdminPage }) => {
    const dashboardPage = new Dashboard(loggedInAdminPage);
    await dashboardPage.closeRequestPopupIfShown();

    const requestPage = new RequestPage(loggedInAdminPage);
    await requestPage.createRequestMandatory(admincontractRequest);
  });

  test('admin user can open a request from the list', async ({ loggedInAdminPage }) => {
    await expect(loggedInAdminPage).toHaveURL(/Home/);
  });
});