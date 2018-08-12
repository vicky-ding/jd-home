var mysql = require('mysql')
var config = require('../config/db.js')

var pool  = mysql.createPool({
  host     : config.database.HOST,
  user     : config.database.USERNAME,
  password : config.database.PASSWORD,
  database : config.database.DATABASE,
  port     : config.database.PORT
});

let query = ( sql, values ) => {

  return new Promise(( resolve, reject ) => {
    pool.getConnection( (err, connection) => {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {
          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })

}

let otherapp =
    `create table if not exists otherapp(
     id INT NOT NULL AUTO_INCREMENT,
     title VARCHAR(100) NOT NULL COMMENT 'app名称',
     url VARCHAR(255) NOT NULL COMMENT 'app跳转链接',
     icon VARCHAR(255) NOT NULL COMMENT 'app图像',
     active INT NOT NULL DEFAULT 0 COMMENT '是否上架',
     orderval INT NOT NULL DEFAULT 0 COMMENT '排序值',
     PRIMARY KEY ( id )
    );`

let createTable = ( sql ) => {
  return query( sql, [] )
}

// 建表
createTable(otherapp)

// 新增一条头部导航信息
exports.insertOtherapp = ( value ) => {
  let _sql = "insert into `otherapp` set title=?,url=?,icon=?,active=?,orderval=?;"
  return query( _sql, value )
}
// 删除一条头部导航信息
exports.deleteOtherappById = ( id ) => {
  let _sql = `delete from \`otherapp\` where id="${id}";`
  return query( _sql )
}
// 查找用户
exports.findUserOtherapp = () => {
  let _sql = `select * from \`otherapp\`;`
  return query( _sql )
}