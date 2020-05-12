const assert = require('assert')
const PostgresSQLStrategy = require('../../../db/strategies/postgres/postgresSQLStrategy')
const Context = require('../../../db/strategies/base/contextStrategy')
const TeamSchema = require('../../../db/strategies/postgres/schemas/team')

const MOCK_TEAM_CREATE = {
    name: 'Palmeiras',
    country: 'Brasil'
}

const MOCK_TEAM_UPDATE = {
    name: 'Manchester United',
    country: 'Inglaterra'
}
let context = {}

describe.skip('Postgres Strategy', function() {
    
    this.timeout(Infinity);
    
    this.beforeAll(async () => {
        const connection = await PostgresSQLStrategy.connect()
        const model = await PostgresSQLStrategy.defineModel(connection, TeamSchema)
        context = new Context(new PostgresSQLStrategy(connection, model))
        await context.create(MOCK_TEAM_UPDATE)
    })
    
    this.afterAll(async () =>{
        await context.delete()
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

    it('Remove time de futebol', async () =>{
        const [deleteItem] = await context.read({name: MOCK_TEAM_CREATE.name})
        const result = await context.delete(deleteItem.id)
        assert.deepEqual(result, 1)
    })
})