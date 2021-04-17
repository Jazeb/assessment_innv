const mongoose = require('mongoose');

const user = new mongoose.Schema({
    user_name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("user", user);