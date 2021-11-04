const router = require('express').Router()
const BookController = require('../controller/book.controller')

const BookModel = require('../models/book.model')
router.post('/addBook', async(req, res) => {

    try {
        const BookData = new BookModel(req.body)
        await BookData.save()
        res.send(BookData)
    } catch (e) {
        res.send(e)
    }
})
router.get('/all', async(req, res) => {
    try {
        const data = await BookModel.find()
        res.send(data)
    } catch (e) {
        res.send(e)
    }
})
router.get('/all/:id', async(req, res) => {
    try {
        const data = await BookModel.findById(req.params.id)
        if (!data) res.send('Book not found')
        res.send(data)
    } catch (e) {
        res.send(e)
    }
})
router.delete('/all/:id', async(req, res) => {
    try {
        const data = await BookModel.findByIdAndDelete(req.params.id)
        if (!data) res.send('book not found')
        res.send('deleted')
    } catch (e) {
        res.send(e)
    }
})
router.patch('/all/:id', async(req, res) => {
    avalUpdatates = ["name", " NumberofPages", "cat", "author"]
    requested = Object.keys(req.body)
    isValid = requested.every(r => avalUpdatates.includes(r))
    if (!isValid) res.send('updates unavaliable')
    try {
        const data = await BookModel.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
        if (!data) res.send('book not found')
        res.send('done')
    } catch (e) {
        res.send(e)
    }
})
module.exports = router