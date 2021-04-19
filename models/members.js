const mongoose = require('mongoose');
const CryptoJS = require("crypto-js");


var env = process.env.NODE_ENV || 'development';
var config = require('../config')[env];

//AES 256 encryption of stored values
function encrypt(plaintext){
	var ciphertext = CryptoJS.AES.encrypt(plaintext, config.database.encryption_secret_key).toString();
	return ciphertext;
}
//AES 256 decryption of retrieved values
function decrypt(ciphertext){
	var bytes  = CryptoJS.AES.decrypt(ciphertext, config.database.encryption_secret_key);
	var plaintext = bytes.toString(CryptoJS.enc.Utf8);
	return plaintext;
}
function hash(password){
  var password_hash = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);  
  return String(password_hash);
}
const MemberSchema = new mongoose.Schema({
  username: {type: String, required: false, unique: true},
  password: {type: String, required: false, select: false, set: hash},
  UID: { type: String, required: true, unique: true, set: encrypt, get: decrypt },
  Name: { type: String, required: true, set: encrypt, get: decrypt },
  Age: { type: String, required: true, select: false, set: encrypt, get: decrypt },
  License: { type: String, required: true, select: false, set: encrypt, get: decrypt },
  Expiry: { type: String, required: true, select: false, set: encrypt, get: decrypt },
  CHECKSUM: { type: String, required: true, select: false }
},{toObject : {getters: true},toJSON: {getters: true}});

module.exports = mongoose.model('Members', MemberSchema);