import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('o cliente de login {string} e senha {string} está logado na loja', (username : string, password : string) => {
  // Visita a página de login e faz o login
  cy.visit('/sign-in');
  cy.get('input[name="email"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.url().should('eq', Cypress.config().baseUrl + '/');
});

Given ('está na página de "produtos"', (product : string) => {
  cy.url().should('eq', Cypress.config().baseUrl + '/');
});

When ('o cliente tenta adicionar uma {string} de tamanho {string} e quantidade {string} ao carrinho', (product : string, size : string, quantity :string) => {
  cy.get('[data-cy="product-card-'+product+'"]').first().click()
  cy.get('[data-cy="quantity-input"]').clear().type(`${quantity}`);
  cy.get('[data-cy="size-select"]').click();
  cy.contains('li', size).click();
  cy.get('[data-cy="addCart"]').click();
});

Then ('ele vê uma mensagem de confirmação de adição do produto', () => {
 cy.get('[data-cy="snackbar"]').should('be.visible');
});


