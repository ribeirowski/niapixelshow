Feature: Fornecedores
As a administrador,
I want to cadastrar, atualizar e desativar produtos no sistema de e-commerce,
So that eu possa gerenciar meu catálogo de produtos de forma eficiente e manter a disponibilidade atualizada para os clientes.
----------
Cenário de GUI: Inserir Novo Produto
Given que estou logado como “nathy”, com senha “nia12345”
And sou um administrador
When eu acessar a página "Cadastro de Produto"
And preencher os campos  nome ‘Camisa Nova’, descrição "Algodão", preço "R$100,00", status "Disponível" e categoria "Camisa"
And seleciono a opção “Salvar”
Then eu devo ver uma mensagem de confirmação "Produto cadastrado com sucesso"
And o novo produto com nome ‘Camisa Nova’, descrição "Algodão", preço "R$100,00", status "Disponível" e categoria "Camisa" deve aparecer na lista de produtos cadastrados

Cenário de GUI: Atualizar Produto
Given que estou logado como “nathy”, com senha “nia12345”
And sou um administrador
And eu já tenho um produto cadastrado
When eu acessar a página "Lista de Produtos"
And clicar no produto que desejo atualizar
And alterar os campos nome “Camisa Azul” e preço "R$300,00"
And salvar as atualizações
Then eu devo ver uma mensagem de confirmação "Produto atualizado com sucesso"
And as alterações devem ser refletidas na lista de produtos

Cenário de GUI: Desativar Produto
Given que estou logado como “nathy”, com senha “nia12345”
And sou um administrador
And eu já tenho um produto cadastrado com nome ‘Camisa Nova’, descrição "Algodão", preço "R$100,00", status "Disponível" e categoria "Camisa"
When eu acessar a página "Lista de Produtos"
And desativar o produto que desejo 
Then eu devo ver uma mensagem de confirmação "Produto desativado com sucesso"
And  o produto com nome ‘Camisa Nova’, descrição "Algodão", preço "R$100,00", status "Disponível" e categoria "Camisa" deve desaparecer na lista de produtos