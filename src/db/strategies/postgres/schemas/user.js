const Sequelize = require('sequelize')

const UserSchema = {
    name: 'users',
    schema : {
        id: {
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true
        }, 
        username: {
            type: Sequelize.STRING,
            require: true,
            unique: true
        }, 
        password: {
            type: Sequelize.STRING,
            require: true
        }
    }, 
    options: {
        tableName: 'users', 
        freezeTableName: false,
        timestamps: false
    }
}

module.exports = UserSchema