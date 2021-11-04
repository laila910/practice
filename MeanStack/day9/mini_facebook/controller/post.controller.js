const Post = require('../models/post.model')
const addPost = async(req, res) => {
    try {
        const post = new Post({
            ...req.body,
            userId: req.user._id
        })
        await post.save()
        res.status(200).send({
            apiStatus: true,
            data: post,
            message: "your post is added :)"
        })
    } catch (e) {
        res.status(500).send({
            apiStatus: false,
            data: e.message,
            message: "error in adding post ,please try again:("
        })
    }

}
const myPosts = async(req, res) => {
    try {
        await req.user.populate('myPosts')
        res.status(200).send({
            apiStatus: true,
            data: req.user.myPosts,
            message: "your posts shown :)"
        })
    } catch (e) {
        res.status(500).send({
            apiStatus: false,
            data: e.message,
            message: "not found any posts"
        })
    }
}
module.exports = { addPost, myPosts }