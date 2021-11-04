const mongoose = require('mongoose')
try {
    mongoose.connect(process.env.dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true

    }).then(() => console.log('successfully connect to database'))
} catch (e) {
    console.log(e)
}