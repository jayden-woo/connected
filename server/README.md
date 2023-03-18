# API Server of the CRM

### Stacks

Framework : NodeJS + Express

Database : MongoDB

Deployment : ~~Heroku~~ Render

Testing : Mocha

[API documentation: Postman](https://documenter.getpostman.com/view/14853484/UV5TEJhS)

### Links

[API Documentation](https://documenter.getpostman.com/view/14853484/UV5TEJhS)

~~[Heroku Back-End URL - Production](https://it-project-connected-api.herokuapp.com)~~ <br/>
~~[Heroku Back-End URL - Development](https://it-project-connected-api-dev.herokuapp.com)~~ <br/>
[Render Back-End URL](https://connected-api-bo7p.onrender.com/)

### File Structure

| File/Folder       | Description                                        |
| :---------------- | :------------------------------------------------- |
| `├── controllers` | Controllers                                        |
| `├── middleware`  | Middlewares (guards)                               |
| `├── models`      | Mongoose schemas                                   |
| `├── routes`      | Routers                                            |
| `├── startup`     | Basic setups for api server (DB, CORS, JWT, etc..) |
| `├── test`        | Mocha testing for front-end and back-end           |
| `└── server.js`   | Entry file for the api server                      |

### Local Development

Command line listed below works the same either under root `/` directory or under `/server` directory

#### Environment Setup

For local testing, back-end will be running at port 3000 by default.

|  Back-End   |
| :---------: |
| Port = 3000 |

Other environmental setups will be not listed here due to safety considerations (will be posted in the chat)

#### Install Dependencies

```bash
yarn
```

#### Starting Scripts

```bash
yarn start
```

Nodemon startup

```bash
yarn server
```
