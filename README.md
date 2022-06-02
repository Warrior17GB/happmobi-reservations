# API Hapimobbi

API desenvolvida com o propósito de gerenciar reservas de veículos.

### 🛠 Tecnologias usadas

* JavaScript
* TypeScript
* Node.JS
* SQLite

### ⛓️ Principais dependências

* Prisma
* Swagger
* JWT
* Express

### 💻 Instalação

Execulte o comando a seguir para instalar as dependências:
```
npm install
```
Após instalar as dependências, execulte o seguinte comando para iniciar a API:
```
npm run dev
```
Com o projeto iniciado, acesse a documentação através da rota `/api-docs/`, nessa rota estará disponibilizado a documentação feita com Swagger, incluindo todas as rotas e instruções de como consumi-las.

### ⚙ Funções

* Login de usuário
* Cadastro de usuário
* Listagem de veículos
* Reserva de veículos
* Liberação de veículos reservados

### 🚥 Regras de negócio

* Para consumir a API o usuário deve estar autênticado.
* Não é possível reservar um veículo já reservado.
* Cada usuário só pode reservar um veículo.

[⬆ Voltar ao topo](#API-Hapimobbi)