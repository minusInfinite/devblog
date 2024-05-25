# Devblog

A simple CMS with express with handlebars

[Live Demo](https://minusinfinite.id.au/blog)

## Contents

- [Local Deployment](#local-deployment)
  - [Download](#download)
- [Examples](#examples)

## Local Deployment

This CRM uses [PostgreSQL](https://postgresql.org/) as it's database and
[Sequelize](https://sequelize.org/) as the ORM for providing schema models and queries.

Be sure to have MySQL setup an running before you download.

### Download

In your terminal download the repo

```terminal
git clone https://github.com/minusInfinite/devblog.git
```

Once cloned setup the depenencies with yarn

```terminal
yarn 
```

You will also need to edit the .env.EXAMPLE file to .env with the following

DBNAME - _The database Name_

DBUSER - _Your server or database Username_

DBPASS - _Your server or database password_

CSECRET - _Random characters for the Session Cookie Secret_

PSECRET - _Cookie-Paser Secret_

CCSECRET - _CSRF Secret_

ADMINNAME - _Admin Login Name_

ADMINEMAIL - _Admin Email Address_

ADMINPASS - _Admin Pass_

ROOT - _Custom Root Path_

NODE_ENV - _NODE Environment Mode_

Once you .env is setup you should be able to run the server

```terminal
npm start
```

Or for development

```terminal
npm run dev
```

## Examples

[Live Demo](https://minusinfinite.id.au/blog)

![Animated Demo GIF](/mdassets/devblog-demo.gif)
