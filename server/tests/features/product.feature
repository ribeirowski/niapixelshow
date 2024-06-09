Feature: Cadastro e Manutenção do Produto

  Scenario: Cadastro do Produto Bem-Sucedido
    Given que o banco de dados de produto está vazio
    When o fornecedor submete um formulário de cadastro de produto com nome "Camisa Nova", descrição "Algodão", preço "50", status "Disponível", categoria "Camisas"
    Then o sistema valida que os campos "nome", "descrição", "preço", "status" e "categoria" estão preenchidos
    And o sistema verifica que todos os dados estão válidos
    Then o sistema salva o produto no banco de dados e retorna uma confirmação de sucesso
