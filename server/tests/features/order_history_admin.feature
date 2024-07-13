Feature: Histórico de Pedidos Fornecedor

  Scenario: Acesso ao histórico de pedidos com pedidos cadastrados
    Given eu estou autenticado como administrador com email "nrc2@cin.ufpe.br" e senha "nia12345" e tenho um token JWT válido
    And eu tenho o pedido com email do cliente "thiagojgcosta@gmail.com", item "Camisa CIN" com descrição "Vermelha", quantidade "2", preço "50,00" reais, status "Pago", criado em "2024-05-14", para o endereço "Rua Altamira, 500" cadastrado
    And eu tenho o pedido com email do cliente "thiagojgcosta@gmail.com", item "Caneca CIN" com descrição "Preta", quantidade "1", preço "20,00" reais, status "Pago", criado em "2024-05-13", para o endereço "Rua Altamira, 500" cadastrado
    When eu acesso a página "Histórico de Pedidos" do fornecedor
    Then é retornado o pedido com email do cliente "thiagojgcosta@gmail.com", item "Camisa CIN" com descrição "Vermelha", quantidade "2", preço "50,00" reais, status "Pago", criado em "2024-05-14", para o endereço "Rua Altamira, 500" cadastrado
    And é retornado o pedido com email do cliente "thiagojgcosta@gmail.com", item "Caneca CIN" com descrição "Preta", quantidade "1", preço "20,00" reais, status "Pago", criado em "2024-05-13", para o endereço "Rua Altamira, 500" cadastrado

  Scenario: Acesso ao histórico de pedidos sem pedidos cadastrados
    Given eu estou autenticado como administrador com email "nrc2@cin.ufpe.br" e senha "nia12345" e tenho um token JWT válido
    And não há pedidos cadastrados no sistema
    When eu acesso a página "Histórico de Pedidos" do fornecedor
    Then o sistema retorna uma mensagem indicando que não há pedidos cadastrados

  Scenario: Filtro de histórico de pedidos com pedidos cadastrados em um período específico
    Given eu estou autenticado como administrador com email "nrc2@cin.ufpe.br" e senha "nia12345" e tenho um token JWT válido
    And eu tenho o pedido com email do cliente "thiagojgcosta@gmail.com", item "Camisa CIN" com descrição "Vermelha", quantidade "2", preço "50,00" reais, status "Pago", criado em "2024-05-14", para o endereço "Rua Altamira, 500" cadastrado
    And eu tenho o pedido com email do cliente "thiagojgcosta@gmail.com", item "Caneca CIN" com descrição "Preta", quantidade "1", preço "20,00" reais, status "Pago", criado em "2024-05-13", para o endereço "Rua Altamira, 500" cadastrado
    When eu acesso a página "Histórico de Pedidos" do fornecedor
    And eu filtro os pedidos com data inicial "2024-05-13" e data final "2024-05-14"
    Then é retornado o pedido com email do cliente "thiagojgcosta@gmail.com", item "Camisa CIN" com descrição "Vermelha", quantidade "2", preço "50,00" reais, status "Pago", criado em "2024-05-14", para o endereço "Rua Altamira, 500" cadastrado
    And é retornado o pedido com email do cliente "thiagojgcosta@gmail.com", item "Caneca CIN" com descrição "Preta", quantidade "1", preço "20,00" reais, status "Pago", criado em "2024-05-13", para o endereço "Rua Altamira, 500" cadastrado
    
  Scenario: Exportação de histórico de pedidos com pedidos cadastrados
    Given eu estou autenticado como administrador com email "nrc2@cin.ufpe.br" e senha "nia12345" e tenho um token JWT válido
    And eu tenho o pedido com email do cliente "thiagojgcosta@gmail.com", item "Camisa CIN" com descrição "Vermelha", quantidade "2", preço "50,00" reais, status "Pago", criado em "2024-05-14", para o endereço "Rua Altamira, 500" cadastrado
    And eu tenho o pedido com email do cliente "thiagojgcosta@gmail.com", item "Caneca CIN" com descrição "Preta", quantidade "1", preço "20,00" reais, status "Pago", criado em "2024-05-13", para o endereço "Rua Altamira, 500" cadastrado
    When eu acesso a página "Histórico de Pedidos" do fornecedor
    And eu seleciono a opção de exportar o histórico de pedidos
    Then eu recebo um arquivo de exportação contendo os pedidos