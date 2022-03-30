
module.exports = {
  path: "/hapi/{ttl?}",
  method: "GET",
  handler: (request, h) => {
    const response = h.response({ be: "hapi" });
    
    //** override cache timing in url send number */
    if (request.params.ttl) {
      response.ttl(request.params.ttl);
    }
    return response;
  },
  options: {
    cache: {
      expiresIn: 30 * 1000,
      privacy: "private"
    },
  },
};
