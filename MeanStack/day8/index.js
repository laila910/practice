const app = require('./src/app')
app.listen(process.env.PORT, () => { console.log(`connect to port ${process.env.PORT}`) })