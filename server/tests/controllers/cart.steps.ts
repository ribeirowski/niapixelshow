import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import expect from 'expect'
import { firestoreDB } from '../../src/services/firebaseAdmin';
import { Stats } from 'fs';

const feature = loadFeature('tests/features/cart.feature');

defineFeature(feature, (test)=>{
    let request = supertest(app)
    let response: supertest.Response;

    test('Adicionar um produto ao carrinho vazio', ({given, when, then, and}) => {
        given('o banco de dados esta vazio' , async () => {});
        when(/^o produto com item_id "(.)", nome "(.)", descrição "(.)", preço "(.)", status "(.)", categoria "(.)", quantidade "(.)" e tamanho "(.)" é adicionado ao carrinho pelo user de user_id "(.)"$/, async (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) => {
            const orderData = {
                item_id: arg0,
                name: arg1,
                description: arg2,
                price: parseInt(arg3),
                status: true,
                category: arg5,
                quantity: arg6,
                size: arg7
            }
            response = await request.post(`/cart/${arg8}`).send(orderData);
            console.log(response.body)
        })
        then(/^'o banco de dados cria um novo carrinho com user_id "(.)" e o produto de item_id "(.)"$/, async (arg0,arg1) => {
            expect(response.body[arg0].items[0].item_id).toBe(arg1);
        })
        and('o preço total do carrinho de user_id "5" é atualizado para o valor do produto de item_id "1"', async () => {
            const price_item = response.body[5].items[0].price * response.body[5].items[0].quantity;
            expect(response.body[5].price).toBe(price_item);
    });
    })
})
