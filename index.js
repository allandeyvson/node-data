const ContextStrategy = require('./src/db/strategies/base/contextStrategy')
const MongoDB = require('./src/db/strategies/mongoDB')
const Postgres = require('./src/db/strategies/postgres')

const contextMongo  = new ContextStrategy(new MongoDB())
contextMongo.create()

const contextPostgres  = new ContextStrategy(new Postgres())
contextPostgres.create()

