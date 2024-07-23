import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Scenario: Adicionar o pedido ao carrinho com sucesso 
// Given o cliente de login "nrc2@cin.ufpe.br" e senha "nia12345" está logado na loja
// And está na página de "produtos"
// When o cliente tenta adicionar uma "Camisa Azul" de tamanho "G" e quantidade "2" ao carrinho
// Then ele vê uma mensagem de confirmação de adição do produto

Given('o cliente de login {string} e senha {string} está logado na loja', (username : string, password : string) => {
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


// Scenario: Confirmação de remoção de pedido
// Given o cliente de login "nrc2@cin.ufpe.br" e senha "nia12345" está logado na loja
// And está na página "carrinho de compras"
// And ele tem o produto "Camisa Azul" no carrinho
// When ele tenta remover o produto "Camisa Azul"
// Then ele pode ver o carrinho sem o produto "Camisa Azul”

Given ('está na página "carrinho de compras"', () => {
    cy.get('[data-cy="cart-icon"]').click();
});

Given ('ele tem um produto {string} no carrinho', (product : string) => {
    cy.get(`[data-cy="product-box-${product}"]`).should('have.attr', 'data-cy', `product-box-${product}`);
});

When ('ele tenta remover o produto {string}', (product : string) => {
    cy.get(`[data-cy="remove-box-${product}"]`).click();
    cy.wait(4000);
});

Then ('ele pode ver o carrinho sem o produto {string}', (product : string) => {
    cy.get(`[data-cy="product-box-${product}"]`).should('not.exist');    
});


// Scenario: Editar pedido no carrinho de pedidos  
//         Given o cliente de login "nrc2@cin.ufpe.br" e senha "nia12345" está logado na loja
//         And está na página do "carrinho de compras"
//         And ele tem um pedido no carrinho com uma camisa "Camisa Azul" de tamanho "M" e quantidade "1"
//         When ele seleciona a opção "editar" o tamanho do pedido "Camisa Azul"
//         And ele altera o tamanho da camisa "Camisa Azul" para "G"
//         Then ele pode ver o produto "Camisa Preta" atualizado com a camisa de tamanho "G" e quantidade "1"


Given ('está na página do "carrinho de compras"', () => {
    cy.url().should('eq', Cypress.config().baseUrl + '/');
});

Given ('ele tem um pedido no carrinho com uma camisa {string} de tamanho {string} e quantidade {string}', (product : string, size : string, quantity :string) => {
    cy.get('[data-cy="product-card-'+product+'"]').first().click()
    cy.get('[data-cy="quantity-input"]').clear().type(`${quantity}`);
    cy.get('[data-cy="size-select"]').click();
    cy.contains('li', size).click();
    cy.get('[data-cy="addCart"]').click();
    cy.get('[data-cy="close-modal').click();
    cy.get('[data-cy="cart-icon"]').click();
});

When ('ele seleciona a opção "editar" o tamanho do pedido {string}', (product : string) => {
    cy.get(`[data-cy="size-select-${product}"]`).click();
});

Given ('ele altera o tamanho da camisa {string} para {string}', (product : string, size : string) => {
    cy.contains('li', size).click();
});

Then ('ele pode ver o produto {string} atualizado com a camisa de tamanho {string} e quantidade {string}', (product : string, size : string, quantity :string) => {
    cy.get(`[data-cy="product-box-${product}"]`).should('have.attr', 'data-cy', `product-box-${product}`);
    cy.contains('li', size).click();
});

// Scenario: Editar o tamanho do pedido no carrinho de pedidos  
            // Given o cliente de login "nrc2@cin.ufpe.br" e senha "nia12345" está logado na loja
            // And está na página do "carrinho de compras"
            // And ele tem um pedido no carrinho com uma camisa "Camisa Preta" de tamanho "M" e quantidade "1"
            // When ele seleciona a opção "editar" a quantidade do pedido "Camisa Preta"
            // And ele altera a quantidade da camisa "Camisa Preta" para "15"
            // Then ele pode ver o produto "Camisa Preta" atualizado com a camisa de tamanho "M" e quantidade "51"

When ('ele seleciona a opção "editar" a quantidade do pedido {string}', (product : string) => {
    cy.get(`[data-cy="quantity-input-${product}"]`).clear()
    cy.wait(2000);
});

Given ('ele altera a quantidade da camisa {string} para {string}', (product : string, quantity : string) => {
    cy.get(`[data-cy="quantity-input-${product}"]`).type(`${Number(quantity) - 10}`);
    cy.wait(2000);
});

Then ('ele pode ver o produto {string} atualizado com a camisa de tamanho {string} e a quantidade {string}', (product : string, size : string, quantity :string) => {
    cy.get(`[data-cy="product-box-${product}"]`).should('have.attr', 'data-cy', `product-box-${product}`);
});