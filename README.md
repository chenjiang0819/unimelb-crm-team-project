<p align="center">
  <a href="http://localhost:3000/">
    <img src="https://i.imgur.com/MYHeh0S.png" alt="Team Connected logo" />
  </a>
</p>
## Navigation

-   [Project Background](#Project-Background)
    -   [Description](#Description)
    -   [Team Members](#Team-Members)
    -   [Contact](#contact)
    -   [Documentation](#Documentation)
-   [Getting started](#Getting-started)
    -   [File structure](#File-structure)
    -   [Requirements](#Requirements)
    -   [Local Development setup](#Local-Development)
    -   [Deployment](#deployment-guidelines)
    -   [Auth0 setup](#Auth0)
-   [Version History](#version-history)

## Project Background

Project for COMP30022 IT Project 2021 Semester 2 (Team 15, CONNECTED)

### Description

A CRM web app provides to small businesses, which allows their customers to post question on the web app's forum page and answer surveys on the survey page.

### Team Members

**Supervisor :** [Abhisha Nirmalathas ](https://example.com/retired-link)

|       Name        | Student ID |                      Github                       |                                    Email                                    |        Role         |
| :---------------: | :--------: | :-----------------------------------------------: | :-------------------------------------------------------------------------: | :-----------------: |
| **Xinyue Zhang**  |   REDACTED_STUDENT_ID   |         [Jpiec](https://github.com/Jpiec)         |      [redacted-student@users.noreply.github.com](mailto:redacted-student@users.noreply.github.com)      |    Scrum Master     |
|  **Chen Jiang**   |  REDACTED_STUDENT_ID   | [chenjiang0819](https://github.com/chenjiang0819) | [redacted-student@users.noreply.github.com](mailto:redacted-student@users.noreply.github.com) |    Product Owner    |
|  **Zhihui Chen**  |   REDACTED_STUDENT_ID   | [Aaronchen0319](https://github.com/Aaronchen0319) |  [redacted-student@users.noreply.github.com](mailto:redacted-student@users.noreply.github.com)  | Testing and QA Lead |
| **Jun Cheng Woo** |  REDACTED_STUDENT_ID   |    [jayden-woo](https://github.com/jayden-woo)    |     [redacted-student@users.noreply.github.com](mailto:redacted-student@users.noreply.github.com)     |   Front-end Lead    |
|  **Linyan Zhu**   |  REDACTED_STUDENT_ID   |       [LinyanZ](https://github.com/LinyanZ)       |  [redacted-student@users.noreply.github.com](mailto:redacted-student@users.noreply.github.com)  |    Back-end Lead    |

### Contact

If you have any questions with the website. Please contact us via [Discord](https://example.com/retired-link).



### Documentation

-   [Confluence](https://example.com/retired-link)
    -   [Architecture Diagram](https://i.imgur.com/h0NCDqB.png)
    -   [Motivational Model](https://example.com/retired-link)
    -   [User stories](https://example.com/retired-link)
    -   [Personas](https://example.com/retired-link)
    -   [Domain model](https://example.com/retired-link)
    -   [Database Structure](https://example.com/retired-link)
-   [API Documentation](https://documenter.getpostman.com/view/14853484/UV5TEJhS)

## Getting started

### File structure

| File/Folder  | Description         |
| :----------- | :------------------ |
| `├── server` | Backend(API) server |
| `└── client` | Front-end UI        |

### Requirements

#### System requirements

- **[Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)**

- **Node :** 
    - [NodeJS](https://nodejs.org/en/) \>= 12.x
    - [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) \>= 6.x

- **Database:**
    - [MongoDB](https://www.mongodb.com/) >= 4.4

*Further requirements please check the package.json*



#### Account with

- [MongoDB](https://account.mongodb.com/account/register)
- [Heroku](https://dashboard.heroku.com/apps)
- [Auth0](https://auth0.com/signup?place=header&type=button&text=sign%20up)



### Local Development

#### Environment setup

Although this project is deployed on Heroku separately, but for convenience we put them in the same folder.

For local testing, front-end will be run at port 5000 while back-end running at port 3000 as default.

| Front-end |
| --------- |
| PORT=5000 |

*Other environmental setups for the safety consideration will not listed here. Please check the environment.md*

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

-   [Front-end](http://localhost:3000/)
-   [Back-end](http://localhost:3000/)

Some auto-deployment is set up for development server but not production server, for more information please check out ([CICD pipeline setup](https://example.com/retired-link))

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

Heroku dashboard have ui interfaces which is more strait forward to setup, more information please checkout ([Heroku documentation](https://devcenter.heroku.com/categories/reference))



### Auth0

This project used Auth0 to handle with the user authentications.

Users are separated into two roles

| Role  | Permissions                                                  |
| ----- | ------------------------------------------------------------ |
| Admin | Admin has permissions to remove posts or post surveys and check survey results |
| User  | Normal user with permission to add and view posts.           |

#### How to assign roles to users

All user will be assigned with `User` role automatically when first time signning up on the website, to assign Admin to a user

1. [Signup](https://auth0.com/signup?place=header&type=button&text=sign%20up) for Auth0
2. Access to [Dashboard](https://example.auth0.com/dashboard/us/dev-8p7irqly/)

3. Check user management - Roles

<img src="https://i.imgur.com/VaWZNGo.png" alt="Auth0 dashboard usermanagement" style="zoom:50%;" />

4. Click the Add Users button, assign role to the user



<img src="https://i.imgur.com/urrB1Ju.png" style="zoom:20%;" />



## Version History

[VERSION.md](./VERSION.md)































