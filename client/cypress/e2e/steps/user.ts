import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('o usuário está na página de "Cadastro do Usuário" e insere os dados nome {string}, e-mail {string}, telefone {string}, endereço {string} e senha {string}', (name: string, email: string, phone: string, address: string, password: string) => {
  cy.visit('/sign-up');
  cy.get('input[name="name"]').type(name);
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="phone"]').type(phone);
  cy.get('input[name="address"]').type(address);
  cy.get('input[name="password"]').type(password);
});

When('ele aperta o botão1 "Cadastrar"', () => {
  cy.get('button').contains("Cadastrar").click();
});

Then('ele pode ver a mensagem de confirmação de cadastro {string}', (message: string) => {
  cy.get('.MuiAlert-message', { timeout: 10000 }).should('contain', message);
});

Given('o usuário está na página de "Login do Usuário" e insere os dados e-mail {string} e senha {string}', (email: string, password: string) => {
  cy.visit('/sign-in');
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
});

When('ele aperta o botão2 "Login"', () => {
  cy.get('button').contains("Login").click();
});

Then('ele pode ver a mensagem de confirmação de login {string}', (message: string) => {
  cy.get('.MuiAlert-message', { timeout: 10000 }).should('contain', message);
});

Given('o usuário está logado1 com os dados e-mail {string} e senha {string}', (email: string, password: string) => {
  cy.visit('/sign-in');
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.url().should('eq', Cypress.config().baseUrl + '/');
});

When('ele aperta o ícone1 "AccountCircleIcon"', () => {
  cy.get('button[aria-label="account"]').click();
});

When('ele aperta o botão3 "Logout"', () => {
  cy.contains("Logout").click();
});

Then('ele pode ver a mensagem de confirmação de logout {string}', (message: string) => {
  cy.get('.MuiAlert-message', { timeout: 10000 }).should('contain', message);
});
