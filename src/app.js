const logger = require('knoblr')
const http = require('http')
const request = require('request')
const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')

const StrategyBuilder = require('./strategies/StrategyBuilder')
const Anime = require('./model/anime');

//Conecta no banco
const _connect = () => {
    mongoose.connect('mongodb://localhost/easyanime');
}

//Retrieve all animes
const retrieve = () => {
    logger.info(`Getting all Animes`)
    return Anime.find()
    .lean()
    .exec()
}


//Formate all animes for episode format 
const formatResponse = (animes) => {
    let episodes = animes.reduce((prev,current,index, array) => {
        let listEpisodes = []
        //Pego o primeiro anime, e gero uma lista de episódios
        for(let i = 1; i <= current.total_episodes; i++){
            
            listEpisodes.push({
                _id: new ObjectId(current._id),
                name: current.name,
                episode: i,
                datasource: current.dataSource ? current.dataSource[0].code || {} : 'uol'
            })
        }
        return prev.concat(listEpisodes)
    },[])
    return Promise.resolve(episodes)
}
 
const map = (anime) => {
    
}



const init = () => {
    _connect()
    retrieve()
    .then(formatResponse)
    .then(animes => {
        logger.info(`found ${animes.length} episode(s)`)
        let builder = new StrategyBuilder()
        let arrPromisses = []
        for ( let anime of animes )  {
            console.log(anime)
            let strategy = builder.build(anime.datasource)    
            let promise = strategy.execute(anime)
            arrPromisses.push(promise)
        }

        Promise.all(arrPromisses)
        .then(responses => {
            //Resolve all response and then do something
            for (let anime of responses){
                logger.info(`Updating [${anime._id}] ${anime.name} episode ${anime.episode}`)
                //Pega cada um dos episodios e atualiza a base
                
                Anime.update({ _id: new ObjectId(anime._id) } , 
                    { $push: { 
                        episodes:  {
                            name: anime.name,
                            number: anime.episode,
                            link: anime.link,
                            lastUpdated: new Date(),
                            datasource: anime.datasource
                        }
                    }
                })
                .exec();
            }
            // console.log(responses)
        })
        .catch(console.error)
            
    })
    .catch(console.error)
}


//Mocks..
const {ANIMES} = require('./mocks/animes')

logger.info(`Starting Hyuga`)
init()





