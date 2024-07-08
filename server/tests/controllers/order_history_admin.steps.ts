import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import expect from 'expect';
import { firestoreDB, adminAuth } from '../../src/services/firebase/firebaseAdmin';
import { string } from 'zod';

const feature = loadFeature('tests/features/order_history_admin.feature');

defineFeature(feature, (test) => {
    let request = supertest(app);
    let response: supertest.Response;
    let token: string;
    jest.setTimeout(15000);

    afterEach(async () => {
        const orders = await firestoreDB.collection('orders').get();
        const batch = firestoreDB.batch();
        orders.forEach(doc => batch.delete(doc.ref));
        await batch.commit();
    });

    test('Acesso ao histórico de pedidos com pedidos cadastrados', ({ given, and, when, then }) => {
        given(/^eu estou autenticado como administrador com email "(.*)" e senha "(.*)" e tenho um token JWT válido$/, async (email, password) => {
            const user = {
                email: email,
                password: password,
                is_admin: true
            };
            response = await request.post('/auth/login').send(user);
            token = response.headers['set-cookie'][0];
        });

        and(/^eu tenho o pedido com email do cliente "(.*)", item "(.*)" com descrição "(.*)", quantidade "(.*)", preço "(.*)" reais, status "(.*)", criado em "(.*)", para o endereço "(.*)" cadastrado$/, async (email, item, description, quantity, price, status, createdAt, address) => {
            const order = {
                email: email,
                item: item,
                description: description,
                qtd: parseInt(quantity),
                price: parseFloat(price.replace(',', '.')),
                status: status,
                date: createdAt,
                addr: address
            };
            response = await request.post('/order').send(order);
        });

        and(/^eu tenho o pedido com email do cliente "(.*)", item "(.*)" com descrição "(.*)", quantidade "(.*)", preço "(.*)" reais, status "(.*)", criado em "(.*)", para o endereço "(.*)" cadastrado$/, async (email, item, description, quantity, price, status, createdAt, address) => {
            const order = {
                email: email,
                item: item,
                description: description,
                qtd: parseInt(quantity),
                price: parseFloat(price.replace(',', '.')),
                status: status,
                date: createdAt,
                addr: address
            };
            response = await request.post('/order').send(order);
        });

        when('eu acesso a página "Histórico de Pedidos" do fornecedor', async () => {
            response = await request.get('/order/all').set('Cookie', token);
        });

        then(/^é retornado o pedido com email do cliente "(.*)", item "(.*)" com descrição "(.*)", quantidade "(.*)", preço "(.*)" reais, status "(.*)", criado em "(.*)", para o endereço "(.*)" cadastrado$/, (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) => {
            const orderData = {
                email: arg0,
                item: arg1,
                description: arg2,
                qtd: parseInt(arg3),
                price: parseFloat(arg4),
                status: arg5,
                date: arg6,
                addr: arg7
            };
            const existe = response.body.some((order:any) => order.email === orderData.email 
                && order.item === orderData.item 
                && order.description === orderData.description 
                && order.qtd === orderData.qtd
                && order.price === orderData.price
                && order.status === orderData.status
                && order.date === orderData.date
                && order.addr === orderData.addr);
            
            expect(existe).toBe(true);
        });

        and(/^é retornado o pedido com email do cliente "(.*)", item "(.*)" com descrição "(.*)", quantidade "(.*)", preço "(.*)" reais, status "(.*)", criado em "(.*)", para o endereço "(.*)" cadastrado$/, (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) => {
            const orderData = {
                email: arg0,
                item: arg1,
                description: arg2,
                qtd: parseInt(arg3),
                price: parseFloat(arg4),
                status: arg5,
                date: arg6,
                addr: arg7
            };
            const existe = response.body.some((order:any) => order.email === orderData.email 
                && order.item === orderData.item 
                && order.description === orderData.description 
                && order.qtd === orderData.qtd
                && order.price === orderData.price
                && order.status === orderData.status
                && order.date === orderData.date
                && order.addr === orderData.addr);
            
            expect(existe).toBe(true);
        });
    });

    test('Acesso ao histórico de pedidos sem pedidos cadastrados', ({ given, and, when, then }) => {
        given(/^eu estou autenticado como administrador com email "(.*)" e senha "(.*)" e tenho um token JWT válido$/, async (email, password) => {
            const user = {
                email: email,
                password: password,
                is_admin: true
            };
            response = await request.post('/auth/login').send(user);
            token = response.headers['set-cookie'][0];
        });

        and('não há pedidos cadastrados no sistema', async () => {
            const ordersSnapshot = await firestoreDB.collection('orders').get();
            const batch = firestoreDB.batch();
            ordersSnapshot.forEach(doc => batch.delete(doc.ref));
            await batch.commit();
        });

        when('eu acesso a página "Histórico de Pedidos" do fornecedor', async () => {
            response = await request.get('/order/all').set('Cookie', token);
        });

        then('o sistema retorna uma mensagem indicando que não há pedidos cadastrados', () => {
            expect(response.status).toBe(426);
        });
    });
    

    test('Filtro de histórico de pedidos com pedidos cadastrados em um período específico', ({ given, and, when, then }) => {
        given(/^eu estou autenticado como administrador com email "(.*)" e senha "(.*)" e tenho um token JWT válido$/, async (email, password) => {
            const user = {
                email: email,
                password: password,
                is_admin: true
            };
            response = await request.post('/auth/login').send(user);
            token = response.headers['set-cookie'][0];
        });

        and(/^eu tenho o pedido com email do cliente "(.*)", item "(.*)" com descrição "(.*)", quantidade "(.*)", preço "(.*)" reais, status "(.*)", criado em "(.*)", para o endereço "(.*)" cadastrado$/, async (email, item, description, quantity, price, status, createdAt, address) => {
            const order = {
                email: email,
                item: item,
                description: description,
                qtd: parseInt(quantity),
                price: parseFloat(price.replace(',', '.')),
                status: status,
                date: createdAt,
                addr: address
            };
            response = await request.post('/order').send(order);
        });

        and(/^eu tenho o pedido com email do cliente "(.*)", item "(.*)" com descrição "(.*)", quantidade "(.*)", preço "(.*)" reais, status "(.*)", criado em "(.*)", para o endereço "(.*)" cadastrado$/, async (email, item, description, quantity, price, status, createdAt, address) => {
            const order = {
                email: email,
                item: item,
                description: description,
                qtd: parseInt(quantity),
                price: parseFloat(price.replace(',', '.')),
                status: status,
                date: createdAt,
                addr: address
            };
            response = await request.post('/order').send(order);
        });

        when(/^eu acesso a página "(.*)" do fornecedor$/, async (page) => {
            response = await request.get('/order/all').set('Cookie', token);
        });

        and(/^eu filtro os pedidos com data inicial "(.*)" e data final "(.*)"$/, async (startDate, endDate) => {
            response = await request.get(`/order/filterByDate?startDate=${startDate}&endDate=${endDate}`).set('Cookie', token).send();
        });

        then(/^é retornado o pedido com email do cliente "(.*)", item "(.*)" com descrição "(.*)", quantidade "(.*)", preço "(.*)" reais, status "(.*)", criado em "(.*)", para o endereço "(.*)" cadastrado$/, (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) => {
            const orderData = {
                email: arg0,
                item: arg1,
                description: arg2,
                qtd: parseInt(arg3),
                price: parseFloat(arg4),
                status: arg5,
                date: arg6,
                addr: arg7
            };
            const existe = response.body.some((order:any) => order.email === orderData.email 
                && order.item === orderData.item 
                && order.description === orderData.description 
                && order.qtd === orderData.qtd
                && order.price === orderData.price
                && order.status === orderData.status
                && order.date === orderData.date
                && order.addr === orderData.addr);
            
            expect(existe).toBe(true);
        });

        and(/^é retornado o pedido com email do cliente "(.*)", item "(.*)" com descrição "(.*)", quantidade "(.*)", preço "(.*)" reais, status "(.*)", criado em "(.*)", para o endereço "(.*)" cadastrado$/, (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) => {
            const orderData = {
                email: arg0,
                item: arg1,
                description: arg2,
                qtd: parseInt(arg3),
                price: parseFloat(arg4),
                status: arg5,
                date: arg6,
                addr: arg7
            };
            const existe = response.body.some((order:any) => order.email === orderData.email 
                && order.item === orderData.item 
                && order.description === orderData.description 
                && order.qtd === orderData.qtd
                && order.price === orderData.price
                && order.status === orderData.status
                && order.date === orderData.date
                && order.addr === orderData.addr);
            
            expect(existe).toBe(true);
        });
    });

    test('Exportação de histórico de pedidos com pedidos cadastrados', ({ given, and, when, then }) => {
        given(/^eu estou autenticado como administrador com email "(.*)" e senha "(.*)" e tenho um token JWT válido$/, async (email, password) => {
            const user = {
                email: email,
                password: password,
                is_admin: true
            };
            response = await request.post('/auth/login').send(user);
            token = response.headers['set-cookie'][0];
        });

        and(/^eu tenho o pedido com email do cliente "(.*)", item "(.*)" com descrição "(.*)", quantidade "(.*)", preço "(.*)" reais, status "(.*)", criado em "(.*)", para o endereço "(.*)" cadastrado$/, async (email, item, description, quantity, price, status, createdAt, address) => {
            const order = {
                email: email,
                item: item,
                description: description,
                qtd: parseInt(quantity),
                price: parseFloat(price.replace(',', '.')),
                status: status,
                date: createdAt,
                addr: address
            };
            response = await request.post('/order').send(order);
        });

        and(/^eu tenho o pedido com email do cliente "(.*)", item "(.*)" com descrição "(.*)", quantidade "(.*)", preço "(.*)" reais, status "(.*)", criado em "(.*)", para o endereço "(.*)" cadastrado$/, async (email, item, description, quantity, price, status, createdAt, address) => {
            const order = {
                email: email,
                item: item,
                description: description,
                qtd: parseInt(quantity),
                price: parseFloat(price.replace(',', '.')),
                status: status,
                date: createdAt,
                addr: address
            };
            response = await request.post('/order').send(order);
        });

        when(/^eu acesso a página "(.*)" do fornecedor$/, async (page) => {
            response = await request.get('/order/all').set('Cookie', token);
        });

        and(/^eu seleciono a opção de exportar o histórico de pedidos$/, async () => {
            response = await request.get('/order/export').set('Cookie', token).send();
        });

        then(/^eu recebo um arquivo de exportação contendo os pedidos$/, () => {
            expect(response.status).toBe(200);
            expect(response.header['content-type']).toContain('text/csv; charset=utf-8');
            expect(response.body).toBeDefined();
        });
    });
});
