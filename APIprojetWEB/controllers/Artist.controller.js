const Artist = require('../models/Artist.model.js');

// Create and Save a new Artist
exports.create = (req, res) => {
  // Validate request
  if (!req.body.firstName) {
    // If firstName is not present in body reject the request by
    // sending the appropriate http code
    return res.status(400).send({
      message: 'first name can not be empty'
    });
  }

  // Create a new Artist
  const Artist = new Artist({
    firstName: req.body.firstName,
    lastName: req.body.lastName || ''
  });

  // Save Artist in the database
  Artist
    .save()
    .then(data => {
      // we wait for insertion to be complete and we send the newly Artist integrated
      res.send(data);
    })
    .catch(err => {
      // In case of error during insertion of a new Artist in database we send an
      // appropriate message
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Artist.'
      });
    });
};

// Retrieve and return all Artists from the database.
exports.findAll = (req, res) => {
  Artist.find()
    .then(Artist => {
      res.send(Artist);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Artists.'
      });
    });
};

// Find a single Artist with an ArtistId
exports.findOne = (req, res) => {
  Artist.findById(req.params.ArtistId)
    .then(Artist => {
      if (!Artist) {
        return res.status(404).send({
          message: 'Artist not found with id ' + req.params.ArtistId
        });
      }
      res.send(Artist);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Artist not found with id ' + req.params.ArtistId
        });
      }
      return res.status(500).send({
        message: 'Error retrieving Artist with id ' + req.params.ArtistId
      });
    });
};

// Update a Artist identified by the ArtistId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.firstName) {
    return res.status(400).send({
      message: 'first name can not be empty'
    });
  }

  // Find Artist and update it with the request body
  Artist.findByIdAndUpdate(
    req.params.ArtistId,
    {
      title: req.body.firstName,
      content: req.body.lastName || ''
    },
    { new: true }
  )
    .then(Artist => {
      if (!Artist) {
        return res.status(404).send({
          message: 'Artist not found with id ' + req.params.ArtistId
        });
      }
      res.send(Artist);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Artist not found with id ' + req.params.ArtistId
        });
      }
      return res.status(500).send({
        message: 'Error updating Artist with id ' + req.params.ArtistId
      });
    });
};

// Delete a Artist with the specified ArtistId in the request
exports.delete = (req, res) => {
  Artist.findByIdAndRemove(req.params.ArtistId)
    .then(Artist => {
      if (!Artist) {
        return res.status(404).send({
          message: 'Artist not found with id ' + req.params.ArtistId
        });
      }
      res.send({ message: 'Artist deleted successfully!' });
    })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: 'Artist not found with id ' + req.params.ArtistId
        });
      }
      return res.status(500).send({
        message: 'Could not delete Artist with id ' + req.params.ArtistId
      });
    });
};

// WIDGET 1 
// Find the number of album of one Artist with an ArtistId
exports.findNbrAlbum = (req, res) => {
  var nbrAlbum = Artist.findById(req.params.ArtistId, 'albums')
  nbrAlbum
    .then(nbrAlbum => {
      if (!nbrAlbum) {
        return res.status(404).send({
          message: 'Artist not found with id ' + req.params.ArtistId
        });
      }
      res.send(nbrAlbum.length);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Artist not found with id ' + req.params.ArtistId
        });
      }
      return res.status(500).send({
        message: 'Error retrieving Artist with id ' + req.params.ArtistId
      });
    });
};

