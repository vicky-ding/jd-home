const MySql = require('../lib/mysql')

const TABLE_NAME = 'otherapp'
const TABLE_SQL = `create table if not exists \`${TABLE_NAME}\` (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL COMMENT 'app名称',
  url VARCHAR(255) NOT NULL COMMENT 'app跳转链接',
  icon VARCHAR(255) NOT NULL COMMENT 'app图像',
  active INT NOT NULL DEFAULT 0 COMMENT '是否上架',
  orderval INT NOT NULL DEFAULT 0 COMMENT '排序值',
  PRIMARY KEY ( id )
);`

// 建表
MySql.createTable(TABLE_SQL)

/**
 * 新增一条头部导航信息
 */
exports.insertOtherapp = (title, url, icon, active, orderval) => {
  let sql = `INSERT INTO \`${TABLE_NAME}\` (
    \`title\`, \`url\`, \`icon\`, \`active\`, \`orderval\`
  ) VALUES (?, ?, ?, ?, ?);`
  return MySql.query(sql, [title, url, icon, active, orderval])
}

/**
 * 编辑一条头部导航信息
 */
exports.editOtherApp = (id, title, url, icon, active, orderval) => {
  let sql = `UPDATE \`${TABLE_NAME}\` SET
  \`title\` = ?, \`url\` = ?, \`icon\` = ?, \`active\` = ?, \`orderval\` = ?
  WHERE \`id\` = ?;`
  return MySql.query(sql, [title, url, icon, active, orderval, id])
}

/**
 * 删除一条头部导航信息
 * @param {*} id 
 */
exports.deleteById = async id => {
  let sql = `DELETE FROM \`${TABLE_NAME}\` WHERE \`id\` = ?;`
  return MySql.query(sql, [id])
}

// /**
//  * 查找所有的信息
//  */
// exports.listAll = () => {
//   let sql = `SELECT * FROM \`${TABLE_NAME}\` ORDER BY \`active \` DESC, \`orderval\` ASC;`
//   return MySql.query(sql, [])
// }

// exports.listByActive = active =>{
//   let sql = `SELECT * FROM \`${TABLE_NAME}\` WHERE \`active\`= ? ORDER BY \`active\` DESC, \`orderval\`ASC;`
//   return MySql.query(sql, [active])
// }

/**
 * 后台查找所有的信息
 */
exports.listAll = () => {
  let sql = `SELECT * FROM \`${TABLE_NAME}\` ORDER BY \`active\` DESC, \`orderval\` ASC;`
  return MySql.query(sql, [])
}

/**
 * 后台查找所有的信息
 */
exports.listByActive = active => {
  let sql = `SELECT * FROM \`${TABLE_NAME}\` where \`active\` = ? ORDER BY \`active\` DESC, \`orderval\` ASC;`
  return MySql.query(sql, [active])
}

/**
 * 前台查找所有的信息
 * @param {*} active 是否上架
 * @param {*} start 数据中开始位置
 * @param {*} end 数据中结束位置
 */
exports.jdListAll = (active, start, end) => {
  let sql = `SELECT * FROM \`${TABLE_NAME}\` WHERE \`active\` = ? ORDER BY \`orderval\` ASC LIMIT ?, ?;`
  return MySql.query(sql, [active, start, end])
}

// 分页接口，全部数据中取某一页数据
exports.getPageList = (start,offset) =>{
  // let sql = `SELECT * FROM \`${TABLE_NAME}\` ORDER BY \`orderval\` ASC LIMIT ?, ?;`
  let sql = `SELECT * FROM \`${TABLE_NAME}\` ORDER BY \`id\` ASC LIMIT ?, ?;`
  // return MySql.query(sql, [active, start, end])
  return MySql.query(sql, [start,offset])
}
// 分页接口，按是否上架取某一页接口
exports.getPageListByActive = (active, start, offset) =>{
  // let sql = `SELECT * FROM \`${TABLE_NAME}\` ORDER BY \`orderval\` ASC LIMIT ?, ?;`
  let sql = `SELECT * FROM \`${TABLE_NAME}\` WHERE \`active\` = ? ORDER BY \`id\` ASC LIMIT ?, ?;`
  return MySql.query(sql, [active, start, offset])
}

// 得到全部数据总数
exports.getPageListTotal = ()=>{
  let sql = `SELECT COUNT(*) AS \`total\` FROM \`${TABLE_NAME}\`;`
  return MySql.query(sql)
}
// 按是否上架得到数据总数
exports.getPageListTotalByActive = (active)=>{
  let sql = `SELECT COUNT(*) AS \`total\` FROM \`${TABLE_NAME}\` WHERE \`active\` = ?;`
  return MySql.query(sql,[active])
}