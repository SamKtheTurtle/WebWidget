const mongoose = require('mongoose');

const ArtistSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: String, 
    birth: Date,
    followers: int,
    albums: [{type: Schema.Types.ObjectId, ref: 'Album'}]
  },
  {
    timestamps: true
  }
);



module.exports = mongoose.model('Artist', ArtistSchema);
