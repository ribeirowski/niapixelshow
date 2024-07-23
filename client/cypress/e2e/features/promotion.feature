Feature: Gerenciamento de Promoção

    Scenario: Cadastrar uma nova promoção com sucesso
        Given que estou logado como "nrc2@cin.ufpe.br", com senha "nia12345"
        Given que estou na página "Cadastro de Promoção"
        When preencher os campos name "Promoção de Inverno", discount "50", start_date "01/06/2021", end_date "01/07/2021", product_id "Camisa Roxa"
        And seleciono a opção "Cadastrar"
        Then eu devo ver uma mensagem de confirmação "Promoção cadastrada com sucesso!"

    Scenario: Cadastrar uma nova promoção com campos não preenchidos
        Given qque eu sou logado como "nrc2@cin.ufpe.br", com senha "nia12345"
        Given que estou na página de criaaaaarr "Promoção"
        When preenchO os campos name "", discount "50", start_date "01/06/2021", end_date "01/07/2021", product_id "Camisa Roxa"
        And seleciona-se a opção "Cadastrar"
        Then eu devo ver uma mensagem de ERRO "required"
        

    Scenario: Editar uma promoção com campos preenchidos
        Given que estou logada como "nrc2@cin.ufpe.br", com senha "nia12345"
        And que estou naaaa páginaaaaaa "Promoção"
        And que eu tenho uma promoção cadastrada
        When clicar na opção "editar" da promoção do produto "Camisa Roxa"
        When preencher os camposs name "Promoção de Inverno", discount "60", start_date "01/06/2021", end_date "01/07/2021", product_id "Camisa Preta"
        And seleciono a opção "Atualizar"
        Then eu devo ver um mensagem de confirmação "Promoção salva com sucesso!"

    # Scenario: Editar uma promoção com campos não preenchidos
    #     Given que estou logado como "nrc2@cin.ufpe.br", com senha "nia12345"
    #     And que estou na página "Promoção"
    #     And que eu tenho uma promoção cadastrada
    #     When clicar na opção "EDITAR PROMOÇÃO" da promoção do produto "Camisa Azul"
    #     And alterar os campos {
    #         "name": "",
    #         "discount": "60",
    #         "start_date": "01/06/2021",
    #         "end_date": "01/07/2021",
    #         "product_id": "Camisa Azul"
    #     }
    #     And seleciono a opção "Salvar Promoção"
    #     Then eu devo ver uma mensagem de erro "required"

