const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    title: String
});

module.exports = mongoose.model('Rooms', roomSchema);