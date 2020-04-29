const NoImplementedException = require('./../exceptions/noImplementedException')

class InterfaceCrud {
    create(item){
        throw new NoImplementedException()
    }

    read(item){
        throw new NoImplementedException()
    }

    update(item){
        throw new NoImplementedException()
    }

    delete(item){
        throw new NoImplementedException()
    }
}

module.exports = InterfaceCrud