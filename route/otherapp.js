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
    let total = await otherAppModel.getPageListTotal()

    ctx.body = {
      data: { list, total },
      stat: STAT.STAT_OK
    }
  } catch (err) {
    ctx.err(err)
  }
})

// 分页结合查询

router.all('/PageListAll', async (ctx, next) => {
  try {
    let list = [],
        total,
        current = util.getNumber(ctx.request.body,'current'),
        pageSize = util.getNumber(ctx.request.body,'pageSize'),
        [start,offset] = [(current-1)*pageSize, pageSize];

    if (ctx.request.body.active == '0' || ctx.request.body.active == '1') {
      let active = util.getNumber(ctx.request.body, 'active')
      list = await otherAppModel.getPageListByActive(active,start,offset)
      total = await otherAppModel.getPageListTotalByActive(active)
    } else {
      list = await otherAppModel.getPageList(start,offset)
      total = await otherAppModel.getPageListTotal()
    }
    if (total.length > 0) {
      total = total[0].total
    }
    ctx.body = {
      data: { list, total },
      stat: STAT.STAT_OK
    }
  } catch (err) {
    ctx.err(err)
  }
})


// 分页接口
router.all('/jd.pageList', async (ctx, next) => {
  try {
    let isActive = 1;
    let current = util.getNumber(ctx.request.body,'current');
    let pageSize = util.getNumber(ctx.request.body,'pageSize');
    let [start,offset] = [(current-1)*pageSize, pageSize]

    // console.log(start,end)
    let list = await otherAppModel.getPageList(start,offset)
    let total = await otherAppModel.getPageListTotal()
    ctx.body = {
      data: { list,total,start,current,pageSize },
      stat: STAT.STAT_OK
    }
  } catch (err) {
    ctx.err(err)
  }
})

// 前端接口
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