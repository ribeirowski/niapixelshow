Feature: Carrinho

    Scenario: Adicionar o pedido ao carrinho com sucesso 
        Given o cliente de login "nrc2@cin.ufpe.br" e senha "nia12345" está logado na loja
        And está na página de "produtos"
        When o cliente tenta adicionar uma "Camisa Preta" de tamanho "G" e quantidade "2" ao carrinho
        Then ele vê uma mensagem de confirmação de adição do produto

    Scenario: Confirmação de remoção de pedido
		Given o cliente de login "nrc2@cin.ufpe.br" e senha "nia12345" está logado na loja
		And está na página "carrinho de compras"
		And ele tem um produto "Camisa Preta" no carrinho
		When ele tenta remover o produto "Camisa Preta"
		Then ele pode ver o carrinho sem o produto "Camisa Preta"

    Scenario: Editar o tamanho do pedido no carrinho de pedidos  
        Given o cliente de login "nrc2@cin.ufpe.br" e senha "nia12345" está logado na loja
        And está na página do "carrinho de compras"
        And ele tem um pedido no carrinho com uma camisa "Camisa Preta" de tamanho "M" e quantidade "1"
        When ele seleciona a opção "editar" o tamanho do pedido "Camisa Preta"
        And ele altera o tamanho da camisa "Camisa Preta" para "G"
        Then ele pode ver o produto "Camisa Preta" atualizado com a camisa de tamanho "G" e quantidade "1"

    Scenario: Editar o tamanho do pedido no carrinho de pedidos  
        Given o cliente de login "nrc2@cin.ufpe.br" e senha "nia12345" está logado na loja
        And está na página do "carrinho de compras"
        And ele tem um pedido no carrinho com uma camisa "Camisa Preta" de tamanho "M" e quantidade "1"
        When ele seleciona a opção "editar" a quantidade do pedido "Camisa Preta"
        And ele altera a quantidade da camisa "Camisa Preta" para "15"
        Then ele pode ver o produto "Camisa Preta" atualizado com a camisa de tamanho "M" e a quantidade "51"
