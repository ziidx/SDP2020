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


const { Gateway, Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const { buildCAClient, registerAndEnrollUser, enrollAdmin } = require('./test-application/javascript/CAUtil.js');
const { buildCCPOrg1, buildWallet } = require('./test-application/javascript/AppUtil.js');

const channelName = 'mychannel';
const chaincodeName = 'basic';
const mspOrg1 = 'Org1MSP';
const walletPath = path.join(__dirname, 'wallet');
const org1UserId = 'appUser';

function prettyJSONString(inputString) {
	return JSON.stringify(JSON.parse(inputString), null, 2);
}

async function main(){
	try{
		// build an in memory object with the network configuration (also known as a connection profile)
		const ccp = buildCCPOrg1();

		// build an instance of the fabric ca services client based on
		// the information in the network configuration
		const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');

		// setup the wallet to hold the credentials of the application user
		const wallet = await buildWallet(Wallets, walletPath);

		// in a real application this would be done on an administrative flow, and only once
		await enrollAdmin(caClient, wallet, mspOrg1);

		// in a real application this would be done only when a new user was required to be added
		// and would be part of an administrative flow
		await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');

		// Create a new gateway instance for interacting with the fabric network.
		// In a real application this would be done as the backend server session is setup for
		// a user that has been verified.
		const gateway = new Gateway();

		try{
			await gateway.connect(ccp, {
				wallet,
				identity: org1UserId,
				discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
			});
			// Build a network instance based on the channel where the smart contract is deployed
			const network = await gateway.getNetwork(channelName);

			// Get the contract from the network.
			const contract = network.getContract(chaincodeName);

			console.log('\n--> Submit Transaction: CreateAsset, creates new entry with fixed UID and checksum');
			result = await contract.submitTransaction('CreateAsset', '31477475' ,'80');
			console.log('*** Result: committed');
			if (`${result}` !== '') {
				console.log(`*** Result: ${prettyJSONString(result.toString())}`);
			}
			console.log('\n--> Evaluate Transaction: GetAllAssets, function returns all the current assets on the ledger');
			let result = await contract.evaluateTransaction('GetAllAssets');
			console.log(`*** Result: ${prettyJSONString(result.toString())}`);

		}finally {
			// Disconnect from the gateway when the application is closing
			// This will close all connections to the network
			gateway.disconnect();
		}catch(error){
			console.error(`******** FAILED to run the application: ${error}`);

		}
	}
}
main()

