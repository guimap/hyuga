const glob = require('glob')
const logger = require('knoblr')


module.exports = (server) => {
    server.get('/', (req, res) => {
        res.send(JSON.stringify({text: 'OK'}))
    });
}



