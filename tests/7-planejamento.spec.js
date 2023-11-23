import { test, expect } from '@playwright/test';

const url = process.env.URL;
const userName = process.env.USER_CP;
const password = process.env.PASSWORD_CP;


test('Planejamento', async ({ page }) => {
  
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
  await page.getByLabel('PSA - PMO Administrativo').click();
  await page.frameLocator('iframe[title="AppLandingPage"]').getByLabel('PSA - Planejamento de Projeto\r\nPerfil destinado à aqueles que terão sob sua responsabilidade o planejamento, o monitoramento e a gestão do projeto, este perfil pode ser cedido a Analista, Coordenador e Gerente.\r\nPublicado(a) por undefined.\r\nInterface Unificada.\r\n1 de 2').click();
  
  // Filtra por projetos que comecem com "Projeto Teste" e que estejam em Rascunho
  await page.getByText('Projetos', { exact: true }).click();
  await page.getByText('Nome').nth(1).click();
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
  await page.getByLabel('Editar', { exact: true }).click();
  await page.waitForTimeout(5000);
  
  // Entra na WBS criar duas tarefas e coloca a primeira como "Pai" da primeira
  await page.getByRole('tab', { name: 'WBS (Agenda)' }).click();
  await page.frameLocator('internal:role=region[name="Agenda"i] >> iframe').locator('#cell_new_subject span').click();
  await page.frameLocator('internal:role=region[name="Agenda"i] >> iframe').getByRole('button', { name: 'Adicionar' }).click();
  await page.frameLocator('internal:role=region[name="Agenda"i] >> iframe').locator('#cell_new_subject span').click();
  await page.frameLocator('internal:role=region[name="Agenda"i] >> iframe').getByRole('button', { name: 'Adicionar' }).click();
  await page.frameLocator('internal:role=region[name="Agenda"i] >> iframe').locator('#cell_new_subject span').click();
  await page.frameLocator('internal:role=region[name="Agenda"i] >> iframe').getByText('Tarefa 2').click();
  await page.frameLocator('internal:role=region[name="Agenda"i] >> iframe').getByRole('button', { name: 'Recuar', exact: true }).click();
  
  // Entra em tarefas do projeto e define a primeira como marco de entrega
  await page.getByLabel('Mais Guias').locator('span').first().click();
  await page.getByLabel('Reconciliação de Recursos').press('End');
  await page.getByText('Tarefas do Projeto').click();
  await page.getByLabel('Atualizar').click();
  await page.getByRole('button', { name: 'Exibição Associada de Tarefas do Projeto' }).click();
  await page.getByText('Todas as Tarefas do Projeto').click();
  await page.getByRole('gridcell', { name: 'Selecionar linha 2' }).click();
  await page.getByLabel('Editar').click();
  await page.getByLabel('Formalização dos Marcos de Entrega').click();
  await page.getByLabel('Marco de Entrega', { exact: true }).selectOption('1');
  await page.getByLabel('Tipo de aprovação').selectOption('961600001');
  await page.getByLabel('Salvar e Fechar').click();
  
  // Volta para a capa do projeto e cadastra todos os papeis dos recursos no projeto
  await page.getByRole('tab', { name: 'Dados do Projeto' }).click();
  await page.getByLabel('Modelo de Cronograma, Pesquisa', { exact: true }).click();
  await page.mouse.wheel(0, 2500);

  await page.getByLabel('Novo Responsável pela Reserva de Recurso. Adicionar Nova Responsável pela Reserva de Recurso').click();
  await page.getByLabel('Responsável, Pesquisa', { exact: true }).click();
  await page.getByPlaceholder('Procurar Responsável').fill('CP Teste');
  await page.getByLabel('CP TESTE, TOTVS BRASIL / TOTVS MATRIZ').click();
  await page.getByLabel('Salvar e Fechar').click();

  await page.getByLabel('Modelo de Cronograma, Pesquisa', { exact: true }).click();
  await page.mouse.wheel(0, 2500);

  await page.getByLabel('Novo Papel do Recurso no Projeto. Adicionar Nova Papel do Recurso no Projeto').click();
  await page.getByLabel('Recurso, Pesquisa', { exact: true }).click();
  await page.getByPlaceholder('Procurar Recurso').fill('CP Teste');
  await page.getByLabel('CP TESTE, Usuário').click();
  await page.getByLabel('Papel', { exact: true }).selectOption('2');
  await page.getByLabel('Salvar e Fechar Opções').click();
  await page.locator('button').filter({ hasText: 'Salvar e Criar Novo' }).click();

  await page.getByLabel('Recurso, Pesquisa', { exact: true }).click();
  await page.getByPlaceholder('Procurar Recurso').fill('GPP Teste');
  await page.getByLabel('GPP TESTE, Usuário').click();
  await page.getByLabel('Papel', { exact: true }).selectOption('7');
  await page.getByLabel('Salvar e Fechar Opções').click();
  await page.locator('button').filter({ hasText: 'Salvar e Criar Novo' }).click();

  await page.getByLabel('Recurso, Pesquisa', { exact: true }).click();
  await page.getByPlaceholder('Procurar Recurso').fill('Head Teste');
  await page.getByLabel('HEAD TESTE, Usuário').click();
  await page.getByLabel('Papel', { exact: true }).selectOption('5');
  await page.getByRole('button', { name: 'Salvar e Fechar', exact: true }).click();
  await page.waitForTimeout(3000);

  // Por fim clica em Planejar e confirma
  page.on('dialog', async dialog=>{
    await dialog.accept();
  })

  await page.getByLabel('Planejar').click();

  await page.waitForTimeout(5000);
  await page.keyboard.press('F5');
  await expect(page.getByText('Em Planejamento')).toBeVisible({timeout: 10000});

});