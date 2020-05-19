const InterfaceDataBase = require('../interfaces/interfaceDataBase')
const Sequelize = require('sequelize')

class PostgresSQLStrategy extends InterfaceDataBase {

    constructor(connection, schema){
        super()
        this.connection = connection
        this.schema = schema
    }
    
    static async defineModel(connection, schema){
        const model = connection.define(schema.name, schema.schema, schema.options)
        await model.sync()
        return model
    }

    static async connect(){
        const connection = new Sequelize(
            'teams',
            'dev',
            'minhasenhadev', {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorAliases: false, 
                logging: false
            }
        )
        return connection
    }

    async isConnected(){
        try{
            await this.connection.authenticate()
            return true
        }catch(error){
            console.log('fail', error)
            return false;
        }
    }

    async create(item){
        const {dataValues} = await this.schema.create(item)
        return dataValues
    }

    async read(item = {}){
        return this.schema.findAll({where: item, raw: true})
    }

    async update(id, item){
        return this.schema.update(item, {where: {id : id}})
    }

    delete(id){
        const query = id ? {id} : {}
        return this.schema.destroy({where: query})
    }
}

module.exports = PostgresSQLStrategy