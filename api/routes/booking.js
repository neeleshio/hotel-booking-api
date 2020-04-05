const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Booking = require('../models/booking');
const auth = require('../middleware/auth');
const User = require('../models/user');
const Hooking = require('../models/hooking')

router.get('/live', auth, (req, res, next) => {
    Hooking.find({ user: req.userId })
        .then(docs => {
            if (docs.length <= 0) {
                return res.status(200).json({
                    message: 'No Active rooms'
                })
            } else {
                return res.status(200).json({
                    Active_Rooms: docs.map(doc => {
                        return {
                            bookingId: doc._id,
                            room: doc.room
                        };
                    })
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.get('/myBookings', auth, (req, res, next) => {
    Booking.find({ user: req.userId })
        .select("room _id")
        .populate('room', 'title')
        .exec()
        .then(docs => {
            res.status(200).json({
                Bookings: docs.map(doc => {
                    return {
                        bookingId: doc._id,
                        room: doc.room,
                    };
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.post('/booking', auth, (req, res, next) => {
    Booking.find({ user: req.userId })
        .then(docs => {
            if (docs.length >= 1) {
                const newDate = Date().toString().split(' ', 4).join('-');
                const oldDate = docs.map(doc => { return { pp: doc.createdAt } })
                const prp = oldDate[0].pp;
                if (newDate === prp) {
                    return res.status(200).json({ message: 'daily limit reached' })
                }
                else {
                    var createdAt = "";
                    const book = new Booking({
                        _id: new mongoose.Types.ObjectId(),
                        room: req.body.roomId,
                        user: req.userId,
                        createdAt: Date().toString().split(' ', 4).join('-')
                    })
                    book.save().then(result => {
                        return User.findById(req.userId)
                    }).then(user => {
                        res.status(201).json({
                            message: 'Booking successful'
                        });
                    }).catch(err => console.log(err));

                    const hook = new Hooking({
                        _id: mongoose.Types.ObjectId(),
                        room: req.body.roomId,
                        user: req.userId
                    })
                    hook.save()
                }
            } else {
                var createdAt = "";
                const book = new Booking({
                    _id: new mongoose.Types.ObjectId(),
                    room: req.body.roomId,
                    user: req.userId,
                    createdAt: Date().toString().split(' ', 4).join('-')
                })
                book.save().then(result => {
                    return User.findById(req.userId)
                }).then(user => {
                    res.status(201).json({
                        message: 'Booking successful'
                    });
                }).catch(err => console.log(err));

                const hook = new Hooking({
                    _id: mongoose.Types.ObjectId(),
                    room: req.body.roomId,
                    user: req.userId
                })
                hook.save()
            }

        }).catch(err => {
            res.status(500).json({
                error: err
            });
        })
});

router.get('/yourBookings', auth, (req, res, next) => {
    Booking.find({ user: req.userId })
        .then(docs => {
            res.status(200).json({
                Bookings: docs.map(doc => {
                    return {
                        room: doc.room,
                        createdAt: doc.createdAt

                    };
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});


module.exports = router;