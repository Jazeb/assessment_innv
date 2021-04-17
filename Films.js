const mongoose = require('mongoose');

const films = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    release_date: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0,
        required: true,
    },
    ticket_price: {
        type: Number,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    genres: [
        {
            type: String,
            required: true,
        }
    ],
    comments: [
        {
            name: { type: String, required: true },
            comment: { type: String, required: true },
        }
    ]
});

module.exports = mongoose.model("films", films);