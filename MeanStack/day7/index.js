require('dotenv').config()

const app = require('./src/app')
app.listen(process.env.PORT, () => {
    console.log("listen to port 3000")
})