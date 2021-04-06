/**
 * @description: 判断数据类型
 * @param {*} val
 * @return {*}
 */
export const judgeType = val => {
  return Object.prototype.toString.call(val).slice(8, -1);
};

/**
 * @description: 节流函数，表示函数每隔一段时间执行一次
 * @param {Function} func
 * @param {number} delay
 * @param {boolean} immediate 是否立即执行
 * @return {*}
 */
export const throttle = (func, delay) => {
  const context = this;
  let previous = 0; // 上一次执行的时间默认为0
  return function(...args) {
    let now = +new Date();
    // 将上一次时间和现在对比
    if (now - previous > delay) {
      previous = now;
      func.apply(context, args);
    }
  };
};

/** 防抖函数
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function(...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}
export const parseTime = (time, fmt = "yyyy-MM-dd hh:mm:ss") => {
  let date = null;
  if (judgeType(time) === "Date") {
    date = time;
  } else if (judgeType(time) === "Number") {
    date = new Date(time);
  }
  if (date) {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    }
    const o = {
      "M+": date.getMonth() + 1,
      "d+": date.getDate(),
      "h+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds()
    };
    for (const k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        const str = o[k] + "";
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? str : padLeftZero(str)
        );
      }
    }
    return fmt;
  } else {
    return "";
  }
};

const padLeftZero = str => {
  return ("00" + str).substr(str.length);
};
