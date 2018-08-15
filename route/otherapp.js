const STAT = require('../lib/stat')
const router = require('koa-router')()

router.all('/', async (ctx, next) => {
  ctx.body = {
    message: [],
    stat: STAT.STAT_OK
  }
})

router.all('/all', async (ctx, next) => {
  ctx.body = {
    message: [{}],
    stat: STAT.STAT_OK
  }
})

module.exports = router