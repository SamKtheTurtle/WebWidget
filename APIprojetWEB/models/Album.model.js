const mongoose = require('mongoose');

const AlbumSchema = new mongoose.Schema(
  {
    title: String,
    release: Date, 
    style: String,
    coverURL: String,
    tracks: [{type: Schema.Types.ObjectId, ref: 'Track'}]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Album', AlbumSchema);
