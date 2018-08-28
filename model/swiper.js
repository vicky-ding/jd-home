const MySql = require('../lib/mysql')

const TABLE_NAME = 'swiper'
const TABLE_SQL = `create table if not exists \`${TABLE_NAME}\` (
  id INT NOT NULL AUTO_INCREMENT,
  url VARCHAR(255) NOT NULL COMMENT '轮播图跳转链接',
  icon VARCHAR(255) NOT NULL COMMENT '轮播图图像',
  active INT NOT NULL DEFAULT 0 COMMENT '是否上架',
  orderval INT NOT NULL DEFAULT 0 COMMENT '排序值',
  PRIMARY KEY ( id )
);`

// 建表
MySql.createTable(TABLE_SQL)

/**
 * 新增一条头部导航信息
 */
exports.insertSwiper = (url, icon, active, orderval) => {
  let sql = `INSERT INTO \`${TABLE_NAME}\` (
    \`url\`, \`icon\`, \`active\`, \`orderval\`
  ) VALUES (?, ?, ?, ?);`
  return MySql.query(sql, [url, icon, active, orderval])
}

/**
 * 编辑一条头部导航信息
 */
exports.editSwiper = (id, url, icon, active, orderval) => {
  let sql = `UPDATE \`${TABLE_NAME}\` SET
    \`url\` = ?, \`icon\` = ?, \`active\` = ?, \`orderval\` = ?
  WHERE \`id\` = ?;`
  return MySql.query(sql, [url, icon, active, orderval, id])
}

/**
 * 删除一条头部导航信息
 * @param {*} id 
 */
exports.deleteById = id => {
  let sql = `DELETE FROM \`${TABLE_NAME}\` WHERE \`id\` = ?;`
  return MySql.query(sql, [id])
}

/**
 * 查找所有的信息
 */
exports.listAll = () => {
  let sql = `SELECT * FROM \`${TABLE_NAME}\` ORDER BY \`active\` DESC, \`orderval\` ASC;`
  return MySql.query(sql, [])
}

/**
 * 查找所有的信息
 */
exports.listByActive = active => {
  let sql = `SELECT * FROM \`${TABLE_NAME}\` where \`active\` = ? ORDER BY \`active\` DESC, \`orderval\` ASC;`
  return MySql.query(sql, [active])
}