Feature: Usuario
As a usuário
I want to ser capaz de me cadastrar e logar no site
So that eu possa fazer pedidos e visualizar meu histórico de compras

Scenario: Cadastro de novo usuário com sucesso
Given eu acesso a página de cadastro de usuário 
And vejo os campos para inserir nome, email, senha e telefone 
When preencho todos os campos obrigatórios com nome: "Enio Henrique", email: "ehnr@cin.ufpe.br", senha: "enio1234" e telefone: "8199564057" 
And clico no botão de enviar o formulário 
Then recebo um e-mail de confirmação para validar meu cadastro 
And sou redirecionado para a página de login

Scenario: E-mail inválido durante o cadastro 
Given eu acesso a página de cadastro de usuário 
And vejo os campos para inserir nome, email, senha e telefone 
When preencho todos os campos obrigatórios com nome: "Enio Henrique", email: "ehnr.cin.ufpe.br", senha: "enio1234" e telefone: "8199564057" 
And clico no botão de enviar o formulário 
Then vejo uma mensagem de erro indicando que o formato do email é inválido 
And os outros campos permanecem preenchidos com as informações válidas que inseri