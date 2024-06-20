import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { firestoreDBTest } from '../../src/services/firebaseAdmin';
import { Stats } from 'fs';
import { expect } from 'expect';

const feature = loadFeature('tests/features/stats.feature');

defineFeature(feature, (test)=>{
    let request = supertest(app)
    let response: supertest.Response;

    // Teste 1
    test('Requisição de Estatísticas', ({given, when, then}) => {
        given(/^o banco de dados tem pedido com qtd "(.*)", date "(.*)", item "(.*)", price "(.*)", description "(.*)", addr "(.*)", email "(.*)" e status "(.*)"$/, async (qtd, date, item, price, description, addr, email, status) => {
            const orders = await firestoreDBTest.collection('orders').get();
            const batch = firestoreDBTest.batch();
            orders.forEach(doc => batch.delete(doc.ref));
            await batch.commit();
            const orderData = {
                email: email,
                item: item,
                description: description,
                qtd: parseInt(qtd),
                price: parseFloat(price),
                status: status,
                date: date,
                addr: addr
            }
            await request.post('/order').send(orderData);
        });
        when(/^são requisitadas as estatísticas de vendas$/, async () => {
            response = await request.get('/order/stats');
        });
        then(/^o sistema retorna vendas totais "(.*)", produto mais vendido "(.*)" e tabela de produtos com produto "(.*)" com quantidade "(.*)" e valor total "(.*)"$/, async (totalValue, mostSold, productName, productAmount, productValue) => {
            const expected = {"mostSold": mostSold, "productAmount": [parseInt(productAmount)], "productName": [productName], "productValue": [parseFloat(productValue)], "totalValue": parseFloat(totalValue)};
            expect(response.body).toStrictEqual(expected);
        });
    });

    // Teste 2
    test('Requisição sem Pedidos Pagos', ({given, when, then}) => {
        given(/^o banco de dados não tem pedidos$/, async () => {
            const orders = await firestoreDBTest.collection('orders').get();
            const batch = firestoreDBTest.batch();
            orders.forEach(doc => batch.delete(doc.ref));
            await batch.commit();
        });
        when(/^são requisitadas as estatísticas de vendas$/, async () => {
            response = await request.get('/order/stats');
        });
        then(/^o sistema retorna vendas totais "(.*)", produto mais vendido "(.*)" e tabela de produtos com produto "(.*)" com quantidade "(.*)" e valor total "(.*)"$/, async (totalValue, mostSold, productName, productAmount, productValue) => {
            const expected = {"mostSold": mostSold, "productAmount": [parseInt(productAmount)], "productName": [productName], "productValue": [parseFloat(productValue)], "totalValue": parseFloat(totalValue)};
            expect(response.body).toStrictEqual(expected);
        });
    });
})