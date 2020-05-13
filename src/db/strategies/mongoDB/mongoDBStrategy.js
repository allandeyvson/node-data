const InterfaceDataBase = require('../interfaces/interfaceDataBase')
const Mongoose = require('mongoose')
const STATUS = {
    0: 'Disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Disconectando'
}
class MongoDB extends InterfaceDataBase {

    constructor(connection, schema) {
        super()
        this.schema = schema
        this.connection = connection
    }

    static connect() {
        Mongoose.connect('mongodb://dev:minhasenhadev@localhost:27017/teams', { 
            useNewUrlParser: true , 
            useUnifiedTopology: true
        }, function (error) {
            if (!error) return
            console.error('Falha na conexão', error)
        })

        const connection = Mongoose.connection
        //connection.once('open', () => console.log('database em funcionamento...'))
        return connection
    }

    async isConnected() {
        const state = STATUS[this.connection.readyState]
        if(state == 'Conectado') return state

        if(state !== 'Conectando') return state

        await new Promise(resolve => setTimeout(resolve, 1000))
        
        return STATUS[this.connection.readyState]
    }
    
    create(item) {
        return this.schema.create(item)
    }

    read(item, skip = 0, limit = 0) {
        return this.schema.find(item).skip(skip).limit(limit)
    }

    update(id, item) {
        return this.schema.updateOne({_id: id}, {$set: item})
    }

    delete(item) {
        return this.schema.deleteOne({_id: item})
    }
}

module.exports = MongoDB