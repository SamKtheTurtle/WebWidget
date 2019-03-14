const Album = require('../models/Album.model.js');

// Create and Save a new Album
exports.create = (req, res) => {
  // Validate request
  if (!req.body.firstName) {
    // If firstName is not present in body reject the request by
    // sending the appropriate http code
    return res.status(400).send({
      message: 'first name can not be empty'
    });
  }

  // Create a new Album
  const Album = new Album({
    firstName: req.body.firstName,
    lastName: req.body.lastName || ''
  });

  // Save Album in the database
  Album
    .save()
    .then(data => {
      // we wait for insertion to be complete and we send the newly Album integrated
      res.send(data);
    })
    .catch(err => {
      // In case of error during insertion of a new Album in database we send an
      // appropriate message
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Album.'
      });
    });
};

// Retrieve and return all Albums from the database.
exports.findAll = (req, res) => {
  Album.find()
    .then(Album => {
      res.send(Album);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Albums.'
      });
    });
};

// Find a single Album with an AlbumId
exports.findOne = (req, res) => {
  Album.findById(req.params.AlbumId)
    .then(Album => {
      if (!Album) {
        return res.status(404).send({
          message: 'Album not found with id ' + req.params.AlbumId
        });
      }
      res.send(Album);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Album not found with id ' + req.params.AlbumId
        });
      }
      return res.status(500).send({
        message: 'Error retrieving Album with id ' + req.params.AlbumId
      });
    });
};

// Update a Album identified by the AlbumId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.firstName) {
    return res.status(400).send({
      message: 'first name can not be empty'
    });
  }

  // Find Album and update it with the request body
  Album.findByIdAndUpdate(
    req.params.AlbumId,
    {
      title: req.body.firstName,
      content: req.body.lastName || ''
    },
    { new: true }
  )
    .then(Album => {
      if (!Album) {
        return res.status(404).send({
          message: 'Album not found with id ' + req.params.AlbumId
        });
      }
      res.send(Album);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Album not found with id ' + req.params.AlbumId
        });
      }
      return res.status(500).send({
        message: 'Error updating Album with id ' + req.params.AlbumId
      });
    });
};

// Delete a Album with the specified AlbumId in the request
exports.delete = (req, res) => {
  Album.findByIdAndRemove(req.params.AlbumId)
    .then(Album => {
      if (!Album) {
        return res.status(404).send({
          message: 'Album not found with id ' + req.params.AlbumId
        });
      }
      res.send({ message: 'Album deleted successfully!' });
    })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: 'Album not found with id ' + req.params.AlbumId
        });
      }
      return res.status(500).send({
        message: 'Could not delete Album with id ' + req.params.AlbumId
      });
    });
};

// WIDGET 5 
// Find a single Album Cover URL with an AlbumId
exports.findCover = (req, res) => {
  var CoverURL = Album.findById(req.params.AlbumId, 'coverURL')
CoverURL
    .then(CoverURL => {
      if (!CoverURL) {
        return res.status(404).send({
          message: 'Album not found with id ' + req.params.AlbumId
        });
      }
      res.send(CoverURL);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Album not found with id ' + req.params.AlbumId
        });
      }
      return res.status(500).send({
        message: 'Error retrieving Album with id ' + req.params.AlbumId
      });
    });
};

// WIDGET 3 
// Retrieve and return all Albums Style from the database.
exports.findAllStyle = (req, res) => {
  var AllStyle = Album.find('style');
  AllStyle
    .then(AllStyle => {
      res.send(AllStyle);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Albums.'
      });
    });
};


// WIDGET 4 & 2
// Find a single Album Tracks with an AlbumId
exports.findTracks = (req, res) => {
  var Tracks = Album.findById(req.params.AlbumId, 'tracks')
  Tracks
    .then(Tracks => {
      if (!Tracks) {
        return res.status(404).send({
          message: 'Album not found with id ' + req.params.AlbumId
        });
      }
      res.send(Tracks);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Album not found with id ' + req.params.AlbumId
        });
      }
      return res.status(500).send({
        message: 'Error retrieving Album with id ' + req.params.AlbumId
      });
    });
};