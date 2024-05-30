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