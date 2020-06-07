moment = require('moment');

class ClientToken { 
  constructor(clientToken) {
    const { accessToken: token,  accessTokenGeneratedAt } = clientToken;
    this.access_token = token.accessToken;
    this.scope = token.scope.join(' ');
    this.expires_in = moment(token.accessTokenExpiresAt).diff(moment(accessTokenGeneratedAt), 'seconds');
    this.expires_at = token.accessTokenExpiresAt;
    this.token_type = 'Bearer';
  }
}

module.exports = ClientToken;