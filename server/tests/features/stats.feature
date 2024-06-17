Feature: Estatísticas de Vendas

Scenario: Requisição de Estatísticas
Given o banco de dados de pedido tem pedido com id "100", usuário "thiagojgcosta@gmail.com", item "Camisa Nova" com descrição "Algodão", preço "50", status "Disponível", categoria "Camisas", quantidade "2", tamanho "M", preço "100", status "pago", criado em "24/03/2024" 
And o banco de dados de pedido tem pedido com id "101", usuário "beto@gmail.com", item "Caneca Especial" com descrição "Vermelha, preço "30", status "Disponível", categoria "Outros", quantidade "1" e tamanho "M", preço "30", status "pago", criado em "29/03/2024"
When são requisitadas as estatísticas de vendas vendas totais, produto mais vendido e tabela de produtos
Then o sistema retorna vendas totais "130", produto mais vendido "Camisa Nova" e tabela de produtos com produto "Camisa Nova" com vendas totais "2" e preço "50" e produto "Caneca Especial" com vendais totais "1" e preço "30"

Scenario: Requisição de Estatísticas com Banco de Dados Vazio
Given o banco de dados de pedido está Vazio
When são requisitadas as estatísticas de vendas vendas totais, produto mais vendido e tabela de produtos
Then o sistema retorna vendas totais "0", produto mais vendido "none" e tabela de produtos "none"