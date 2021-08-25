# IT-Project Team Connected

## Group Member

|       Name        | Student ID |        Role         |                                    Email                                    |
| :---------------: | :--------: | :-----------------: | :-------------------------------------------------------------------------: |
| **Xinyue Zhang**  |   984983   |    Scrum Master     |      [zxz1@student.unimelb.edu.au](mailto:zxz1@student.unimelb.edu.au)      |
|  **Chen Jiang**   |  1127411   |    Product Owner    | [chenjiang@student.unimelb.edu.au](mailto:chenjiang@student.unimelb.edu.au) |
|  **Zhihui Chen**  |   920971   | Testing and QA Lead |  [zhihuic2@student.unimelb.edu.au](mailto:zhihuic2@student.unimelb.edu.au)  |
| **Jun Cheng Woo** |  1045457   |   Front-end Lead    |     [woojw@student.unimelb.edu.au](mailto:woojw@student.unimelb.edu.au)     |
|  **Linyan Zhu**   |  1074009   |    Back-end Lead    |  [linyanz1@student.unimelb.edu.au](mailto:linyanz1@student.unimelb.edu.au)  |

## Links

- [Confluence](https://21s2-comp30022-team-15.atlassian.net/wiki/spaces/T1S/overview?homepageId=163848)
- [Jira](https://21s2-comp30022-team-15.atlassian.net/jira/software/projects/IP/boards/1/roadmap)
- [Heroku](https://it-project-connected.herokuapp.com/)
- [API Documentation](https://documenter.getpostman.com/view/17086104/TzzDJEme)

## Description about the file struture

_Back-end_ is coded under **server** folder while _Front-end_ coded under **client** folder.

### .env files

_some enviroment variables_

| Back-end                  |
| ------------------------- |
| MONGO_USERNAME=IT-PROJECT |
| MONGO_PASSWORD=CONNECTED  |

| Front-end |
| --------- |
| PORT=5000 |

### Command lines

_Run front-end_

```bash
yarn client
```

_Run back-end_

```bash
yarn server
```

_Run both front-end and back-end via concurrently_

```bash
yarn dev
```

## Stacks

Front End: React

Back End: NodeJS + Express

Database: MongoDB

Deployment: Heroku

Testing: JEST

API documentation: Postman
