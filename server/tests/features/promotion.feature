Feature: Gerenciamento de Promoções

  Scenario: Cadastro de Promoção
    Given estou logado como administrador com email "nrc2@cin.ufpe.br", senha "nia12345"
    And não existem promoções cadastradas com a descrição "Promoção de Ano Novo"
    And existem produtos cadastrados com o id "Camisa Cin"
    When eu faço uma requisição POST para "/promotion" com os dados:
      """
      {
        "start_date": "01/01/2025",
        "end_date": "01/02/2025",
        "name": "Promoção de Ano Novo",
        "discount": 10,
        "product_id": "Camisa Cin",
        "active": true
      }
      """
    Then a resposta deve ter status 201
    And uma mensagem de sucesso "Promotion created successfully" deve ser retornada

  # Scenario: Editar promoção
  #   Given estou logado como administrador com email "nrc2@cin.ufpe.br", senha "nia12345"
  #   And existem promoções cadastradas com o id "1"
  #   When eu fizer uma requisição PUT para "/promotion/1" com os dados:
  #     """
  #     {
        # "start_date": "01/01/2025",
        # "end_date": "01/02/2025",
        # "name": "Promoção de Ano Novo",
        # "discount": 20,
        # "product_id": "Camisa Cin",
        # "active": true
        # }
  #     """
  #   Then a resposta deve ter status 200
  #   And uma mensagem de sucesso "Promotion updated successfully" deve ser retornada

  # Scenario: Listar promoções
  #   Given estou logado como administrador com email "nrc2@cin.ufpe.br", senha "nia12345"
  #   And existem promoções cadastradas
  #   When eu fizer uma requisição GET para "/promotion"
  #   Then o sistema deve retornar status 200
  #   And a resposta deve ser uma lista com todas as promoções

  # Scenario: Listar promoção por id
  #   Given estou logado como administrador com email "nrc2@cin.ufpe.br", senha "nia12345"
  #   And existem promoções cadastradas com o id "1"
  #   When eu fizer uma requisição GET para "/promotion/1"
  #   Then o sistema deve retornar status 200
  #   And a resposta deve ser a promoção com id "1"

  # Scenario: Excluir promoção
  #   Given estou logado como administrador com email "nrc2@cin.ufpe.br", senha "nia12345"
  #   And existem promoções cadastradas com o id "1"
  #   When eu fizer uma requisição DELETE para "/promotion/1"
  #   Then a resposta deve ter status 200
  #   And uma mensagem de sucesso "Promotion deleted successfully" deve ser retornada




