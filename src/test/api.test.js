const assert = require('assert')
const api = require('../api/api')

let token = {}
let app = {}
let headers = {}

const MOCK_TEAM_CREATE = {
    name: 'ABC',
    country: 'Brasil'
}

const MOCK_TEAM_UPDATE = {
    name: 'Sport',
    country: 'Brasil'
}

let MOCK_ID_TEAM_CREATE = ''
let MOCK_ID_TEAM_UPDATE = ''


describe('Suite de testes API', function (){

    this.beforeAll(async () => {
        app = await api
        
        const resultToken = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                username: process.env.USER_ADMIN,
                password: process.env.PASS_ADMIN
            }
        })
        const data = JSON.parse(resultToken.payload)
        token = data.token
        headers = {
            authorization: token
        }

        const result = await app.inject({
            method: 'POST',
            url: '/teams',
            headers,
            payload: MOCK_TEAM_UPDATE
        })

        const { _id } = JSON.parse(result.payload)
        MOCK_ID_TEAM_UPDATE = _id

    })

    this.afterAll(async () => {
        const _id = MOCK_ID_TEAM_CREATE

        const result = await app.inject({
            method: 'DELETE',
            headers,
            url: `/teams/${_id}` 
        })
    })

    it('Listar GET /teams - Deve validar se serivço esta funcional, ou seja, status 200', async () => {
        const result = await app.inject({
            method: 'GET',
            headers,
            url: '/teams'
        })
        const statusCode = result.statusCode
        assert.ok(statusCode === 200)
    })

    it('Listar GET /teams - Deve retornar apenas 1 registro', async () => {
        const limit = 1
        const result = await app.inject({
            method: 'GET',
            headers,
            url: `/teams?limit=${limit}`
        })
        const data = JSON.parse(result.payload)
        assert.deepEqual(data.length, limit)
    })

    it('Listar GET /teams - Passando limit com formato errado , deve retornar o status 400', async () => {
        const limit = 'aaa'
        const result = await app.inject({
            method: 'GET',
            headers,
            url: `/teams?limit=${limit}`
        })        
        assert.ok(result.statusCode === 400)
    })

    it('Cadastrar POST /teams - Deve cadastrar um time', async () => {        
        const result = await app.inject({
            method: 'POST',
            url: '/teams', 
            headers,
            payload: MOCK_TEAM_CREATE
        })
        const { _id, message} = JSON.parse(result.payload)
        MOCK_ID_TEAM_CREATE = _id

        assert.ok(result.statusCode === 200)
        assert.notStrictEqual(_id, undefined)
        assert.deepEqual(message, 'Time cadastrado com sucesso.')
    })

    it('Atualizar PATCH /teams/:id - Deve atualizar um time', async () => {
        const _id = MOCK_ID_TEAM_UPDATE
        const query = {name: 'Santa Cruz'}

        const result = await app.inject({
            method: 'PATCH',
            url: `/teams/${_id}`, 
            headers,
            payload: query
        })
        const { message } = JSON.parse(result.payload)
        assert.ok(result.statusCode === 200)
        assert.deepEqual(message, 'Time atualizado com sucesso.')
    })

    it('Remover DELETE /teams/:id - Deve remover um time', async () => {
        const _id = MOCK_ID_TEAM_UPDATE

        const result = await app.inject({
            method: 'DELETE',
            headers,
            url: `/teams/${_id}` 
        })

        const {message} = JSON.parse(result.payload)
        assert.ok(result.statusCode === 200)

        assert.deepEqual(message, 'Time removido com sucesso.')
    })
})