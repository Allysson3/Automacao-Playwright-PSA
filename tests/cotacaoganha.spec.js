import { test, expect } from '@playwright/test';

const url = process.env.URL;
const userName = process.env.USER;
const password = process.env.PASSWORD;

test('test', async ({ page }) => {
  
  // Loga no ambiente HML Principal do PSA
  await page.goto(url);
  await page.getByPlaceholder('Email, telefone ou Skype').click();
  await page.getByPlaceholder('Email, telefone ou Skype').fill(userName);
  await page.getByRole('button', { name: 'Avançar' }).click();
  await page.getByPlaceholder('Senha').click();
  await page.getByPlaceholder('Senha').fill(password);
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
  await page.getByLabel('Editar filtros').click();
  
  // Filtra pelo status Aguardando Análise seleciona e clica em Editar, depois em Fechar como Ganha
  await page.getByPlaceholder('Selecionar um campo').click();
  await page.getByPlaceholder('Selecionar um campo').fill('Razão do Status');
  await page.getByPlaceholder('Valor').click();
  await page.getByPlaceholder('Valor').click();
  await page.getByRole('option', { name: 'Aguardando Analise' }).click();
  await page.getByLabel('Aplicar os filtros avançados atuais').click();
  await page.waitForTimeout(2000);
  await page.getByRole('gridcell', { name: 'Selecionar linha 2' }).click();
  await page.getByLabel('Editar', { exact: true }).click();
  await page.waitForTimeout(3000);
  await page.getByLabel('Fechar como Ganha').click();
  await page.getByLabel('OK').click();

  // Scroll
  await page.waitForTimeout(15000);
  await page.mouse.wheel(0, 700);

  // Preenche o restante dos campos, confirma o contrato e salva novamente
  await page.getByLabel('Modalidade de Projeto').selectOption('0');
  await page.getByLabel('Dia Limite de Faturamento').click();
  await page.getByLabel('Dia Limite de Faturamento').fill('20');
  await page.getByLabel('Margem de Contingência do Contrato').click();
  await page.getByLabel('Margem de Contingência do Contrato', { exact: true }).fill('10');
  await page.getByLabel('Salvar (CTRL+S)').click();
  await page.getByLabel('Mais comandos para Ordem').click();
  await page.getByLabel('Confirmar').click();
  await page.getByLabel('OK').click();
  await page.getByLabel('Salvar e continuar').click();
});