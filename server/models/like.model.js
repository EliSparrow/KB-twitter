const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let LikeSchema = new Schema ({

    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },

    commentId: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
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
}),


const Like = mongoose.model("Like", LikeSchema);
module.exports = Like;