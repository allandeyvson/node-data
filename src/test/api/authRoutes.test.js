const assert = require('assert')
const api = require('../../api/api')

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
                username: 'dev',
                password: 'minhasenhadev'
            }
        })

        const statusCode = result.statusCode
        const data = JSON.parse(result.payload)
        assert.deepEqual(statusCode, 200)
        assert.ok(data.token.length > 10)
    })
})