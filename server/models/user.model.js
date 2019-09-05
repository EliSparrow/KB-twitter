const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {
        type: String,
        min: 3,
        max: 15,
        unique: true,
        required: true
    },

    email: {
        type: String,
        required: true,
        validate: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
    },

    birthdate: {
        type: Date,
        validate: /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
        required: true,
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

const User = mongoose.model("User", UserSchema);
module.exports = User;