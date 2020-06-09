const jwt = require('jsonwebtoken');
const {TOKEN_EXPIRY_IN_MINS, SECRET} = require('../constants');

const oAuthToken = ({token, client, user, expiry} = {}) => {
  let oauthToken = {};
  oauthToken.accessToken = token;
  oauthToken.user = user || {};
  oauthToken.client = client || {};
  oauthToken.accessTokenExpiresAt = expiry || new Date();
  oauthToken.accessTokenGeneratedAt = new Date();

  return oauthToken;
}

const buildJWT = (client) => {
  const date = new Date();
  const timestamp = date.getTime();
  const standardClaims = {
    issuer: 'nwc-app-token',
    audience: client.audience,
    subject: client.clientId,
    expiresIn: `${TOKEN_EXPIRY_IN_MINS}m`,
  };
  const tenantClaim = { 
    'http://ntx.identity/tenant': client.tenantId,
    'http://ntx.identity/user': client.appUser,
    'http://ntx.identity/roles': ['administrator'],
    scope: client.scopes.join(' '),
    gty: 'client-credentials', 
  };
  const token =  jwt.sign(tenantClaim, SECRET, standardClaims);
  return token;
}

const  parseJWT = (token) => jwt.verify(token, SECRET);

module.exports = {
  oAuthToken,
  buildJWT,
  parseJWT,
};