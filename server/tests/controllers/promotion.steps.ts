import { loadFeature, defineFeature } from "jest-cucumber";
import { firestoreDB } from '../../src/services/firebase/firebaseAdmin';
import { expect } from 'expect';
import supertest from "supertest";
import app from "../../src/app";

const feature = loadFeature('tests/features/promotion.feature');

defineFeature(feature, (test) => {
  let request = supertest(app)
  let response: supertest.Response;
  let promotionId: string;
  let productId: string;
  let token: string;

  beforeAll(async () => {
    //apagar todas as promoções
    const promotionQuery = await firestoreDB.collection('promotions').get();
    promotionQuery.forEach(doc => {
      doc.ref.delete();
    });

    //apagar todos os produtos com nome "Camisetao"
    const productQuery = await firestoreDB.collection('products').where('name', '==', 'Camisetao').get();
    productQuery.forEach(doc => {
      doc.ref.delete();
    });
  });

  // Scenario: Cadastro de Promoção
  // Given estou logado como administrador com email "nrc2@cin.ufpe.br", senha "nia12345"
  // And não existem promoções cadastradas com a descrição "Promoção de Ano Novo"
  // And existem produtos cadastrados com o id "Camisetao"
  // When eu faço uma requisição POST para "/promotions" com os dados:
  //   """
  //   {
  //     "start_date": "01/01/2025",
  //     "end_date": "01/02/2025",
  //     "name": "Promoção de Ano Novo",
  //     "discount": 10,
  //     "product_id": "Camisetao",
  //     "active": true
  //   }
  //   """
  // Then a resposta deve ter status 201
  // And uma mensagem de sucesso "Promotion created successfully" deve ser retornada

  test('Cadastro de Promoção', ({ given, and, when, then }) => {

    jest.setTimeout(30000);

    given(/^estou logado como administrador com email "(.*)", senha "(.*)"$/, async (arg0, arg1) => {
      const loginResponse = await request.post('/auth/login').send({
        email: arg0,
        password: arg1
      });

      token = loginResponse.headers['set-cookie'];

    });
    and(/^não existem promoções cadastradas com a descrição "(.*)"$/, async (arg0) => {
      const promotionQuery = await firestoreDB.collection('promotions').where('description', '==', arg0).get();
      promotionQuery.forEach(doc => {
        doc.ref.delete();
      });
    });
    and(/^existem produtos cadastrados com o id "(.*)"$/, async (arg0) => {
      const product = {
        name: "Camisetao",
        description: "Algodão",
        price: 50,
        status: true,
        category: "Camisas"
      }
  
      const addProduct = await request.post('/product').send(product);
      if (addProduct.status !== 201) {
        throw new Error('Erro ao adicionar produto');	
      }
      productId = addProduct.body.id;
    });
    when(/^eu faço uma requisição POST para "(.*)" com os dados:$/, async (arg0) => {
      response = await request.post('/promotion').send({
        start_date: "01/01/2025",
        end_date: "01/02/2025",
        name: "Promoção de Ano Novo",
        discount: 10,
        product_id: productId,
        active: true
      }).set('Cookie', token);

      promotionId = response.body.id;
      
    });
    then(/^a resposta deve ter status (\d+)$/, (arg0) => {
      expect(response.status).toBe(201);
    });
    and(/^uma mensagem de sucesso "(.*)" deve ser retornada$/, (arg0) => {
      expect(response.body.message).toBe(arg0);
    });
  });

  // Scenario: Editar promoção
  //   Given estou logado como administrador com email "nrc2@cin.ufpe.br", senha "nia12345"
  //   And existem produtos cadastrados com o nome "Camisa Cin"
  //   And existem promoções cadastradas com o id "1", associadas ao produto "Camisa Cin"
  //   When eu fizer uma requisição PATCH para "/promotion/1" com os dados:
  //     """
  //     {
  //       "start_date": "01/01/2025",
  //       "end_date": "01/02/2025",
  //       "name": "Promoção de Ano Novo",
  //       "discount": 20,
  //       "product_id": "Camisetao",
  //       "active": true
  //       }
  //     """
  //   Then a resposta deve ter status 200
  //   And uma mensagem de sucesso "Promotion updated successfully" deve ser retornada

  test('Editar promoção', ({ given, and, when, then }) => {
    given(/^estou logado como administrador com email "(.*)", senha "(.*)"$/, async (arg0, arg1) => {
      const loginResponse = await request.post('/auth/login').send({
        email: arg0,
        password: arg1
      });

      token = loginResponse.headers['set-cookie'];
    });
    and(/^existem produtos cadastrados com o nome "(.*)"$/, async (arg0) => {
      
      //get do produto com id productId
      const product = await request.get('/product/' + productId);
      if (product.status !== 200) {
        throw new Error('Erro ao buscar produto');	
      }

    });
    and(/^existem promoções cadastradas com o id "(.*)"$/, async (arg0) => {
      //get da promoção com id promotionId
      const promotion = await request.get('/promotion/' + promotionId);
      if (promotion.status !== 200) {
        throw new Error('Erro ao buscar promoção');	
      }
    });
    when(/^eu fizer uma requisição PATCH para "(.*)" com os dados:$/, async (arg0) => {
      response = await request.patch('/promotion/' + promotionId).send({ discount: 20 }).set('Cookie', token);
    });
    then(/^a resposta deve ter status (\d+)$/, (arg0) => {
      expect(response.status).toBe(200);
    });
    and(/^uma mensagem de sucesso "(.*)" deve ser retornada$/, (arg0) => {
      expect(response.body.message).toBe(arg0);
    });
  });

  // Scenario: Listar promoções
  //   Given estou logado como usuario com email "nrc2@cin.ufpe.br", senha "nia12345"
  //   And existem promoções cadastradas
  //   When eu fizer uma requisição GET para "/promotion"
  //   Then o sistema deve retornar status 200
  //   And a resposta deve ser uma lista com todas as promoções

  test('Listar promoções', ({ given, when, then, and }) => {
    given(/^estou logado como usuario com email "(.*)", senha "(.*)"$/, async (arg0, arg1) => {
      const loginResponse = await request.post('/auth/login').send({
        email: arg0,
        password: arg1
      });

      token = loginResponse.headers['set-cookie'];

    });
    given(/^existem promoções cadastradas$/, async () => {
      const promotion = await request.get('/promotion');
      if (promotion.status !== 200) {
        throw new Error('Erro ao buscar promoções');	
      }
    });
    when(/^eu fizer uma requisição GET para "(.*)"$/, async (arg0) => {
      response = await request.get('/promotion');
    });
    then(/^o sistema deve retornar status (\d+)$/, (arg0) => {
      expect(response.status).toBe(200);
    });
    and(/^a resposta deve ser uma lista com todas as promoções$/, () => {
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  // Scenario: Listar promoção por id
  //   Given estou logado como administrador com email "nrc2@cin.ufpe.br", senha "nia12345"
  //   And existem promoções cadastradas com o id "1"
  //   When eu fizer uma requisição GET para "/promotion/1"
  //   Then o sistema deve retornar status 200
  //   And a resposta deve ser a promoção com id "1"

  test('Listar promoção por id', ({ given, when, then, and }) => {
    given(/^estou logado como administrador com email "(.*)", senha "(.*)"$/, async (arg0, arg1) => {
      const loginResponse = await request.post('/auth/login').send({
        email: arg0,
        password: arg1
      });

      token = loginResponse.headers['set-cookie'];

    });
    given(/^existem promoções cadastradas com o id "(.*)"$/, async (arg0) => {
      const promotion = await request.get('/promotion/' + promotionId);
      if (promotion.status !== 200) {
        throw new Error('Erro ao buscar promoções');	
      }
    });
    when(/^eu fizer uma requisição GET para "(.*)"$/, async (arg0) => {
      response = await request.get('/promotion/' + promotionId);
    });
    then(/^o sistema deve retornar status (\d+)$/, (arg0) => {
      expect(response.status).toBe(200);
    });
    and(/^a resposta deve ser a promoção com id "(.*)"$/, (arg0) => {
      expect(response.body.id).toBe(promotionId);
    });
  });

  // Scenario: Excluir promoção
  //   Given estou logado como administrador com email "nrc2@cin.ufpe.br", senha "nia12345"
  //   And existe um produto cadastrado com o nome "Camisetao"
  //   And existem promoções cadastradas com o id "1", associadas ao produto "Camisetao"
  //   When eu fizer uma requisição DELETE para "/promotion/1"
  //   Then a resposta deve ter status 200
  //   And uma mensagem de sucesso "Promotion deleted successfully" deve ser retornada
  //   And o preço do produto associado à promoção deve ser atualizado

  test('Excluir promoção', ({ given, when, then, and }) => {
    given(/^estou logado como administrador com email "(.*)", senha "(.*)"$/, async (arg0, arg1) => {
      const loginResponse = await request.post('/auth/login').send({
        email: arg0,
        password: arg1
      });

      token = loginResponse.headers['set-cookie'];
    });
    given(/^existe um produto cadastrado com o nome "(.*)"$/, async (arg0) => {
      const product = await request.get('/product/' + productId);
      if (product.status !== 200) {
        throw new Error('Erro ao buscar produto');	
      }
    });
    given(/^existem promoções cadastradas com o id "(.*)"$/, async (arg0) => {
      const promotion = await request.get('/promotion/' + promotionId);
      if (promotion.status !== 200) {
        throw new Error('Erro ao buscar promoção');	
      }
    });
    when(/^eu fizer uma requisição DELETE para "(.*)"$/, async (arg0) => {
      response = await request.delete('/promotion/' + promotionId).set('Cookie', token);
    });
    then(/^a resposta deve ter status (\d+)$/, (arg0) => {
      expect(response.status).toBe(200);
    });
    and(/^uma mensagem de sucesso "(.*)" deve ser retornada$/, (arg0) => {
      expect(response.body.message).toBe(arg0);
    });
    and(/^o preço do produto associado à promoção deve ser atualizado$/, async () => {
      const product = await firestoreDB.collection('products').doc(productId).get();
      if (!product.exists) {
        throw new Error('Erro ao buscar produto');	
      }
      // @ts-ignore
      const price = product.data().price;

      expect(price).toBe(50);
    });
  });
});