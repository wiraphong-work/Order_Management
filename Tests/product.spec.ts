import { test, expect } from "@playwright/test";
import { MainPage } from "../component/global-fuction";

test.beforeEach("test Product", async ({ page }) => {
  const component = new MainPage(page);
  await component.loginPage();
});

test("Test_04", async ({ page }) => {
  await page.click('[id="add-to-cart-sauce-labs-backpack"]');
  await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
});

test("Test_05", async ({ page }) => {
  await page.click('[id="add-to-cart-sauce-labs-backpack"]');
  await page.click('[id="add-to-cart-sauce-labs-bike-light"]');
  await page.click('[id="add-to-cart-sauce-labs-onesie"]');
  await expect(page.locator(".shopping_cart_badge")).toHaveText("3");
});

test("Test_06", async ({ page }) => {
  //Select low price
  await page.selectOption(".product_sort_container", "lohi");
  const data_select_low_price = await page
    .locator("div.inventory_item_price")
    .allTextContents();
  const convert_data_low_price = Number(data_select_low_price[0].split("$")[1])
  const data_low_price = await Math.min(...data_select_low_price.map((val)=>{
    return Number(val.split("$")[1]);
  })) 
  await expect(convert_data_low_price).toBe(data_low_price);

  //Select high price
  await page.selectOption(".product_sort_container", "hilo");
  const data_select_high_price = await page
  .locator("div.inventory_item_price")
  .allTextContents();
  const convert_data_high_price = Number(data_select_high_price[0].split("$")[1])
  const data_high_price = await Math.max(...data_select_high_price.map((val)=>{
    return Number(val.split("$")[1]);
  })) 
  await expect(convert_data_high_price).toBe(data_high_price);
});

test("Test_07", async ({ page }) => {
  await page.click('[id="add-to-cart-sauce-labs-onesie"]');
  await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
  await page.click('[id="shopping_cart_container"]');
  await page.click('[id="remove-sauce-labs-onesie"]');
  await expect(page.locator(".shopping_cart_badge")).toBeHidden();
});

test("Test_08", async ({ page }) => {
  await page.click('[id="add-to-cart-sauce-labs-backpack"]');
  await page.click('[id="add-to-cart-sauce-labs-bike-light"]');
  await page.click('[id="add-to-cart-sauce-labs-onesie"]');
  await expect(page.locator(".shopping_cart_badge")).toHaveText("3");
  await page.click('[id="remove-sauce-labs-backpack"]');
  await expect(page.locator(".shopping_cart_badge")).toHaveText("2");
});

test("Test_09", async ({ page }) => {
  await page.click('[id="add-to-cart-sauce-labs-backpack"]');
  await page.click('[id="add-to-cart-sauce-labs-bike-light"]');
  await page.click('[id="add-to-cart-sauce-labs-onesie"]');
  await expect(page.locator(".shopping_cart_badge")).toHaveText("3");
  await page.click('[id="remove-sauce-labs-backpack"]');
  await expect(page.locator(".shopping_cart_badge")).toHaveText("2");
  await page.click('[id="remove-sauce-labs-bike-light"]');
  await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
});
