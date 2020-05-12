const assert = require('assert')
const api = require('../../api/api')

let app = {}

describe.only('Suite de testes API', function (){

    this.beforeAll(async () => {
        app = await api
    })

    it('Listar /teams - Deve validar se serivço esta funcional, ou seja, status 200', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/teams'
        })
        const statusCode = result.statusCode
        assert.deepEqual(statusCode, 200)
    })

    it('Listar /teams - Deve retornar apenas 1 registro', async () => {
        const limit = 1
        const result = await app.inject({
            method: 'GET',
            url: `/teams?limit=${limit}`
        })
        const data = JSON.parse(result.payload)
        assert.deepEqual(data.length, limit)
    })

    it('Listar /teams - Deve retornar o status 400', async () => {
        const limit = 'aaa'
        const result = await app.inject({
            method: 'GET',
            url: `/teams?limit=${limit}`
        })        
        assert.deepEqual(result.statusCode, 400)
    })
})