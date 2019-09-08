const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let LikeSchema = new Schema ({

    postId: {
        type: Schema.Types.ObjectId,
        ref: 'posts'
    },

    commentId: {
        type: Schema.Types.ObjectId,
        ref: 'comments'
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },

    createAt: {
        type: Date,
        default: Date.now
    },
});


const Like = mongoose.model("Like", LikeSchema);
module.exports = Like;