const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('boom')
const Jwt = require('jsonwebtoken')
const PassowordHelper = require('../../helpers/passwordHelper')

const failAction = (request, response, error) => {
    throw error
}
const credentials = require('../credentials.json')
const USER = {
    username: credentials.username,
    password: credentials.password
}

class AuthRoute extends BaseRoute {
    constructor(secret, db) {
        super()
        this.secret = secret
        this.db = db
    }

    login() {
        return {
            path: '/login',
            method: 'POST',
            config: {
                auth: false,
                tags: ['api'],
                description: 'Deve obter token',
                notes: 'Obtém token a partir de login e senha',
                validate: {
                    failAction,
                    payload: {
                        username: Joi.string().required(),
                        password: Joi.string().required()
                    }
                }
            },
            handler: async (request) => {
                const {
                    username,
                    password
                } = request.payload

                const [user] = await this.db.read({username: username.toLowerCase()})
                if(!user)
                    return Boom.unauthorized('O usuário informado não existe!')
                
                const match = await PassowordHelper.compare(password, user.password)
                if(!match)
                    return Boom.unauthorized('Usuário ou senha invalidos!')        

                const token = Jwt.sign({
                    username: username,
                    id: user.id
                }, this.secret)

                return {
                    token
                }
            }
        }
    }
}

module.exports = AuthRoute