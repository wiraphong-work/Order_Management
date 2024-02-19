import { test, expect } from '@playwright/test';
import data from './data.json'

test.beforeEach('test login' , async({page})=>{
  await page.goto('/');
})

test('Test_01', async ({ page }) => {
  await page.fill('[id="user-name"]' , String(process.env.USERLOGIN))
  await page.fill('[id="password"]' , String(process.env.PASSWORDLOGIN))
  await page.click('[id="login-button"]')
  await expect(page.getByText(data["name_website"])).toBeVisible()
});

test('Test_02', async ({ page }) => {
  await page.fill('[id="user-name"]' , 'test')
  await page.fill('[id="password"]' , 'test')
  await page.click('[id="login-button"]')
  await expect(page.getByText(data["error"])).toBeVisible()
});

test('Test_03', async ({ page }) => {
  await page.fill('[id="user-name"]' , String(process.env.USERLOGIN))
  await page.fill('[id="password"]' , String(process.env.PASSWORDLOGIN))
  await page.click('[id="login-button"]')
  await expect(page.getByText(data["name_website"])).toBeVisible()
  await page.click('[id="react-burger-menu-btn"]')
  await page.click('[id="logout_sidebar_link"]')
  await expect(page.getByText(data["name_website"])).toBeVisible()
});

