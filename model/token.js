const MySql = require('../lib/mysql')

const TABLE_NAME = 'token'
const TABLE_SQL = `create table if not exists \`${TABLE_NAME}\` (
  id INT NOT NULL AUTO_INCREMENT,
  uid INT NOT NULL COMMENT '用户id',
  token VARCHAR(255) NOT NULL COMMENT 'token',
  stat INT NOT NULL DEFAULT 0 COMMENT '状态',
  PRIMARY KEY ( id )
);`

// 建表
MySql.createTable(TABLE_SQL)