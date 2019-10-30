
export function searchList(params) {
  console.log('searchlist', params)
  return new Promise(resolve => {
    resolve({
      code: 0,
      msg: 'success',
      result: [
        '中国',
        '斯利康中国laksdjf',
        '涉及到了反馈中国',
        '上课了好到底',
        '聊聊好'

      ]
    })
  })
}
