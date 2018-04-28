'use strict'
export default {
  compound (arrs, unit) {
    const bets = arrs.reduce(function (p, c) {
      const value = Number(c)
      if (value) {
        return p * c
      } else {
        return 0
      }
    })
    return bets * unit
  },
  group (arrs) {
    const bets = arrs.reduce(function (p, c) {
      const value = Number(c)
      if (value) {
        return p * c
      } else {
        return 0
      }
    })
    return bets * arrs.length
  },
  groupSelectOne (len, count) {
    var bets
    if (len < count) {
      bets = 0
    } else {
      var n = 1
      var m = len
      for (var i = 1; i < count; i++) {
        bets = (m *= (len - i)) / (n *= (i + 1))
      }
    }
    return bets
  },
  groupSelectTwoNum (arr1, arr2, num) {
    var bets = 0
    var len = 0
    for (var i in arr1) {
      if (arr2.indexOf(arr1[i]) > -1) {
        len = arr2.length - 1
      } else {
        len = arr2.length
      }
      var n = len
      var m = 1
      for (var j = 1; j < num; j++) {
        n *= (len - j)
        m *= (j + 1)
      }
      bets += n / m
    }
    return bets
  },
  sunOfValue (betsArr) {
    var arr = []
    for (var i = 0; i < 1000; i++) {
      arr.push(i)
    }
    var newArr = []
    arr.filter(function (v) {
      var numArr = v.toString().split('')
      var num = numArr.reduce(function (p, c) {
        const value = Number(c)
        if (!isNaN(value)) {
          return p * 1 + c * 1
        } else {
          return p * 1
        }
      })
      newArr.push(num)
    })
    var n = 0
    for (var j in betsArr) {
      for (let i in newArr) {
        if (Number(newArr[i]) === betsArr[j]) {
          n++
        }
      }
    }
    return n
  },
  groupSunOfValue (betsArr) {
    var arr = []
    for (var i = 1; i < 1000; i++) {
      var val = i.toString().split('')
      if (val[0] === val[1] && val[0] === val[2]) {
        // console.log(i)
        continue
      }
      if (i < 10) {
        i = '00' + i
      } else if (i < 100) {
        i = '0' + i
      }
      arr.push(i)
    }
    var newArr = []
    arr.filter(function (v) {
      var numArr = v.toString().split('')
      var newNum = Number(numArr.sort(function (a, b) {
        return a - b
      }).join(''))
      newArr.push(newNum)
    })
    var arr1 = []
    for (let i in newArr) {
      if (arr1.indexOf(newArr[i]) < 0) {
        arr1.push(newArr[i])
      }
    }
    var newArr1 = []
    arr1.filter(function (v) {
      var numArr = v.toString().split('')
      var num = numArr.reduce(function (p, c) {
        const value = Number(c)
        if (!isNaN(value)) {
          return p * 1 + c * 1
        } else {
          return p * 1
        }
      })
      newArr1.push(num)
    })
    var n = 0
    for (let j in betsArr) {
      for (let i in newArr1) {
        if (Number(newArr1[i]) === betsArr[j]) {
          n++
        }
      }
    }
    return n
  },
  dValue (betsArr) {
    var arr = []
    for (var i = 0; i < 1000; i++) {
      if (i < 10) {
        arr.push('00' + i)
      } else if (i < 100) {
        arr.push('0' + i)
      } else {
        arr.push(i)
      }
    }
    var newArr = []
    arr.filter(function (v) {
      var numArr = v.toString().split('')
      var minNum = Math.min.apply(Math, numArr)
      var maxNum = Math.max.apply(Math, numArr)
      var num = maxNum - minNum
      newArr.push(num)
    })
    var n = 0
    for (var j in betsArr) {
      for (let i in newArr) {
        if (Number(newArr[i]) === betsArr[j]) {
          n++
        }
      }
    }
    return n
  }
}
