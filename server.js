const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
const port = 3000;
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

//temporary set up for when we connect the database
let members = [];

const CONNECTION_URL = "mongodb+srv://noid_admin:billDaddy2021@noid.uka07.mongodb.net/<dbname>?retryWrites=true&w=majority";
const DATABASE_NAME = "example";

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

app.get('/', (req,res) => {
	res.send('Sample server is set up')
});

//list of members for dev	
app.post('/members', (req,res) => {

})
//list of merchants for dev
app.post('/merchants', (req,res) => {

})
//virtual wallet for member
app.get('/:member/memberDB/virtualWallet', (req,res) => {
	res.send('Here are the member Credentials')
});
//virtual wallet for merchant
app.get('/:merchant/merchantDB/virtualWallet', (req,res) => {
	res.send('Here are the Merchant Credentials')
});

app.post('/registration/memberCredentials', (req,res) => {

    collection.insert(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);

});
	//please edit the credentials
});

app.post('/:merchant/registration/merchantCredentials', (req,res) => {
	//'Please edit the credentials
});

/**
member server endpoints
**/

//endpoint for merchant server to request info for member
app.get('/:UID/information', (req,res) => {
	//gets the question to be asked from merchant
	//interacts with database
	//collects the answers
});


//endpoint to request permission to check for credentials
app.get('/:UID/memberFE/permission', (req,res) => {
	//gets permission from FE
});

//endpoint to retrieve credentials from the DB
app.get('/:UID/memberDB/information', (req,res) => {
	//gets info from database
});


//endpoint to retrieve credentials from Ledger
app.get('/:UID/Ledger/information', (req,res) => {
	//gets info from ledger
});


//endpoint to compute validity
app.get('/:UID/validation', (req,res) => {
	//compares hash
});


/**merchant server endpoints
**/
app.get('/:MerchantUID/:UID/information', (req,res) => {
	//merchant scanner hits this end point with merchant ID and member UID
});

//endpoint to pose question to member server
app.get('/:question/:UID/information', (req,res) => {
	//merchant poses question
});

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