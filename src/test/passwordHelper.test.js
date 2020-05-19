const assert = require('assert')
const PasswordHelper = require('../helpers/passwordHelper')

const PASS = 'minhasenhadev'
const HASH = '$2b$04$YEb4Wn4RzZw3LAzTH.Gile7WL2gEXQSDpQV83UnepF/UuPXGqvF8i'

describe('Suite test helper', function () {

    it('Deve testar geração de hash', async () => {
        const result = await PasswordHelper.hashPassword(PASS)
        assert.ok(result.length > 10)
    })

    it('Deve validar hash gerado a partir de pass', async () => {
        const result = await PasswordHelper.compare(PASS, HASH)
        assert.ok(result)
    })
})