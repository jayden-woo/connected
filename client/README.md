# React UI of the CRM

### Stacks

Framework : React

Deployment : Heroku

Testing : 



### Links

[Heroku Front-end URL](https://it-project-connected.herokuapp.com)



### File structure

| File/Folder        | Description                                    |
| :----------------- | :--------------------------------------------- |
| `├── public`       | Static files, icons                            |
| `├── src`          | Middlewares (guards)                           |
| `├── assets`       | Assets, icons                                  |
| `├── components`   | Reusable components                            |
| `├── css`          | Css                                            |
| `├── pages`        | The client side application                    |
| ` └── helpers`     | Helper functions                               |
| `├── server.js`    | Entry file of the api server                   |
| `├── package.json` | Holds various metadata relevant to the project |



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



#### Staring scripts

*Run front-end*

```bash
# under client folder
yarn start
```

*Run front-end and back-end together*
`cd ..` (cs back to root folder) and run the follwing command

```bash
# make sure all dependencies are installed
yarn

yarn dev
```



