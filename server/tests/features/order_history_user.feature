Feature: Histórico de pedidos do Usuário

    Background:
        Given um usuário com nome "Thiago", email "thiagojgcosta@gmail.com", senha "Thiago123" e telefone "81994255845"
        
    Scenario: Retornar pedidos no histórico de pedidos com pedidos cadastrados
        And o pedido com email "thiagojgcosta@gmail.com", item "Camisa CIN" com descrição "Vermelha, M", quantidade "2", preço "50.00" reais, status "Pago", criado em "2024-05-14", para o endereço "Rua Altamira, 500" cadastrado
        When acessar a página de Histórico de Pedidos
        Then é retornado o pedido com email "thiagojgcosta@gmail.com", item "Camisa CIN" com descrição "Vermelha, M", quantidade "2", preço "50.00" reais, status "Pago", criado em "2024-05-14", para o endereço "Rua Altamira, 500"

    Scenario: Retornar mensagem no histórico de pedidos sem pedidos cadastrados
        And não tem cadastrado nenhum pedido
        When acessar a página de Histórico de Pedidos
        Then é retornada uma mensagem informando que não há pedidos cadastrados

    Scenario Outline: Retornar pedidos filtrados
        And o pedido com email "thiagojgcosta@gmail.com", item "Camisa CIN" com descrição "Vermelha, M", quantidade "2", preço "50.00" reais, status "Pago", criado em "2024-05-14", para o endereço "Rua Altamira, 500" cadastrado
        And o pedido com email "thiagojgcosta@gmail.com", item "Caneca CIN" com descrição "Preta, P", quantidade "1", preço "20.00" reais, status "Pago", criado em "2024-05-13", para o endereço "Rua Altamira, 500" cadastrado 
        When filtrar por "<FILTRO>" "<CRITERIO>"
        Then é retornado o pedido com email "thiagojgcosta@gmail.com", item "Camisa CIN" com descrição "Vermelha, M", quantidade "2", preço "50.00" reais, status "Pago", criado em "2024-05-14", para o endereço "Rua Altamira, 500"

        Examples:
        |FILTRO       |   CRITERIO              |
        |item         |   Igual a Camisa CIN    |
        |date         |   Igual a 2024-05-14    |
        |price        |   Acima de 30.00        |