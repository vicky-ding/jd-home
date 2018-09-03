const util = require('../lib/util')
const STAT = require('../lib/stat')
const router = require('koa-router')()
const spikeModel = require('../model/spike')

router.all('/addList', async (ctx, next) => {
    try {
        let url = util.getString(ctx.request.body, 'url', true, true)
        let icon = util.getString(ctx.request.body, 'icon', true, true)
        let priceNow = util.getNumber(ctx.request.body, 'priceNow', true)
        let priceBefore = util.getNumber(ctx.request.body, 'priceBefore')
        let active = util.getBoolean(ctx.request.body, 'active', true)
        let orderval = util.getNumber(ctx.request.body, 'orderval', true)
        let result = await spikeModel.addList(url, icon, priceNow, priceBefore, active ? 1 : 0, orderval)
        ctx.body = {
            data: { result },
            stat: STAT.STAT_OK
        }
    } catch (err) {
        ctx.err(err)
    }
})

router.all('/pageListAll', async (ctx, next) => {
    let list = [],
        current = util.getNumber(ctx.request.body, 'current'),
        pageSize = util.getNumber(ctx.request.body, 'pageSize'),
        start = (current - 1) * pageSize,
        total;
    try {
        if(ctx.request.body == '0'||ctx.request.body ==1){
            let active = util.getNumber(ctx.request.body,'active')
            list = await spikeModel.getPageListByActive(active, start, pageSize)
            total = await spikeModel.getPageListTotalByActive(active)
        }else{
            list = await spikeModel.getPageList(start,pageSize)
            total = await spikeModel.getPageListTotal()
        }
        if(total.length>0){
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

router.all('/deleteById', async(ctx, next)=>{
    try{
        let id = util.getNumber(ctx.request.body, 'id', true),
            result = await spikeModel.deleteById(id) ;   
        ctx.body = {
            data: { result },
            stat: STAT.STAT_OK
        }
    }catch(err){
        ctx.err(err)
    }
})

router.all('/editList', async(ctx, next)=>{
    try{
        let url = util.getString(ctx.request.body, 'url', true, true)
        let icon = util.getString(ctx.request.body, 'icon', true, true)
        let priceNow = util.getNumber(ctx.request.body, 'priceNow', true)
        let priceBefore = uti.getNumber(ctx.request.body, 'priceBefore')
        let active = util.getBoolean(ctx.request.body, 'active', true)
        let orderval = util.getNumber(ctx.request.body, 'orderval', true)
        let result = await spikeModel.editList(url, icon, priceNow, priceBefore, active ? 1 : 0, orderval)
        ctx.body = {
            data: { result },
            stat: STAT.STAT_OK
        }
    }catch(err){
        ctx.err(err)
    }
})

module.exports = router