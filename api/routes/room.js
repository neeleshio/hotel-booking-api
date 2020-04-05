const express = require('express');
const router = express.Router();
const Room = require('../models/room');
const mongoose = require('mongoose');


router.get('/rooms', (req, res, next) => {
    Room.find().select("title _id ")
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => console.log(err));
});

router.post('/admin/rooms', (req, res, next) => {
    const room = new Room({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title
    });
    room.save().then(result => {
        res.status(200).json({
            message: 'room created',
            createdRoom: room
        });
    }).catch(err => {
        res.status(500).json({ error: err });
    })
});

module.exports = router;