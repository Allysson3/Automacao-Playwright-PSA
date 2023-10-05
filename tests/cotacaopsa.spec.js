import { test, expect } from '@playwright/test';

const url = process.env.URL;
const userName = process.env.USER;
const password = process.env.PASSWORD;

test('Cotacao Diteto no PSA', async ({ page }) => {
  
  // Abre o navegador com as proporções definidas no config
  console.log(await page.viewportSize().width)
  console.log(await page.viewportSize().height)
  
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
  
  // Seleciona Criar uma nova Cotação e preenche todos os dados necessários
  await page.getByText('Cotações', { exact: true }).click();
  await page.getByLabel('Criar', { exact: true }).click();
  await page.getByLabel('Nome').click();
  await page.getByLabel('Nome').fill('Automacao');
  await page.getByLabel('Pesquisar registros para o campo Empresa / Filial, Pesquisa').click();
  await page.getByLabel('Pesquisa avançada').click();
  await page.getByRole('searchbox', { name: 'Escolher empresa / filial para Empresa / Filial' }).click();
  await page.getByRole('searchbox', { name: 'Escolher empresa / filial para Empresa / Filial' }).fill('0000001000100');
  await page.getByRole('searchbox', { name: 'Escolher empresa / filial para Empresa / Filial' }).press('Enter');
  await page.getByLabel('0000001000100').click();
  await page.getByRole('button', { name: 'Concluído' }).click();
  await page.getByLabel('Pesquisar registros para o campo Cliente, Pesquisa').click();
  await page.getByLabel('Pesquisa avançada').click();
  await page.getByRole('searchbox', { name: 'Escolher registro para Cliente' }).click();
  await page.getByRole('searchbox', { name: 'Escolher registro para Cliente' }).fill('TEXHMP');
  await page.getByRole('searchbox', { name: 'Escolher registro para Cliente' }).press('Enter');
  await page.getByText('TEXHMP00TEXHMP00').click();
  await page.getByRole('button', { name: 'Concluído' }).click();
  await page.getByLabel('Unidade Organizacional, Pesquisa', { exact: true }).click();
  await page.getByPlaceholder('Procurar Unidade Organizacional').fill('PSA');
  await page.getByLabel('UNIDADE DE SERVICO TESTE PSA, PSA').click();
  await page.getByLabel('Método de Cobrança').selectOption('192350001');
  await page.getByLabel('Modalidade de Venda, Pesquisa', { exact: true }).click();
  await page.getByPlaceholder('Procurar Modalidade de Venda').fill('A M S');
  await page.getByLabel('A M S, 0064').click();
  await page.getByLabel('Condição de Pagamento, Pesquisa', { exact: true }).click();
  await page.getByPlaceholder('Procurar Condição de Pagamento').fill('019');
  await page.getByLabel('COND. NEGOCIADA, 019').click();
  await page.getByLabel('Tipo Faturamento').selectOption('2');
  await page.getByLabel('Tipo de Aprovação de Faturamento').selectOption('1');
  await page.getByLabel('Modelo de Tributação, Pesquisa', { exact: true }).click();
  await page.getByPlaceholder('Procurar Modelo de Tributação').fill('MOD');
  await page.getByLabel('MOD DEZ2015, 11/10/2017 18:47').click();
  await page.getByLabel('Margem Vendida').click();
  await page.getByLabel('Margem Vendida').fill('10');
  await page.getByLabel('Salvar (CTRL+S)').click();
  
  // Após salvar a cotação criada volta no menu de cotações, seleciona a ultima criada e entra nela novamente
  await page.getByText('Cotações', { exact: true }).click();
  await page.getByText('Nome').click();
  await page.getByLabel('Filtrar por', { exact: true }).click();
  await page.getByLabel('Filter by value').click();
  await page.getByLabel('Filter by value').fill('Automacao');
  await page.getByRole('button', { name: 'Aplicar' }).click();
  await page.getByText('Valor da Cotação').click();
  await page.getByLabel('Filtrar por', { exact: true }).click();
  await page.getByLabel('Filter by value').click();
  await page.getByLabel('Filter by value').fill('0');
  await page.getByRole('button', { name: 'Aplicar' }).click();
  await page.getByLabel('Atualizar').click();
  await page.waitForTimeout(2000);
  await page.getByLabel('Atualizar').click();
  await page.getByRole('gridcell', { name: 'Selecionar linha 2' }).click();
  await page.getByLabel('Editar', { exact: true }).click();
  
  // Entra em produtos da proposta para adicionar um produto a cotação
  await page.getByLabel('Produtos da Proposta').click();
  await page.getByLabel('Novo Produto da Cotação. Adicionar Nova Produto da Cotação').click();
  await page.getByLabel('Produto, Pesquisa', { exact: true }).click();
  await page.getByPlaceholder('Procurar Produto').fill('Desenvolvimento');
  await page.getByLabel('DESENVOLVIMENTO, DTSV.PRJ.TO.SV').click();
  await page.getByLabel('Horas Produto').click();
  await page.getByLabel('Horas Produto').fill('100');
  await page.getByLabel('Horas Produto').press('Enter');
  await page.getByLabel('Valor Hora Produto').click();
  await page.getByLabel('Valor Hora Produto').fill('100');
  await page.getByLabel('Valor Hora Produto').press('Enter');
  await page.getByLabel('Pesquisar registros para o campo Moeda Faturamento, Pesquisa').click();
  await page.getByLabel('Pesquisa avançada').click();
  await page.getByRole('searchbox', { name: 'Escolher moeda para Moeda Faturamento' }).click();
  await page.getByRole('searchbox', { name: 'Escolher moeda para Moeda Faturamento' }).fill('real');
  await page.getByText('BRLBRL').click();
  await page.getByRole('button', { name: 'Concluído' }).click();
  await page.getByLabel('Qtde de Horas à Faturar').click();
  await page.getByLabel('Qtde de Horas à Faturar').fill('100');
  await page.getByLabel('Qtde de Horas à Faturar').press('Enter');
  await page.getByLabel('Valor Hora à Faturar').click();
  await page.getByLabel('Valor Hora à Faturar').fill('100');
  await page.getByLabel('Valor Hora à Faturar').press('Enter');
  await page.getByRole('button', { name: 'Salvar e Fechar', exact: true }).click();
  
  // Após adicionar o produto e salvar, volta ao menu de cotações novamente
  await page.getByLabel('Cotações').locator('div').nth(3).click();
});
