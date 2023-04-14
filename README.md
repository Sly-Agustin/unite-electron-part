# unite-electron-part
Basic project for an uni assigment. The idea is creating a electron app that runs react and makes requests to an API to show/download information.

## Requirements
- Nodejs v18.15.0
- NPM v9.6.2

## Installation
- Run `npm install` to install the necessary packages.
- Create an `.env` file: the server needs some environment variables, use the `.env.sample` file to see what do you need and set the `.env` accordingly

## Local deployment
First you need to run the react part as electron loads an URL (i'm planning to make something with webkit so you don't have to do this) this is done with `npm run start`, then in another console run `npm run electron` to start the app. 
The app comunicates with a backend, to connect to it see what you need in the `.env.sample` file
