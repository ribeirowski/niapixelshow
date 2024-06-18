Feature: Histórico de pedidos do Usuário

    Scenario: Retornar pedidos no histórico de pedidos com pedidos cadastrados
        Given um usuário com nome "Thiago", email "thiagojgcosta@gmail.com", senha "Thiago123" e telefone "81994255845"
        And tem cadastrado o pedido com usuário "thiagojgcosta@gmail.com", item "Camisa CIN" com descrição "Vermelha", quantidade "2", tamanho "M", preço "50,00" reais, status "Pago", criado em "14/05/2024", para o endereço "Rua Altamira, 500"
        When acessar a página de "Histórico de Pedidos"
        Then é retornado o pedido com usuário "thiagojgcosta@gmail.com", item "Camisa CIN" com descrição "Vermelha", quantidade "2", tamanho "M", preço "50,00" reais, status "Pago", criado em "14/05/2024", para o endereço "Rua Altamira, 500"

    Scenario: Retornar mensagem no histórico de pedidos sem pedidos cadastrados
        Given um usuário com nome "Thiago", email "thiagojgcosta@gmail.com", senha "Thiago123" e telefone "81994255845"
        And está na página "Usuário"
        And não tem cadastrado nenhum pedido
        When acessar a página de "Histórico de Pedidos"
        Then é retornada uma mensagem informando que não há pedidos cadastrados

    Scenario: Retornar pedidos filtrados
        Given um usuário com nome "Thiago", email "thiagojgcosta@gmail.com", senha "Thiago123" e telefone "81994255845"
        And eu tenho o pedido com email "thiagojgcosta@gmail.com", item "Camisa CIN" com descrição "Vermelha", quantidade "2", tamanho "M", preço "50,00" reais, status "Pago", criado em "14/05/2024", para o endereço "Rua Altamira, 500" cadastrado
        And eu tenho o pedido com email "thiagojgcosta@gmail.com", item "Caneca CIN" com descrição "Preta", quantidade "1", tamanho "U", preço "20,00" reais, status "Pago", criado em "13/05/2024", para o endereço "Rua Altamira, 500" cadastrado 
        When filtrar por <FILTRO> <CRITERIO>
        Then é retornado o pedido com usuário "thiagojgcosta@gmail.com", item "Camisa CIN" com descrição "Vermelha", quantidade "2", tamanho "M", preço "50,00" reais, status "Pago", criado em "14/05/2024", para o endereço "Rua Altamira, 500"

        Examples:
        FILTRO       |   CRITERIO
        Item         |   Camisa CIN
        Data         |   14/05/2024
        Preço        |   Acima de R$ 30,00