const util = require('../lib/util')
const STAT = require('../lib/stat')
const router = require('koa-router')()
const otherAppModel = require('../model/otherapp')

router.all('/addOtherApp', async (ctx, next) => {
  try {
    let title = util.getString(ctx.request.body, 'title', true, true)
    let url = util.getString(ctx.request.body, 'url', true, true)
    let icon = util.getString(ctx.request.body, 'icon', true, true)
    let active = util.getBoolean(ctx.request.body, 'active', true)
    let orderval = util.getNumber(ctx.request.body, 'orderval', true)
    let result = await otherAppModel.insertOtherapp(title, url, icon, active ? 1 : 0, orderval)
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
      list = await otherAppModel.listByActive(active)
    } else {
      list = await otherAppModel.listAll()
    }
    ctx.body = {
      data: { list },
      stat: STAT.STAT_OK
    }
  } catch (err) {
    ctx.err(err)
  }
})

router.all('/jd.listAll', async (ctx, next) => {
  try {
    let isActive = 1;
    let list = await otherAppModel.jdListAll(isActive, 0, 8)
    ctx.body = {
      data: { list },
      stat: STAT.STAT_OK
    }
  } catch (err) {
    ctx.err(err)
  }
})

// router.all('/deleteById', async (ctx, next) => {
//   try {
//     let id = util.getNumber(ctx.request.body, 'id', true)
//     let result = await swiperModel.deleteById(id)
//     ctx.body = {
//       data: { result },
//       stat: STAT.STAT_OK
//     }
//   } catch (err) {
//     ctx.err(err)
//   }
// })

router.all('/deleteById', async (ctx, next) => {
  try {
    let id = util.getNumber(ctx.request.body, 'id', true)
    let result = await otherAppModel.deleteById(id)
    ctx.body = {
      data: { result },
      stat: STAT.STAT_OK
    }
  } catch (err) {
    ctx.err(err)
  }
})

router.all('/editOtherApp', async (ctx, next) => {
  try {
    let id = util.getNumber(ctx.request.body, 'id', true)
    let title = util.getString(ctx.request.body, 'title', true, true)
    let url = util.getString(ctx.request.body, 'url', true, true)
    let icon = util.getString(ctx.request.body, 'icon', true, true)
    let active = util.getBoolean(ctx.request.body, 'active', true)
    let orderval = util.getNumber(ctx.request.body, 'orderval', true)
    let result = await otherAppModel.editOtherApp(id, title, url, icon, active ? 1 : 0, orderval)
    ctx.body = {
      data: { result },
      stat: STAT.STAT_OK
    }
  } catch (err) {
    ctx.err(err)
  }
})
module.exports = router