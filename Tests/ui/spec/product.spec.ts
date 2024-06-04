import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { ProductPage } from '../pages/product';

let loginPage;
let productPage;

test.beforeEach('test Product', async ({ page }) => {
  loginPage = new LoginPage(page);
  productPage = new ProductPage(page);

  await loginPage.doLogin(process.env.USERLOGIN, process.env.PASSWORDLOGIN);
});

test('Test_04', async () => {
  const dataProduct = await productPage.randomSelectProduct(1);
  await productPage.checkNumberCart(dataProduct.numberAtCart);
});

test('Test_05', async () => {
  const dataProduct = await productPage.randomSelectProduct(3);
  await productPage.checkNumberCart(dataProduct.numberAtCart);
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
  const dataProduct = await productPage.randomSelectProduct(1);
  const { numberAtCart, selectedProduct } = dataProduct;
  await productPage.checkNumberCart(numberAtCart);
  const numberRemove = await productPage.removeProduct(selectedProduct, 1);
  await productPage.checKNoticeHiddenCart(numberRemove, selectedProduct, true);
});

test('Test_08', async () => {
  const dataProduct = await productPage.randomSelectProduct(3);
  const { numberAtCart, selectedProduct } = dataProduct;
  await productPage.checkNumberCart(numberAtCart);
  const numberRemove = await productPage.removeProduct(selectedProduct, 1);
  await productPage.checKNoticeHiddenCart(numberRemove, selectedProduct, false);
});

test('Test_09', async () => {
  let numberRemove;
  const dataProduct = await productPage.randomSelectProduct(3);
  const { numberAtCart, selectedProduct } = dataProduct;
  await productPage.checkNumberCart(numberAtCart);
  numberRemove = await productPage.removeProduct(selectedProduct, 1);
  await productPage.checkNumberCart(numberAtCart);
  numberRemove = await productPage.removeProduct(selectedProduct, 1);
  await productPage.checkNumberCart(numberAtCart);
  await productPage.checKNoticeHiddenCart(numberRemove, selectedProduct, false);
});
