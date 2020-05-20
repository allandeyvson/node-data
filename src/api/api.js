const {config} = require('dotenv')
const {join} = require('path')
const {ok} = require('assert')

const env = process.env.NODE_ENV || "dev"
ok(env === "prod" || env === "dev", "env é invalida!")

const configPath = join(__dirname, '../../config', `.env.${env}`)
config({
    path: configPath
})

const Hapi = require('hapi')
const Context = require('../db/strategies/base/contextStrategy')
const Mongo = require('../db/strategies/mongoDB/mongoDBStrategy')

const TeamSchema = require('../db/strategies/mongoDB/schemas/team')
const TeamRoute = require('./routes/teamRoute')

const UserSchema = require('../db/strategies/postgres/schemas/user')
const Postgres = require('../db/strategies/postgres/postgresSQLStrategy')

const AuthRoute = require('./routes/authRoute')
const apiKey = process.env.PRIVATE_KEY
const HapiJwt = require('hapi-auth-jwt2')

const Vision = require('vision')
const Inert = require('inert')
const HapiSwagger = require('hapi-swagger')

const PasswordHelper = require('../helpers/passwordHelper')


const api = new Hapi.Server({
    port: process.env.PORT
})

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}

async function main() {
    const connection = Mongo.connect()
    const context =  new Context(new Mongo(connection, TeamSchema))

    const connectionPostgres = await Postgres.connect()
    const model = await Postgres.defineModel(connectionPostgres, UserSchema)
    const contextPostgres = new Context(new Postgres(connection, model))

    await createUserAdmin(contextPostgres)
    
    const swaggerOptions = {
        info: {
            title: 'API para manipulação de times de futebol',
            version: 'v1.0.0'
        },
        lang: 'pt'
    }

    await api.register([
        HapiJwt,
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ])

    api.auth.strategy('jwt', 'jwt', {
        key: apiKey,
        /*options: {
            //expireIn: 20
        }*/
        validate: async (data, request) => {
            const [result] = await contextPostgres.read({
                username: data.username.toLowerCase()
            })
            
            if(!result){
                return {
                    isValid: false
                }
            }
            return {
                isValid: true
            }
        }
    })
    api.auth.default('jwt')
    api.route([
        ... mapRoutes(new AuthRoute(apiKey, contextPostgres), AuthRoute.methods()),
        ... mapRoutes(new TeamRoute(context), TeamRoute.methods())
    ])

    await api.start()
    console.log('servidor rodando na porta ', api.info.port)

    return api
}

async function createUserAdmin(contextPostgres) {
    const [result] = await contextPostgres.read({ username: process.env.USER_ADMIN })
    if (!result) {
        const hash = await PasswordHelper.hashPassword(process.env.PASS_ADMIN)
        await contextPostgres.create({
            username: process.env.USER_ADMIN,
            password: hash
        })
    }
}
module.exports = main()

