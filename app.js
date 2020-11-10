import express from "express";
import bodyParser from "body-parser";

const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

import { userController } from "./controller";

const app = express();

var env = process.env.NODE_ENV || 'development';
var config = require('./config')[env];

//Define the constants we need for our setup

const CONNECTION_URL = `mongodb://${config.database.noid_admin}:${config.database.noid_password}@localhost:${config.database.port}/${config.database.DATABASE_NAME}?authSource=admin&authMechanism=SCRAM-SHA-1`;

var database, collection;
//security freatures
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
//Using body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
app server endpoints
**/

//test home page
app.use("/", userController);

app.listen(config.server.port, () => {
     mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
     	console.log("Connected to MongoDB")
     }).catch(error => {
     	console.log(error)
     })
});