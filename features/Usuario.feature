Feature: Usuario
As a usuário
I want to ser capaz de me cadastrar e logar no site
So that eu possa fazer pedidos e visualizar meu histórico de compras

Scenario: Cadastro de novo usuário com sucesso
Given eu acesso a página de cadastro de usuário 
And vejo os campos para inserir nome, email, senha e telefone 
When preencho todos os campos obrigatórios com nome: "Enio Henrique", email: "ehnr@cin.ufpe.br", senha: "enio1234" e telefone: "81993564057" 
And clico no botão de cadastrar 
Then recebo um e-mail de confirmação para validar meu cadastro 
And o e-mail contém um link para confirmar o cadastro 
And sou redirecionado para a página de login

Scenario: Cadastro com os campos em branco
Given eu acesso a página de cadastro de usuário 
And vejo os campos para inserir nome, email, senha e telefone 
When deixo todos os campos em branco
And clico no botão de cadastrar
Then vejo uma mensagem de erro indicando que os campos não podem estar vazios
And os campos são destacados com uma mensagem de erro

Scenario: E-mail inválido durante o cadastro 
Given eu acesso a página de cadastro de usuário 
And vejo os campos para inserir nome, email, senha e telefone 
When preencho todos os campos obrigatórios com nome: "Enio Henrique", email: "ehnr.cin.ufpe.br", senha: "enio1234" e telefone: "81993564057" 
And clico no botão de cadastrar 
Then vejo uma mensagem de erro indicando que o formato do email é inválido 
And o campo de email é destacado com uma mensagem de erro 
And os outros campos permanecem preenchidos com as informações válidas que inseri

Scenario: Telefone inválido durante o cadastro 
Given eu acesso a página de cadastro de usuário 
And vejo os campos para inserir nome, email, senha e telefone 
When preencho todos os campos obrigatórios com nome: "Enio Henrique", email: "ehnr.cin.ufpe.br", senha: "enio1234" e telefone: "81993564057c"
And clico no botão de cadastrar 
Then vejo uma mensagem de erro indicando que o formato do telefone é inválido 
And o campo de telefone é destacado com uma mensagem de erro 
And os outros campos permanecem preenchidos com as informações válidas que inseri

Scenario: Senha curta durante o cadastro
Given eu acesso a página de cadastro de usuário 
And vejo os campos para inserir nome, email, senha e telefone 
When preencho todos os campos obrigatórios com nome: "Enio Henrique", email: "ehnr@cin.ufpe.br", senha: "enio123" e telefone: "81993564057" 
And clico no botão de cadastrar 
Then vejo uma mensagem de erro indicando que a senha deve ter no mínimo 8 caracteres 
And o campo de senha é destacado com uma mensagem de erro 
And os outros campos permanecem preenchidos com as informações válidas que inseri

Scenario: Email já cadastrado durante o cadastro
Given eu acesso a página de cadastro de usuário 
And um usuário com o email "ehnr@cin.ufpe.br" já está cadastrado no sistema 
And vejo os campos para inserir nome, email, senha e telefone 
When preencho todos os campos obrigatórios com nome: "Enio Henrique", email: "ehnr@cin.ufpe.br", senha: "enio1234" e telefone: "81993564057" 
And clico no botão de cadastrar 
Then vejo uma mensagem de erro indicando que o email já está cadastrado 
And o campo de email é destacado com uma mensagem de erro 
And os outros campos permanecem preenchidos com as informações válidas que inseri

Scenario: Login com sucesso
Given eu acesso a página de login 
And um usuário com o email "ehnr@cin.ufpe.br" e senha: "enio1234" já está cadastrado no sistema 
And vejo os campos para inserir email e senha 
When preencho os campos com email: "ehnr@cin.ufpe.br" e senha: "enio1234" 
And clico no botão de login 
Then sou redirecionado para a página de perfil do usuário 
And vejo uma mensagem de boas-vindas com o nome do usuário: "Ênio Henrique"

Scenario: Email inválido durante o login
Given eu acesso a página de login 
And vejo os campos para inserir email e senha 
When preencho os campos com email: "ehnr.cin.ufpe.br" e senha: "enio1234" 
And clico no botão de login 
Then vejo uma mensagem de erro indicando que o formato do email é inválido 
And o campo de email é destacado com uma mensagem de erro

Scenario: Senha incorreta durante o login
Given eu acesso a página de login
And um usuário com o email "ehnr@cin.ufpe.br" e senha: "enio1234" já está cadastrado no sistema
And vejo os campos para inserir email e senha
When preencho os campos com email: "ehnr@cin.ufpe.br" e senha: "enio4321"
And clico no botão de login
Then vejo uma mensagem de erro indicando que a senha está incorreta
And o campo de senha é destacado com uma mensagem de erro

Scenario: Login com e-mail não cadastrado
Given eu acesso a página de login
And vejo os campos para inserir email e senha
When preencho os campos com email: "naocadastrado@email.com" e senha: "enio1234"
And clico no botão de login
Then vejo uma mensagem de erro indicando que o email não está cadastrado
And os campos de email e senha são destacados com uma mensagem de erro

Scenario: Login com e-mail e senha em branco
Given eu acesso a página de login 
And vejo os campos para inserir email e senha 
When deixo ambos os campos em branco 
And clico no botão de login 
Then vejo uma mensagem de erro indicando que os campos não podem estar vazios
And os campos de email e senha são destacados com uma mensagem de erro

Scenario: Logout com sucesso
Given eu estou logado na minha conta
And estou na página de perfil do usuário
When clico no botão de logout
Then sou deslogado do sistema
And sou redirecionado para a página de login
And vejo uma mensagem indicando que o logout foi realizado com sucesso