const request = require('request')
getapiData = (url, cb) => {
    request({ url, json: true }, (err, res) => {
        cb(res.body)
    })
}
URL = "https://jsonplaceholder.typicode.com/posts"
getapiData(URL, (res) => {
    console.log(res)
})