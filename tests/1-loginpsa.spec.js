import { test, expect } from '@playwright/test';

const url = process.env.URL;
const userName = process.env.USER_CP;
const password = process.env.PASSWORD_CP;

test('Login', async ({ page }) => {
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
});