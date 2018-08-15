const STAT = require('../lib/stat')
const UserModel = require('../model/user')

module.exports = async(ctx, next) => {
  let users = await UserModel.findByName('admin');
  ctx.body = {
    message: users,
    stat: STAT.STAT_OK
  }
}