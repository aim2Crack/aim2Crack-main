To setup the server folder in local. You need to do the following steps:
* Install PostGreSQL and run a server on that on PORT  5432. 
* Open PgAdmin and check the portname, username and password you set.
* create a '.env' file in the server folder and update the following fields: 
* * PG_PASSWORD = PASSWORD
* * PG_DATABASE = postgres
* * PG_USERNAME = postgres
* * BASEURL = http://localhost:5173
* Do a `npm i` in server folder to install all the required node_modules.
* Run `npm run dev` to start the server.
