To setup the server folder in local. You need to do the following steps:
* Install PostGreSQL and run a server on that.
* Open PgAdmin and check the portname, username and password you set.
* create an '.env' file in the server folder and update the following fields: 
* * PG_PASSWORD = PASSWORD
* * PG_DATABASE = aim2crack
* * PG_USERNAME = postgres
* Do a `npm i` in server folder to install all the required node_modules.
* Run `npm run dev` to start the server.
