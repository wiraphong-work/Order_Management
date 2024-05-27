import { test, expect } from '@playwright/test';
import { MainPage } from '../component/global-fuction';
import data from './data.json';

test.beforeEach('test Order', async ({ page }) => {
  const component = new MainPage(page);
  await component.loginPage();
});

test('Test_10', async ({ page }) => {
  await page.click('id=add-to-cart-sauce-labs-backpack');
  await page.click('id=shopping_cart_container');
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByPlaceholder('First Name').fill('test');
  await page.getByPlaceholder('Last Name').fill('test');
  await page.getByPlaceholder('Zip/Postal Code').fill('10400');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('button', { name: 'Finish' }).click();
  await expect(page.getByText(data['order_sucess'])).toBeVisible();
});

test('Test_11', async ({ page }) => {
  await page.click('id=add-to-cart-sauce-labs-backpack');
  await page.click('id=shopping_cart_container');
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByPlaceholder('First Name').fill('test');
  await page.getByPlaceholder('Last Name').fill('test');
  await page.getByPlaceholder('Zip/Postal Code').fill('10400');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});
