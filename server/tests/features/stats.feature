Feature: Estatísticas de Vendas

Scenario: Requisição de Estatísticas
Given eu estou autenticado como administrador com email "nrc2@cin.ufpe.br" e senha "nia12345" e tenho um token JWT válido
And o banco de dados tem pedido com qtd "2", date "0001-01-01", item "Camisa Nova", price "50.00", description "Vermelha, M", addr "Rua umburanas, 40", email "thiagojgcosta@gmail.com" e status "Pago"
When são requisitadas as estatísticas de vendas
Then o sistema retorna vendas totais "50", produto mais vendido "Camisa Nova" e tabela de produtos com produto "Camisa Nova" com quantidade "2" e valor total "50"

Scenario: Requisição sem Pedidos Pagos
Given eu estou autenticado como administrador com email "nrc2@cin.ufpe.br" e senha "nia12345" e tenho um token JWT válido
And o banco de dados não tem pedidos
When são requisitadas as estatísticas de vendas
Then o sistema retorna vendas totais "0", produto mais vendido "none" e tabela de produtos com produto "" com quantidade "0" e valor total "0"