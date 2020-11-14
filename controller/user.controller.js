
import express from "express";
import sha256 from "sha256";
const CryptoJS = require("crypto-js");
const Members = require('../models/members');
const userController = express.Router();

var env = process.env.NODE_ENV || 'development';
var config = require('../config')[env];

//Home Page application connection test
userController.get('/', (req, res) => {
   res.send("Welcome to NOID APP");
});

/**
 * POST/
 * Add a new User to your database
 */
userController.post("/add-user", (req, res) => {
  	const member = new Members({
    UID: req.body.UID,
    Name: req.body.Name,
    Age: req.body.Age,
    License: req.body.License,
    Expiry: req.body.Expiry
  });
  member.save().then(
    () => {
      res.status(201).json({
        message: 'User Added Successfully!'
      });
      res.send('Done')
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

/**
 * GET/
 * To retrive Virtual Wallet information for a given member
 */
userController.get('/:member/memberDB/virtualWallet', (req,res) => {
	res.send('Here are the member Credentials')
});
/**
 * GET/
 * To retrive Virtual Wallet information for a given mmerchant
 */
userController.get('/:merchant/merchantDB/virtualWallet', (req,res) => {
	res.send('Here are the Merchant Credentials')
});
/**
 * POST/
 * To post values for a specific merchant once the merchant ID is set
 */
userController.post('/:merchant/registration/merchantCredentials', (req,res) => {
	//'Please edit the credentials
});

/**
 * GET/
 * To retrive information for a given member for Merchant Side
 */

userController.get('/:UID/information', (req,res) => {
	//gets the question to be asked from merchant
	//interacts with database
	//collects the answers
	Member.findOne({
    _UID: req.params.UID
  }).then(
    (member) => {
      res.status(200).json(thing);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
});


/**
 * GET/
 * To retrive permission to check for credentials
 */
 userController.get('/:UID/memberFE/permission', (req,res) => {
	//gets permission from FE
});
/**
 * GET/
 * To retrive Credentials from the DB
 */
userController.get('/:UID/memberDB/information', (req,res) => {
	//gets info from database
});
/**
 * GET/
 * To retrive Credentials from the Ledger
 */
userController.get('/:UID/Ledger/information', (req,res) => {
	//gets info from ledger
});

/**
 * GET/
 * To retrive Validity
 */
userController.get('/:UID/validation', (req,res) => {
	//compares hash
});


/**merchant server endpoints
**/
/**
 * GET/
 * To retrive information for a member by a specific merchant
 */
userController.get('/:MerchantUID/:UID/information', (req,res) => {
	//merchant scanner hits this end point with merchant ID and member UID
});
/**
 * GET/
 * To retrive questions from Merchant
 */
 userController.get('/:question/:UID/information', (req,res) => {
	//merchant poses question
});



/*********************


DEVELOPMENT APIS


*********************/

//development API for list of all members
userController.get('/members', async(req,res) => {
  const members = await Members.find({});
  try {
  	res.send(members);
  } catch (err) {
    res.status(500).send(err);
  }
})
//development API to clear stuff
userController.get('/clear', (req,res) => {
  Members.deleteMany({}, function(err, result){
  	if(err){
  		res.send(err);
  	}else{
  		res.send(result);
  	}
  });
})

//development API for list of merchants
userController.get('/merchants', async(req,res) => {
	const merchants = await Merchants.find({});
  try {
    res.send(merchants);
  } catch (err) {
    res.status(500).send(err);
  }
})
//Development API to test with dummy datbase post and subsequent http get of the same data
userController.get('/registration/memberCredentials', (req,res) => {
	const member = new Members({
    UID: "x",
    Name: "req.body.Name",
    Age: "20",
    License: "req.body.License",
    Expiry: "123123"
  });
  member.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).send(error);
    }
  );
  
});

export default userController;