const Mongoose = require('mongoose')

const TeamSchema = new Mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    }
})

module.exports = Mongoose.model('team', TeamSchema)