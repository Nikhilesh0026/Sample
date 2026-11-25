const { test, expect } = require('../fixture/fixture.js');
const { RequestPage } = require('../pages/request.page');
const Dashboard = require('../pages/dashboard');
const { branchcontractRequest } = require('../data/branchrequest.js');

test.describe('branch user - requests', () => {
  test('branch user can create a contract request', async ({ loggedInBranchPage }) => {
    const dashboardPage = new Dashboard(loggedInBranchPage);
    await dashboardPage.closeRequestPopupIfShown();

    const requestPage = new RequestPage(loggedInBranchPage);
    await requestPage.createRequestMandatory(branchcontractRequest);
  });

  test('branch user can open a request from the list', async ({ loggedInBranchPage }) => {
    await expect(loggedInBranchPage).toHaveURL(/Home/);
  });
});