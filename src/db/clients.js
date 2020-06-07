'use strict';

const clients = [
  { id: '1', name: 'Samplr', clientId: 'abc123', clientSecret: 'ssh-secret', isTrusted: false, grants: ['client_credentials'] , scopes: ['read:task', 'read:tenants', 'manage:tenants'], audience: 'https://nintex.io' },
  { id: '2', name: 'Samplr2', clientId: 'xyz123', clientSecret: 'ssh-password', isTrusted: true, grants: ['client_credentials'], scopes: ['read:task', 'read:tenants', 'manage:tenants'], audience: 'https://nintex.io' },
];

module.exports.findById = (id, done) => {
  for (let i = 0, len = clients.length; i < len; i++) {
    if (clients[i].id === id) return done(null, clients[i]);
  }
  return done(new Error('Client Not Found'));
};

module.exports.findByClientId = (clientId, done) => {
  const p = new Promise((res, rej) => {
    for (let i = 0, len = clients.length; i < len; i++) {
      if (clients[i].clientId === clientId) 
      res(clients[i]);
    }
    res();
  });
  

  return p;
};
