As a user
I want to see contact options
So that I can contact site administrators for support or deals

Scenario: Acesso a tela de contatos
Given que estou na tela “Tela principal”
When acesso a tela “Contatos”
Then posso ver os contatos de suporte do site, com telefone “(81) 99876-5432”, e-mail “admin@gmail.com” e whatsapp “(81) 92345-6789”