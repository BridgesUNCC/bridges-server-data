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
