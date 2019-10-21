//dependency injection
const express = require("express");
const bodyParser = require("body-parser"); //get json body from request.body
const bcrypt = require("bcrypt-nodejs"); //password hashing
const cors = require("cors"); //give access to what domains can access the server
const knex = require("knex"); //allows us to give sql statements to database
const morgan = require("morgan"); //logging

//controllers
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

//starting express server
const server = express();

console.log("user", process.env.POSTGRES_USER);

//connecting to the database
const db = knex({
  client: "pg",
  connection: process.env.POSTGRES_URI
  // {
  //   host: process.env.POSTGRES_HOST,
  //   user: process.env.POSTGRES_USER,
  //   password: process.env.POSTGRES_PASSWORD,
  //   database: process.env.POSTGRES_DB
  // }
});

//parse body data to json
server.use(bodyParser.json()); //be able to read json

//logging
server.use(morgan("combined"));

//cross origin
server.use(cors()); //accessed from anywhere

//root directory
server.get("/", (req, res) => {
  res.send("its working");
});

//sign in directory
server.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

server.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

server.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

server.post("/profile/:id", (req, res) => {
  profile.handleProfileUpdate(req, res, db);
});

server.post("/image", (req, res) => {
  image.handleImage(req, res, db);
});

server.post("/imageUrl", (req, res) => {
  image.handleApiCall(req, res);
});

//listening on port 8080
server.listen(process.env.PORT || 8081, () => {
  if (process.env.PORT != undefined) {
    console.log(`running on port ${process.env.PORT}`);
  } else {
    console.log("running on 8080");
  }
});

/*
    route --> response 
    / --> res = this is working
    signin --> POST = success/fail
    register --> POST = user
    /profile/:userId --> Get = user
    /image --> PUT --> user
*/
