const OAuthServer = require('oauth2-server');
const model = require('./model');
const {TOKEN_EXPIRY_IN_MINS, SUPPORTED_GRANTS} = require('./constants');

const oauth = new OAuthServer({
  debug: true,
  model,
  grants: SUPPORTED_GRANTS,
  accessTokenLifetime: 60 * TOKEN_EXPIRY_IN_MINS, // accept in sec.
})


module.exports = oauth;