'use strict';

const co = require('co');
const OAuthServer = require('oauth2-server');
const ClientToken = require('../view/clientToken');
const Request = OAuthServer.Request;
const Response = OAuthServer.Response;

class AppTokenController {

  generateToken(context) {
    return co(function* exec() {
      const request = new Request(context.request);
      request.headers['content-type'] = 'application/x-www-form-urlencoded';
      const response = new Response(context.response);
      yield context.app.oauth.token(request, response)
        .then(function(token) {
          context.response.body = new ClientToken(token);
          context.response.status = token ? 200 : 422;
        })
        .catch(function(err) {
          context.response.body = err.message;
          context.response.status = 400;
        });
    });
  }

  validateToken(context) {
    return co(function* exec() {
      let request = new Request(context.request);
      let response = new Response(context.response);
      yield context.app.oauth.authenticate(request, response)
        .then(function(token) {
          context.response.status = 200;
        })
        .catch(function(err) {
          context.response.body = err.message;
          context.response.status = 401;
        });
    });
  }
}
module.exports = AppTokenController;
