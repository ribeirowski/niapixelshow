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

