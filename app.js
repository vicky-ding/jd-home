const Koa = require('koa')
const uuid = require('uuid')
const STAT = require('./lib/stat')
const serve = require('koa-static')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')

const app = new Koa()

app.use(serve(__dirname + '/web/dist'))  //app.use中间件
app.use(bodyParser({        //bodyParser插件  将前端参数格式化
  formLimit: '10mb',
  jsonLimit: '10mb'
}))

//ctx 请求的上下文，前端请求的对象，可以取前端的数据
app.use(async (ctx, next) => {
  var requestId = uuid.v4()  //uuid生成唯一的字符串, v4随机生成，v1按照时间戳生成
  ctx.err = function (err) {
    ctx.body = {
      message: err,
      stat: STAT.SERVER_EXCEPTION
    }
  }

  ctx.set('X-Request-Id', requestId)   // 设置响应头
  ctx.set('Access-Control-Allow-Origin', '*')  //Access-Control-Allow-Origin 允许跨域
  await next()   //await 同步
})

// koa-router内部实现原理
/*app.use(async (ctx, next) => {
  path = ctx.host
  switch(path) {
    case '/user':
    let users = await UserModel.findByName('admin');
    ctx.body = {
      message: users,
      stat: STAT.STAT_OK
    }
  }
})*/

// context
// 自定义router
app.use(async (ctx, next) => {
  switch (ctx.path) {
    case '/dinglijuan':
      return ctx.body = {
        stat: 'OK',
        message: 'hello dinglijuan'
      }
      break;
  
    default:
      await next()
      break;
  }
})

// 创建接口
router.all('/user', require('./route/user'))
router.use('/otherapp', require('./route/otherapp').routes())

const routes = router.routes()
app.use(routes)

// 返回404错误
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
// 监听所有的错误
app.on('error', async (err, ctx) => {
  console.error(err)
  ctx.err(err.message)
})

app.listen(3002)
console.log('listening on 3002...')