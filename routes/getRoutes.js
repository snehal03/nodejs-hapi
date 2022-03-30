module.exports ={
    method: 'GET',
    path: '/hello',
    options: {
        auth: 'simple'
    },
    handler: (request , h) => {
        return 'Hello World!!'
    }
};