Feature: Cadastro e Manutenção da Categoria 

    Scenario: Administrador Adiciona uma nova Categoria de Produto
        Given o administrador de nome ligia, e mail ligiaferropadilha@gmail.com e senha “liginha123” está logado no painel de administração do e-commercen na página "Gerenciamento de Categorias"
        When ele seleciona a opção “Adicionar Nova Categoria”
        And o sistema valida se todos os dados estão preenchidos
        And o sistema valida que os campos "nome", "descrição" estão válidos
        Then o sistema salva a categoria e o administrador recebe uma confirmação de sucess
    
    Scenario: Erro ao Adicionar uma nova Categoria de Produto
        Given o administrador de nome ligia, e mail ligiaferropadilha@gmail.com e senha “liginha123” está logado no painel de administração do e-commercen na página "Gerenciamento de Categorias"
        When ele seleciona a opção “Adicionar Nova Categoria”
        Then o sistema valida se os campos obrigatórios foram preenchidos 
        And uma mensagem de erro é retornada
    
    Scenario: Administrador Edita uma Categoria Existente 
        Given o administrador de nome ligia, e mail ligiaferropadilha@gmail.com e senha “liginha123” está logado no painel de administração do e-commercen na página "Gerenciamento de Categorias"
        When ele seleciona a opção “editar” para a categoria “Camisetas Personalizadas” e altera seu nome para "Camisetas Temáticas"
        Then o sistema verifica se o novo nome é válido
        And o sistema salva a categoria atualizada e retorna uma mensagem de confirmação
    
    Scenario: Administrador Remove uma Categoria Existente 
        Given o administrador de nome ligia, e mail ligiaferropadilha@gmail.com e senha “liginha123” está logado no painel de administração do e-commercen na página "Gerenciamento de Categorias"
        When ele seleciona a opção “remover” para a categoria “Promoções Temporárias”
        Then o sistema salva a remoção da categoria e retorna uma mensagem de confirmação