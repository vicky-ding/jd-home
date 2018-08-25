const util = require('../lib/util')
const STAT = require('../lib/stat')
const router = require('koa-router')()
const swiperModel = require('../model/swiper')

router.all('/addSwiper', async (ctx, next) => {
  try {
    let url = util.getString(ctx.request.body, 'url', true)
    let icon = util.getString(ctx.request.body, 'icon', true)
    let active = util.getBoolean(ctx.request.body, 'active', true)
    let orderval = util.getNumber(ctx.request.body, 'orderval', true)
    let result = await swiperModel.insertSwiper(url, icon, active ? 1 : 0, orderval)
    ctx.body = {
      data: { result },
      stat: STAT.STAT_OK
    }
  } catch (err) {
    ctx.err(err)
  }
})

router.all('/listAll', async (ctx, next) => {
  try {
    let list = await swiperModel.listAll()
    ctx.body = {
      data: { list },
      stat: STAT.STAT_OK
    }
  } catch (err) {
    ctx.err(err)
  }
})

module.exports = router