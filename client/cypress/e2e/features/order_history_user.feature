Feature: Histórico de Pedidos do Usuário

Scenario: Acesso ao histórico de pedidos com pedidos cadastrados
   Given eu estou logado com email "tjgc@cin.ufpe.br" e senha "Thiago2604"
   And eu fiz o pedido do produto "Camisa Branca" de tamanho "PP" e quantidade "2"
   And eu fiz o pedido do produto "Camisa Roxa" de tamanho "M" e quantidade "2"
   When eu seleciono a opção de ir para a página "Pedidos"
   Then eu posso ver na tabela de pedidos o pedido com item "Camisa Branca", descrição "Algodão", preço "100.00" reais, status "Aguardando Pagamento"
   And eu posso ver na tabela de pedidos o pedido com item "Camisa Roxa", descrição "Algodão", preço "100.00" reais, status "Aguardando Pagamento"

Scenario: Acesso ao histórico de pedidos sem pedidos cadastrados
   Given eu estou logado com email "tagocoisado@gmail.com" e senha "Titi12345"
   And não tenho pedidos cadastrados
   When eu seleciono a opção de ir para a página "Pedidos"
   Then eu vejo uma mensagem de aviso que "Nenhum pedido encontrado"

Scenario: Filtrar produtos no histórico de pedidos
   Given eu estou logado com email "tjgc@cin.ufpe.br" e senha "Thiago2604"
   And eu fiz o pedido do produto "Camisa Branca" de tamanho "PP" e quantidade "2"
   And eu fiz o pedido do produto "Camisa Roxa" de tamanho "M" e quantidade "2"
   And estou na página "Pedidos"
   When eu seleciono a opção de filtrar por "<FILTRO>" "<CRITERIO>" "<VALOR>"
   Then eu posso ver na tabela de pedidos o pedido com item "Camisa Branca", descrição "Algodão", preço "100.00" reais, status "Aguardando Pagamento"

Examples:
   |FILTRO           |   CRITERIO       |      VALOR     |
   |name             |   same           |  Camisa Branca |
   |price            |   high           |    30.00       |

Scenario: Abrir detalhamento de um pedido
   Given eu estou logado com email "tjgc@cin.ufpe.br" e senha "Thiago2604"
   And eu fiz o pedido do produto "Camisa Roxa" de tamanho "M" e quantidade "2"
   And estou na página "Pedidos"
   When eu seleciono a opção de detalhar o pedido com item "Camisa Roxa", descrição "Algodão", preço "100" reais, status "Aguardando Pagamento"
   Then estou na página "Detalhamento de Pedido"