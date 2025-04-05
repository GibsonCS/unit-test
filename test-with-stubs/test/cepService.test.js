const CepService = require('../src/services/cepService')
const { cepMock } = require('./mocks/cep.json')
const sandbox = require('sinon').createSandbox()
const assert = require('assert')

const stub = sandbox.stub(CepService, CepService.handleCep.name);

; (async () => {

    stub
        .withArgs(69000000)
        .resolves(cepMock);

    {
        const expect = {
            address: {
                cep: undefined,
                logradouro: undefined,
                bairro: undefined,
                localidade: undefined,
                uf: undefined,
            }
        }

        const result = await CepService.getCep(69000000)
        assert.deepStrictEqual(result, expect)
    }

})()

