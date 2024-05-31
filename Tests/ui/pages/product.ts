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

    const result = await label.map((value, index) => {
      return {
        label: value,
        description: description[index],
        price: price[index].replace('$', ''),
      };
    });
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

    const result = await label.map((value, index) => {
      return {
        label: value,
        description: description[index],
        price: price[index].replace('$', ''),
      };
    });

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

  // async randomProduct(number: number) {
  //   let min = 0;
  //   let max = (await this.label.count()) - 1;
  //   let count = await number;

  //   const result = await new Set();

  //   while (result.size < count) {
  //     const randomNum =
  //       (await Math.floor(Math.random() * (max - min + 1))) + min;
  //     result.add(randomNum);
  //   }

  //   // const text = await this.page.locator('.btn').getAttribute('data-test');

  //   for (let val of await result) {

  //     const idLocator = await this.page
  //       .getByText('Add to cart')
  //       .nth(Number(val))
  //       .getAttribute('data-test', { timeout: 2000 });
  //     // console.log('idLocator:', idLocator);

  //     await this.page.locator(`data-test=${idLocator}`).click();
  //   }
  //   return await number.toString();
  // }

  async randomSelectProduct(numberAtCart: any) {
    const { countProduct, idProduct } = await this.getAllProducts();

    let min = 0;
    let max = countProduct - 1;
    let count = await numberAtCart;

    const result = await new Set();
    
    while (result.size < count) {
      const randomNum =
        (await Math.floor(Math.random() * (max - min + 1))) + min;
      result.add(randomNum);
    }



    let selectedProduct = Array(6).fill(undefined);
    for (let val of await result) {
      selectedProduct.push(idProduct[Number(val)]);
      await this.page.locator(`data-test=${idProduct[Number(val)]}`).click();
    }

    return { numberAtCart, selectedProduct };
  }

  async checkNumberCart(numberAtCart: number) {
    await expect(this.cart).toHaveText(String(numberAtCart));
  }

  async removeProduct(product: [], numRemove: any) {
    await this.cart.click();
    //เงื่อนไขลบครั้งเดียว
    await product.map((value) => {
      const editText = String(value).replace('add-to-cart', 'remove');
      this.page.locator(`data-test=${editText}`).click();
    });
  }

  async checKNoticeHiddenCart(
    selectProduct: number,
    removeProduct: [],
    noticHidden: boolean
  ) {
    console.log('removeProduct:', removeProduct);
    const resultCart = selectProduct - removeProduct.length;
    console.log('noticHidden:', noticHidden);
    if (noticHidden) {
      await expect(this.cart).toBeHidden();
    } else {
      await expect(this.cart).toHaveText(String(resultCart));
    }
  }
}
