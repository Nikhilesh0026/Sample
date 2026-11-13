const fs = require('fs');
const { test: setup, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login');


setup('login as admin user', async ({ page }) => {
  fs.mkdirSync('.auth', { recursive: true });

  await new LoginPage(page).goto(process.env.QA_URL);
  await new LoginPage(page).login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);
  await expect(page).toHaveURL(/Home/);

  await page.context().storageState({ path: '.auth/admin.json' });
  fs.writeFileSync('.auth/admin-session.json', await page.evaluate(() => JSON.stringify(sessionStorage)));
});