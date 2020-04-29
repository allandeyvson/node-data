const InterfaceCrud = require('./interfaces/interfaceCrud')

class MongoDB extends InterfaceCrud {
    constructor(){
        super()
    }

    create(item){
        console.log('o item foi salvo no mongoDB')
    }

    read(item){
        console.log('o item foi lido no mongoDB')
    }

    update(item){
        console.log('o item foi atualizado no mongoDB')
    }

    delete(item){
        console.log('o item foi deletado no mongoDB')
    }
}

module.exports = MongoDB