const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  clientId:{
   type:mongoose.Schema.Types.ObjectId,
   ref:'Client'
  }
});
module.exports = mongoose.model('Client', ClientSchema)