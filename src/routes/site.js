'use strict';

module.exports.index = (ctx, nxt) => ctx.response.body = 'OAuth 2.0 Server';

module.exports.createForm = (ctx, nxt) => ctx.render('create');

module.exports.tokenForm = (ctx, nxt) => ctx.render('token');
