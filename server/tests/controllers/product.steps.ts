import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { firestoreDB } from '../../src/services/firebase/firebaseAdmin';
import { HttpException } from '../../src/middlewares';
import {expect} from 'expect'

const feature = loadFeature('tests/features/product.feature');

defineFeature(feature, (test) => {
  let request = supertest(app);
  let response: supertest.Response;

  test('Cadastro do Produto Bem-Sucedido', ({ given, when, then, and }) => {
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
        status: true,
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
      expect(response.body.product.status).toBe(true);
      expect(response.body.product.category).toBe('Camisas');
    });

    then('o sistema salva o produto no banco de dados e retorna uma confirmação de sucesso', () => {
      expect(response.body.message).toBe('Produto cadastrado com sucesso');
    });
  });

  //TEST #2 - CREATION WITH MISSING FIELD
  test('Cadastro do Produto com Campo Não Preenchido', ({ given, when, then, and }) => {

    given('que o banco de dados de produto está vazio', async () => {
      const products = await firestoreDB.collection('products').get();
      const batch = firestoreDB.batch();
      products.forEach(doc => batch.delete(doc.ref));
      await batch.commit();
    });

    when('o fornecedor submete um formulário de cadastro de produto com nome "Camisa Nova", descrição "Algodão", preço "", status "Disponível", categoria "Camisas"', async () => {
      const productData = {
        name: 'Camisa Nova',
        description: 'Algodão',
        status: true,
        category: 'Camisas'
      };
      response = await request.post('/product').send(productData);
    });

    then('o sistema valida se os campos "nome", "descrição", "preço", "status" e "categoria" estão preenchidos', () => {
      expect(response.status).toBe(400);
    });


    and('o sistema retorna uma mensagem de erro informando que todos os campos devem ser preenchidos', () => {
      expect(response.body.message).toBe('Todos os campos devem ser preenchidos');
    });
  });

  //TEST #3 - CREATION WITH NEAGTIVE PRICE
  test('Cadastro do Produto com Preço Negativo', ({ given, when, then, and }) => {
    jest.setTimeout(15000);

    given('que o banco de dados de produto está vazio', async () => {
      const products = await firestoreDB.collection('products').get();
      const batch = firestoreDB.batch();
      products.forEach(doc => batch.delete(doc.ref));
      await batch.commit();
    });

    when('o fornecedor submete um formulário de cadastro de produto com nome "Camisa Nova", descrição "Algodão", preço "-50", status "Disponível", categoria "Camisas"', async () => {
      const productData = {
        name: 'Camisa Nova',
        description: 'Algodão',
        price: -50, // Preço negativo para testar a validação
        status: true,
        category: 'Camisas'
      };
      response = await request.post('/product').send(productData);
    });

    then('o sistema valida que o campo "preço" possui um valor positivo', () => {
      expect(response.status).toBe(500); // Espera que a resposta tenha um status 400
    });

    and('o sistema retorna uma mensagem de erro informando que o "preço" não pode ser negativo', () => {
      expect(response.body.message).toBe('O preço deve ser um número positivo');
    });
  });

  //TEST #4 - SUCCESS UPDATE 
  test('Atualização do Produto Bem-Sucedida', ({ given, when, then, and }) => {
    jest.setTimeout(15000);

    given('que o produto com ID "123" existe no banco de dados de produto', async () => {
      const productData = {
        name: 'Camisa Nova',
        description: 'Algodão',
        price: 50,
        status: true,
        category: 'Camisas'
      };
      await firestoreDB.collection('products').doc('123').set(productData);
    });

    when('o fornecedor submete um formulário de atualização de produto com nome "Camisa Azul", descrição "Algodão", preço "50", status "true", categoria "Camisas"', async () => {
      const productData = {
        name: 'Camisa Azul',
        description: 'Algodão',
        price: 50,
        status: true,
        category: 'Camisas'
      };
      response = await request.put('/product/123').send(productData);
    });

    then('o sistema valida que os campos "nome", "descrição", "preço", "status" e "categoria" estão preenchidos', () => {
      expect(response.status).toBe(200); // Espera que a resposta tenha um status 200 para sucesso
    });

    and('o sistema atualiza o produto no banco de dados e retorna uma confirmação de sucesso', async () => {
      const updatedProduct = await firestoreDB.collection('products').doc('123').get();
      const productData = updatedProduct.data();
      expect(response.body.product.name).toBe('Camisa Azul');
      expect(response.body.product.description).toBe('Algodão');
      expect(response.body.product.price).toBe(50);
      expect(response.body.product.status).toBe(true);
      expect(response.body.product.category).toBe('Camisas');
      expect(response.body.message).toBe('Produto atualizado com sucesso');
    });
  });

  //TEST #5 - UPDATE WITH MISSING FIELD
  test('Atualização do Produto com Campo Não Preenchido', ({ given, when, then, and }) => {
    jest.setTimeout(15000);

    given('que o produto com ID "123" existe no banco de dados de produto', async () => {
      const productData = {
        name: 'Camisa Nova',
        description: 'Algodão',
        price: 50,
        status: true,
        category: 'Camisas'
      };
      await firestoreDB.collection('products').doc('123').set(productData);
    });

    when('o fornecedor submete um formulário de atualização de produto com nome "Camisa Nova", descrição "", preço "50", status "Disponível", categoria "Camisas"', async () => {
      const productData = {
        name: 'Camisa Nova',
        price: 50,
        status: true,
        category: 'Camisas'
      };
      response = await request.put('/product/123').send(productData);
    });

    then('o sistema valida se os campos "nome", "descrição", "preço", "status" e "categoria" estão preenchidos', () => {
      expect(response.status).toBe(400); // Espera que a resposta tenha um status 400 para erro
    });

    and('o sistema retorna uma mensagem de erro informando que todos os campos devem ser preenchidos', () => {
      expect(response.body.message).toBe('Todos os campos devem ser preenchidos');
    });
  });

  test('Atualização do Produto com Preço Negativo', ({ given, when, then, and }) => {
    jest.setTimeout(15000);

    given('que o produto com ID "123" existe no banco de dados de produto', async () => {
      const productData = {
        name: 'Camisa Nova',
        description: 'Algodão',
        price: 50,
        status: true,
        category: 'Camisas'
      };
      await firestoreDB.collection('products').doc('123').set(productData);
    });

    when('o fornecedor submete um formulário de atualização de produto com nome "Camisa Nova", descrição "Algodão", preço "-50", status "Disponível", categoria "Camisas"', async () => {
      const productData = {
        name: 'Camisa Nova',
        description: 'Algodão',
        price: -50,
        status: true,
        category: 'Camisas'
      };
      response = await request.put('/product/123').send(productData);
    });

    then('o sistema valida que o campo "preço" possui um valor positivo', () => {
      expect(response.status).toBe(400); // Espera que a resposta tenha um status 400 para erro
    });

    and('o sistema retorna uma mensagem de erro informando que o "preço" não pode ser negativo', () => {
      expect(response.body.message).toBe('O preço deve ser um número positivo');
    });
  });

  test('Exclusão de Produto Bem-Sucedida', ({ given, when, then, and }) => {
    jest.setTimeout(15000);

    given('que o produto com ID "123" existe no banco de dados de produto', async () => {
      const productData = {
        name: 'Camisa Nova',
        description: 'Algodão',
        price: 50,
        status: true,
        category: 'Camisas'
      };
      await firestoreDB.collection('products').doc('123').set(productData);
    });

    when('o fornecedor submete um pedido de exclusão de produto', async () => {
      response = await request.delete('/product/123').send();
    });

    then('o sistema verifica se o produto existe', async () => {
      const productdoc = await firestoreDB.collection('products').doc('123').get();
      expect(productdoc.exists).toBe(false);
    });

    and('o sistema remove o produto do banco de dados e retorna uma mensagem de confirmação de exclusão', async () => {
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Produto excluído com sucesso');
    });
  });

  test('Leitura de Produto Específico Bem-Sucedida', ({ given, when, then, and }) => {
    jest.setTimeout(15000);

    given('que o produto com ID "123" existe no banco de dados de produto', async () => {
      const productData = {
        name: 'Camisa Nova',
        description: 'Algodão',
        price: 50,
        status: true,
        category: 'Camisas'
      };
      await firestoreDB.collection('products').doc('123').set(productData);

      const productDoc = await firestoreDB.collection('products').doc('123').get();
      expect(productDoc.exists).toBe(true);
    });

    when('o fornecedor solicita os detalhes de um produto específico', async () => {
      response = await request.get('/product/123').send();
    });

    then('o sistema verifica que o produto existe', async () => {
      const productDoc = await firestoreDB.collection('products').doc('123').get();
      expect(productDoc.exists).toBe(true);
    });

    and('o sistema retorna os detalhes do produto solicitado com nome "Camisa Nova", descrição "Algodão", preço "50", status "Disponível", categoria "Camisas"', async () => {
      expect(response.status).toBe(200);
      expect(response.body.product).toBeDefined();
      expect(response.body.product.name).toBe('Camisa Nova');
      expect(response.body.product.description).toBe('Algodão');
      expect(response.body.product.price).toBe(50);
      expect(response.body.product.status).toBe(true);
      expect(response.body.product.category).toBe('Camisas');
    });
  });
});
