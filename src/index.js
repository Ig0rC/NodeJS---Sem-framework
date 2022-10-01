const http = require('http');
const url = require('url')

const routes = require('./routes')

const bodyParser = require('./helpers/bodyParser')


const server = http.createServer((request, response) =>{ 
    const parsedUrl = url.parse(request.url, true);

    console.log(`request method: ${request.method} | EndPoint: ${request.url}`)

    let { pathname } = parsedUrl;
    let id = null;

    const splitEndpoint = pathname.split('/').filter(Boolean);

  
    if(splitEndpoint.length > 1) {
        pathname = `/${splitEndpoint[0]}/:id`
        id = splitEndpoint[1]
    }

    const route = routes.find((routeObject) => {
        if(routeObject.endPoint === pathname && routeObject.method === request.method){
            return routeObject
        }
    })


    if(route){
        request.query = parsedUrl.query;

        request.params = { id };

        response.send = (statusCode, body) => {
            response.writeHead (statusCode, { 'Content-type': 'application/json'});
            response.end(JSON.stringify(body))
        }

        if(['POST', 'PUT', 'PATCH'].includes(request.method)){
            console.log('fofi POST')
            bodyParser(request, () => route.handler(request, response))
        } else {
            route.handler(request, response)
        }
    }
     else {
        response.writeHead(404, { 'Context-Type': 'text/html'});

        response.end(`Cannot ${request.method}  ${request.url}`)
    }


    // if(request.method === 'GET' && request.url === '/users'){
    //     response.writeHead(200, { 'Content-type': 'application/json'});

    //     response.end(JSON.stringify(users))
   

})

server.listen(3000, () => {
    console.log('🔥 Server started at http://localhost:3000')
})