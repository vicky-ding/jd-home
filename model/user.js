const md5 = require('md5')
const MySql = require('../lib/mysql')

const TABLE_NAME = 'user'
const TABLE_SQL = `create table if not exists \`${TABLE_NAME}\` (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL COMMENT '用户名',
  password VARCHAR(255) NOT NULL COMMENT '密码',
  stat INT NOT NULL DEFAULT 0 COMMENT '状态',
  PRIMARY KEY ( id )
);`

// 建表并初始化admin
MySql.createTable(TABLE_SQL).then(() => init())

function init() {
  exports.findByName(['admin'])
  .then(user => {
    if (user.length == 0) {
      exports.insertUser(['admin', md5('123456')])
    }
  }).catch(err => console.log(err))
}

/**
 * 根据id查找用户
 * @param {*} values 
 */
exports.findById = values => {
  let sql = `SELECT * FROM \`${TABLE_NAME}\` WHERE \`id\` = ?;`
  return MySql.query(sql, values)
}

/**
 * 根据name查找用户
 * @param {*} values 
 */
exports.findByName = values => {
  let sql = `SELECT * FROM \`${TABLE_NAME}\` WHERE \`name\` = ?;`
  return MySql.query(sql, values)
}

/**
 * 根据name查找用户
 * @param {*} id 
 */
exports.insertUser = (values) => {
  let sql = `INSERT INTO \`${TABLE_NAME}\` (\`name\`, \`password\`) VALUES (?, ?);`
  return MySql.query(sql, values)
}