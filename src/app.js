const logger = require('knoblr')
const http = require('http')
const request = require('request')

const StrategyBuilder = require('./strategies/StrategyBuilder')


//Mocks..
const {ANIMES} = require('./mocks/animes')

logger.info(`Starting Hyuga`)
logger.info(`Getting all Animes`)




let builder = new StrategyBuilder()
let arrPromisses = []
for ( let anime of ANIMES )  {
    let strategy = builder.build(anime.datasource)    
    let promise = strategy.execute(anime)
    arrPromisses.push(promise)
}

Promise.all(arrPromisses)
.then(responses => {
    console.log(responses)
})
.catch(console.error)



