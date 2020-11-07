
import express from "express";
import sha256 from "sha256";
const userController = express.Router();

userController.get('/', (req, res) => {
   res.status(200).json({
      status: 'user Controller API call successfully'
   });
});

/**
 * POST/
 * Add a new User to your database
 */
userController.post("/add-user", (req, res) => {
  
});

userController.post('/members', (req,res) => {

})
//list of merchants for dev
userController.post('/merchants', (req,res) => {

})
//virtual wallet for member
userController.get('/:member/memberDB/virtualWallet', (req,res) => {
	res.send('Here are the member Credentials')
});
//virtual wallet for merchant
userController.get('/:merchant/merchantDB/virtualWallet', (req,res) => {
	res.send('Here are the Merchant Credentials')
});

userController.post('/registration/memberCredentials', (req,res) => {

    collection.insert(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);

});
	//please edit the credentials
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