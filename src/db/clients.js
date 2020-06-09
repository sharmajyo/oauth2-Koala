'use strict';

const clients = [
  { id: '1', name: 'Samplr', clientId: 'abc123', clientSecret: 'ssh-secret', isTrusted: false, grants: ['client_credentials'] , scopes: ['read:task', 'read:tenants', 'manage:tenants'], audience: 'https://nintex.io', appUser: 'auth0|5a70580eda48095f7f8035b5', tenantId: 'madhax' },
  { id: '2', name: 'Samplr2', clientId: 'xyz123', clientSecret: 'ssh-password', isTrusted: true, grants: ['client_credentials'], scopes: ['read:task', 'read:tenants', 'manage:tenants'], audience: 'https://nintex.io', appUser: 'auth0|5a72582eda48295f7f8235b5', tenantId: 'madhax'  },
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
