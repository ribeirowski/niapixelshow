Funcionalidade: Cadastro e Manutencao do Produto

Cenário de Serviço: Cadastro do Produto Bem-Sucedido
  Given que o ProductRepository não possui um produto com o nome "Camisa Nova"
  When uma requisição POST é enviada para "/products" com o corpo da requisição em JSON:
    """
    {
      "nome": "Camisa Nova",
      "descrição": "Algodão",
      "preço": 50,
      "status": "Disponível",
      "categoria": "Camisas"
    }
    """
  Then o status da resposta deve ser "201"
  And o JSON de resposta deve conter o nome "Camisa Nova"
  And o JSON de resposta deve conter a descrição "Algodão"
  And o JSON de resposta deve conter o preço 50
  And o JSON de resposta deve conter o status "Disponível"
  And o JSON de resposta deve conter a categoria "Camisas"
