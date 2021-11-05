# Team Connected 

## Navigation

-   [Project Background](#Project-Background)
    -   [Description](#Description)
    -   [Team Members](#Team-Members)
    -   [Documentation](#Documentation)
-   [Getting started](#Getting-started)
    -   [File structure](#File-structure)
    -   [Requirements](#Requirements)
    -   [Local Development setup](#Local-Development)
    -   [Deployment](#deployment-guidelines)

## Project Background

### Description

A CRM web app provides to small businesses, which allows their customers to post question on the web app's forum page and answer surveys on the survey page.

### Team Members

**Supervisor :** [Abhisha Nirmalathas ](https://canvas.lms.unimelb.edu.au/courses/102164/users/83421)

|       Name        | Student ID |                      Github                       |                                    Email                                    |        Role         |
| :---------------: | :--------: | :-----------------------------------------------: | :-------------------------------------------------------------------------: | :-----------------: |
| **Xinyue Zhang**  |   984983   |         [Jpiec](https://github.com/Jpiec)         |      [zxz1@student.unimelb.edu.au](mailto:zxz1@student.unimelb.edu.au)      |    Scrum Master     |
|  **Chen Jiang**   |  1127411   | [chenjiang0819](https://github.com/chenjiang0819) | [chenjiang@student.unimelb.edu.au](mailto:chenjiang@student.unimelb.edu.au) |    Product Owner    |
|  **Zhihui Chen**  |   920971   | [Aaronchen0319](https://github.com/Aaronchen0319) |  [zhihuic2@student.unimelb.edu.au](mailto:zhihuic2@student.unimelb.edu.au)  | Testing and QA Lead |
| **Jun Cheng Woo** |  1045457   |    [jayden-woo](https://github.com/jayden-woo)    |     [woojw@student.unimelb.edu.au](mailto:woojw@student.unimelb.edu.au)     |   Front-end Lead    |
|  **Linyan Zhu**   |  1074009   |       [LinyanZ](https://github.com/LinyanZ)       |  [linyanz1@student.unimelb.edu.au](mailto:linyanz1@student.unimelb.edu.au)  |    Back-end Lead    |

### Documentation

-   [Confluence](https://21s2-comp30022-team-15.atlassian.net/wiki/spaces/T1S/overview?homepageId=163848)
    -   [Architecture Diagram](https://i.imgur.com/h0NCDqB.png)
    -   [Motivational Model](https://21s2-comp30022-team-15.atlassian.net/wiki/spaces/T1S/pages/3473555/Motivational+Model)
    -   [User stories](https://21s2-comp30022-team-15.atlassian.net/wiki/spaces/T1S/pages/3473546/User+Stories)
    -   [Personas](https://21s2-comp30022-team-15.atlassian.net/wiki/spaces/T1S/pages/3473537/Personas)
    -   [Domain model](https://21s2-comp30022-team-15.atlassian.net/wiki/spaces/T1S/pages/16220179/Domain+Model)
-   [API Documentation](https://documenter.getpostman.com/view/14853484/UV5TEJhS)

## Getting started

### File structure

| File/Folder  | Description         |
| :----------- | :------------------ |
| `├── server` | Backend(API) server |
| `└── client` | Front-end UI        |

### Requirements

**Node :** 

- [NodeJS](https://nodejs.org/en/) \>= 12.x
- [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) \>= 6.x

**Database:**

- [MongoDB](https://www.mongodb.com/) >= 4.4

*Further requirements please check the package.json*



### Local Development

#### Environment setup

Although this project is deployed on Heroku separately, but for convenience we put them in the same folder.

For local testing, front-end will be run at port 5000 while back-end running at port 3000 as default.

| Front-end |
| --------- |
| PORT=5000 |

Other environmental setups for the safety consideration will be not listed here.

#### Install dependencies

Install yarn firstly

```bash
npm install --global yarn
```

Scripts defined at root directory, Install all dependencies by command:

```bash
yarn
```

#### Starting scripts

_Run scripts in root directory_

**Run front-end**

```bash
yarn client
```

**Run back-end**

```bash
yarn server
```

**Run both front-end and back-end via concurrently**

```bash
yarn dev
```



### Deployment guidelines

#### Current deployment

This monorepo project is deployed on Heroku currently, backend and frontend is deployed separately with link below

-   [Front-end](https://it-project-connected.herokuapp.com/)
-   [Back-end](https://it-project-connected-api.herokuapp.com)

Some auto-deployment is set up for development server but not production server, for more information please check out ([CICD pipeline setup](https://21s2-comp30022-team-15.atlassian.net/wiki/spaces/T1S/pages/39026700/Workflows+and+CICD))

Settings can be updated via [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install) or [Heroku dashboard](https://dashboard.heroku.com/apps)

#### How to deploy

##### Heroku CLI

1. Download [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)
2. [Setup Heroku account](https://signup.heroku.com/)
3. [Create an new app](https://devcenter.heroku.com/articles/creating-apps)

```bash
heroku login

# To create a new app named “example_server_name”
heroku create example_server_name

# To create a new app named “example_client_name”
heroku create example_client_name
```

4. [Add remote and deploy](https://devcenter.heroku.com/articles/git)

```bash
# For an existing heroku app
heroku git:remote -a it-project-connected

# push the code from your local repository’s master or main branch to your heroku remote
git push heroku main
```

5. Setup buildpacks

```bash
# add new app buildpack, inserting into list of buildpacks if neccessary

# monorepo buildpack, notice that need to specify the app_base env in the config
buildpacks:add https://github.com/lstoll/heroku-buildpack-monorepo

# buildpack for front end
https://buildpack-registry.s3.amazonaws.com/buildpacks/mars/create-react-app.tgz

# buildpack for back end
heroku/nodejs
```

```bash
# Other helpful cml
# clear all buildpacks set on the app
buildpacks:clear          

# remove a buildpack set on the app
buildpacks:remove [BUILDPACK_URL]  

# set new app buildpack, overwriting into list of buildpacks if neccessary
buildpacks:set BUILDPACK_URL       
```

6. Setup env

```bash
# setup enviroment variables

# specify backend app entry for buildpack
heroku config:set APP_BASE=server

# specify frontend app entry for buildpack
heroku config:set APP_BASE=client

# all env variables listed in the Enviroment.md needs to be add to the app
```

##### [Heroku dashboard](https://dashboard.heroku.com/apps)

Heroku dashboard have ui interfaces which make more strait forward to use, more information please checkout ([Heroku documentation](https://devcenter.heroku.com/categories/reference))





















