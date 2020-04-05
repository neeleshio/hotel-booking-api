const mongoose = require('mongoose');

const borderSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    user: { type: mongoose.Types.ObjectId, ref: 'Users' },
    room: { type: mongoose.Types.ObjectId, ref: 'Rooms' },
    createdAt: { type: Date, required: true, default: Date(), expires: 180 }
});

module.exports = mongoose.model('Hookings', borderSchema);

