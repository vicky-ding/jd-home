function checkRequired(obj, key) {
  return typeof obj == 'object' && obj.hasOwnProperty(key)
}

function isNullOrUndefined(obj, key) {
  return obj[key] == null || obj[key] == undefined
}

function isRealNum(value) {
  //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/ 
  return /^[0-9]+.?[0-9]*$/.test(value)
}

exports.getNumber = function(obj, key, isRequired) {
  let isHave = checkRequired(obj, key);
  // 必须
  if (isRequired) {
    // 不存在
    if (!isHave) throw `${key} 是必传参数`
    // 存在且为数字
    if (isRealNum(obj[key])) return Number(obj[key])
    // 存在不为数字
    throw `${key} 参数类型错误，应为number类型`
  }

  // 不必须且存在（则根据必须规则获取）
  if (isHave) return getNumber(obj, key, true)
  // 不必须不存在
  return 0
}

exports.getString = function(obj, key, isRequired) {
  let isHave = checkRequired(obj, key);
  // 必须
  if (isRequired) {
    // 不存在
    if (!isHave) throw `${key} 是必传参数`
    // 存在且不为空
    if (isNullOrUndefined(obj[key])) return obj[key].toString()
    // 存在为null或者undefined
    throw `${key} 参数类型错误，应为string类型`
  }

  // 不必须且存在（则根据必须规则获取）
  if (isHave) return getString(obj, key, true)
  // 不必须不存在
  return ''
}

exports.getBoolean = function(obj, key, isRequired) {
  let isHave = checkRequired(obj, key);
  // 必须
  if (isRequired) {
    // 不存在
    if (!isHave) throw `${key} 是必传参数`
    // 存在且true
    if (true === obj[key]) return true
    // 存在且为false
    if (false === obj[key]) return false
    // 存在且类型不符
    throw `${key} 参数类型错误，应为string类型`
  }

  // 不必须且存在（则根据必须规则获取）
  if (isHave) return getBoolean(obj, key, true)
  // 不必须不存在
  return false
}