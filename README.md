## 🔍 API Manejo de Automóveis

#### Stack

- [NestJS](https://github.com/nestjs/nest): Server-side framework utilizando Express como HTTP server.
- [Prisma](https://github.com/prisma/prisma): ORM usado para interações com o DB.
- [Docker](https://github.com/docker): Container node para facilitar o uso da API.
- [Swagger](https://github.com/swagger-api): Documentação dos endpoints da API.

## 🚀 Inicializando com Docker

```bash
# Iniciando o server com o docker
$ docker compose up
```

## 🚀 Inicializando sem Docker

```bash
# Instala dependencias do projeto
$ npm install

# Cria o banco de dados e as configurações do Prisma
$ npx prisma migrate dev

# Inicializa o server em dev mode
$ npm run start:dev
```

## 🎮 Como usar

1. Verificar se o container está rodando no docker.

2. Acesse http://localhost:3000/api/ para verificar os endpoints da API.

3. Usando o Swagger ou o software que preferir, faça requests nos endpoints abaixo

### Automóvel

| Método | Endpoint          | Descrição                 |
| ------ | ----------------- | ------------------------- |
| GET    | `/automovel`      | Lista todos os automóveis |
| POST   | `/automovel`      | Cria um novo automóvel    |
| GET    | `/automovel/{id}` | Busca um automóvel por ID |
| PUT    | `/automovel/{id}` | Atualiza um automóvel     |
| DELETE | `/automovel/{id}` | Remove um automóvel       |

### Motorista

| Método | Endpoint          | Descrição                 |
| ------ | ----------------- | ------------------------- |
| GET    | `/motorista`      | Lista todos os motoristas |
| POST   | `/motorista`      | Cria um novo motorista    |
| GET    | `/motorista/{id}` | Busca um motorista por ID |
| PUT    | `/motorista/{id}` | Atualiza um motorista     |
| DELETE | `/motorista/{id}` | Remove um motorista       |

### Manejo

| Método | Endpoint                | Descrição                           |
| ------ | ----------------------- | ----------------------------------- |
| GET    | `/manejo`               | Lista todos os registros de manejo  |
| POST   | `/manejo/atribuir`      | Atribui um automóvel a um motorista |
| PUT    | `/manejo/encerrar/{id}` | Encerra o manejo de um automóvel    |
