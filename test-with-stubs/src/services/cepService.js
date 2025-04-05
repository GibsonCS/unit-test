class CepService {
    static async handleCep(cep) {
        return  await (await fetch(`http://viacep.com.br/ws/${cep}/json/`)).json() 
    }

    static async handleStarWars(baseURL) {
        const result =  await (await fetch(baseURL)).json()
        
    }

    static async getCep(cep) {
        const data = await this.handleCep(cep)
        return {
            address: {
                cep: data.cep,
                logradouro: data.logradouro,
                bairro: data.bairro,
                localidade: data.localidade,
                uf: data.uf,
            }
        }
    }
}

module.exports = CepService