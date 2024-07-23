// Scenario: Cadastrar uma nova promoção com sucesso
//         Given que estou logado como "nrc2@cin.ufpe.br", com senha "nia12345"
//         Given que estou na página "Cadastro de Promoção"
//         When preencher os campos name "Promoção de Inverno", discount "50", start_date "01/06/2021", end_date "01/07/2021", product_id "VBKF2rjOJsjRQOkJGo4a"
//         And seleciono a opção "Cadastrar Promoção"
//         Then eu devo ver uma mensagem de confirmação "Promoção cadastrada com sucesso"

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('que estou logado como {string}, com senha {string}', (email: string, password: string) => {
    cy.visit('/sign-in');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  });

Given('que estou na página {string}', (page: string) => {
    cy.visit(`/admin/promotions/create`);
    })

When('preencher os campos name {string}, discount {string}, start_date {string}, end_date {string}, product_id {string}', (name: string, discount: string, start_date: string, end_date: string, product_id: string) => {
    cy.get('input[name="name"]').type(name);
    cy.get('input[name="discount"]').type(discount);
    // Abrir o dropdown e selecionar a opção correta
  cy.get('[data-cy="product_id"]').click(); // Abre o dropdown
  cy.get('li').contains(product_id).click(); //
     //Seleciona a opção correta pelo valor
    cy.get('input[name="start_date"]').type(start_date);
    cy.get('input[name="end_date"]').type(end_date);
  });

When('seleciono a opção {string}', (button: string) => {
    cy.get('button').contains(button).click();
  });

Then('eu devo ver uma mensagem de confirmação {string}', (message: string) => {
    cy.log(message);
  });

//   Scenario: Cadastrar uma nova promoção com campos não preenchidos
//         Given que eu sou logado como ""nrc2@cin.ufpe.br", com senha "nia12345"
//         Given que estou na página de criar "Promoção"
//         When preencher os campos name "", discount "50", start_date "01/06/2021", end_date "01/07/2021", product_id "Camisa Roxa"
//         And seleciono a opção "Cadastrar"
//         Then eu devo ver uma mensagem de erro "required"
Given('qque eu sou logado como {string}, com senha {string}', (email: string, password: string) => {
    cy.visit('/sign-in');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  });
  Given('que estou na página de criaaaaarr {string}', (page: string) => {
    cy.visit(`/admin/promotions/create`);
    })
    When('preenchO os campos name {string}, discount {string}, start_date {string}, end_date {string}, product_id {string}', (name: string, discount: string, start_date: string, end_date: string, product_id: string) => {
        cy.get('input[name="name"]').clear;
        cy.get('input[name="discount"]').type(discount);
        // Abrir o dropdown e selecionar a opção correta
      cy.get('[data-cy="product_id"]').click(); // Abre o dropdown
      cy.get('li').contains(product_id).click(); //
         //Seleciona a opção correta pelo valor
        cy.get('input[name="start_date"]').type(start_date);
        cy.get('input[name="end_date"]').type(end_date);
      });
        When('seleciona-se a opção {string}', (button: string) => {
            cy.get('button').contains(button).click();
        });
        Then('eu devo ver uma mensagem de ERRO {string}', (message: string) => {
            cy.log(message);
        });



//   Scenario: Editar uma promoção com campos preenchidos
//         Given que estou logado como "nrc2@cin.ufpe.br", com senha "nia12345"
//         And que estou na página "Promoção"
//         And que eu tenho uma promoção cadastrada
//         When clicar na opção "EDITAR PROMOÇÃO" da promoção do produto "Camisa Roxa"
//         And alterar os campos {
//             "name": "Promoção de Verão",
//             "discount": "60",
//             "start_date": "01/06/2021",
//             "end_date": "01/07/2021",
//             "product_id": "Camisa Roxa"
//         }
//         And seleciono a opção "Salvar Promoção"
//         Then eu devo ver uma mensagem de confirmação "Promoção salva com sucesso!"

Given('que estou logada como {string}, com senha {string}', (email: string, password: string) => {
    cy.visit('/sign-in');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
  
  Given('que estou naaaa páginaaaaaa "Promoção"', () => {
    cy.visit('/admin/promotions');
  });
  
//   Scenario: Editar uma promoção com campos preenchidos
//   Given que estou logada como "nrc2@cin.ufpe.br", com senha "nia12345"
//   And que estou naaaa páginaaaaaa "Promoção"
//   And que eu tenho uma promoção cadastrada
//   When clicar na opção "editar" da promoção do produto "Camisa Roxa"
//   When preencher os camposs name "Promoção de Inverno", discount "60", start_date "01/06/2021", end_date "01/07/2021", product_id "Camisa Preta"
//   And seleciono a opção "Atualizar"
//   Then eu devo ver um mensagem de confirmação "Promoção salva com sucesso!"

Given('que eu tenho uma promoção cadastrada', () => {
    cy.get('[data-cy="edit-promotion"]').should('exist');
  });
  
  When('clicar na opção "editar" da promoção do produto {string}', (productName: string) => {
    cy.contains(productName)
      .parents('.MuiCard-root')
      .within(() => {
        cy.get('button[data-cy="edit-promotion"]').click();
      });
  });
  
  When('preencher os camposs name {string}, discount {string}, start_date {string}, end_date {string}, product_id {string}', (name: string, discount: string, start_date: string, end_date: string, product_id: string) => {
    cy.get('input[data-cy="name-input"]').clear().type(name);
    cy.get('input[data-cy="discount-input"]').clear().type(discount);
    // Abrir o dropdown e selecionar a opção correta
    cy.get('[data-cy="product_id"]').click(); // Abre o dropdown
    cy.get('li').contains(product_id).click(); // Seleciona a opção correta pelo valor
    cy.get('input[data-cy="start-date-input"]').clear().type(start_date);
    cy.get('input[data-cy="end-date-input"]').clear().type(end_date);
  });
  
  When('seleciono a opção "Salvar Promoção"', () => {
    cy.get('button[data-cy="save-promotion"]').click();
  });
  
  Then('eu devo ver um mensagem de confirmação {string}', (message: string) => {
    cy.contains(message).should('be.visible');
  });