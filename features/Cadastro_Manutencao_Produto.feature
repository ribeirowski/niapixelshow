Feature: Fornecedores
As a administrador,
I want to cadastrar, atualizar e desativar produtos no sistema de e-commerce,
So that eu possa gerenciar meu catálogo de produtos de forma eficiente e manter a disponibilidade atualizada para os clientes.
----------
Cenário de GUI: Inserir Novo Produto
Given que estou logado como "nathy", com senha "nia12345"
And sou um administrador
When eu acessar a página "Cadastro de Produto"
And preencher os campos  nome "Camisa Nova", descrição "Algodão", preço "R$100,00", status "Disponível" e categoria "Camisa"
And seleciono a opção "Salvar"
Then eu devo ver uma mensagem de confirmação "Produto cadastrado com sucesso"
And o novo produto com nome "Camisa Nova", descrição "Algodão", preço "R$100,00", status "Disponível" e categoria "Camisa" deve aparecer na lista de produtos cadastrados

Cenário de GUI: Atualizar Produto
Given que estou logado como "nathy", com senha "nia12345"
And sou um administrador
And eu já tenho um produto cadastrado
When eu acessar a página "Lista de Produtos"
And clicar no produto que desejo atualizar
And alterar os campos nome para "Camisa Azul" e preço para "R$300,00"
And salvar as atualizações
Then eu devo ver uma mensagem de confirmação "Produto atualizado com sucesso"
And as alterações  nome "Camisa Azul" e preço "R$300,00" devem ser refletidas na lista de produtos

Cenário de GUI: Desativar Produto
Given que estou logado como "nathy", com senha "nia12345"
And sou um administrador
And eu já tenho um produto cadastrado com nome "Camisa Nova", descrição "Algodão", preço "R$100,00", status "Disponível" e categoria "Camisa"
When eu acessar a página "Lista de Produtos"
And desativar o produto que desejo 
Then eu devo ver uma mensagem de confirmação "Produto desativado com sucesso"
And  o produto com nome "Camisa Nova", descrição "Algodão", preço "R$100,00", status "Disponível" e categoria "Camisa" deve desaparecer na lista de produtos
----------
Funcionalidade: Cadastro e Manutenção do Produto

Cenário de Serviço: Cadastro do Produto com Campo Não Preenchido
Given que o banco de dado de produto está vazio
When o fornecedor submete um formulário de cadastro de produto com nome "Camisa Nova", descrição "Algodão", preço "", status "Disponível", categoria "Camisas"
Then o sistema valida se os campos "nome", "descrição", "preço", "status" e "categoria" estão preenchidos
And o sistema verifica que o campo "preço" não está preenchido 
Then o sistema retorna uma mensagem de erro informando que todos os campos devem ser preenchidos

Cenário de Serviço: Cadastro do Produto com Preço Negativo
Given que o banco de dado de produto está vazio
When o fornecedor submete um formulário de cadastro de produto com nome "Camisa Nova", descrição "Algodão", preço "-50", status "Disponível", categoria "Camisas"
Then o sistema valida que o campo "preço" possui um valor positivo
And o sistema detecta o erro de valor negativo no campo "preço"
Then o sistema retorna uma mensagem de erro informando que o "preço" não pode ser negativo
Then o sistema registra o erro no log para auditoria

Cenário de Serviço: Cadastro do Produto Bem-Sucedido
Given que o banco de dado de produto está vazio
When o fornecedor submete um formulário de cadastro de produto com nome "Camisa Nova", descrição "Algodão", preço "50", status "Disponível", categoria "Camisas"
Then o sistema valida que os campos "nome", "descrição", "preço", "status" e "categoria" estão preenchidos
And o sistema verifica que todos os dados estão válidos
Then o sistema salva o produto no banco de dados e retorna uma confirmação de sucesso

Cenário de Serviço: Atualização do Produto com Campo Não Preenchido
Given que o produto com ID "123" existe no banco de dado de produto
When o fornecedor submete um formulário de atualização de produto com nome "Camisa Nova", descrição "", preço "50", status "Disponível", categoria "Camisas"
Then o sistema valida se os campos "nome", "descrição", "preço", "status" e "categoria" estão preenchidos
And o sistema verifica que o campo "descrição" não está preenchido
Then o sistema retorna uma mensagem de erro informando que todos os campos devem ser preenchidos

Cenário de Serviço: Atualização do Produto com Preço Negativo
Given que o produto com ID "123" existe no banco de dado de produto
When o fornecedor submete um formulário de atualização de produto com nome "Camisa Nova", descrição "Algodão", preço "-50", status "Disponível", categoria "Camisas"
Then o sistema valida que o campo "preço" possui um valor positivo
And o sistema detecta o erro de valor negativo no campo "preço"
Then o sistema retorna uma mensagem de erro informando que o "preço" não pode ser negativo
Then o sistema registra o erro no log para auditoria

Cenário de Serviço: Atualização do Produto Bem-Sucedida
Given que o produto com ID "123" existe no banco de dado de produto
When o fornecedor submete um formulário de atualização de produto com nome "Camisa Nova", descrição "Algodão", preço "50", status "Disponível", categoria "Camisas"
Then o sistema valida que os campos "nome", "descrição", "preço", "status" e "categoria" estão preenchidos
And o sistema verifica que todos os dados estão válidos
Then o sistema atualiza o produto no banco de dados e retorna uma confirmação de sucesso

Cenário de Serviço: Exclusão de Produto Bem-Sucedida
Given que o produto com ID "123" existe no banco de dado de produto
When o fornecedor submete um pedido de exclusão de produto
Then o sistema verifica que o produto existe
And o sistema remove o produto do banco de dados
Then o sistema retorna uma mensagem de confirmação de exclusão

Cenário de Serviço: Leitura de Todos os Produtos com Filtro
Given que existem vários produtos no banco de dado de produto
When o fornecedor solicita a lista de todos os produtos com filtros "categoria": "Camisas" e "preço"
Then o sistema aplica os filtros "categoria": "Camisas" e "preço"
And o sistema retorna a lista de produtos que correspondem aos filtros

Cenário de Serviço: Leitura de Produto Específico Bem-Sucedida
Given que o produto com ID "123" existe no banco de dado de produto
When o fornecedor solicita os detalhes de um produto específico
Then o sistema verifica que o produto existe
And o sistema retorna os detalhes do produto solicitado com nome "Camisa Nova", descrição "Algodão", preço "50", status "Disponível", categoria "Camisas"