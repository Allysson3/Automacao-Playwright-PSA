import { test, expect } from '@playwright/test';

const url = process.env.URL;
const userName = process.env.USER;
const password = process.env.PASSWORD;

test('Cotacao Ganha', async ({ page }) => {
  
  // Loga no ambiente HML Principal do PSA
  await page.goto(url);
  await page.locator('#i0116').click();
  await page.locator('#i0116').fill(userName);
  await page.getByRole('button', { name: 'Avançar' }).click();
  await page.locator('#i0118').click();
  await page.locator('#i0118').fill(password);
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.getByRole('button', { name: 'Sim' }).click();
  
  // Entra no menu de Serviços do Projeto
  await page.getByLabel('Serviços (alterar área)').click();
  await page.getByText('Serviços de Projeto').click();
  
  // Entra na tela de cotações
  await page.getByLabel('Cotações', { exact: true }).locator('div').nth(3).click();
  
  // Filtra as cotações pelo nome "Automacao"
  await page.getByText('Nome').click();
  await page.getByText('Nome').click();
  await page.getByLabel('Filtrar por', { exact: true }).click();
  await page.getByLabel('Filter by value').click();
  await page.getByLabel('Filter by value').fill('Automacao');
  await page.getByRole('button', { name: 'Aplicar' }).click();
  
  // Filtra pelo status Aguardando Análise seleciona e clica em Editar, depois em Fechar como Ganha
  await page.getByText('Razão do Status').click();
  await page.getByLabel('Filtrar por', { exact: true }).click();
  await page.getByText('Igual a').click();
  await page.getByRole('option', { name: 'Contém', exact: true }).click();
  await page.getByLabel('Filter by value').click();
  await page.getByLabel('Filter by value').fill('Aguardando Analise');
  await page.getByRole('button', { name: 'Aplicar' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('gridcell', { name: 'Selecionar linha 2' }).click();
  await page.getByLabel('Editar', { exact: true }).click();
  await page.waitForTimeout(3000);
  await page.getByLabel('Fechar como Ganha').click();
  await page.getByLabel('OK', { exact: true}).click();

  // Scroll
  await page.waitForTimeout(20000);
  await page.mouse.wheel(0, 800);

  // Preenche o restante dos campos, confirma o contrato e salva novamente
  await page.getByLabel('Modalidade de Projeto').selectOption('0');
  await page.getByLabel('Dia Limite de Faturamento').click();
  await page.getByLabel('Dia Limite de Faturamento').fill('20');
  await page.getByLabel('Margem de Contingência do Contrato').click();
  await page.getByLabel('Margem de Contingência do Contrato', { exact: true }).fill('10');
  await page.getByLabel('Salvar (CTRL+S)').click();
  await page.getByLabel('Mais comandos para Ordem').click();
  await page.getByLabel('Confirmar').click();
  await page.getByLabel('OK', { exact: true}).click();
  await page.getByLabel('Salvar e continuar').click();
});