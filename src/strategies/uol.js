const request = require('request')

class Uol {
    constructor(){
        this.HOST = process.env.UOL || ''
    }   
     
     /**
     * @desc Gera um link do datasource a partir do Link passado
     */
    generateLink(anime){
        let query = `${anime.name.split(' ').join('+')}+${anime.episode}`
        let path = `/sys/search?num=12&start=1&lm=1&order=1&types=A&edFilter=&safeSearch=&viewHotContent=0&q=${query}`
        return `${this.HOST}/${path}`
    }


    /**
     * 
     * @desc Procura a informação dentro do HTML
     * 
     * @param {any} html 
     * @memberof Uol
     */
    search(html){
        
    }
}

module.exports = Uol