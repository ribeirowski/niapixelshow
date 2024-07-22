import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('passes', () => {
  cy.visit('https://example.cypress.io')
})
