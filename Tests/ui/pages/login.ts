import { Page, expect, Locator } from '@playwright/test';
import data from '../../data/data.json';

export class LoginPage {
  readonly page: Page;
  readonly loginButton: Locator;
  readonly password: Locator;
  readonly userName: Locator;
  readonly nameWebsite: Locator;
  readonly errorMessage: Locator;
  readonly iconMenu: Locator;
  readonly menuLogout: Locator;
  readonly resetState: Locator;
  readonly burgerCrossBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.password = page.getByPlaceholder('Password');
    this.userName = page.getByPlaceholder('UserName');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.getByText(data['error']);
    this.iconMenu = page.locator('id=react-burger-menu-btn');
    this.menuLogout = page.locator('id=logout_sidebar_link');
    this.resetState = page.locator('id=reset_sidebar_link');
    this.burgerCrossBtn = page.locator('id=react-burger-cross-btn');
  }

  async doLogin(userName: string, password: string) {
    await this.page.goto('/');
    await this.userName.fill(userName);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async checkLoggedIn() {
    await expect(this.page).toHaveURL(/.*inventory.html/);
    await expect(this.page).toHaveTitle(data['name_website']);
  }

  async checkInvalidCredentials() {
    await expect(this.errorMessage).toBeVisible();
  }

  async logoutPage() {
    await this.iconMenu.click();
    await this.menuLogout.click();
  }

  async checkLogout() {
    await expect(this.page).toHaveURL('/');
    await expect(this.page).toHaveTitle(data['name_website']);
  }

  async resetStateOfPage() {
    await this.iconMenu.click();
    await this.resetState.click();
    await this.burgerCrossBtn.click();
  }
}
