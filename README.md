# Sobre
Esta é minha primeira API Rest desenvolvida utilizando as tecnologias NodeJS e MongoDB. Nela se encontram todas as operações de CRUD, autenticação e recuperação de senha por email utilizando token.

## Funções
A API possibilita:
- Criação de usuário
- Autenticação de usuário utilizando token
- Reset de senha por email
- Criação, Exclusão, Alteração de Projeto
- Criação de tarefas para o projeto

## Etapas
- [x] Configuração de ambiente (instalação do NodeJS e configuração inicial)
- [x] Criação dos Models + Tabelas no MongoDB utilizando ' mongoose '
- [x] Criação dos Controllers com as rotas utilizando ' router '
- [x] Criptografia de senha utilizando 'bcrypt'
- [x] Criação de token utilizando 'jasonwebtoken'
- [x] Criação do Middleware de autenticação
- [x] Configuração do envio de email para reset de senha utilizando 'nodemailer'

## Instalação
1. 'npm install' para instalar todas as dependências
2. Renomeie os arquivos 'auth.example.json' e 'mail.example.json'
3. Configure o 'auth.example.json' colocando um hash qualquer
4. Configure o 'mail.example.json' com os dados do mailtrap, por exemplo
5. 'node index.js' para rodar a API

## Contribuição/Sugestão
Caso queria contribuir ou me dar sugestões para melhorias, entre em contato: 'syond94@gmail.com'
