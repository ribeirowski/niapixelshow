Feature: Cadastro e Manutenção de Produto 

Scenario: Cadastrar um novo produto com sucesso
  Given que estou logado como "nrc2@cin.ufpe.br", com senha "nia12345"
  Given que estou na página "product/create"
  When preencher os campos nome "Camisa Nova", descrição "Algodão", preço "50", status "Sim" e categoria "Camisa"
  And seleciono a opção "PRÓXIMO"
  And seleciono a opção "Cadastrar Produto"
  Then eu devo ver uma mensagem de confirmação "Produto cadastrado com sucesso"
  Then o novo produto com nome "Camisa Nova", descrição "Algodão", preço "50", status "Sim" e categoria "Camisa" deve aparecer na lista de produtos cadastrados

Scenario: Editar um produto com sucesso
  Given que estou logado como "nrc2@cin.ufpe.br", com senha "nia12345"
  Given que estou na página "product"
  Given que eu tenho um produto cadastrado
  When clicar na opção "EDITAR PRODUTO" do produto com nome "Camisa Nova" 
  And alterar os campos nome para "Camisa Azul" e preço para "60"
  And seleciono a opção "PRÓXIMO"
  And seleciono a opção "Salvar Produto"
  Then eu devo ver uma mensagem de confirmação "Produto atualizado com sucesso"
  Then o novo produto com nome "Camisa Azul", descrição "Algodão", preço "60", status "Sim" e categoria "Camisa" deve aparecer na lista de produtos cadastrados

Scenario: Excluir um produto com sucesso
  Given que estou logado como "nrc2@cin.ufpe.br", com senha "nia12345"
  Given que estou na página "product"
  Given que eu tenho um produto cadastrado
  When clicar na opção "EDITAR PRODUTO" do produto com nome "Camisa Nova" 
  And seleciono a opção "PRÓXIMO"
  And seleciono a opção "Excluir Produto"
  Then eu devo ver uma mensagem de confirmação "Produto excluído com sucesso"
  Then o produto com nome "Camisa Nova" deve desaparecer na lista de produtos cadastrados