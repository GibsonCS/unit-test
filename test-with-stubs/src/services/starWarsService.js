
class StarWars {
    static async handlePersona(baseURL) {
        return await (await fetch(baseURL)).json()
    }


    static async getPersona(baseURL) {
        const persona = await this.handlePersona(baseURL)
        return {
            name: persona.name,
            height: persona.height,
            mass: persona.mass,
            hair_color: persona.hair_color,
            skin_color: persona.skin_color,
            eye_color: persona.eye_color,
            birth_year: persona.birth_year,
            gender: persona.gender
        }

    }
}

module.exports = StarWars