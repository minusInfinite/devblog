# Devblog

A simple CMS with express with handlebars

[Live Demo](https://boot-dev-blog.herokuapp.com/)

## Contents

[Local Deployment](#local-deployment)
[Examples](#examples)

## Local Deployment

This CRM uses [MySQL](https://dev.mysql.com/) as it's database and
[Sequelize](https://sequelize.org/) as the ORM for providing schema models and queries.

Be sure to have MySQL setup an running before you download.

### Download

In your terminal download the repo

```terminal
git clone https://github.com/minusInfinite/devblog.git
```

Once downloaded install the dependencies with NPM

```terminal
npm install
```

You will also need to edit the .env.EXAMPLE file to .env with the following

DBNAME - _The database Name_

DBUSER - _Your server or database Username_

DBPASS - _Your server or database password_

CSECRET - _Random characters for the Session Cookie Secret_

Once you .env is setup you should be able to run the server

```terminal
npm start
```

Or for development

```terminal
npm run dev
```

## Example

[Live Demo](https://boot-dev-blog.herokuapp.com/)

![Animated Demo GIF](/mdassets/devblog-demo.gif)
