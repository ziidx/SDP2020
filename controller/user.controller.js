
import express from "express";
import sha256 from "sha256";

const CryptoJS = require("crypto");
const jwt = require('jsonwebtoken');
const url = require('url');
const userController = express.Router();

const Members = require('../models/members');
const Merchants = require('../models/merchants');


var env = process.env.NODE_ENV || 'development';
var config = require('../config')[env];
//Checksum Method

function checksum(){
	var baseString;
	for (var i = 0; i < arguments.length; i++) {
    baseString = baseString + arguments[i];
  }
  var hash = CryptoJS.createHash('sha256').update(baseString, 'utf8').digest('hex');
	return hash;
}

//Home Page application connection test
userController.get('/', (req, res) => {
   res.send("Welcome to NOID APP");
});

/**
 * POST/
 * Add a new member to your database
 */
userController.post("/add-member", (req, res) => {
  	var UID=req.body.UID;
    var Name=req.body.Name;
    var Age=req.body.Age;
    var License=req.body.License;
    var Expiry=req.body.Expiry;
  	
    var Checksum = checksum(UID, Name, Age, License, Expiry);

  	const member = new Members({
    UID: UID,
    Name: Name,
    Age: Age,
    License: License,
    Expiry: Expiry,
    CHECKSUM: Checksum
  });
  member.save().then(
    () => {
      res.status(201).json({
        message: 'Member Added Successfully!'
      });
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
 * POST/
 * Add a new merchant to your database
 */
userController.post("/add-merchant", (req, res) => {
    var UID=req.body.UID;
    var Name=req.body.Name;
    var Tier=req.body.Tier;
    var Expiry=req.body.Expiry;
    var Organization=req.body.Organization;
    
    var Checksum = checksum(UID, Name, Tier, Expiry, Organization);

    const merchant = new Merchants({
    UID: UID,
    Name: Name,
    Tier: Tier,
    Expiry: Expiry,
    Organization: Organization,
    CHECKSUM: Checksum
  });
  merchant.save().then(
    () => {
      res.status(201).json({
        message: 'Merchant Added Successfully!'
      });
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
 * To retrive Virtual Wallet information for a given member UID as a query
 */
userController.get('/members/virtual-wallet', (req,res) => {
 
 var id = req.query.UID;
 
 Members.findById(id)
  .then(doc => {
    res.status(200).send(doc);
  })
  .catch(err => {
    console.log(err);
  });
});
/**
 * GET/
 * To retrive Virtual Wallet information for a given mmerchant UID as a query
 */
userController.get('/merchants/virtual-wallet', (req,res) => {
 var id = req.query.UID;
 
 Merchants.findById(id)
  .then(doc => {
    res.status(200).send(doc);
  })
  .catch(err => {
    console.log(err);
  });
});

/**
 * GET/
 * To retrive information from a member and pass it to the merchant
 */

userController.get('/data-request', (req,res) => {
	/*
      Query: UID for member as received from the member card-scanner interaction(communicated via merchant phone)
             UID for merchant as recevied from scanner(communicated via merchant phone)
             Question posed by merchant(Tier-list>Question-list)
             Finds appropriate data entry, processes, information and sends it across.

  */
  
	
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
	var Checksum = checksum("x", "req.body.Name", "20", "req.body.License", "123123");
	const member = new Members({
    UID: "x",
    Name: "req.body.Name",
    Age: "20",
    License: "req.body.License",
    Expiry: "123123",
    CHECKSUM: Checksum
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
//Development APIs for JWT  registration
userController.post('/register', function(req, res) {
	var UID=req.body.UID;
    var Name=req.body.Name;
    var Age=req.body.Age;
    var License=req.body.License;
    var Expiry=req.body.Expiry;
  	
    var Checksum = checksum(UID, Name, Age, License, Expiry);

  	const member = new Members({
    UID: UID,
    Name: Name,
    Age: Age,
    License: License,
    Expiry: Expiry,
    CHECKSUM: Checksum
  });
  	member.save().then(
    () => {
    var token = jwt.sign({ id: member._id }, config.server.jwtSecret, {
      expiresIn: 86400 // expires in 24 hours
    });	
      res.status(200).json({
        message: 'User Added Successfully!',
        auth: true,
        token: token
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});
//Development API for JWT token validity
userController.get('/userTest', function(req, res){
  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, config.server.jwtSecret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
  // res.status(200).send(decoded);    
  Members.findById(decoded.id, function (err, user) {
  if (err) return res.status(500).send("There was a problem finding the user.");
  if (!user) return res.status(404).send("No user found.");
  
  res.status(200).send(user);
	});
  });
});
//Development API for JWT login
userController.post('/login', function(req, res) {
  Members.findOne({ Name: req.body.Name }, function (err, user) {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');
    
    // var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    // if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    
    res.status(200).send({ auth: true, token: token });
  });
  
});
//Development API for JWT logout
userController.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});

export default userController;