import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { firestoreDB } from '../../src/services/firebaseAdmin';
import { expect } from 'expect';

const feature = loadFeature('tests/features/category.feature');

defineFeature(feature, (test) => {
    let request = supertest(app);
    let response: supertest.Response;

    test('Administrador Adiciona uma nova Categoria de Produto', ({ given, when, then, and }) => {
        given(/^o administrador de nome ligia, e mail ligiaferropadilha@gmail.com e senha “liginha(\d+)” está logado no painel de administração do e-commercen na página "(.*)"$/, async (arg0, arg1) => {            
            const categories = await firestoreDB.collection('categories').get();
            const batch = firestoreDB.batch();
            categories.forEach(doc => batch.delete(doc.ref));
            await batch.commit();
        });

        when('ele seleciona a opção “Adicionar Nova Categoria”', async () => {
            const categoryData = {
                name: 'Camisas',
                description: 'Camisas temáticas do centro de informática',
            };
            response = await request.post('/category').send(categoryData);
        });

        and('o sistema valida se todos os dados estão preenchidos', () => {
            expect(response.status).toBe(201);
        });

        and(/^o sistema valida que os campos "(.*)", "(.*)" estão válidos$/, async (arg0, arg1) => {
            expect(response.body.category.name).toBe('Camisas');
            expect(response.body.category.description).toBe('Camisas temáticas do centro de informática');
        });

        then('o sistema salva a categoria e o administrador recebe uma confirmação de sucess', () => {
            expect(response.body.message).toBe('Categoria cadastrada com sucesso');
        });
    });

    test('Erro ao Adicionar uma nova Categoria de Produto', ({ given, when, then, and }) => {
        given(/^o administrador de nome ligia, e mail ligiaferropadilha@gmail.com e senha “liginha(\d+)” está logado no painel de administração do e-commercen na página "(.*)"$/, async (arg0, arg1) => {            
            const categories = await firestoreDB.collection('categories').get();
            const batch = firestoreDB.batch();
            categories.forEach(doc => batch.delete(doc.ref));
            await batch.commit();
        });

        when('ele seleciona a opção “Adicionar Nova Categoria”', async () => {
            const categoryData = {
                name: '',
                description: ':)',
            };
            response = await request.post('/category').send(categoryData);
        });
        then('o sistema valida se os campos obrigatórios foram preenchidos', () => {
            expect(response.status).toBe(400);
        });
        
        and('uma mensagem de erro é retornada', () => {
            expect(response.body.message).toBe('O nome da categoria deve ser preenchidos!');
        });
    });

    test('Administrador Edita uma Categoria Existente', ({ given, when, then, and }) => {
        given(/^o administrador de nome ligia, e mail ligiaferropadilha@gmail.com e senha “liginha(\d+)” está logado no painel de administração do e-commercen na página "(.*)"$/, async (arg0, arg1) => {            
            const categoryData = {
                name: 'Camisetas Personalizadas',
                description: 'Camisetas com estampas personalizadas',
            };
            await firestoreDB.collection('categories').add(categoryData);
        });

        when('ele seleciona a opção “editar” para a categoria “Camisetas Personalizadas” e altera seu nome para "Camisetas Temáticas"', async () => {
            const updateData = {
                name: 'Camisetas Temáticas'
            };
            response = await request.put('/category/Camisetas Personalizadas').send(updateData);
        });

        then('o sistema verifica se o novo nome é válido', () => {
            expect(response.status).toBe(200);
        });

        and('o sistema salva a categoria atualizada e retorna uma mensagem de confirmação', () => {
            expect(response.body.message).toBe('Categoria atualizada com sucesso!');
            expect(response.body.category.name).toBe('Camisetas Temáticas');
        });
    });
});
