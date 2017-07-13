const server = require('express')()
require('dotenv').config()
require('./src/app.js')(server)


server.listen(3000,() => {
    console.log(`Server running at ${process.env.PORT}`)
})