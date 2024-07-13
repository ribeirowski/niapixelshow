import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { firestoreDB, adminAuth } from '../../src/services/firebase/firebaseAdmin';
import { HttpException } from '../../src/middlewares';
import {expect} from 'expect'

const feature = loadFeature('tests/features/product.feature');

defineFeature(feature, (test) => {
  let request = supertest(app);
  let response: supertest.Response;
  let token: string;
  
  test('Cadastro do Produto Bem-Sucedido', ({ given, when, then, and }) => {

    given(/^eu estou autenticado como administrador com email "(.*)" e senha "(.*)" e tenho um token JWT válido$/, async (email, password) => {
        const loginResponse = await request.post('/auth/login').send({
            email,
            password
        });
        token = loginResponse.headers['set-cookie'];
    });

    and('que o banco de dados de produto está vazio', async () => {
      const products = await firestoreDB.collection('products').get();
      const productVic = await firestoreDB.collection('products').where('name', '==', 'Camisetao').get();
      
      // apaga todos os produtos menos productVic
      const batch = firestoreDB.batch();
      products.forEach(doc => {
          if (productVic.empty || doc.id !== productVic.docs[0]?.id) {
              batch.delete(doc.ref);
          }
      });
      await batch.commit();
    });

    when(/^o fornecedor submete um formulário de cadastro de produto com nome "(.*)", descrição "(.*)", preço "(.*)", status "(.*)", categoria "(.*)", descrição da categoria "(.*)"$/, async (name, description, price, status, categoryName, categoryDescription) => {
        const productData = {
            name: name,
            description: description,
            price: parseFloat(price),
            status: status === 'true',
            category: {
                name: categoryName,
                description: categoryDescription
            }
        };
        response = await request.post('/product').set('Cookie', token).send(productData);
    });

    then('o sistema valida que os campos "nome", "descrição", "preço", "status" e "categoria" estão preenchidos', () => {
        expect(response.status).toBe(201);
    });

    and('o sistema verifica que todos os dados estão válidos', () => {
        expect(response.body.product.name).toBe('Camisa Nova');
        expect(response.body.product.description).toBe('Algodão');
        expect(response.body.product.price).toBe(50);
        expect(response.body.product.status).toBe(true);
        expect(response.body.product.category.name).toBe('Camisas');
        expect(response.body.product.category.description).toBe('Descrição da categoria');
    });

    then('o sistema salva o produto no banco de dados e retorna uma confirmação de sucesso', () => {
        expect(response.body.message).toBe('Produto cadastrado com sucesso');
    });
});


  //TEST #2 - CREATION WITH MISSING FIELD
  test('Cadastro do Produto com Campo Não Preenchido', ({ given, when, then, and }) => {

    given(/^eu estou autenticado como administrador com email "(.*)" e senha "(.*)" e tenho um token JWT válido$/, async (email, password) => {
      const loginResponse = await request.post('/auth/login').send({
          email,
          password
      });
      token = loginResponse.headers['set-cookie'];
  });

    and('que o banco de dados de produto está vazio', async () => {
      const products = await firestoreDB.collection('products').get();
      const batch = firestoreDB.batch();
      products.forEach(doc => batch.delete(doc.ref));
      await batch.commit();
    });

    when(/^o fornecedor submete um formulário de cadastro de produto com nome "(.*)", descrição "(.*)", preço "(.*)", status "(.*)", categoria "(.*)", descrição da categoria "(.*)"$/, async (name, description, price, status, categoryName, categoryDescription) => {
      const productData = {
          name: name,
          description: description,
          price: parseFloat(price),
          status: status === 'true',
          category: {
              name: categoryName,
              description: categoryDescription
          }
      };
      response = await request.post('/product').set('Cookie', token).send(productData);
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

    given(/^eu estou autenticado como administrador com email "(.*)" e senha "(.*)" e tenho um token JWT válido$/, async (email, password) => {
      const loginResponse = await request.post('/auth/login').send({
          email,
          password
      });
      token = loginResponse.headers['set-cookie'];
  });

    and('que o banco de dados de produto está vazio', async () => {
      const products = await firestoreDB.collection('products').get();
      const batch = firestoreDB.batch();
      products.forEach(doc => batch.delete(doc.ref));
      await batch.commit();
    });

    when(/^o fornecedor submete um formulário de cadastro de produto com nome "(.*)", descrição "(.*)", preço "(.*)", status "(.*)", categoria "(.*)", descrição da categoria "(.*)"$/, async (name, description, price, status, categoryName, categoryDescription) => {
      const productData = {
          name: name,
          description: description,
          price: parseFloat(price),
          status: status === 'true',
          category: {
              name: categoryName,
              description: categoryDescription
          }
      };
      response = await request.post('/product').set('Cookie', token).send(productData);
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

    given(/^eu estou autenticado como administrador com email "(.*)" e senha "(.*)" e tenho um token JWT válido$/, async (email, password) => {
        const loginResponse = await request.post('/auth/login').send({
            email,
            password
        });
        token = loginResponse.headers['set-cookie'];
    });

    and(/^que o produto com ID "(.*)" existe no banco de dados de produto com nome "(.*)", descrição "(.*)", preço "(.*)", status "(.*)", categoria "(.*)", descrição da categoria "(.*)"$/, async (productId, name, description, price, status, categoryName, categoryDescription) => {
        const productData = {
            name: name,
            description: description,
            price: parseFloat(price),
            status: status === 'true',
            category: {
                name: categoryName,
                description: categoryDescription
            }
        };
        await firestoreDB.collection('products').doc(productId).set(productData);
    });

    when(/^o fornecedor submete um formulário de atualização de produto com nome "(.*)", descrição "(.*)", preço "(.*)", status "(.*)", categoria "(.*)", descrição da categoria "(.*)"$/, async (name, description, price, status, categoryName, categoryDescription) => {
        const productData = {
            name: name,
            description: description,
            price: parseFloat(price),
            status: status === 'true',
            category: {
                name: categoryName,
                description: categoryDescription
            }
        };
        response = await request.put('/product/123').set('Cookie', token).send(productData);
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
        expect(response.body.product.category.name).toBe('Camisas');
        expect(response.body.product.category.description).toBe('Descrição da categoria');
        expect(response.body.message).toBe('Produto atualizado com sucesso');
    });
});


  //TEST #5 - UPDATE WITH MISSING FIELD
  test('Atualização do Produto com Campo Não Preenchido', ({ given, when, then, and }) => {
  
    jest.setTimeout(15000);

    given(/^eu estou autenticado como administrador com email "(.*)" e senha "(.*)" e tenho um token JWT válido$/, async (email, password) => {
        const loginResponse = await request.post('/auth/login').send({
            email,
            password
        });
        token = loginResponse.headers['set-cookie'];
    });

    and(/^que o produto com ID "(.*)" existe no banco de dados de produto com nome "(.*)", descrição "(.*)", preço "(.*)", status "(.*)", categoria "(.*)", descrição da categoria "(.*)"$/, async (productId, name, description, price, status, categoryName, categoryDescription) => {
        const productData = {
            name: name,
            description: description,
            price: parseFloat(price),
            status: status === 'true',
            category: {
                name: categoryName,
                description: categoryDescription
            }
        };
        await firestoreDB.collection('products').doc(productId).set(productData);
    });

    when(/^o fornecedor submete um formulário de atualização de produto com nome "(.*)", descrição "(.*)", preço "(.*)", status "(.*)", categoria "(.*)", descrição da categoria "(.*)"$/, async (name, description, price, status, categoryName, categoryDescription) => {
        const productData = {
            name: name,
            description: description,
            price: price ? parseFloat(price) : '',
            status: status === 'true',
            category: {
                name: categoryName,
                description: categoryDescription
            }
        };
        response = await request.put('/product/123').set('Cookie', token).send(productData);
    });

    then('o sistema valida se os campos "nome", "descrição", "preço", "status" e "categoria" estão preenchidos', () => {
        expect(response.status).toBe(400);
    });

    and('o sistema retorna uma mensagem de erro informando que todos os campos devem ser preenchidos', () => {
        expect(response.body.message).toBe('Todos os campos devem ser preenchidos');
    });
});


//TEST #6 - UPDATE WITH NEGATIVE PRICE
test('Atualização do Produto com Preço Negativo', ({ given, when, then, and }) => {

  jest.setTimeout(15000);

  given(/^eu estou autenticado como administrador com email "(.*)" e senha "(.*)" e tenho um token JWT válido$/, async (email, password) => {
      const loginResponse = await request.post('/auth/login').send({
          email,
          password
      });
      token = loginResponse.headers['set-cookie'];
  });

  and(/^que o produto com ID "(.*)" existe no banco de dados de produto com nome "(.*)", descrição "(.*)", preço "(.*)", status "(.*)", categoria "(.*)", descrição da categoria "(.*)"$/, async (productId, name, description, price, status, categoryName, categoryDescription) => {
      const productData = {
          name: name,
          description: description,
          price: parseFloat(price),
          status: status === 'true',
          category: {
              name: categoryName,
              description: categoryDescription
          }
      };
      await firestoreDB.collection('products').doc(productId).set(productData);
  });

  when(/^o fornecedor submete um formulário de atualização de produto com nome "(.*)", descrição "(.*)", preço "(.*)", status "(.*)", categoria "(.*)", descrição da categoria "(.*)"$/, async (name, description, price, status, categoryName, categoryDescription) => {
      const productData = {
          name: name,
          description: description,
          price: parseFloat(price),
          status: status === 'true',
          category: {
              name: categoryName,
              description: categoryDescription
          }
      };
      response = await request.put('/product/123').set('Cookie', token).send(productData);
  });

  then('o sistema valida que o campo "preço" possui um valor positivo', () => {
      expect(response.status).toBe(500);
  });

  and('o sistema retorna uma mensagem de erro informando que o "preço" não pode ser negativo', () => {
      expect(response.body.message).toBe('O preço deve ser um número positivo');
  });
});

test('Exclusão de Produto Bem-Sucedida', ({ given, when, then, and }) => {
  jest.setTimeout(15000);

  given(/^eu estou autenticado como administrador com email "(.*)" e senha "(.*)" e tenho um token JWT válido$/, async (email, password) => {
      const loginResponse = await request.post('/auth/login').send({
          email,
          password
      });
      token = loginResponse.headers['set-cookie'];
  });

  and('que o produto com ID "123" existe no banco de dados de produto com nome "Camisa Nova", descrição "Algodão", preço "50", status "true", categoria "Camisas", descrição da categoria "Descrição da categoria"', async () => {
      const productData = {
          name: 'Camisa Nova',
          description: 'Algodão',
          price: 50,
          status: true,
          category: {
              name: 'Camisas',
              description: 'Descrição da categoria'
          }
      };
      await firestoreDB.collection('products').doc('123').set(productData);
  });

  when('o fornecedor submete um pedido de exclusão de produto', async () => {
      response = await request.delete('/product/123').set('Cookie', token).send();
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

test('Exclusão de Produto Mal-Sucedida', ({ given, when, then, and }) => {

  jest.setTimeout(15000);

  given(/^eu estou autenticado como administrador com email "(.*)" e senha "(.*)" e tenho um token JWT válido$/, async (email, password) => {
      const loginResponse = await request.post('/auth/login').send({
          email,
          password
      });
      token = loginResponse.headers['set-cookie'][0];
  });

  when('o fornecedor submete um pedido de exclusão de produto com ID "999"', async () => {
      response = await request.delete('/product/999').set('Cookie', token).send();
  });

  then('o sistema retorna uma mensagem de erro informando que o produto não foi encontrado', () => {
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Produto não encontrado');
  });
});



test('Leitura de Produto Específico Bem-Sucedida', ({ given, when, then, and }) => {
  jest.setTimeout(15000);

  given(/^eu estou autenticado como administrador com email "(.*)" e senha "(.*)" e tenho um token JWT válido$/, async (email, password) => {
      const loginResponse = await request.post('/auth/login').send({
          email,
          password
      });
      token = loginResponse.headers['set-cookie'];
  });

  and('que o produto com ID "123" existe no banco de dados de produto com nome "Camisa Nova", descrição "Algodão", preço "50", status "true", categoria "Camisas", descrição da categoria "Descrição da categoria"', async () => {
      const productData = {
          name: 'Camisa Nova',
          description: 'Algodão',
          price: 50,
          status: true,
          category: {
              name: 'Camisas',
              description: 'Descrição da categoria'
          }
      };
      await firestoreDB.collection('products').doc('123').set(productData);

      const productDoc = await firestoreDB.collection('products').doc('123').get();
      expect(productDoc.exists).toBe(true);
  });

  when('o fornecedor solicita os detalhes de um produto específico', async () => {
      response = await request.get('/product/123').set('Cookie', token).send();
  });

  then('o sistema verifica que o produto existe', async () => {
      const productDoc = await firestoreDB.collection('products').doc('123').get();
      expect(productDoc.exists).toBe(true);
  });

  and('o sistema retorna os detalhes do produto solicitado com nome "Camisa Nova", descrição "Algodão", preço "50", status "true", categoria "Camisas", descrição da categoria "Descrição da categoria"', async () => {
      expect(response.status).toBe(200);
      expect(response.body.product).toBeDefined();
      expect(response.body.product.name).toBe('Camisa Nova');
      expect(response.body.product.description).toBe('Algodão');
      expect(response.body.product.price).toBe(50);
      expect(response.body.product.status).toBe(true);
      expect(response.body.product.category.name).toBe('Camisas');
      expect(response.body.product.category.description).toBe('Descrição da categoria');
  });
});

test('Leitura de Produto Mal-Sucedida', ({ given, when, then, and }) => {
  jest.setTimeout(15000);

  given(/^eu estou autenticado como administrador com email "(.*)" e senha "(.*)" e tenho um token JWT válido$/, async (email, password) => {
      const loginResponse = await request.post('/auth/login').send({
          email,
          password
      });
      token = loginResponse.headers['set-cookie'];
  });

  when('o fornecedor solicita os detalhes de um produto específico com ID "999"', async () => {
      response = await request.get('/product/999').set('Cookie', token).send();
  });

  then('o sistema retorna uma mensagem de erro informando que o produto não foi encontrado', () => {
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Produto não encontrado');
  });
});

test('Leitura de Todos os Produtos Bem-Sucedida', ({ given, when, then, and }) => {
   
    jest.setTimeout(15000);

    given(/^eu estou autenticado como administrador com email "(.*)" e senha "(.*)" e tenho um token JWT válido$/, async (email, password) => {
        const loginResponse = await request.post('/auth/login').send({
            email,
            password
        });
        token = loginResponse.headers['set-cookie'][0];
    });

    and('que existem produtos no banco de dados', async () => {
        const products = [
            {
                name: 'Camisa Nova',
                description: 'Algodão',
                price: 50,
                status: true,
                category: {
                    name: 'Camisas',
                    description: 'Descrição da categoria'
                },
                promotionId: 'promo1'
            },
            {
                name: 'Calça Jeans',
                description: 'Denim',
                price: 100,
                status: true,
                category: {
                    name: 'Calças',
                    description: 'Descrição da categoria'
                },
                promotionId: 'promo2'
            }
        ];

        const promotions = [
            {
                id: 'promo1',
                description: 'Promoção de Camisa Nova',
                discount: 10
            },
            {
                id: 'promo2',
                description: 'Promoção de Calça Jeans',
                discount: 15
            }
        ];

        const batch = firestoreDB.batch();

        // Adiciona produtos
        products.forEach((product, index) => {
            const productRef = firestoreDB.collection('products').doc((index + 1).toString());
            batch.set(productRef, product);
        });

        // Adiciona promoções
        promotions.forEach((promotion) => {
            const promotionRef = firestoreDB.collection('promotions').doc(promotion.id);
            batch.set(promotionRef, promotion);
        });

        await batch.commit();

        console.log('Produtos e promoções adicionados ao banco de dados');
    });

    when('o fornecedor solicita a lista de todos os produtos', async () => {
        response = await request.get('/product').set('Cookie', token).send();
        console.log('Resposta da solicitação:', response.status, response.body);
    });

    then('o sistema retorna a lista de todos os produtos', () => {
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.length).toBeGreaterThan(0);

        type Product = {
            name: string;
            description: string;
            price: number;
            status: boolean;
            category: {
                name: string;
                description: string;
            };
            promotion?: {
                description: string;
                discount: number;
            };
        };

        const product1 = response.body.find((product: Product) => product.name === 'Camisa Nova');
        const product2 = response.body.find((product: Product) => product.name === 'Calça Jeans');

        expect(product1).toBeDefined();
        expect(product1.promotion).toBeDefined();
        expect(product1.promotion.description).toBe('Promoção de Camisa Nova');
        expect(product1.promotion.discount).toBe(10);

        expect(product2).toBeDefined();
        expect(product2.promotion).toBeDefined();
        expect(product2.promotion.description).toBe('Promoção de Calça Jeans');
        expect(product2.promotion.discount).toBe(15);
    });
});



});
