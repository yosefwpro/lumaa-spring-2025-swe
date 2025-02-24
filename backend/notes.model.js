const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Notes = new Schema({
   notes_title: {
      type: String,
      required: true
   },
   notes_body: {
      type: String,
      required: true
   }
});

module.exports = mongoose.model('Notes', Notes);
