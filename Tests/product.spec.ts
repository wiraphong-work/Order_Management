import { test, expect } from "@playwright/test";
import { MainPage } from "../component/global-fuction";

test.beforeEach("test Product", async ({ page }) => {
  //Case use component fuction.
  const component = new MainPage(page);
  component.loginPage();
});

test("Test_04", async ({ page }) => {
  await page.click('[id="add-to-cart-sauce-labs-backpack"]');
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});

test("Test_05", async ({ page }) => {
  await page.click('[id="add-to-cart-sauce-labs-backpack"]');
  await page.click('[id="add-to-cart-sauce-labs-bike-light"]');
  await page.click('[id="add-to-cart-sauce-labs-onesie"]');
  await expect(page.locator('.shopping_cart_badge')).toHaveText('3');
});

test("Test_06", async ({ page }) => {
  await expect(page.locator('[id="item_4_title_link"]')).toHaveText(
    'Sauce Labs Backpack'
  );
  await page.selectOption('.product_sort_container', 'lohi');
  await expect(page.locator('[id="item_2_title_link"]')).toHaveText(
    'Sauce Labs Onesie'
  );
  await page.selectOption('.product_sort_container', 'hilo');
  await expect(page.locator('[id="item_5_title_link"]')).toHaveText(
    'Sauce Labs Fleece Jacket'
  );
});

test("Test_07", async ({ page }) => {
  await page.click('[id="add-to-cart-sauce-labs-onesie"]');
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  await page.click('[id="shopping_cart_container"]');
  await page.click('[id="remove-sauce-labs-onesie"]');
  await expect(page.locator(".shopping_cart_badge")).toBeHidden();
});

test("Test_08", async ({ page }) => {
  await page.click('[id="add-to-cart-sauce-labs-backpack"]');
  await page.click('[id="add-to-cart-sauce-labs-bike-light"]');
  await page.click('[id="add-to-cart-sauce-labs-onesie"]');
  await expect(page.locator('.shopping_cart_badge')).toHaveText('3');
  await page.click('[id="remove-sauce-labs-backpack"]');
  await expect(page.locator(".shopping_cart_badge")).toHaveText('2');
});

test("Test_09", async ({ page }) => {
  await page.click('[id="add-to-cart-sauce-labs-backpack"]');
  await page.click('[id="add-to-cart-sauce-labs-bike-light"]');
  await page.click('[id="add-to-cart-sauce-labs-onesie"]');
  await expect(page.locator('.shopping_cart_badge')).toHaveText('3');
  await page.click('[id="remove-sauce-labs-backpack"]');
  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  await page.click('[id="remove-sauce-labs-bike-light"]');
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});
