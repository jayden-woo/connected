# IT-Project CRM - Team Connected

## Navigation

-   [Project Background](#Project-Background)
    -   [Description](#Description)
    -   [Team Members](#Team-Members)
    -   [Documentation](#Documentation)
    -   [Project Link](#Project-Link)
    -   [Stacks](#stacks)
-   [Getting started](#Getting-started)
    -   [File structure](#File-structure)
    -   [Local Development](#Local-Development)
        -   [Enviroment setup](#Enviroment-setup)
        -   [Install denpendencies](#Install-denpendencies)
        -   [Staring scripts](#Staring-scripts)

## Project Background

### Description

A CRM web app provides to small businnesses, which allows thier customers to post question on the web app's forum page and answer surveys on the survey page.

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
    -   [Requirement CheckList](https://21s2-comp30022-team-15.atlassian.net/wiki/spaces/T1S/pages/3473871/Requirement+Checklist)
    -   [Motivational Model](https://21s2-comp30022-team-15.atlassian.net/wiki/spaces/T1S/pages/3473555/Motivational+Model)
    -   [User stories](https://21s2-comp30022-team-15.atlassian.net/wiki/spaces/T1S/pages/3473546/User+Stories)
    -   [Personas](https://21s2-comp30022-team-15.atlassian.net/wiki/spaces/T1S/pages/3473537/Personas)
    -   [Domain model](https://21s2-comp30022-team-15.atlassian.net/wiki/spaces/T1S/pages/16220179/Domain+Model)
    -   [Acceptance Criteria](https://21s2-comp30022-team-15.atlassian.net/wiki/spaces/T1S/pages/18154149/Acceptance+Criteria+Page)
-   [Jira](https://21s2-comp30022-team-15.atlassian.net/jira/software/projects/IP/boards/1/roadmap)
    -   [Road map](https://21s2-comp30022-team-15.atlassian.net/jira/software/projects/IP/boards/1/roadmap)
    -   [Backlog](https://21s2-comp30022-team-15.atlassian.net/jira/software/projects/IP/boards/1/backlog)
    -   [Board](https://21s2-comp30022-team-15.atlassian.net/jira/software/projects/IP/boards/1)
-   [API Documentation](https://documenter.getpostman.com/view/15417117/UUxwBoPp)

### Project Link

-   Heroku URL
    -   [Front-end](https://it-project-connected.herokuapp.com/)
    -   [Back-end](https://it-project-connected-api.herokuapp.com)

### Stacks

Front End: React

Back End: NodeJS + Express

Database: MongoDB

Deployment: Heroku

Testing: Mocha

API documentation: [Postman](https://documenter.getpostman.com/view/15417117/UUxwBoPp)

## Getting started

### File structure

| File/Folder        | Description                                    |
| :----------------- | :--------------------------------------------- |
| `├── server`       | Backend(API) server                            |
| `├── client`       | Front-end UI                                   |
| `├── package.json` | Holds various metadata relevant to the project |
| `└── yarn.lock`    | Specify dependencies' version for installation |

### Local Development

#### Enviroment setup

Although this project is deployed on Heroku seperatly, but for convinince we put them in the same folder.

For local testing, front-end will be run at port 5000 while back-end running at port 3000 as default.

| Front-end |
| --------- |
| PORT=5000 |

Other enviromental setups for the safety consideration will be not listed here.

#### Install denpendencies

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
