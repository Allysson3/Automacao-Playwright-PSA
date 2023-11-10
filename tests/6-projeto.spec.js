import { test, expect } from '@playwright/test';
import { timeout } from '../playwright.config';
const { faker } = require('@faker-js/faker');

const RandomNumber = faker.number.int({ min: 10000, max: 199999});
const url = process.env.URL;
const userName = process.env.USER;
const password = process.env.PASSWORD;

test('Criar Projeto', async ({ page }) => {

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

  await page.getByText('Contratos do Projeto').click();
  
  // Filtra por Contratos que não contenham projetos
  await page.getByLabel('Editar filtros').click();
  await page.getByLabel('Adicionar nova expressão de nível 1').click();
  await page.locator('button').filter({ hasText: 'Adicionar entidade relacionada' }).click();
  await page.getByPlaceholder('Escolha uma entidade relacionada...').click();
  await page.getByPlaceholder('Escolha uma entidade relacionada...').fill('Linhas da Ordem');
  await page.getByPlaceholder('Escolha uma entidade relacionada...').press('Tab');
  await page.getByText('Contém dados').click();
  await page.getByText('Não contém dados').click();
  await page.getByLabel('Aplicar os filtros avançados atuais').click();
 
  // Filtra contratos que tenham o nome Automacao
  await page.getByText('Nome').click();
  await page.getByLabel('Filtrar por', { exact: true }).click();
  await page.getByLabel('Filter by value').click();
  await page.getByLabel('Filter by value').fill('Automacao');
  await page.getByRole('button', { name: 'Aplicar' }).click();

  // Filtra os contratos ativos
  await page.getByText('Razão do Status do Contrato').nth(1).click();
  await page.getByLabel('Filtrar por', { exact: true }).click();
  await page.getByText('Igual a').click();
  await page.getByRole('option', { name: 'Contém', exact: true }).click();
  await page.getByLabel('Filter by value').click();
  await page.getByLabel('Filter by value').fill('Ativo');
  await page.getByRole('button', { name: 'Aplicar' }).click();
  
  // Seleciona o primeiro da lista e clica em editar
  await page.getByRole('gridcell', { name: 'Selecionar linha 2' }).click();
  await page.getByLabel('Editar', { exact: true }).click();

  // Entra na aba de projetos de adiciona um novo projeto ao contrato
  await page.getByLabel('Projeto(s)').click();
  await page.getByLabel('Adicionar Nova Linha de Contrato. Adicionar uma linha de contrato relacionada a este registro.').click();
  await page.waitForTimeout(6000);
  await page.getByLabel('Projeto, Pesquisa', { exact: true }).click();
  await page.getByLabel('Pesquisar registros para o campo Projeto, Pesquisa').click();
  await page.waitForTimeout(2000);
  await page.getByLabel('Novo Projeto').click();
  await page.waitForTimeout(5000);
  await expect(page.getByRole('textbox', { name: 'Nome' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Nome' }).click();
  await page.getByRole('textbox', { name: 'Nome' }).fill('Projeto Teste ' + RandomNumber);
  await page.getByLabel('Modelo de horas de Trabalho, Pesquisa', { exact: true }).click();
  await page.getByPlaceholder('Procurar Modelo de Calendário de Trabalho').fill('*padrao');
  await page.getByLabel('Modelo de Trabalho Padrão, 29/09/2017 15:32').click();
  await page.getByRole('button', { name: 'Salvar e Fechar', exact: true }).click();
  await page.getByLabel('Custo de Despesa Orçada').click();
  await page.getByLabel('Custo de Despesa Orçada').fill('0');
  await page.getByLabel('Custo de Horas Orçado').click();
  await page.getByLabel('Custo de Horas Orçado', { exact: true }).fill('8181,82');
  await page.getByLabel('Salvar e Fechar').click();
  
  // Entra novamente no projeto criado preenche os campos obrigatórios que faltam e salva
  await expect(page.getByLabel('Linhas de Contrato do Projeto')).toBeVisible({timeout: 180000});
  await page.getByText('Projetos', { exact: true }).click();
  await expect(page.getByTitle('Data de Emissão do Projeto').nth(1)).toBeVisible();
  await page.getByTitle('Data de Emissão do Projeto').nth(1).click();
  await page.getByLabel('Classificar do Mais Recente para o Mais Antigo').click();
  await page.getByLabel('Atualizar').click();
  await page.getByRole('gridcell', { name: 'Selecionar linha 2' }).click();
  await page.getByLabel('Editar', { exact: true }).click();
  await page.waitForTimeout(10000);
  await page.getByLabel('Contato, Pesquisa', { exact: true }).click();
  await page.getByLabel('Contato, Pesquisa', { exact: true }).fill('Teste novo Teste');
  await page.getByLabel('Teste novo Teste Teste novo Teste, testenovoteste@totvs.com.br').click();
  await page.getByLabel('Local de Atendimento Padrão, Pesquisa', { exact: true }).click();
  await page.getByPlaceholder('Procurar Local de Atendimento Padrão').fill('999');
  await page.getByLabel('999 - Atendimento Interno, Atendimento Interno').click();
  await page.getByLabel('Salvar e Fechar').click();
  
});