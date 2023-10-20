import { test, expect } from '@playwright/test';

const url = process.env.URL;
const userName = process.env.USER;
const password = process.env.PASSWORD;


test('Planejamento', async ({ page }) => {
  
  // Loga no ambiente HML Principal do PSA
  await page.goto(url);
  await page.locator('#i0116').click();
  await page.locator().fill(userName);
  await page.getByRole('button', { name: 'Avançar' }).click();
  await page.locator('#i0118').click();
  await page.locator('#i0118').fill(password);
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.getByRole('button', { name: 'Sim' }).click();
  
  await page.getByLabel('Serviços (alterar área)').click();
  await page.getByText('Serviços de Projeto').click();
  await page.getByText('Projetos', { exact: true }).click();
  await page.getByText('Nome').click();
  await page.getByLabel('Filtrar por', { exact: true }).click();
  await page.locator('span').filter({ hasText: /^Igual a$/ }).click();
  await page.getByRole('option', { name: 'Começa com', exact: true }).click();
  await page.getByLabel('Filter by value').click();
  await page.getByLabel('Filter by value').fill('Projeto Teste ');
  await page.getByRole('button', { name: 'Aplicar' }).click();
  await page.getByText('Razão do Status').nth(1).click();
  await page.getByLabel('Filtrar por', { exact: true }).click();
  await page.getByText('Igual a').click();
  await page.getByRole('option', { name: 'Contém', exact: true }).click();
  await page.getByLabel('Filter by value').click();
  await page.getByLabel('Filter by value').fill('Rascunho');
  await page.getByRole('button', { name: 'Aplicar' }).click();
  await page.getByRole('gridcell', { name: 'Selecionar linha 2' }).click();
});