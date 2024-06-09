Feature: Cadastro e Manutenção do Produto

  Scenario: Cadastro do Produto Bem-Sucedido
    Given que o ProductRepository não possui um produto com o nome "Camisa Nova"
    When uma requisição POST é enviada para "/product" com o corpo da requisição em JSON:
      """
      {
        "name": "Camisa Nova",
        "description": "Algodão",
        "price": 50,
        "status": "Disponível",
        "category": "Camisas"
      }
      """
    Then o status da resposta deve ser "201"
    And o JSON da resposta deve conter o nome "Camisa Nova"
    And o JSON da resposta deve conter a descrição "Algodão"
    And o JSON da resposta deve conter o preço 50
    And o JSON da resposta deve conter o status "Disponível"
    And o JSON da resposta deve conter a categoria "Camisas"
