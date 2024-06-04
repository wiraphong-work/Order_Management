import { Page, expect, Locator } from '@playwright/test';
import data from '../../data/data.json';

export class OrderPage {
  readonly page: Page;
  readonly cart: Locator;
  readonly checkoutBtn: Locator;
  readonly fNameInput: Locator;
  readonly lNameInput: Locator;
  readonly zipCodeInput: Locator;
  readonly continueBtn: Locator;
  readonly finishBtn: Locator;
  readonly cancelBtn: Locator;
  readonly modelMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cart = page.locator('.shopping_cart_badge');
    this.checkoutBtn = page.getByRole('button', { name: 'Checkout' });
    this.fNameInput = page.getByPlaceholder('First Name');
    this.lNameInput = page.getByPlaceholder('Last Name');
    this.zipCodeInput = page.getByPlaceholder('Zip/Postal Code');
    this.continueBtn = page.getByRole('button', { name: 'Continue' });
    this.finishBtn = page.getByRole('button', { name: 'Finish' });
    this.cancelBtn = page.getByRole('button', { name: 'Cancel' });
    this.modelMessage = page.getByText(data['order_sucess']);
  }

  async CheckoutSuccess(action: true) {
    await this.cart.click();
    await this.checkoutBtn.click();
    await this.fNameInput.fill('test');
    await this.lNameInput.fill('test');
    await this.zipCodeInput.fill('10400');
    await this.continueBtn.click();
    if (action) {
      await this.finishBtn.click();
      await expect(this.modelMessage).toBeVisible();
    } else {
      await this.cancelBtn.click();
    }
  }
}
