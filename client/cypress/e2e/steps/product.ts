import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('que estou logado como {string}, com senha {string}', (username, password) => {
  cy.visit('/sign-in');
  if(typeof username == 'string')
  cy.get('input[name="email"]').type(username);
  if(typeof password == 'string')
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});


When('eu acessar a página {string}', (page) => {
  cy.visit('/product/create');
});

When('preencher os campos nome {string}, descrição {string}, preço {string}, status {string} e categoria {string}', (name: string, description: string, price: string, status: string, category: string) => {
  cy.get('input[name="name"]').type(name);
  cy.get('input[name="description"]').type(description);
  cy.get('input[name="price"]').type(price);
  cy.get('input[name="category.name"]').type(category);
  cy.get('input[name="category.description"]').type(`${category} description`);
  cy.get('div[id="mui-component-select-status"]').click();
  if(status === "Sim")
  cy.get('option[data-value="true"]').click()
  else 
  cy.get('option[data-value="false"]').click()
});

When('seleciono a opção {string}', (option: string) => {
    cy.get('button').contains(option).click();
  });

Then('eu devo ver uma mensagem de confirmação {string}', (message) => {
  cy.get('.MuiAlert-message').should('contain', message);
});

Then('o novo produto com nome {string}, descrição {string}, preço {string}, status {string} e categoria {string} deve aparecer na lista de produtos cadastrados', (name, description, price, status, category) => {
  cy.visit('/product'); // Ajustar a URL se necessário
  cy.contains(name).should('be.visible');
  cy.contains(description).should('be.visible');
  cy.contains(price).should('be.visible');
  cy.contains(status === 'Sim' ? 'true' : 'false').should('be.visible');
  cy.contains(category).should('be.visible');
});
