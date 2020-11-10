const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  UID: { type: String, required: true },
  Name: { type: String, required: true },
  Age: { type: Number, required: true },
  License: { type: String, required: true },
  Expiry: { type: Number, required: true },
});

module.exports = mongoose.model('Members', MemberSchema);