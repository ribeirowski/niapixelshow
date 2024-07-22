Feature: Cadastro e Manutenção de Produto 

Scenario: Cadastrar um novo produto com sucesso
  Given que estou logado como "nrc2@cin.ufpe.br", com senha "nia12345"
  When eu acessar a página "Cadastro de Produto"
  When preencher os campos nome "Camisa Nova", descrição "Algodão", preço "50", status "Sim" e categoria "Camisa"
  When seleciono a opção "PRÓXIMO"
  When seleciono a opção "Cadastrar Produto"
  Then eu devo ver uma mensagem de confirmação "Produto cadastrado com sucesso"
  Then o novo produto com nome "Camisa Nova", descrição "Algodão", preço "50", status "Sim" e categoria "Camisa" deve aparecer na lista de produtos cadastrados

