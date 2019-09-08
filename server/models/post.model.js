const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let PostSchema = new Schema ({

    content: {
        type: String,
        max: 140,
        required: true
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

    updateAt: {
        type: Date,
        default: Date.now
    },
    likes: [
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    // comments: [
    //     {
    //         userId: {
    //             type: Schema.Types.ObjectId,
    //             ref: 'users'
    //         },
    //         content: {
    //             type: String,
    //             required: true
    //         },
    //         createAt: {
    //             type: Date,
    //             default: Date.now
    //         },
        
    //         updateAt: {
    //             type: Date,
    //             default: Date.now
    //         },
    //     }
    // ]
});


const Post = mongoose.model("Post", PostSchema);
module.exports = Post;