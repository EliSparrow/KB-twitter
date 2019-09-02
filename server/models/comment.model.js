const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CommentSchema = new Schema ({

    content: {
        type: String,
        max: 140,
        required: true
    },

    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
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

    updateAt: {
        type: Date,
        default: Date.now
    },
}),


const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;