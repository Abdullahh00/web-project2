const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let productSchema = new Schema({
  name: {
    type: String
  },
  version: {
    type: String
  },
  description: {
    type: String
  }
}, {
    collection: 'Products'
  })
module.exports = mongoose.model('product', productSchema)