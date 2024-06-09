import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { firestoreDB } from '../../src/services/firebaseAdmin';

const feature = loadFeature('tests/features/product.feature');

beforeAll(async () => {
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
});

defineFeature(feature, (test) => {
  let request = supertest(app);
  let response: supertest.Response;

  test('Cadastro do Produto Bem-Sucedido', ({ given, when, then, and }) => {
    given('que o ProductRepository não possui um produto com o nome "Camisa Nova"', async () => {
      const products = await firestoreDB.collection('products').where('name', '==', 'Camisa Nova').get();
      const batch = firestoreDB.batch();
      products.forEach(doc => batch.delete(doc.ref));
      await batch.commit();
    });

    when('uma requisição POST é enviada para "/product" com o corpo da requisição em JSON:', async (docString) => {
      const productData = JSON.parse(docString);
      response = await request.post('/product').send(productData);
    });

    then('o status da resposta deve ser "201"', () => {
      expect(response.status).toBe(201);
    });

    and('o JSON da resposta deve conter o nome "Camisa Nova"', () => {
      expect(response.body.product.name).toBe('Camisa Nova');
    });

    and('o JSON da resposta deve conter a descrição "Algodão"', () => {
      expect(response.body.product.description).toBe('Algodão');
    });

    and('o JSON da resposta deve conter o preço 50', () => {
      expect(response.body.product.price).toBe(50);
    });

    and('o JSON da resposta deve conter o status "Disponível"', () => {
      expect(response.body.product.status).toBe('Disponível');
    });

    and('o JSON da resposta deve conter a categoria "Camisas"', () => {
      expect(response.body.product.category).toBe('Camisas');
    });
  });
});
