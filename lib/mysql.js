var mysql = require('mysql')
var config = require('../config/db.js')

// 初始化数据库链接信息，创建数据库连接池
var pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  port: config.database.PORT,
  charset: config.database.CHARSET
});
/**
 * @description 执行一条数据库语句
 * @param {*} sql sql语句
 * @param {*} values sql语句中的值，是个数组
 * @returns
 */
function query(sql, values) {
  return new Promise((resolve, reject) => {
    // 获取数据库连接池
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
}

function createTable(sql) {
  return query(sql, [])
}

module.exports = {
  query, createTable
}