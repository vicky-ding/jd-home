const STAT = require('../lib/stat')

module.exports = async(ctx, next) => {
  ctx.body = {
    message: 'hello',
    stat: STAT.STAT_OK
  }
}