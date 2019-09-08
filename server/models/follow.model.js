const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let FollowSchema = new Schema({

    followedId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true

    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },

    createAt: {
        type: Date,
        default: Date.now
    },

})


const Follow = mongoose.model("Follow", FollowSchema);
module.exports = Follow;