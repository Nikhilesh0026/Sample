const path = require('path');
const { defineConfig, devices } = require('@playwright/test');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

module.exports = defineConfig({
  testDir: './tests',
  workers: 5,            // only one worker, so files run one after another
  fullyParallel: true,  // keep tests inside a file sequential too (this is the default)
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});