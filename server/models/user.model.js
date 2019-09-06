const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },

    birthdate: {
        type: Number,
        // required: true,
    },

    admin: {
        type: Boolean,
        default: false
    },

    banned: {
        status: {
            type: Boolean,
            default: false
        },
        Date: {
            type: Date
        }
    },

    suspended: {
        type: Boolean,
        default: false
    },

    avatar: {
        type: String
    },

    description: {
        type: String
    },

    website: {
        type: String,
        validate: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
    },

    language: {
        type: String
    },


    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = User = mongoose.model('user', UserSchema);