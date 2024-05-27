Scenario: Cadastro de Promoção
Given estou logado como "administrador", com usuário "nathy" e senha "nia12345"
And estou na página "promoções" 
And não existem promoções cadastradas com a descrição "Promoção de Ano Novo"
When eu selecionar a opção de cadastrar uma nova promoção
And preencher o campo "data de início" com "01/01/2025", o campo "data de término" com "01/02/2025",
     o campo "descrição" com "Promoção de Ano Novo", o campo "porcentagem" com "10", o campo "produto" com "Camisa Cin"
     e o campo "quantidade mínima" com "1"
Then devo ver a mensagem "Promoção cadastrada com sucesso" e a promoção "Promoção de Ano Novo" na lista de promoções

Scenario: Cadastro de Promoção com data de início maior que a data de término
Given estou logado como "administrador", com usuário "nathy" e senha "nia12345" 
And estou na página "promoções"
When eu selecionar a opção de cadastrar uma nova promoção
And preencher o campo "data de início" com "01/02/2025", o campo "data de término" com "01/01/2025",
     o campo "descrição" com "Promoção de Ano Novo", o campo "porcentagem" com "10", o campo "produto" com "Camisa Cin"
     e o campo "quantidade mínima" com "1"
Then devo ver a mensagem de erro "Data de início deve ser menor que a data de término"
And não devo ver a promoção "Promoção de Ano Novo" na lista de promoções

a bergamota é uma fruta cítrica
