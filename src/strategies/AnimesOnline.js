const request = require('request')
const logger = require('knoblr')
const normalize = require('normalize-url')

class AnimesOnline {
    constructor(){
        this.HOST = process.env.ANIMES_ONLINE || ''
    }
    

    /**
     * @desc Gera um link do datasource a partir do Link passado
     */
    generateLink(anime){
        let path = anime.name.toLowerCase().split(' ').join('-')
        let episode = anime.episode
        let link = `${this.HOST}/${path}/episodio-${episode}`
        logger.info(`Link Generated: ${link}`)
        return link
    }

    /**
     * 
     * @desc Procura a informação dentro do HTML
     * 
     * @param {any} html 
     * @memberof Uol
     * @returns {Promise<any>}
     */
    search(response){
        return new Promise((resolve, reject) => {
            logger.info(`Making search for VIDEO`)
            //Pega o LINk do video
            const REGEX_LINKVIDEO = /id\=\"urlVideo\"\s+src\=\"\/\/(.?.*\==)/
            const regex = new RegExp(REGEX_LINKVIDEO,'ig')
            const linkVideo = regex.exec(response.body)[1] || ''
            logger.info(`Search done`)
            resolve(normalize(linkVideo))
        })
    }


    /**
     * @desc Passa um URL pra requisição, após a requisição ser resolvida, irá executar a resposta dela com a stretegy passada
     * 
     * @param {*} url 
     * @param {*} strategy
     */
    makeRequest(url){
        return new Promise((resolve, reject) => {
            logger.info(`Trying to request ${url}`)
            request(url, (err, response, body) => {
                if(err) { 
                    console.log(err)
                    logger.error(JSON.stringify(err))
                    reject(err)
                }
                logger.info(`Request successful`)
                resolve({body,response})
            })       
        })
    }

    execute(anime){
        return new Promise((resolve, reject) => {
            let url = this.generateLink(anime)
            this.makeRequest(url)
            .then(this.search)
            // .then(this.makeRequest) // Essa request tem que ir no site e pegar o ID da URL, ai sim pode salvar o ID da URL
            .then(link => {
                anime.link = link
                resolve(anime)
            })
           
        })
        
    }
}

module.exports = AnimesOnline