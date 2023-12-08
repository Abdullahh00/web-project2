const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let licenseSchema = new Schema({
  issuedto: {
    type: String
  },
  licensekey: {
    type: String
  },
  product_id: {
    type: String
  },
  activationstatus: {
    type: Boolean
  }
}, {
    collection: 'Licenses'
  })
module.exports = mongoose.model('license', licenseSchema)