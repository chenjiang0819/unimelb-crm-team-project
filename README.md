# Connected CRM — Team Coursework

## Academic Context

University: University of Melbourne  
Course: COMP30022 IT Project  
Year: Semester 2, 2021  
Project type: team

## My Contribution

Chen Jiang was Product Owner and contributed UI/UX design and code. This is a shared team project, not a solo implementation; the existing team roles remain below.

## 2026 AI-Assisted Maintenance

Removed current README identifiers and retired private/deployment links. Removed the hardcoded Auth0 management/test credentials and token request at module import. Management endpoints now default to disabled, enforce validated identity/ownership/admin permission when explicitly enabled, reject malformed inputs, and suppress provider response details. Offline regression checks prove no import-time provider calls and rejection paths. Historical provider tests now require explicit opt-in and environment configuration; defaults use loopback URLs. No real Auth0 or cloud database was contacted.

## Security and Runtime Limitations

A historical Auth0 client secret exists in already-public Git history. Treat it as compromised and revoke/rotate it. Current-source cleanup does not erase history. No history rewrite or automatic visibility change was performed. **Recommend MAKE PRIVATE pending credential revocation and a separately authorized history/privacy review.** Other legacy API routes and dependencies have not received a full new security audit; do not deploy this coursework as a production CRM.

## Build / Run and Verification

Original setup instructions remain below as historical references. `node server/test/security/auth0.cjs` runs the offline security regression. Full application, Auth0 delivery, cloud deployment and original external-dependent suite are NOT VERIFIED. Configure your own environment; no actual credentials are bundled.

## Attribution / Original Snapshot

Team CONNECTED, University of Melbourne. Existing history is preserved; no sensitive original archive branch is newly published. The 2026 portfolio normalization branch is separate from original coursework. No blanket relicensing of teammate code is asserted.


## Navigation

-   [Project Background](#project-background)
    -   [Description](#description)
    -   [Team Members](#team-members)
    -   [Documentation](#documentation)
-   [Getting started](#getting-started)
    -   [File structure](#file-structure)
    -   [Requirements](#requirements)
    -   [Local Development setup](#local-development)
    -   [Deployment](#deployment-guidelines)
    -   [Auth0 setup](#auth0)
-   [Version History](#version-history)

## Project Background

Project for COMP30022 IT Project 2021 Semester 2 (Team 15, CONNECTED)

### Description

A CRM web app provides to small businesses, which allows their customers to post question on the web app's forum page and answer surveys on the survey page.

### Team Members

| Name | Role |
| --- | --- |
| Xinyue Zhang | Scrum Master |
| Chen Jiang | Product Owner; UI/UX and coding contribution |
| Zhihui Chen | Testing and QA Lead |
| Jun Cheng Woo | Front-end Lead |
| Linyan Zhu | Back-end Lead |

Supervisor: Abhisha Nirmalathas. Private course profile, teammate student IDs/emails and expired chat invitation omitted.

### Documentation

-   Confluence (historical link omitted)
    -   [Architecture Diagram](https://i.imgur.com/h0NCDqB.png)
    -   Motivational Model (historical link omitted)
    -   User stories (historical link omitted)
    -   Personas (historical link omitted)
    -   Domain model (historical link omitted)
    -   Database Structure (historical link omitted)
-   [API Documentation](https://documenter.getpostman.com/view/14853484/UV5TEJhS)

## Getting started

### Mock-up
https://xd.adobe.com/view/a44aa8db-c7a8-451b-92ad-d995ef04b799-f119/

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

Historical deployment references (2021); availability and ownership are NOT VERIFIED. Do not submit credentials to these retired endpoints. Backend and frontend were deployed separately:

-   Front-end (historical link omitted)
-   Back-end (historical link omitted)

Some auto-deployment is set up for development server but not production server, for more information please check out (CICD pipeline setup (historical link omitted))

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
2. Access to [Dashboard](https://example.auth0.com/)

3. Check user management - Roles

Historical provider-dashboard screenshot omitted from the current README for privacy.

4. Click the Add Users button, assign role to the user



Historical provider-dashboard screenshot omitted from the current README for privacy.



## Version History

[VERSION.md](./VERSION.md)































