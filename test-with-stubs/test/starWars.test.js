const StarWars = require('../src/services/starWarsService');
const starWarsMock = require('./mocks/starWars,.json');
const sandbox = require('sinon').createSandbox()
const assert = require('assert')

const BASE_URL = 'https://swapi.dev/api/people/1';
; (async () => {
    const stub = sandbox.stub(StarWars, StarWars.handlePersona.name)

    stub
        .withArgs(BASE_URL)
        .resolves(starWarsMock)

    {
        const expect =
        {
            name: 'Luke Skywalker',
            height: '172',
            mass: '77',
            hair_color: 'blond',
            skin_color: 'fair',
            eye_color: 'blue',
            birth_year: '19BBY',
            gender: 'male',
        }

        const result = await StarWars.getPersona(BASE_URL)
        assert.deepStrictEqual(result, expect)
    }
})()