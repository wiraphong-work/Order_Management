import { test, expect, Page } from '@playwright/test';
import data from '../Tests/data.json';

export class MainPage {
  constructor(private readonly page: Page) {}

  async loginPage() {
    await this.page.goto('/');
    await this.page.getByPlaceholder('Username').fill(String(process.env.USERLOGIN))
    await this.page.getByPlaceholder('Password').fill(String(process.env.PASSWORDLOGIN))
    await this.page.getByRole('button', { name: 'Login' }).click();
    await expect(this.page.getByText(data['name_website'])).toBeVisible();
  }
}
