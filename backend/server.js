const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const notesRoutes = express.Router();
const PORT = 4000;

let Notes = require('./notes.model');

app.use( cors() );
app.use( bodyParser.json() );

mongoose.connect('mongodb://127.0.0.1:27017/noteapp', {useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', function() {
   console.log('MongoDB Database connection established successfully');
});

notesRoutes.route('/').get(function(req, res) {
   Notes.find(function(err, notes) {
      if (err) {
         console.log(err);
      } else {
         res.json(notes);
      } 
   });
});

notesRoutes.route('/:id').get(function(req, res) {
   let id = req.params.id;
   Notes.findById(id, function(err, notes) {
      res.json(notes);
   });
});

notesRoutes.route('/update/:id').post(function(req, res) {
   Notes.findById(req.params.id, function(err, notes) {
      if (!notes) {
         res.status(404).send('Data is not found');
      } else {
         notes.notes_title = req.body.notes_title;
         notes.notes_body = req.body.notes_body;

         notes.save().then(notes => {
            res.json('Notes Updated!');
         })
         .catch(err => {
            res.status(400).send('Update not possible');
         });
      }
   });
});

notesRoutes.route('/add').post(function(req, res) {
   let notes = new Notes(req.body);
   notes.save()
      .then(notes => {
         res.status(200).json({'notes': 'notes added successfully'});
      })
      .catch(err => {
         res.status(400).send('adding new notes failed')
      });
});

app.use('/notes', notesRoutes);

app.listen(PORT, function() {
   console.log(`Server is runing on port: ${PORT}`);
});
