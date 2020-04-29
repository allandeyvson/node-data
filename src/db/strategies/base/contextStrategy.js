const InterfaceCrud = require('./../interfaces/interfaceCrud')

class ContextStrategy extends InterfaceCrud {
    constructor(strategy){
        super()
        this._dataBase = strategy
    }

    create(item){
        this._dataBase.create(item)
    }

    read(item){
        this._dataBase.read(item)
    }

    update(item){
        this._dataBase.update(item)
    }

    delete(item){
        this._dataBase.delete(item)
    }
}

module.exports = ContextStrategy