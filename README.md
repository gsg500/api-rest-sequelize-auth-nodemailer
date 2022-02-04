# NODE EXPRESS / API REST - PROVA DE TECNOLOGIA
###### Sistema de cadastro / ORM Sequelize - mysql / Nodemailer / SOFT DELETED

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)

----------------------------------------------------------------
## Funcionalidades

##### POST - Calculo de cubagem do frete rodoviário 
http://localhost:3000/api/v1/projetos/cubagem

##### POST - Cadastros de novo usuario 
http://localhost:3000/api/v1/user/signup

##### POST - Login de usuario
http://localhost:3000/api/v1/user/login

##### PATCH - Alteração de cadastro  
http://localhost:3000/api/v1/user/update

##### GET - Detalhes do cadastro 
http://localhost:3000/api/v1/user/profile

##### PATCH - Exluir usuario 'SOFT DELETED' 
http://localhost:3000/api/v1/user/del

##### GET - *Token bloqueado perde validade* -Encerrar sessão do usuario  
http://localhost:3000/api/v1/user/logout

##### POST - Solicitar link recuperação de senha 'NODE-MAILER'
http://localhost:3000/api/v1/user/send
SERÁ ENVIANDO LINK POR EMAIL COM UM TOKEN, EXTRAIA O TOKEN DO LINK
ACESSAR A ROTA ABAIXO PASSANDO O TOKEN RECEBIDO COMO AUTENTICADOR

##### PATCH - Cadastrar nova senha
http://localhost:3000/api/v1/user/reset
UTILIZAR TOKEN ENVIADO POR EMAIL PARA REDEFINIR SENHA

##### POST - Cadastrar novo componente
http://localhost:3000/api/v1/componente/new

##### GET - Listagem de componentes
http://localhost:3000/api/v1/componente/list

##### GET - Historico de atualização do componente
http://localhost:3000/api/v1/componente/details/:id

##### PATCH - Atualização de componentes
http://localhost:3000/api/v1/componente/update/:id

##### PATCH - Excluir componentes 'SOFT DELETED'
http://localhost:3000/api/v1/componente/del/:id

##### POST - Cadastro de seguimentos
http://localhost:3000/api/v1/seguimento/new

##### GET - Listagem de seguimentos
http://localhost:3000/api/v1/seguimento/list

##### PATCH - Alteração de seguimentos
http://localhost:3000/api/v1/seguimento/update/:id

##### PATCH - Excluir seguimentos 'SOFT DELETED'
http://localhost:3000/api/v1/seguimento/del/:id

##### POST - Cadastro de grupos
http://localhost:3000/api/v1/grupo/new

##### GET - Listagem de grupos
http://localhost:3000/api/v1/grupo/list

##### PATCH - Alteração de grupos
http://localhost:3000/api/v1/grupo/update/:id

##### PATCH - Excluir grupos 'SOFT DELETED'
http://localhost:3000/api/v1/grupo/del/:id

### Autor / Web Development 
- [@Guilherme Santos Gomes](https://github.com/gsg500)
- [@Linkedin](https://www.linkedin.com/in/guilherme-santos-gomes/)