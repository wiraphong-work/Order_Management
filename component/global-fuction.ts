import { test, expect, Page } from '@playwright/test';
import data from "../Tests/data.json"


export class MainPage {
    constructor(private readonly page: Page) { }

    async loginPage() {
        await this.page.goto('/');
        await this.page.fill('[id="user-name"]' , String(process.env.USERLOGIN))
        await this.page.fill('[id="password"]' , String(process.env.PASSWORDLOGIN))
        await this.page.click('[id="login-button"]')
        await expect(this.page.getByText(data["name_website"])).toBeVisible()
      }


     
}  