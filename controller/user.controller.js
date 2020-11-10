
import express from "express";
import sha256 from "sha256";
const Members = require('../models/members');

const userController = express.Router();

//Home Page application connection test
userController.get('/', (req, res) => {
   res.send("Welcome to NOID APP")
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

//list of all members for development purpose
userController.get('/members', async(req,res) => {
  const members = await Members.find({});
  try {
    res.send(members);
  } catch (err) {
    res.status(500).send(err);
  }
})

//list of merchants for dev
userController.get('/merchants', async(req,res) => {
	const merchants = await Merchants.find({});
  try {
    res.send(merchants);
  } catch (err) {
    res.status(500).send(err);
  }
})

//virtual wallet for member
userController.get('/:member/memberDB/virtualWallet', (req,res) => {
	res.send('Here are the member Credentials')
});

//virtual wallet for merchant
userController.get('/:merchant/merchantDB/virtualWallet', (req,res) => {
	res.send('Here are the Merchant Credentials')
});

//for development purposes to test with dummy datbase post and subsequent http get of the same data
userController.get('/registration/memberCredentials', (req,res) => {
	console.log("Test")
	const member = new Members({
    UID: "req.body.UID",
    Name: "req.body.Name",
    Age: 20,
    License: "req.body.License",
    Expiry: 123123
  });
  member.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
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

userController.post('/:merchant/registration/merchantCredentials', (req,res) => {
	//'Please edit the credentials
});

/**
member server endpoints
**/

//endpoint for merchant server to request info for member
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


//endpoint to request permission to check for credentials
userController.get('/:UID/memberFE/permission', (req,res) => {
	//gets permission from FE
});

//endpoint to retrieve credentials from the DB
userController.get('/:UID/memberDB/information', (req,res) => {
	//gets info from database
});


//endpoint to retrieve credentials from Ledger
userController.get('/:UID/Ledger/information', (req,res) => {
	//gets info from ledger
});


//endpoint to compute validity
userController.get('/:UID/validation', (req,res) => {
	//compares hash
});


/**merchant server endpoints
**/
userController.get('/:MerchantUID/:UID/information', (req,res) => {
	//merchant scanner hits this end point with merchant ID and member UID
});

//endpoint to pose question to member server
userController.get('/:question/:UID/information', (req,res) => {
	//merchant poses question
});

export default userController;