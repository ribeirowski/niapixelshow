Feature: Gerenciamento de Promoções

  Scenario: Cadastro de Promoção
    Given estou logado como "administrador", com usuário "nathy" e senha "nia12345"
    And estou na página "promoções"
    And não existem promoções cadastradas com a descrição "Promoção de Ano Novo"
    When eu selecionar a opção de cadastrar uma nova promoção
    And preencher o campo "data de início" com "2025-01-01"
    And preencher o campo "data de término" com "2025-02-01"
    And preencher o campo "descrição" com "Promoção de Ano Novo"
    And preencher o campo "porcentagem" com "10"
    And preencher o campo "produto" com "Camisa Cin"
    Then a promoção "Promoção de Ano Novo" deve aparecer na lista de promoções

  Scenario: Editar promoção
    Given estou logado como "administrador", com usuário "nathy" e senha "nia12345"
    And estou na página "promoções"
    And existem promoções cadastradas com a descrição "Promoção de Ano Novo"
    When eu selecionar a opção de editar a promoção "Promoção de Ano Novo"
    And preencher o campo "data de início" com "2025-01-01"
    And preencher o campo "data de término" com "2025-02-01"
    And preencher o campo "descrição" com "Promoção de Ano Novo"
    And preencher o campo "porcentagem" com "20"
    And preencher o campo "produto" com "Camisa Cin"
    Then a promoção "Promoção de Ano Novo" deve aparecer na lista de promoções

  Scenario: Excluir promoção
    Given estou logado como "administrador", com usuário "nathy" e senha "nia12345"
    And estou na página "promoções"
    And existem promoções cadastradas com a descrição "Promoção de Ano Novo"
    When eu selecionar a opção de excluir a promoção "Promoção de Ano Novo"
    Then a promoção "Promoção de Ano Novo" não deve aparecer na lista de promoções

  Scenario: Cadastro de promoção com porcentagem menor que 0
    Given estou logado como "administrador", com usuário "nathy" e senha "nia12345"
    And estou na página "promoções"
    And não existem promoções cadastradas com a descrição "Promoção de Ano Novo"
    When eu selecionar a opção de cadastrar uma nova promoção
    And preencher o campo "data de início" com "2025-01-01"
    And preencher o campo "data de término" com "2025-02-01"
    And preencher o campo "descrição" com "Promoção de Ano Novo"
    And preencher o campo "porcentagem" com "-10"
    And preencher o campo "produto" com "Camisa Cin"
    Then a promoção "Promoção de Ano Novo" não deve aparecer na lista de promoções


