const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  fname: {
    type: String
  },
  lname: {
    type: String
  },
  role: {
    type: String
  },
  email: {
    type: String
  },
  status: {
    type: String
  },
  created: {
    type: String
  }
}, {
    collection: 'users'
  })

module.exports = mongoose.model('User', userSchema)