# Bookstore api - A nestjs and prisma application

## Description

An example api application using [nestjs](https://nestjs.com),
[expressjs](https://expressjs.com), 
[prisma orm](https://www.prisma.io),
[passport](http://www.passportjs.org),
[jest](https://jestjs.io/)
and [sqlite](https://www.sqlite.org).

## Requirements
Install nvm and install+activate the latest lts node version.
```bash
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
$ nvm install --lts`<br/>
$ nvm use --lts`
```

## Installation

Install all dependencies and create an .env file using the development template file.
The .env file is not stored in the git repo to avoid using it by mistake.

```bash
$ npm install
$ cp .env.develop .env
```
Now we can create the test database and fill it with book data. The -f option will skip the 
*"... all data will be lost"* confirmation prompt. More details about npx prisma can be found below
in the [Database binding](#database-binding) section.
```bash
$ npx prisma migrate reset -f
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode - firewall restrictions for port 80 must be disabled
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

File [test/books rest api calls.postman_collection.json](test/books rest api calls.postman_collection.json) contains several api calls that can be imported and manually
processed using [postman](https://www.postman.com).

## API documentation
A paginated list api endpoint `GET /books?from=50&limit=10&search=:search` is currently not implemented.

The api endpoints described in the following are fully available.
The api uses the books `ID` (e.g. `1xdECe1`) to address the stored book entries.
As the `ID` values are not unique the 
implemented behavior of the PUT and DELETE endpoints are special.

**GET /books/:charcode**<br/>
* Returns the first book matching the `:charcode`
* In case no book is found a status 200 with empty body is responded

**GET /random/:count?**<br/>
* Returns `:count` random books. The books returned are randomly chosen from the database.
* Client side caches should be disabled. Otherwise, the list may not be fetched but read from the cache.

**POST /order**<br/>
* Receives an order and adds it to the db.

## Limitations and todos

#### Missing paginated list api endpoint
This endpoint should have the following spec `GET /books?from=50&limit=10&search=:search`

#### Missing api parameter validation
The input values of the api parameters are currently not validated. There should be input parameter validation
for value consistency max, min values etc.

#### Unit and E2E tests
The current unit test only instantiate the tested components but no usecase specific tests
are processed.

This also applies to the automatic e2e tests.
Additionally, these tests currently can not be used due to a server port configuration failure. 

#### Missing automatically generated API documentation
An openapi (formerly known as swagger) documentation can be automatically created using the
`@nestjs/swagger` module as been described in the [nestjs openapi](
https://docs.nestjs.com/openapi/introduction) documentation.
After the `@nestjs/swagger` module has been integrated the api can be easily documented
using annotations for endpoints, types and parameters.


#### Database
The books-api app uses [prisma](https://www.prisma.io/) as database abstraction layer.
For test and develop purposes a SQLite database is used.
In a production environment the SQLite database can easily be replaced with a
[postgreql, mysql or other database system](
https://www.prisma.io/docs/reference/database-reference/supported-databases).

The prisma model doesn't use a database specific index for the books 'ID' attribute
to speed up fuzzy text search. In a production environment
this may soon result in performance issues. When performance issues are adressed the model should be extended to use such an index.
Examples: [SQLite FTS5](https://www.sqlite.org/fts5.html) or [postgreql gist indexes](
https://www.alibabacloud.com/blog/postgresql-fuzzy-search-best-practices-single-word-double-word-and-multi-word-fuzzy-search-methods_595635).

#### HTTP basicauth authentication
Currently [http basic authentication](https://testdriven.io/blog/web-authentication-methods/#http-basic-authentication)
is implemented using the [passport-http](http://www.passportjs.org/docs/basic-digest/) package.

The basic authentication scheme uses a username and password to authenticate a user.
These credentials are transported in plain text, so it is advised to use HTTPS when
using this scheme.

Instead of the basic authentication scheme a [oauth2](http://www.passportjs.org/docs/oauth/) or 
[local-authentication](https://www.npmjs.com/package/passport-local) scheme
should be used as these can be combined with json web tokens issued after login. 
As there are compass packages for both authentication strategies 
this can be implemented straight forward.

Also a redirect to a login page in case of unauthorized access must be implemented.
 
#### Logger configuration
The logger configuration is currently located in `src/main.ts`.
The definition must be done in the .env file.

## How this project has been generated
The project structure and boilerplate code of this project has been created using the nextjs
cli. This is how it works respectively what has been done:

#### Create project folder
In your local develop folder the new nest app project folder will be created by nestjs.
Additionally all needed dependencies will be installed. 
We even don't need to install nestjs to do this
because npx will download the nest cli for us before it is executed.
Choose the package manager according to your needs. In the following we use npm.
```bash
$ npx @nestjs/cli new <app-name>
$ cd <app-name>
```
After having created the project repository on github we add the github repo as origin.<br/><br/>
In the project folder
```bash
$ git remote add origin https://github.com/<git-user-name>/<app-name>.git
```
In the following we are using npx to call the nest cli installed in the local ng-modules folder.
This way we are using allways the correct nest cli even if we have multiple 
workspaces/projects with different installed cli versions. Of course
[There are other ways to call the nest cli](
https://medium.com/@angela.amarapala/ways-to-fix-bash-ng-command-not-found-7f329745795).

#### Create resources for BOOKS and ORDERS
Generate a user resource used in our authentication service. 
Choose transport layer 'REST API' and no CRUD generation.
```bash
$ npx nest generate resource users --no-spec --no-crud
```
Generate the API resource for the books. Choose transport layer 'REST API' and CRUD generation.
```bash
$ npx nest generate resource books
```
#### HTTP basicauth authentication
Install passport for local authentication together with its peer dependencies
```bash
$ npm install --save @nestjs/passport passport passport-http ajv@^6.9.1 bcrypt
$ npm install --save-dev @types/passport-http @types/bcrypt
```
Generating an AuthModule and an AuthService
```bash
$ npx nest g module auth
$ npx nest g service auth
```
#### Database binding
We are using SQLite and prisma as described in the [nestjs prisma recipe](
https://docs.nestjs.com/recipes/prisma).
```bash
$ npm install prisma --save-dev
```
Add peer dependencies<br/>
```bash
$ npm install class-validator class-transformer --save-dev
```
Create an initial prisma folder and files
```bash
$ npx prisma init
```
Now we edit the file `prisma/schema.prisma` to look like this

    // This is your Prisma schema file,
    // learn more about it in the docs: https://pris.ly/d/prisma-schema

    datasource db {
      provider = "sqlite"
      url      = env("DATABASE_URL")
    }

    generator client {
      provider = "prisma-client-js"
    }

    model Book {
      id    String     @default(autoincrement()) @id
      title String
      description  String
      ...
    }

And set the DATABASE_URL variable in the `.env` file in the project root:

    DATABASE_URL="file:./dev.db"

Generate the initial sql migration files and apply them to our SQLite db.
```bash
$ npx prisma migrate dev --name init
```

Additionally the prisma client will be installed
(so we don't need `npm install @prisma/client`)
and our model specific CRUD database interface is generated.
On future model changes we need to call `npx prisma generate` manually to obtain an updated database interface.

Now dump the content of ./books.json into our database.
```bash
$ npx prisma db seed --preview-feature
```
The prisma seed command calls the script in the file `prisma/seed.ts` which copies the data. The `seed.ts`
script is also called every time we reset our database using `npx migrate reset`. More details are described in the
[prisma seed database documentation](https://www.prisma.io/docs/guides/database/seed-database).