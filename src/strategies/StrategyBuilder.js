const AnimesOnline = require('./AnimesOnline'),
      Uol = require('./Uol.js')
class StrategyBuilder{
    constructor(){ } 


    /**
     * @desc Retorna um strategy de acordo com a string passada, caso não tenha, retorna UOL como padrão.
     * @param {*} strategy 
     */
    build(strategy){
        switch(strategy.toLowerCase()) {
            case 'animesonline': 
                return new AnimesOnline();

        default:
            return new Uol()
            
        }
    }
}

module.exports = StrategyBuilder