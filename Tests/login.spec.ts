import { test, expect } from '@playwright/test';
import data from './data.json';
import { MainPage } from '../component/global-fuction';

//Test git action
test.beforeEach('test Login', async ({ page }) => {
  await page.goto('/');
});

test('Test_01', async ({ page }) => {
  await page.getByPlaceholder('Username').fill(String(process.env.USERLOGIN));
  await page
    .getByPlaceholder('Password')
    .fill(String(process.env.PASSWORDLOGIN));
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText(data['name_website'])).toBeVisible();
});

test('Test_02', async ({ page }) => {
  await page.getByPlaceholder('Username').fill('test');
  await page.getByPlaceholder('Password').fill('test');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText(data['error'])).toBeVisible();
});

test('Test_03', async ({ page }) => {
  const component = new MainPage(page);
  await component.loginPage();
  await page.click('[id="react-burger-menu-btn"]');
  await page.click('[id="logout_sidebar_link"]');
  await expect(page.getByText(data['name_website'])).toBeVisible();
});
