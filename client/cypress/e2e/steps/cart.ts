import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('o cliente de login {string} e senha {string} está logado na loja', (username, password) => {
  // Visita a página de login e faz o login
  cy.visit('/sign-in');
});
