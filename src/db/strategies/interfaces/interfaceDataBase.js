const NoImplementedException = require('../exceptions/noImplementedException')

class InterfaceDataBase {
    
    connect(){
        throw new NoImplementedException()
    }
    
    isConnected(){
        throw new NoImplementedException()
    }

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

module.exports = InterfaceDataBase;