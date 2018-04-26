'use strict'
export default {
  compound (arrs) {
    const bets = arrs.reduce(function (p, c) {
      const value = Number(c)
      if (value) {
        return p * c
      } else {
        return 0
      }
    })
    return bets
  }
}
