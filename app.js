<<<<<<< HEAD
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


=======
>>>>>>> final changes to app.js)
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
let network;
let contract;
function prettyJSONString(inputString) {
	return JSON.stringify(JSON.parse(inputString), null, 2);
}
async function main(){
	try{
		const ccp = buildCCPOrg1(); //build connection profile to hyper ledger fabric network
		const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');
		const wallet = await buildWallet(Wallets, walletPath);
		await enrollAdmin(caClient, wallet, mspOrg1);
		await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');
	    
	}catch(error){
		console.error(`Apllication Failed with error - ${error}`);
	}

}
async function ensure(){
	await main();
	console.log('Ledger Ready');
}
//Add a block of information to the ledger
async function addInfo(uid,checksum){
	const ccp = buildCCPOrg1(); //build connection profile to hyper ledger fabric network
	const wallet = await buildWallet(Wallets, walletPath);
	const gateway = new Gateway();	
	try{

		await gateway.connect(ccp, { //start connection
				wallet,
				identity: org1UserId,
				discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
			});
		// Build a network instance based on the channel where the smart contract is deployed
			network = await gateway.getNetwork(channelName);

			// Get the contract from the network.
			contract = network.getContract(chaincodeName);
			contract.submitTransaction('CreateAsset',uid,checksum);
			console.log(`User with UID: ${uid} and Checksum : ${checksum}`);
		}catch(error){
			console.log(error)

		}finally{
		gateway.disconnect();
	}


	
}
//See all the blocks of the ledger
async function ledgerState(){
	const ccp = buildCCPOrg1(); //build connection profile to hyper ledger fabric network
	const wallet = await buildWallet(Wallets, walletPath);
	const gateway = new Gateway();	
	try{

		await gateway.connect(ccp, { //start connection
				wallet,
				identity: org1UserId,
				discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
			});
		// Build a network instance based on the channel where the smart contract is deployed
			network = await gateway.getNetwork(channelName);

			// Get the contract from the network.
			contract = network.getContract(chaincodeName);
			let result = await contract.evaluateTransaction('GetAllAssets');
			console.log(`*** Result: ${prettyJSONString(result.toString())}`);
		}finally{
		gateway.disconnect();
	}


}
//check if an entry exisits in the user
async function queryLedger(checkuid){
	const ccp = buildCCPOrg1(); //build connection profile to hyper ledger fabric network
	const wallet = await buildWallet(Wallets, walletPath);
	const gateway = new Gateway();	
	try{	
		await gateway.connect(ccp, { //start connection
				wallet,
				identity: org1UserId,
				discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
			});
		// Build a network instance based on the channel where the smart contract is deployed
			network = await gateway.getNetwork(channelName);

			// Get the contract from the network.
			contract = network.getContract(chaincodeName);
			result = await contract.evaluateTransaction('AssetExists', checkuid);
			return result.toString();
		}finally{
		gateway.disconnect();
	}
}
async function sumcheck(checkuid){
	const ccp = buildCCPOrg1(); //build connection profile to hyper ledger fabric network
	const wallet = await buildWallet(Wallets, walletPath);
	const gateway = new Gateway();	
	try{	
		await gateway.connect(ccp, { //start connection
				wallet,
				identity: org1UserId,
				discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
			});
		// Build a network instance based on the channel where the smart contract is deployed
			network = await gateway.getNetwork(channelName);

			// Get the contract from the network.
			contract = network.getContract(chaincodeName);
			result = await contract.evaluateTransaction('ReadAsset', checkuid);
			console.log(result.toString());
			return result.toString();
			
		}catch(error){
			console.log(error);

		}finally{
		gateway.disconnect();
	}


}
<<<<<<< HEAD
main()

=======
module.exports = {ensure,addInfo,ledgerState,queryLedger,sumcheck};
>>>>>>> final changes to app.js)
