const Hapi = require('hapi')
const Context = require('../db/strategies/base/contextStrategy')
const Mongo = require('../db/strategies/mongoDB/mongoDBStrategy')
const TeamSchema = require('../db/strategies/mongoDB/schemas/team')
const TeamRoute = require('./routes/teamRoute')
const Vision = require('vision')
const Inert = require('inert')
const HapiSwagger = require('hapi-swagger')

const api = new Hapi.Server({
    port: 9000
})

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}

async function main() {
    const connection = Mongo.connect()
    const context =  new Context(new Mongo(connection, TeamSchema))
    
    const swaggerOptions = {
        info: {
            title: 'API para manipulação de times de futebol',
            version: 'v1.0.0'
        },
        lang: 'pt'
    }

    await api.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ])

    api.route([
        ... mapRoutes(new TeamRoute(context), TeamRoute.methods())
    ])

    await api.start()
    console.log('servidor rodando na porta ', api.info.port)

    return api
}
module.exports = main()