require('dotenv').config();
const Koa = require('koa');
const app = new Koa();
const mount = require('koa-mount');
const graphqlHTTP = require('koa-graphql');
const schema = require('./graphql/schema');
const initDB = require('./database');

app.use(mount('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
})));

app.listen(9000);

app.on('error', err => {
  log.error('serve error', err);
});

initDB();
