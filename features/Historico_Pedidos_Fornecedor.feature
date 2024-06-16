Feature: Histórico de Pedidos do Fornecedor
As a fornecedor,
I want to visualizar o histórico de pedidos no sistema de e-commerce,
So that eu possa acompanhar o status dos meus pedidos, identificar padrões de compra e gerenciar melhor meu estoque.
----------------------------------------------------------------
Cenário GUI: Visualizar Histórico de Pedidos
Given que estou logado como “nathy”, com senha “nia12345”
And sou um administrador
And eu já tenho um pedido registrado no sistema com as informações  nome ‘Camisa Nova’, descrição "Algodão", preço "R$100,00", status "Disponível" e categoria "Camisa"
When eu acessar a página "Histórico de Pedidos"
Then eu devo ver uma lista de pedidos com as seguintes informações data da compra “25/08/2024”, valor pago “R$100,00”, quantidade de produtos “1”, status do pedido “enviado”.

Cenário de serviço: Exportação do Histórico de Pedidos
Given que estou logado como fornecedor
And tenho pedidos registrados no sistema
When eu solicitar a exportação do histórico de pedidos no formato CSV
Then o sistema deve gerar um arquivo CSV contendo os detalhes do histórico de pedidos
And disponibilizar o arquivo para download
