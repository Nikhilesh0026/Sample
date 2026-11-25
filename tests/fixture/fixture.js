const fs = require('fs');
const path = require('path');
const { test: base, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login');
const Dashboard = require('../pages/dashboard');

const AUTH_DIR = path.join(__dirname, '..', '.auth');
fs.mkdirSync(AUTH_DIR, { recursive: true });

// creates a page logged in as one role, reusing the saved session when it exists
const loggedIn = (file, user, pass) => async ({ browser }, use) => {
  console.log('user:', user, 'pass set:', !!pass);
  const stateFile = path.join(AUTH_DIR, file);
  const hasState = fs.existsSync(stateFile);

  const context = await browser.newContext(hasState ? { storageState: stateFile } : {});
  const page = await context.newPage();

  
    const loginPage = new LoginPage(page);
    await loginPage.goto(process.env.QA_URL);
    await loginPage.login(user, pass);
    await expect(page).toHaveURL(/Home/);
    await context.storageState({ path: stateFile });
  

  await page.goto('/Home');
  await use(page);
  await context.close();
};

const test = base.extend({
  loggedInPage: loggedIn('normal.json', process.env.NORMAL_USERNAME, process.env.NORMAL_PASSWORD),
  loggedInAdminPage: loggedIn('admin.json', process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD),
  loggedInBranchPage: loggedIn('branch.json', process.env.BRANCH_USERNAME, process.env.BRANCH_PASSWORD),

  dashboardPage: async ({ loggedInPage }, use) => {
    await use(new Dashboard(loggedInPage));
  },
});

module.exports = { test, expect };