import { test, expect } from '@playwright/test';
import { MainPage } from '../component/global-fuction';
import data from './data.json'

test.beforeEach('test Order' , async({page})=>{
    const component = new MainPage(page);
    await component.loginPage()
  })

test('Test_10', async ({ page }) => {
    await page.click('[id="add-to-cart-sauce-labs-backpack"]')
    await page.click('[id="shopping_cart_container"]')
    await page.click('[id="checkout"]')
    await page.fill('[id="first-name"]', 'test')
    await page.fill('[id="last-name"]', 'test')
    await page.fill('[id="postal-code"]', '10400')
    await page.click('[id="continue"]')
    await page.click('[id="finish"]')
    await expect(page.getByText(data['order_sucess'])).toBeVisible()
});

test('Test_11', async ({ page }) => {
  await page.click('[id="add-to-cart-sauce-labs-backpack"]')
  await page.click('[id="shopping_cart_container"]')
  await page.click('[id="checkout"]')
  await page.fill('[id="first-name"]', 'test')
  await page.fill('[id="last-name"]', 'test')
  await page.fill('[id="postal-code"]', '10400')
  await page.click('[id="continue"]')
  await page.click('[id="cancel"]')
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});


