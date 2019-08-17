const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const FavoriteSchema = new Schema({
  location: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  api_key: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
});

module.exports = mongoose.model('favorite', FavoriteSchema);
