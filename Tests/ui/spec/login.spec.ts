import { test } from '@playwright/test';
import { LoginPage } from '../pages/login';

let loginPage;

test.beforeEach('test Login', async ({ page }) => {
  await page.goto('/');
  loginPage = new LoginPage(page);
});

test('Test_01', async () => {
  await loginPage.doLogin(process.env.USERLOGIN, process.env.PASSWORDLOGIN);
  await loginPage.checkLoggedIn();
});

test('Test_02', async () => {
  await loginPage.doLogin('Test', 'Test');
  await loginPage.checkInvalidCredentials();
});

test('Test_03', async () => {
  await loginPage.doLogin(
    String(process.env.USERLOGIN),
    String(process.env.PASSWORDLOGIN)
  );
  await loginPage.checkLoggedIn();
  await loginPage.logoutPage();
  await loginPage.checkLogout();
});
