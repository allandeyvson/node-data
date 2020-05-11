const Sequelize = require('sequelize')

const TeamSchema = {
    name: 'teams',
    schema : {
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
    }, 
    options: {
        tableName: 'teams', 
        freezeTableName: false,
        timestamps: false
    }
}

module.exports = TeamSchema