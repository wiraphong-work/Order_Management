import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './Tests',
  fullyParallel: true,
  retries: 2,
  workers: 1,
  // reporter: [
  //   [
  //     'playwright-tesults-reporter',
  //     {
  //       'tesults-target':
  //         'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImRhNjY3YzM4LWJhYmEtNGNjNC1iOGUyLTBhYzNjY2JjOWQ1ZC0xNzE2ODgwNTg0NzU2IiwiZXhwIjo0MTAyNDQ0ODAwMDAwLCJ2ZXIiOiIwIiwic2VzIjoiMzU2ODE1ZjUtZjIzZS00MzE5LWFiMDAtMjEzMjdhOWM0MjJkIiwidHlwZSI6InQifQ.lhnRwIOSUacwvP0Yjf9m38GuubtIl1G6aKZPWQHCBUI',
  //     },
  //   ],
  // ],
  reporter: [['html', { open: 'always' }]],
  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], screenshot: 'on' },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
