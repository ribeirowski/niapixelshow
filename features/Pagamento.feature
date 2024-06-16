Feature: Pagamento
As a usuário
I want to ser capaz de pagar os meus pedidos
So that eu possa confirmar o meu pedido e receber o produto que desejo

As a fornecedor
I want to ser capaz de receber pagamentos
So that eu possa manter meu negócio funcionando

Scenario: Visualizar qrcode para pagamento via PIX
Given eu estou logado como "Usuário" com login "thiago" e senha "Thiago1234"
And tenho cadastrado o pedido "Camisa CIN" na cor "Vermelha" na quantidade "2" com preço "50,00" reais
And estou na página "Pagamento"
When seleciono a opção "pagar"
Then eu posso ver um "qrcode" para efetuar o pagamento

Scenario: Visualizar código copia e cola para pagamento via PIX
Given eu estou logado como "Usuário" com login "thiago" e senha "Thiago1234"
And tenho cadastrado o pedido "Camisa CIN" na cor "Vermelha" na quantidade "2" com preço "50,00" reais
And estou na página "Pagamento"
When seleciona a opção "pagar"
Then eu posso ver um "código copia e cola" para efetuar o pagamento

Scenario: Receber email de confirmação de pagamento
Given eu estou logado como "Usuário" com email "thiagojgcosta@gmail.com"
And eu selecionei "Camisa CIN" em quantidade "2" na cor "Vermelha"
And eu fiz o pedido "Camisa CIN" na cor "Vermelha" na quantidade "2" com preço "50,00" reais
And estou na página "Pagamento"
When eu efetuo o pagamento de "50,00" reais
Then eu recebo no email "thiagojgcosta@gmail.com" uma notificação informando que a compra de "Camisa CIN" no valor de "50,00" reais foi confirmada

Scenario: Marcar o pedido como pago ao confirmar pagamento
Given o pedido "Camisa CIN" na cor "Vermelha" na quantidade "2" com preço "50,00" reais com status "Aguardando Pagamento"
When o pedido é confirmado
Then o pedido possui "status" "Pago"
And é enviado um email de "Confirmação" para o email "thiagojgcosta@gmail.com"

Scenario: Pagamento errado informado pelo fornecedor
Given o pedido "Camisa CIN" na cor "Vermelha" na quantidade "2" com preço "50,00" reais com status "Aguardando Pagamento"
When é informado que o pagamento está errado
Then o pedido possui "status" "Erro no Pagamento"
And é enviado um email de "Erro" para o email "thiagojgcosta@gmail.com"