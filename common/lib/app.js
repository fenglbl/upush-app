export function toast(title, fun) {
  uni.showToast({
    duration: 1500,
    title,
    icon: 'none',
    mask: true
  })

  if (typeof fun === 'function') {
    setTimeout(fun, 1500)
  }
}

Date.prototype.Format = function(fmt) {
  const day = ['日', '一', '二', '三', '四', '五', '六']
  const map = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    'S': this.getMilliseconds(),
    'D': day[this.getDay()]
  }

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  }

  for (const key in map) {
    if (new RegExp('(' + key + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? map[key] : (('00' + map[key]).substr(('' + map[key]).length)))
    }
  }

  return fmt
}

export function formatTime(value) {
  if (!value) {
    return ''
  }

  return new Date(value).Format('yyyy-MM-dd HH:mm:ss')
}
