Feature: Tela Inicial Ecommerce
As a "cliente"
I want to navegar na página inicial do ecommerce
So that I can ver os produtos e promoções de forma intuitiva

Scenario: Acessar a página inicial como visitante
Given que acesso a página inicial como "visitante"
Then devo ver uma nav bar com as opções "Home", "Produtos", "Promoções", "Carrinho", "Sobre nós" e "Login"
And devo ver uma lista de produtos em destaque
And devo ver uma lista de promoções em destaque

Scenario: Acessar a página inicial como cliente logado
Given que acesso a página inicial como "victoria", com a senha "enio123"
Then devo ver uma nav bar com as opções "Home", "Produtos", "Promoções", "Carrinho", "Sobre nós" e "Meu Perfil"
And devo ver uma lista de produtos em destaque
And devo ver uma lista de promoções em destaque

Scenario: Acessar a página inicial como admin
Given que acesso a página inicial como "nathy", com a senha "admin123"
Then devo ver uma nav bar com as opções "Home", "Produtos", "Promoções", "Carrinho", "Meu Perfil", "Sobre nós" e "Admin"
And devo ver uma lista de produtos em destaque
And devo ver uma lista de promoções em destaque

Scenario: selecionar um produto em destaque
Given que acesso a página inicial como "visitante"
When seleciono em um produto em destaque
Then devo ser redirecionado para a página do produto

Scenario: selecionar uma promoção em destaque
Given que acesso a página inicial como "visitante"
When seleciono em promoção em destaque
Then devo ser redirecionado para a página da promoção

Scenario: acessar a página "sobre nós"
Given que acesso a página inicial como "visitante"
When seleciono a opção "Sobre nós"
Then devo ser redirecionado para a página "Sobre nós"

Scenario: acessar a página "login"
Given que acesso a página inicial como "visitante"
When seleciono "Login"
Then devo ser redirecionado para a página "Login"

Scenario: acessar a página "carrinho"
Given que acesso a página inicial como "visitante"
When seleciono "Carrinho"
Then devo ser redirecionado para a página "Carrinho"

Scenario: acessar a página "meu perfil"
Given que acesso a página inicial como "victoria", com a senha "enio123"
When seleciono "Meu Perfil"
Then devo ser redirecionado para a página "Meu Perfil"

Scenario: acessar a página "admin"
Given que acesso a página inicial como "nathy", com a senha "admin123"
When seleciono "Admin"
Then devo ser redirecionado para a página "Admin"

Scenario: acessar a página "produtos"
Given que acesso a página inicial como "visitante"
When seleciono "Produtos"
Then devo ser redirecionado para a página "Produtos"

Scenario: acessar a página "promoções"
Given que acesso a página inicial como "visitante"
When seleciono "Promoções"
Then devo ser redirecionado para a página "Promoções"

Scenario: pesquisar um produto cadastrado
Given que acesso a página inicial como "visitante"
When pesquiso por um produto "camisa" na barra de pesquisa
And existe um produto cadastrado com o nome "camisa"
Then devo ver o produto "camisa" na lista de produtos
And ver outras opções de produtos relacionados

Scenario: pesquisar um produto não cadastrado
Given que acesso a página inicial como "visitante"
When pesquiso por um produto "camisa" na barra de pesquisa
And não existe um produto cadastrado com o nome "camisa"
Then devo ver uma mensagem de erro "Produto não encontrado"
And ver outras opções de produtos relacionados



