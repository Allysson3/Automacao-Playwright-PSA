import { test, expect } from '@playwright/test';

const url = process.env.URL;
const userName = process.env.USER;
const password = process.env.PASSWORD;

test('Login', async ({ page }) => {
  await page.goto(url);
  await page.getByPlaceholder('Email, telefone ou Skype').click();
  await page.getByPlaceholder('Email, telefone ou Skype').fill(userName);
  await page.getByRole('button', { name: 'Avançar' }).click();
  await page.getByPlaceholder('Senha').click();
  await page.getByPlaceholder('Senha').fill(password);
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.getByRole('button', { name: 'Sim' }).click();
  await page.waitForTimeout(2000)

});