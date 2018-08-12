const STAT = require('../lib/stat')
const UserModel = require('../model/user')

module.exports = async(ctx, next) => {
  console.log(await UserModel.findByName('admin'))
  ctx.body = {
    message: 'hello',
    stat: STAT.STAT_OK
  }
}