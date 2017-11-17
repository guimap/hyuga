const mongoose = require('mongoose')
const dataSource = {
    name: {
        type:String
    },
    url :{
        type: String
    }
}
const schema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    dataSource: [dataSource],
    description: {
        type: String,
        required: false        
    },
    image: {
        type: String,
        required: false        
    },
    total_episodes: {
        type: Number,
        required: false,
        default: 0
    },
    episodes: {
        type: Array,
        required: false
    },
    new: {
        type: Boolean,
        require: false,
        default: false
    },
    categories:{
        type: Array,
        required: false
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    },
    lastUpdate: {
        type: Date,
        required: true,
        default: new Date()
    }

})

module.exports = mongoose.model('Anime',schema);