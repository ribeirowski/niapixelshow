import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { firestoreDB } from '../../src/services/firebaseAdmin';

const feature = loadFeature('tests/features/product.feature');

/*beforeAll(async () => {
  const products = await firestoreDB.collection('products').get();
  const batch = firestoreDB.batch();
  products.forEach(doc => batch.delete(doc.ref));
  await batch.commit();
});

afterAll(async () => {
  const products = await firestoreDB.collection('products').get();
  const batch = firestoreDB.batch();
  products.forEach(doc => batch.delete(doc.ref));
  await batch.commit();
});*/

defineFeature(feature, (test) => {
  let request = supertest(app);
  let response: supertest.Response;

  test('Cadastro do Produto Bem-Sucedido', ({ given, when, then, and }) => {
    jest.setTimeout(15000);
    given('que o banco de dados de produto está vazio', async () => {
      const products = await firestoreDB.collection('products').get();
      const batch = firestoreDB.batch();
      products.forEach(doc => batch.delete(doc.ref));
      await batch.commit();
    });

    when('o fornecedor submete um formulário de cadastro de produto com nome "Camisa Nova", descrição "Algodão", preço "50", status "Disponível", categoria "Camisas"', async () => {
      const productData = {
        name: 'Camisa Nova',
        description: 'Algodão',
        price: 50,
        status: 'Disponível',
        category: 'Camisas'
      };
      response = await request.post('/product').send(productData);
    });

    then('o sistema valida que os campos "nome", "descrição", "preço", "status" e "categoria" estão preenchidos', () => {
      expect(response.status).toBe(201);
    });

    and('o sistema verifica que todos os dados estão válidos', () => {
      expect(response.body.product.name).toBe('Camisa Nova');
      expect(response.body.product.description).toBe('Algodão');
      expect(response.body.product.price).toBe(50);
      expect(response.body.product.status).toBe('Disponível');
      expect(response.body.product.category).toBe('Camisas');
    });

    then('o sistema salva o produto no banco de dados e retorna uma confirmação de sucesso', () => {
      expect(response.body.message).toBe('Produto cadastrado com sucesso');
    });
  });
});
