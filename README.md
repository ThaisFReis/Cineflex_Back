# CINEFLEX API

CineFlex API é uma aplicação que provê uma API para simular a compra de ingressos para um cinema. A API permite que o front-end da aplicação se comunique com o banco de dados para gerenciar os filmes, sessões, assentos e vendas.

## Tecnologias utilizadas

    Node.js
    TypeScript
    Express.js
    Prisma
    PostgreSQL
    Jest
    Supertest

## Estrutura da aplicação
src/\
├── config/\
│   ├── database.ts\
│   ├── env.ts\
│   ├── index.ts\
├── routers/\
│   ├── MovieRouter.ts\
│   ├── SeatRouter.ts\
│   ├── SaleRouter.ts\
│   ├── SessionRouter.ts\
│   ├── UserRouter.ts\
│   └── index.ts\
├── controllers/\
│   ├── MovieController.ts\
│   ├── SessionController.ts\
│   ├── SeatController.ts\
│   ├── SaleController.ts\
│   └── UserController.ts\
├── repositories/\
│   ├── MovieRepository.ts\
│   ├── SessionRepository.ts\
│   ├── SeatRepository.ts\
│   ├── SaleRepository.ts\
│   └── UserRepository.ts\
├── services/\
│   ├── AuthService.ts\
│   ├── MovieService.ts\
│   ├── SessionService.ts\
│   ├── SeatService.ts\
│   ├── SaleService.ts\
│   └── UserService.ts\
├── schema/\
│   ├── MovieSchema.ts\
│   ├── SessionSchema.ts\
│   ├── SeatSchema.ts\
│   ├── SaleSchema.ts\
│   └── UserSchema.ts\
├── utils/\
│   ├── ErrorHandler.ts\
│   └── HttpException.ts\
├── app.ts\
├── index.ts\
├── prisma/\
│   ├── schema.prisma\
│   └── client/\
├── __tests__/\
│   ├── integration/\
│   │   ├── movie.test.ts\
│   │   ├── session.test.ts\
│   │   ├── seat.test.ts\
│   │   └── user.test.ts\
│   ├── unit/\
│   │   ├── authService.test.ts\
│   │   ├── movieService.test.ts\
│   │   ├── sessionService.test.ts\
│   │   ├── seatService.test.ts\
│   │   ├── saleService.test.ts\
│   │   └── userService.test.ts\
│   └── utils/\
│       ├── errorHandler.test.ts\
│       └── httpException.test.ts\
└── types/\
    └── index.ts