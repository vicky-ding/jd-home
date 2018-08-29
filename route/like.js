const util = require('../lib/util')
const STAT = require('../lib/stat')
const router = require('koa-router')()
const likeModel = require('../model/like')

router.all('/addLikeGoods', async (ctx, next) => {
  try {
    let description = util.getString(ctx.request.body, 'description', true, true)
    let price = util.getNumber(ctx.request.body,'price',true)
    let url = util.getString(ctx.request.body, 'url', true, true)
    let icon = util.getString(ctx.request.body, 'icon', true, true)
    let active = util.getBoolean(ctx.request.body, 'active', true)
    let orderval = util.getNumber(ctx.request.body, 'orderval', true)
    let result = await likeModel.insertLikeGoods(description, price, url, icon, active ? 1 : 0, orderval)
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
      list = await likeModel.listByActive(active)
    } else {
      list = await likeModel.listAll()
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
    let result = await likeModel.deleteById(id)
    ctx.body = {
      data: { result },
      stat: STAT.STAT_OK
    }
  } catch (err) {
    ctx.err(err)
  }
})

router.all('/editLikeGoods', async (ctx, next) => {
  try {
    let id = util.getNumber(ctx.request.body, 'id', true)
    let description = util.getString(ctx.request.body, 'description', true, true)
    let price = util.getNumber(ctx.request.body, 'price', true)
    let url = util.getString(ctx.request.body, 'url', true, true)
    let icon = util.getString(ctx.request.body, 'icon', true, true)
    let active = util.getBoolean(ctx.request.body, 'active', true)
    let orderval = util.getNumber(ctx.request.body, 'orderval', true)
    let result = await likeModel.editLikeGoods(id, description, price, url, icon, active ? 1 : 0, orderval)
    ctx.body = {
      data: { result },
      stat: STAT.STAT_OK
    }
  } catch (err) {
    ctx.err(err)
  }
})
module.exports = router