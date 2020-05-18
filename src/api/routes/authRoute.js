const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('boom')
const Jwt = require('jsonwebtoken')
const failAction = (request, response, error) => {
    throw error
}
const credentials = require('../credentials.json')
const USER = {
    username: credentials.username,
    password: credentials.password
}

class AuthRoute extends BaseRoute {
    constructor(secret) {
        super()
        this.secret = secret
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

                if (username.toLowerCase() !== USER.username || password.toLowerCase() !== USER.password)
                    return Boom.unauthorized()

                const token = Jwt.sign({
                    username: username,
                    id: 1
                }, this.secret)

                return {
                    token
                }
            }
        }
    }
}

module.exports = AuthRoute