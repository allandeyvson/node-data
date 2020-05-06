const assert = require('assert')
const PostgresSQLStrategy = require('./src/db/strategies/postgresSQLStrategy')
const Context = require('./src/db/strategies/base/contextStrategy')

//const context = new PostgresSQLStrategy()
const context = new Context(new PostgresSQLStrategy())

const MOCK_TEAM_CREATE = {
    name: 'Palmeiras',
    country: 'Brasil'
}

const MOCK_TEAM_UPDATE = {
    name: 'Manchester United',
    country: 'Inglaterra'
}

describe('Postgres Strategy', function() {
    
    this.timeout(Infinity);
    
    this.beforeAll(async () => {
        await context.connect()
        await context.create(MOCK_TEAM_UPDATE)
    })
    
    it('PostgresSQL Conection', async () => {
        const result = await context.isConnected()
        assert.equal(result, true)
    })
        
    it('Cadastrar time de futebol', async () => {
        const result = await context.create(MOCK_TEAM_CREATE)
        delete result.id
        assert.deepEqual(result, MOCK_TEAM_CREATE)
    })

    it('Listar time de futebol', async () => {
        const [result] = await context.read({name: MOCK_TEAM_CREATE.name})
        delete result.id
        assert.deepEqual(result, MOCK_TEAM_CREATE)
    })

    it('Atualizar time de futebol', async () => {
        const [preUpdateItem] = await context.read({name: MOCK_TEAM_UPDATE.name})
        const updateItem = {
            ...preUpdateItem,
            name: 'Liverpool'
        }
        const [result] = await context.update(updateItem)
        const [posUpdateItem] = await context.read({id: updateItem.id})

        assert.deepEqual(result, 1)
        assert.deepEqual(posUpdateItem.name, updateItem.name)
    })
})