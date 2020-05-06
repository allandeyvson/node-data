const assert = require('assert')
const PostgresSQLStrategy = require('./src/db/strategies/postgresSQLStrategy')
const Context = require('./src/db/strategies/base/contextStrategy')

//const context = new PostgresSQLStrategy()
const context = new Context(new PostgresSQLStrategy())

const MOCK_TEAM_CREATE = {
    name: 'Palmeiras',
    country: 'Brasil'
}

describe('Postgres Strategy', function() {
    
    this.timeout(Infinity);
    
    this.beforeAll(async () => {
        await context.connect()
    })
    
    it('PostgresSQL Conection', async () => {
        const result = await context.isConnected()
        assert.equal(result, true)
    })
        
    it('Cadastrar time de futebol', async function(){
        const result = await context.create(MOCK_TEAM_CREATE)
        delete result.id
        assert.deepEqual(result, MOCK_TEAM_CREATE)
    })
})