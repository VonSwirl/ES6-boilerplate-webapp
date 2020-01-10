This Repo is monitored by [Snyk](https://snyk.io/package/npm/snyk)

[![Known Vulnerabilities](https://snyk.io/package/npm/snyk/badge.svg)](https://snyk.io/package/npm/snyk)

# ES6 Boilerplate Web Application

This repo is intended to minimise the time spent on creating a NodeJS Web App from scratch.

All you need to do is create the .env file and populate it with your own secrets and your ready to go.

Ive really benefitted from the open-source community so here's a contribution to hopefully help others. 

## Built With
  * [NodeJS](https://nodejs.org/en/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
  * [NPM](https://www.npmjs.com/) - Relied upon by more than 11 million developers worldwide!
  * [MVC](https://developer.chrome.com/apps/app_frameworks) - The Model-View-Controller (MVC) is an architectural pattern.
  * [ExpressJS](https://www.npmjs.com/package/express) - Fast, unopinionated, minimalist web framework for node.
  * [Mongoose](https://www.npmjs.com/package/mongoose) - Mongoose is a MongoDB object modeling tool.
  * [HelmetJS](https://www.npmjs.com/package/helmet) - Helmet helps you secure your Express apps.
  * [Body-Parser](https://www.npmjs.com/package/body-parser) - Parse incoming request bodies vailable under the req.body property.
  * [Cookie-Session](https://www.npmjs.com/package/cookie-session) - A user session can be stored on the server or on the client.
  * [Compression](https://www.npmjs.com/package/compression) - Compression decreases amount of data that’s served to users.
  * [Dotenv](https://www.npmjs.com/package/dotenv) - Loads environment variables from .env for nodejs projects.
  * [Csurf](https://www.npmjs.com/package/csurf) - Node.js CSRF protection middleware.
  * [Pug](https://github.com/pugjs/pug) - Pug is a robust, elegant, feature rich template engine for Node.js.
  * [Bootstrap4](https://getbootstrap.com) - The world’s most popular framework for building responsive, mobile-first websites.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

Installed on your machine:

`npm v6^`

`node v10^`

## Installing

  * Create New `.env` file in root DIR & copy and pastes the values listed below:

    | Values | 
    | ------------- |
    | LOCAL_DIRNAME= |
    | PORT= |
    | NODE_ENV='development' |
    | DB_STAGING=AddYourDbConnectString |
    | DB_PRODUCTION=AddYourDbConnectString |
    | DB_DEVELOPMENT=AddYourDbConnectString |
    | CK_1=ADD YOUR OWN CK 12 Keys. see *** | 		
    | CK_2= |
    | CK_3= |
    | CK_4= |
    | CK_5= |
    | CK_6= |
    | CK_7= |
    | CK_8= |
    | CK_9= |
    | CK_10= |
    | CK_11= |
    | CK_12= |
  *** Random string e.g `i6qphjQY>xmpaqhhjamgo|ike@x`

  * Then Run Command:
  ### 
        npm i
----

## Running
  #### Dev Env:
        nodemon --exec babel-node app.js
  #### Prod Env: 
        npm start


## Author

* **Jerome Hurley**


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
