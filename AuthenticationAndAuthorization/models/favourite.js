const mongoose= require('mongoose');

const favouriteSchema= mongoose.Schema({
  houseId: {type: mongoose.Schema.Types.ObjectId, required: true, unique: true, ref: 'Home'}
})

module.exports = mongoose.model('Favourite', favouriteSchema);