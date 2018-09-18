import request from '@/assets/utils/request'
export function getRequestProcessPage(params) {
  return request({
    url: '/request/page',
    method: 'get',
    params
  })
}
export function getCountProcess(params) {
  return request({
    url: '/request/count',
    method: 'get',
    params
  })
}
