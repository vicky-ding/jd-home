const Koa = require('koa')
const uuid = require('uuid')
const STAT = require('./lib/stat')
const serve = require('koa-static')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')

const app = new Koa()

app.use(serve('web'))
app.use(bodyParser({
  formLimit: '10mb',
  jsonLimit: '10mb'
}))

app.use(async (ctx, next) => {
  var requestId = uuid.v4()
  ctx.err = function (err) {
    ctx.body = {
      message: err,
      stat: STAT.SERVER_EXCEPTION
    }
  }

  ctx.set('X-Request-Id', requestId)
  ctx.set('Access-Control-Allow-Origin', '*')
  await next()
})

router.all('/', require('./route/index'))

const routes = router.routes()
app.use(routes)

app.use(async (ctx, next) => {
  if (ctx.errors) {
    var keys = Object.keys(ctx.errors[0])
    await ctx.err(ctx.errors[0][keys[0]])
  } else {
    ctx.body = {
      stat: STAT.NOT_FOUND,
      message: '找不到指定的接口'
    }
  }
})

app.on('error', async (err, ctx) => {
  console.error(err)
  ctx.err(err.message)
})

app.listen(3002)
console.log('listening on 3002...')