import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('que estou logado como {string}, com senha {string}', (username, password) => {
  cy.visit('/sign-in');
  if(typeof username == 'string')
  cy.get('input[name="email"]').type(username);
  if(typeof password == 'string')
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

Given('que estou na página {string}', (page) => {
    cy.visit(`/${page}`);
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

Then('o novo produto com nome {string}, descrição {string}, preço {string}, status {string} e categoria {string} deve aparecer na lista de produtos cadastrados', (name:string, description:string, price:string, status:string, category:string) => {
  cy.visit('/product'); // Ajustar a URL se necessário
  cy.contains(name).should('be.visible');
  cy.contains(description).should('be.visible');
  cy.contains(price).should('be.visible');
  cy.contains(status === 'Sim' ? 'true' : 'false').should('be.visible');
  cy.contains(category).should('be.visible');
});

  Given('que eu tenho um produto cadastrado', () => {
    cy.request('/product') // Ajustar o endpoint conforme necessário
      .its('body')
      .then((products) => {
        if (products.length > 0) {
          const product = products[0]; // Pega o primeiro produto da lista
          cy.wrap(product).as('product');
        } else {
          throw new Error('Nenhum produto encontrado.');
        }
      });
  });

  When('clicar na opção {string} do produto com nome {string}', (option:string, productName:string) => {
    cy.contains(productName).parents('div[id="product-card"]').find('button').contains(option).click();
  });

    When('alterar os campos nome para {string} e preço para {string}', (name:string, price:string) =>{
            cy.get('input[name="name"]').clear().type(name);
            cy.get('input[name="price"]').clear().type(price);
    });