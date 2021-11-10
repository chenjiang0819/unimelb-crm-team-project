# React UI of the CRM

### Stacks

Framework : React

Deployment : Heroku

Testing : Mocha

### Links

[Heroku Front-end URL - Prod](http://localhost:3000/) <br />
[Heroku Front-end URL - Dev](http://localhost:3000/)

### File structure

| File/Folder        | Description                                    |
| :----------------- | :--------------------------------------------- |
| `├── public`       | Static files, icons                            |
| `├── src`          |                           |
| &emsp;`├── assets`       | Assets, icons                                  |
| &emsp;`├── components`   | Reusable components                            |
| &emsp;`├── css`          | Css                                            |
| &emsp;`├── pages`        | The client side application                    |
| &emsp;`├── index.js`    | Entry file of the api server                   |
| &emsp;`└── helpers`     | Helper functions                               |

### Local Development

#### Enviroment setup

For local testing, front-end will be run at port 5000.

| Front-end |
| --------- |
| PORT=5000 |

Other enviromental setups for the safety consideration will be not listed here (will be post in the chat)

#### Install denpendencies

```bash
yarn
```

#### Starting scripts

_Run front-end_

```bash
# under client folder
yarn start
```

_Run front-end and back-end together_
`cd ..` (cd back to root folder) and run the follwing command

```bash
# make sure all dependencies are installed
yarn

yarn dev
```
