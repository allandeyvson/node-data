const assert = require('assert')
const MongoDBStrategy = require('./src/db/strategies/mongoDBStrategy')
const Context = require('./src/db/strategies/base/contextStrategy')

const context = new Context(new MongoDBStrategy())

const MOCK_TEAM_CREATE = {
    name: 'Palmeiras',
    country: 'Brasil'
}

const MOCK_TEAM_UPDATE = {
    name: 'Manchester United',
    country: 'Inglaterra'
}

let MOCK_ID_TEAM_UPDATE= ''

describe('MongoDB Strategy', function (){

    this.beforeAll(async () => {
        await context.connect()
        const result = await context.create(MOCK_TEAM_UPDATE)
        MOCK_ID_TEAM_UPDATE = result._id
    })

    it('MongoDB connection', async () => {
        const result = await context.isConnected()
        assert.deepEqual(result, 'Conectado')
    })
    
    it('Cadastrar time de futebol', async () => {
        const {name, country} = await context.create(MOCK_TEAM_CREATE)
        assert.deepEqual({name, country}, MOCK_TEAM_CREATE)
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