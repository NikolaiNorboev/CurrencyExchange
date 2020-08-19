const mongoose = require('mongoose');

const valutesSchema = new mongoose.Schema({
  idCBR: {
    type: String,
    unique: true,
    required: true,
  },
  nameRus: {
    type: String,
    unique: true,
    required: true,
  },
  charCode: {
    type: String,
    unique: true,
    required: true,
  },
  nominal: {
    type: Number,
    required: true,
  }
})

module.exports = mongoose.model('Valutes', valutesSchema);
