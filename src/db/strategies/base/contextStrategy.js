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

    
    read(item, skip, limit){
        return this._dataBase.read(item, skip, limit)
    }
    
    update(id,item){
        return this._dataBase.update(id,item)
    }

    delete(item){
        return this._dataBase.delete(item)
    }
}

module.exports = ContextStrategy;