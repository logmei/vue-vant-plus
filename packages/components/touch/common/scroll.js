export function isBottom(target) { // direction:down向下拉是是否顶头，up向上拉是是否触底
  if (target.scrollHeight - target.scrollTop === target.clientHeight) return true
}

export function isTop(target) { // direction:down向下拉是是否顶头，up向上拉是是否触底
  return target.scrollTop === 0
}
