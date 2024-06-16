Feature: Cadastro e Manutenção do Produto

  Scenario: Cadastro do Produto Bem-Sucedido
    Given que o banco de dados de produto está vazio
    When o fornecedor submete um formulário de cadastro de produto com nome "Camisa Nova", descrição "Algodão", preço "50", status "Disponível", categoria "Camisas"
    Then o sistema valida que os campos "nome", "descrição", "preço", "status" e "categoria" estão preenchidos
    And o sistema verifica que todos os dados estão válidos
    Then o sistema salva o produto no banco de dados e retorna uma confirmação de sucesso

 Scenario: Cadastro do Produto com Campo Não Preenchido
    Given que o banco de dados de produto está vazio
    When o fornecedor submete um formulário de cadastro de produto com nome "Camisa Nova", descrição "Algodão", preço "", status "Disponível", categoria "Camisas"
    Then o sistema valida se os campos "nome", "descrição", "preço", "status" e "categoria" estão preenchidos
    And o sistema retorna uma mensagem de erro informando que todos os campos devem ser preenchidos

 Scenario: Cadastro do Produto com Preço Negativo
  Given que o banco de dados de produto está vazio
  When o fornecedor submete um formulário de cadastro de produto com nome "Camisa Nova", descrição "Algodão", preço "-50", status "Disponível", categoria "Camisas"
  Then o sistema valida que o campo "preço" possui um valor positivo
  And o sistema retorna uma mensagem de erro informando que o "preço" não pode ser negativo

 Scenario: Atualização do Produto Bem-Sucedida
  Given que o produto com ID "123" existe no banco de dados de produto
  When o fornecedor submete um formulário de atualização de produto com nome "Camisa Azul", descrição "Algodão", preço "50", status "true", categoria "Camisas"
  Then o sistema valida que os campos "nome", "descrição", "preço", "status" e "categoria" estão preenchidos
  And o sistema atualiza o produto no banco de dados e retorna uma confirmação de sucesso

 Scenario: Atualização do Produto com Campo Não Preenchido
  Given que o produto com ID "123" existe no banco de dados de produto
  When o fornecedor submete um formulário de atualização de produto com nome "Camisa Nova", descrição "", preço "50", status "Disponível", categoria "Camisas"
  Then o sistema valida se os campos "nome", "descrição", "preço", "status" e "categoria" estão preenchidos
  And o sistema retorna uma mensagem de erro informando que todos os campos devem ser preenchidos