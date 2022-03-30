const Hapi = require('@hapi/hapi');
const validate = require('./auth/validate');
const CatboxRedis = require('@hapi/catbox-redis'); // cache api data

const getRoute = require('./routes/getRoutes');
const cacheRoute = require('./routes/cacheAPI');
const cookieRoute = require('./routes/cookieAPI');

const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    /* state: {
    
    } */
  /*   cache: [
        {
            name: 'my_cache',
            provider: {
                constructor: CatboxRedis,
                options: {
                    partition : 'my_cached_data',
                    host: 'localhost',
                    port: 6379,
                    database: 0,
                    // tls: {}
                }
            }
        }     
    ] */
})


const init = async() => {

    await server.register(require('@hapi/basic'));

    server.auth.strategy('simple', 'basic', { validate });

    server.state('data', {
        ttl: null,
        isSecure: true,
        isHttpOnly: true,
        encoding: 'base64json',
        clearInvalid: true,
        strictHeader: true
    });

    server.route(getRoute);
    server.route(cacheRoute);
    server.route(cookieRoute);

    await server.start();
    console.log("server started on %s", server.info.uri);
}

process.on('unhandledRejection',(err)=>{
    console.log(err);
    process.exit(1);
})

init();



module.exports = server;