import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app'; // Importe o seu app Express aqui
import { firestoreDB, adminAuth } from '../../src/services/firebaseAdmin'; // Importe a configuração do Firebase para testes

const feature = loadFeature('tests/features/user.feature');

defineFeature(feature, (test) => {
  let request = supertest(app);
  let response: supertest.Response;
  let createdUserId: string | undefined;
  const testEmail = 'ehnr@cin.ufpe.br'; // Email de teste para o cenário de email já cadastrado

  const deleteUserByEmail = async (email: string) => {
    try {
      const userRecord = await adminAuth.getUserByEmail(email);
      await adminAuth.deleteUser(userRecord.uid);
    } catch (error: unknown) {
      // Verificação de tipo para acessar a propriedade `code`
      if (error instanceof Error && 'code' in error) {
        const firebaseError = error as { code: string };
        if (firebaseError.code !== 'auth/user-not-found') {
          throw error;
        }
      } else {
        // Se o erro não for do tipo esperado, lança o erro para cima
        throw error;
      }
    }
  };

  // Configuração inicial para remover usuários de teste
  beforeAll(async () => {
    // Remove o usuário do Firestore
    const snapshot = await firestoreDB.collection('users').where('email', '==', testEmail).get();
    snapshot.forEach(async (doc) => {
      await doc.ref.delete();
    });

    // Remove o usuário da autenticação do Firebase
    await deleteUserByEmail(testEmail);
  });

  // Remove o usuário criado após os testes
  afterEach(async () => {
    if (createdUserId) {
      // Remove do Firestore
      await firestoreDB.collection('users').doc(createdUserId).delete();
      
      // Remove da autenticação do Firebase
      const userDoc = await firestoreDB.collection('users').doc(createdUserId).get();
      if (userDoc.exists) {
        const email = userDoc.data()?.email;
        if (email) {
          await deleteUserByEmail(email);
        }
      }
      createdUserId = undefined; // Resetar para não interferir em outros testes
    }
  });

  // Teste: Cadastro de novo usuário com sucesso
  test('Cadastro de novo usuário com sucesso', ({ given, when, then, and }) => {
    jest.setTimeout(30000);

    given('que o sistema está acessível', () => {
      // Nada a ser feito aqui, pois o sistema é assumido como acessível
    });

    when(
      /^envio uma requisição para a API de cadastro de usuário com nome: "(.*)", email: "(.*)", senha: "(.*)" e telefone: "(.*)"$/,
      async (name, email, password, phone) => {
        response = await request.post('/user').send({
          name,
          email,
          password,
          phone,
          isAdmin: false // Define isAdmin como false diretamente
        });

        if (response.status === 201) {
          createdUserId = response.body.userId; // Supõe que a API retorna o ID do usuário criado
        }
      }
    );

    then('recebo um e-mail de confirmação para validar meu cadastro', async () => {
      expect(response.body.message).toContain('User created successfully');
    });

    and('o e-mail contém um link para confirmar o cadastro', () => {
      expect(response.body.message).toContain('User created successfully');
    });

    and('recebo uma resposta de sucesso da API', () => {
      // Verifica se a resposta da API indica sucesso
      expect(response.status).toBe(201);
    });

    and('posso verificar no banco de dados que o usuário foi registrado corretamente', async () => {
      // Verifica no Firestore se o usuário foi registrado corretamente
      if (createdUserId) {
        const userDoc = await firestoreDB.collection('users').doc(createdUserId).get();
        expect(userDoc.exists).toBeTruthy();
        expect(userDoc.data()?.email).toBe(response.body.email);
      }
    });
  });

  // Teste: Senha curta durante o cadastro
  test('Senha curta durante o cadastro', ({ given, when, then }) => {
    jest.setTimeout(30000);

    given('que o sistema está acessível', () => {
      // Nenhuma ação necessária
    });

    when('envio uma requisição para a API de cadastro de usuário com senha curta', async () => {
      response = await request.post('/user').send({
        name: 'Short Password User',
        email: 'shortpass@example.com',
        password: '12345', // Senha curta
        phone: '1234567890',
        isAdmin: false,
      });
    });

    then('recebo uma resposta de erro indicando que a senha deve ter no mínimo 8 caracteres', () => {
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('A senha deve ter no mínimo 8 caracteres');
    });
  });

  // Teste: Email já cadastrado durante o cadastro
  test('Email já cadastrado durante o cadastro', ({ given, when, then }) => {
    jest.setTimeout(30000);

    given('que o sistema está acessível', () => {
      // Nenhuma ação necessária
    });

    when('envio uma requisição para a API de cadastro de usuário com um email já cadastrado', async () => {
      response = await request.post('/user').send({
        name: 'Duplicate Email User',
        email: testEmail,
        password: 'AnotherPassword123',
        phone: '1234567890',
        isAdmin: false,
      });
    });

    then('recebo uma resposta de erro indicando que o email já está cadastrado', () => {
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Email already in use');
    });
  });

  // Teste: Login com sucesso
  test('Login com sucesso', ({ given, when, then }) => {
    jest.setTimeout(30000);

    given('que o sistema está acessível', () => {
      // Nada a ser feito aqui
    });

    when('envio uma requisição para a API de login com email: "enioribeiro9@hotmail.com" e senha: "enio1234"', async () => {
      response = await request.post('/auth/login').send({
        email: 'enioribeiro9@hotmail.com',
        password: 'enio1234',
      });
    });

    then('recebo uma resposta de sucesso', () => {
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Login successful');
    });
  });

  // Teste: Login com e-mail não cadastrado
  test('Login com e-mail não cadastrado', ({ given, when, then }) => {
    jest.setTimeout(30000);

    given('que o sistema está acessível', () => {
      // Nada a ser feito aqui
    });

    when('envio uma requisição para a API de login com email não cadastrado', async () => {
      response = await request.post('/auth/login').send({
        email: 'nonexistent@example.com',
        password: 'randomPassword123',
      });
    });

    then('recebo uma resposta de erro indicando que o email não está cadastrado', () => {
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Email not found');
    });
  });

  // Teste: Logout com sucesso
  test('Logout com sucesso', ({ given, when, then, and }) => {
    jest.setTimeout(30000);

    given('que estou autenticado no sistema', async () => {
      // Simulação de login bem-sucedido
      response = await request.post('/auth/login').send({
        email: 'enioribeiro9@hotmail.com',
        password: 'enio1234',
      });
      expect(response.status).toBe(200);
    });

    when('envio uma requisição para a API de logout', async () => {
      response = await request.post('/auth/logout').send();
    });

    then('recebo uma resposta de sucesso indicando que fiz logout', () => {
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Logout successful');
    });
  });
});
