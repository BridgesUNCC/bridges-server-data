## How to run for debugging purposes

(this is written by Erik who is not completely sure how he got things
running. So take it with a grain of salt.)

### install mongodb locally

Follow the installation guide from mongodb. Because I run debian I followed [https://docs.mongodb.com/manual/tutorial/install-mongodb-on-debian/](debian install).

I did not set up mongodb as a system server, instead I ran it by hand with
```
 mongod --dbpath ~/mongodata/
```

(where mongodata is an empty directory or the data directory of a previously ran mongodb server).

### clone the bridges-data repository

I assume you know how to do that

### install node and grunt

do whatever your OS installation of grunt and node is

### install the packages

You need to install a few npm packages.

```
npm install jit-grunt
npm install dotenv
npm install pug
```

### run node

```
export MONGO_CREDENTIALS='something' # this tricks the server to use the local mongodb install. yes it is weird
grunt serve # alternatively, you can run node directly with node server/app.js
```

The server should be running on http://localhost:3001/

### seeding datasets

when you run the server like that, it appears not to seed the data in the mongo server. Change the 'seeds' variable at the top of server/config/seed.js to seed the dataset you work on.
You probably should seed the database from the dev environment and set the seed back to false before deploying to the production database. That enables you to check that the data has been seeded correctly. And make sure that the server is not deleting data in production.

Also, that upload code is kinda busted, it will seed every thing at once. Probably causing a ton of race condition. And if it timesout somehow you get partial data.

So buyers beware.
