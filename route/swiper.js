const util = require('../lib/util')
const STAT = require('../lib/stat')
const router = require('koa-router')()
const swiperModel = require('../model/swiper')

router.all('/addSwiper', async (ctx, next) => {
  try {
    let url = util.getString(ctx.request.body, 'url', true, true)
    let icon = util.getString(ctx.request.body, 'icon', true, true)
    let active = util.getBoolean(ctx.request.body, 'active')
    let orderval = util.getNumber(ctx.request.body, 'orderval')
    let result = await swiperModel.insertSwiper(url, icon, active ? 1 : 0, orderval)
    ctx.body = {
      data: { result },
      stat: STAT.STAT_OK
    }
  } catch (err) {
    ctx.err(err)
  }
})

router.all('/editSwiper', async (ctx, next) => {
  try {
    let id = util.getNumber(ctx.request.body, 'id', true)
    let url = util.getString(ctx.request.body, 'url', true, true)
    let icon = util.getString(ctx.request.body, 'icon', true, true)
    let active = util.getBoolean(ctx.request.body, 'active')
    let orderval = util.getNumber(ctx.request.body, 'orderval')
    let result = await swiperModel.editSwiper(id, url, icon, active ? 1 : 0, orderval)
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
    let list = []
    if (ctx.request.body.active == '0' || ctx.request.body.active == '1') {
      let active = util.getNumber(ctx.request.body, 'active')
      list = await swiperModel.listByActive(active)
    } else {
      list = await swiperModel.listAll()
    }
    ctx.body = {
      data: { list },
      stat: STAT.STAT_OK
    }
  } catch (err) {
    ctx.err(err)
  }
})

router.all('/deleteById', async (ctx, next) => {
  try {
    let id = util.getNumber(ctx.request.body, 'id', true)
    let result = await swiperModel.deleteById(id)
    ctx.body = {
      data: { result },
      stat: STAT.STAT_OK
    }
  } catch (err) {
    ctx.err(err)
  }
})

module.exports = router