const InterfaceDataBase = require('./interfaces/interfaceDataBase')
const Sequelize = require('sequelize')

class PostgresSQLStrategy extends InterfaceDataBase {

    constructor(){
        super()
        this._driver = null
        this._teams = null
    }
    
    async _defineModel(){
        this._teams = await this._driver.define('teams', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true
            }, 
            name: {
                type: Sequelize.STRING,
                require: true
            }, 
            country: {
                type: Sequelize.STRING,
                require: true
            }
        }, {
            tableName: 'teams', 
            freezeTableName: false,
            timestamps: false
        })
        await this._teams.sync()
    }

    async connect(){
        this._driver = new Sequelize(
            'teams',
            'dev',
            'minhasenhadev', {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorAliases: false
            }
        )
       await this._defineModel()
    }

    async isConnected(){
        try{
            await this._driver.authenticate()
            return true
        }catch(error){
            console.log('fail', error)
            return false;
        }
    }

    async create(item){
        const {dataValues} = await this._teams.create(item)
        return dataValues
    }

    async read(item = {}){
        return this._teams.findAll({where: item, raw: true})
    }

    async update(item){
        return this._teams.update(item, {where: {id : item.id}})
    }

    delete(item){
    }
}

module.exports = PostgresSQLStrategy