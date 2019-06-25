//dependency injection
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

//controllers
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

//starting express server
const server = express();

//connecting to the database
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1", //localhost
    user: "school",
    password: "",
    database: "smart-brain"
  }
});

//parse body data to json
server.use(bodyParser.json());

//cross origin
server.use(cors());

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

server.post("/image", (req, res) => {
  image.handleImage(req, res, db);
});

server.post("/imageUrl", (req, res) => {
  image.handleApiCall(req, res);
});

//listening on port 8080
server.listen(process.env.PORT || 8080, () => {
  console.log(`running on port ${process.env.PORT}`);
});

/*
    route --> response 
    / --> res = this is working
    signin --> POST = success/fail
    register --> POST = user
    /profile/:userId --> Get = user
    /image --> PUT --> user
*/
