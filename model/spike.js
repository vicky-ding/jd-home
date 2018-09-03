const MySql = require('../lib/mysql')

const TABLE_NAME = 'spike-goods'
const TABLE_SQL = `create table if not exists \`${TABLE_NAME}\`(
    id INT NOT NULL AUTO_INCREMENT,
    url VARCHAR(255) NOT NULL COMMENT '跳转链接',
    icon VARCHAR(255) NOT NULL COMMENT '图像',
    priceNow INT NOT NULL DEFAULT 0 COMMENT '秒杀价格',
    priceBefore INT NOT NULL DEFAULT 0 COMMENT '商品原价',
    active INT NOT NULL DEFAULT 0 COMMENT '是否上架',
    orderval INT NOT NULL DEFAULT 0 COMMENT '排序值',
    PRIMARY KEY ( id )
);`
// 建表
MySql.query(TABLE_SQL);

// 新增
exports.addList = (url, icon, priceNow, priceBefore, active, orderval)=>{
    let sql = `INSERT INTO \`${TABLE_NAME}\`(
        \`url\`,\`icon\`,\`priceNow\`,\`priceBefore\`,\`active\`,\`orderval\`)
        VALUES (?,?,?,?,?,?);`
    return MySql.query(sql,[url, icon, priceNow, priceBefore, active, orderval])
}
// 编辑
exports.editList = (url, icon, priceNow, priceBefore, active, orderval)=>{
    let sql = `UPDATE \`${TABLE_NAME}\` SET
        \`url\`=?,\`icon\`=?,\`priceNow\`=?,\`priceBefore\`=?,\`active\`=?,\`orderval\`=?
        WHERE \`id\`=?;`
    return MySql.query(sql,[url, icon, priceNow, priceBefore, active, orderval, id])
}

// 删
exports.deleteById = async id => {
  let sql = `DELETE FROM \`${TABLE_NAME}\` WHERE \`id\` = ?;`
  return MySql.query(sql, [id])
}
// 查
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