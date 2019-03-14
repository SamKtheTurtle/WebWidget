const Track = require('../models/Track.model.js');

// Create and Save a new Track
exports.create = (req, res) => {
  // Validate request
  if (!req.body.firstName) {
    // If firstName is not present in body reject the request by
    // sending the appropriate http code
    return res.status(400).send({
      message: 'first name can not be empty'
    });
  }

  // Create a new Track
  const Track = new Track({
    firstName: req.body.firstName,
    lastName: req.body.lastName || ''
  });

  // Save Track in the database
  Track
    .save()
    .then(data => {
      // we wait for insertion to be complete and we send the newly Track integrated
      res.send(data);
    })
    .catch(err => {
      // In case of error during insertion of a new Track in database we send an
      // appropriate message
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Track.'
      });
    });
};

// Retrieve and return all Tracks from the database.
exports.findAll = (req, res) => {
  Track.find()
    .then(Track => {
      res.send(Track);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Tracks.'
      });
    });
};

// Find a single Track with a TrackId
exports.findOne = (req, res) => {
  Track.findById(req.params.TrackId)
    .then(Track => {
      if (!Track) {
        return res.status(404).send({
          message: 'Track not found with id ' + req.params.TrackId
        });
      }
      res.send(Track);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Track not found with id ' + req.params.TrackId
        });
      }
      return res.status(500).send({
        message: 'Error retrieving Track with id ' + req.params.TrackId
      });
    });
};

// Update a Track identified by the TrackId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.firstName) {
    return res.status(400).send({
      message: 'first name can not be empty'
    });
  }

  // Find Track and update it with the request body
  Track.findByIdAndUpdate(
    req.params.TrackId,
    {
      title: req.body.firstName,
      content: req.body.lastName || ''
    },
    { new: true }
  )
    .then(Track => {
      if (!Track) {
        return res.status(404).send({
          message: 'Track not found with id ' + req.params.TrackId
        });
      }
      res.send(Track);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Track not found with id ' + req.params.TrackId
        });
      }
      return res.status(500).send({
        message: 'Error updating Track with id ' + req.params.TrackId
      });
    });
};

// Delete a Track with the specified TrackId in the request
exports.delete = (req, res) => {
  Track.findByIdAndRemove(req.params.TrackId)
    .then(Track => {
      if (!Track) {
        return res.status(404).send({
          message: 'Track not found with id ' + req.params.TrackId
        });
      }
      res.send({ message: 'Track deleted successfully!' });
    })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: 'Track not found with id ' + req.params.TrackId
        });
      }
      return res.status(500).send({
        message: 'Could not delete Track with id ' + req.params.TrackId
      });
    });
};

// WIDGET 4 
// Find a single Track Duration with a TrackId
exports.findDuration = (req, res) => {
  var TrackDuration = Track.findById(req.params.TrackId, 'duration')
  TrackDuration
    .then(TrackDuration => {
      if (!TrackDuration) {
        return res.status(404).send({
          message: 'Track not found with id ' + req.params.TrackId
        });
      }
      res.send(TrackDuration);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Track not found with id ' + req.params.TrackId
        });
      }
      return res.status(500).send({
        message: 'Error retrieving Track with id ' + req.params.TrackId
      });
    });
};

// WIDGET 2
// Find a single Track Listenings with a TrackId
exports.findDuration = (req, res) => {
  var TrackListenings = Track.findById(req.params.TrackId, 'listenings')
  TrackListenings
    .then(TrackListenings => {
      if (!TrackListenings) {
        return res.status(404).send({
          message: 'Track not found with id ' + req.params.TrackId
        });
      }
      res.send(TrackListenings);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Track not found with id ' + req.params.TrackId
        });
      }
      return res.status(500).send({
        message: 'Error retrieving Track with id ' + req.params.TrackId
      });
    });
};
