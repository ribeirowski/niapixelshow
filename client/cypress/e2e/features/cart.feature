Feature: Carrinho

    Scenario: Adicionar o pedido ao carrinho com sucesso 
        Given o cliente de login "nrc2@cin.ufpe.br" e senha "nia12345" está logado na loja
        And está na página de "produtos"
        When o cliente tenta adicionar uma "Camisa Nova" de tamanho "G" e quantidade "2" ao carrinho
        Then ele vê uma mensagem de confirmação de adição do produto
