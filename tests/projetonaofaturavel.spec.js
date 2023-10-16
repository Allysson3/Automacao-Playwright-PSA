import { test, expect } from '@playwright/test';

const url = process.env.URL;
const userName = process.env.USER;
const password = process.env.PASSWORD;

test('ProjetoNaoFaturavel', async ({ page }) => {
  
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

  // Entra em Contratos do Projeto e seleciona Criar um novo contrato do projeto e preenche todos os dados necessários para um projeto não faturável
  await page.getByText('Contratos do Projeto').click();
  await page.getByLabel('Criar', { exact: true }).click();
  await page.getByLabel('Nome').click();
  await page.getByLabel('Nome').fill('Automacao Contrato NF');
  await page.getByLabel('Pesquisar registros para o campo Cliente, Pesquisa').click();
  await page.getByLabel('Pesquisa avançada').click();
  await page.getByRole('searchbox', { name: 'Escolher registro para Cliente' }).click();
  await page.getByRole('searchbox', { name: 'Escolher registro para Cliente' }).fill('TEXHMP');
  await page.getByRole('searchbox', { name: 'Escolher registro para Cliente' }).press('Enter');
  await page.getByText('TEXHMP00TEXHMP00').click();
  await page.getByRole('button', { name: 'Concluído' }).click();
  
  await page.mouse.wheel(0, 600);
  
  await page.getByLabel('Tipo de Projeto', { exact: true }).selectOption('961600001');
  await page.getByRole('textbox', { name: 'Valor Total Líquido' }).click();
  await page.getByRole('textbox', { name: 'Valor Total Líquido' }).fill('1000');
  await page.getByRole('textbox', { name: 'Valor Total Líquido' }).press('Enter');
  await page.getByLabel('Pesquisar registros para o campo Tipo de Projeto Não Faturável, Pesquisa').click();
  await page.getByLabel('Desenvolvimento de Produto, 23/10/2017 15:12').click();
  await page.getByLabel('Empresa Filial, Pesquisa', { exact: true }).click();
  await page.getByPlaceholder('Procurar Empresa Filial').fill('Totvs Brasil / Totvs Matriz');
  await page.getByLabel('TOTVS BRASIL / TOTVS MATRIZ, 0000001000100').click();
  await page.getByLabel('Salvar (CTRL+S)').click();
  await page.getByLabel('Salvar (CTRL+S)').click();

  // Após salvar o contrato criado volta no menu de Contratos do Projeto, seleciona o ultimo criado e entra nele novamente
  await page.getByText('Contratos do Projeto').click();
  await page.getByText('Data de Emissão do Contrato').nth(1).click();
  await page.getByText('Classificar do Mais Recente para o Mais Antigo').click();
  await page.getByText('Automacao Contrato NF', 'Rascunho').first().click();
  
  // Confirmar contrato
  await page.getByLabel('Mais comandos para Ordem').click();
  await page.getByLabel('Confirmar').click();
  await page.getByLabel('OK').click();
  await page.getByLabel('Salvar e continuar').click();
  
  // Entra na aba de projetos para criarmos um novo
  await page.getByLabel('Projeto(s)').click();
  await page.getByLabel('Adicionar Nova Linha de Contrato. Adicionar uma linha de contrato relacionada a este registro.').click();
  await page.getByLabel('Pesquisar registros para o campo Projeto, Pesquisa').click();
  await page.getByLabel('Novo Projeto').click();
  await page.getByLabel('Modelo de horas de Trabalho, Pesquisa', { exact: true }).click();
  await page.getByPlaceholder('Procurar Modelo de Calendário de Trabalho').fill('Modelo de Trabalho Padrao');
  await page.getByLabel('Modelo de Trabalho Padrão, 29/09/2017 15:32').click();
  await page.getByRole('textbox', { name: 'Nome' }).click();
  await page.getByRole('textbox', { name: 'Nome' }).fill('Automacao Projeto NF');
  await page.getByRole('button', { name: 'Salvar e Fechar', exact: true }).click();
  await page.getByLabel('Custo de Despesa Orçada').click();
  await page.getByLabel('Custo de Despesa Orçada').fill('0');
  await page.getByLabel('Custo de Horas Orçado').click();
  await page.getByLabel('Custo de Horas Orçado', { exact: true }).fill('1000');
  await page.getByLabel('Custo de Horas Orçado', { exact: true }).press('Enter');
  await page.getByLabel('Salvar e Fechar').click();
  
  // Após criar e salvar o projeto no contrato volta ao menu de contratos do projeto
  await page.getByText('Contratos do Projeto').click();
});