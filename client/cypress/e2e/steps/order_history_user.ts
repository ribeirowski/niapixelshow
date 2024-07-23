import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let mail: string;

Given('eu estou logado com email {string} e senha {string}', ( email: string, password: string ) => {
    cy.visit('/sign-in');
    cy.get('input[name="email"]').type(email);
    mail = email;
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
});

Given('eu fiz o pedido do produto {string} de tamanho {string} e quantidade {string}', (product: string, size: string, quantity: string) => {
    cy.get('[data-cy="product-card-'+product+'"]').first().click({force: true})
    cy.get('[data-cy="quantity-input"]').clear().type(`${quantity}`);
    cy.get('[data-cy="size-select"]').click();
    cy.contains('li', size).click();
    cy.get('[data-cy="addCart"]').click();
    cy.get('button[name="Fechar"]').click();
    cy.get('button[aria-label="cart"]').click();
    cy.get('button[name="finalizar_pedido"]').click();
    cy.get('button').contains('Voltar').click();
});

Given('não tenho pedidos cadastrados',() => {})

Given('estou na página {string}',(page: string) => {
    if(page === 'Detalhamento de Pedido'){
        cy.url().should('include', `/orders/detailment`);
        cy.get('h1').should('contain.text', page);
    }
    else{
        cy.get('button[aria-label="account"]').click();
        cy.contains('li', page).click();
        cy.url().should('eq', Cypress.config().baseUrl + '/orders/user/' + mail);
    }
})

When('eu seleciono a opção de ir para a página {string}', (page: string) => {
    cy.get('button[aria-label="account"]').click();
    cy.contains('li', page).click();
    cy.url().should('eq', Cypress.config().baseUrl + '/orders/user/' + mail);
});

When('eu seleciono a opção de filtrar por {string} {string} {string}', (filt: string, func: string, val: string) => {
    cy.get('[data-cy="atribute"]').click();
    cy.get(`#${filt}`).click({force: true});

    cy.get('[data-cy="func"]').click();
    cy.get(`#${func}`).click({force: true});

    if(filt === 'name' || filt === 'date' || filt === 'price'){
        cy.get('[data-cy="value"]').type(val);
    }
    else{
        cy.get('[data-cy="value"]').click();
        cy.contains(val).click({force: true});
    }
    
    cy.get('button').contains('Filtrar').click();
    
});

When('eu seleciono a opção de detalhar o pedido com item {string}, descrição {string}, preço {string} reais, status {string}', (item: string, desc: string, price: string, status: string) => {
    cy.get('table tbody tr').each(($row) => {
        cy.wrap($row).within(() => {
          cy.get('td').then(($cells) => {
            const cellsText = $cells.map((index, cell) => Cypress.$(cell).text()).get();
            if (
              cellsText.includes(item) &&
              cellsText.includes(desc) &&
              cellsText.includes(price) &&
              cellsText.includes(status)
            ) {
              cy.wrap($row).find('button').contains('Detalhar').click();
            }
          });
        });
      });
});

Then('eu posso ver na tabela de pedidos o pedido com item {string}, descrição {string}, preço {string} reais, status {string}', (item: string, desc: string, price: string, status: string) => {
    cy.get('table').should('be.visible');
    cy.get('table tbody tr').each(($row) => {
        cy.wrap($row).within(() => {
            cy.get('td').then(($cells) => {
            const cellsText = $cells.map((index, cell) => Cypress.$(cell).text().trim()).get();

            if (
                cellsText[0] === item &&
                cellsText[1] === desc &&
                cellsText[2] === price &&
                cellsText[3] === status
            ) {
                cy.wrap($cells).eq(0).should('have.text', item);
                cy.wrap($cells).eq(1).should('have.text', desc);
                cy.wrap($cells).eq(2).should('have.text', price);
                cy.wrap($cells).eq(3).should('have.text', status);
                }
            });
        });
    });
});

Then('eu vejo uma mensagem de aviso que {string}', (msg:string) => {
    cy.contains('Nenhum pedido encontrado').should('be.visible');
})