const assert = require('assert')
const api = require('../api/api')

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
                username: process.env.USER_ADMIN,
                password: process.env.PASS_ADMIN
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