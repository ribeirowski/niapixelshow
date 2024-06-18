Feature: Estatísticas de Vendas

Scenario: Requisição de Estatísticas
Given o banco de dados tem pedido com id "8IiYJ5qCpFcVenWZUddk", qtd "2", date "2024-06-17", item "Camisa Nova", price "50.00", description "Vermelha, M', addr "Rua umburanas, 40", email "thiagojgcosta@gmail.com" e status "Pago"
When são requisitadas as estatísticas de vendas
Then o sistema retorna vendas totais "50", produto mais vendido "Camisa Nova" e tabela de produtos com produto "Camisa Nova" com vendas totais "2" e preço "50"

Scenario: Requisição de Estatísticas com Banco de Dados Vazio
Given o banco de dados de pedido não tem pedido com status "Pago"
When são requisitadas as estatísticas de vendas
Then o sistema retorna vendas totais "0", produto mais vendido "none" e tabela de produtos "none"

{
        "id": "8IiYJ5qCpFcVenWZUddk",
        "qtd": 2,
        "date": "2024-06-17",
        "item": "Camisa CIN",
        "price": 50,
        "description": "vermelha, M",
        "addr": "Rua umburanas, 40",
        "email": "thiagojgcosta@gmail.com",
        "status": "Pago"
    }