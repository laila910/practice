const mongoose = require('mongoose')
const validator = require('validator')

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    content: {
        type: String,
        required: function() { return postType == "txt" }
    },
    postType: {
        type: String,
        enum: ['img', 'text', 'video'],
        trim: true,
        required: true

    },
    postFile: {
        type: String,
        required: function() { return postType != "txt" }

    },
    audience: {
        type: String,
        enum: ['public', 'onlyMe', 'custom'],
        default: 'public'

    },
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        details: {
            type: String

        }
    }],
    likes: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true

        }
    }]
}, {
    timestamps: true
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post