import express from "express";
import bodyParser from "body-parser";
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

import { userController } from "./controller";

const app = express();

//temporary set up for when we connect the database
let members = [];

//Define the constants we need for our setup
const noid_admin=process.env.NOIDADMIN
const noid_password=process.env.NOIDPASSWORD
const CONNECTION_URL = `mongodb+srv://${noid_admin}:${noid_password}@noid.uka07.mongodb.net/<dbname>?retryWrites=true&w=majority`;
const DATABASE_NAME = "example";
const port = 3000;

var database, collection;
//security freatures
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));

//Using body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
app server endpoints
**/

//test home page
app.use("/", userController);

//registering the credentials of members
app.post("/registration/memberCredentials", userController)

app.listen(port, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
	        if(error) {
            throw error;
            console.log("Error")
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("people");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});