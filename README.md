<p align="center">
  <a href="https://it-project-connected.herokuapp.com/">
    <img src="https://i.imgur.com/MYHeh0S.png" alt="Team Connected Logo" />
  </a>
</p>

## Navigation

- [Project Background](#project-background)
  - [Description](#description)
  - [Team Members](#team-members)
  - [Contact](#contact)
  - [Documentation](#documentation)
- [Getting Started](#getting-started)
  - [File Structure](#file-structure)
  - [Requirements](#requirements)
  - [Local Development](#local-development)
  - [Deployment Guidelines](#deployment-guidelines)
  - [Auth0 Setup](#auth0-setup)
- [Version History](#version-history)
- [License](#license)

## Project Background

Project for COMP30022 IT Project 2021 Semester 2 (Team 15, Connected)

### Description

A Customer Relationship Management (CRM) web app provided to small businesses, allowing their customers to post questions, receive answers, and participate in discussions on the web app's forum page and also answering surveys on the survey page.

### Team Members

**Supervisor:** [Abhisha Nirmalathas](https://canvas.lms.unimelb.edu.au/courses/102164/users/83421)

|       Name        | Student ID |                      Github                       |                                    Email                                    |        Role         |
| :---------------: | :--------: | :-----------------------------------------------: | :-------------------------------------------------------------------------: | :-----------------: |
| **Xinyue Zhang**  |   984983   |         [Jpiec](https://github.com/Jpiec)         |      [zxz1@student.unimelb.edu.au](mailto:zxz1@student.unimelb.edu.au)      |    Scrum Master     |
|  **Chen Jiang**   |  1127411   | [chenjiang0819](https://github.com/chenjiang0819) | [chenjiang@student.unimelb.edu.au](mailto:chenjiang@student.unimelb.edu.au) |    Product Owner    |
|  **Zhihui Chen**  |   920971   | [Aaronchen0319](https://github.com/Aaronchen0319) |  [zhihuic2@student.unimelb.edu.au](mailto:zhihuic2@student.unimelb.edu.au)  | Testing and QA Lead |
| **Jun Cheng Woo** |  1045457   |    [jayden-woo](https://github.com/jayden-woo)    |     [woojw@student.unimelb.edu.au](mailto:woojw@student.unimelb.edu.au)     |   Front-End Lead    |
|  **Linyan Zhu**   |  1074009   |       [LinyanZ](https://github.com/LinyanZ)       |  [linyanz1@student.unimelb.edu.au](mailto:linyanz1@student.unimelb.edu.au)  |    Back-End Lead    |

### Contact

If you have any questions about the website. Please contact us via [Discord](https://discord.gg/hzNFjUAZ).

### Documentation

- [Confluence](https://21s2-comp30022-team-15.atlassian.net/wiki/spaces/T1S/overview?homepageId=163848)
  - [Architecture Diagram](https://i.imgur.com/h0NCDqB.png)
  - [Motivational Model](https://21s2-comp30022-team-15.atlassian.net/wiki/spaces/T1S/pages/3473555/Motivational+Model)
  - [User stories](https://21s2-comp30022-team-15.atlassian.net/wiki/spaces/T1S/pages/3473546/User+Stories)
  - [Personas](https://21s2-comp30022-team-15.atlassian.net/wiki/spaces/T1S/pages/3473537/Personas)
  - [Domain model](https://21s2-comp30022-team-15.atlassian.net/wiki/spaces/T1S/pages/16220179/Domain+Model)
  - [Database Structure](https://21s2-comp30022-team-15.atlassian.net/wiki/spaces/T1S/pages/40927233/Database+Structure)
- [API Documentation](https://documenter.getpostman.com/view/14853484/UV5TEJhS)

## Getting Started

### File Structure

| File/Folder  |       Description        |
| :----------: | :----------------------: |
| `├── server` |  Back-End (API) Server   |
| `└── client` | Front-End User Interface |

### Requirements

#### System Requirements

- **[Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)**

- **Node:**

  - [NodeJS](https://nodejs.org/en/) \>= 12.x
  - [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) \>= 6.x

- **Database:**
  - [MongoDB](https://www.mongodb.com/) >= 4.4

_Further requirements please check the package.json_

#### Accounts With

- [MongoDB](https://account.mongodb.com/account/register)
- [Heroku](https://dashboard.heroku.com/apps)
- [Auth0](https://auth0.com/signup?place=header&type=button&text=sign%20up)

### Local Development

#### Environment Setup

Although this project is deployed on Heroku separately, but for convenience we put them in the same folder.

For local testing, front-end will be running at port 8080 while back-end will be running at port 3000 as default.

|  Front-End  |  Back-End   |
| :---------: | :---------: |
| Port = 8080 | Port = 3000 |

_Other environmental setups will not listed here due to safety consideration. Please check the environment.md_

#### Install Dependencies

Install yarn first

```bash
npm install --global yarn
```

With scripts already defined at the root directory, install all dependencies by running the following command:

```bash
yarn
```

#### Starting Scripts

_Run scripts in root directory_

**Run front-end**

```bash
yarn client
```

**Run back-end**

```bash
yarn server
```

**Run both front-end and back-end simultaneously via concurrently**

```bash
yarn dev
```

### Deployment Guidelines

#### Current Deployment

This monorepo project is deployed on Heroku currently, backend and frontend are deployed separately at the link below

- [Front-end](https://it-project-connected.herokuapp.com/)
- [Back-end](https://it-project-connected-api.herokuapp.com)

Some auto-deployment is set up for the development server but not for the production server, for more information please check out ([CI/CD pipeline setup](https://21s2-comp30022-team-15.atlassian.net/wiki/spaces/T1S/pages/39026700/Workflows+and+CICD))

Settings can be updated via [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install) or [Heroku dashboard](https://dashboard.heroku.com/apps)

#### How to Deploy

##### Heroku CLI

1. Download [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)

2. [Setup Heroku account](https://signup.heroku.com/)

3. [Create a new app](https://devcenter.heroku.com/articles/creating-apps)

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
# add new app buildpack, inserting into list of buildpacks if necessary

# monorepo buildpack, notice that need to specify the app_base env in the config
buildpacks:add https://github.com/lstoll/heroku-buildpack-monorepo

# buildpack for front end
buildpacks:add https://buildpack-registry.s3.amazonaws.com/buildpacks/mars/create-react-app.tgz

# buildpack for back end
buildpacks:add heroku/nodejs
```

```bash
# Other helpful cml
# clear all buildpacks set on the app
buildpacks:clear

# remove a buildpack set on the app
buildpacks:remove [BUILDPACK_URL]

# set new app buildpack, overwriting into list of buildpacks if necessary
buildpacks:set BUILDPACK_URL
```

6. Setup env

```bash
# setup environment variables

# specify backend app entry for buildpack
heroku config:set APP_BASE=server

# specify frontend app entry for buildpack
heroku config:set APP_BASE=client

# all env variables listed in the Environment.md needs to be add to the app
```

##### [Heroku Dashboard](https://dashboard.heroku.com/apps)

Heroku dashboard have UI interfaces which are more straightforward to setup, for more information please check out [Heroku documentation](https://devcenter.heroku.com/categories/reference)

### Auth0 Setup

This project used Auth0 to handle the user authentications.

Users are separated into two roles

| Role  | Permissions                                                                              |
| :---: | :--------------------------------------------------------------------------------------- |
| Admin | Admin has additional permission to remove posts or post surveys and check survey results |
| User  | Normal user only has permission to add and view posts.                                   |

#### How to Assign Roles

All user will be assigned with `User` role automatically when first signing up on the website.

To assign the `Admin` role to a user:

1. [Sign Up](https://auth0.com/signup?place=header&type=button&text=sign%20up) for an Auth0 account

2. Navigate to the [Dashboard](https://manage.auth0.com/dashboard/us/dev-8p7irqly/)

3. Click on the `User Management` button then the `Roles` button

<img src="https://i.imgur.com/VaWZNGo.png" alt="Auth0 dashboard usermanagement" style="zoom:50%;" />

4. Click on the `Admin` role and then the `Users` tab

<img src="https://imgur.com/RPMabMS.ong" style="zoom:5%;" />

5. Click on the `Add Users` button then select the user to assign the `Admin` role to

<img src="https://i.imgur.com/urrB1Ju.png" style="zoom:20%;" />

## Version History

[VERSION.md](./VERSION.md)

## License

See the [LICENSE](LICENSE) file for license rights and limitations (MIT).
