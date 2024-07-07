import { defineFeature, loadFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { firestoreDB, adminAuth } from '../../src/services/firebase/firebaseAdmin';
import expect from 'expect';

const feature = loadFeature('tests/features/user.feature');
const testEmails = ['ehnr@cin.ufpe.br', 'enio.ribeiro@citi.org.br'];

defineFeature(feature, (test) => {
  let request = supertest(app);
  let response: supertest.Response;
  let user: any;
  let uid: string;
  let token: string;

  jest.setTimeout(30000);

  beforeEach(async () => {
    // Apaga os dados do Firestore e do Firebase Authentication criados para os testes
    const users = await firestoreDB.collection('users').where('email', 'in', testEmails).get();
    const batch = firestoreDB.batch();

    users.forEach(doc => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    // Deleta usuários no Firebase Authentication
    for (const email of testEmails) {
      try {
        const userRecord = await adminAuth.getUserByEmail(email);
        await adminAuth.deleteUser(userRecord.uid);
      } catch (error) {
        return;
      }
    }
  });

  afterEach(async () => {
    // Apaga os dados do Firestore e do Firebase Authentication criados durante os testes
    const users = await firestoreDB.collection('users').where('email', 'in', testEmails).get();
    const batch = firestoreDB.batch();

    users.forEach(doc => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    // Deleta usuários no Firebase Authentication
    for (const email of testEmails) {
      try {
        const userRecord = await adminAuth.getUserByEmail(email);
        await adminAuth.deleteUser(userRecord.uid);
      } catch (error) {
        return;
      }
    }
  });

  test('Criar um novo usuário', ({ given, when, then, and }) => {
    given(/^eu tenho dados de usuário válidos com nome "(.*)", telefone "(.*)", email "(.*)", senha "(.*)", endereço "(.*)" e is_admin "false"$/, async (arg0, arg1, arg2, arg3, arg4) => {
      user = {
          name: arg0,
          phone: arg1,
          email: arg2,
          password: arg3,
          address: arg4,
          is_admin: false
      };
    });

    when(/^eu envio uma requisição POST para http:\/\/localhost:3001\/user com os dados do usuário$/, async () => {
      response = await request.post('/user').send(user);
      uid = response.body.uid;
    });

    then('o status da resposta deve ser 201', () => {
      expect(response.status).toBe(201);
    });

    and('a resposta deve conter a mensagem "User created successfully. Verification email sent."', () => {
      expect(response.body.message).toBe('User created successfully. Verification email sent.');
    });
  });

  test('Criar um usuário com um email existente', ({ given, when, then, and }) => {
    given(/^já existe um usuário com nome "(.*)", telefone "(.*)", email "(.*)", senha "(.*)", endereço "(.*)" e is_admin "false"$/, async (arg0, arg1, arg2, arg3, arg4) => {
      user = {
          name: arg0,
          phone: arg1,
          email: arg2,
          password: arg3,
          address: arg4,
          is_admin: false
      };
      const userResponse = await request.post('/user').send(user);
      uid = userResponse.body.uid;
    });

    given(/^eu tenho dados de usuário com nome "(.*)", telefone "(.*)", email "(.*)", senha "(.*)", endereço "(.*)" e is_admin "false"$/, (arg0, arg1, arg2, arg3, arg4) => {
      user = {
          name: arg0,
          phone: arg1,
          email: arg2,
          password: arg3,
          address: arg4,
          is_admin: false
      };
    });

    when(/^eu envio uma requisição POST para http:\/\/localhost:3001\/user com os dados do novo usuário$/, async () => {
      response = await request.post('/user').send(user);
    });

    then('o status da resposta deve ser 400', () => {
      expect(response.status).toBe(400);
    });

    and('a resposta deve conter a mensagem "Email already in use"', () => {
      expect(response.body.message).toBe('Email already in use');
    });
  });

  test('Atualizar um usuário existente com autenticação', ({ given, when, then, and }) => {
    given(/^já existe um usuário com nome "(.*)", telefone "(.*)", email "(.*)", senha "(.*)", endereço "(.*)" e is_admin "false"$/, async (arg0, arg1, arg2, arg3, arg4) => {
      user = {
        name: arg0,
        phone: arg1,
        email: arg2,
        password: arg3,
        address: arg4,
        is_admin: false
      };
      const userResponse = await request.post('/user').send(user);
      uid = userResponse.body.uid; // Obtendo o UID do usuário criado
    });

    and(/^eu tenho dados de atualização de usuário com telefone "(.*)" e endereço "(.*)"$/, (arg0, arg1) => {
      user.phone = arg0;
      user.address = arg1;
    });

    and(/^eu estou autenticado com email "(.*)" e senha "(.*)" e tenho um token JWT válido$/, async (arg0, arg1) => {
      await adminAuth.updateUser(uid, { emailVerified: true });

      const loginResponse = await request.post('/auth/login').send({
        email: arg0,
        password: arg1
      });
      token = loginResponse.headers['set-cookie'];
    });

    when(/^eu envio uma requisição PATCH para http:\/\/localhost:3001\/user\/{id} com os novos dados do usuário e o token JWT no cabeçalho$/, async () => {
      response = await request.patch(`/user/${uid}`).send(user).set('Cookie', token);
    });

    then('o status da resposta deve ser 200', () => {
      expect(response.status).toBe(200);
    });

    and('a resposta deve conter a mensagem "User updated successfully"', () => {
      expect(response.body.message).toBe('User updated successfully');
    });
  });

  test('Atualizar usuário sem autenticação', ({ given, when, then, and }) => {
    given(/^já existe um usuário com nome "(.*)", telefone "(.*)", email "(.*)", senha "(.*)", endereço "(.*)" e is_admin "false"$/, async (arg0, arg1, arg2, arg3, arg4) => {
      user = {
        name: arg0,
        phone: arg1,
        email: arg2,
        password: arg3,
        address: arg4,
        is_admin: false
      };
      const userResponse = await request.post('/user').send(user);
      uid = userResponse.body.uid; // Obtendo o UID do usuário criado
    });

    given(/^eu tenho dados de atualização de usuário com telefone "(.*)" e endereço "(.*)"$/, (arg0, arg1) => {
      user.phone = arg0;
      user.address = arg1;
    });

    given('eu não estou autenticado', () => {
      // Não faz nada, pois não está autenticado
    });

    when(/^eu envio uma requisição PATCH para http:\/\/localhost:3001\/user\/{id} com os dados do usuário sem autenticação$/, async () => {
      response = await request.patch(`/user/${uid}`).send(user);
    });

    then('o status da resposta deve ser 401', () => {
      expect(response.status).toBe(401);
    });

    and('a resposta deve conter a mensagem "Authentication token is required"', () => {
      expect(response.body.message).toBe('Authentication token is required');
    });
  });

  test('Administrador atualiza os detalhes de outro usuário', ({ given, when, then, and }) => {
    given(/^já existe um usuário com nome "(.*)", telefone "(.*)", email "(.*)", senha "(.*)", endereço "(.*)" e is_admin "false"$/, async (arg0, arg1, arg2, arg3, arg4) => {
      user = {
        name: arg0,
        phone: arg1,
        email: arg2,
        password: arg3,
        address: arg4,
        is_admin: false
      };
      const userResponse = await request.post('/user').send(user);
      uid = userResponse.body.uid; // Obtendo o UID do usuário criado
    });

    and(/^eu estou autenticado como administrador com email "(.*)" e senha "(.*)" e tenho um token JWT válido$/, async (arg0, arg1) => {
        const loginResponse = await request.post('/auth/login').send({
        email: arg0,
        password: arg1
      });
      token = loginResponse.headers['set-cookie'];
    });

    and(/^eu tenho dados de atualização de usuário com telefone "(.*)" e endereço "(.*)"$/, (arg0, arg1) => {
      user.phone = arg0;
      user.address = arg1;
    });

    when(/^eu envio uma requisição PATCH para http:\/\/localhost:3001\/user\/{id} com os dados do usuário e o token JWT no cabeçalho$/, async () => {
      response = await request.patch(`/user/${uid}`).send(user).set('Cookie', token);
    });

    then('o status da resposta deve ser 200', () => {
      expect(response.status).toBe(200);
    });

    and('a resposta deve conter a mensagem "User updated successfully"', () => {
      expect(response.body.message).toBe('User updated successfully');
    });
  });

  test('Deletar um usuário como administrador', ({ given, when, then, and }) => {
    given(/^que existe um usuário com nome "(.*)", telefone "(.*)", email "(.*)", senha "(.*)", endereço "(.*)" e is_admin "false"$/, async (arg0, arg1, arg2, arg3, arg4) => {
      user = {
        name: arg0,
        phone: arg1,
        email: arg2,
        password: arg3,
        address: arg4,
        is_admin: false
      };
      const userResponse = await request.post('/user').send(user);

      uid = userResponse.body.uid;
    });

    given(/^eu estou autenticado como administrador com email "(.*)" e senha "(.*)" e tenho um token JWT válido$/, async (arg0, arg1) => {
      const loginResponse = await request.post('/auth/login').send({
        email: arg0,
        password: arg1
      });
      token = loginResponse.headers['set-cookie'];
    });

    when(/^eu envio uma requisição DELETE para http:\/\/localhost:3001\/user\/{id} com o token JWT no cabeçalho$/, async () => {
      response = await request.delete(`/user/${uid}`).set('Cookie', token);
    });

    then('o status da resposta deve ser 200', () => {
      expect(response.status).toBe(200);
    });

    and('a resposta deve conter a mensagem "User deleted successfully"', () => {
      expect(response.body.message).toBe('User deleted successfully');
    });
  });

  test('Deletar um usuário com autenticação', ({ given, when, then, and }) => {
    given(/^que existe um usuário com nome "(.*)", telefone "(.*)", email "(.*)", senha "(.*)", endereço "(.*)" e is_admin "false"$/, async (arg0, arg1, arg2, arg3, arg4) => {
      user = {
        name: arg0,
        phone: arg1,
        email: arg2,
        password: arg3,
        address: arg4,
        is_admin: false
      };
      const userResponse = await request.post('/user').send(user);
      uid = userResponse.body.uid; // Obtendo o UID do usuário criado
    });

    given(/^eu estou autenticado como um usuário normal com email "(.*)" e senha "(.*)" e tenho um token JWT válido$/, async (arg0, arg1) => {
      await adminAuth.updateUser(uid, { emailVerified: true });

      const loginResponse = await request.post('/auth/login').send({
        email: arg0,
        password: arg1
      });
      token = loginResponse.headers['set-cookie'];
    });

    when(/^eu envio uma requisição DELETE para http:\/\/localhost:3001\/user\/{id} com o token JWT no cabeçalho$/, async () => {
      response = await request.delete(`/user/${uid}`).set('Cookie', token);
    });

    then('o status da resposta deve ser 200', () => {
      expect(response.status).toBe(200);
    });

    and('a resposta deve conter a mensagem "User deleted successfully"', () => {
      expect(response.body.message).toBe('User deleted successfully');
    });
  });

  test('Deletar um usuário sem privilégios de administrador', ({ given, when, then, and }) => {
    given(/^que existe um usuário com nome "(.*)", telefone "(.*)", email "(.*)", senha "(.*)", endereço "(.*)" e is_admin "false"$/, async (arg0, arg1, arg2, arg3, arg4) => {
      user = {
        name: arg0,
        phone: arg1,
        email: arg2,
        password: arg3,
        address: arg4,
        is_admin: false
      };
      const userResponse = await request.post('/user').send(user);
      uid = userResponse.body.uid; // Obtendo o UID do usuário criado
    });

    and(/^eu estou autenticado como um usuário normal com email "(.*)" e senha "(.*)" e tenho um token JWT válido$/, async (arg0, arg1) => {
      const user2 = {
        name: 'Enio',
        phone: '81999999999',
        email: arg0,
        password: arg1,
        address: 'Rua das Flores, 123, Recife, PE',
        is_admin: false
      };
      const userResponse2 = await request.post('/user').send(user2);
      const uid2 = userResponse2.body.uid; // Obtendo o UID do usuário criado

      await adminAuth.updateUser(uid2, { emailVerified: true });
      const loginResponse = await request.post('/auth/login').send({
        email: arg0,
        password: arg1
      });
      token = loginResponse.headers['set-cookie'];
    });

    when(/^eu envio uma requisição DELETE para http:\/\/localhost:3001\/user\/{id}$/, async () => {
      response = await request.delete(`/user/${uid}`).set('Cookie', token);
    });

    then('o status da resposta deve ser 403', () => {
      expect(response.status).toBe(403);
    });

    and('a resposta deve conter a mensagem "Permission denied"', () => {
      expect(response.body.message).toBe('Permission denied');
    });
  });

  test('Ler todos os usuários como administrador', ({ given, when, then, and }) => {
    given(/^eu estou autenticado como administrador com email "(.*)" e senha "(.*)" e tenho um token JWT válido$/, async (arg0, arg1) => {
      const loginResponse = await request.post('/auth/login').send({
        email: arg0,
        password: arg1
      });
      token = loginResponse.headers['set-cookie'];
    });

    when(/^eu envio uma requisição GET para http:\/\/localhost:3001\/user\/all com o token JWT no cabeçalho$/, async () => {
      response = await request.get('/user/all').set('Cookie', token);
    });

    then('o status da resposta deve ser 200', () => {
      expect(response.status).toBe(200);
    });

    and('a resposta deve conter uma lista de usuários', () => {
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  test('Ler todos os usuários como um usuário normal', ({ given, when, then, and }) => {
    given(/^eu estou autenticado como um usuário normal com email "(.*)" e senha "(.*)" e tenho um token JWT válido$/, async (arg0, arg1) => {
      // Cria e autentica um usuário
      const adminUser = {
        name: 'Nathy',
        phone: '81988888888',
        email: arg0,
        password: arg1,
        address: 'Rua das Flores, 123, Recife, PE',
        is_admin: false
      };
      const adminResponse = await request.post('/user').send(adminUser);
      uid = adminResponse.body.uid;

      await adminAuth.updateUser(uid, { emailVerified: true });
      
      const loginResponse = await request.post('/auth/login').send({
        email: arg0,
        password: arg1
      });
      token = loginResponse.headers['set-cookie'];
    });

    when(/^eu envio uma requisição GET para http:\/\/localhost:3001\/user\/all com o token JWT no cabeçalho$/, async () => {
      response = await request.get('/user/all').set('Cookie', token);
    });

    then('o status da resposta deve ser 403', () => {
      expect(response.status).toBe(403);
    });

    and('a resposta deve conter a mensagem "Admin privileges are required"', () => {
      expect(response.body.message).toBe('Admin privileges are required');
    });
  });

  test('Ler um usuário específico', ({ given, when, then, and }) => {
    given(/^que existe um usuário com nome "(.*)", telefone "(.*)", email "(.*)", senha "(.*)", endereço "(.*)" e is_admin "false"$/, async (arg0, arg1, arg2, arg3, arg4) => {
      user = {
        name: arg0,
        phone: arg1,
        email: arg2,
        password: arg3,
        address: arg4,
        is_admin: false
      };
      const userResponse = await request.post('/user').send(user);
      uid = userResponse.body.uid; // Obtendo o UID do usuário criado
    });

    given(/^eu estou autenticado como um usuário normal com email "(.*)" e senha "(.*)" e tenho um token JWT válido$/, async (arg0, arg1) => {
      await adminAuth.updateUser(uid, { emailVerified: true });

      const loginResponse = await request.post('/auth/login').send({
        email: arg0,
        password: arg1
      });
      token = loginResponse.headers['set-cookie'];
    });

    when(/^eu envio uma requisição GET para http:\/\/localhost:3001\/user\/{id} com o token JWT no cabeçalho$/, async () => {
      response = await request.get(`/user/${uid}`).set('Cookie', token);
    });

    then('o status da resposta deve ser 200', () => {
      expect(response.status).toBe(200);
    });

    and('a resposta deve conter os detalhes do usuário', () => {
      expect(response.body.email).toBe(user.email);
      expect(response.body.name).toBe(user.name);
      expect(response.body.phone).toBe(user.phone);
      expect(response.body.address).toBe(user.address);
    });
  });

  test('Login de usuário', ({ given, when, then, and }) => {
    given(/^já existe um usuário com nome "(.*)", telefone "(.*)", email "(.*)", senha "(.*)", endereço "(.*)" e is_admin "false"$/, async (arg0, arg1, arg2, arg3, arg4) => {
        user = {
            name: arg0,
            phone: arg1,
            email: arg2,
            password: arg3,
            address: arg4,
            is_admin: false
        };
        response = await request.post('/user').send(user);
        uid = response.body.uid; // Obtendo o UID do usuário criado

        await adminAuth.updateUser(uid, { emailVerified: true });
    });

    when(/^eu envio uma requisição POST para http:\/\/localhost:3001\/auth\/login com email "(.*)" e senha "(.*)"$/, async (arg0, arg1) => {
        response = await request.post('/auth/login').send({ 
            email: arg0, 
            password: arg1 
        });
    });

    then('o status da resposta deve ser 200', () => {
        expect(response.status).toBe(200);
    });

    and('a resposta deve conter a mensagem "Login successful" e um token JWT', () => {
        expect(response.body.message).toBe('Login successful');
        expect(response.body.token).toBeDefined();
    });
  });

  test('Login com senha errada', ({ given, when, then, and }) => {
    given(/^já existe um usuário com nome "(.*)", telefone "(.*)", email "(.*)", senha "(.*)", endereço "(.*)" e is_admin "false"$/, async (arg0, arg1, arg2, arg3, arg4) => {
        user = {
            name: arg0,
            phone: arg1,
            email: arg2,
            password: arg3,
            address: arg4,
            is_admin: false
        };
        response = await request.post('/user').send(user);
        uid = response.body.uid; // Obtendo o UID do usuário criado

        await adminAuth.updateUser(uid, { emailVerified: true });
    });

    when(/^eu envio uma requisição POST para http:\/\/localhost:3001\/auth\/login com email "(.*)" e senha "(.*)"$/, async (arg0, arg1) => {
        response = await request.post('/auth/login').send({ 
            email: arg0, 
            password: arg1 
        });
    });

    then('o status da resposta deve ser 500', () => {
        expect(response.status).toBe(500);
    });

    and('a resposta deve conter a mensagem "Invalid credential"', () => {
        expect(response.body.message).toBe('Invalid credential');
    });
  });

  test('Login com email não cadastrado', ({ given, when, then, and }) => {
    given(/^já existe um usuário com nome "(.*)", telefone "(.*)", email "(.*)", senha "(.*)", endereço "(.*)" e is_admin "false"$/, async (arg0, arg1, arg2, arg3, arg4) => {
        user = {
            name: arg0,
            phone: arg1,
            email: arg2,
            password: arg3,
            address: arg4,
            is_admin: false
        };
        response = await request.post('/user').send(user);
        uid = response.body.uid; // Obtendo o UID do usuário criado

        await adminAuth.updateUser(uid, { emailVerified: true });
    });

    when(/^eu envio uma requisição POST para http:\/\/localhost:3001\/auth\/login com email "(.*)" e senha "(.*)"$/, async (arg0, arg1) => {
        response = await request.post('/auth/login').send({ 
            email: arg0, 
            password: arg1 
        });
    });

    then('o status da resposta deve ser 400', () => {
        expect(response.status).toBe(400);
    });

    and('a resposta deve conter a mensagem "Email not found"', () => {
        expect(response.body.message).toBe('Email not found');
    });
  });

  test('Logout de usuário', ({ given, when, then, and }) => {
    given(/^já existe um usuário com nome "(.*)", telefone "(.*)", email "(.*)", senha "(.*)", endereço "(.*)" e is_admin "false"$/, async (arg0, arg1, arg2, arg3, arg4) => {
        user = {
            name: arg0,
            phone: arg1,
            email: arg2,
            password: arg3,
            address: arg4,
            is_admin: false
        };
        response = await request.post('/user').send(user);
        uid = response.body.uid; // Obtendo o UID do usuário criado

        await adminAuth.updateUser(uid, { emailVerified: true });
    });

    and(/^eu estou autenticado com email "(.*)" e senha "(.*)"$/, async (arg0, arg1) => {
        const loginResponse = await request.post('/auth/login').send({
          email: arg0,
          password: arg1
        });
        token = loginResponse.headers['set-cookie'];
    });

    when(/^eu envio uma requisição POST para http:\/\/localhost:3001\/auth\/logout$/, async () => {
        response = await request.post('/auth/logout').set('Cookie', token);
    });

    then('o status da resposta deve ser 200', () => {
        expect(response.status).toBe(200);
    });

    and('a resposta deve conter a mensagem "Logout successful"', () => {
        expect(response.body.message).toBe('Logout successful');
    });
  });

  test('Logout sem autenticação', ({ given, when, then, and }) => {
    given(/^já existe um usuário com nome "(.*)", telefone "(.*)", email "(.*)", senha "(.*)", endereço "(.*)" e is_admin "false"$/, async (arg0, arg1, arg2, arg3, arg4) => {
        user = {
            name: arg0,
            phone: arg1,
            email: arg2,
            password: arg3,
            address: arg4,
            is_admin: false
        };
        response = await request.post('/user').send(user);
        uid = response.body.uid; // Obtendo o UID do usuário criado

        await adminAuth.updateUser(uid, { emailVerified: true });
    });

    and('eu não estou autenticado', () => {
        // Não faz nada, pois não está autenticado
    });

    when(/^eu envio uma requisição POST para http:\/\/localhost:3001\/auth\/logout$/, async () => {
        response = await request.post('/auth/logout');
    });

    then('o status da resposta deve ser 401', () => {
        expect(response.status).toBe(401);
    });

    and('a resposta deve conter a mensagem "Authentication token is required"', () => {
        expect(response.body.message).toBe('Authentication token is required');
    });
  });
});
