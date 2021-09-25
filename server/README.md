# API Server of the CRM

### Stacks

Framework : NodeJS + Express

Database : MongoDB

Deployment : Heroku

Testing : Mocha

[API documentation : Postman](https://documenter.getpostman.com/view/15417117/UUxwBoPp)



### Links

[API documentation](https://documenter.getpostman.com/view/15417117/UUxwBoPp)

[Heroku Back-end URL](https://it-project-connected-api.herokuapp.com)



### File structure

| File/Folder        | Description                                         |
| :----------------- | :-------------------------------------------------- |
| `├── controllers`  | Controllers                                         |
| `├── middleware`   | Middlewares (guards)                                |
| `├── models`       | Mongoose schemas                                    |
| `├── routes`       | Routers                                             |
| `├── startup`      | Basic setups for api server (DB, cors, jwt , etc..) |
| `├── test`         | Mocha testing                                       |
| `├── api`          |                                                     |
| ` └── common`      |                                                     |
| `├── server.js`    | Entry file of the api server                        |
| `├── package.json` | Holds various metadata relevant to the project      |
| `└── yarn.lock`    | Specify dependencies' version for installation      |



### Local Development

Command line listed below works the same either under root `/` directory or under `/server` directory

#### Enviroment setup

For local testing, back-end will be run at port 3000 as default.

Other enviromental setups for the safety consideration will be not listed here (will be post in the chat)



#### Install denpendencies

```bash
yarn
```



#### Staring scripts

```bash
yarn start
```

Nodemon startup

```bash
yarn server
```



