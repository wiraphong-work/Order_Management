import { test, expect, Page } from '@playwright/test';
import data from '../Tests/data.json';

export class MainPage {
  constructor(private readonly page: Page) {}

  async loginPage() {
    await this.page.goto('/');
    await this.page
      .getByPlaceholder('Username')
      .fill(String(process.env.USERLOGIN));
    await this.page
      .getByPlaceholder('Password')
      .fill(String(process.env.PASSWORDLOGIN));
    await this.page.getByRole('button', { name: 'Login' }).click();
    await expect(this.page.getByText(data['name_website'])).toBeVisible();
  }

  async checkHighPriceProduct() {
    const label = await this.page
      .locator('.inventory_item_name')
      .allTextContents();

    const description = await this.page
      .locator('.inventory_item_desc')
      .allTextContents();

    const price = await this.page
      .locator('.inventory_item_price')
      .allTextContents();

    let result = label.map((value, index) => {
      return {
        label: value,
        description: description[index],
        price: price[index],
      };
    });

    const res = result.map((item) => {
      const conevert = item.price.replace('$', '');
      return parseFloat(conevert);
    });
    const isSorted = res.every((val, i, arr) => !i || arr[i - 1] >= val);
    return isSorted;
  }

  async checkLowPriceProduct() {
    const label = await this.page
      .locator('.inventory_item_name')
      .allTextContents();

    const description = await this.page
      .locator('.inventory_item_desc')
      .allTextContents();

    const price = await this.page
      .locator('.inventory_item_price')
      .allTextContents();

    let result = label.map((value, index) => {
      return {
        label: value,
        description: description[index],
        price: price[index],
      };
    });

    const res = result.map((item) => {
      const conevert = item.price.replace('$', '');
      return parseFloat(conevert);
    });
    const isSorted = res.every((val, i, arr) => !i || arr[i - 1] <= val);
    return isSorted;
  }
}
