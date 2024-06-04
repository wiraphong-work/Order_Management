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

    let selectedProduct = Array(max)
      .fill(undefined)
      .filter((value) => value !== undefined);
    for (let val of await result) {
      selectedProduct.push(idProduct[Number(val)]);
      await this.page.locator(`data-test=${idProduct[Number(val)]}`).click();
    }

    return { numberAtCart, selectedProduct };
  }

  // async randomSelectProduct(numberAtCart: any) {
  //   const { countProduct, idProduct } = await this.getAllProducts();

  //   let num = countProduct;
  //   let btn_arr = idProduct;
  //   const want = numberAtCart;

  //   const result = Array.from(Array(num - want).keys()).reduce((p) => {
  //     const select = Math.floor(Math.random() * p.length);
  //     return p.filter((e) => !e.includes(p[select]));
  //   }, btn_arr);

  //   result.map(async (value) => {
  //     await console.log('value :>> ', value);
  //     await this.page.locator(`data-test=${value}`).click();
  //     const btnStr = await this.page
  //       .locator(`data-test=${value}`)
  //       .textContent();
  //     await console.log('btnStr:>> ', btnStr);
  //     await expect(btnStr).toContainEqual('Remove');
  //     await console.log('cart :>> ', await this.cart.textContent());
  //     // await this.page.waitForTimeout(1000);
  //   });

  //   return result;
  // }

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
      product.map((value) => {
        //remove all Product 
        const editText = String(value).replace('add-to-cart', 'remove');
        this.page.locator(`data-test=${editText}`).click();
      });
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
