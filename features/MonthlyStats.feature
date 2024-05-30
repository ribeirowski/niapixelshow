As a administrator
I want to see monthly stats like revenue and products sold
So that I can make informed decisions when administrating my web store

Scenario: Acesso às estatísticas gerais dos pedidos
Given que estou na página “Administrador”
And a estatística “vendas do mês” é “R$ 575,00”
And o produto “Camisa CIN” tem unidades vendidas como “20” e preço como “R$ 25,00”
And o produto “Caneca CIN” tem unidades vendidas como “5” e preço como “R$ 15,00”
When acesso a página “Estatísticas de pedidos”
Then vejo as estatísticas “vendas do mês” e “produto mais vendido” como “R$ 575,00” e “Camisa CIN” respectivamente
And vejo uma tabela com o produto “Camisa CIN” com unidades vendidas “20” e preço “R$ 25,00” e o produto “Caneca CIN” com unidades vendidas “5” e preço “R$ 15,00”

Scenario: Atualização de estatísticas por ciclo mensal
Given estou no mês “Janeiro”
And não há pedidos feitos no mês “Janeiro”
When acesso a página “Estatísticas de pedidos”
 Then vejo as estatísticas “vendas do mês” e “produto mais vendido” como “R$ 0,00” e “Nenhum” respectivamente
And vejo a tabela de produtos com todos os produtos tendo seu valor de unidades vendidas como “0”

Scenario: Atualização de estatísticas por cadastro de pedido
Given a estatística “vendas do mês” é “R$ 575,00”
And o produto “Camisa CIN” tem unidades vendidas como “20” e preço como “R$ 25,00”
And o produto “Caneca CIN” tem unidades vendidas como “5” e preço como “R$ 15,00”
And é cadastrado um pedido de “Caneca CIN” com quantidade “30”
When acesso a página “Estatísticas de pedidos”
Then vejo as estatísticas “vendas do mês” e “produto mais vendido” como “R$ 1025,00” e “Caneca CIN” respectivamente
And vejo uma tabela com o produto “Camisa CIN” com unidades vendidas “20” e preço “R$ 25,00” e o produto “Caneca CIN” com unidades vendidas “35” e preço “R$ 15,00”

Scenario: Cadastro de novo produto
Given o sistema não tem cadastrado um produto “Boia CIN”
When é cadastrado o produto “Boia CIN” com preço “R$ 140,00”
And acesso a página “Estatísticas de pedidos”
Then vejo na tabela de produtos um novo produto “Boia CIN”, com unidades vendidas “0” e preço “R$ 140,00”

Scenario: Desativação de produto
Given o sistema tem cadastrado um produto “Boia CIN” com preço “R$ 140,00” e unidades vendidas “100”
And a estatística “vendas do mês” é “R$ 14575,00”
And a estatística “produto mais vendido” é “Boia CIN”
And é desativado o produto “Boia CIN”
When acesso a página “Estatísticas de pedidos”
Then vejo as estatísticas “vendas do mês” e “produto mais vendido” como “R$ 14575,00” e “Boia CIN” respectivamente
And vejo na tabela de produtos o produto “Boia CIN”, com unidades vendidas “100” e preço “R$ 140,00”, marcado como desativado

Scenario: Ciclo mensal com remoção de produto
Given estou no mês “Dezembro”
And o produto “Boia CIN” está marcado como desativado na tabela de produtos
And entro no mês “Janeiro”
When acesso a página “Estatísticas de pedidos”
Then não vejo um produto “Boia CIN” na tabela de produtos