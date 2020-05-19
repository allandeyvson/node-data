const assert = require('assert')
const PasswordHelper = require('../helpers/passwordHelper')
const credentials = require('./credentials.json')
 
describe('Suite test helper', function () {

    it('Deve testar geração de hash', async () => {
        const result = await PasswordHelper.hashPassword(credentials.password)
        assert.ok(result.length > 10)
    })

    it('Deve validar hash gerado a partir de pass', async () => {
        const result = await PasswordHelper.compare(credentials.password, credentials.hash)
        assert.ok(result)
    })
})