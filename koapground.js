const Koa = require('koa')
const app = new Koa()

// logger
app.use(async (ctx, next) => {
  console.log('in logger', Date.now())
  await next()
  const rt = ctx.response.get('X-Response-Time')
  console.log(`${ctx.method} ${ctx.url} - ${rt}`)
})

// response time
app.use(async (ctx, next) => {
  console.log('in response timer', Date.now())
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})

app.use(async ctx => {
  console.log('in hello world')
  ctx.body = 'Helloworldo'
})

app.listen(8080)
