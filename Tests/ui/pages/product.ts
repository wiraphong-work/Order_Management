import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly label: Locator;
  readonly description: Locator;
  readonly price: Locator;
  readonly cart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.label = page.locator('.inventory_item_name');
    this.description = page.locator('.inventory_item_desc');
    this.price = page.locator('.inventory_item_price');
    this.cart = page.locator('.shopping_cart_badge');
  }

  async checkHighPriceProduct() {
    const label = await this.label.allTextContents();
    const description = await this.description.allTextContents();
    const price = await this.price.allTextContents();

    let result: any[] = [];
    for (const index of label.keys()) {
      const obj = {
        label: label[index],
        description: description[index],
        price: price[index].replace('$', ''),
      };
      result.push(obj);
    }

    // Check if the array is sorted in descending order already returen true
    const isSorted = await result.every(
      (val, i, arr) => !i || arr[i - 1] >= val
    );
    return isSorted;
  }

  async checkLowPriceProduct() {
    const label = await this.label.allTextContents();
    const description = await this.description.allTextContents();
    const price = await this.price.allTextContents();

    let result: any[] = [];
    for (const index of label.keys()) {
      const obj = {
        label: label[index],
        description: description[index],
        price: price[index].replace('$', ''),
      };
      result.push(obj);
    }

    // Check if the array is sorted in ascending order already returen true
    const isSorted = await result.every(
      (val, i, arr) => !i || arr[i - 1] <= val
    );
    return isSorted;
  }

  async getAllProducts() {
    const countProduct = await this.page.locator('.btn').count();
    let idProduct = [''].filter((value) => value !== '');

    for (let i = 0; i < countProduct; i++) {
      let text = await this.page
        .locator('.btn')
        .nth(i)
        .getAttribute('data-test');
      idProduct.push(text!);
    }

    return { countProduct, idProduct };
  }

  async randomSelectProduct(numberAtCart: any) {
    const { idProduct } = await this.getAllProducts();

    const want = numberAtCart;
    const arr = Array.from(Array(idProduct.length - want).keys());

    for (const _ of arr) {
      const randomNum = await Math.floor(Math.random() * idProduct.length);
      await idProduct.splice(randomNum, 1);
    }

    for (let index = 0; index < idProduct.length; index++) {
      await this.page.locator(`data-test=${idProduct[index]}`).click();
    }

    const selectedProduct = idProduct;
    return { numberAtCart, selectedProduct };
  }

  async checkNumberCart(numberAtCart: number) {
    await expect(this.cart).toHaveText(String(numberAtCart));
  }

  async removeProduct(product: [], numberRemove: number) {
    await this.cart.click();
    if (product.length > numberRemove) {
      //select remove a Product[0]
      const productRemoved = product.slice(0, 1)[0];
      const editText = String(productRemoved).replace('add-to-cart', 'remove');
      this.page.locator(`data-test=${editText}`).click();
    } else {
      for (let index = 0; index < product.length; index++) {
        const editText = String(product[index]).replace(
          'add-to-cart',
          'remove'
        );
        this.page.locator(`data-test=${editText}`).click();
      }
    }
    return numberRemove;
  }

  async checKNoticeHiddenCart(
    numberRemove: number,
    selectedProduct: [],
    noticHidden: boolean
  ) {
    const resultCart = selectedProduct.length - numberRemove;
    if (noticHidden) {
      await expect(this.cart).toBeHidden();
    } else {
      await expect(this.cart).toHaveText(String(resultCart));
    }
  }
}
