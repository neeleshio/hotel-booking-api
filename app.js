const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodemon = require('nodemon');

const bookingRoute = require('./api/routes/booking');
const roomRoute = require('./api/routes/room');
const userRoute = require('./api/routes/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', bookingRoute);
app.use('/', roomRoute);
app.use('/', userRoute);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Method', 'GET, POST, PUT, PATCH, DELETE');
        return res.status(200).json({})
    }
})

mongoose.connect('mongodb+srv://codeshetty:8197305620@cluster0-urk1m.mongodb.net/meeting-room', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(result => {
    console.log('connected')
    app.listen(process.env.PORT || 3000);
}).catch(err => { console.log(err) });


