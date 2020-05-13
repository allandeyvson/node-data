const Hapi = require('hapi')
const Context = require('../db/strategies/base/contextStrategy')
const Mongo = require('../db/strategies/mongoDB/mongoDBStrategy')
const TeamSchema = require('../db/strategies/mongoDB/schemas/team')
const TeamRoute = require('./routes/teamRoute')

const api = new Hapi.Server({
    port: 9000
})

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}

async function main() {
    const connection = Mongo.connect()
    const context =  new Context(new Mongo(connection, TeamSchema))
    api.route([
        ... mapRoutes(new TeamRoute(context), TeamRoute.methods())
    ])

    await api.start()
    console.log('servidor rodando na porta ', api.info.port)

    return api
}
module.exports = main()