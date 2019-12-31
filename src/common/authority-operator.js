// import store from '@/store'
// 权限操作
function authorityFunByStatus() {
  const status = this.cardData.implStatus
  const correspondings = getCorresponding(status)
  return Boolean(this.authority[correspondings + 'Detail'])
}

function authorityFunByStatusList(status) {
  const correspondings = getCorresponding(status)
  return Boolean(this.authority[correspondings])
}

// 获取状态对应权限的key值
function getCorresponding(status) {
  const keys = [
    'WaitingForAppointment', // 待预约
    'Unallocated', // 未分配
    'WaitingForCheckIn', // 待签到
    'ToBeImplemented', // 待实施
    'PendingAcceptance', // 待验收
    'Acceptance', // 已验收
    'Cancelled', // 已取消
    'TransferredSchool'// 已转派
  ]
  return keys[status]
}
export {
  authorityFunByStatus,
  authorityFunByStatusList
}
