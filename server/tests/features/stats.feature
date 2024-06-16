Feature: Estatísticas de Vendas

Valores com "pedido X" dependem da estrutura do DTO pedido
Scenario: Requisição de Estatística Vendas Totais
Given o banco de dados de pedido tem pedido X
And o banco de dados de pedido tem pedido Y
When é requisitada a estatística vendas totais
Then o sistema retorna vendas totais Z

Scenario: Requisição de Estatística Tabela de Vendas
Given o banco de dados de pedido tem pedido X
And o banco de dados de pedido tem pedido Y
When é requisitada a tabela de vendas
Then o sistema retorna produto X com suas vendas totais e preço
And o sistema retorna produto Y com suas vendais totais e preço

Scenario: Requisição de Estatística Produto Mais Vendido
Given o banco de dados de pedido tem pedido X
And o banco de dados de pedido tem pedido Y
When é requisitada a estatística produto mais vendido
Then o sistema retorna produto mais vendido Z

Scenario: Requisição de Estatística Vendas Totais com Banco de Dados vazio
Given o banco de dados de pedido está vazio
When é requisitada a estatística de vendas totais
Then o sistema retorna vendas totais 0

Scenario: Requisição de Estatística Tabela de Vendas com Banco de Dados vazio
Given o banco de dados de pedido está vazio
When é requisitada a tabela de vendas
Then o sistema retorna mensagem de erro "não há pedidos registrados"

Scenario: Requisição de Estatística Produto Mais Vendido com Banco de Dados Vazio
Given o banco de dados de pedido está vazio
When é requisitada a estatística produto mais vendido
Then o sistema retorna mensagem de erro "não há pedidos registrados"