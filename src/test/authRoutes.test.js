const assert = require('assert')
const api = require('../api/api')
const credentials = require('../api/credentials.json')

let app = {}

describe('Auth Suite Test', function () {

    this.beforeAll(async () => {
        app = await api
    })

    it('Deve obter um token', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                username: credentials.username,
                password: credentials.password
            }
        })

        const statusCode = result.statusCode
        const data = JSON.parse(result.payload)
        assert.deepEqual(statusCode, 200)
        assert.ok(data.token.length > 10)
    })


    it('Deve retornar não autorizado ao tentar obter um login errado', async () =>{
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                username: 'login',
                password: 'pass'
            }
        })

        const statusCode = result.statusCode
        const data = JSON.parse(result.payload)
        assert.deepEqual(statusCode, 401)
        assert.deepEqual(data.error, 'Unauthorized')
    })
})