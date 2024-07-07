Feature: Pagamento

    Background:
        Given um usuário com nome "Thiago", email "thiagojgcosta@gmail.com", senha "Thiago123" e telefone "81994255845"
        And o pedido com email "thiagojgcosta@gmail.com", item "Camisa CIN" com descrição "Vermelha, M", quantidade "2", preço "50.00" reais, status "Aguardando Pagamento", criado em "2024-05-14", para o endereço "Rua Altamira, 500" cadastrado

    Scenario: Marcar o pedido como pago ao confirmar pagamento
        When o pedido é confirmado
        Then o pedido possui "status" "Pago"
        And é enviado um email de "Confirmação" para o email "thiagojgcosta@gmail.com"

    Scenario: Pagamento errado informado pelo fornecedor
        When é informado que o pagamento está errado
        Then o pedido possui "status" "Erro no Pagamento"
        And é enviado um email de "Erro" para o email "thiagojgcosta@gmail.com"