
const { oAuthToken, buildJWT, parseJWT } = require('./token');
const db = require('../../../db');
const {ALLOWED_SCOPES} = require('../constants');

const model = {
  generateAccessToken: (client, user, scope) => {
    return buildJWT(client);
  },
  getAccessToken: function*(token) {
    const tokenData = parseJWT(token);
    // TOD: validate client, scope, audience
    const client = yield db.clients.findByClientId(tokenData.azp);
    if (client) {
      return  oAuthToken({token, client, expiry: token.exp});
    } else {
      return null;
    }
  },
  validateScope: (user, client, scope) => {
    if (scope && !scope.split(' ').every(s => ALLOWED_SCOPES.indexOf(s) >= 0)) {
      return false;
    }
    return client.scopes;
  },
  // Or, using generators.
  getClient: function*(clientId) {
    return yield db.clients.findByClientId(clientId);
  },

  getUserFromClient: function() {
    return {};
  },
  saveToken: function(token, client, user) {
    return oAuthToken({token, client, user});
  },
};

module.exports = model;