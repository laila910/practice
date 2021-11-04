const PORT = 3000
const express = require('express')

const hbs = require('hbs')
const https = require('https')
const path = require('path')
const app = express()
const publicfiles = path.join(__dirname, '../public')
const viewsfiles = path.join(__dirname, '../sources/viewes')
const layoutfiles = path.join(__dirname, '../sources/layout')
app.set('view engine', 'hbs')
app.use(express.static(publicfiles))
app.set('views', viewsfiles)
hbs.registerPartials(layoutfiles)
    //routes
getApiData = ((apiUrl, cb) => {
    const req = https.request(apiUrl, res => {
        let data = ""
        res.on('data', (d) => {
            data += d.toString()
        })
        res.on('end', () => {

            cb(JSON.parse(data), false)
        })
    })
    req.on('error', (err) => {
        cb(false, err)
    })
    req.end()

})
app.get('', (req, res) => {
    const url = "https://jsonplaceholder.typicode.com/posts"
    getApiData(url, (result, error) => {
        if (error) {
            res.render('err404', {
                title: "error 404 page"
            })
        } else {
            res.render('home', {
                title: "home page",
                data: result
            })
        }
    })

})
app.get('/single', (req, res) => {
    res.render('single', {
        title: "single page"
    })
})
app.get('*', (req, res) => {
    res.render('err404', {
        title: "error 404 page"
    })
})
app.listen(PORT, () => console.log('listen to port 3000'))