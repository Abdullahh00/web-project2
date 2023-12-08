const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let adminSchema = new Schema({
 
  email: {
    type: String
  },
  password: {
    type: String
  },
  username: {
    type: String
  }
}, {
    collection: 'Admin'
  })
module.exports = mongoose.model('admin', adminSchema)