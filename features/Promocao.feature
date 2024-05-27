Scenario: Cadastro de Promoção
Given estou logado como "administrador", com usuário "nathy" e senha "nia12345"
And estou na página "promoções" 
And não existem promoções cadastradas com a descrição "Promoção de Ano Novo"
When eu selecionar a opção de cadastrar uma nova promoção
And preencher o campo "data de início" com "01/01/2025", o campo "data de término" com "01/02/2025",
     o campo "descrição" com "Promoção de Ano Novo", o campo "porcentagem" com "10", o campo "produto" com "Camisa Cin"
     e o campo "quantidade mínima" com "1"
Then devo ver a mensagem "Promoção cadastrada com sucesso" e a promoção "Promoção de Ano Novo" na lista de promoções

Scenario: Excluir Promoção
Given estou logado como "administrador", com usuário "nathy" e senha "nia12345"
And estou na página "promoções"
And existe uma promoção cadastrada com a descrição "Promoção de Ano Novo"
When eu selecionar a opção de remover a promoção "Promoção de Ano Novo"
Then devo ver a mensagem "Promoção removida com sucesso"
And não devo ver a promoção "Promoção de Ano Novo" na lista de promoções

Scenario: Editar Promoção
Given estou logado como "administrador", com usuário "nathy" e senha "nia12345"
And estou na página "promoções"
And existe uma promoção cadastrada com a descrição "Promoção de Ano Novo", com porcentagem "10",
    produto "Camisa Cin" e quantidade mínima "1", com data de início "01/01/2025" e data de término "01/02/2025"
When eu selecionar a opção de editar a promoção "Promoção de Ano Novo"
And preencher o campo "data de início" com "01/01/2026", o campo "data de término" com "01/02/2026",
     o campo "descrição" com "Promoção de Ano Novo 2", o campo "porcentagem" com "20", o campo "produto" com "Camisa Preta"
     e o campo "quantidade mínima" com "2"
Then devo ver a mensagem "Promoção editada com sucesso"
And não devo ver a promoção "Promoção de Ano Novo" na lista de promoções
And devo ver a promoção "Promoção de Ano Novo 2" na lista de promoções

Scenario: Cadastro de Promoção com data de início maior que a data de término
Given estou logado como "administrador", com usuário "nathy" e senha "nia12345" 
And estou na página "promoções"
When eu selecionar a opção de cadastrar uma nova promoção
And preencher o campo "data de início" com "01/02/2025", o campo "data de término" com "01/01/2025",
     o campo "descrição" com "Promoção de Ano Novo", o campo "porcentagem" com "10", o campo "produto" com "Camisa Cin"
     e o campo "quantidade mínima" com "1"
Then devo ver a mensagem de erro "Data de início deve ser menor que a data de término"
And não devo ver a promoção "Promoção de Ano Novo" na lista de promoções

Scenario: Cadastro de Promoção com porcentagem maior que 100
Given estou logado como "administrador", com usuário "nathy" e senha "nia12345"
And estou na página "promoções"
When eu selecionar a opção de cadastrar uma nova promoção
And preencher o campo "data de início" com "01/01/2025", o campo "data de término" com "01/02/2025",
     o campo "descrição" com "Promoção de Ano Novo", o campo "porcentagem" com "101", o campo "produto" com "Camisa Cin"
     e o campo "quantidade mínima" com "1"
Then devo ver a mensagem de erro "Porcentagem deve ser um valor entre 0 e 100"
And não devo ver a promoção "Promoção de Ano Novo" na lista de promoções