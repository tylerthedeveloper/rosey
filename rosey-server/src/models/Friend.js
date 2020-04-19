const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    name: {
        type: String,
        required: true
    },
    picture: {
        type: String
    },
    placeMetAt: {
        timestamp: Number,
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

mongoose.model('Friend', friendSchema);