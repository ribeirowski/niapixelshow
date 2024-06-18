Feature: Usuario
As a usuário
I want to ser capaz de me cadastrar e logar no site
So that eu possa fazer pedidos e visualizar meu histórico de compras

Scenario: Cadastro de novo usuário com sucesso
Given que o sistema está acessível
When envio uma requisição para a API de cadastro de usuário com nome: "Enio Henrique", email: "ehnr@cin.ufpe.br", senha: "enio1234" e telefone: "81993564057"
Then recebo um e-mail de confirmação para validar meu cadastro
And o e-mail contém um link para confirmar o cadastro
And recebo uma resposta de sucesso da API
And posso verificar no banco de dados que o usuário foi registrado corretamente

Scenario: Senha curta durante o cadastro
Given que o sistema está acessível
When envio uma requisição para a API de cadastro de usuário com senha curta
Then recebo uma resposta de erro indicando que a senha deve ter no mínimo 8 caracteres

Scenario: Email já cadastrado durante o cadastro
Given que o sistema está acessível
When envio uma requisição para a API de cadastro de usuário com um email já cadastrado
Then recebo uma resposta de erro indicando que o email já está cadastrado

Scenario: Login com sucesso
Given que o sistema está acessível
When envio uma requisição para a API de login com email: "enioribeiro9@hotmail.com" e senha: "enio1234"
Then recebo uma resposta de sucesso

Scenario: Login com e-mail não cadastrado
Given que o sistema está acessível
When envio uma requisição para a API de login com email não cadastrado
Then recebo uma resposta de erro indicando que o email não está cadastrado

Scenario: Logout com sucesso
Given que estou autenticado no sistema
When envio uma requisição para a API de logout
Then recebo uma resposta de sucesso indicando que fiz logout