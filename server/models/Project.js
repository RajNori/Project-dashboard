const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum:['Planning','In progress','Completed']
  },
});
module.exports = mongoose.model('Project', ProjectSchema);
