'use strict';

const koa = require('koa')
const path = require('path')
const render = require('koa-ejs')
const koaRouter = require('koa-router')
const bodyParser = require('koa-bodyparser');
const routes = require('./src/routes');
const oauth2 = require('./src/core/oauth2/server');
const AppTokenController = require('./src/http/controller/appTokenController');

const app = new koa()
const router = new koaRouter()
const controller = new AppTokenController();
app.oauth = oauth2;


var options = {
    scopes: {
      foo: 'Access to foo special resource',
      bar: 'Access to bar special resource'
    },
  //when this line is enabled, user email appears in tokens sub field. By default, id is used as sub.
    models:{user:{attributes:{sub:function(){return this.email;}}}},
    app: app
  };

app.use(bodyParser())

router.get('/', routes.site.index);

//TODO: use basic-stretegy with clientId, secret to check if it exist
router.post('/oauth/token', controller.generateToken);
router.get('/oauth/token/validate', controller.validateToken);


app.use(router.routes())
.use(router.allowedMethods())

app.listen(1234, () => console.log('running on port 1234'))
