
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

export function searchListObj(params) {
  console.log('searchListObj', params)
  return new Promise(resolve => {
    resolve({
      code: 0,
      msg: 'success',
      result: {
        pageNum: 1,
        pageSize: 10,
        pages: 10,
        total: 13,
        list: [
          {
            actiontype: '安装任务1',
            name: '北京房朝阳区一店1',
            type: '药店',
            danhao: 'SS2019091100001',
            date: 1572331173000

          },
          {
            actiontype: '售后维护2',
            name: '北京朝阳区一店2',
            type: '诊所',
            danhao: 'SS2018091100001',
            date: 1572331100000

          },
          {
            actiontype: '安装任务3',
            name: '北京朝阳区一店3',
            type: '药店',
            danhao: 'SS2019091100001',
            date: 1572331173000

          },
          {
            actiontype: '售后维护4',
            name: '北京朝阳区一店4',
            type: '诊所',
            danhao: 'SS2018091100001',
            date: 1572331100000

          },
          {
            actiontype: '安装任务5',
            name: '北京朝阳区一店5',
            type: '药店',
            danhao: 'SS2019091100001',
            date: 1572331173000

          },
          {
            actiontype: '售后维护6',
            name: '北京朝阳区一店6',
            type: '诊所',
            danhao: 'SS2018091100001',
            date: 1572331100000

          },
          {
            actiontype: '安装任务7',
            name: '北京朝阳区一店7',
            type: '药店',
            danhao: 'SS2019091100001',
            date: 1572331173000

          },
          {
            actiontype: '售后维护8',
            name: '北京朝阳区一店8',
            type: '诊所',
            danhao: 'SS2018091100001',
            date: 1572331100000

          },
          {
            actiontype: '安装任务9',
            name: '北京朝阳区一店9',
            type: '药店',
            danhao: 'SS2019091100001',
            date: 1572331173000

          },
          {
            actiontype: '售后维护10',
            name: '北京朝阳区一店10',
            type: '诊所',
            danhao: 'SS2018091100001',
            date: 1572331100000

          }
        ]
      }
    })
  })
}
