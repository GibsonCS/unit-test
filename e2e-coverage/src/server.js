const http = require('node:http')
const { once } = require('node:events')

const DEFAULT_CREDENTIALS = {
    login: 'gibson',
    password: '123'
}

const routes = {
    '/api/login:get': (request, response) => {
        response.writeHead(200)
        return response.end()
    },

    '/api/login:post': async (request, response) => {
       const user = JSON.parse(await once(request, "data"))
       if(user.username !== DEFAULT_CREDENTIALS.login || user.password !== DEFAULT_CREDENTIALS.password) {
        response.writeHead(401)
        return response.end('unauthorized!')
       } else {
        
        response.writeHead(200)
        return response.end('Succeced!')
       }
    },

    default(_, response){
        response.writeHead(404)
        return response.end('not found!')
    }
}

const handler = (request, response) => {
    const {url, method} = request
    const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`
    const chosen = routes[routeKey] || routes.default
    return chosen(request, response)
}

const server = http.createServer(handler)
    .listen(3000, () => console.log('Server is running at 3000'))

module.exports = server


