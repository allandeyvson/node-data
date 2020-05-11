const InterfaceDataBase = require('./interfaces/interfaceDataBase')
const Mongoose = require('mongoose')
const STATUS = {
    0: 'Disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Disconectando'
}
class MongoDB extends InterfaceDataBase {
    constructor() {
        super()
        this._teams = null
        this._driver = null
    }

    connect() {
        Mongoose.connect('mongodb://dev:minhasenhadev@localhost:27017/teams', { useNewUrlParser: true }, function (error) {
            if (!error) return
            console.error('Falha na conexão', error)
        })

        const connection = Mongoose.connection
        connection.once('open', () => console.log('database em funcionamento...'))
        
        this._driver = connection
        this._defineModel()
    }

    async isConnected() {
        const state = STATUS[this._driver.readyState]
        if(state == 'Conectado') return state

        if(state !== 'Conectando') return state

        await new Promise(resolve => setTimeout(resolve, 1000))
        
        return STATUS[this._driver.readyState]
    }

    async _defineModel() {
         const schema = new Mongoose.Schema({
            name:{
                type: String,
                required: true
            },
            country:{
                type: String,
                required: true
            }
        })
        this._teams = Mongoose.model('teams', schema)
    }

    create(item) {
        return this._teams.create(item)
    }

    read(item) {
        return this._teams.find(item)
    }

    update(id, item) {
        return this._teams.updateOne({_id: id}, {$set: item})
    }

    delete(item) {
        return this._teams.deleteOne({_id: item})
    }
}

module.exports = MongoDB