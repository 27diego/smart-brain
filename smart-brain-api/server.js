const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const server = express();

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1", //localhost
    user: "school",
    password: "",
    database: "smart-brain"
  }
});

server.use(bodyParser.json());
server.use(cors());

server.get("/", (req, res) => {
  res.send(database.users);
});

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

server.listen(8080, () => {
  console.log("running....");
});

/*
    route --> response 
    / --> res = this is working
    signin --> POST = success/fail
    register --> POST = user
    /profile/:userId --> Get = user
    /image --> PUT --> user
*/
