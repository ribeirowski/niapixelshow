Scenario: Adicionar o pedido ao carrinho com sucesso 
    Given o cliente de login “ze” e senha “zeze” está logado na loja
    And está na página de “produtos”
    When o cliente tenta adicionar uma camisa de tamanho “P” ao carrinho
    Then ele vê uma mensagem de confirmação de adição do produto
    And pode ver a camisa de tamanho “P” no seu carrinho

Scenario: Remover um dos pedidos disponíveis do carrinho 
    Given o cliente de login “ze” e senha “zeze” está logado na loja
    And está na página “seu carrinho”
    And ele tem três itens diferentes adicionadas no carrinho
    And o primeiro produto é uma camisa “Camisa Cin 50 anos” de tamanho “P” e quantidade “1”
    And o segundo produto é uma camisa “Camisa Cin Básica” de tamanho “P” e quantidade “2”
    And o terceiro produto é uma camisa “Camisa Cin Rosa” de tamanho “P” e quantidade “1”
    When ele seleciona a opção “remover” o produto “Camisa Cin 50 anos” do carrinho
    Then ele pode ver uma tela pedindo para confirmar a remoção
