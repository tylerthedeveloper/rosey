const mongoose = require('mongoose');

const roseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    name: {
        type: String,
        required: true
    },
    nickName: {
        type: String,
    },
    picture: {
        type: String
    },
    email: {
        type: String
    },
    phoneNumber: {
        type: Number
    },
    dateMet: {
        type: Number
    },
    placeMetAt: {
        placeName: String,
        coords: {
            latitude: Number,
            longitude: Number,
            // altitude: Number,
            // accuracy: Number,
            // heading: Number,
            // speed: Number
        },
    },
    tags: [String],
    birthday: {
        type: Number
    }
});

mongoose.model('Rose', roseSchema);