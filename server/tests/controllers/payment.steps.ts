import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { firestoreDB } from '../../src/services/firebaseAdmin';
import { Stats } from 'fs';

const feature = loadFeature('testes/features/payment.feature');

defineFeature(feature, (test)=>{
    let request = supertest(app)
    let response: supertest.Response;

    test('Marcar o pedido como pago ao confirmar pagamento', ({given, when, then, and}) => {
        given(/^o pedido com email "{.*}", item "{.*}" com descrição "{.*}", quantidade "{.*}", preço "{.*}" reais, status "{.*}", criado em "{.*}", para o endereço "{.*}" cadastrado$/, async (email, item, desc, qtd, preço, stat, data, addr) => {
            const orderData = {
                email: email,
                item: item,
                description: desc,
                qtd: qtd,
                price: preço,
                status: stat,
                date: data,
                addr: addr
            }
            response = await request.post('/order').send(orderData);
        });
        when(/^o pedido com email "{.*}", item "{.*}" com descrição "{.*}", quantidade "{.*}", preço "{.*}" reais, status "{.*}", criado em "{.*}", para o endereço "{.*}" é confirmado$/, async (email, item, desc, qtd, preço, stat, data, addr) => {
            const id = response.body.order.id;
            
        })
    });
})