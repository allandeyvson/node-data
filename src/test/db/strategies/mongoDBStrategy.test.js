const assert = require('assert')
const MongoDBStrategy = require('../../../db/strategies/mongoDB/mongoDBStrategy')
const Context = require('../../../db/strategies/base/contextStrategy')
const TeamSchema = require('../../../db/strategies/mongoDB/schemas/team')

const MOCK_TEAM_CREATE = {
    name: 'Palmeiras',
    country: 'Brasil'
}

const MOCK_TEAM_UPDATE = {
    name: 'Manchester United',
    country: 'Inglaterra'
}

let MOCK_ID_TEAM_UPDATE= ''
let MOCK_ID_TEAM_CREATE = ''
let context = {}

describe('MongoDB Strategy', function (){

    this.beforeAll(async () => {
        const connection = MongoDBStrategy.connect()
        context = new Context(new MongoDBStrategy(connection, TeamSchema))
        const result = await context.create(MOCK_TEAM_UPDATE)
        MOCK_ID_TEAM_UPDATE = result._id
    })

    this.afterAll(async () => {
        await context.delete(MOCK_ID_TEAM_CREATE)
    })

    it('MongoDB connection', async () => {
        const result = await context.isConnected()
        assert.deepEqual(result, 'Conectado')
    })
    
    it('Cadastrar time de futebol', async () => {
        const {_id, name, country} = await context.create(MOCK_TEAM_CREATE)
        const result = {_id, name, country}
        MOCK_ID_TEAM_CREATE = result._id
        delete result._id
        assert.deepEqual(result, MOCK_TEAM_CREATE)
    })

    it('Listar time de futebol', async () => {
        const [{name, country}] = await context.read({name: MOCK_TEAM_CREATE.name})
        const result = {name, country}
        assert.deepEqual(result, MOCK_TEAM_CREATE)
    })

    it('Atualizar time de futebol', async () => {
        const [preUpdateItem] = await context.read({name: MOCK_TEAM_UPDATE.name})
        const result = await context.update(MOCK_ID_TEAM_UPDATE, {name: 'Liverpool'})        
    })

    it('Remover time de futebl', async () =>{
        const result = await context.delete(MOCK_ID_TEAM_UPDATE)
        assert.deepEqual(result.n, 1)
    })
})