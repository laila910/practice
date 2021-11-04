const router = require('express').Router()

const postController = require('../controller/post.controller')
const auth = require('../middleware/auth')

router.post('/addPost', auth, postController.addPost)

router.get('/myPosts', auth, postController.myPosts)


module.exports = router