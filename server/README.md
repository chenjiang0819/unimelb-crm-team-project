# API Server of the CRM

### Stacks

Framework : NodeJS + Express

Database : MongoDB

Deployment : Heroku

Testing : Mocha

[API documentation : Postman](https://documenter.getpostman.com/view/14853484/UV5TEJhS)

### Links

[API documentation](https://documenter.getpostman.com/view/14853484/UV5TEJhS)

[Heroku Back-end URL - pord](http://localhost:3000/) <br />
[Heroku Back-end URL - dev](http://localhost:3000/)

### File structure

| File/Folder        | Description                                         |
| :----------------- | :-------------------------------------------------- |
| `├── controllers`  | Controllers                                         |
| `├── middleware`   | Middlewares (guards)                                |
| `├── models`       | Mongoose schemas                                    |
| `├── routes`       | Routers                                             |
| `├── startup`      | Basic setups for api server (DB, cors, jwt , etc..) |
| `├── test`         | Mocha testing for front-end and back-end                                       |
| `└── server.js`    | Entry file of the api server                        |

### Local Development

Command line listed below works the same either under root `/` directory or under `/server` directory

#### Enviroment setup

For local testing, back-end will be run at port 3000 as default.

Other enviromental setups for the safety consideration will be not listed here (will be post in the chat)

#### Install denpendencies

```bash
yarn
```

#### Starting scripts

```bash
yarn start
```

Nodemon startup

```bash
yarn server
```
