import { test, expect } from '@playwright/test';
const { fakerPT_BR } = require('@faker-js/faker');

const randomDate = fakerPT_BR.number.int({ min: 10012024, max: 10012030});
const url = process.env.URL;
const userName = process.env.USER;
const password = process.env.PASSWORD;

test('Split', async ({ page }) => {

  // Loga no ambiente HML Principal do PSA
  await page.goto(url);
  await page.locator('#i0116').click();
  await page.locator('#i0116').fill(userName);
  await page.getByRole('button', { name: 'Avançar' }).click();
  await page.locator('#i0118').click();
  await page.locator('#i0118').fill(password);
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.getByRole('button', { name: 'Avançar' }).click();
  await page.getByRole('link', { name: 'Pular a configuração' }).click();
  await page.getByRole('button', { name: 'Sim' }).click();  
  
  await page.getByLabel('Serviços (alterar área)').click();
  await page.getByText('Serviços de Projeto').click();
  
  await page.getByText('Contratos do Projeto').click();
  await page.getByText('Nome').click();
  await page.getByLabel('Filtrar por', { exact: true }).click();
  await page.getByLabel('Filter by value').click();
  await page.getByLabel('Filter by value').fill('Automacao');
  await page.getByRole('button', { name: 'Aplicar' }).click();
  await page.getByRole('gridcell', { name: 'Selecionar linha 2' }).click();
  await page.getByLabel('Editar', { exact: true }).click();
  await page.getByLabel('Informação do Faturamento').click();
  await page.getByLabel('Split').click();
  await page.frameLocator('iframe[name="ctm_html_split_ordemV2"]').locator('#TotalParcelas').click();
  await page.frameLocator('iframe[name="ctm_html_split_ordemV2"]').locator('#TotalParcelas').fill('2');
  await page.frameLocator('iframe[name="ctm_html_split_ordemV2"]').locator('#TotalParcelas').press('Tab');
  await page.frameLocator('iframe[name="ctm_html_split_ordemV2"]').locator('#DataInicio').fill('2024-01-01');
  await page.frameLocator('iframe[name="ctm_html_split_ordemV2"]').locator('#DiaFixoVenc').selectOption('05');
  await page.frameLocator('iframe[name="ctm_html_split_ordemV2"]').locator('#MensagemPadraoPedido').click();
  await page.frameLocator('iframe[name="ctm_html_split_ordemV2"]').locator('#MensagemPadraoPedido').fill('teste');
  await page.frameLocator('iframe[name="ctm_html_split_ordemV2"]').getByRole('button', { name: 'Simular' }).first().click();
  await page.frameLocator('iframe[name="ctm_html_split_ordemV2"]').getByRole('button', { name: 'Gerar Split' }).first().click();
  await page.frameLocator('iframe[name="ctm_html_split_ordemV2"]').getByRole('button', { name: 'Confirmar Split' }).click();
  await page.frameLocator('iframe[name="ctm_html_split_ordemV2"]').locator('#AlertaMensagem').getByRole('button', { name: 'Fechar' }).click();
  await page.getByLabel('Fechar', { exact: true }).click();
  await page.getByLabel('Mais comandos para Parcela de Faturamento').click();
  await page.getByLabel('Atualizar').click();
});