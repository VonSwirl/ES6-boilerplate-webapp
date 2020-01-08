# es6-node-barebone-boilerplate

Create New `.env` file in root
add the following value:

`LOCAL_DIRNAME=`

`PORT=3000`

`NODE_ENV='development'` 


Run Cmd

`npm i`


DEV:

`npm restart`
(Runs Command: `nodemon --exec babel-node app.js`)

PROD:


`npm start`
(Runs Command: `babel-node app.js`)

"test": "nodemon --exec babel-node app.js"