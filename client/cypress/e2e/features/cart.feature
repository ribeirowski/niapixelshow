 Feature: Carrinho

     Scenario: Adicionar o pedido ao carrinho vazio
         Given o cliente de login "nrc2@cin.ufpe.br" e senha "nia12345" está logado na loja
         And está na página do produto “Camisa Preta”
         When o cliente tenta adicionar 1 quantidade de camisa de tamanho “P” ao carrinho
         Then ele vê uma mensagem de confirmação de adição do produto