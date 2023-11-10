import { test, expect } from '@playwright/test';
import { timeout } from '../playwright.config';

const url = process.env.URL;
const userName = process.env.USER;
const password = process.env.PASSWORD;

test('Cotação do CRM Perdida', async ({ page }) => {

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

  // Entra no menu de Serviços do Projeto
  await page.getByLabel('Serviços (alterar área)').click();
  await page.getByText('Serviços de Projeto').click();
  
  // Entra na tela de cotações
  await page.getByLabel('Cotações', { exact: true }).locator('div').nth(3).click();

  // Filtra as cotações que vieram do CRM pelo campo "Código da Proposta"
  await page.getByLabel('Editar filtros').click();
  await expect(page.getByLabel('Adicionar nova expressão de nível 1')).toBeVisible({timeout: 15000});
  await page.getByLabel('Adicionar nova expressão de nível 1').click();
  await page.locator('button[name="Adicionar linha"]').click();
  await page.getByPlaceholder('Selecionar um campo').click();
  await page.getByPlaceholder('Selecionar um campo').fill('Código da Proposta');
  await page.getByPlaceholder('Selecionar um campo').press('Tab');
  await page.getByRole('combobox', { name: 'Operador' }).click();
  await page.locator('button').filter({ hasText: /^Contém dados$/ }).click();
  await page.getByLabel('Aplicar os filtros avançados atuais').click();

  // Classifica as cotações a começar com a mais atuais
  await page.getByText('Data de Criação').nth(1).click();
  await page.getByLabel('Classificar do Mais Recente para o Mais Antigo').click();

  // Classifica as cotações em "Aguardando Analise"
  await page.getByText('Razão do Status').nth(1).click();
  await page.getByLabel('Filtrar por', { exact: true }).click();
  await page.getByText('Igual a').click();
  await page.getByRole('option', { name: 'Contém', exact: true }).click();
  await page.getByLabel('Filter by value').click();
  await page.getByLabel('Filter by value').fill('Aguardando Analise');
  await page.getByRole('button', { name: 'Aplicar' }).click();

  // Seleciona a cotação que estiver na linha 10 e clica em editar
  await page.getByRole('gridcell', { name: 'Selecionar linha 10' }).click();
  await page.getByLabel('Editar', { exact: true }).click();

  // Clica em "Fechar como perdida preenche os campos e reprova"
  await page.getByLabel('FECHAR COMO PERDIDA').click();
  await page.frameLocator('iframe[name="ctm_dialog_reprova_quote"]').getByRole('button', { name: 'Motivo' }).click();
  await page.frameLocator('iframe[name="ctm_dialog_reprova_quote"]').getByText('000002 - PropostanaoAssinada').click();
  await page.frameLocator('iframe[name="ctm_dialog_reprova_quote"]').getByLabel('Descrição').click();
  await page.frameLocator('iframe[name="ctm_dialog_reprova_quote"]').getByLabel('Descrição').fill('Teste\n');
  await page.frameLocator('iframe[name="ctm_dialog_reprova_quote"]').getByRole('button', { name: 'Reprovar' }).click();
  await page.waitForTimeout(20000);
});