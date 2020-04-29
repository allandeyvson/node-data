const InterfaceCrud = require('./interfaces/interfaceCrud')

class Postgres extends InterfaceCrud {
    constructor(){
        super()
    }

    create(item){
        console.log('o item foi salvo no postgres')
    }

    read(item){
        console.log('o item foi lido no postgres')
    }

    update(item){
        console.log('o item foi atualizado no postgres')
    }

    delete(item){
        console.log('o item foi deletado no postgres')
    }
}

module.exports = Postgres