import { test } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { ProductPage } from '../pages/product';
import { OrderPage } from '../pages/order';

let productPage;
let orderPage;
let loginPage;

test.beforeEach('test Order', async ({ page }) => {
  loginPage = new LoginPage(page);
  productPage = new ProductPage(page);
  orderPage = new OrderPage(page);

  await loginPage.doLogin(process.env.USERLOGIN, process.env.PASSWORDLOGIN);
});

test('Test_10', async () => {
  const dataProduct = await productPage.randomSelectProduct(1);
  await productPage.checkNumberCart(dataProduct.numberAtCart);
  await orderPage.checkoutSuccess(true);
});

test('Test_11', async () => {
  const dataProduct = await productPage.randomSelectProduct(1);
  await productPage.checkNumberCart(dataProduct.numberAtCart);
  await orderPage.checkoutSuccess(false);
  await productPage.checkNumberCart(dataProduct.numberAtCart);
});
