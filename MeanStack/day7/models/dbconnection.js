const MongoClient = require('mongodb').MongoClient


const connection = (cb) => {
    MongoClient.connect(process.env.dburl, {}, (err, client) => {
        if (err) return cb(err, false)
        db = client.db(process.env.dbname)
        cb(false, db)
    })

}

module.exports = connection