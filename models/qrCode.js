const mongoose = require('mongoose')


const qrCodeSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  qrCodeImage: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('QRCode', qrCodeSchema);