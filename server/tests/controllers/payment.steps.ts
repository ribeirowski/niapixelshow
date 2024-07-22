import { loadFeature, defineFeature } from "jest-cucumber";
import supertest from "supertest";
import app from "../../src/app";
import expect from "expect";
import {
  firestoreDB,
  adminAuth,
} from "../../src/services/firebase/firebaseAdmin";
import { Stats } from "fs";
import { any, string } from "zod";

const feature = loadFeature("tests/features/payment.feature");

const usedEmail = "thiagojgcosta@gmail.com";

defineFeature(feature, (test) => {
  let request = supertest(app);
  let response: supertest.Response;
  jest.setTimeout(15000);
  let nome: string;

  afterEach(async () => {
    const order = await firestoreDB
      .collection("orders")
      .where("email", "==", usedEmail)
      .get();
    const user = await firestoreDB
      .collection("users")
      .where("email", "==", usedEmail)
      .get();
    const batch = firestoreDB.batch();
    order.forEach((doc) => batch.delete(doc.ref));
    user.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
    const deletePromises = user.docs.map(
      async (doc) => await adminAuth.deleteUser(doc.id)
    );
    await Promise.all(deletePromises);
    nome = "";
  });

  test("Marcar o pedido como pago ao confirmar pagamento", ({
    given,
    when,
    then,
    and,
  }) => {
    given(
      /^um usuário com nome "(.*)", email "(.*)", senha "(.*)" e telefone "(.*)"$/,
      async (arg0, arg1, arg2, arg3) => {
        const user = {
          name: arg0,
          phone: arg3,
          email: arg1,
          password: arg2,
          is_admin: false,
        };
        response = await request.post("/user").send(user);
        nome = response.body.name;
      }
    );
    and(
      /^o pedido com email "(.*)", item "(.*)" com descrição "(.*)", quantidade "(.*)", preço "(.*)" reais, status "(.*)", criado em "(.*)", para o endereço "(.*)" cadastrado$/,
      async (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) => {
        const orderData = {
          email: arg0,
          item: arg1,
          description: arg2,
          qtd: parseInt(arg3),
          price: parseFloat(arg4),
          status: arg5,
          date: arg6,
          addr: arg7,
        };
        response = await request.post("/order").send(orderData);
      }
    );
    when("o pedido é confirmado", async () => {
      const id = response.body.id;
      const orderData = {
        status: "Pago",
      };
      await request.patch("/order/" + id).send(orderData);
    });
    then(/^o pedido possui "(.*)" "(.*)"$/, async (arg0, arg1) => {
      response = await request.get("/order/" + response.body.id);
      expect(response.body[arg0]).toBe(arg1);
    });
    and(
      /^é enviado um email de "(.*)" para o email "(.*)"$/,
      async (arg0, arg1) => {
        const pedido = response.body;
        if (arg0 === "Confirmação") {
          var email = {
            order: pedido,
            name: nome,
            stat: arg0,
          };
        } else {
          var email = {
            order: pedido,
            name: nome,
            stat: arg0,
          };
        }
        response = await request.post("/email/" + arg1).send(email);
        expect(response.status).toBe(200);
      }
    );
  });
  test("Pagamento errado informado pelo fornecedor", ({
    given,
    when,
    then,
    and,
  }) => {
    given(
      /^um usuário com nome "(.*)", email "(.*)", senha "(.*)" e telefone "(.*)"$/,
      async (arg0, arg1, arg2, arg3) => {
        const user = {
          name: arg0,
          phone: arg3,
          email: arg1,
          password: arg2,
          is_admin: false,
        };
        response = await request.post("/user").send(user);
        nome = response.body.name;
      }
    );
    and(
      /^o pedido com email "(.*)", item "(.*)" com descrição "(.*)", quantidade "(.*)", preço "(.*)" reais, status "(.*)", criado em "(.*)", para o endereço "(.*)" cadastrado$/,
      async (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) => {
        const orderData = {
          email: arg0,
          item: arg1,
          description: arg2,
          qtd: parseInt(arg3),
          price: parseFloat(arg4),
          status: arg5,
          date: arg6,
          addr: arg7,
        };
        response = await request.post("/order").send(orderData);
      }
    );
    when("é informado que o pagamento está errado", async () => {
      const id = response.body.id;
      const orderData = {
        status: "Erro no Pagamento",
      };
      await request.patch("/order/" + id).send(orderData);
    });
    then(/^o pedido possui "(.*)" "(.*)"$/, async (arg0, arg1) => {
      response = await request.get("/order/" + response.body.id);
      expect(response.body[arg0]).toBe(arg1);
    });
    and(
      /^é enviado um email de "(.*)" para o email "(.*)"$/,
      async (arg0, arg1) => {
        const pedido = response.body;
        if (arg0 === "Confirmação") {
          var email = {
            stat: arg0,
            order: pedido,
            name: nome,
          };
        } else {
          var email = {
            stat: arg0,
            order: pedido,
            name: nome,
          };
        }
        response = await request.post("/email/" + arg1).send(email);
        expect(response.status).toBe(200);
      }
    );
  });
});
