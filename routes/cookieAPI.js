module.exports ={
    method: 'GET',
    path: '/cookie',
    handler: (request , h) => {
        h.state('data', { firstVisit: false });
        const value = request.state.data;
        console.log("Cookie value ********",value)
         /*    h.response('Bye').unstate('data'); // clearing cookie
            console.log("Cookie value after clear********",request.state.data) */
        return h.response('Hello');
    }
};