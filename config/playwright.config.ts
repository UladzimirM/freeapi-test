import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config'
import * as path from "path";

export default defineConfig({
  testDir: '../tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  globalSetup: path.resolve('./config/pwGlobalSetup.ts'),
  reporter: [["line"], ["allure-playwright"]],
  use: {
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'api',
    },
  ],
});
