Feature: Usuario
As a usuário
I want to ser capaz de me cadastrar no site
So that eu possa fazer pedidos e visualizar meu histórico de compras

Scenario: Criar um novo usuário
Given eu tenho dados de usuário válidos com nome "Enio", telefone "81999999999", email "ehnr@cin.ufpe.br", senha "enio1234", endereço "Rua das Flores, 123, Recife, PE" e is_admin "false"
When eu envio uma requisição POST para http://localhost:3001/user com os dados do usuário
Then o status da resposta deve ser 201
And a resposta deve conter a mensagem "User created successfully. Verification email sent."

Scenario: Criar um usuário com um email existente
Given já existe um usuário com nome "Enio", telefone "81999999999", email "ehnr@cin.ufpe.br", senha "enio1234", endereço "Rua das Flores, 123, Recife, PE" e is_admin "false"
And eu tenho dados de usuário com nome "Maria", telefone "81988887777", email "ehnr@cin.ufpe.br", senha "maria1234", endereço "Rua Nova, 321, Recife, PE" e is_admin "false"
When eu envio uma requisição POST para http://localhost:3001/user com os dados do novo usuário
Then o status da resposta deve ser 400
And a resposta deve conter a mensagem "Email already in use"

Scenario: Atualizar um usuário existente com autenticação
Given já existe um usuário com nome "Enio", telefone "81999999999", email "ehnr@cin.ufpe.br", senha "enio1234", endereço "Rua das Flores, 123, Recife, PE" e is_admin "false"
And eu tenho dados de atualização de usuário com telefone "81988888888" e endereço "Avenida Central, 456, Recife, PE"
And eu estou autenticado com email "ehnr@cin.ufpe.br" e senha "enio1234" e tenho um token JWT válido
When eu envio uma requisição PATCH para http://localhost:3001/user/{id} com os novos dados do usuário e o token JWT no cabeçalho
Then o status da resposta deve ser 200
And a resposta deve conter a mensagem "User updated successfully"

Scenario: Atualizar usuário sem autenticação
Given já existe um usuário com nome "Enio", telefone "81999999999", email "ehnr@cin.ufpe.br", senha "enio1234", endereço "Rua das Flores, 123, Recife, PE" e is_admin "false"
And eu tenho dados de atualização de usuário com telefone "81988888888" e endereço "Avenida Central, 456, Recife, PE"
And eu não estou autenticado
When eu envio uma requisição PATCH para http://localhost:3001/user/{id} com os dados do usuário sem autenticação
Then o status da resposta deve ser 401
And a resposta deve conter a mensagem "Authentication token is required"

Scenario: Administrador atualiza os detalhes de outro usuário
Given já existe um usuário com nome "Enio", telefone "81999999999", email "ehnr@cin.ufpe.br", senha "enio1234", endereço "Rua das Flores, 123, Recife, PE" e is_admin "false"
And eu estou autenticado como administrador com email "enio.ribeiro@citi.org.br" e senha "enio1234" e tenho um token JWT válido
And eu tenho dados de atualização de usuário com telefone "81988888887" e endereço "Avenida Recife, 123, Recife, PE"
When eu envio uma requisição PATCH para http://localhost:3001/user/{id} com os dados do usuário e o token JWT no cabeçalho
Then o status da resposta deve ser 200
And a resposta deve conter a mensagem "User updated successfully"

Scenario: Deletar um usuário como administrador
Given que existe um usuário com nome "Enio", telefone "81999999999", email "ehnr@cin.ufpe.br", senha "enio1234", endereço "Rua das Flores, 123, Recife, PE" e is_admin "false"
And eu estou autenticado como administrador com email "enio.ribeiro@citi.org.br" e senha "enio1234" e tenho um token JWT válido
When eu envio uma requisição DELETE para http://localhost:3001/user/{id} com o token JWT no cabeçalho
Then o status da resposta deve ser 200
And a resposta deve conter a mensagem "User deleted successfully"

Scenario: Deletar um usuário com autenticação
Given que existe um usuário com nome "Enio", telefone "81999999999", email "ehnr@cin.ufpe.br", senha "enio1234", endereço "Rua das Flores, 123, Recife, PE" e is_admin "false"
And eu estou autenticado como um usuário normal com email "ehnr@cin.ufpe.br" e senha "enio1234" e tenho um token JWT válido
When eu envio uma requisição DELETE para http://localhost:3001/user/{id} com o token JWT no cabeçalho
Then o status da resposta deve ser 200
And a resposta deve conter a mensagem "User deleted successfully"

Scenario: Deletar um usuário sem privilégios de administrador
Given que existe um usuário com nome "Enio", telefone "81999999999", email "ehnr@cin.ufpe.br", senha "enio1234", endereço "Rua das Flores, 123, Recife, PE" e is_admin "false"
And eu estou autenticado como um usuário normal com email "vxq@cin.ufpe.br" e senha "vivi1234" e tenho um token JWT válido
When eu envio uma requisição DELETE para http://localhost:3001/user/{id}
Then o status da resposta deve ser 403
And a resposta deve conter a mensagem "Permission denied"

Scenario: Ler todos os usuários como administrador
Given eu estou autenticado como administrador com email "enio.ribeiro@citi.org.br" e senha "enio1234" e tenho um token JWT válido
When eu envio uma requisição GET para http://localhost:3001/user/all com o token JWT no cabeçalho
Then o status da resposta deve ser 200
And a resposta deve conter uma lista de usuários

Scenario: Ler todos os usuários como um usuário normal
Given eu estou autenticado como um usuário normal com email "ehnr@cin.ufpe.br" e senha "enio1234" e tenho um token JWT válido
When eu envio uma requisição GET para http://localhost:3001/user/all com o token JWT no cabeçalho
Then o status da resposta deve ser 403
And a resposta deve conter a mensagem "Admin privileges are required"

Scenario: Ler um usuário específico
Given que existe um usuário com nome "Enio", telefone "81999999999", email "ehnr@cin.ufpe.br", senha "enio1234", endereço "Rua das Flores, 123, Recife, PE" e is_admin "false"
And eu estou autenticado como um usuário normal com email "ehnr@cin.ufpe.br" e senha "enio1234" e tenho um token JWT válido
When eu envio uma requisição GET para http://localhost:3001/user/{id} com o token JWT no cabeçalho
Then o status da resposta deve ser 200
And a resposta deve conter os detalhes do usuário

Scenario: Login de usuário
Given já existe um usuário com nome "Enio", telefone "81999999999", email "ehnr@cin.ufpe.br", senha "enio1234", endereço "Rua das Flores, 123, Recife, PE" e is_admin "false"
When eu envio uma requisição POST para http://localhost:3001/auth/login com email "ehnr@cin.ufpe.br" e senha "enio1234"
Then o status da resposta deve ser 200
And a resposta deve conter a mensagem "Login successful" e um token JWT

Scenario: Login com senha errada
Given já existe um usuário com nome "Enio", telefone "81999999999", email "ehnr@cin.ufpe.br", senha "enio1234", endereço "Rua das Flores, 123, Recife, PE" e is_admin "false"
When eu envio uma requisição POST para http://localhost:3001/auth/login com email "ehnr@cin.ufpe.br" e senha "enio4321"
Then o status da resposta deve ser 500
And a resposta deve conter a mensagem "Invalid credential"

Scenario: Login com email não cadastrado
Given já existe um usuário com nome "Enio", telefone "81999999999", email "ehnr@cin.ufpe.br", senha "enio1234", endereço "Rua das Flores, 123, Recife, PE" e is_admin "false"
When eu envio uma requisição POST para http://localhost:3001/auth/login com email "ehnr@ufpe.br" e senha "enio1234"
Then o status da resposta deve ser 400
And a resposta deve conter a mensagem "Email not found"

Scenario: Logout de usuário
Given já existe um usuário com nome "Enio", telefone "81999999999", email "ehnr@cin.ufpe.br", senha "enio1234", endereço "Rua das Flores, 123, Recife, PE" e is_admin "false"
And eu estou autenticado com email "ehnr@cin.ufpe.br" e senha "enio1234"
When eu envio uma requisição POST para http://localhost:3001/auth/logout
Then o status da resposta deve ser 200
And a resposta deve conter a mensagem "Logout successful"

Scenario: Logout sem autenticação
Given já existe um usuário com nome "Enio", telefone "81999999999", email "ehnr@cin.ufpe.br", senha "enio1234", endereço "Rua das Flores, 123, Recife, PE" e is_admin "false"
And eu não estou autenticado
When eu envio uma requisição POST para http://localhost:3001/auth/logout
Then o status da resposta deve ser 401
And a resposta deve conter a mensagem "No user is currently logged in"