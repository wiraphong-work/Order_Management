import { test, expect } from '@playwright/test';
import { MainPage } from '../component/global-fuction';

let component
test.beforeEach('test Product', async ({ page }) => {
  component = new MainPage(page);
  await component.loginPage();
});

test('Test_04', async ({ page }) => {
  await page.click('id=add-to-cart-sauce-labs-backpack');
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});

test('Test_05', async ({ page }) => {
  await page.click('id=add-to-cart-sauce-labs-backpack');
  await page.click('id=add-to-cart-sauce-labs-bike-light');
  await page.click('id=add-to-cart-sauce-labs-onesie');
  await expect(page.locator('.shopping_cart_badge')).toHaveText('3');
});

test('Test_06', async ({ page }) => {
  //Select low price
  await page.selectOption('.product_sort_container', 'lohi');
  const checkValueLowPriceProduct = await component.checkLowPriceProduct();
  await expect(checkValueLowPriceProduct).toBe(true);

  //Select high price
  await page.selectOption('.product_sort_container', 'hilo');
  const checkValueHighPriceProduct = await component.checkHighPriceProduct();
  await expect(checkValueHighPriceProduct).toBe(true);
});

test('Test_07', async ({ page }) => {
  await page.click('id=add-to-cart-sauce-labs-onesie');
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  await page.click('id=shopping_cart_container');
  await page.click('id=remove-sauce-labs-onesie');
  await expect(page.locator('.shopping_cart_badge')).toBeHidden();
});

test('Test_08', async ({ page }) => {
  await page.click('id=add-to-cart-sauce-labs-backpack');
  await page.click('id=add-to-cart-sauce-labs-bike-light');
  await page.click('id=add-to-cart-sauce-labs-onesie');
  await expect(page.locator('.shopping_cart_badge')).toHaveText('3');
  await page.click('id=remove-sauce-labs-backpack');
  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
});

test('Test_09', async ({ page }) => {
  await page.click('id=add-to-cart-sauce-labs-backpack');
  await page.click('id=add-to-cart-sauce-labs-bike-light');
  await page.click('id=add-to-cart-sauce-labs-onesie');
  await expect(page.locator('.shopping_cart_badge')).toHaveText('3');
  await page.click('id=remove-sauce-labs-backpack');
  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  await page.click('id=remove-sauce-labs-bike-light');
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});
