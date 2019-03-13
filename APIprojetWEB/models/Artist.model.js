const mongoose = require('mongoose');

const ArtistSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Artist', ArtistSchema);
