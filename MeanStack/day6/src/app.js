const express = require('express')
const path = require('path')
const hbs = require('hbs')

const app = express()
const useroutes = require('../routes/user.routes')
const publicfile = path.join(__dirname, '../public')
const layoutfiles = path.join(__dirname, '../resources/layouts')
const viewsfiles = path.join(__dirname, '../resources/views')

app.set('view engine', 'hbs')
app.use(express.static(publicfile))

app.set('views', viewsfiles)
hbs.registerPartials(layoutfiles)
app.use(express.urlencoded({
        extended: true
    }))
    // //routes
    // app.get('', (req, res) => {
    //     res.send('home page')
    // })
app.use(useroutes)
module.exports = app