import { loadFeature, defineFeature } from "jest-cucumber";
import supertest from "supertest";
import app from "../../src/app";
import {
  firestoreDB,
  adminAuth,
} from "../../src/services/firebase/firebaseAdmin";
import { Stats } from "fs";
import { expect } from "expect";
import { response } from "express";
import { request } from "http";

const feature = loadFeature("tests/features/stats.feature");

const usedEmail = "thiagojgcosta@gmail.com";

defineFeature(feature, (test) => {
  let request = supertest(app);
  let response: supertest.Response;
  let token: string;
  jest.setTimeout(15000);

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
  });

  // Teste 1
  test("Requisição de Estatísticas", ({ given, and, when, then }) => {
    given(
      /^eu estou autenticado como administrador com email "(.*)" e senha "(.*)" e tenho um token JWT válido$/,
      async (email, password) => {
        const loginResponse = await request.post("/auth/login").send({
          email,
          password,
        });
        token = loginResponse.headers["set-cookie"];
      }
    );
    and(
      /^o banco de dados tem pedido com qtd "(.*)", date "(.*)", item "(.*)", price "(.*)", description "(.*)", addr "(.*)", email "(.*)" e status "(.*)"$/,
      async (qtd, date, item, price, description, addr, email, status) => {
        const orderData = {
          email: email,
          item: item,
          description: description,
          qtd: parseInt(qtd),
          price: parseFloat(price),
          status: status,
          date: date,
          addr: addr,
        };
        await request.post("/order").set("Cookie", token).send(orderData);
      }
    );
    when(/^são requisitadas as estatísticas de vendas$/, async () => {
      response = await request
        .get("/order/stats?year=0001&month=01")
        .set("Cookie", token);
    });
    then(
      /^o sistema retorna vendas totais "(.*)", produto mais vendido "(.*)" e tabela de produtos com produto "(.*)" com quantidade "(.*)" e valor total "(.*)"$/,
      async (
        totalValue,
        mostSold,
        productName,
        productAmount,
        productValue
      ) => {
        console.log(response.body);
        expect(response.body.totalValue).toBe(parseFloat(totalValue));
        expect(response.body.mostSold).toBe(mostSold);
        expect(response.body.productName[0]).toBe(productName);
        expect(response.body.productAmount[0]).toBe(parseInt(productAmount));
        expect(response.body.productValue[0]).toBe(parseFloat(productValue));
      }
    );
  });

  // Teste 2
  test("Requisição sem Pedidos Pagos", ({ given, and, when, then }) => {
    given(
      /^eu estou autenticado como administrador com email "(.*)" e senha "(.*)" e tenho um token JWT válido$/,
      async (email, password) => {
        const loginResponse = await request.post("/auth/login").send({
          email,
          password,
        });
        token = loginResponse.headers["set-cookie"];
      }
    );
    and(/^o banco de dados não tem pedidos$/, async () => {});
    when(/^são requisitadas as estatísticas de vendas$/, async () => {
      response = await request.get("/order/stats").set("Cookie", token);
    });
    then(
      /^o sistema retorna vendas totais "(.*)", produto mais vendido "(.*)" e tabela de produtos com produto "(.*)" com quantidade "(.*)" e valor total "(.*)"$/,
      async (
        totalValue,
        mostSold,
        productName,
        productAmount,
        productValue
      ) => {
        expect(response.body.totalValue).toBe(parseFloat(totalValue));
        expect(response.body.mostSold).toBe(mostSold);
        expect(response.body.productName[0]).toBe(productName);
        expect(response.body.productAmount[0]).toBe(parseInt(productAmount));
        expect(response.body.productValue[0]).toBe(parseFloat(productValue));
      }
    );
  });
});
