const mongoose = require('mongoose')
try {
    mongoose.connect(process.env.dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true

        })
        .then(() => {
            console.log(`successfully connected`)
        })
} catch (e) {
    console.log("error with connect to db ", e)
}