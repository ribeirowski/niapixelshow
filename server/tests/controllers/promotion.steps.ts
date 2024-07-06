import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { firestoreDB } from '../../src/services/firebase/firebaseAdmin';


const feature = loadFeature('tests/features/promotion.feature');

defineFeature(feature, (test) => {
  let request = supertest(app)
  let response: supertest.Response;
  let promotionId: string;
  let productId: string;
  let token: string;

  beforeEach(async () => {
    jest.clearAllMocks();

    // Limpar coleções relevantes no Firestore de teste
    const promotions = await firestoreDB.collection('promotions').get();
    promotions.forEach(async (doc) => {
      await doc.ref.delete();
    });

    const products = await firestoreDB.collection('products').get();
    products.forEach(async (doc) => {
      await doc.ref.delete();
    });

    // Adicionar produto de teste necessário
    await firestoreDB.collection('products').doc('CamisaCin').set({
      name: 'Camisa Cin',
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

    given('não existem promoções cadastradas com a descrição "Promoção de Ano Novo"', async () => {
      const snapshot = await firestoreDB.collection('promotions').where('name', '==', 'Promoção de Ano Novo').get();
      expect(snapshot.empty).toBe(true);
    });

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

    when('preencher o campo "data de início" com "2025-01-01"', () => {});

    when('preencher o campo "data de término" com "2025-02-01"', () => {});

    when('preencher o campo "descrição" com "Promoção de Ano Novo"', () => {});

    when('preencher o campo "porcentagem" com "10"', () => {});

    when('preencher o campo "produto" com "Camisa Cin"', () => {});

    then('a promoção "Promoção de Ano Novo" deve aparecer na lista de promoções', async () => {
      const snapshot = await firestoreDB.collection('promotions').where('name', '==', 'Promoção de Ano Novo').get();
      expect(snapshot.empty).toBe(false);
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

    given('estou na página "promoções"', () => {
      // Contexto inicial, se necessário
    });

    given('existem promoções cadastradas com a descrição "Promoção de Ano Novo"', async () => {
      await firestoreDB.collection('promotions').doc('PromoAnoNovo').set({
        start_date: '2025-01-01',
        end_date: '2025-02-01',
        name: 'Promoção de Ano Novo',
        discount: 10,
        product_id: 'CamisaCin',
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

    when('preencher o campo "data de início" com "2025-01-01"', () => {});

    when('preencher o campo "data de término" com "2025-02-01"', () => {});

    when('preencher o campo "descrição" com "Promoção de Ano Novo"', () => {});

    when('preencher o campo "porcentagem" com "20"', () => {});

    when('preencher o campo "produto" com "Camisa Cin"', () => {});

    then('a promoção "Promoção de Ano Novo" deve aparecer na lista de promoções', async () => {
      const snapshot = await firestoreDB.collection('promotions').where('name', '==', 'Promoção de Ano Novo').get();
      expect(snapshot.empty).toBe(false);
    });
  });

  // Scenario: Listar promoções
  //   Given estou logado como usuario com email "nrc2@cin.ufpe.br", senha "nia12345"
  //   And existem promoções cadastradas
  //   When eu fizer uma requisição GET para "/promotion"
  //   Then o sistema deve retornar status 200
  //   And a resposta deve ser uma lista com todas as promoções

    given('estou na página "promoções"', () => {
      // Contexto inicial, se necessário
    });

    given('existem promoções cadastradas com a descrição "Promoção de Ano Novo"', async () => {
      await firestoreDB.collection('promotions').doc('PromoAnoNovo').set({
        start_date: '2025-01-01',
        end_date: '2025-02-01',
        name: 'Promoção de Ano Novo',
        discount: 10,
        product_id: 'CamisaCin',
      });

      token = loginResponse.headers['set-cookie'];

    then('a promoção "Promoção de Ano Novo" não deve aparecer na lista de promoções', async () => {
      const snapshot = await firestoreDB.collection('promotions').where('name', '==', 'Promoção de Ano Novo').get();
      expect(snapshot.empty).toBe(true);
    });
  });

  // Scenario: Listar promoção por id
  //   Given estou logado como administrador com email "nrc2@cin.ufpe.br", senha "nia12345"
  //   And existem promoções cadastradas com o id "1"
  //   When eu fizer uma requisição GET para "/promotion/1"
  //   Then o sistema deve retornar status 200
  //   And a resposta deve ser a promoção com id "1"

  test('Cadastro de promoção com porcentagem menor que 0', ({ given, when, then, and }) => {
    given('estou logado como "administrador", com usuário "nathy" e senha "nia12345"', () => {
      // Simular autenticação do administrador, se necessário
    });

    given('estou na página "promoções"', () => {
      // Contexto inicial, se necessário
    });

    given('não existem promoções cadastradas com a descrição "Promoção de Ano Novo"', async () => {
      const snapshot = await firestoreDB.collection('promotions').where('name', '==', 'Promoção de Ano Novo').get();
      expect(snapshot.empty).toBe(true);
    });

    when('eu selecionar a opção de cadastrar uma nova promoção', async () => {
      response = await request.post('/promotion').send({
        start_date: '2025-01-01',
        end_date: '2025-02-01',
        name: 'Promoção de Ano Novo',
        discount: -10,
        product_id: 'CamisaCin',
      });

      token = loginResponse.headers['set-cookie'];

    });

    when('preencher o campo "data de início" com "2025-01-01"', () => {});

    when('preencher o campo "data de término" com "2025-02-01"', () => {});

    when('preencher o campo "descrição" com "Promoção de Ano Novo"', () => {});

    when('preencher o campo "porcentagem" com "-10"', () => {});

    when('preencher o campo "produto" com "Camisa Cin"', () => {});

    then('a promoção "Promoção de Ano Novo" não deve aparecer na lista de promoções', async () => {
      const snapshot = await firestoreDB.collection('promotions').where('name', '==', 'Promoção de Ano Novo').get();
      expect(snapshot.empty).toBe(true);
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
