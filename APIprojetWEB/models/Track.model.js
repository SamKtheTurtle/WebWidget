const mongoose = require('mongoose');

const TrackSchema = new mongoose.Schema(
  {
    title: String,
    duration: int, 
    listenings: int,
    likesL: int,
    featuring: [{type: Schema.Types.ObjectId, ref: 'Artist'}]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Track', TrackSchema);
