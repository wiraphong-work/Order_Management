import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { ProductPage } from '../pages/product';

let loginPage;
let productPage;

test.beforeEach('test Product', async ({ page }) => {
  loginPage = new LoginPage(page);
  productPage = new ProductPage(page);

  await loginPage.doLogin(
    String(process.env.USERLOGIN),
    String(process.env.PASSWORDLOGIN)
  );
});

test('Test_04', async () => {
  const numberProduct = await productPage.randomSelectProduct(1);
  await productPage.checkNumberCart(numberProduct.numberAtCart);
});

test('Test_05', async () => {
  const numberProduct = await productPage.randomSelectProduct(3);
  await productPage.checkNumberCart(numberProduct.numberAtCart);
});

test('Test_06', async ({ page }) => {
  //Select low price
  await page.selectOption('.product_sort_container', 'lohi');
  await expect(await productPage.checkLowPriceProduct()).toBe(true);

  //Select high price
  await page.selectOption('.product_sort_container', 'hilo');
  await expect(await productPage.checkHighPriceProduct()).toBe(true);
});

test('Test_07', async () => {
  const numberProduct = await productPage.randomSelectProduct(1);
  await productPage.checkNumberCart(numberProduct.numberAtCart);
  await productPage.removeProduct(numberProduct.selectedProduct );
  await productPage.checKNoticeHiddenCart(
    numberProduct.numberAtCart,
    numberProduct.selectedProduct,
    true
  );
});

test('Test_08', async () => {
  const numberProduct = await productPage.randomSelectProduct(3);
  await productPage.checkNumberCart(numberProduct.numberAtCart);
  await productPage.removeProduct(numberProduct.selectedProduct, 1);
  await productPage.checKNoticeHiddenCart(
    numberProduct.numberAtCart,
    numberProduct.selectedProduct,
    false
  );
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
