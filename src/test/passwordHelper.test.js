const assert = require('assert')
const PasswordHelper = require('../helpers/passwordHelper')
const hash = '$2b$04$YEb4Wn4RzZw3LAzTH.Gile7WL2gEXQSDpQV83UnepF/UuPXGqvF8i'
 
describe('Suite test helper', function () {

    it('Deve testar geração de hash', async () => {
        const result = await PasswordHelper.hashPassword(process.env.PASS_ADMIN)
        assert.ok(result.length > 10)
    })

    it('Deve validar hash gerado a partir de pass', async () => {
        const result = await PasswordHelper.compare(process.env.PASS_ADMIN, hash)
        assert.ok(result)
    })
})