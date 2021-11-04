const mongoose = require('mongoose')
const validator = require('validator')

const Book = mongoose.model('Book', {
    name: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    author: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        minlength: 3,
        maxlength: 20
    },


    cat: {
        type: String,
        trim: true,
        enum: ["web", "mobile", "desktop"]
    },
    NumberofPages: {
        type: Number,
        validate(value) {
            if (value < 500) throw new Error('minmum age is 500')
        }
    }
})

module.exports = Book