const mongoose = require('mongoose');

const roseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    // TODO: Nickname...
    name: {
        type: String,
        required: true
    },
    picture: {
        type: String
    },
    email: {
        type: String
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
});

mongoose.model('Rose', roseSchema);