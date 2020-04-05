const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    createdAt: String,
    room: { type: mongoose.Types.ObjectId, ref: 'Rooms' },
    user: { type: mongoose.Types.ObjectId, ref: 'Users' }
});

module.exports = mongoose.model('Bookings', orderSchema);

