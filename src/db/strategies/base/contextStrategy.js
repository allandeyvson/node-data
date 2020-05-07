const InterfaceDataBase = require('../interfaces/interfaceDataBase')

class ContextStrategy extends InterfaceDataBase {
    
    constructor(strategy){
        super()
        this._dataBase = strategy
    }

    connect(){
        return this._dataBase.connect()
    }

    isConnected(){
        return this._dataBase.isConnected()
    }

    create(item){
        return this._dataBase.create(item)
    }

    read(item){
        return this._dataBase.read(item)
    }

    update(item){
        return this._dataBase.update(item)
    }

    delete(item){
        return this._dataBase.delete(item)
    }
}

module.exports = ContextStrategy;