Feature: Usuário

    Scenario: Usuário se cadastra no e-commerce
    Given o usuário está na página de "Cadastro do Usuário" e insere os dados nome "Enio Henrick", e-mail "eniohenrick.17@gmail.com", telefone "81999999999", endereço "rua das uvas, 12" e senha "12345678"
    When ele aperta o botão1 "Cadastrar"
    Then ele pode ver a mensagem de confirmação de cadastro "Usuário criado com sucesso!"

    Scenario: Usuário faz login no e-commerce
    Given o usuário está na página de "Login do Usuário" e insere os dados e-mail "enioribeiro9@hotmail.com" e senha "enio2000"
    When ele aperta o botão2 "Login"
    Then ele pode ver a mensagem de confirmação de login "Login bem sucedido!"

    Scenario: Usuário faz logout no e-commerce
    Given o usuário está logado1 com os dados e-mail "enioribeiro9@hotmail.com" e senha "enio2000"
    When ele aperta o ícone1 "AccountCircleIcon"
    And ele aperta o botão3 "Logout"
    Then ele pode ver a mensagem de confirmação de logout "Usuário deslogado com sucesso!"