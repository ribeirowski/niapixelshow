Feature: Pagamento
As a usuário
I want to ser capaz de pagar os meus pedidos
So that eu possa confirmar o meu pedido e receber o produto que desejo

Scenario: Gerar qrcode para pagamento via PIX
Given um usuário com login “thiago” e senha “Thiago1234”
And fez o pedido “Camisa CIN” na cor “Vermelha” na quantidade “2” com preço “50,00” reais
And está na página “Pagamento”
When seleciona a opção “pagar”
Then é gerado um “qrcode” para pagamento no valor de “50,00” reais
And é mostrado para o usuário “thiago”

Scenario: Gerar código copia e cola para pagamento via PIX
Given um usuário com login “thiago” e senha “Thiago1234”
And fez o pedido “Camisa CIN” na cor “Vermelha” na quantidade “2” com preço “50,00” reais
And está na página “Pagamento”
When seleciona a opção “pagar”
Then é gerado um “código copia e cola” para pagamento no valor de “50,00” reais
And é mostrado para o usuário “thiago”

Scenario: Enviar email de confirmação do pagamento
Given um usuário com email “thiagojgcosta@gmail.com”
And fez o pedido “Camisa CIN” na cor “Vermelha” na quantidade “2” com preço “50,00” reais
And está na página “Pagamento”
When o pagamento é confirmado
Then é enviado um email para “thiagojgcosta@gmail.com” informando que a compra de “Camisa CIN” no valor de “50,00” reais foi confirmada

Scenario: Receber email de confirmação de pagamento
Given eu estou logado como “Usuário” com email “thiagojgcosta@gmail.com”
And eu selecionei “Camisa CIN” em quantidade “2” na cor “Vermelha”
And eu fiz o pedido “Camisa CIN” na cor “Vermelha” na quantidade “2” com preço “50,00” reais
And estou na página “Pagamento”
When eu efetuo o pagamento de ”50,00” reais
Then eu recebo no email “thiagojgcosta@gmail.com” uma notificação informando que a compra de “Camisa CIN” no valor de “50,00” reais foi confirmada

Scenario: Tentar fazer pagamento com quantia errada
Given eu estou logado como “Usuário” com email “thiagojgcosta@gmail.com”
And eu selecionei “Camisa CIN” em quantidade “2” na cor “Vermelha”
And eu fiz o pedido “Camisa CIN” na cor “Vermelha” na quantidade “2” com preço “50,00” reais
And estou na página “Pagamento”
When eu efetuo o pagamento de ”40,00” reais
Then eu posso ver uma mensagem de erro informando que o pagamento não teve o valor correto
And eu recebo um reembolso de “40,00” reais