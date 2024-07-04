import { loadFeature, defineFeature } from "jest-cucumber";
import { firestoreDB } from '../../src/services/firebase/firebaseAdmin';
import { Promotion, UpdatePromotion } from '../../src/DTOs';
import { expect } from 'expect';
import supertest from "supertest";
import app from "../../src/app";
import { before } from "node:test";

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


  afterAll(async () => {

    
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

      token = loginResponse.body.token;

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
      console.log(productId);

    });
    when(/^eu faço uma requisição POST para "(.*)" com os dados:$/, async (arg0) => {
      response = await request.post(arg0).send({
        start_date: "01/01/2025",
        end_date: "01/02/2025",
        name: "Promoção de Ano Novo",
        discount: 10,
        product_id: productId,
        active: true
      }).set('Authorization', `Bearer ${token}`);

      console.log(productId);
      const data = response.body;
      console.log(data);
    });
    then(/^a resposta deve ter status (\d+)$/, (arg0) => {
      expect(response.status).toBe(201);
    });
    and(/^uma mensagem de sucesso "(.*)" deve ser retornada$/, (arg0) => {
      expect(response.body.message).toBe(arg0);
    });
  });
});
